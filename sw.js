// Waikato Prayer Times — Service Worker v3.0
// Strategy: Network-first for HTML, cache-first for assets
// Bump CACHE_VERSION every deployment to force fresh content
const CACHE_VERSION = 'v3';
const CACHE_NAME = `waikato-prayer-${CACHE_VERSION}`;
const ICON = '/prayer-times/icon-192.png';
const APP_URL = '/prayer-times/';

const STATIC_ASSETS = [
    APP_URL + 'manifest.json',
    APP_URL + 'icon-192.png',
    APP_URL + 'icon-512.png',
];

// INSTALL — pre-cache static assets only, skip index.html (fetched fresh every time)
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS).catch(() => {}))
            .then(() => self.skipWaiting())
    );
});

// ACTIVATE — delete ALL old caches, claim all clients immediately
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => {
                    console.log('[SW] Deleting old cache:', k);
                    return caches.delete(k);
                })
            ))
            .then(() => self.clients.claim())
            .then(() => {
                // Notify all open windows so they can reload
                self.clients.matchAll({ type: 'window' }).then(clients => {
                    clients.forEach(client =>
                        client.postMessage({ type: 'SW_UPDATED', version: CACHE_VERSION })
                    );
                });
            })
    );
});

// FETCH
self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    const url = new URL(e.request.url);
    if (url.origin !== self.location.origin) return;

    const isHTML = e.request.headers.get('accept')?.includes('text/html')
        || url.pathname.endsWith('.html')
        || url.pathname === APP_URL
        || url.pathname.endsWith('/');

    if (isHTML) {
        // NETWORK FIRST for HTML — always fetch fresh, fall back to cache if offline
        e.respondWith(
            fetch(e.request, { cache: 'no-cache' })
                .then(response => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
                    }
                    return response;
                })
                .catch(() => {
                    console.log('[SW] Offline — serving cached HTML');
                    return caches.match(e.request)
                        || caches.match(APP_URL + 'index.html')
                        || caches.match(APP_URL);
                })
        );
    } else {
        // CACHE FIRST for static assets — fast, refreshes in background
        e.respondWith(
            caches.match(e.request).then(cached => {
                const networkFetch = fetch(e.request).then(response => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
                    }
                    return response;
                }).catch(() => cached);
                return cached || networkFetch;
            })
        );
    }
});

// MESSAGE — notification scheduling (iOS requires SW for notifications)
self.addEventListener('message', e => {
    if (!e.data || !e.data.type) return;

    if (e.data.type === 'SCHEDULE_NOTIFICATIONS') {
        const items = e.data.notifications || [];
        items.forEach(n => {
            if (n.delayMs > 0 && n.delayMs < 86400000) {
                setTimeout(() => {
                    self.registration.showNotification(n.title, {
                        body: n.body, icon: ICON, badge: ICON,
                        tag: n.tag, renotify: true,
                        vibrate: [200, 100, 200], silent: false,
                        data: { url: APP_URL }
                    });
                }, n.delayMs);
            }
        });
    }

    if (e.data.type === 'SHOW_NOTIFICATION') {
        self.registration.showNotification(e.data.title, {
            body: e.data.body, icon: ICON, badge: ICON,
            tag: e.data.tag || 'prayer', renotify: true,
            vibrate: [200, 100, 200], data: { url: APP_URL }
        });
    }

    if (e.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// PUSH
self.addEventListener('push', e => {
    const data = e.data ? e.data.json() : {};
    e.waitUntil(
        self.registration.showNotification(data.title || '🕌 Prayer Time', {
            body: data.body || 'Time for Salaat',
            icon: ICON, badge: ICON, vibrate: [200, 100, 200],
            data: { url: data.url || APP_URL }
        })
    );
});

// NOTIFICATION CLICK
self.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
            for (const client of list) {
                if (client.url.includes('/prayer-times/') && 'focus' in client)
                    return client.focus();
            }
            return clients.openWindow(APP_URL);
        })
    );
});
