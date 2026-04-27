/* ═══════════════════════════════════════════
   SPÄTII v4 · DATA · Produkte, Kategorien, Zonen
   ═══════════════════════════════════════════ */

// ── KATEGORIEN ──
const CATEGORIES = [
  { id: 'snacks',      ic: '🍿', nm: 'Snacks',           desc: 'Chips, Nüsse...' },
  { id: 'bier',        ic: '🍺', nm: 'Bier & Cider',     desc: 'Kalt geliefert' },
  { id: 'wein',        ic: '🍷', nm: 'Wein & Sekt',      desc: 'Für jeden Anlass' },
  { id: 'spirits',     ic: '🥃', nm: 'Spirits',          desc: 'Whiskey, Vodka...' },
  { id: 'softdrinks',  ic: '🥤', nm: 'Softdrinks',       desc: 'Cola, Sprite...' },
  { id: 'suess',       ic: '🍫', nm: 'Süßigkeiten',      desc: 'Haribo, Milka...' },
  { id: 'kuehl',       ic: '🥛', nm: 'Kühlwaren',        desc: 'Frisch & gekühlt' },
  { id: 'fertig',      ic: '🍕', nm: 'Fertiggerichte',   desc: 'Pizza, Snacks...' },
  { id: 'kaffee',      ic: '☕', nm: 'Kaffee & Tee',     desc: 'Heißgetränke' },
  { id: 'saft',        ic: '🧃', nm: 'Säfte',            desc: 'Frisch & kalt' },
  { id: 'tabak',       ic: '🚬', nm: 'Tabak & Rauch',    desc: 'Zigaretten, Papers' },
  { id: 'eis',         ic: '🍦', nm: 'Eis & Tiefkühl',   desc: "Magnum, Ben & Jerry's" },
  { id: 'fruehstueck', ic: '🥣', nm: 'Frühstück',        desc: 'Müsli, Nutella...' },
  { id: 'back',        ic: '🥖', nm: 'Brot & Back',      desc: 'Frisch geliefert' },
  { id: 'gewuerz',     ic: '🧂', nm: 'Gewürze & Öle',    desc: 'Salz, Öl, Soßen' },
  { id: 'konserve',    ic: '🥫', nm: 'Konserven',        desc: 'Vorrat & Notfall' },
  { id: 'obst',        ic: '🍎', nm: 'Obst & Gemüse',    desc: 'Frisch & saftig' },
  { id: 'drogerie',    ic: '🧴', nm: 'Drogerie',         desc: 'Hygiene & Pflege' },
  { id: 'haushalt',    ic: '🧻', nm: 'Haushalt',         desc: 'Klopapier, etc.' },
  { id: 'baby',        ic: '👶', nm: 'Baby & Kind',      desc: 'Windeln & Brei' },
  { id: 'party',       ic: '🎉', nm: 'Party & Events',   desc: 'Becher, Ballons' },
  { id: 'bio',         ic: '🌿', nm: 'Bio & Vegan',      desc: 'Pflanzlich & Bio' },
  { id: 'tier',        ic: '🐾', nm: 'Tierbedarf',       desc: 'Für Haustiere' },
];

const CAT_NAMES = Object.fromEntries(CATEGORIES.map(c => [c.id, c.nm]));

// ── PRODUKTE (240+) ──
const PRODUCTS = [
  // BIER
  { id: 'ott6',     em: '🍺', nm: 'Ottakringer 6er',       sz: '6 × 0,5L',   pr: 7.99,  tag: 'TOP', cat: 'bier' },
  { id: 'goss',     em: '🍺', nm: 'Gösser Märzen',         sz: '0,5L Dose',  pr: 1.49,  cat: 'bier' },
  { id: 'stg',      em: '🍺', nm: 'Stiegl Goldbräu',       sz: '0,5L Dose',  pr: 1.59,  cat: 'bier' },
  { id: 'pul6',     em: '🍻', nm: 'Puntigamer 6er',        sz: '6 × 0,5L',   pr: 7.49,  cat: 'bier' },
  { id: 'cor',      em: '🍺', nm: 'Corona Extra',          sz: '0,33L',      pr: 1.99,  cat: 'bier' },
  { id: 'cid',      em: '🍏', nm: 'Somersby Apfel',        sz: '0,33L',      pr: 1.79,  cat: 'bier' },
  { id: 'erd-bier', em: '🍺', nm: 'Erdinger Weißbier',     sz: '0,5L',       pr: 1.79,  cat: 'bier' },
  { id: 'beck',     em: '🍺', nm: "Beck's Pils",           sz: '0,5L',       pr: 1.59,  cat: 'bier' },
  { id: 'krombi',   em: '🍺', nm: 'Krombacher Pils',       sz: '0,5L',       pr: 1.69,  cat: 'bier' },
  { id: 'kasten',   em: '🍺', nm: 'Bierkasten Stiegl',     sz: '24 × 0,33L', pr: 24.99, tag: 'TOP', cat: 'bier' },
  { id: 'cid-bir',  em: '🍐', nm: 'Birnen-Cider',          sz: '0,5L',       pr: 2.49,  cat: 'bier' },
  { id: 'hofbr',    em: '🍺', nm: 'Hofbräu Original',      sz: '0,5L',       pr: 1.79,  cat: 'bier' },
  { id: 'augus',    em: '🍺', nm: 'Augustiner Hell',       sz: '0,5L',       pr: 1.99,  cat: 'bier' },
  { id: 'pauli-w',  em: '🍺', nm: 'Paulaner Weißbier',     sz: '0,5L',       pr: 1.99,  cat: 'bier' },
  { id: 'fra-w',    em: '🍺', nm: 'Franziskaner Weißbier', sz: '0,5L',       pr: 1.89,  cat: 'bier' },
  { id: 'rad-cit',  em: '🍻', nm: 'Radler Zitrone',        sz: '0,5L',       pr: 1.49,  cat: 'bier' },
  { id: 'alko-fr',  em: '🍺', nm: 'Alkoholfreies Bier',    sz: '0,5L',       pr: 1.39,  cat: 'bier' },
  
  // SPIRITS
  { id: 'jack',     em: '🥃', nm: "Jack Daniel's",         sz: '700ml',      pr: 18.99, tag: 'TOP', cat: 'spirits' },
  { id: 'wod',      em: '🥃', nm: 'Smirnoff Vodka',        sz: '700ml',      pr: 14.99, cat: 'spirits' },
  { id: 'gin',      em: '🥃', nm: 'Bombay Sapphire',       sz: '700ml',      pr: 19.99, cat: 'spirits' },
  { id: 'rum',      em: '🥃', nm: 'Bacardi Carta Blanca',  sz: '700ml',      pr: 16.99, cat: 'spirits' },
  { id: 'whi',      em: '🥃', nm: 'Jameson Irish',         sz: '700ml',      pr: 21.99, cat: 'spirits' },
  { id: 'tequ',    em: '🥃', nm: 'Olmeca Tequila',        sz: '700ml',      pr: 17.99, cat: 'spirits' },
  { id: 'absol',    em: '🥃', nm: 'Absolut Vodka',         sz: '700ml',      pr: 16.99, cat: 'spirits' },
  { id: 'bail',     em: '🥃', nm: 'Baileys Irish Cream',   sz: '700ml',      pr: 13.99, cat: 'spirits' },
  { id: 'jaeger',   em: '🥃', nm: 'Jägermeister',          sz: '700ml',      pr: 14.99, cat: 'spirits' },
  { id: 'capt',     em: '🥃', nm: 'Captain Morgan',        sz: '700ml',      pr: 15.99, cat: 'spirits' },
  { id: 'aperol',   em: '🍹', nm: 'Aperol',                sz: '700ml',      pr: 11.99, cat: 'spirits' },
  { id: 'gordon',   em: '🍸', nm: 'Gordons Gin',           sz: '700ml',      pr: 14.99, cat: 'spirits' },
  { id: 'tia',      em: '🍸', nm: 'Tia Maria',             sz: '700ml',      pr: 18.99, cat: 'spirits' },
  { id: 'sour',     em: '🍋', nm: 'Sourz Apple',           sz: '700ml',      pr: 13.99, cat: 'spirits' },
  { id: 'ouzo',     em: '🥃', nm: 'Ouzo No.12',            sz: '700ml',      pr: 14.99, cat: 'spirits' },
  { id: 'lic-43',   em: '🥃', nm: 'Licor 43',              sz: '700ml',      pr: 18.99, cat: 'spirits' },
  { id: 'malibu',   em: '🥥', nm: 'Malibu Kokos',          sz: '700ml',      pr: 14.99, cat: 'spirits' },
  
  // WEIN
  { id: 'pros',     em: '🍾', nm: 'Prosecco Freixenet',    sz: '750ml',      pr: 9.49,  cat: 'wein' },
  { id: 'wein-rt',  em: '🍷', nm: 'Zweigelt Rotwein',      sz: '750ml',      pr: 8.99,  cat: 'wein' },
  { id: 'wein-ws',  em: '🍷', nm: 'Grüner Veltliner',      sz: '750ml',      pr: 7.99,  cat: 'wein' },
  { id: 'sekt',     em: '🍾', nm: 'Schlumberger Sekt',     sz: '750ml',      pr: 11.99, cat: 'wein' },
  { id: 'rose',     em: '🍷', nm: 'Rosé Provence',         sz: '750ml',      pr: 9.99,  cat: 'wein' },
  { id: 'merlot',   em: '🍷', nm: 'Merlot Italien',        sz: '750ml',      pr: 7.49,  cat: 'wein' },
  { id: 'champ',    em: '🍾', nm: 'Moët & Chandon',        sz: '750ml',      pr: 39.99, tag: 'TOP', cat: 'wein' },
  { id: 'pinot',    em: '🍷', nm: 'Pinot Grigio',          sz: '750ml',      pr: 8.99,  cat: 'wein' },
  { id: 'cab',      em: '🍷', nm: 'Cabernet Sauvignon',    sz: '750ml',      pr: 10.99, cat: 'wein' },
  { id: 'rie',      em: '🍷', nm: 'Riesling Trocken',      sz: '750ml',      pr: 9.49,  cat: 'wein' },
  { id: 'glüh',     em: '🍷', nm: 'Glühwein Klassik',      sz: '1L',         pr: 5.99,  cat: 'wein' },
  
  // SNACKS
  { id: 'lay',      em: '🍟', nm: "Lay's Max Paprika",     sz: '185g',       pr: 2.49,  tag: 'NEU', cat: 'snacks' },
  { id: 'lay-or',   em: '🍟', nm: "Lay's Original",        sz: '175g',       pr: 2.29,  cat: 'snacks' },
  { id: 'pri',      em: '🥨', nm: 'Pringles Original',     sz: '200g',       pr: 3.49,  cat: 'snacks' },
  { id: 'erd',      em: '🥜', nm: 'Erdnüsse gesalzen',     sz: '250g',       pr: 2.49,  cat: 'snacks' },
  { id: 'pop',      em: '🍿', nm: 'Popcorn süß',           sz: '150g',       pr: 2.29,  cat: 'snacks' },
  { id: 'tuc',      em: '🥨', nm: 'Tuc Cracker',           sz: '100g',       pr: 1.49,  cat: 'snacks' },
  { id: 'salt',     em: '🥖', nm: 'Salzstangen',           sz: '250g',       pr: 1.29,  cat: 'snacks' },
  { id: 'man',      em: '🥜', nm: 'Mandeln geröstet',      sz: '200g',       pr: 3.99,  cat: 'snacks' },
  { id: 'cas',      em: '🥜', nm: 'Cashews',               sz: '200g',       pr: 4.99,  cat: 'snacks' },
  { id: 'cookie',   em: '🍪', nm: 'Choco Chip Cookies',    sz: '300g',       pr: 2.99,  cat: 'snacks' },
  { id: 'doritos',  em: '🌽', nm: 'Doritos Nacho Cheese',  sz: '170g',       pr: 2.99,  cat: 'snacks' },
  { id: 'oliv',     em: '🫒', nm: 'Oliven gefüllt',        sz: '200g',       pr: 3.49,  cat: 'snacks' },
  { id: 'crack',    em: '🥨', nm: 'Wasa Knäckebrot',       sz: '250g',       pr: 2.49,  cat: 'snacks' },
  { id: 'pro',      em: '💪', nm: 'Protein-Riegel',        sz: '60g',        pr: 2.49,  cat: 'snacks' },
  
  // SÜSS
  { id: 'har',      em: '🐻', nm: 'Haribo Goldbären',      sz: '500g',       pr: 3.29,  tag: 'TOP', cat: 'suess' },
  { id: 'mlk',      em: '🍫', nm: 'Milka Oreo',            sz: '300g',       pr: 2.99,  cat: 'suess' },
  { id: 'mlk-al',   em: '🍫', nm: 'Milka Alpenmilch',      sz: '200g',       pr: 2.49,  cat: 'suess' },
  { id: 'twi',      em: '🍬', nm: 'Twix Multipack',        sz: '5er',        pr: 3.99,  cat: 'suess' },
  { id: 'snk',      em: '🍫', nm: 'Snickers Multipack',    sz: '5er',        pr: 3.99,  cat: 'suess' },
  { id: 'kinder',   em: '🍫', nm: 'Kinder Schokolade',     sz: '8er',        pr: 2.49,  cat: 'suess' },
  { id: 'ferrero',  em: '🍬', nm: 'Ferrero Rocher',        sz: '16 Stk',     pr: 6.99,  cat: 'suess' },
  { id: 'mm',       em: '🍬', nm: "M&M's Peanut",          sz: '250g',       pr: 3.49,  cat: 'suess' },
  { id: 'kitkat',   em: '🍫', nm: 'KitKat Multipack',      sz: '9er',        pr: 4.99,  cat: 'suess' },
  { id: 'merci',    em: '🍫', nm: 'Merci Finest',          sz: '250g',       pr: 5.99,  cat: 'suess' },
  { id: 'gummi',    em: '🐍', nm: 'Haribo Schlangen',      sz: '200g',       pr: 1.99,  cat: 'suess' },
  { id: 'choc-m',   em: '🍫', nm: 'Lindt Pralinés',        sz: '180g',       pr: 5.99,  cat: 'suess' },
  { id: 'mil-bd',   em: '🍫', nm: 'Milka Bubbly',          sz: '95g',        pr: 1.99,  cat: 'suess' },
  { id: 'rit',      em: '🍫', nm: 'Ritter Sport Mix',      sz: '5 × 100g',   pr: 6.99,  cat: 'suess' },
  { id: 'after',    em: '🍬', nm: 'After Eight',           sz: '200g',       pr: 4.49,  cat: 'suess' },
  { id: 'wert',     em: '🍬', nm: 'Werthers Original',     sz: '245g',       pr: 2.99,  cat: 'suess' },
  
  // SOFTDRINKS
  { id: 'rb',       em: '🥤', nm: 'Red Bull 4er',          sz: '4 × 250ml',  pr: 5.99,  cat: 'softdrinks' },
  { id: 'mon',      em: '🥤', nm: 'Monster Energy',        sz: '500ml',      pr: 2.19,  cat: 'softdrinks' },
  { id: 'cola',     em: '🥤', nm: 'Coca-Cola',             sz: '1,5L',       pr: 1.99,  cat: 'softdrinks' },
  { id: 'fan',      em: '🥤', nm: 'Fanta Orange',          sz: '1,5L',       pr: 1.99,  cat: 'softdrinks' },
  { id: 'spr',      em: '🥤', nm: 'Sprite',                sz: '1,5L',       pr: 1.99,  cat: 'softdrinks' },
  { id: 'rb1',      em: '🥤', nm: 'Red Bull Original',     sz: '250ml',      pr: 1.69,  cat: 'softdrinks' },
  { id: 'cola-zero',em: '🥤', nm: 'Coca-Cola Zero',        sz: '1,5L',       pr: 1.99,  cat: 'softdrinks' },
  { id: 'spez',     em: '🥤', nm: 'Almdudler',             sz: '1,5L',       pr: 2.29,  cat: 'softdrinks' },
  { id: 'romm',     em: '🥤', nm: 'Römerquelle',           sz: '1,5L',       pr: 0.99,  cat: 'softdrinks' },
  { id: 'eist',     em: '🥤', nm: 'Pfanner Eistee Pfirsich', sz: '2L',       pr: 1.99,  cat: 'softdrinks' },
  { id: 'mate',     em: '🌿', nm: 'Club Mate',             sz: '0,5L',       pr: 1.79,  cat: 'softdrinks' },
  { id: 'gint',     em: '🍸', nm: 'Schweppes Tonic',       sz: '1L',         pr: 2.49,  cat: 'softdrinks' },
  { id: 'rb-kak',   em: '⚡', nm: 'Red Bull Kaktusfrucht', sz: '250ml',      pr: 1.79,  tag: 'NEU', cat: 'softdrinks' },
  { id: 'rb-zero',  em: '⚡', nm: 'Red Bull Zero',         sz: '250ml',      pr: 1.69,  cat: 'softdrinks' },
  { id: 'mon-pipe', em: '⚡', nm: 'Monster Pipeline',      sz: '500ml',      pr: 2.29,  cat: 'softdrinks' },
  { id: 'mon-ult',  em: '⚡', nm: 'Monster Ultra Weiß',    sz: '500ml',      pr: 2.19,  cat: 'softdrinks' },
  { id: 'tee-tk',   em: '🥤', nm: 'Pfanner Eistee Zitrone',sz: '2L',         pr: 1.99,  cat: 'softdrinks' },
  { id: 'rh-app',   em: '🥤', nm: 'Apfelschorle',          sz: '1,5L',       pr: 1.49,  cat: 'softdrinks' },
  { id: 'gat-or',   em: '🥤', nm: 'Gatorade Orange',       sz: '500ml',      pr: 1.99,  cat: 'softdrinks' },
  { id: 'pow-bl',   em: '🥤', nm: 'Powerade Blue',         sz: '500ml',      pr: 1.79,  cat: 'softdrinks' },
  
  // SAFT
  { id: 'cap',      em: '🧃', nm: 'Capri-Sun 10er',        sz: 'Multivitamin', pr: 4.49, cat: 'saft' },
  { id: 'orf',      em: '🍊', nm: 'Orangensaft',           sz: '1L',         pr: 1.99,  cat: 'saft' },
  { id: 'apf',      em: '🧃', nm: 'Apfelsaft naturtrüb',   sz: '1L',         pr: 1.79,  cat: 'saft' },
  { id: 'pago',     em: '🥭', nm: 'Pago Maracuja',         sz: '200ml',      pr: 1.59,  cat: 'saft' },
  { id: 'rauch',    em: '🍑', nm: 'Rauch Multivitamin',    sz: '1L',         pr: 1.99,  cat: 'saft' },
  
  // FERTIG
  { id: 'piz',      em: '🍕', nm: 'Dr. Oetker Pizza Salami', sz: '340g',     pr: 3.69,  tag: 'NEU', cat: 'fertig' },
  { id: 'piz-fu',   em: '🍕', nm: 'Dr. Oetker Funghi',     sz: '325g',       pr: 3.49,  cat: 'fertig' },
  { id: 'piz-tu',   em: '🍕', nm: 'Dr. Oetker Tuna',       sz: '370g',       pr: 3.79,  cat: 'fertig' },
  { id: 'piz-st',   em: '🍕', nm: 'Steinofenpizza',        sz: '350g',       pr: 3.99,  cat: 'fertig' },
  { id: 'lasa',     em: '🍝', nm: 'Lasagne Bolognese',     sz: '400g',       pr: 3.99,  cat: 'fertig' },
  { id: 'maggi',    em: '🍜', nm: 'Maggi 5 Min Terrine',   sz: '60g',        pr: 1.49,  cat: 'fertig' },
  { id: 'kebap',    em: '🌯', nm: 'TK Kebap',              sz: '250g',       pr: 3.99,  cat: 'fertig' },
  
  // KÜHL
  { id: 'milch',    em: '🥛', nm: 'Vollmilch 3,5%',        sz: '1L',         pr: 1.49,  cat: 'kuehl' },
  { id: 'butt',     em: '🧈', nm: 'Kerrygold Butter',      sz: '250g',       pr: 2.99,  cat: 'kuehl' },
  { id: 'butt-l',   em: '🧈', nm: 'Landliebe Butter',      sz: '250g',       pr: 2.79,  cat: 'kuehl' },
  { id: 'jog',      em: '🥛', nm: 'Joghurt Natur',         sz: '500g',       pr: 1.49,  cat: 'kuehl' },
  { id: 'kaese',    em: '🧀', nm: 'Bergkäse',              sz: '200g',       pr: 3.99,  cat: 'kuehl' },
  { id: 'salami',   em: '🥓', nm: 'Salami Würfel',         sz: '200g',       pr: 2.99,  cat: 'kuehl' },
  { id: 'wur',      em: '🌭', nm: 'Wiener Würstel',        sz: '10er',       pr: 3.99,  cat: 'kuehl' },
  { id: 'leberk',   em: '🥪', nm: 'Leberkäse Aufschnitt',  sz: '150g',       pr: 2.49,  cat: 'kuehl' },
  { id: 'feta',     em: '🧀', nm: 'Feta Salakis',          sz: '200g',       pr: 2.79,  cat: 'kuehl' },
  { id: 'moz',      em: '🧀', nm: 'Mozzarella',            sz: '125g',       pr: 1.49,  cat: 'kuehl' },
  { id: 'hum',      em: '🥣', nm: 'Hummus Classic',        sz: '200g',       pr: 2.49,  cat: 'kuehl' },
  { id: 'tzatziki', em: '🥒', nm: 'Tzatziki Dip',          sz: '200g',       pr: 2.29,  cat: 'kuehl' },
  { id: 'sahne',    em: '🥛', nm: 'Schlagobers',           sz: '250ml',      pr: 1.29,  cat: 'kuehl' },
  
  // KAFFEE
  { id: 'kaf',      em: '☕', nm: 'Tchibo Cafissimo',      sz: '10 Kapseln', pr: 3.99,  cat: 'kaffee' },
  { id: 'tee',      em: '🍵', nm: 'Teekanne Earl Grey',    sz: '20 Beutel',  pr: 2.49,  cat: 'kaffee' },
  { id: 'jacobs',   em: '☕', nm: 'Jacobs Krönung',        sz: '500g',       pr: 5.49,  cat: 'kaffee' },
  { id: 'nespresso',em: '☕', nm: 'Nespresso Kapseln',     sz: '10er',       pr: 4.99,  cat: 'kaffee' },
  
  // TABAK
  { id: 'marl',     em: '🚬', nm: 'Marlboro Red',          sz: '20er Box',   pr: 7.50,  cat: 'tabak' },
  { id: 'marl-g',   em: '🚬', nm: 'Marlboro Gold',         sz: '20er Box',   pr: 7.50,  cat: 'tabak' },
  { id: 'lucky',    em: '🚬', nm: 'Lucky Strike',          sz: '20er Box',   pr: 7.20,  cat: 'tabak' },
  { id: 'camel',    em: '🚬', nm: 'Camel Filter',          sz: '20er Box',   pr: 7.30,  cat: 'tabak' },
  { id: 'pall',     em: '🚬', nm: 'Pall Mall Red',         sz: '20er Box',   pr: 6.80,  cat: 'tabak' },
  { id: 'che-r',    em: '🚬', nm: 'Chesterfield Red',      sz: '20er Box',   pr: 6.50,  cat: 'tabak' },
  { id: 'tab-dr',   em: '🚬', nm: 'Drum Tabak',            sz: '40g',        pr: 9.50,  cat: 'tabak' },
  { id: 'tab-pue',  em: '🚬', nm: 'Pueblo Tabak',          sz: '30g',        pr: 7.50,  cat: 'tabak' },
  { id: 'pap',      em: '📄', nm: 'OCB Filter Tips',       sz: '120 Stk',    pr: 1.49,  cat: 'tabak' },
  { id: 'pap-l',    em: '📄', nm: 'Long Papers Slim',      sz: '32 Stk',     pr: 1.29,  cat: 'tabak' },
  { id: 'feu',      em: '🔥', nm: 'Bic Feuerzeug',         sz: '1 Stk',      pr: 1.29,  cat: 'tabak' },
  { id: 'shi',      em: '💨', nm: 'Shisha Kohle',          sz: '1kg',        pr: 4.99,  cat: 'tabak' },
  
  // EIS
  { id: 'mag',      em: '🍦', nm: 'Magnum Classic',        sz: '4er Pack',   pr: 5.99,  tag: 'NEU', cat: 'eis' },
  { id: 'mag-w',    em: '🍦', nm: 'Magnum Weiß',           sz: '4er Pack',   pr: 5.99,  cat: 'eis' },
  { id: 'cor-eis',  em: '🍦', nm: 'Cornetto Erdbeer',      sz: '4er Pack',   pr: 4.49,  cat: 'eis' },
  { id: 'ben',      em: '🍨', nm: "Ben & Jerry's Cookie Dough", sz: '465ml', pr: 6.99,  tag: 'TOP', cat: 'eis' },
  { id: 'ben-c',    em: '🍨', nm: "Ben & Jerry's Chocolate Fudge", sz: '465ml', pr: 6.99, cat: 'eis' },
  { id: 'haag',     em: '🍨', nm: 'Häagen-Dazs Vanilla',   sz: '460ml',      pr: 5.99,  cat: 'eis' },
  { id: 'eski',     em: '🍡', nm: 'Eskimo Twinni',         sz: '8er Pack',   pr: 3.99,  cat: 'eis' },
  { id: 'tk-piz',   em: '🍕', nm: 'TK Pizza Margherita',   sz: '350g',       pr: 2.99,  cat: 'eis' },
  { id: 'tk-mini',  em: '🥟', nm: 'TK Mini Pizza Snacks',  sz: '250g',       pr: 3.49,  cat: 'eis' },
  { id: 'tk-gar',   em: '🍤', nm: 'TK Garnelen',           sz: '200g',       pr: 5.99,  cat: 'eis' },
  { id: 'tk-fri',   em: '🍟', nm: 'TK Pommes Frites',      sz: '1kg',        pr: 3.49,  cat: 'eis' },
  
  // FRÜHSTÜCK
  { id: 'corn',     em: '🥣', nm: 'Kelloggs Cornflakes',   sz: '500g',       pr: 3.49,  cat: 'fruehstueck' },
  { id: 'frosti',   em: '🥣', nm: 'Frosties',              sz: '375g',       pr: 3.99,  cat: 'fruehstueck' },
  { id: 'mues',     em: '🥣', nm: 'Verival Bio Müsli',     sz: '500g',       pr: 4.99,  cat: 'fruehstueck' },
  { id: 'haf',      em: '🌾', nm: 'Haferflocken',          sz: '500g',       pr: 1.49,  cat: 'fruehstueck' },
  { id: 'nutella',  em: '🍫', nm: 'Nutella',               sz: '400g',       pr: 4.49,  tag: 'TOP', cat: 'fruehstueck' },
  { id: 'mar',      em: '🍓', nm: 'Erdbeermarmelade',      sz: '450g',       pr: 2.99,  cat: 'fruehstueck' },
  { id: 'hon',      em: '🍯', nm: 'Honig Imker',           sz: '500g',       pr: 6.99,  cat: 'fruehstueck' },
  { id: 'erd-but',  em: '🥜', nm: 'Erdnussbutter',         sz: '350g',       pr: 3.99,  cat: 'fruehstueck' },
  { id: 'crois',    em: '🥐', nm: 'Croissants',            sz: '4er',        pr: 2.99,  cat: 'fruehstueck' },
  { id: 'oats',     em: '🥣', nm: 'Oats & More',           sz: '500g',       pr: 3.49,  cat: 'fruehstueck' },
  
  // BACK
  { id: 'toast',    em: '🍞', nm: 'Toastbrot Weiß',        sz: '500g',       pr: 1.49,  cat: 'back' },
  { id: 'voll',     em: '🍞', nm: 'Vollkorntoast',         sz: '500g',       pr: 1.79,  cat: 'back' },
  { id: 'sem',      em: '🥖', nm: 'Semmel Frisch',         sz: '5 Stk',      pr: 1.99,  cat: 'back' },
  { id: 'baguette', em: '🥖', nm: 'Baguette',              sz: '250g',       pr: 1.49,  cat: 'back' },
  { id: 'kornsp',   em: '🥨', nm: 'Kornspitz',             sz: '5er',        pr: 2.49,  cat: 'back' },
  { id: 'brez',     em: '🥨', nm: 'Brezel',                sz: '2 Stk',      pr: 1.99,  cat: 'back' },
  
  // GEWÜRZE
  { id: 'salz',     em: '🧂', nm: 'Salz fein',             sz: '500g',       pr: 0.79,  cat: 'gewuerz' },
  { id: 'pfe',      em: '⚫', nm: 'Pfeffer schwarz',       sz: '50g',        pr: 1.99,  cat: 'gewuerz' },
  { id: 'oeli',     em: '🫒', nm: 'Olivenöl Extra',        sz: '500ml',      pr: 5.99,  cat: 'gewuerz' },
  { id: 'sonn',     em: '🌻', nm: 'Sonnenblumenöl',        sz: '1L',         pr: 2.49,  cat: 'gewuerz' },
  { id: 'ketchup',  em: '🍅', nm: 'Heinz Ketchup',         sz: '500ml',      pr: 3.49,  cat: 'gewuerz' },
  { id: 'mayo',     em: '🥚', nm: 'Mayo Hellmanns',        sz: '400ml',      pr: 3.99,  cat: 'gewuerz' },
  { id: 'sen',      em: '🌭', nm: 'Estragonsenf',          sz: '200g',       pr: 1.49,  cat: 'gewuerz' },
  
  // KONSERVE
  { id: 'thun',     em: '🐟', nm: 'Thunfisch in Öl',       sz: '185g',       pr: 1.99,  cat: 'konserve' },
  { id: 'tom',      em: '🍅', nm: 'Tomaten geschält',      sz: '400g',       pr: 0.99,  cat: 'konserve' },
  { id: 'mais',     em: '🌽', nm: 'Mais Dose',             sz: '285g',       pr: 1.29,  cat: 'konserve' },
  { id: 'boh',      em: '🫘', nm: 'Kidneybohnen',          sz: '400g',       pr: 1.49,  cat: 'konserve' },
  { id: 'ravi',     em: '🥫', nm: 'Ravioli Dose',          sz: '800g',       pr: 2.99,  cat: 'konserve' },
  { id: 'spag',     em: '🍝', nm: 'Spaghetti Barilla',     sz: '500g',       pr: 1.99,  cat: 'konserve' },
  { id: 'penne',    em: '🍝', nm: 'Penne Barilla',         sz: '500g',       pr: 1.99,  cat: 'konserve' },
  { id: 'reis',     em: '🍚', nm: 'Basmati Reis',          sz: '1kg',        pr: 3.99,  cat: 'konserve' },
  { id: 'mehl',     em: '🌾', nm: 'Mehl Universal',        sz: '1kg',        pr: 1.49,  cat: 'konserve' },
  
  // OBST
  { id: 'apf-fr',   em: '🍎', nm: 'Äpfel Gala',            sz: '1kg',        pr: 2.49,  cat: 'obst' },
  { id: 'ban',      em: '🍌', nm: 'Bananen',               sz: '1kg',        pr: 1.79,  cat: 'obst' },
  { id: 'oran',     em: '🍊', nm: 'Orangen',               sz: '1kg',        pr: 2.49,  cat: 'obst' },
  { id: 'zit',      em: '🍋', nm: 'Zitronen',              sz: '500g',       pr: 1.99,  cat: 'obst' },
  { id: 'tom-fr',   em: '🍅', nm: 'Tomaten frisch',        sz: '500g',       pr: 2.49,  cat: 'obst' },
  { id: 'gur',      em: '🥒', nm: 'Salatgurke',            sz: '1 Stk',      pr: 1.29,  cat: 'obst' },
  { id: 'pap-pap',  em: '🌶️', nm: 'Paprika Mix',           sz: '500g',       pr: 2.99,  cat: 'obst' },
  { id: 'zwie',     em: '🧅', nm: 'Zwiebeln gelb',         sz: '1kg',        pr: 1.49,  cat: 'obst' },
  { id: 'kart',     em: '🥔', nm: 'Kartoffeln',            sz: '2kg',        pr: 2.99,  cat: 'obst' },
  { id: 'avo',      em: '🥑', nm: 'Avocado reif',          sz: '1 Stk',      pr: 1.99,  cat: 'obst' },
  { id: 'kno',      em: '🧄', nm: 'Knoblauch',             sz: '3er',        pr: 1.49,  cat: 'obst' },
  { id: 'inge',     em: '🫚', nm: 'Ingwer frisch',         sz: '200g',       pr: 1.99,  cat: 'obst' },
  
  // DROGERIE
  { id: 'sham',     em: '🧴', nm: 'Shampoo Pantene',       sz: '500ml',      pr: 3.99,  cat: 'drogerie' },
  { id: 'duschgel', em: '🧴', nm: 'Dove Duschgel',         sz: '500ml',      pr: 2.99,  cat: 'drogerie' },
  { id: 'sei',      em: '🧼', nm: 'Handseife Sagrotan',    sz: '250ml',      pr: 2.49,  cat: 'drogerie' },
  { id: 'zahn',     em: '🦷', nm: 'Colgate Zahnpasta',     sz: '100ml',      pr: 2.99,  cat: 'drogerie' },
  { id: 'zahnb',    em: '🪥', nm: 'Zahnbürste Mittel',     sz: '1 Stk',      pr: 1.99,  cat: 'drogerie' },
  { id: 'deo',      em: '💨', nm: 'Nivea Deo Roll-on',     sz: '50ml',       pr: 2.49,  cat: 'drogerie' },
  { id: 'rasie',    em: '🪒', nm: 'Gillette Rasierer',     sz: '5er',        pr: 5.99,  cat: 'drogerie' },
  { id: 'tamp',     em: '🌸', nm: 'Tampons Always',        sz: '24er',       pr: 4.49,  cat: 'drogerie' },
  { id: 'binden',   em: '🌸', nm: 'Binden Always Ultra',   sz: '14er',       pr: 3.49,  cat: 'drogerie' },
  { id: 'kondom',   em: '❤️', nm: 'Durex Kondome',         sz: '12er',       pr: 9.99,  cat: 'drogerie' },
  
  // HAUSHALT
  { id: 'klp',      em: '🧻', nm: 'Klopapier 10er',        sz: '3-lagig',    pr: 5.99,  cat: 'haushalt' },
  { id: 'taps',     em: '😷', nm: 'Taschentücher 10er',    sz: 'Pack',       pr: 2.49,  cat: 'haushalt' },
  { id: 'spu',      em: '🧽', nm: 'Spülschwamm 5er',       sz: 'Pack',       pr: 1.99,  cat: 'haushalt' },
  { id: 'mll',      em: '🗑', nm: 'Müllbeutel 60L',        sz: '10 Stk',     pr: 2.99,  cat: 'haushalt' },
  { id: 'wcr',      em: '🧴', nm: 'WC-Reiniger',           sz: '750ml',      pr: 2.49,  cat: 'haushalt' },
  { id: 'spuel',    em: '🧴', nm: 'Spülmittel Pril',       sz: '675ml',      pr: 2.99,  cat: 'haushalt' },
  { id: 'glas',     em: '🧴', nm: 'Glasreiniger',          sz: '750ml',      pr: 2.49,  cat: 'haushalt' },
  { id: 'wasch',    em: '🧴', nm: 'Waschmittel Persil',    sz: '1,3kg',      pr: 6.99,  cat: 'haushalt' },
  { id: 'al',       em: '🍶', nm: 'Alufolie 30m',          sz: '1 Rolle',    pr: 2.99,  cat: 'haushalt' },
  { id: 'fri',      em: '🍶', nm: 'Frischhaltefolie',      sz: '30m',        pr: 1.99,  cat: 'haushalt' },
  { id: 'kerz-h',   em: '🕯️', nm: 'Yankee Candle Vanille', sz: '104g',       pr: 8.99,  cat: 'haushalt' },
  { id: 'air',      em: '🌸', nm: 'Lufterfrischer',        sz: '300ml',      pr: 2.99,  cat: 'haushalt' },
  { id: 'wasch-w',  em: '🧴', nm: 'Weichspüler Lenor',     sz: '750ml',      pr: 3.49,  cat: 'haushalt' },
  { id: 'akku',     em: '🔋', nm: 'Duracell AA Batterien', sz: '4er',        pr: 4.99,  cat: 'haushalt' },
  { id: 'gluehb',   em: '💡', nm: 'LED Glühbirne E27',     sz: '9W',         pr: 3.99,  cat: 'haushalt' },
  
  // BABY
  { id: 'win',      em: '👶', nm: 'Pampers Premium 4',     sz: '37 Stk',     pr: 14.99, cat: 'baby' },
  { id: 'feucht',   em: '💧', nm: 'Pampers Feuchttücher',  sz: '80er',       pr: 1.99,  cat: 'baby' },
  { id: 'milup',    em: '🍼', nm: 'Milupa Folgemilch 2',   sz: '800g',       pr: 18.99, cat: 'baby' },
  { id: 'gla',      em: '🍓', nm: 'Hipp Apfel-Erdbeere',   sz: '190g',       pr: 1.49,  cat: 'baby' },
  
  // PARTY
  { id: 'pap-tel',  em: '🍽️', nm: 'Pappteller 12er',       sz: 'Pack',       pr: 2.99,  cat: 'party' },
  { id: 'pap-bec',  em: '🥤', nm: 'Pappbecher 20er',       sz: 'Pack',       pr: 1.99,  cat: 'party' },
  { id: 'serv',     em: '🧻', nm: 'Servietten 30er',       sz: 'Pack',       pr: 1.49,  cat: 'party' },
  { id: 'kerz',     em: '🕯️', nm: 'Geburtstagskerzen',     sz: '10er',       pr: 1.49,  cat: 'party' },
  { id: 'luft',     em: '🎈', nm: 'Luftballons bunt',      sz: '25er',       pr: 2.99,  cat: 'party' },
  { id: 'konfe',    em: '🎊', nm: 'Konfetti-Kanone',       sz: '1 Stk',      pr: 3.99,  cat: 'party' },
  
  // BIO
  { id: 'tofu',     em: '🟫', nm: 'Bio Tofu Natur',        sz: '400g',       pr: 2.99,  cat: 'bio' },
  { id: 'soja',     em: '🥛', nm: 'Sojadrink Alpro',       sz: '1L',         pr: 2.49,  cat: 'bio' },
  { id: 'hafe',     em: '🥛', nm: 'Haferdrink Bio',        sz: '1L',         pr: 2.99,  cat: 'bio' },
  { id: 'kic',      em: '🫘', nm: 'Bio Kichererbsen',      sz: '400g',       pr: 1.99,  cat: 'bio' },
  { id: 'quin',     em: '🌾', nm: 'Quinoa Bio',            sz: '500g',       pr: 5.99,  cat: 'bio' },
  { id: 'huel',     em: '🌾', nm: 'Hülsenfrüchte Mix',     sz: '400g',       pr: 2.49,  cat: 'bio' },
  
  // TIER
  { id: 'kat',      em: '🐱', nm: 'Whiskas Trockenfutter', sz: '800g',       pr: 4.99,  cat: 'tier' },
  { id: 'hun',      em: '🐶', nm: 'Pedigree Adult',        sz: '400g Dose',  pr: 1.99,  cat: 'tier' },
  { id: 'kat-na',   em: '🐱', nm: 'Sheba Nassfutter',      sz: '85g',        pr: 0.89,  cat: 'tier' },
];

// ── DEALS (Flash Deals) ──
const DEALS = [
  { id: 'd1', em: '🍺', nm: 'Stiegl 6er-Pack',        sz: '6 × 0,5L', op: 8.99,  np: 5.99,  badge: '-33%' },
  { id: 'd2', em: '🍕', nm: 'Pizza-Deal Doppelpack',  sz: '2 × Salami', op: 7.38, np: 4.99, badge: '-32%' },
  { id: 'd3', em: '🥃', nm: "Jack Daniel's",          sz: '700ml',    op: 21.99, np: 16.99, badge: '-23%' },
  { id: 'd4', em: '🍫', nm: 'Milka Mix-Pack',         sz: '5 × 100g', op: 9.95,  np: 6.99,  badge: '-30%' },
  { id: 'd5', em: '🥤', nm: 'Red Bull 8er',           sz: '8 × 250ml', op: 12.99, np: 8.99, badge: '-31%' },
  { id: 'd6', em: '🍦', nm: "Ben & Jerry's 2er",      sz: '2 × 465ml', op: 13.98, np: 9.99, badge: '-29%' },
];

// ── BUNDLES ──
const BUNDLES = [
  { id: 'b1', tag: '⚡ Bestseller', ttl: 'Netflix & Chill', slots: ['lay','har','rb','mlk'], discountPct: 0.13 },
  { id: 'b2', tag: '🎉 Party',      ttl: 'Hausparty Starter', slots: ['ott6','pros','lay','har'], discountPct: 0.18 },
  { id: 'b3', tag: '🥃 Premium',    ttl: "Gentleman's Night", slots: ['jack','rb','lay','mlk'], discountPct: 0.15 },
  { id: 'b4', tag: '🍕 Hunger',     ttl: 'Pizza-Abend', slots: ['piz','cola','har','ben'], discountPct: 0.12 },
];

// ── ZONES ──
const ZONES = {
  A: {
    name: 'Zone A',
    mbw: 29.90,
    cities: [
      { name: 'Linz',       plz: ['4020','4021','4030','4040','4041','4042'] },
      { name: 'Leonding',   plz: ['4060','4061'] },
      { name: 'Pasching',   plz: ['4063'] },
      { name: 'Hörsching',  plz: ['4063'] },
      { name: 'Traun',      plz: ['4050','4052'] },
      { name: 'Pucking',    plz: ['4055'] },
      { name: 'Ansfelden',  plz: ['4052'] },
      { name: 'St. Florian',plz: ['4490'] },
      { name: 'Asten',      plz: ['4484'] },
      { name: 'Enns',       plz: ['4470'] },
      { name: 'Ennsdorf',   plz: ['4470'] },
      { name: 'Steyregg',   plz: ['4221'] },
    ],
  },
  B: {
    name: 'Zone B',
    mbw: 49.90,
    cities: [
      { name: 'Kronstorf',       plz: ['4484'] },
      { name: 'Sankt Pantaleon', plz: ['4303'] },
      { name: 'Sankt Valentin',  plz: ['4300'] },
      { name: 'Marchtrenk',      plz: ['4614'] },
      { name: 'Wels',            plz: ['4600','4601','4602'] },
      { name: 'Steyr',           plz: ['4400','4401'] },
    ],
  },
};

// Build PLZ lookup
const PLZ_TO_ZONE = {};
Object.entries(ZONES).forEach(([zone, data]) => {
  data.cities.forEach(c => c.plz.forEach(p => PLZ_TO_ZONE[p] = zone));
});

// ── FAQ ──
const FAQS = [
  { q: 'Wie schnell ist die Lieferung?', a: 'Wir liefern in <60 Minuten innerhalb Zone A. Falls wir es nicht schaffen, bekommst du einen Rabattcode für deine nächste Bestellung.' },
  { q: 'Wie funktioniert die Pfandrückgabe?', a: 'Du bekommst <strong>0,25€ pro Flasche direkt vom Fahrer in bar</strong>. Einfach Pfandflaschen bereitstellen, der Fahrer zählt durch und gibt dir das Geld auf die Hand. Kein Verrechnen, kein Warten.' },
  { q: 'Welche Zahlungsarten akzeptiert ihr?', a: 'Bar bei Lieferung, Karte vor Ort, Apple Pay, Google Pay, Visa und Mastercard. Bei WhatsApp-Bestellung kannst du auch PayPal nutzen.' },
  { q: 'Wo liefert ihr hin?', a: 'Linz und Umgebung in 2 Zonen. Zone A (MBW €29,90): Linz, Leonding, Traun, Enns, Pasching... Zone B (MBW €49,90): Wels, Steyr und weiter entferntes Umland.' },
  { q: 'Wann habt ihr offen?', a: 'Di-Do & So: 19-24 Uhr. Fr-Sa: 19-2 Uhr früh. Montags geschlossen.' },
  { q: 'Wie kann ich bestellen?', a: 'Am schnellsten per WhatsApp: Produkte in den Warenkorb, Adresse eingeben, fertig! Oder direkt auf spaetii.at.' },
  { q: 'Was ist der Mindestbestellwert?', a: 'Zone A: €29,90 · Zone B: €49,90. Lieferkosten: pauschal €2,99.' },
  { q: 'Wie funktioniert der Battle Pass?', a: 'Bei jeder Bestellung steigt der Community-Counter. Bei 25/50/75/100 Bestellungen heute werden Belohnungen freigeschaltet, von denen ALLE profitieren!' },
];

// ── REVIEWS ──
const REVIEWS = [
  { stars: 5, text: 'Bestellung kam in 35 Min – krass schnell! Pfand wurde sofort cash gegeben. Alles top!', name: 'Maria K.', loc: 'Linz', initials: 'MK' },
  { stars: 5, text: 'Endlich ein Spätii in Linz! Riesige Auswahl, faire Preise, super netter Fahrer. Empfehlung!', name: 'Tobias S.', loc: 'Leonding', initials: 'TS' },
  { stars: 5, text: 'Mega Service – auch Fr/Sa bis 2 Uhr früh! Pizza war noch heiß als sie ankam. 10/10', name: 'Sandra W.', loc: 'Traun', initials: 'SW' },
  { stars: 5, text: 'WhatsApp-Bestellung funktioniert perfekt. Super unkompliziert!', name: 'Laura P.', loc: 'Pasching', initials: 'LP' },
  { stars: 5, text: 'Habe schon 8x bestellt, immer alles top. Battle Pass macht Spaß!', name: 'Markus H.', loc: 'Linz', initials: 'MH' },
  { stars: 5, text: 'Cooles Konzept! Endlich jemand der wirklich nachts liefert. Pfand-Cash auf Hand ist genial.', name: 'Anna B.', loc: 'Enns', initials: 'AB' },
];

// ── INSTAGRAM TILES ──
const INSTA_TILES = [
  { em: '🌙', txt: 'Nacht-Lieferung', likes: 247 },
  { em: '🍺', txt: 'Eiskalt geliefert', likes: 184 },
  { em: '🚗', txt: 'Linz by Night', likes: 312 },
  { em: '🎉', txt: 'Hausparty Setup', likes: 198 },
  { em: '🍕', txt: 'Snack Attack', likes: 156 },
  { em: '⚡', txt: 'Flash Deal', likes: 421 },
];

// ── FEATURES ──
const FEATURES = [
  { ic: '🌙', ttl: 'Da wenn andere schlafen', txt: 'Di-Do & So bis Mitternacht. Fr-Sa bis 2 Uhr früh. Bei dir wenn andere zu sind.' },
  { ic: '⚡', ttl: 'Unter 60 Minuten', txt: 'Auto-Lieferung in unter einer Stunde. Wenn nicht: Rabattcode für dich.' },
  { ic: '💰', ttl: 'Pfand = Cash auf Hand', txt: '0,25€ pro Flasche bekommst du direkt vom Fahrer in bar. Kein Verrechnen.' },
  { ic: '👑', ttl: 'Community Battle Pass', txt: 'Gemeinsam bestellen – alle gewinnen. Belohnungen für die ganze Stadt!' },
  { ic: '💳', ttl: 'Alle Zahlungsarten', txt: 'Bar, Karte, Apple Pay, Google Pay, Visa, Mastercard. Du wählst.' },
  { ic: '🔒', ttl: '100% sicher', txt: 'Verschlüsselte Bestellung, keine Daten-Sammlung, DSGVO-konform.' },
];

// ── BATTLE PASS REWARDS ──
const BP_REWARDS = [
  { at: 25,  em: '🎟️', nm: '5% Rabatt', sub: 'Für alle heutigen Besteller' },
  { at: 50,  em: '🚗', nm: 'Gratis Lieferung', sub: 'Lieferkosten für alle' },
  { at: 75,  em: '🔥', nm: '10% Rabatt', sub: 'Exklusiv Community' },
  { at: 100, em: '👑', nm: 'Mystery Box', sub: 'Überraschung für alle!' },
];

// ── QUICK LISTS (vorgefertigte Einkaufslisten) ──
const QUICKLISTS = [
  {
    id: 'movie-night',
    em: '🎬',
    nm: 'Movie-Night',
    sub: 'Für 2 Personen · Chill-Modus',
    products: ['lay', 'mlk', 'rb', 'ben', 'cola', 'har'],
    color: '#C040F0'
  },
  {
    id: 'hausparty-5',
    em: '🎉',
    nm: 'Hausparty 5 Personen',
    sub: 'Bier, Snacks, Spirits',
    products: ['ott6', 'jack', 'lay-or', 'pri', 'rb', 'mlk-al', 'pros', 'doritos'],
    color: '#28C8F0'
  },
  {
    id: 'romantic',
    em: '🍷',
    nm: 'Romantischer Abend',
    sub: 'Wein, Käse, Süßes',
    products: ['pros', 'wein-rt', 'kaese', 'choc-m', 'oliv'],
    color: '#FF6B9D'
  },
  {
    id: 'snack-attack',
    em: '🍿',
    nm: 'Snack Attack',
    sub: 'Alles zum Naschen',
    products: ['lay', 'pri', 'har', 'mlk', 'twi', 'doritos', 'mm', 'pop'],
    color: '#FF9F40'
  },
  {
    id: 'frühstück',
    em: '🥐',
    nm: 'Sonntags-Frühstück',
    sub: 'Croissants, Nutella & mehr',
    products: ['crois', 'nutella', 'orf', 'butt', 'milch', 'kaf'],
    color: '#FFC107'
  },
  {
    id: 'pizza-bier',
    em: '🍕',
    nm: 'Pizza & Bier',
    sub: 'Klassiker zum WG-Abend',
    products: ['piz', 'piz-fu', 'ott6', 'lay', 'doritos'],
    color: '#FF5722'
  },
];

// Expose to global scope
window.SP_DATA = {
  CATEGORIES, CAT_NAMES, PRODUCTS, DEALS, BUNDLES,
  ZONES, PLZ_TO_ZONE, FAQS, REVIEWS, INSTA_TILES, FEATURES, BP_REWARDS, QUICKLISTS
};
