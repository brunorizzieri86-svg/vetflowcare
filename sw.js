// VetFlowCare - Service Worker Otimizado
const CACHE_NAME = 'vetflowcare-v11'; // ALTERE ESTE NÚMERO AO ATUALIZAR O APP

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.jpg'
];

// Instalação: Salva os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Ativação: Remove caches antigos que não são mais necessários
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch: Tenta buscar da rede, mas usa o cache como reserva (estratégia rápida)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch(() => {
        // Se falhar a rede e não tiver cache, tenta retornar a home
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
