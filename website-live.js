(function(){
  // CMS preview must always use the editor's in-memory draft, not the public live row.
  if(new URLSearchParams(location.search).get('cms') === '1') return;
  const cfg = window.SHIZUKU_SUPABASE || {};
  if(!cfg.url || !cfg.anonKey || typeof window.SHIZUKU_APPLY_DATA !== 'function') return;
  const cacheKey='shizuku-website-live-cache-v3';
  let cachedData=null;
  try{cachedData=JSON.parse(localStorage.getItem(cacheKey)||'null')?.data||null}catch(e){}
  const url = `${cfg.url}/rest/v1/website_live?id=in.(main_v2,main)&select=id,data`;
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),3500);
  fetch(url, { cache:'no-cache', signal:controller.signal, headers: { apikey: cfg.anonKey, Authorization: `Bearer ${cfg.anonKey}` } })
    .then(r => { if(!r.ok) throw new Error(`Website content ${r.status}`); return r.json(); })
    .then(rows => { const row=rows?.find(x=>x.id==='main_v2')||rows?.find(x=>x.id==='main');if(row?.data){try{localStorage.setItem(cacheKey,JSON.stringify({data:row.data,cachedAt:Date.now()}))}catch(e){}if(!cachedData||JSON.stringify(cachedData)!==JSON.stringify(row.data))window.SHIZUKU_APPLY_DATA(row.data);} })
    .catch(err => console.warn('Using cached or packaged website content:', err.message))
    .finally(()=>clearTimeout(timeout));
})();
