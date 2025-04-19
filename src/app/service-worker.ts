// app/service-worker.ts
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('static-cache-v1').then(cache =>
        cache.addAll([
          '/',
          '/favicon.ico',
          '/icons/icon-192.png',
          '/icons/icon-512.png',
          '/_next/static/*'
        ])
      )
    )
  })
  
  self.addEventListener('fetch', event => {
    const { request } = event
    // Cache-First für statische Assets
    if (request.destination === 'document' || request.destination === 'script' || request.destination === 'style') {
      event.respondWith(
        caches.match(request).then(cached => cached || fetch(request))
      )
    } else {
      // Stale-While-Revalidate für API-Calls
      event.respondWith(
        caches.open('dynamic-cache-v1').then(cache =>
          cache.match(request).then(cached =>
            fetch(request).then(fresh => {
              cache.put(request, fresh.clone())
              return fresh
            }).catch(() => cached)
          )
        )
      )
    }
  })