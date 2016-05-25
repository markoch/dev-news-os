var cacheName = 'jsnewsPWA002';
var filesToCache = [
    '/img/lamp.jpg'
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] install');
  e.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
        if (response) {
            console.log("Get from cache");
            return response;
        }
        return fetch(e.request);
    })
  );
});
