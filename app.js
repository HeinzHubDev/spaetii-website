/* ═══════════════════════════════════════════
   SPÄTII v4 · APP.JS · Komplette App-Logik
   ═══════════════════════════════════════════ */

(function() {
'use strict';

// ═══ KONFIG ═══
const SP_WHATSAPP_NUMBER = '4368110000000'; // ← HIER DEINE WHATSAPP-NUMMER!
const LIEFERKOSTEN = 2.99;

// Daten aus data.js
const D = window.SP_DATA || {};
const { CATEGORIES, CAT_NAMES, PRODUCTS, DEALS, BUNDLES, ZONES, PLZ_TO_ZONE, FAQS, REVIEWS, INSTA_TILES, FEATURES, BP_REWARDS, QUICKLISTS } = D;

// ═══ SECURITY LAYER ═══
function SP_sanitize(s) {
  if (s == null) return '';
  return String(s).replace(/[<>"'`]/g, c => ({
    '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;'
  }[c]));
}

const SP_validate = {
  email: e => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e) && e.length <= 100,
  phone: p => /^[\d\s+\-()]{6,20}$/.test(p),
  plz: p => /^\d{4}$/.test(p),
  name: n => n.length >= 2 && n.length <= 100 && /^[a-zA-ZäöüÄÖÜßéèêàâ\s\-.']+$/.test(n),
};

const SP_rateLimit = (() => {
  const t = {};
  return (key, ms = 1000) => {
    const now = Date.now();
    if (t[key] && now - t[key] < ms) return false;
    t[key] = now;
    return true;
  };
})();

// ═══ STORAGE (LocalStorage with in-memory fallback) ═══
const STORE = (() => {
  let mem = {};
  let useLS = false;
  try {
    localStorage.setItem('_t', '1');
    localStorage.removeItem('_t');
    useLS = true;
  } catch(e) {}
  return {
    get: (k, def) => {
      try {
        const v = useLS ? localStorage.getItem('sp_' + k) : mem[k];
        return v == null ? def : JSON.parse(v);
      } catch(e) { return def; }
    },
    set: (k, v) => {
      try {
        const s = JSON.stringify(v);
        if (useLS) localStorage.setItem('sp_' + k, s);
        else mem[k] = s;
      } catch(e) {}
    },
    del: (k) => {
      try { useLS ? localStorage.removeItem('sp_' + k) : delete mem[k]; } catch(e) {}
    }
  };
})();

// ═══ STATE ═══
let cart = STORE.get('cart', []);
let activeFilter = '';
let activeSort = 'default';
let activePriceFilter = 'all';
let favOnly = false;
let _searchTimer = null;
let _bundleSwapState = {};

// ═══ TOAST ═══
function showToast(msg, ms = 2400) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('show'), ms);
}

// ═══ PAGE NAVIGATION (BULLETPROOF) ═══
function goPage(name) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });
  // Update nav pills
  document.querySelectorAll('.nav-pill, .mobile-nav-pill').forEach(b => {
    b.classList.toggle('active', b.dataset.page === name);
  });
  // Show target page
  const pg = document.getElementById('page-' + name);
  if (pg) {
    pg.classList.add('active');
    pg.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  closeMobileNav();
  
  // Re-render content for target page (fixes empty page bug!)
  setTimeout(() => {
    if (name === 'sortiment') {
      renderCategories();
      renderAllProducts();
      renderBundles();
      buildBanner();
      buildTicker();
    } else if (name === 'deals') {
      renderDeals();
      startTimer();
    } else if (name === 'community') {
      renderBattlePass();
      renderStamps();
      renderLevel();
      renderInsta();
      renderReviews();
    } else if (name === 'lieferung') {
      renderZones();
      renderFAQ();
    } else if (name === 'wishlist') {
      renderWishlist();
      renderRecentlyViewed();
    } else if (name === 'home') {
      renderFeatures();
      renderPopular();
      renderQuicklists();
    }
  }, 50);
}

// ═══ MOBILE NAV ═══
function openMobileNav() {
  document.getElementById('mobileNav').classList.add('open');
  document.getElementById('mobileOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

// ═══ THEME TOGGLE ═══
function toggleTheme() {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  STORE.set('theme', isLight ? 'light' : 'dark');
  document.getElementById('themeToggle').textContent = isLight ? '☀️' : '🌙';
}

// ═══ FLASH BAR ═══
function closeFlash() {
  document.getElementById('flashBar').classList.add('hidden');
  STORE.set('flashClosed', Date.now());
}

// ═══ PLZ CHECKER ═══
function checkLocation() {
  const inp = document.getElementById('plzInput');
  const res = document.getElementById('plzResult');
  if (!inp || !res) return;
  const val = SP_sanitize(inp.value.trim().toLowerCase());
  if (!val) {
    res.className = 'plz-result fail show';
    res.textContent = '⚠️ Bitte PLZ oder Stadt eingeben.';
    return;
  }
  // PLZ check
  if (/^\d{4}$/.test(val)) {
    const zone = PLZ_TO_ZONE[val];
    if (zone) {
      res.className = 'plz-result success show';
      res.innerHTML = `✅ Wir liefern zu dir! <strong>Zone ${zone}</strong> · MBW €${ZONES[zone].mbw.toFixed(2).replace('.', ',')}`;
      return;
    }
  }
  // City name check
  const allCities = [...ZONES.A.cities, ...ZONES.B.cities];
  const found = allCities.find(c => c.name.toLowerCase().includes(val));
  if (found) {
    const zone = ZONES.A.cities.includes(found) ? 'A' : 'B';
    res.className = 'plz-result success show';
    res.innerHTML = `✅ Wir liefern nach <strong>${SP_sanitize(found.name)}</strong>! Zone ${zone} · MBW €${ZONES[zone].mbw.toFixed(2).replace('.', ',')}`;
  } else {
    res.className = 'plz-result fail show';
    res.innerHTML = `❌ Nicht in unserem Liefergebiet. <button onclick="App.openZones()" style="background:none;color:var(--cyn);font-weight:700;cursor:pointer">Alle Lieferorte ansehen →</button>`;
  }
}

// ═══ CART ═══
function addToCart(productId) {
  if (!SP_rateLimit('add_' + productId, 300)) return;
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  const ex = cart.find(it => it.id === productId);
  if (ex) ex.qty++;
  else cart.push({ id: p.id, em: p.em, nm: p.nm, sz: p.sz, pr: p.pr, qty: 1 });
  STORE.set('cart', cart);
  updateCart();
  showToast(`✓ ${p.nm} im Warenkorb`);
  // Pulse cart badge
  const b = document.getElementById('cartBadge');
  if (b) {
    b.style.animation = 'none';
    setTimeout(() => { b.style.animation = 'modalPop .4s ease'; }, 10);
  }
}

function removeFromCart(productId) {
  cart = cart.filter(it => it.id !== productId);
  STORE.set('cart', cart);
  updateCart();
}

function changeQty(productId, delta) {
  const it = cart.find(x => x.id === productId);
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) cart = cart.filter(x => x.id !== productId);
  STORE.set('cart', cart);
  updateCart();
}

function cartTotal() {
  return cart.reduce((s, it) => s + it.pr * it.qty, 0);
}

function cartCount() {
  return cart.reduce((s, it) => s + it.qty, 0);
}

function updateCart() {
  // Badge
  const b = document.getElementById('cartBadge');
  const c = cartCount();
  if (b) {
    if (c > 0) { b.style.display = 'flex'; b.textContent = c; }
    else b.style.display = 'none';
  }
  
  // Body
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if (!body || !footer) return;
  
  if (!cart.length) {
    body.innerHTML = `<div class="cart-empty"><div class="cart-empty-emoji">🛒</div><h3>Warenkorb ist leer</h3><p class="muted">Füge Produkte hinzu, um zu bestellen</p></div>`;
    footer.innerHTML = '';
    return;
  }
  
  body.innerHTML = cart.map(it => `
    <div class="cart-item">
      <span class="cart-item-em">${it.em}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${SP_sanitize(it.nm)}</div>
        <div class="cart-item-price">€${(it.pr * it.qty).toFixed(2).replace('.', ',')}</div>
      </div>
      <div class="qty-box">
        <button class="qty-btn" onclick="App.changeQty('${it.id}', -1)" aria-label="Weniger">−</button>
        <span class="qty-num">${it.qty}</span>
        <button class="qty-btn" onclick="App.changeQty('${it.id}', 1)" aria-label="Mehr">+</button>
      </div>
      <button class="cart-remove" onclick="App.removeFromCart('${it.id}')" aria-label="Entfernen">🗑</button>
    </div>
  `).join('');
  
  const tot = cartTotal();
  const mbw = 29.90;
  const left = Math.max(0, mbw - tot);
  const pct = Math.min(100, (tot / mbw) * 100);
  
  footer.innerHTML = `
    <div class="cart-progress">
      <div class="cart-progress-label">${left > 0 ? `Noch €${left.toFixed(2).replace('.', ',')} bis zur Kasse (Zone A)` : '✅ Mindestbestellwert erreicht!'}</div>
      <div class="cart-progress-bar"><div class="cart-progress-fill" style="width:${pct}%"></div></div>
      <div class="cart-progress-info">
        <span class="muted">+ €${LIEFERKOSTEN.toFixed(2).replace('.', ',')} Lieferkosten</span>
        <span class="muted">Zone A MBW €${mbw.toFixed(2).replace('.', ',')}</span>
      </div>
    </div>
    <div class="cart-total">
      <span class="cart-total-lbl">Summe:</span>
      <span class="cart-total-num">€${tot.toFixed(2).replace('.', ',')}</span>
    </div>
    <div class="cart-checkout-buttons">
      <button class="btn-wa" onclick="App.orderViaWhatsApp()" ${tot < mbw ? 'disabled' : ''}>
        ${tot < mbw ? `💬 WhatsApp (noch €${left.toFixed(2).replace('.', ',')})` : '💬 Bestellen per WhatsApp'}
      </button>
      <button class="btn-secondary" onclick="App.goToWebShop()" ${tot < mbw ? 'disabled' : ''}>
        🌐 Auf spaetii.at bestellen →
      </button>
    </div>
  `;
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
  updateCart();
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

function goToWebShop() {
  closeCart();
  window.open('https://www.spaetii.at/kategorien', '_blank');
}

// ═══ WHATSAPP ORDERING ═══
function orderViaWhatsApp() {
  if (cartTotal() < 29.90) {
    showToast('⚠️ Mindestbestellwert €29,90 nicht erreicht');
    return;
  }
  const addr = STORE.get('userAddress', null);
  if (!addr || !addr.street) {
    closeCart();
    openAddress();
    return;
  }
  sendWhatsAppOrder(addr);
}

function sendWhatsAppOrder(addr) {
  const code = getInviteCode();
  const tot = cartTotal();
  let txt = '*🌙 SPÄTII BESTELLUNG*\n\n*📦 Produkte:*\n';
  cart.forEach(it => {
    txt += `• ${it.qty}× ${it.em} ${it.nm} – €${(it.pr * it.qty).toFixed(2).replace('.', ',')}\n`;
  });
  txt += `\n*💰 Summe: €${tot.toFixed(2).replace('.', ',')}*\n`;
  txt += `*🚗 Lieferkosten: €${LIEFERKOSTEN.toFixed(2).replace('.', ',')}*\n`;
  txt += `*✅ Gesamt: €${(tot + LIEFERKOSTEN).toFixed(2).replace('.', ',')}*\n\n`;
  txt += '*📍 Lieferadresse:*\n';
  txt += `${addr.name}\n${addr.street}\n${addr.plz} ${addr.city}\n`;
  if (addr.phone) txt += `📞 ${addr.phone}\n`;
  if (addr.note) txt += `\n*💬 Anmerkung:* ${addr.note}\n`;
  txt += `\n*Zahlung:* ${addr.payment || 'Bar bei Lieferung'}\n`;
  txt += `\n_Empfehlungs-Code: ${code}_`;
  
  const url = `https://wa.me/${SP_WHATSAPP_NUMBER}?text=${encodeURIComponent(txt)}`;
  window.open(url, '_blank');
  showToast('💬 WhatsApp wird geöffnet...');
  
  // Increment Battle Pass
  incrementBattlePass();
  // Increment stamp
  incrementStamp();
}

function contactWhatsApp() {
  if (cart.length > 0) {
    openCart();
    return;
  }
  const msg = 'Hallo Spätii! 🌙\n\nIch hätte gerne eine Beratung / Bestellung.\nKönnt ihr mich kontaktieren?';
  const url = `https://wa.me/${SP_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ═══ ADDRESS MODAL ═══
function openAddress() {
  const addr = STORE.get('userAddress', { name: '', street: '', plz: '', city: '', phone: '', note: '', payment: 'Bar bei Lieferung' });
  document.getElementById('addrName').value = addr.name || '';
  document.getElementById('addrStreet').value = addr.street || '';
  document.getElementById('addrPlz').value = addr.plz || '';
  document.getElementById('addrCity').value = addr.city || '';
  document.getElementById('addrPhone').value = addr.phone || '';
  document.getElementById('addrNote').value = addr.note || '';
  document.getElementById('addrPayment').value = addr.payment || 'Bar bei Lieferung';
  document.getElementById('addressModal').classList.add('show');
}
function closeAddress() {
  document.getElementById('addressModal').classList.remove('show');
}
function submitAddressOrder() {
  const name = SP_sanitize(document.getElementById('addrName').value.trim());
  const street = SP_sanitize(document.getElementById('addrStreet').value.trim());
  const plz = SP_sanitize(document.getElementById('addrPlz').value.trim());
  const city = SP_sanitize(document.getElementById('addrCity').value.trim());
  const phone = SP_sanitize(document.getElementById('addrPhone').value.trim());
  const note = SP_sanitize(document.getElementById('addrNote').value.trim());
  const payment = SP_sanitize(document.getElementById('addrPayment').value);
  
  if (!SP_validate.name(name)) { showToast('⚠️ Bitte gültigen Namen eingeben'); return; }
  if (!street || street.length < 3) { showToast('⚠️ Bitte Straße eingeben'); return; }
  if (!SP_validate.plz(plz)) { showToast('⚠️ Bitte 4-stellige PLZ'); return; }
  if (!city || city.length < 2) { showToast('⚠️ Bitte Stadt eingeben'); return; }
  if (phone && !SP_validate.phone(phone)) { showToast('⚠️ Telefon ungültig'); return; }
  
  const zone = PLZ_TO_ZONE[plz];
  if (!zone) {
    if (!confirm(`PLZ ${plz} möglicherweise außerhalb des Liefergebiets. Trotzdem bestellen?`)) return;
  }
  if (zone === 'B' && cartTotal() < 49.90) {
    showToast('⚠️ Zone B Mindestbestellwert €49,90');
    return;
  }
  
  const addr = { name, street, plz, city, phone, note, payment };
  STORE.set('userAddress', addr);
  closeAddress();
  sendWhatsAppOrder(addr);
}

// ═══ PRODUCT MODAL ═══
function openProductDetail(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  trackRecentView(productId);
  document.getElementById('pmEmoji').textContent = p.em;
  document.getElementById('pmName').textContent = p.nm;
  document.getElementById('pmSize').textContent = p.sz;
  
  let tagsHTML = '';
  if (p.tag === 'TOP') tagsHTML += '<span class="prod-tag tag-top" style="position:static">🔥 TOP</span>';
  if (p.tag === 'NEU') tagsHTML += '<span class="prod-tag tag-new" style="position:static">✨ NEU</span>';
  document.getElementById('pmTags').innerHTML = tagsHTML;
  
  document.getElementById('pmPriceRow').innerHTML = `<span class="pm-price">€${p.pr.toFixed(2).replace('.', ',')}</span>`;
  
  const btn = document.getElementById('pmAddBtn');
  btn.onclick = () => { addToCart(p.id); closeProductModal(); };
  document.getElementById('productModal').classList.add('show');
}
function closeProductModal() {
  document.getElementById('productModal').classList.remove('show');
}

// ═══ ZONES MODAL ═══
function openZones() {
  const el = document.getElementById('zonesModalContent');
  let html = '';
  Object.entries(ZONES).forEach(([key, zone]) => {
    html += `<h4 style="color:${key === 'A' ? 'var(--cyn)' : 'var(--pur)'}">🏙 Zone ${key} · MBW €${zone.mbw.toFixed(2).replace('.', ',')}</h4>`;
    html += '<div class="chips" style="margin-bottom:1rem">';
    zone.cities.forEach(c => {
      html += `<span class="chip">${SP_sanitize(c.name)}</span>`;
    });
    html += '</div>';
  });
  el.innerHTML = html;
  document.getElementById('zonesModal').classList.add('show');
}
function closeZones() {
  document.getElementById('zonesModal').classList.remove('show');
}

// ═══ PFAND MODAL ═══
function openPfand() { document.getElementById('pfandModal').classList.add('show'); }
function closePfand() { document.getElementById('pfandModal').classList.remove('show'); }

// ═══ INVITE MODAL ═══
function getInviteCode() {
  let code = STORE.get('inviteCode', null);
  if (!code) {
    code = 'FREUND-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    STORE.set('inviteCode', code);
  }
  return code;
}
function openInvite() {
  document.getElementById('inviteCodeDisplay').textContent = getInviteCode();
  document.getElementById('inviteModal').classList.add('show');
}
function closeInvite() { document.getElementById('inviteModal').classList.remove('show'); }
function copyInviteCode() {
  const code = getInviteCode();
  navigator.clipboard?.writeText(`Hey! Bestell beim Spätii Linz mit meinem Code ${code} und kriegst 5€ Rabatt! https://www.spaetii.at`);
  showToast('✓ Einladungstext kopiert!');
}
function shareInvite() {
  const code = getInviteCode();
  const text = `Hey! Bestell beim Spätii Linz mit meinem Code ${code} und kriegst 5€ Rabatt! https://www.spaetii.at`;
  if (navigator.share) {
    navigator.share({ title: 'Spätii Empfehlung', text }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(text);
    showToast('✓ Text kopiert · jetzt teilen');
  }
}

// ═══ REWARD MODAL ═══
function showReward(em, title, sub, code) {
  document.getElementById('rewardEmoji').textContent = em;
  document.getElementById('rewardTitle').textContent = title;
  document.getElementById('rewardSub').textContent = sub;
  document.getElementById('rewardCode').textContent = code;
  document.getElementById('rewardModal').classList.add('show');
}
function closeReward() { document.getElementById('rewardModal').classList.remove('show'); }
function copyRewardCode() {
  const code = document.getElementById('rewardCode').textContent;
  navigator.clipboard?.writeText(code);
  showToast('✓ Code kopiert!');
}

// ═══ NEWSLETTER ═══
function subscribeNewsletter() {
  if (!SP_rateLimit('newsletter', 3000)) { showToast('⏱ Bitte etwas warten...'); return; }
  const inp = document.getElementById('newsletterEmail');
  const email = SP_sanitize(inp.value.trim());
  if (!SP_validate.email(email)) {
    showToast('⚠️ Ungültige Email-Adresse');
    return;
  }
  STORE.set('newsletterEmail', email);
  inp.value = '';
  showReward('🎁', 'Willkommen bei Spätii!', 'Dein 10% Welcome-Code:', 'SPAETII10');
}

// ═══ LIVE SEARCH ═══
function onSearch(query) {
  query = String(query || '').toLowerCase().trim();
  const el = document.getElementById('searchResults');
  
  if (_searchTimer) clearTimeout(_searchTimer);
  _searchTimer = setTimeout(renderAllProducts, 150);
  
  if (!el) return;
  if (!query || query.length < 2) {
    el.classList.remove('show');
    return;
  }
  
  let matches = PRODUCTS.filter(p =>
    p.nm.toLowerCase().includes(query) ||
    (CAT_NAMES[p.cat] || '').toLowerCase().includes(query)
  ).slice(0, 8);
  
  if (!matches.length) {
    el.innerHTML = `<div style="padding:1.5rem;text-align:center;color:var(--muted)">🔍 Keine Treffer für "${SP_sanitize(query)}"</div>`;
    el.classList.add('show');
    return;
  }
  
  el.innerHTML = matches.map(p => `
    <div class="sr-item" onclick="App.openProductDetail('${p.id}');document.getElementById('searchResults').classList.remove('show')">
      <span class="sr-em">${p.em}</span>
      <div class="sr-info">
        <div class="sr-name">${SP_sanitize(p.nm)}</div>
        <div class="sr-meta">${SP_sanitize(CAT_NAMES[p.cat] || '')} · ${SP_sanitize(p.sz)}</div>
      </div>
      <div class="sr-price">€${p.pr.toFixed(2).replace('.', ',')}</div>
      <button class="sr-add" onclick="event.stopPropagation();App.addToCart('${p.id}')">+</button>
    </div>
  `).join('');
  el.classList.add('show');
}
function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').classList.remove('show');
  renderAllProducts();
}

// ═══ FILTER ═══
function filterCategory(catId) {
  activeFilter = activeFilter === catId ? '' : catId;
  document.querySelectorAll('.cat-card').forEach(c => {
    c.classList.toggle('active', c.dataset.cat === activeFilter);
  });
  document.getElementById('clearFilterBtn').style.display = activeFilter ? 'inline-block' : 'none';
  document.getElementById('prodGridTitle').textContent = activeFilter ? CAT_NAMES[activeFilter] : 'Alle Artikel';
  renderAllProducts();
  document.getElementById('allProducts')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function clearFilter() {
  activeFilter = '';
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  document.getElementById('clearFilterBtn').style.display = 'none';
  document.getElementById('prodGridTitle').textContent = 'Alle Artikel';
  renderAllProducts();
}

// ═══ RENDER FUNCTIONS ═══

function renderFeatures() {
  const el = document.getElementById('featuresGrid');
  if (!el || !FEATURES) return;
  el.innerHTML = FEATURES.map(f => `
    <div class="feature-card">
      <div class="feature-icon">${f.ic}</div>
      <div class="feature-title">${SP_sanitize(f.ttl)}</div>
      <div class="feature-text">${SP_sanitize(f.txt)}</div>
    </div>
  `).join('');
}

function renderPopular() {
  const el = document.getElementById('popularProducts');
  if (!el || !PRODUCTS) return;
  const popular = PRODUCTS.filter(p => p.tag === 'TOP').slice(0, 8);
  if (!popular.length) {
    el.innerHTML = PRODUCTS.slice(0, 8).map(productCard).join('');
    return;
  }
  el.innerHTML = popular.map(productCard).join('');
}

function productCard(p) {
  const fav = isInWishlist(p.id);
  return `
    <div class="prod-card" onclick="App.openProductDetail('${p.id}')">
      ${p.tag ? `<span class="prod-tag tag-${p.tag.toLowerCase()}">${p.tag}</span>` : ''}
      <button class="prod-fav${fav ? ' active' : ''}" onclick="event.stopPropagation();App.toggleWishlist('${p.id}')" aria-label="Favorit">${fav ? '💜' : '🤍'}</button>
      <div class="prod-emoji">${p.em}</div>
      <div class="prod-name">${SP_sanitize(p.nm)}</div>
      <div class="prod-size">${SP_sanitize(p.sz)}</div>
      <div class="prod-footer">
        <span class="prod-price">€${p.pr.toFixed(2).replace('.', ',')}</span>
        <button class="prod-add" onclick="event.stopPropagation();App.addToCart('${p.id}')" aria-label="In den Warenkorb">+</button>
      </div>
    </div>
  `;
}

function renderCategories() {
  const el = document.getElementById('catGrid');
  if (!el || !CATEGORIES) return;
  el.innerHTML = CATEGORIES.map(c => `
    <button class="cat-card${activeFilter === c.id ? ' active' : ''}" data-cat="${c.id}" onclick="App.filterCategory('${c.id}')">
      <div class="cat-icon">${c.ic}</div>
      <div class="cat-name">${SP_sanitize(c.nm)}</div>
      <div class="cat-desc">${SP_sanitize(c.desc)}</div>
    </button>
  `).join('');
}

function renderAllProducts() {
  const el = document.getElementById('productsGrid');
  if (!el || !PRODUCTS) return;
  const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  let list = [...PRODUCTS];
  
  // Category filter
  if (activeFilter) list = list.filter(p => p.cat === activeFilter);
  
  // Search query
  if (query) list = list.filter(p =>
    p.nm.toLowerCase().includes(query) ||
    (CAT_NAMES[p.cat] || '').toLowerCase().includes(query)
  );
  
  // Price filter
  if (activePriceFilter !== 'all') {
    const max = parseFloat(activePriceFilter);
    list = list.filter(p => p.pr < max);
  }
  
  // Favorites only filter
  if (favOnly) {
    const wl = getWishlist();
    list = list.filter(p => wl.includes(p.id));
  }
  
  // Sort
  if (activeSort === 'price-asc') list.sort((a, b) => a.pr - b.pr);
  else if (activeSort === 'price-desc') list.sort((a, b) => b.pr - a.pr);
  else if (activeSort === 'name-asc') list.sort((a, b) => a.nm.localeCompare(b.nm));
  else if (activeSort === 'name-desc') list.sort((a, b) => b.nm.localeCompare(a.nm));
  // 'default' = keep original order (TOP/NEU first works due to data order)
  
  if (!list.length) {
    el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--muted)">🔍 Keine Produkte gefunden.<br><br><button class="btn-secondary" onclick="App.resetAllFilters()">Filter zurücksetzen</button></div>`;
    return;
  }
  el.innerHTML = list.map(productCard).join('');
}

function changeSort(value) {
  activeSort = value;
  renderAllProducts();
}

function filterPrice(value) {
  activePriceFilter = value;
  document.querySelectorAll('.filter-pill[data-price]').forEach(b => {
    b.classList.toggle('active', b.dataset.price === value);
  });
  renderAllProducts();
}

function toggleFavOnly() {
  favOnly = !favOnly;
  const btn = document.getElementById('favOnlyBtn');
  if (btn) btn.classList.toggle('active', favOnly);
  renderAllProducts();
}

function resetAllFilters() {
  activeFilter = '';
  activeSort = 'default';
  activePriceFilter = 'all';
  favOnly = false;
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.filter-pill[data-price]').forEach(b => {
    b.classList.toggle('active', b.dataset.price === 'all');
  });
  document.getElementById('favOnlyBtn')?.classList.remove('active');
  document.getElementById('clearFilterBtn').style.display = 'none';
  document.getElementById('prodGridTitle').textContent = 'Alle Artikel';
  document.getElementById('searchInput').value = '';
  const sortSel = document.getElementById('sortSelect');
  if (sortSel) sortSel.value = 'default';
  renderAllProducts();
}

function renderBundles() {
  const el = document.getElementById('bundlesGrid');
  if (!el || !BUNDLES) return;
  el.innerHTML = BUNDLES.map((b, idx) => {
    const slots = (_bundleSwapState[b.id] || b.slots).map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    const sumOrig = slots.reduce((s, p) => s + p.pr, 0);
    const sumNew = sumOrig * (1 - b.discountPct);
    const saved = sumOrig - sumNew;
    return `
      <div class="bundle-card">
        <span class="bundle-tag">${b.tag}</span>
        <h3 class="bundle-title">${SP_sanitize(b.ttl)}</h3>
        <div class="bundle-slots">
          ${slots.map((p, i) => `
            <div class="bundle-slot">
              <span style="font-size:1.2rem">${p.em}</span>
              <span class="bundle-slot-name">${SP_sanitize(p.nm)}</span>
              <span style="color:var(--muted);font-size:.78rem">€${p.pr.toFixed(2).replace('.', ',')}</span>
              <button class="bundle-slot-swap" onclick="App.swapBundleSlot('${b.id}', ${i})">↻ Tauschen</button>
            </div>
          `).join('')}
        </div>
        <div class="bundle-footer">
          <div>
            <div class="bundle-old">€${sumOrig.toFixed(2).replace('.', ',')}</div>
            <div class="bundle-new">€${sumNew.toFixed(2).replace('.', ',')}</div>
            <div class="bundle-save">Du sparst €${saved.toFixed(2).replace('.', ',')}</div>
          </div>
          <button class="btn-primary" onclick="App.addBundle('${b.id}')">+ Hinzufügen</button>
        </div>
      </div>
    `;
  }).join('');
}

function swapBundleSlot(bundleId, slotIdx) {
  const b = BUNDLES.find(x => x.id === bundleId);
  if (!b) return;
  const current = (_bundleSwapState[bundleId] || b.slots)[slotIdx];
  const cur = PRODUCTS.find(p => p.id === current);
  if (!cur) return;
  // Find next product in same category
  const sameCat = PRODUCTS.filter(p => p.cat === cur.cat && p.id !== cur.id);
  if (!sameCat.length) { showToast('Keine Alternative gefunden'); return; }
  const next = sameCat[Math.floor(Math.random() * sameCat.length)];
  if (!_bundleSwapState[bundleId]) _bundleSwapState[bundleId] = [...b.slots];
  _bundleSwapState[bundleId][slotIdx] = next.id;
  renderBundles();
  showToast(`✓ ${cur.nm} → ${next.nm}`);
}

function addBundle(bundleId) {
  const b = BUNDLES.find(x => x.id === bundleId);
  if (!b) return;
  const slots = _bundleSwapState[bundleId] || b.slots;
  slots.forEach(id => addToCart(id));
}

function renderDeals() {
  const el = document.getElementById('dealsGrid');
  if (!el || !DEALS) return;
  el.innerHTML = DEALS.map(d => `
    <div class="prod-card">
      <span class="prod-tag tag-top">${d.badge}</span>
      <div class="prod-emoji">${d.em}</div>
      <div class="prod-name">${SP_sanitize(d.nm)}</div>
      <div class="prod-size">${SP_sanitize(d.sz)}</div>
      <div class="prod-footer" style="flex-direction:column;align-items:flex-start;gap:6px">
        <div>
          <span style="color:var(--muted);text-decoration:line-through;font-size:.78rem">€${d.op.toFixed(2).replace('.', ',')}</span>
          <span class="prod-price" style="margin-left:6px">€${d.np.toFixed(2).replace('.', ',')}</span>
        </div>
        <button class="btn-primary" style="width:100%;padding:8px;font-size:.78rem" onclick="App.addToCart('${d.id}')">+ Hinzufügen</button>
      </div>
    </div>
  `).join('');
}

function renderZones() {
  const a = document.getElementById('zoneAChips');
  const b = document.getElementById('zoneBChips');
  if (a) a.innerHTML = ZONES.A.cities.map(c => `<span class="chip">${SP_sanitize(c.name)}</span>`).join('');
  if (b) b.innerHTML = ZONES.B.cities.map(c => `<span class="chip">${SP_sanitize(c.name)}</span>`).join('');
}

function renderFAQ() {
  const el = document.getElementById('faqList');
  if (!el || !FAQS) return;
  el.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item" id="faq-${i}">
      <div class="faq-q" onclick="App.toggleFAQ(${i})">
        <span>${SP_sanitize(f.q)}</span>
        <span class="faq-arrow">▼</span>
      </div>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('');
}
function toggleFAQ(idx) {
  document.getElementById('faq-' + idx)?.classList.toggle('open');
}

function renderInsta() {
  const el = document.getElementById('instaGrid');
  if (!el || !INSTA_TILES) return;
  el.innerHTML = INSTA_TILES.map(t => `
    <a href="https://www.instagram.com/spaetii.linz" target="_blank" rel="noopener" class="insta-tile">
      ${t.em}
      <div class="insta-overlay"><span>${SP_sanitize(t.txt)}</span><span>❤️ ${t.likes}</span></div>
    </a>
  `).join('');
}

function renderReviews() {
  const el = document.getElementById('reviewsGrid');
  if (!el || !REVIEWS) return;
  el.innerHTML = REVIEWS.map(r => `
    <div class="review-card">
      <div class="review-stars">${'⭐'.repeat(r.stars)}</div>
      <div class="review-text">"${SP_sanitize(r.text)}"</div>
      <div class="review-author">
        <div class="review-avatar">${SP_sanitize(r.initials)}</div>
        <div>
          <div class="review-name">${SP_sanitize(r.name)}</div>
          <div class="review-loc">${SP_sanitize(r.loc)}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ═══ BATTLE PASS ═══
function getBpData() {
  const today = new Date().toISOString().slice(0, 10);
  let data = STORE.get('battlePass', { date: today, count: 0 });
  if (data.date !== today) data = { date: today, count: 0 };
  return data;
}
function incrementBattlePass() {
  const data = getBpData();
  data.count = Math.min(data.count + 1, 100);
  STORE.set('battlePass', data);
  renderBattlePass();
}
function renderBattlePass() {
  const data = getBpData();
  const counter = document.getElementById('bpCounter');
  const fill = document.getElementById('bpBarFill');
  const rewards = document.getElementById('bpRewards');
  if (!counter) return;
  counter.textContent = data.count;
  fill.style.width = data.count + '%';
  if (rewards && BP_REWARDS) {
    rewards.innerHTML = BP_REWARDS.map(r => {
      const unlocked = data.count >= r.at;
      return `
        <div class="bp-reward ${unlocked ? 'unlocked' : 'locked'}">
          <span class="bp-reward-em">${r.em}</span>
          <div class="bp-reward-info">
            <div class="bp-reward-name">${SP_sanitize(r.nm)}</div>
            <div class="bp-reward-sub">Bei ${r.at} · ${SP_sanitize(r.sub)}</div>
          </div>
          <span class="bp-reward-status">${unlocked ? '✓ FREI' : 'LOCKED'}</span>
        </div>
      `;
    }).join('');
  }
}

// ═══ STAMP CARD ═══
function getStamps() {
  return STORE.get('stamps', 0);
}
function incrementStamp() {
  let s = getStamps();
  s++;
  if (s >= 5) {
    s = 0;
    showReward('🎁', 'Stempelkarte voll!', 'Dein Code für ein Gratis-Produkt:', 'STAMP-' + Math.random().toString(36).substring(2, 6).toUpperCase());
  }
  STORE.set('stamps', s);
  renderStamps();
}
function renderStamps() {
  const el = document.getElementById('stamps');
  const txt = document.getElementById('stampsTxt');
  if (!el) return;
  const s = getStamps();
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (i === 4) html += `<div class="stamp prize">🎁</div>`;
    else html += `<div class="stamp${i < s ? ' done' : ''}">${i < s ? '✓' : i + 1}</div>`;
  }
  el.innerHTML = html;
  if (txt) txt.textContent = s === 0 ? 'Noch keine Bestellung' : `${s}/5 Bestellungen · noch ${5 - s} bis zum Gratis-Produkt`;
}

// ═══ LEVEL SYSTEM ═══
function getLevel() {
  const orders = STORE.get('totalOrders', 0);
  if (orders >= 50) return { name: 'Platin-Kunde', avatar: '👑', next: null, orders };
  if (orders >= 20) return { name: 'Gold-Kunde', avatar: '🥇', next: { at: 50, name: 'Platin' }, orders };
  if (orders >= 5)  return { name: 'Silber-Kunde', avatar: '🥈', next: { at: 20, name: 'Gold' }, orders };
  return { name: 'Bronze-Kunde', avatar: '🥉', next: { at: 5, name: 'Silber' }, orders };
}
function renderLevel() {
  const lv = getLevel();
  const ttl = document.getElementById('levelTitle');
  const info = document.getElementById('levelInfo');
  if (ttl) ttl.textContent = lv.name;
  if (info) {
    info.innerHTML = `
      <div class="level-avatar">${lv.avatar}</div>
      <div>
        <div style="font-weight:700;font-size:1rem">${lv.orders} Bestellungen</div>
        <div class="muted small">${lv.next ? `Noch ${lv.next.at - lv.orders} bis ${lv.next.name}` : '🎉 Höchster Rang erreicht!'}</div>
      </div>
    `;
  }
}

// ═══ DEAL TIMER ═══
let _timerInterval = null;
function startTimer() {
  if (_timerInterval) clearInterval(_timerInterval);
  function update() {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    let diff = Math.max(0, Math.floor((end - now) / 1000));
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    const eh = document.getElementById('timerH');
    const em = document.getElementById('timerM');
    const es = document.getElementById('timerS');
    if (eh) eh.textContent = String(h).padStart(2, '0');
    if (em) em.textContent = String(m).padStart(2, '0');
    if (es) es.textContent = String(s).padStart(2, '0');
  }
  update();
  _timerInterval = setInterval(update, 1000);
}

// ═══ BANNER & TICKER ═══
function buildBanner() {
  const fp = document.getElementById('floatingProds');
  const bp = document.getElementById('bannerParticles');
  const isMobile = window.innerWidth < 700;
  
  if (fp && PRODUCTS && PRODUCTS.length) {
    const topPicks = PRODUCTS.filter(p => p.tag === 'TOP' || p.tag === 'NEU');
    const popular = ['ott6', 'jack', 'pros', 'rb', 'har', 'lay', 'mlk', 'piz', 'ben', 'mag', 'nutella', 'choc-m', 'cor', 'kasten', 'jaeger']
      .map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    const pool = [...new Set([...topPicks, ...popular])];
    if (!pool.length) return;
    
    const count = isMobile ? 6 : 12;
    let html = '';
    const used = new Set();
    for (let i = 0; i < count; i++) {
      let idx;
      do { idx = Math.floor(Math.random() * pool.length); }
      while (used.size < pool.length - 2 && used.has(idx));
      used.add(idx);
      const p = pool[idx];
      const left = 5 + Math.random() * 90;
      const top = 10 + Math.random() * 70;
      const dur = 8 + Math.random() * 8;
      const delay = Math.random() * 5;
      const size = 1.6 + Math.random() * 1.2;
      html += `<span class="float-prod" style="left:${left}%;top:${top}%;font-size:${size}rem;animation-duration:${dur}s;animation-delay:${delay}s" title="${SP_sanitize(p.nm)}">${p.em}</span>`;
    }
    fp.innerHTML = html;
  }
  
  if (bp) {
    const count = isMobile ? 12 : 25;
    const colors = ['var(--pur)', 'var(--cyn)', '#fff'];
    let html = '';
    for (let i = 0; i < count; i++) {
      const left = Math.random() * 100;
      const dur = 4 + Math.random() * 6;
      const delay = Math.random() * 8;
      html += `<span class="bp-particle" style="left:${left}%;animation-duration:${dur}s;animation-delay:${delay}s;color:${colors[i % 3]}"></span>`;
    }
    bp.innerHTML = html;
  }
}

let _tickerInterval = null;
function buildTicker() {
  const wrap = document.getElementById('prodTicker');
  if (!wrap || !PRODUCTS) return;
  const featured = PRODUCTS.filter(p => p.tag === 'TOP' || p.tag === 'NEU');
  if (!featured.length) return;
  let idx = 0;
  if (_tickerInterval) clearInterval(_tickerInterval);
  function show() {
    const p = featured[idx % featured.length];
    wrap.innerHTML = `
      <span class="ticker-em">${p.em}</span>
      <span class="ticker-nm">${SP_sanitize(p.nm)}</span>
      <span class="ticker-pr">€${p.pr.toFixed(2).replace('.', ',')}</span>
      <span class="ticker-tag tag-${p.tag.toLowerCase()}">${p.tag}</span>
    `;
    idx++;
  }
  show();
  _tickerInterval = setInterval(show, 3000);
}

// ═══ HERO STARS ═══
function buildHeroStars() {
  const el = document.getElementById('heroStars');
  if (!el) return;
  // CSS handles this with background-image, no JS needed
}

// ═══ COOKIE BANNER ═══
function cookieAccept() {
  STORE.set('cookiesAccepted', true);
  document.getElementById('cookieBanner')?.classList.remove('show');
  showToast('✓ Cookies akzeptiert');
}
function cookieDecline() {
  STORE.set('cookiesAccepted', 'minimal');
  document.getElementById('cookieBanner')?.classList.remove('show');
  showToast('Nur notwendige Cookies aktiv');
}

// ═══ WUNSCHLISTE / FAVORITEN ═══
function getWishlist() {
  return STORE.get('wishlist', []);
}
function toggleWishlist(productId) {
  let list = getWishlist();
  const idx = list.indexOf(productId);
  if (idx >= 0) {
    list.splice(idx, 1);
    showToast('💔 Aus Wunschliste entfernt');
  } else {
    list.push(productId);
    showToast('💜 Zur Wunschliste hinzugefügt');
  }
  STORE.set('wishlist', list);
  renderAllProducts();
  renderPopular();
  renderWishlist();
  updateWishlistBadge();
}
function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

function updateWishlistBadge() {
  const b = document.getElementById('wishlistBadge');
  const count = getWishlist().length;
  if (b) {
    if (count > 0) { b.style.display = 'flex'; b.textContent = count; }
    else b.style.display = 'none';
  }
}

function renderWishlist() {
  const el = document.getElementById('wishlistContent');
  if (!el) return;
  const ids = getWishlist();
  if (!ids.length) {
    el.innerHTML = `
      <div class="empty-state">
        <div class="empty-emoji">💔</div>
        <h3>Wunschliste ist leer</h3>
        <p class="muted">Klick auf das 🤍-Symbol auf jedem Produkt, um es hier zu speichern. Perfekt für Wiederbestellungen!</p>
        <button class="btn-primary mt-2" onclick="App.goPage('sortiment')">🛍 Zum Sortiment</button>
      </div>
    `;
    return;
  }
  const items = ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  const total = items.reduce((s, p) => s + p.pr, 0);
  el.innerHTML = `
    <div class="wishlist-actions">
      <div>
        <div class="muted small">${items.length} Produkte · €${total.toFixed(2).replace('.', ',')} Gesamtwert</div>
      </div>
      <button class="btn-primary" onclick="App.addAllFromWishlist()">🛒 Alle in den Warenkorb</button>
    </div>
    <div class="prod-grid">
      ${items.map(productCard).join('')}
    </div>
  `;
}

function addAllFromWishlist() {
  const ids = getWishlist();
  if (!ids.length) return;
  ids.forEach(id => {
    const p = PRODUCTS.find(x => x.id === id);
    if (p) {
      const ex = cart.find(it => it.id === id);
      if (ex) ex.qty++;
      else cart.push({ id: p.id, em: p.em, nm: p.nm, sz: p.sz, pr: p.pr, qty: 1 });
    }
  });
  STORE.set('cart', cart);
  updateCart();
  showToast(`✓ ${ids.length} Produkte hinzugefügt`);
}

// ═══ ZULETZT ANGESEHEN ═══
function trackRecentView(productId) {
  let recent = STORE.get('recentViews', []);
  recent = recent.filter(id => id !== productId);
  recent.unshift(productId);
  recent = recent.slice(0, 8);
  STORE.set('recentViews', recent);
}

function renderRecentlyViewed() {
  const el = document.getElementById('recentlyViewed');
  if (!el) return;
  const ids = STORE.get('recentViews', []);
  if (!ids.length) {
    el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--muted)">Noch keine Produkte angesehen.</div>`;
    return;
  }
  const items = ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  el.innerHTML = items.map(productCard).join('');
}

// ═══ QUICK LISTS (Express-Bestellen) ═══
function renderQuicklists() {
  const el = document.getElementById('quicklistsGrid');
  if (!el || !QUICKLISTS) return;
  el.innerHTML = QUICKLISTS.map(ql => {
    const items = ql.products.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    const total = items.reduce((s, p) => s + p.pr, 0);
    const emojis = items.slice(0, 5).map(p => p.em).join(' ');
    return `
      <div class="quicklist-card" style="--ql-color:${ql.color}">
        <div class="quicklist-emoji">${ql.em}</div>
        <h3 class="quicklist-name">${SP_sanitize(ql.nm)}</h3>
        <p class="quicklist-sub">${SP_sanitize(ql.sub)}</p>
        <div class="quicklist-preview">${emojis}</div>
        <div class="quicklist-stats">
          <span class="muted small">${items.length} Produkte</span>
          <span class="quicklist-price">€${total.toFixed(2).replace('.', ',')}</span>
        </div>
        <button class="btn-primary" onclick="App.addQuicklist('${ql.id}')">⚡ Komplett in Warenkorb</button>
      </div>
    `;
  }).join('');
}

function addQuicklist(quicklistId) {
  const ql = QUICKLISTS.find(x => x.id === quicklistId);
  if (!ql) return;
  ql.products.forEach(id => {
    const p = PRODUCTS.find(x => x.id === id);
    if (p) {
      const ex = cart.find(it => it.id === id);
      if (ex) ex.qty++;
      else cart.push({ id: p.id, em: p.em, nm: p.nm, sz: p.sz, pr: p.pr, qty: 1 });
    }
  });
  STORE.set('cart', cart);
  updateCart();
  showToast(`✓ "${ql.nm}" komplett im Warenkorb`);
  // Open cart drawer to show
  setTimeout(() => openCart(), 400);
}

// ═══ INIT ═══
function hideLoader() {
  const l = document.getElementById('loader');
  if (l) {
    l.classList.add('hide');
    setTimeout(() => l.style.display = 'none', 500);
  }
}

function init() {
  // Theme
  const savedTheme = STORE.get('theme', 'dark');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    const tt = document.getElementById('themeToggle');
    if (tt) tt.textContent = '☀️';
  }
  
  // Cookie Banner (zeige nur falls noch nicht akzeptiert)
  if (!STORE.get('cookiesAccepted', false)) {
    setTimeout(() => {
      document.getElementById('cookieBanner')?.classList.add('show');
    }, 1200);
  }
  
  // Flash bar
  const closed = STORE.get('flashClosed', 0);
  if (Date.now() - closed < 3600000) {
    document.getElementById('flashBar')?.classList.add('hidden');
  }
  
  // Render initial content
  renderFeatures();
  renderPopular();
  renderQuicklists();
  renderCategories();
  renderAllProducts();
  renderBundles();
  renderDeals();
  renderZones();
  renderFAQ();
  renderInsta();
  renderReviews();
  renderBattlePass();
  renderStamps();
  renderLevel();
  renderWishlist();
  renderRecentlyViewed();
  
  // Update cart badge from saved cart
  updateCart();
  updateWishlistBadge();
  
  // Banner & Ticker (lazy)
  if (window.requestIdleCallback) {
    requestIdleCallback(() => { buildBanner(); buildTicker(); }, { timeout: 1500 });
  } else {
    setTimeout(() => { buildBanner(); buildTicker(); }, 600);
  }
  
  // Timer for deals
  startTimer();
  
  // PLZ input - Enter key
  const plzInp = document.getElementById('plzInput');
  if (plzInp) plzInp.addEventListener('keydown', e => {
    if (e.key === 'Enter') checkLocation();
  });
  
  // Newsletter Enter
  const newsInp = document.getElementById('newsletterEmail');
  if (newsInp) newsInp.addEventListener('keydown', e => {
    if (e.key === 'Enter') subscribeNewsletter();
  });
  
  // Hide loader
  hideLoader();
}

// ═══ EXPOSE PUBLIC API ═══
window.App = {
  goPage, openMobileNav, closeMobileNav, toggleTheme, closeFlash,
  checkLocation, addToCart, removeFromCart, changeQty,
  openCart, closeCart, goToWebShop, orderViaWhatsApp, contactWhatsApp,
  openAddress, closeAddress, submitAddressOrder,
  openProductDetail, closeProductModal,
  openZones, closeZones, openPfand, closePfand,
  openInvite, closeInvite, copyInviteCode, shareInvite,
  closeReward, copyRewardCode,
  subscribeNewsletter, onSearch, clearSearch,
  filterCategory, clearFilter, swapBundleSlot, addBundle,
  toggleFAQ,
  cookieAccept, cookieDecline,
  toggleWishlist, isInWishlist,
  changeSort, filterPrice, toggleFavOnly, resetAllFilters,
  addAllFromWishlist, addQuicklist
};

// ═══ START ═══
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
// Failsafe loader hide
setTimeout(hideLoader, 2000);

})();
