// Files to cache
var cacheName = 'ml1-webpf-sample-app';
var appShellFiles = [
    '',
    '../index.html',
    '../css/main.css',
    '../favicon.ico',
    '../icons/icon-32.png',
    '../icons/icon-64.png',
    '../icons/icon-256.png',
    '../js/jsQR.js'
];
var contentToCache = appShellFiles

// Installing Service Worker
self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache.map(url => new Request(url, { credentials: 'same-origin' })));
        })
    );
});

// Fetching content using Service Worker
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (cacheName.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

