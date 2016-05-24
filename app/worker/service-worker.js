var cacheName = 'jsnewsPWA002';
var filesToCache = [
    '/img/lamp.jpg'
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] install');
  e.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
        console.log('[ServiceWorker] Fetch');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request)
    .then(function(response) {
        if (response) {
            console.log("Get from cache");
            return response;
        }
        return fetch(e.request);
    })
  );
});
