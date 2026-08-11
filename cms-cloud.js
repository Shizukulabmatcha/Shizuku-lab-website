(function(){
  const cfg = window.SHIZUKU_SUPABASE || {};
  const configured = !!(window.supabase && cfg.url && cfg.anonKey);
  const client = configured ? window.supabase.createClient(cfg.url, cfg.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  }) : null;
  const allowedEmail = String(cfg.adminEmail || '').toLowerCase();

  async function currentUser(){
    if(!client) return null;
    const { data } = await client.auth.getUser();
    return data?.user || null;
  }
  async function signIn(email,password){
    if(!client) throw new Error('Supabase is not configured.');
    const clean = String(email||'').trim().toLowerCase();
    if(allowedEmail && clean !== allowedEmail) throw new Error('Please use the Shizuku Lab admin email.');
    const { data, error } = await client.auth.signInWithPassword({ email: clean, password });
    if(error) throw error;
    return data.user;
  }
  async function signOut(){ if(client) await client.auth.signOut(); }
  async function uploadDataUrl(value){
    const comma=value.indexOf(','),meta=comma>-1?value.slice(5,comma):'',body=comma>-1?value.slice(comma+1):'';
    if(comma<0) return value;
    const mime=meta.split(';')[0]||'application/octet-stream',isBase64=/;base64/i.test(meta),binary=isBase64?atob(body):decodeURIComponent(body),bytes=isBase64?new Uint8Array(binary.length):new TextEncoder().encode(binary);
    if(isBase64)for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    const digest=await crypto.subtle.digest('SHA-256',bytes),hash=[...new Uint8Array(digest)].slice(0,12).map(x=>x.toString(16).padStart(2,'0')).join('');
    const ext=({
      'image/png':'png','image/jpeg':'jpg','image/webp':'webp','image/svg+xml':'svg',
      'video/mp4':'mp4','video/quicktime':'mov','video/webm':'webm'
    })[mime]||'bin';
    const path=`website/${hash}.${ext}`;
    const { error }=await client.storage.from('website-media').upload(path,bytes,{upsert:true,contentType:mime,cacheControl:'31536000'});
    if(error)throw new Error(`Media upload failed: ${error.message}. Run the latest SUPABASE-WEBSITE-CMS.sql once.`);
    return client.storage.from('website-media').getPublicUrl(path).data.publicUrl;
  }
  async function prepareForCloud(value){
    if(Array.isArray(value))return Promise.all(value.map(prepareForCloud));
    if(value&&typeof value==='object'){
      const out={};
      for(const key of Object.keys(value))out[key]=await prepareForCloud(value[key]);
      return out;
    }
    if(typeof value==='string'&&/^data:(image|video)\//.test(value))return uploadDataUrl(value);
    return value;
  }
  async function cloudPayload(data){return prepareForCloud(data);}
  async function loadDraft(){
    if(!client) return null;
    let { data, error } = await client.from('website_drafts').select('data,updated_at').eq('id','main_v2').maybeSingle();
    if(error) throw error;
    if(!data){({data,error}=await client.from('website_drafts').select('data,updated_at').eq('id','main').maybeSingle());if(error)throw error;}
    return data || null;
  }
  async function saveDraft(data){
    if(!client) throw new Error('Supabase is not configured.');
    const user = await currentUser();
    if(!user) throw new Error('Please sign in first.');
    const payload = { id:'main_v2', data:await cloudPayload(data), updated_at:new Date().toISOString(), updated_by:user.id };
    const { error } = await client.from('website_drafts').upsert(payload,{onConflict:'id'});
    if(error) throw error;
  }
  async function publish(data){
    if(!client) throw new Error('Supabase is not configured.');
    const user = await currentUser();
    if(!user) throw new Error('Please sign in first.');
    const now = new Date().toISOString(), compact=await cloudPayload(data);
    const live = await client.from('website_live').upsert({ id:'main_v2', data:compact, updated_at:now, updated_by:user.id },{onConflict:'id'});
    if(live.error) throw live.error;
    const draft = await client.from('website_drafts').upsert({ id:'main_v2', data:compact, updated_at:now, updated_by:user.id },{onConflict:'id'});
    if(draft.error) throw draft.error;
  }
  window.ShizukuCloud = { configured, client, allowedEmail, currentUser, signIn, signOut, loadDraft, saveDraft, publish };
})();
