const CACHE_NAME = 'iahn-v46-1-local';
const CORE = ['./','./index.html','./style.css','./script-v46-local.js','./manifest.webmanifest','./assets/pwa/icon-192.png','./assets/pwa/icon-512.png','./assets/pwa/apple-touch-icon.png','./assets/start/background.png','./assets/start/title.png','./assets/start/button.png','./assets/pwa/install-button.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).then(response => {
    const copy=response.clone();
    caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)).catch(()=>{});
    return response;
  }).catch(()=>caches.match(event.request)));
});
