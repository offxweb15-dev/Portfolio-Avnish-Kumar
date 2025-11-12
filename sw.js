const CACHE_NAME = 'portfolio-v3';
const ASSETS = [
  './',
  './index.html',
  './css/style.min.css',
  './css/anime-theme.css',
  './js/main.js',
  './js/anime-effects.js',
  './img/portfolio.webp',
  './favicon.ico'
];

// Install event - cache all static assets with better error handling
self.addEventListener('install', event => {
  self.skipWaiting(); // Activate new service worker immediately
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching assets');
        // Skip caching for these files as they might not exist or cause issues
        const skipCache = ['/sw.js', 'sw.js'];
        const assetsToCache = ASSETS.filter(url => !skipCache.includes(url));
        
        return Promise.all(
          assetsToCache.map(url => {
            // Convert to absolute URL for GitHub Pages
            const absoluteUrl = new URL(url, self.location.origin).href;
            
            return fetch(absoluteUrl, { 
              credentials: 'same-origin',
              cache: 'no-store' // Skip HTTP cache
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}: ${response.status}`);
              }
              return cache.put(url, response);
            })
            .catch(err => {
              console.warn(`Couldn't cache ${url}:`, err);
              return Promise.resolve();
            });
          })
        );
      })
      .catch(err => {
        console.error('Cache initialization error:', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  // Take control of all clients immediately
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
