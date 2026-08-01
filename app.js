const loader=document.getElementById('loader'),header=document.getElementById('header'),progress=document.getElementById('scrollProgress'),cursor=document.getElementById('chasenCursor'),toggle=document.getElementById('menuToggle'),mobile=document.getElementById('mobileMenu');window.addEventListener('load',()=>setTimeout(()=>{loader.classList.add('hide');document.body.classList.remove('is-loading');document.querySelectorAll('.hero .reveal').forEach((e,i)=>setTimeout(()=>e.classList.add('visible'),i*170))},900));const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.14});document.querySelectorAll('.reveal,.image-reveal').forEach(e=>observer.observe(e));function clamp(n,a,b){return Math.min(b,Math.max(a,n))}function update(){const y=scrollY,total=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${total?y/total*100:0}%`;header.classList.toggle('scrolled',y>30);const hero=document.querySelector('.hero-media img');if(hero&&y<innerHeight*1.2)hero.style.transform=`scale(${1.03+y*.00018})`;const ph=document.querySelector('.philosophy'),lines=[...document.querySelectorAll('.philosophy-line')];if(ph){const r=ph.getBoundingClientRect(),p=clamp(-r.top/(ph.offsetHeight-innerHeight),0,1);lines.forEach((l,i)=>l.classList.toggle('active',p>(i+.08)/lines.length))}const ms=document.querySelector('.matcha'),photo=document.querySelector('.matcha-photo'),copy=document.querySelector('.matcha-copy');if(ms&&photo&&copy){const r=ms.getBoundingClientRect(),p=clamp(-r.top/(ms.offsetHeight-innerHeight),0,1);photo.style.transform=`scale(${.82+p*.24})`;copy.style.transform=`translateY(${(1-p)*35}px)`;copy.style.opacity=String(.25+p*.9)}}window.addEventListener('scroll',update,{passive:true});update();if(matchMedia('(pointer:fine)').matches){addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});document.querySelectorAll('a,button,.product-image').forEach(e=>{e.addEventListener('mouseenter',()=>cursor.classList.add('active'));e.addEventListener('mouseleave',()=>cursor.classList.remove('active'))})}document.addEventListener('click',e=>{const r=document.createElement('span');r.className='ripple';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';document.body.appendChild(r);requestAnimationFrame(()=>r.classList.add('go'));setTimeout(()=>r.remove(),760)});toggle.addEventListener('click',()=>{const o=mobile.classList.toggle('open');toggle.classList.toggle('open',o);toggle.setAttribute('aria-expanded',String(o));document.body.style.overflow=o?'hidden':''});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');toggle.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.style.overflow=''}));

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
  'grinding':`<article class="library-article"><p class="eyebrow">THE MATCHA LIBRARY · 04</p><h2>How matcha is ground</h2><p class="lead">Traditional granite stone mills grind tencha slowly into a very fine powder. Modern impact or ball mills can process tea faster and consistently, especially at larger scale.</p><h3>Why slow stone milling is valued</h3><p>Slow milling helps limit frictional heat and creates a fine particle structure associated with a smooth mouthfeel. It is also labour-intensive and low-output.</p><h3>What about modern mills?</h3><p>Modern equipment is not automatically inferior. Good temperature control, well-prepared tencha and suitable particle size can still produce quality matcha. Poorly controlled heat or rough grinding can dull aroma, colour and texture.</p><div class="library-note">“Stone-ground” tells you something about the process, but the leaf quality before milling remains essential.</div></article>`,
  'ceremonial':`<article class="library-article"><p class="eyebrow">THE MATCHA LIBRARY · 05</p><h2>Why is it called “ceremonial grade”?</h2><p class="lead">Outside Japan, “ceremonial grade” is commonly used for matcha intended to be whisked and drunk with water. It usually suggests a smoother, greener and less bitter powder than culinary products.</p><h3>What the term does not guarantee</h3><p>There is no single nationwide Japanese certification that gives every producer the same ceremonial-grade threshold. Brands and sellers may apply the term differently.</p><h3>What to look at instead</h3><ul><li>Producer and origin</li><li>Harvest and picking standard</li><li>Tencha quality and shading</li><li>Cultivar or blend</li><li>Freshness, colour, aroma and taste</li><li>Whether it suits water, milk or cooking</li></ul><div class="library-note">Choose by flavour and intended use—not by the word “ceremonial” alone.</div></article>`,
  'atlas':`<article class="library-article">
    <p class="eyebrow">THE MATCHA LIBRARY · 06</p>
    <h2>Matcha Atlas</h2>
    <p class="lead">This map focuses on regions strongly connected with tencha, matcha or high-grade shaded tea. It is not a complete map of every Japanese tea-growing area.</p>

    <div class="atlas-layout">
      <div class="japan-map" aria-label="Stylised map of Japan with matcha and shaded-tea regions">
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
  'cultivars':`<article class="library-article">
    <p class="eyebrow">THE MATCHA LIBRARY · 07</p>
    <h2>Single-cultivar matcha</h2>
    <p class="lead">A cultivar is a cultivated tea variety. It can influence aroma, colour, texture and structure, but farm, shading, harvest and processing still shape the final cup.</p>
    <div class="cultivar-grid"><article class="cultivar-card">
        <img src="matcha-library.jpg" alt="Illustrative matcha powder for Yabukita">
        <div>
          <p class="cultivar-region">Japan-wide</p>
          <h3>Yabukita</h3>
          <p>Balanced, fresh and structured; often vegetal with a clean finish.</p>
        </div>
      </article><article class="cultivar-card">
        <img src="matcha-library.jpg" alt="Illustrative matcha powder for Saemidori">
        <div>
          <p class="cultivar-region">Kagoshima · Kyushu</p>
          <h3>Saemidori</h3>
          <p>Vivid colour, soft sweetness and comparatively low astringency.</p>
        </div>
      </article><article class="cultivar-card">
        <img src="matcha-library.jpg" alt="Illustrative matcha powder for Okumidori">
        <div>
          <p class="cultivar-region">Kyoto · Kagoshima · Japan-wide</p>
          <h3>Okumidori</h3>
          <p>Round, mellow and deep green, with smooth body.</p>
        </div>
      </article><article class="cultivar-card">
        <img src="matcha-library.jpg" alt="Illustrative matcha powder for Gokou">
        <div>
          <p class="cultivar-region">Kyoto</p>
          <h3>Gokou</h3>
          <p>Deep shaded-tea character, rich umami and a sweet aroma.</p>
        </div>
      </article><article class="cultivar-card">
        <img src="matcha-library.jpg" alt="Illustrative matcha powder for Asahi">
        <div>
          <p class="cultivar-region">Kyoto</p>
          <h3>Asahi</h3>
          <p>Highly prized for tencha; elegant, dense and suited to rich whisked tea.</p>
        </div>
      </article><article class="cultivar-card">
        <img src="matcha-library.jpg" alt="Illustrative matcha powder for Samidori">
        <div>
          <p class="cultivar-region">Kyoto</p>
          <h3>Samidori</h3>
          <p>Classic Uji cultivar with refined aroma, gentle sweetness and balanced umami.</p>
        </div>
      </article><article class="cultivar-card">
        <img src="matcha-library.jpg" alt="Illustrative matcha powder for Ujihikari">
        <div>
          <p class="cultivar-region">Kyoto</p>
          <h3>Ujihikari</h3>
          <p>Intense umami, aromatic depth and a soft, refined finish.</p>
        </div>
      </article><article class="cultivar-card">
        <img src="matcha-library.jpg" alt="Illustrative matcha powder for Uji Midori">
        <div>
          <p class="cultivar-region">Kyoto</p>
          <h3>Uji Midori</h3>
          <p>Refreshing varietal aroma with good colour and a clean, elegant profile.</p>
        </div>
      </article><article class="cultivar-card">
        <img src="matcha-library.jpg" alt="Illustrative matcha powder for Yamatomidori">
        <div>
          <p class="cultivar-region">Nara · cooler regions</p>
          <h3>Yamatomidori</h3>
          <p>An older cold-tolerant cultivar with a firmer, traditional tea character.</p>
        </div>
      </article><article class="cultivar-card">
        <img src="matcha-library.jpg" alt="Illustrative matcha powder for Okuyutaka">
        <div>
          <p class="cultivar-region">Kagoshima · Kyushu</p>
          <h3>Okuyutaka</h3>
          <p>Late-budding and mellow, often used to extend the harvest window.</p>
        </div>
      </article><article class="cultivar-card">
        <img src="matcha-library.jpg" alt="Illustrative matcha powder for Kanayamidori">
        <div>
          <p class="cultivar-region">Shizuoka · Kagoshima</p>
          <h3>Kanayamidori</h3>
          <p>Deep green colour and a distinctive cultivar aroma.</p>
        </div>
      </article><article class="cultivar-card">
        <img src="matcha-library.jpg" alt="Illustrative matcha powder for Tsuyuhikari">
        <div>
          <p class="cultivar-region">Shizuoka</p>
          <h3>Tsuyuhikari</h3>
          <p>Bright colour and fresh aromatic lift, often with a soft modern profile.</p>
        </div>
      </article><article class="cultivar-card">
        <img src="matcha-library.jpg" alt="Illustrative matcha powder for Sayamakaori">
        <div>
          <p class="cultivar-region">Saitama · Shizuoka</p>
          <h3>Sayamakaori</h3>
          <p>Bold aroma, firm structure and a more assertive tea character.</p>
        </div>
      </article><article class="cultivar-card">
        <img src="matcha-library.jpg" alt="Illustrative matcha powder for Yutakamidori">
        <div>
          <p class="cultivar-region">Kagoshima</p>
          <h3>Yutakamidori</h3>
          <p>Early-budding, vivid and aromatic, with a fuller southern-Japan style.</p>
        </div>
      </article></div>
    <p class="source-note">Powder imagery is illustrative. Taste notes are broad tendencies rather than guarantees for every producer.</p>
  </article>`
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
      <div class="region-tags">${r.cultivars.map(t=>`<span>${t}</span>`).join('')}</div>
    </div>
    <div class="region-section">
      <span>Broad style</span>
      <div class="region-tags">${r.notes.map(t=>`<span>${t}</span>`).join('')}</div>
    </div>
    <p class="source-note">These are educational tendencies, not fixed flavour guarantees.</p>`;
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
function closeLibrary(){libraryDrawer.classList.remove('open');libraryOverlay.classList.remove('open');libraryDrawer.setAttribute('aria-hidden','true');libraryOverlay.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelectorAll('.library-card').forEach(card=>card.addEventListener('click',()=>openLibrary(card.dataset.topic)));
document.querySelectorAll('[data-library-topic]').forEach(button=>button.addEventListener('click',()=>openLibrary(button.dataset.libraryTopic)));
libraryClose.addEventListener('click',closeLibrary);libraryOverlay.addEventListener('click',closeLibrary);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLibrary()});
