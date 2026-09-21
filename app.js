(() => {
  const C = window.REVO_CONTENT;
  const state = { lang: 'en' };
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  const dictionary = {
    en:{
      'nav.services':'Services','nav.work':'Work','nav.clients':'Clients','nav.contact':'Contact','nav.cta':'Start a Project',
      'hero.label':'Creative Services','hero.title':'Brands Start Here.','hero.sub':'Branding, Design, Digital & Creative Experiences.','hero.work':'View Our Work','hero.start':'Start a Project','hero.temp':'Prototype visual / temporary stock',
      'intro.kicker':'About REVO','intro.text':C.brand.intro.en,
      'services.title':'Our Services','services.note':'Focused creative services for brands that want a stronger visual presence.',
      'work.title':'Selected Work','work.note':'Temporary stock visuals are used for layout review only — not presented as REVO client work.',
      'filters.all':'All','filters.branding':'Branding','filters.social':'Social Media','filters.photo':'Photography','filters.ads':'Advertising','filters.web':'Web',
      'break.title':'Ideas become brands.<br>Brands become experiences.',
      'clients.title':'Selected Clients','clients.note':'Neutral placeholder marks for the prototype. Real REVO client logos can be dropped in later.',
      'cta.kicker':'Start something worth seeing.','cta.title':'Have a project in mind?','cta.sub':"Tell us what you're building and let's create something worth remembering.",'cta.start':'Start a Project',
      'contact.title':"Let's build the next thing.",'contact.note':'Contact details are placeholders in this prototype and can be replaced from one content file.',
      'form.name':'Name','form.company':'Company','form.phone':'Phone / WhatsApp','form.service':'Service','form.message':'Message','form.send':'Send Project Brief','form.demo':'Prototype form — submission is intentionally disabled until REVO contact details are added.',
      'footer.made':'Made with creativity in Libya.'
    },
    ar:{
      'nav.services':'الخدمات','nav.work':'الأعمال','nav.clients':'العملاء','nav.contact':'تواصل','nav.cta':'ابدأ مشروعك',
      'hero.label':'خدمات إبداعية','hero.title':'هنا تبدأ العلامات.','hero.sub':'هوية، تصميم، محتوى وتجارب إبداعية.','hero.work':'استعرض أعمالنا','hero.start':'ابدأ مشروعك','hero.temp':'صورة مؤقتة للنسخة التجريبية',
      'intro.kicker':'عن ريفو','intro.text':C.brand.intro.ar,
      'services.title':'خدماتنا','services.note':'خدمات إبداعية مركزة للعلامات التي تبحث عن حضور بصري أقوى.',
      'work.title':'أعمال مختارة','work.note':'الصور الحالية مؤقتة لمراجعة التصميم فقط، ولا يتم عرضها كأعمال حقيقية لريـفو.',
      'filters.all':'الكل','filters.branding':'الهوية','filters.social':'السوشيال ميديا','filters.photo':'التصوير','filters.ads':'الإعلانات','filters.web':'المواقع',
      'break.title':'الأفكار تصبح علامات.<br>والعلامات تصبح تجارب.',
      'clients.title':'عملاؤنا','clients.note':'شعارات محايدة مؤقتة للنسخة التجريبية. يمكن استبدالها لاحقاً بشعارات عملاء ريفو الفعلية.',
      'cta.kicker':'خلّينا نبدأ شيئاً يستحق أن يُرى.','cta.title':'عندك مشروع؟ خلينا نبدأ.','cta.sub':'شاركنا فكرتك، ونبني معك حضوراً يستحق أن يُتذكر.','cta.start':'ابدأ مشروعك',
      'contact.title':'نبنوا الشي الجاي مع بعض.','contact.note':'بيانات التواصل مؤقتة في هذه النسخة ويمكن استبدالها كلها من ملف محتوى واحد.',
      'form.name':'الاسم','form.company':'الشركة','form.phone':'الهاتف / واتساب','form.service':'الخدمة','form.message':'الرسالة','form.send':'أرسل تفاصيل المشروع','form.demo':'نموذج تجريبي — الإرسال متوقف إلى أن تتم إضافة بيانات تواصل ريفو الفعلية.',
      'footer.made':'صُنع بإبداع في ليبيا.'
    }
  };

  function t(key){return dictionary[state.lang][key] || key;}
  function renderServices(){
    $('#service-list').innerHTML = C.services.map(s => `
      <article class="service-row reveal">
        <div class="service-num">${s.n}</div>
        <div class="service-title">${state.lang==='ar'?s.ar:s.en}<small>${state.lang==='ar'?s.en:s.ar}</small></div>
        <p class="service-desc">${state.lang==='ar'?s.descAr:s.descEn}</p>
        <div class="service-arrow" aria-hidden="true">↗</div>
      </article>`).join('');
  }
  function renderProjects(){
    $('#work-grid').innerHTML = C.projects.map((p,i) => `
      <article class="work-card reveal" data-category="${p.category}" data-cursor="VIEW">
        <figure>
          <img id="project-image-${String(i+1).padStart(2,'0')}" src="${C.images[p.imageKey]}" alt="Temporary stock placeholder for ${p.catEn}" loading="lazy" />
          <span class="prototype-badge">Prototype / Placeholder</span>
          <figcaption class="work-overlay"><div><h3>${state.lang==='ar'?p.nameAr:p.nameEn}</h3><p>${state.lang==='ar'?p.catAr:p.catEn}</p></div><b aria-hidden="true">↗</b></figcaption>
        </figure>
      </article>`).join('');
  }
  function renderClients(){
    const items=[...C.clients,...C.clients];
    $('#logo-marquee').innerHTML=items.map(c=>`<div class="logo-item"><div class="logo-mark">${c.mark}</div><div class="logo-name">${c.name}</div></div>`).join('');
  }
  function renderServiceSelect(){
    $('#service-select').innerHTML = `<option value="">${state.lang==='ar'?'اختر الخدمة':'Choose a service'}</option>` + C.services.map(s=>`<option>${state.lang==='ar'?s.ar:s.en}</option>`).join('');
  }
  function applyLanguage(lang){
    state.lang=lang;
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.title=lang==='ar'?'ريفو للخدمات الإبداعية | Brands Start Here':'REVO Creative Services | Brands Start Here';
    $('meta[name="description"]').setAttribute('content',lang==='ar'?'ريفو استوديو للخدمات الإبداعية متخصص في الهوية البصرية، تصميم الشعارات، تصميم السوشيال ميديا، التصوير والمونتاج، الحملات الإعلانية وتصميم وتطوير المواقع.':'REVO is a creative studio specializing in visual identity, logo design, social media design, photography, advertising and web design.');
    $$('[data-i18n]').forEach(el=>{el.innerHTML=t(el.dataset.i18n)});
    renderServices(); renderProjects(); renderServiceSelect(); bindReveal(); bindCursorTargets();
    const parts=$$('.lang-toggle span');
    parts.forEach(x=>x.classList.remove('active'));
    parts[lang==='en'?0:2].classList.add('active');
  }

  function bindReveal(){
    const obs=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){const d=e.target.dataset.delay||0;e.target.style.transitionDelay=`${d}ms`;e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -30px'});
    $$('.reveal:not(.visible)').forEach(el=>obs.observe(el));
  }
  function bindFilters(){
    $$('.filter').forEach(btn=>btn.addEventListener('click',()=>{
      $$('.filter').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
      const f=btn.dataset.filter;
      $$('.work-card').forEach(card=>card.classList.toggle('hidden',f!=='all'&&card.dataset.category!==f));
    }));
  }
  function bindMenu(){
    const btn=$('.menu-btn'), menu=$('.mobile-menu');
    btn.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);btn.classList.toggle('open',open);btn.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-hidden',String(!open));});
    $$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');btn.classList.remove('open');btn.setAttribute('aria-expanded','false');menu.setAttribute('aria-hidden','true')}));
  }
  function bindCursorTargets(){
    if(!window.matchMedia('(pointer:fine)').matches)return;
    const cursor=$('.cursor'), label=$('.cursor span');
    window.onpointermove=e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'};
    $$('[data-cursor]').forEach(el=>{el.onmouseenter=()=>{label.textContent=state.lang==='ar'?'عرض':(el.dataset.cursor||'VIEW');cursor.classList.add('active')};el.onmouseleave=()=>cursor.classList.remove('active')});
  }
  function bindParallax(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const visual=$('.hero-visual');
    window.addEventListener('pointermove',e=>{if(innerWidth<900)return;const x=(e.clientX/innerWidth-.5)*10,y=(e.clientY/innerHeight-.5)*10;visual.style.transform=`translate3d(${x}px,${y}px,0)`},{passive:true});
  }
  function init(){
    $('#hero-image-01').src=C.images.hero01; $('#hero-image-02').src=C.images.hero02;
    renderClients(); applyLanguage('en'); bindFilters(); bindMenu(); bindParallax();
    $('.lang-toggle').addEventListener('click',()=>applyLanguage(state.lang==='en'?'ar':'en'));
    window.addEventListener('scroll',()=>$('.site-header').classList.toggle('scrolled',scrollY>24),{passive:true});
    $$('.placeholder-link').forEach(a=>a.addEventListener('click',e=>{if(a.getAttribute('href')==='#contact'&&a.closest('#contact')) e.preventDefault()}));
  }
  init();
})();
