(function(){
  // CMS preview must always use the editor's in-memory draft, not the public live row.
  if(new URLSearchParams(location.search).get('cms') === '1') return;
  const cfg = window.SHIZUKU_SUPABASE || {};
  if(!cfg.url || !cfg.anonKey || typeof window.SHIZUKU_APPLY_DATA !== 'function') return;
  const cacheKey='shizuku-website-live-cache-v2';
  try{const cached=JSON.parse(localStorage.getItem(cacheKey)||'null');if(cached?.data)window.SHIZUKU_APPLY_DATA(cached.data)}catch(e){}
  const url = `${cfg.url}/rest/v1/website_live?id=in.(main_v2,main)&select=id,data`;
  fetch(url, { cache:'no-cache', headers: { apikey: cfg.anonKey, Authorization: `Bearer ${cfg.anonKey}` } })
    .then(r => { if(!r.ok) throw new Error(`Website content ${r.status}`); return r.json(); })
    .then(rows => { const row=rows?.find(x=>x.id==='main_v2')||rows?.find(x=>x.id==='main');if(row?.data){try{localStorage.setItem(cacheKey,JSON.stringify({data:row.data,cachedAt:Date.now()}))}catch(e){}window.SHIZUKU_APPLY_DATA(row.data);} })
    .catch(err => console.warn('Using packaged website content:', err.message));
})();
