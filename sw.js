// network-first, falls back to cache when offline
const C='caffeine-v1';
addEventListener('fetch',e=>e.respondWith(
  fetch(e.request).then(r=>{const copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r})
    .catch(()=>caches.match(e.request))));
