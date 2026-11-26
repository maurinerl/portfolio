/* ============================================================
   MAURINE — scripts partagés
   Le contenu (projets, créations) est chargé depuis /content/*.json
   ============================================================ */
(function(){
  var TAGLABEL={web:"Web",comm:"Communication",social:"Social media",branding:"Branding",video:"Vidéo",recherche:"Recherche",event:"Event"};
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  },{threshold:.12});
  function observe(el){ io.observe(el); }

  /* ---------- Header / menu / footer ---------- */
  var header=document.querySelector('header.site');
  if(header){ addEventListener('scroll',function(){ header.classList.toggle('scrolled',scrollY>10); }); }
  var burger=document.getElementById('burger'), navLinks=document.getElementById('navLinks');
  if(burger&&navLinks){
    burger.addEventListener('click',function(){ var o=navLinks.classList.toggle('open'); burger.setAttribute('aria-expanded',String(o)); });
    navLinks.querySelectorAll('a:not(.mega a)').forEach(function(a){
      a.addEventListener('click',function(){ navLinks.classList.remove('open'); burger.setAttribute('aria-expanded','false'); });
    });
  }
  var megaToggle=document.querySelector('.has-mega > .nav-link');
  if(megaToggle){ megaToggle.addEventListener('click',function(e){ if(window.innerWidth<=640){ e.preventDefault(); megaToggle.parentElement.classList.toggle('expanded'); } }); }
  document.querySelectorAll('.reveal').forEach(observe);
  var y=document.getElementById('year'); if(y){ y.textContent=new Date().getFullYear(); }

  /* ---------- Helpers ---------- */
  function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function pills(tags){ return (tags||[]).map(function(t){ return '<span class="tag">'+(TAGLABEL[t]||t)+'</span>'; }).join(''); }
  function projCard(p){
    var tags=(p.tags||[]);
    var thumb = p.image ? '<img src="'+esc(p.image)+'" alt="'+esc(p.title)+'">' : '';
    var first = tags[0] || 'all';
    return '<a class="card reveal" href="projets.html#tag='+first+'" data-itemgroup="projets" data-tags="'+tags.join(' ')+'">'
      + '<div class="thumb">'+thumb+'</div>'
      + '<div class="body"><h3>'+esc(p.title)+'</h3><p class="desc">'+esc(p.desc)+'</p><div class="tags">'+pills(tags)+'</div></div></a>';
  }
  function getJSON(path){ return fetch(path,{cache:'no-cache'}).then(function(r){ return r.json(); }); }

  /* ---------- Filtres ---------- */
  function wireFilters(scope){
    var filters=document.querySelectorAll('[data-filtergroup="'+scope+'"] .filter');
    if(!filters.length) return;
    var items=document.querySelectorAll('[data-itemgroup="'+scope+'"]');
    var empty=document.querySelector('[data-empty="'+scope+'"]');
    function apply(f){
      filters.forEach(function(b){ b.setAttribute('aria-pressed',String(b.dataset.filter===f)); });
      var shown=0;
      items.forEach(function(c){ var ok=f==='all'||(c.dataset.tags||'').split(' ').indexOf(f)>-1; c.classList.toggle('hide',!ok); if(ok)shown++; });
      if(empty) empty.style.display=shown?'none':'block';
    }
    filters.forEach(function(b){ b.addEventListener('click',function(){ apply(b.dataset.filter); }); });
    var m=location.hash.match(/tag=([a-z]+)/);
    if(m){ var btn=[].slice.call(filters).find(function(b){return b.dataset.filter===m[1];}); if(btn) apply(m[1]); }
  }

  /* ---------- Lightbox (créations) ---------- */
  function wireLightbox(){
    var figs=[].slice.call(document.querySelectorAll('.gallery figure img'));
    var lb=document.getElementById('lightbox');
    if(!lb||!figs.length) return;
    var lbImg=lb.querySelector('img'), idx=0;
    function vis(){ return figs.filter(function(im){ return !im.closest('figure').classList.contains('hide'); }); }
    function show(i){ var v=vis(); if(!v.length)return; idx=(i+v.length)%v.length; lbImg.src=v[idx].src; lbImg.alt=v[idx].alt||''; }
    figs.forEach(function(im){ im.closest('figure').addEventListener('click',function(){ var v=vis(); idx=v.indexOf(im); lb.classList.add('open'); document.body.style.overflow='hidden'; show(idx); }); });
    function close(){ lb.classList.remove('open'); document.body.style.overflow=''; }
    lb.querySelector('.lb-close').addEventListener('click',close);
    lb.addEventListener('click',function(e){ if(e.target===lb) close(); });
    lb.querySelector('.lb-prev').addEventListener('click',function(e){ e.stopPropagation(); show(idx-1); });
    lb.querySelector('.lb-next').addEventListener('click',function(e){ e.stopPropagation(); show(idx+1); });
    document.addEventListener('keydown',function(e){ if(!lb.classList.contains('open'))return; if(e.key==='Escape')close(); if(e.key==='ArrowLeft')show(idx-1); if(e.key==='ArrowRight')show(idx+1); });
  }

  /* ---------- Rendu des pages ---------- */
  var page=document.body.dataset.page;

  // Accueil : projets "featured" (max 4)
  var featGrid=document.getElementById('featuredGrid');
  if(featGrid){
    getJSON('content/projets.json').then(function(d){
      var all=Array.isArray(d)?d:(d.projets||[]);
      var list=all.filter(function(p){return p.featured;}).slice(0,4);
      if(!list.length) list=all.slice(0,4);
      featGrid.innerHTML=list.map(projCard).join('');
      featGrid.querySelectorAll('.reveal').forEach(observe);
    }).catch(function(){ featGrid.innerHTML='<p class="empty-msg">Projets à venir.</p>'; });
  }

  // Projets : grille complète + filtres
  var projGrid=document.getElementById('projGrid');
  if(projGrid){
    getJSON('content/projets.json').then(function(d){
      var all=Array.isArray(d)?d:(d.projets||[]);
      projGrid.innerHTML=all.map(projCard).join('');
      projGrid.querySelectorAll('.reveal').forEach(observe);
      wireFilters('projets');
    }).catch(function(){ projGrid.innerHTML='<p class="empty-msg">Impossible de charger les projets.</p>'; });
  }

  // Créations : galerie
  var gallery=document.getElementById('gallery');
  if(gallery){
    getJSON('content/creations.json').then(function(d){
      var all=Array.isArray(d)?d:(d.creations||[]);
      gallery.innerHTML=all.map(function(c){
        return '<figure data-itemgroup="creations"><img src="'+esc(c.image)+'" alt="'+esc(c.alt)+'" loading="lazy"></figure>';
      }).join('');
      wireLightbox();
    }).catch(function(){ gallery.innerHTML='<p class="empty-msg">Impossible de charger les créations.</p>'; });
  }
})();
