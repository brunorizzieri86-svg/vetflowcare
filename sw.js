// VetFlowCare — Service Worker v9.60
// Estratégia: Network-First (busca atualização na rede; cache só responde offline)
// B&G Systems | Todos os direitos reservados

const CACHE = 'vetflowcare-v9.61';

const CORE_FILES = [
  './index.html',
  './manifest.json',
  './logo.jpg',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
];

// ── Instalação: pré-cacheia os arquivos essenciais ──
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE_FILES))
  );
  self.skipWaiting();
});

// ── Ativação: apaga caches de versões antigas ──
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: Network-First ──
self.addEventListener('fetch', e => {
  // Ignora requisições não-GET e externas (GoatCounter, ViaCEP, etc.)
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then(resp => {
        // Atualiza o cache com a resposta mais nova
        if (resp && resp.status === 200 && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      })
      .catch(() => caches.match(e.request)) // offline: serve do cache
  );
});
