const CACHE_NAME = "version-1"
const urlsToCache = [ 'index.html', 'offline.html' ]

const self = this

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache')

                return cache.addAll(urlsToCache)
            })
    )
})

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .then(()=>{
                        console.log('FETCH')
                    })
                    .catch(() => caches.match('offline.html'))
            })
    )
})

// Activate SW
self.addEventListener('activate', (event) => {
    const cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.map(cacheName => {
                if(!cacheWhiteList.includes(cacheName))
                    return caches.delete(cacheName)
            })
        ))
    )
})

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow('https://dsaesa.herokuapp.com/')
    );
});

self.addEventListener('push', function(e) {
    var body;
  
    if (e.data) {
      body = e.data.text();
    } else {
      body = 'Push message no payload';
    }
  
    var options = {
      body: body,
      icon: 'images/logo.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
    };
    e.waitUntil(
      self.registration.showNotification('Mood scan', options)
    );
});

self.addEventListener('periodicsync', event => {
    // event.waitUntil(fetchAndCacheLatestNews());
});