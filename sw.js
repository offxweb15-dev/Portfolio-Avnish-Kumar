const CACHE_NAME = 'portfolio-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.min.css',
  '/css/anime-theme.css',
  '/js/main.js',
  '/js/anime-effects.js',
  '/img/portfolio.webp',
  '/favicon.ico'
];

// Install event - cache all static assets with better error handling
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching assets');
        // Cache each asset individually to prevent total failure on single error
        return Promise.all(
          ASSETS.map(url => {
            return fetch(url, { credentials: 'same-origin' })
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
                }
                return cache.put(url, response);
              })
              .catch(err => {
                console.warn(`Couldn't cache ${url}:`, err);
                // Continue with other assets even if one fails
                return Promise.resolve();
              });
          })
        );
      })
      .catch(err => {
        console.error('Cache initialization error:', err);
      })
  );
  // Force the waiting service worker to become active
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  
  // Skip cross-origin requests and browser extensions
  if (!event.request.url.startsWith(self.location.origin) || 
      requestUrl.protocol === 'chrome-extension:' ||
      requestUrl.protocol === 'chrome:' ||
      event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Otherwise, fetch from network
        return fetch(event.request)
          .then(response => {
            // Don't cache non-200 responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the fetched response
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});
