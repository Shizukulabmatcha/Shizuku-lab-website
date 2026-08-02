const loader=document.getElementById('loader'),header=document.getElementById('header'),progress=document.getElementById('scrollProgress'),cursor=document.getElementById('chasenCursor'),toggle=document.getElementById('menuToggle'),mobile=document.getElementById('mobileMenu');window.addEventListener('load',()=>setTimeout(()=>{loader.classList.add('hide');document.body.classList.remove('is-loading');document.querySelectorAll('.hero .reveal').forEach((e,i)=>setTimeout(()=>e.classList.add('visible'),i*170))},900));const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.14});document.querySelectorAll('.reveal,.image-reveal').forEach(e=>observer.observe(e));function clamp(n,a,b){return Math.min(b,Math.max(a,n))}
let scrollTicking=false;

function update(){
  const y=window.scrollY;
  const total=document.documentElement.scrollHeight-window.innerHeight;

  progress.style.width=`${total?y/total*100:0}%`;
  header.classList.toggle('scrolled',y>30);

  const heroSection=document.querySelector('.hero');
  const heroMedia=document.querySelector('.hero-media');
  const heroImage=document.querySelector('.hero-media img');
  const heroCopy=document.querySelector('.hero-copy');
  const heroCue=document.querySelector('.scroll-cue');

  if(heroSection&&heroMedia&&heroImage&&heroCopy&&y<window.innerHeight*1.25){
    const p=clamp(y/(heroSection.offsetHeight*.92),0,1);
    const eased=1-Math.pow(1-p,3);

    heroImage.style.transform=`scale(${1.025+eased*.075}) translate3d(0,${eased*18}px,0)`;
    heroMedia.style.opacity=String(1-eased*.16);
    heroCopy.style.transform=`translate3d(0,${eased*-34}px,0)`;
    heroCopy.style.opacity=String(1-eased*.72);

    if(heroCue){
      heroCue.style.opacity=String(1-eased*1.25);
      heroCue.style.transform=`translate3d(0,${eased*14}px,0)`;
    }
  }

  const ph=document.querySelector('.philosophy');
  const lines=[...document.querySelectorAll('.philosophy-line')];
  if(ph){
    const r=ph.getBoundingClientRect();
    const p=clamp(-r.top/(ph.offsetHeight-window.innerHeight),0,1);
    lines.forEach((l,i)=>l.classList.toggle('active',p>(i+.08)/lines.length));
  }

  const ms=document.querySelector('.matcha');
  const photo=document.querySelector('.matcha-photo');
  const copy=document.querySelector('.matcha-copy');
  if(ms&&photo&&copy&&window.innerWidth>650){
    const r=ms.getBoundingClientRect();
    const p=clamp(-r.top/(ms.offsetHeight-window.innerHeight),0,1);
    photo.style.transform=`scale(${.82+p*.24})`;
    copy.style.transform=`translateY(${(1-p)*35}px)`;
    copy.style.opacity=String(.25+p*.9);
  }

  scrollTicking=false;
}

function requestScrollUpdate(){
  if(!scrollTicking){
    scrollTicking=true;
    requestAnimationFrame(update);
  }
}

window.addEventListener('scroll',requestScrollUpdate,{passive:true});
window.addEventListener('resize',requestScrollUpdate,{passive:true});
update();if(matchMedia('(pointer:fine)').matches&&cursor){
  const cursorImage=cursor.querySelector('img');
  const enableCustomCursor=()=>{
    document.documentElement.classList.add('custom-cursor-ready');
    cursor.classList.add('ready');
  };
  const disableCustomCursor=()=>{
    document.documentElement.classList.remove('custom-cursor-ready');
    cursor.classList.remove('ready');
  };
  if(cursorImage){
    if(cursorImage.complete&&cursorImage.naturalWidth>0) enableCustomCursor();
    else{
      cursorImage.addEventListener('load',enableCustomCursor,{once:true});
      cursorImage.addEventListener('error',disableCustomCursor,{once:true});
    }
  }
  addEventListener('mousemove',e=>{
    cursor.style.left=e.clientX+'px';
    cursor.style.top=e.clientY+'px';
  });
  document.querySelectorAll('a,button,.product-image,.library-card,.cultivar-card').forEach(e=>{
    e.addEventListener('mouseenter',()=>cursor.classList.add('active'));
    e.addEventListener('mouseleave',()=>cursor.classList.remove('active'));
  });
}document.addEventListener('click',e=>{const r=document.createElement('span');r.className='ripple';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';document.body.appendChild(r);requestAnimationFrame(()=>r.classList.add('go'));setTimeout(()=>r.remove(),760)});toggle.addEventListener('click',()=>{const o=mobile.classList.toggle('open');toggle.classList.toggle('open',o);toggle.setAttribute('aria-expanded',String(o));document.body.style.overflow=o?'hidden':''});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');toggle.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.style.overflow=''}));

const libraryTopics={
  'what-is-matcha':`<article class="library-article library-article-visual">
    <div class="library-hero-grid">
      <div class="library-hero-copy">
        <p class="eyebrow">THE MATCHA LIBRARY · 01</p>
        <h2>Discover the world of matcha.</h2>
        <p class="lead">Matcha is more than powdered green tea. It begins as shade-grown tencha and is carefully processed into a fine powder that is whisked directly into water.</p>
        <p>From the way the tea is grown to the timing of harvest and the way it is milled, every decision shapes its colour, aroma, texture and taste.</p>
      </div>
      <figure class="library-hero-image">
        <img src="matcha-library.jpg" alt="Vivid matcha powder resting in a bamboo scoop">
      </figure>
    </div>

    <div class="matcha-process-strip">
      <section>
        <span class="process-icon">葉</span>
        <h3>Shade-grown</h3>
        <p>Tea plants are shaded before harvest, supporting deeper colour and umami.</p>
      </section>
      <section>
        <span class="process-icon">摘</span>
        <h3>Carefully picked</h3>
        <p>Tender leaves are selected according to the producer's harvest standard.</p>
      </section>
      <section>
        <span class="process-icon">石</span>
        <h3>Finely milled</h3>
        <p>Prepared tencha is ground into an ultra-fine powder with heat carefully managed.</p>
      </section>
      <section>
        <span class="process-icon">茶</span>
        <h3>Whisked & enjoyed</h3>
        <p>The whole leaf is suspended in water, rather than removed after steeping.</p>
      </section>
    </div>

    <div class="library-note">Not every powdered green tea is matcha. The raw leaf, shading and processing method all matter.</div>
  </article>`,
  'harvest':`<article class="library-article"><p class="eyebrow">THE MATCHA LIBRARY · 02</p><h2>First harvest or second?</h2><p class="lead">Harvest timing changes leaf maturity, chemistry and flavour. First harvest is not automatically perfect, and second harvest is not automatically poor—but they often suit different styles of matcha.</p><div class="compare-grid"><section class="compare-panel"><h3>First harvest</h3><dl><div><dt>Leaves</dt><dd>Young, tender spring growth</dd></div><div><dt>Taste</dt><dd>Sweeter, softer, more umami</dd></div><div><dt>Astringency</dt><dd>Usually lower</dd></div><div><dt>Best suited</dt><dd>Usucha, koicha, premium lattes</dd></div></dl></section><section class="compare-panel"><h3>Second harvest</h3><dl><div><dt>Leaves</dt><dd>More mature summer growth</dd></div><div><dt>Taste</dt><dd>Stronger, brisker, more vegetal</dd></div><div><dt>Astringency</dt><dd>Often higher</dd></div><div><dt>Best suited</dt><dd>Bold lattes, desserts, daily use</dd></div></dl></section></div><div class="library-note">Cultivar, shading, weather, picking standard and processing can matter as much as harvest number. Treat harvest timing as one clue, not the whole quality story.</div></article>`,
  'picking':`<article class="library-article"><p class="eyebrow">THE MATCHA LIBRARY · 03</p><h2>Hand-picked or machine-picked?</h2><p class="lead">Picking method affects how selectively leaves can be harvested, but it does not create one guaranteed flavour on its own.</p><h3>Hand picking</h3><p>Skilled pickers can select tender shoots and avoid coarser leaves or stems. This can improve uniformity and is often used for limited, high-value teas. It is slow and expensive, so it is uncommon for most everyday matcha.</p><h3>Machine picking</h3><p>Modern harvesters are fast and consistent. With careful field management and sorting, machine-picked tea can still be excellent. The possible trade-off is a broader mix of leaf ages or more stem material before later refinement.</p><div class="library-note">Taste is shaped by the whole chain—cultivar, shading, field, harvest date, sorting, steaming, drying and milling—not by hand versus machine alone.</div></article>`,
  'grinding':`<article class="library-article grinding-article">
  <p class="eyebrow">THE MATCHA LIBRARY · 04</p>
  <h2>How matcha is ground</h2>

  <figure class="grinding-hero">
    <img src="stone-grinding.jpg" alt="Traditional granite stone mill grinding matcha">
    <figcaption>Traditional granite stone milling.</figcaption>
  </figure>

  <p class="lead">Traditional granite stone mills grind tencha slowly into a very fine powder. Modern impact or ball mills can process tea faster and more consistently, especially at larger scale.</p>

  <div class="grinding-compare">
    <section>
      <span>01</span>
      <h3>Stone milling</h3>
      <p>Slow grinding helps limit frictional heat and creates a fine particle structure associated with a smooth mouthfeel.</p>
      <ul>
        <li>Low output</li>
        <li>Labour-intensive</li>
        <li>Fine, delicate texture</li>
      </ul>
    </section>

    <section>
      <span>02</span>
      <h3>Modern milling</h3>
      <p>Modern equipment is not automatically inferior. Good temperature control, well-prepared tencha and suitable particle size can still produce quality matcha.</p>
      <ul>
        <li>Higher efficiency</li>
        <li>Consistent output</li>
        <li>Heat control remains important</li>
      </ul>
    </section>
  </div>

  <div class="library-note">“Stone-ground” tells you something about the process, but leaf quality before milling remains essential.</div>
</article>`,
  'ceremonial':`<article class="library-article"><p class="eyebrow">THE MATCHA LIBRARY · 05</p><h2>Why is it called “ceremonial grade”?</h2><p class="lead">Outside Japan, “ceremonial grade” is commonly used for matcha intended to be whisked and drunk with water. It usually suggests a smoother, greener and less bitter powder than culinary products.</p><h3>What the term does not guarantee</h3><p>There is no single nationwide Japanese certification that gives every producer the same ceremonial-grade threshold. Brands and sellers may apply the term differently.</p><h3>What to look at instead</h3><ul><li>Producer and origin</li><li>Harvest and picking standard</li><li>Tencha quality and shading</li><li>Cultivar or blend</li><li>Freshness, colour, aroma and taste</li><li>Whether it suits water, milk or cooking</li></ul><div class="library-note">Choose by flavour and intended use—not by the word “ceremonial” alone.</div></article>`,
  'atlas':`<article class="library-article">
    <p class="eyebrow">THE MATCHA LIBRARY · 06</p>
    <h2>Matcha Atlas</h2>
    <p class="lead">This map focuses on regions strongly connected with tencha, matcha or high-grade shaded tea. It is not a complete map of every Japanese tea-growing area.</p>

    <div class="atlas-layout">
      <div class="japan-map" aria-label="Map of Japan with matcha and shaded-tea regions"><img class="japan-map-outline" src="japan-map.svg" alt="Outline map of Japan">
        <button class="map-pin" data-region="saitama" aria-label="Sayama, Saitama"><span>Sayama</span></button>
        <button class="map-pin" data-region="shizuoka" aria-label="Shizuoka"><span>Shizuoka</span></button>
        <button class="map-pin" data-region="aichi" aria-label="Nishio, Aichi"><span>Nishio</span></button>
        <button class="map-pin active" data-region="kyoto" aria-label="Uji, Kyoto"><span>Uji</span></button>
        <button class="map-pin" data-region="mie" aria-label="Ise, Mie"><span>Ise</span></button>
        <button class="map-pin" data-region="fukuoka" aria-label="Yame, Fukuoka"><span>Yame</span></button>
        <button class="map-pin" data-region="saga" aria-label="Ureshino, Saga"><span>Ureshino</span></button>
        <button class="map-pin" data-region="kagoshima" aria-label="Kagoshima"><span>Kagoshima</span></button>
      </div>
      <div class="region-panel" id="regionPanel"></div>
    </div>

    <p class="source-note">Regional cultivar lists are examples, not exclusive rules. A cultivar may be grown in more than one prefecture.</p>
  </article>`,
  'cultivars':`<article class="library-article cultivar-study"><p class="eyebrow">THE MATCHA LIBRARY · 07</p><h2>Matcha Colour Study</h2><p class="lead">Seven real single-cultivar matcha powders, compared and photographed by Shizuku Lab under the same setting.</p><figure class="colour-study-hero"><img src="matcha-colour-study.jpg" alt="Seven single-cultivar matcha powders compared by Shizuku Lab"><figcaption>Uji Midori · Kanayamidori · Gokou · Samidori · Asahi · Okuyutaka · Okumidori</figcaption></figure><div class="cultivar-study-grid">
      <article class="cultivar-study-card" data-cultivar-card="uji midori">
        <figure><img src="cultivar-uji-midori.jpg" alt="Uji Midori matcha powder photographed by Shizuku Lab"></figure>
        <div class="cultivar-study-copy">
          <p class="cultivar-region">Kyoto</p>
          <h3>Uji Midori</h3>
          <p>Bright, clean and mellow.</p>
          <div class="cultivar-note-row"><span>Soft sweetness</span><span>Refined umami</span></div>
        </div>
      </article>
      <article class="cultivar-study-card" data-cultivar-card="kanayamidori">
        <figure><img src="cultivar-kanayamidori.jpg" alt="Kanayamidori matcha powder photographed by Shizuku Lab"></figure>
        <div class="cultivar-study-copy">
          <p class="cultivar-region">Japan</p>
          <h3>Kanayamidori</h3>
          <p>Clear, fresh and gently sweet.</p>
          <div class="cultivar-note-row"><span>Fresh aroma</span><span>Light structure</span></div>
        </div>
      </article>
      <article class="cultivar-study-card" data-cultivar-card="gokou">
        <figure><img src="cultivar-gokou.jpg" alt="Gokou matcha powder photographed by Shizuku Lab"></figure>
        <div class="cultivar-study-copy">
          <p class="cultivar-region">Uji, Kyoto</p>
          <h3>Gokou</h3>
          <p>Deep, creamy and umami-forward.</p>
          <div class="cultivar-note-row"><span>Rich body</span><span>Long finish</span></div>
        </div>
      </article>
      <article class="cultivar-study-card" data-cultivar-card="samidori">
        <figure><img src="cultivar-samidori.jpg" alt="Samidori matcha powder photographed by Shizuku Lab"></figure>
        <div class="cultivar-study-copy">
          <p class="cultivar-region">Uji, Kyoto</p>
          <h3>Samidori</h3>
          <p>Balanced, smooth and elegant.</p>
          <div class="cultivar-note-row"><span>Gentle sweetness</span><span>Rounded umami</span></div>
        </div>
      </article>
      <article class="cultivar-study-card" data-cultivar-card="asahi">
        <figure><img src="cultivar-asahi.jpg" alt="Asahi matcha powder photographed by Shizuku Lab"></figure>
        <div class="cultivar-study-copy">
          <p class="cultivar-region">Uji, Kyoto</p>
          <h3>Asahi</h3>
          <p>Refined, dense and naturally sweet.</p>
          <div class="cultivar-note-row"><span>Elegant aroma</span><span>Koicha-friendly</span></div>
        </div>
      </article>
      <article class="cultivar-study-card" data-cultivar-card="okuyutaka">
        <figure><img src="cultivar-okuyutaka.jpg" alt="Okuyutaka matcha powder photographed by Shizuku Lab"></figure>
        <div class="cultivar-study-copy">
          <p class="cultivar-region">Japan</p>
          <h3>Okuyutaka</h3>
          <p>Mellow, round and approachable.</p>
          <div class="cultivar-note-row"><span>Soft body</span><span>Gentle finish</span></div>
        </div>
      </article>
      <article class="cultivar-study-card" data-cultivar-card="okumidori">
        <figure><img src="cultivar-okumidori.jpg" alt="Okumidori matcha powder photographed by Shizuku Lab"></figure>
        <div class="cultivar-study-copy">
          <p class="cultivar-region">Japan</p>
          <h3>Okumidori</h3>
          <p>Deep green, smooth and structured.</p>
          <div class="cultivar-note-row"><span>Full body</span><span>Clean finish</span></div>
        </div>
      </article></div><p class="source-note">Colour can still vary with harvest, shading, processing, milling, storage and lighting. The comparison above shows these specific powders photographed together.</p></article>`
};
const regions={
  kyoto:{
    name:'Uji, Kyoto',
    copy:'Japan’s best-known historic matcha region, strongly associated with tencha, shaded cultivation and traditional Uji tea production.',
    cultivars:['Asahi','Samidori','Ujihikari','Gokou','Uji Midori','Okumidori'],
    notes:['Deep umami','Refined aroma','Elegant sweetness']
  },
  aichi:{
    name:'Nishio, Aichi',
    copy:'A major tencha and matcha-producing area with long-established shaded cultivation and granite-milling traditions.',
    cultivars:['Yabukita','Samidori','Okumidori'],
    notes:['Full body','Creamy texture','Balanced']
  },
  shizuoka:{
    name:'Shizuoka',
    copy:'Japan’s largest tea-growing prefecture, with many microclimates and a strong base of modern cultivar research.',
    cultivars:['Yabukita','Tsuyuhikari','Sayamakaori','Kanayamidori'],
    notes:['Fresh','Vegetal','Structured']
  },
  kagoshima:{
    name:'Kagoshima',
    copy:'A major southern tea region and leading tencha producer, known for early harvests and broad cultivar diversity.',
    cultivars:['Saemidori','Yutakamidori','Okuyutaka','Okumidori','Kanayamidori','Yabukita'],
    notes:['Vivid colour','Soft sweetness','Creamy']
  },
  fukuoka:{
    name:'Yame, Fukuoka',
    copy:'Known for high-grade shaded teas and concentrated umami, with a strong reputation for gyokuro and premium tea production.',
    cultivars:['Saemidori','Okumidori','Yabukita'],
    notes:['Deep umami','Soft finish','Rich']
  },
  saitama:{
    name:'Sayama, Saitama',
    copy:'A cooler tea region with a reputation for bold aroma and a more structured cup.',
    cultivars:['Sayamakaori','Yabukita'],
    notes:['Bold aroma','Firm structure','Long finish']
  },
  mie:{
    name:'Ise, Mie',
    copy:'An important tea-producing prefecture with shaded-tea and tencha production alongside sencha.',
    cultivars:['Yabukita','Saemidori','Okumidori'],
    notes:['Balanced','Green','Mellow']
  },
  saga:{
    name:'Ureshino, Saga',
    copy:'A historic tea region best known for tamaryokucha, with broader tea production that also includes shaded styles.',
    cultivars:['Saemidori','Yabukita','Okumidori'],
    notes:['Sweet aroma','Rounded','Soft']
  }
};
const libraryDrawer=document.getElementById('libraryDrawer'),libraryOverlay=document.getElementById('libraryOverlay'),libraryContent=document.getElementById('libraryContent'),libraryClose=document.getElementById('libraryClose');
function renderRegion(key){
  const r=regions[key];
  const panel=document.getElementById('regionPanel');
  if(!panel||!r)return;

  panel.innerHTML=`
    <p class="eyebrow">REGION</p>
    <h3>${r.name}</h3>
    <p>${r.copy}</p>

    <div class="region-section">
      <span>Single cultivars to explore</span>
      <div class="region-tags">
        ${r.cultivars.map(name=>`<button type="button" class="cultivar-jump" data-cultivar="${name}">${name}</button>`).join('')}
      </div>
    </div>

    <div class="region-section">
      <span>Broad style</span>
      <div class="region-tags">${r.notes.map(t=>`<span>${t}</span>`).join('')}</div>
    </div>

    <p class="source-note">These are educational tendencies, not fixed flavour guarantees.</p>`;

  panel.querySelectorAll('.cultivar-jump').forEach(button=>{
    button.addEventListener('click',()=>{
      const cultivar=button.dataset.cultivar;
      openLibrary('cultivars');

      requestAnimationFrame(()=>{
        setTimeout(()=>{
          const target=[...document.querySelectorAll('.cultivar-card')]
            .find(card=>card.querySelector('h3')?.textContent.trim().toLowerCase()===cultivar.toLowerCase());

          if(target){
            target.classList.add('cultivar-highlight');
            target.scrollIntoView({behavior:'smooth',block:'center'});
            setTimeout(()=>target.classList.remove('cultivar-highlight'),1600);
          }
        },80);
      });
    });
  });
}
function openLibrary(topic){
  libraryContent.innerHTML=libraryTopics[topic]||'';
  libraryDrawer.classList.add('open');
  libraryOverlay.classList.add('open');
  libraryDrawer.setAttribute('aria-hidden','false');
  libraryOverlay.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';

  document.querySelectorAll('[data-library-topic]').forEach(button=>{
    button.classList.toggle('active',button.dataset.libraryTopic===topic);
  });

  const contentPanel=document.querySelector('.library-content-panel');
  if(contentPanel) contentPanel.scrollTop=0;

  if(topic==='atlas'){
    renderRegion('kyoto');
    libraryContent.querySelectorAll('.map-pin').forEach(pin=>pin.addEventListener('click',()=>{
      libraryContent.querySelectorAll('.map-pin').forEach(p=>p.classList.remove('active'));
      pin.classList.add('active');
      renderRegion(pin.dataset.region);
    }));
  }
}
function closeLibrary(){
  closeLibraryAndUnlock();
}

function closeMobileMenu(){
  const header=document.querySelector('.header');
  const mobileMenu=document.querySelector('.mobile-menu');
  const menuButton=document.querySelector('.menu-toggle');

  header?.classList.remove('menu-open','open');
  mobileMenu?.classList.remove('open','active');
  menuButton?.classList.remove('active');
  menuButton?.setAttribute('aria-expanded','false');
}

function closeLibraryAndUnlock(){
  libraryDrawer?.classList.remove('open');
  libraryOverlay?.classList.remove('open');
  libraryDrawer?.setAttribute('aria-hidden','true');
  libraryOverlay?.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  document.documentElement.style.overflow='';
}

function scrollToSection(sectionId){
  const target=document.getElementById(sectionId);
  if(!target)return;

  const header=document.querySelector('.header');
  const headerHeight=header?.offsetHeight||0;
  const top=target.getBoundingClientRect().top+window.scrollY-headerHeight-8;

  window.scrollTo({
    top:Math.max(0,top),
    behavior:'smooth'
  });
}

function openLibraryHome(){
  closeMobileMenu();
  openLibrary('what-is-matcha');

  requestAnimationFrame(()=>{
    const sidebar=document.querySelector('.library-sidebar');
    const contentPanel=document.querySelector('.library-content-panel');
    const workspace=document.querySelector('.library-workspace');

    if(sidebar) sidebar.scrollTop=0;
    if(contentPanel) contentPanel.scrollTop=0;
    if(workspace) workspace.scrollTop=0;

    const title=document.querySelector('.library-sidebar-title');
    title?.scrollIntoView({block:'start',behavior:'auto'});
  });
}

document.querySelectorAll('[data-library-nav="true"]').forEach(link=>{
  link.addEventListener('click',event=>{
    event.preventDefault();
    openLibraryHome();
    history.replaceState(null,'','#library');
  });
});

document.querySelectorAll('[data-main-nav]').forEach(link=>{
  link.addEventListener('click',event=>{
    event.preventDefault();

    const sectionId=link.dataset.mainNav;
    closeMobileMenu();
    closeLibraryAndUnlock();

    requestAnimationFrame(()=>{
      setTimeout(()=>{
        scrollToSection(sectionId);
        history.replaceState(null,'','#'+sectionId);
      },40);
    });
  });
});

document.querySelectorAll('.library-card').forEach(card=>card.addEventListener('click',()=>openLibrary(card.dataset.topic)));
document.querySelectorAll('[data-library-topic]').forEach(button=>button.addEventListener('click',()=>openLibrary(button.dataset.libraryTopic)));
libraryClose?.addEventListener('click',closeLibraryAndUnlock);libraryOverlay?.addEventListener('click',closeLibraryAndUnlock);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLibrary()});


function handleNavigationHash(){
  const hash=window.location.hash.replace('#','');

  if(hash==='library'){
    openLibraryHome();
    return;
  }

  if(['story','matcha','why','menu','contact'].includes(hash)){
    closeLibraryAndUnlock();
    closeMobileMenu();
    requestAnimationFrame(()=>setTimeout(()=>scrollToSection(hash),60));
  }
}

window.addEventListener('hashchange',handleNavigationHash);
window.addEventListener('pageshow',()=>{
  document.body.style.overflow='';
  document.documentElement.style.overflow='';
  if(window.location.hash) handleNavigationHash();
});
