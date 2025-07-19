// Service Worker for cache management
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html'
];

// Install event
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event with cache-first strategy for assets, network-first for documents
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // If PDF request, always fetch from network to get latest version
        if (event.request.url.includes('.pdf')) {
          return fetch(event.request);
        }
        
        // If HTML request, try network first
        if (event.request.url.includes('.html') || event.request.url.endsWith('/')) {
          return fetch(event.request).catch(function() {
            return response;
          });
        }
        
        // For other assets, return cache if available, otherwise fetch
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
