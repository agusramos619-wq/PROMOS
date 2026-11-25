// Service worker: guarda la app para usarla sin conexión.
// Cambiá VERSION cada vez que modifiques index.html, así los celulares bajan la versión nueva.
const VERSION = 'promos-v2';
const APP = ['./', './index.html', './manifest.json', './icons/icon-180.png', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Datos: primero internet (para tener lo último); si no hay conexión, la última copia guardada.
  if (url.pathname.endsWith('promos.json')) {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone();
      caches.open(VERSION).then(c => c.put('./promos.json', copy));
      return res;
    }).catch(() => caches.match('./promos.json')));
    return;
  }
  // Resto de la app: primero lo guardado (abre rápido), si no está, internet.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok && url.origin === location.origin) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});
