var cacheName = "hello-pwa";
var filesToCache = ["/", "./index.html", "./css/style.css", "./js/main.js"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("service worker installed");
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("activate", e => {
  console.log("service worker activate");

  e.waitUntil(
    caches.keys().then(keyList => {
      if (key !== cacheName) {
        console.log("service worker removing old caches", key);
        return caches.delete(key);
      }
    })
  );

  return self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      console.log("service worker fetched");
      return response || fetch(e.request);
    })
  );
});
