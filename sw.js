var CACHE_NAME = 'freespiritsyogali-cache-v-327845283756';
var urlsToCache = [
  '/',
  '/index.html',
  '/classes.html',
  '/location.html',
  '/rates.html',
  '/schedule.html',
  '/teachers.html',
  '/guidelines.html',
  '/heat.html',
  '/workshops.html',
  '/images/map-static.gif',
  '/images/soc-icon-sprite.png',
  '/images/head-bg.jpg',
  '/images/bottom-bg.gif',
  '/css/styles.css',
  '/images/free-spirits-logo.png',
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

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e){
  console.log('[ServiceWorker] Fetch', e.request.url);
  if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') return;
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});