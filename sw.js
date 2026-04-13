/**
 * sw.js — Utu Buster service worker
 *
 * Strategy:
 *   /api/*  → Network first (fresh data always preferred, no cache)
 *   rest    → Cache first, fallback to network, cache successful responses
 *
 * On install: pre-cache the shell (index.html + fonts already handled by browser cache).
 * On activate: delete any old cache versions so users don't get stale app shells.
 */

const CACHE_NAME = 'utu-buster-v1';

const PRECACHE = [
  '/',
  '/index.html',
];

// ── Install ────────────────���───────────────────────��──────────────────────────

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// ── Activate ───────────────��───────────────────────────��──────────────────────

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Push notifications ─────────────���──────────────────────────────────────���───

self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'Utu Buster', {
      body:     data.body || 'Time to check your bills.',
      icon:     '/icon-192.png',
      badge:    '/icon-192.png',
      data:     { url: data.url || 'https://utu-buster.vercel.app' },
      tag:      data.tag || 'utu-buster',
      renotify: true,
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(wins => {
      const target = event.notification.data?.url || '/';
      for (const win of wins) {
        if (win.url === target && 'focus' in win) return win.focus();
      }
      if (clients.openWindow) return clients.openWindow(target);
    })
  );
});

// ── Fetch ──────��────────────────────────────────────��──────────────────────��──

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // API calls: always go to network (data must be fresh)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ error: 'offline' }), {
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );
    return;
  }

  // Non-GET requests: pass straight through
  if (event.request.method !== 'GET') return;

  // Everything else: cache first, update cache in background
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(cached => {
        const networkFetch = fetch(event.request).then(response => {
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
        return cached || networkFetch;
      })
    )
  );
});
