const SW_VERSION = 'v1-admin-precache-2025-08-24-1';
const PRECACHE = `precache-${SW_VERSION}`;
const RUNTIME = 'runtime-cache';

// Admin assets to precache for offline/instant loading
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/alerts.css',
  '/assets/icons/favicon.png',
  '/assets/icons/favicon-main.svg',
  '/assets/images/cover.jpg',
  // Admin
  '/admin/admin.html',
  '/css/admin.css',
  '/js/admin.js',
  '/js/overlay-alert.js',
  '/js/firebase-config.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => Promise.allSettled(PRECACHE_URLS.map((url) => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Simple network-first for Firestore calls, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Bypass non-GET and Firebase/Google APIs from caching to avoid auth/cors issues
  if (request.method !== 'GET' || /googleapis|gstatic|firebaseio/.test(url.hostname)) {
    return; // Let the network handle it
  }

  // For same-origin navigations and static files: cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Update in background
          event.waitUntil(
            caches.open(RUNTIME).then((cache) => fetch(request).then((response) => { if (response && response.ok) cache.put(request, response.clone()); }))
          );
          return cachedResponse;
        }
        return caches.open(RUNTIME).then((cache) =>
          fetch(request).then((response) => {
            if (response && response.ok) cache.put(request, response.clone());
            return response;
          })
        );
      })
    );
  }
});

