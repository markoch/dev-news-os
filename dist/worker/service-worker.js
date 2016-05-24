var cacheName = 'jsnewsPWA001';
var filesToCache = [
    '/img/lamp.jpg',
    '/img/background.jpg'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request)
    .then(function(response) {
        if (response) {
            return response;
        }
        return fetch(e.request);
    })
  );
});
