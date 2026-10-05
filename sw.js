const C="alt-v8";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(["./","logo.webp","manifest.webmanifest"])).catch(()=>{}))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);
  if(e.request.method!="GET"||u.origin!=location.origin||u.pathname.indexOf("admin")>-1)return;
  e.respondWith((async()=>{
    const hit=await caches.match(e.request);
    try{
      const net=fetch(e.request);
      const r=await(hit?Promise.race([net,new Promise((_,j)=>setTimeout(j,3000))]):net);
      if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}
      return r;
    }catch(_){return hit||(e.request.mode=="navigate"?caches.match("./"):Response.error())}
  })())});