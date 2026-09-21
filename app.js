(() => {
  const C = window.REVO_CONTENT;
  const state = { lang: localStorage.getItem('revo-lang') || 'ar', filter:'all' };
  const $ = (s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const dict={
    ar:{
      'nav.services':'الخدمات','nav.work':'الأعمال','nav.clients':'العملاء','nav.contact':'تواصل','nav.cta':'ابدأ مشروعك',
      'hero.label':'استوديو إبداعي من ليبيا','hero.title':'هنا تبدأ العلامات.','hero.sub':'هوية، تصميم، محتوى وتجارب إبداعية.','hero.work':'استعرض أعمالنا','hero.start':'ابدأ مشروعك',
      'intro.kicker':'عن ريفو','intro.text':'ريفو استوديو إبداعي يساعد العلامات على بناء حضور بصري واضح، مميز وقابل للتذكر.',
      'services.title':'خدماتنا','services.note':'نحوّل الفكرة إلى نظام بصري وتجربة متكاملة، من أول علامة حتى آخر نقطة تواصل.',
      'work.title':'أعمال مختارة','work.note':'مشاريع حقيقية من أعمال REVO في الهوية، الحملات والتجارب الرقمية.',
      'filters.all':'الكل','filters.branding':'الهوية','filters.social':'السوشيال ميديا','filters.web':'المواقع',
      'break.title':'الأفكار تصبح علامات.<br>والعلامات تصبح تجارب.','clients.title':'عملاؤنا','clients.note':'علامات ومؤسسات وثقت في REVO لبناء حضور بصري أكثر وضوحاً وتميزاً.',
      'cta.kicker':'الفكرة الجاية تبدأ من هنا.','cta.title':'عندك مشروع؟ خلينا نبدأ.','cta.sub':'شاركنا فكرتك، ونبني معك حضوراً يستحق أن يُتذكر.','cta.start':'ابدأ مشروعك',
      'contact.title':'نبنوا الشي الجاي مع بعض.','contact.note':'احكيلنا على المشروع، ونرتب أول خطوة بطريقة واضحة وسريعة.',
      'form.name':'الاسم','form.company':'الشركة','form.phone':'الهاتف / واتساب','form.service':'الخدمة','form.message':'الرسالة','form.send':'أرسل تفاصيل المشروع عبر واتساب','form.note':'سيتم فتح واتساب برسالة جاهزة تحتوي على تفاصيل مشروعك.','footer.made':'صُنع بإبداع في ليبيا.'
    },
    en:{
      'nav.services':'Services','nav.work':'Work','nav.clients':'Clients','nav.contact':'Contact','nav.cta':'Start a Project',
      'hero.label':'Creative studio from Libya','hero.title':'Brands Start Here.','hero.sub':'Branding, Design, Digital & Creative Experiences.','hero.work':'View Our Work','hero.start':'Start a Project',
      'intro.kicker':'About REVO','intro.text':'REVO is a creative studio helping brands build distinctive, memorable and meaningful visual experiences.',
      'services.title':'Our Services','services.note':'We turn ideas into coherent visual systems and experiences, from the first mark to every brand touchpoint.',
      'work.title':'Selected Work','work.note':'Real REVO projects across branding, campaigns and digital experiences.',
      'filters.all':'All','filters.branding':'Branding','filters.social':'Social Media','filters.web':'Web',
      'break.title':'Ideas become brands.<br>Brands become experiences.','clients.title':'Selected Clients','clients.note':'Brands and organizations that trusted REVO to build a clearer, more distinctive visual presence.',
      'cta.kicker':'The next idea starts here.','cta.title':'Have a project in mind?','cta.sub':"Tell us what you're building and let's create something worth remembering.",'cta.start':'Start a Project',
      'contact.title':"Let's build the next thing.",'contact.note':'Tell us about your project and we will make the first step clear and simple.',
      'form.name':'Name','form.company':'Company','form.phone':'Phone / WhatsApp','form.service':'Service','form.message':'Message','form.send':'Send Project Brief via WhatsApp','form.note':'WhatsApp will open with a ready-to-send message containing your project details.','footer.made':'Made with creativity in Libya.'
    }
  };
  const t=k=>dict[state.lang][k]||k;

  function renderServices(){
    $('#service-list').innerHTML=C.services.map(s=>`<article class="service-row reveal"><div class="service-num">${s.n}</div><div class="service-title">${state.lang==='ar'?s.ar:s.en}<small>${state.lang==='ar'?s.en:s.ar}</small></div><p class="service-desc">${state.lang==='ar'?s.descAr:s.descEn}</p><div class="service-arrow" aria-hidden="true">↗</div></article>`).join('');
  }
  function renderProjects(){
    $('#work-grid').innerHTML=C.projects.map(p=>`<article class="work-card reveal" data-category="${p.category}" data-cursor="VIEW"><span class="work-index">${p.id} / 05</span><button type="button" data-project="${p.slug}" aria-label="${state.lang==='ar'?'عرض مشروع':'View project'} ${p.name}"><img src="${p.cover}" alt="${p.name} — ${state.lang==='ar'?p.labelAr:p.labelEn}" loading="lazy"><div class="work-overlay"><div><h3>${p.name}</h3><p>${state.lang==='ar'?p.labelAr:p.labelEn} · ${state.lang==='ar'?p.fieldAr:p.fieldEn}</p></div><b aria-hidden="true">↗</b></div></button></article>`).join('');
    applyFilter(); bindProjectOpen(); bindCursorTargets(); bindReveal();
  }
  function renderClients(){
    const rows=[...C.clients,...C.clients];
    $('#logo-marquee').innerHTML=rows.map(c=>`<div class="logo-item"><img src="${c.src}" alt="${c.name}" loading="lazy"></div>`).join('');
  }
  function renderContact(){
    const d=C.contact;
    $('#whatsapp-cta').href=`https://wa.me/${d.whatsappIntl}`;
    $('#social-list').innerHTML=`
      <a href="https://wa.me/${d.whatsappIntl}" target="_blank" rel="noopener"><span>WhatsApp</span><small>${d.whatsappDisplay}</small><b>↗</b></a>
      <a href="${d.instagram}" target="_blank" rel="noopener"><span>Instagram</span><small>@revostudio.ly</small><b>↗</b></a>
      <a href="${d.facebook}" target="_blank" rel="noopener"><span>Facebook</span><small>REVO Studio</small><b>↗</b></a>
      <a href="mailto:${d.email}"><span>Email</span><small>${d.email}</small><b>↗</b></a>`;
  }
  function renderSelect(){
    $('#service-select').innerHTML=`<option value="">${state.lang==='ar'?'اختر الخدمة':'Choose a service'}</option>`+C.services.map(s=>`<option value="${state.lang==='ar'?s.ar:s.en}">${state.lang==='ar'?s.ar:s.en}</option>`).join('');
  }
  function applyLanguage(lang){
    state.lang=lang;localStorage.setItem('revo-lang',lang);document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.title=lang==='ar'?'ريفو للخدمات الإبداعية | Brands Start Here':'REVO Creative Services | Brands Start Here';
    $$('[data-i18n]').forEach(el=>el.innerHTML=t(el.dataset.i18n));
    renderServices();renderProjects();renderSelect();
    $$('.lang-toggle span').forEach(x=>x.classList.remove('active'));const parts=$$('.lang-toggle span');parts[lang==='ar'?0:2].classList.add('active');
  }
  function applyFilter(){ $$('.work-card').forEach(card=>card.classList.toggle('hidden',state.filter!=='all'&&!card.dataset.category.split(' ').includes(state.filter))); }
  function bindFilters(){ $$('.filter').forEach(btn=>btn.addEventListener('click',()=>{ $$('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');state.filter=btn.dataset.filter;applyFilter(); })); }
  function openProject(slug){
    const p=C.projects.find(x=>x.slug===slug);if(!p)return;const d=$('#project-dialog');
    $('.dialog-index',d).textContent=`${p.id} / 05`;
    $('.dialog-title',d).textContent=p.name;
    $('.dialog-field',d).textContent=`${state.lang==='ar'?p.labelAr:p.labelEn} · ${state.lang==='ar'?p.fieldAr:p.fieldEn}`;
    $('.dialog-desc',d).textContent=state.lang==='ar'?p.descAr:p.descEn;
    $('.dialog-gallery',d).innerHTML=p.gallery.map((src,i)=>`<figure><img src="${src}" alt="${p.name} ${i+1}" loading="lazy"></figure>`).join('');
    d.showModal();document.body.style.overflow='hidden';
  }
  function bindProjectOpen(){ $$('[data-project]').forEach(b=>b.onclick=()=>openProject(b.dataset.project)); }
  function bindDialog(){ const d=$('#project-dialog');$('.dialog-close',d).onclick=()=>d.close();d.addEventListener('close',()=>document.body.style.overflow='');d.addEventListener('click',e=>{if(e.target===d)d.close()}); }
  function bindForm(){ $('#project-form').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const ar=state.lang==='ar';const msg=ar?`مرحباً REVO، عندي مشروع جديد.\n\nالاسم: ${fd.get('name')}\nالشركة: ${fd.get('company')||'-'}\nرقم التواصل: ${fd.get('phone')||'-'}\nالخدمة: ${fd.get('service')}\n\nتفاصيل المشروع:\n${fd.get('message')}`:`Hello REVO, I have a new project.\n\nName: ${fd.get('name')}\nCompany: ${fd.get('company')||'-'}\nPhone: ${fd.get('phone')||'-'}\nService: ${fd.get('service')}\n\nProject details:\n${fd.get('message')}`;window.open(`https://wa.me/${C.contact.whatsappIntl}?text=${encodeURIComponent(msg)}`,'_blank','noopener');}); }
  function bindMenu(){ const btn=$('.menu-btn'),menu=$('.mobile-menu');btn.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);btn.classList.toggle('open',open);btn.setAttribute('aria-expanded',open);menu.setAttribute('aria-hidden',!open)});$$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');btn.classList.remove('open')})); }
  function bindReveal(){ if(!('IntersectionObserver'in window)){$$('.reveal').forEach(x=>x.classList.add('visible'));return}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.transitionDelay=`${e.target.dataset.delay||0}ms`;e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -30px'});$$('.reveal:not(.visible)').forEach(x=>io.observe(x)); }
  function bindCursorTargets(){ if(!matchMedia('(pointer:fine)').matches)return;const cur=$('.cursor'),lab=$('.cursor span');window.onpointermove=e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px'};$$('[data-cursor]').forEach(el=>{el.onmouseenter=()=>{lab.textContent=state.lang==='ar'?'عرض':'VIEW';cur.classList.add('active')};el.onmouseleave=()=>cur.classList.remove('active')}); }
  function bindParallax(){ if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;const v=$('.hero-visual');window.addEventListener('pointermove',e=>{if(innerWidth<980)return;const x=(e.clientX/innerWidth-.5)*8,y=(e.clientY/innerHeight-.5)*8;v.style.transform=`translate3d(${x}px,${y}px,0)`},{passive:true}); }
  function init(){renderClients();renderContact();applyLanguage(state.lang);bindFilters();bindDialog();bindForm();bindMenu();bindReveal();bindCursorTargets();bindParallax();$('.lang-toggle').onclick=()=>applyLanguage(state.lang==='ar'?'en':'ar');window.addEventListener('scroll',()=>$('.site-header').classList.toggle('scrolled',scrollY>20),{passive:true});}
  init();
})();
