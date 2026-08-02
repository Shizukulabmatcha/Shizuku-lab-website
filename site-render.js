
(() => {
  const DEFAULT = window.SHIZUKU_DATA || {};
  const saved = localStorage.getItem('shizuku-admin-preview');
  const data = saved ? JSON.parse(saved) : DEFAULT;

  const html = (value='') => String(value).replace(/\n/g,'<br>');
  const setText = (id,value) => { const el=document.getElementById(id); if(el) el.textContent=value ?? ''; };
  const setHTML = (id,value) => { const el=document.getElementById(id); if(el) el.innerHTML=html(value); };
  const setImg = (id,value) => { const el=document.getElementById(id); if(el&&value) el.src=value; };

  function render(d=data){
    document.documentElement.style.setProperty('--forest', d.brand.mainColor);
    document.documentElement.style.setProperty('--paper', d.brand.paperColor);
    document.documentElement.style.setProperty('--rice', d.brand.riceColor);
    document.documentElement.style.setProperty('--admin-logo-desktop', `${d.brand.logoDesktop}px`);
    document.documentElement.style.setProperty('--admin-logo-mobile', `${d.brand.logoMobile}px`);

    document.querySelectorAll('.brand img,.library-sidebar-brand img').forEach(el=>el.src=d.brand.logo);
    setText('heroEyebrow', d.hero.eyebrow);
    const heroTitle=document.getElementById('heroTitle');
    if(heroTitle) heroTitle.innerHTML=`<span>${d.hero.title}</span><br><em>${d.hero.titleItalic}</em>`;
    setText('heroBody',d.hero.body); setImg('heroImage',d.hero.image);
    document.documentElement.style.setProperty('--hero-title-desktop', `${d.hero.fontSizeDesktop}px`);
    document.documentElement.style.setProperty('--hero-title-mobile', `${d.hero.fontSizeMobile}px`);
    document.querySelector('.hero-copy')?.setAttribute('data-align',d.hero.align);

    setHTML('storyTitle',d.story.title); setText('storyP1',d.story.paragraph1); setText('storyP2',d.story.paragraph2); setImg('storyImage',d.story.image);
    setHTML('matchaTitle',d.matcha.title); setText('matchaBody',d.matcha.body); setImg('matchaImage',d.matcha.image);
    const mi=document.getElementById('matchaImage'); if(mi) mi.style.objectFit=d.matcha.imageFit || 'contain';
    setText('matchaOrigin',d.matcha.origin); setText('matchaHarvest',d.matcha.harvest); setText('matchaCultivar',d.matcha.cultivar);
    setText('matchaNotes',d.matcha.tastingNotes); setText('matchaFinish',`Finish: ${d.matcha.finish}`);

    document.querySelectorAll('[data-menu-index]').forEach((card,i)=>{
      const item=d.menu[i]; if(!item)return;
      const image=card.querySelector('img'), eyebrow=card.querySelector('.eyebrow'), title=card.querySelector('h3'), body=card.querySelector('.product-copy>p:not(.eyebrow)'), price=card.querySelector('strong');
      if(image) image.src=item.image; if(eyebrow) eyebrow.textContent=item.eyebrow; if(title) title.textContent=item.name; if(body) body.textContent=item.description; if(price) price.textContent=item.price;
    });

    document.querySelectorAll('[data-update-index]').forEach((card,i)=>{
      const item=d.updates[i]; if(!item)return;
      const image=card.querySelector('img'), date=card.querySelector('small'), title=card.querySelector('h3'), body=card.querySelector('p');
      if(image) image.src=item.image; if(date) date.textContent=item.date; if(title) title.textContent=item.title; if(body) body.textContent=item.body;
    });

    setHTML('contactTitle',d.contact.title); setHTML('contactCollection',d.contact.collection);
    const ig=document.getElementById('contactInstagram'); if(ig){ig.textContent=d.contact.instagram;ig.href=d.contact.instagramUrl;}
    setImg('closingLogo',d.closing.logo); setText('closingMessage',d.closing.message);
    const cl=document.getElementById('closingLogo'); if(cl) cl.style.width=`${d.closing.logoSize}px`;

    window.dispatchEvent(new CustomEvent('shizuku-data-rendered',{detail:d}));
  }

  window.SHIZUKU_RENDER = render;
  render();

  window.addEventListener('message',e=>{
    if(e.data?.type==='SHIZUKU_PREVIEW'){
      localStorage.setItem('shizuku-admin-preview',JSON.stringify(e.data.data));
      render(e.data.data);
    }
    if(e.data?.type==='SHIZUKU_CLEAR_PREVIEW'){
      localStorage.removeItem('shizuku-admin-preview');
      location.reload();
    }
  });
})();
