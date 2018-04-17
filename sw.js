var CACHE_NAME = 'freespiritsyogali-cache';
var urlsToCache = [
  '/',
  '/css/styles.css',
  '/images/free-spirits-logo.png'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(e){

});