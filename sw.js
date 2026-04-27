/* ═══════════════════════════════════════════
   SPÄTII SERVICE WORKER · v4.1
   PWA: Offline-Modus + Schnelles Laden
   ═══════════════════════════════════════════ */

const CACHE_NAME = 'spaetii-v4.1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/main.css',
  './js/data.js',
  './js/app.js',
  './manifest.json'
];

// Install: Cache wichtige Files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: Alte Caches löschen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: Network-First mit Cache-Fallback
self.addEventListener('fetch', (event) => {
  // Nur GET-Requests cachen
  if (event.request.method !== 'GET') return;
  
  // WhatsApp/externe Links nicht cachen
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Erfolg: Cache aktualisieren
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Offline: Aus Cache laden
        return caches.match(event.request)
          .then((cached) => cached || caches.match('./index.html'));
      })
  );
});
