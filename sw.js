/* VetFlowCare — Service Worker v9.8
   Estratégia: NETWORK-FIRST para o app (index.html) → atualizações chegam sempre
   que houver internet; o cache só responde quando estiver offline.
   Isso elimina o problema de versão velha presa no celular. */
const CACHE = 'vetflowcare-v9.9.1';
const ASSETS = ['./', './index.html', './manifest.json', './logo.jpg'];

self.addEventListener('install', e => {
  self.skipWaiting(); // assume o controle imediatamente
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{}));
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    // apaga TODOS os caches antigos (v9.7, v9.6…)
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.origin !== location.origin) return; // não intercepta terceiros

  const isShell = req.mode === 'navigate' || url.pathname.endsWith('index.html') || url.pathname.endsWith('/');

  if(isShell){
    // NETWORK-FIRST: tenta a rede (versão nova); cai no cache só offline
    e.respondWith((async () => {
      try{
        const fresh = await fetch(req, {cache:'no-store'});
        const c = await caches.open(CACHE);
        c.put('./index.html', fresh.clone());
        return fresh;
      }catch(err){
        return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error();
      }
    })());
    return;
  }

  // Demais arquivos (logo, manifest…): cache-first com atualização em segundo plano
  e.respondWith((async () => {
    const cached = await caches.match(req);
    const fetchP = fetch(req).then(res => {
      if(res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
      return res;
    }).catch(()=>null);
    return cached || (await fetchP) || Response.error();
  })());
});
