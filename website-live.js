(function(){
  // CMS preview must always use the editor's in-memory draft, not the public live row.
  if(new URLSearchParams(location.search).get('cms') === '1') return;
  const cfg = window.SHIZUKU_SUPABASE || {};
  if(!cfg.url || !cfg.anonKey || typeof window.SHIZUKU_APPLY_DATA !== 'function') return;
  const cacheKey='shizuku-website-live-cache-v3';
  const preloadImage=src=>new Promise(resolve=>{if(!src||typeof src!=='string')return resolve();const image=new Image(),done=()=>resolve();image.fetchPriority='high';image.onload=done;image.onerror=done;image.src=src;if(image.complete)done()});
  const preloadCritical=data=>Promise.race([Promise.all([preloadImage(data?.hero?.image),preloadImage(data?.brand?.logo)]),new Promise(resolve=>setTimeout(resolve,1800))]);
  let cachedData=null;
  try{cachedData=JSON.parse(localStorage.getItem(cacheKey)||'null')?.data||null}catch(e){}
  const url = `${cfg.url}/rest/v1/website_live?id=in.(main_v2,main)&select=id,data`;
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),3500);
  fetch(url, { cache:'no-cache', signal:controller.signal, headers: { apikey: cfg.anonKey, Authorization: `Bearer ${cfg.anonKey}` } })
    .then(r => { if(!r.ok) throw new Error(`Website content ${r.status}`); return r.json(); })
    .then(async rows => { const row=rows?.find(x=>x.id==='main_v2')||rows?.find(x=>x.id==='main');if(row?.data){try{localStorage.setItem(cacheKey,JSON.stringify({data:row.data,cachedAt:Date.now()}))}catch(e){}if(!cachedData||JSON.stringify(cachedData)!==JSON.stringify(row.data)){await preloadCritical(row.data);window.SHIZUKU_APPLY_DATA(row.data);}} })
    .catch(err => console.warn('Using cached or packaged website content:', err.message))
    .finally(()=>clearTimeout(timeout));
})();
