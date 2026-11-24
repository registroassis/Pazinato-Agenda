// Service worker: deixa o app instalável e abrindo rápido / sem internet.
// Os dados NÃO ficam aqui — ficam no Firebase (com cache offline do próprio Firestore).
const VERSAO = '202611240200';
const CACHE = 'agenda-os-' + VERSAO;
const ARQUIVOS = ["./","GUIA-DE-INSTALACAO-E-USO.md","app.js","apple-touch-icon.png","config.js","icon-192.png","icon-512.png","icon-maskable-512.png","index.html","logo-horizontal.png","logo.png","manifest.webmanifest","styles.css"];
const SEMPRE_REDE = ['index.html', 'config.js', 'manifest.webmanifest', 'logo.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS.map((f) => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request; const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return; // Firebase/Google: direto na rede
  const rel = url.pathname.replace(self.registration.scope.replace(location.origin, ''), '') || 'index.html';
  const navegacao = req.mode === 'navigate';
  if (navegacao || SEMPRE_REDE.some((f) => rel === f || rel.startsWith(f))) {
    // rede primeiro (para pegar config/logo atualizados), cache se offline
    e.respondWith(fetch(req).then((r) => { const c = r.clone(); caches.open(CACHE).then((x) => x.put(navegacao ? 'index.html' : req, c)); return r; })
      .catch(() => caches.match(navegacao ? 'index.html' : req, { ignoreSearch: true })));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((r) => r || fetch(req).then((resp) => {
    if (resp.ok) { const c = resp.clone(); caches.open(CACHE).then((x) => x.put(req, c)); }
    return resp;
  })));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '#/inicio';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
    for (const c of cs) { c.postMessage({ url }); return c.focus(); }
    return self.clients.openWindow('./' + url);
  }));
});
