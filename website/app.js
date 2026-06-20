/* ============================================================
   The Invyte Co. — Storefront engine
   ============================================================ */
(function(){
  var S=window.SITE;
  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var esc=function(s){return String(s==null?"":s).replace(/[<>&]/g,function(c){return{"<":"&lt;",">":"&gt;","&":"&amp;"}[c]})};
  var waBase="https://wa.me/"+S.whatsapp;

  /* loader */
  window.addEventListener("load",function(){setTimeout(function(){$("#loader").classList.add("done");},500);});
  $("#yr").textContent=new Date().getFullYear();

  /* nav */
  addEventListener("scroll",function(){
    $("#nav").classList.toggle("solid",scrollY>30);
    var h=document.documentElement;$("#progress").style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%";
  },{passive:true});
  $("#burger").onclick=function(){$("#nlinks").classList.toggle("open");};
  $$("#nlinks a").forEach(function(a){a.onclick=function(){$("#nlinks").classList.remove("open");};});

  /* whatsapp links */
  function waLink(msg){return waBase+"?text="+encodeURIComponent(msg);}
  $$("[data-wa]").forEach(function(el){el.href=waLink(el.getAttribute("data-wa")||"Hi! I'd like to know more about your wedding invitations.");});
  $("#waFab").href=waLink("Hi! I'd like to order a wedding invitation.");

  /* trust marquee */
  var trust="The Invyte Co. ✦ Luxury Digital Invitations ✦ Wedding ✦ Engagement ✦ Save the Date ✦ Reception ✦ Haldi ✦ Mehndi ✦ Sangeet ✦ ";
  $("#trustTrack").innerHTML="<span>"+trust+"</span><span>"+trust+"</span>";

  /* templates */
  $("#tplGrid").innerHTML=S.templates.map(function(t){
    var grad="linear-gradient(155deg,"+t.palette[0]+","+t.palette[1]+")";
    var live=t.file?('<a class="btn gold" target="_blank" rel="noopener" href="'+t.file+'">Live Preview</a>'):'';
    var order=t.file
      ?('<a class="btn maroon" target="_blank" rel="noopener" href="'+waLink("Hi! I'm interested in the \""+t.name+" ("+t.tagline+")\" template. Please share details.")+'">Order</a>')
      :('<span class="soon">Available on request</span>');
    return '<article class="tpl rv">'
      +'<div class="preview" style="background:'+grad+'">'
        +(t.tag?'<span class="badge">'+esc(t.tag)+'</span>':'')
        +'<div><svg class="om"><use href="#om"/></svg><div class="pv-name">'+esc(t.name)+'</div><div class="pv-sub">'+esc(t.tagline)+'</div></div>'
        +(t.file?'<div class="overlay"><a class="btn gold" target="_blank" rel="noopener" href="'+t.file+'">Open Full Preview ↗</a></div>':'')
      +'</div>'
      +'<div class="body"><div class="row"><h3>'+esc(t.name)+'</h3><span class="tier">'+esc(t.tier)+'</span></div>'
        +'<div class="tg">'+esc(t.tagline)+'</div>'
        +'<p>'+esc(t.desc)+'</p>'
        +'<div class="actions">'+live+order+'</div></div>'
      +'</article>';
  }).join("");

  /* showcase chips -> swap phone */
  var liveTemplates=S.templates.filter(function(t){return t.file;});
  $("#chips").innerHTML=liveTemplates.map(function(t,i){return '<button class="chip '+(i===0?'active':'')+'" data-file="'+t.file+'" data-name="'+esc(t.name)+'">'+esc(t.name)+'</button>';}).join("");
  $$("#chips .chip").forEach(function(b){b.onclick=function(){
    $$("#chips .chip").forEach(function(x){x.classList.remove("active");});b.classList.add("active");
    var fr=$("#showFrame");fr.style.opacity="0";
    setTimeout(function(){fr.src=b.dataset.file;fr.onload=function(){fr.style.opacity="1";};},150);
    $("#phoneCap").textContent=b.dataset.name;
  };});

  /* features */
  var FIC={
    scratch:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="8" y="14" width="32" height="20" rx="3"/><path d="M14 24l8 4 10-8"/></svg>',
    ganesh:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="10"/><path d="M24 6v6M24 36v6M6 24h6M36 24h6"/></svg>',
    rsvp:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="8" y="12" width="32" height="24" rx="3"/><path d="M8 16l16 10 16-10"/></svg>',
    events:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="9" y="11" width="30" height="28" rx="3"/><path d="M9 19h30M17 7v8M31 7v8"/></svg>',
    countdown:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="24" cy="26" r="15"/><path d="M24 26V17M24 26l7 4M18 6h12"/></svg>',
    music:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 34V12l18-4v22"/><circle cx="14" cy="34" r="4"/><circle cx="32" cy="30" r="4"/></svg>',
    mobile:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="15" y="6" width="18" height="36" rx="4"/><path d="M22 36h4"/></svg>',
    edit:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M30 10l8 8-20 20-9 1 1-9z"/><path d="M27 13l8 8"/></svg>'
  };
  $("#featGrid").innerHTML=S.features.map(function(f){return '<div class="feat rv"><div class="ic">'+(FIC[f.i]||'')+'</div><h3>'+esc(f.t)+'</h3><p>'+esc(f.d)+'</p></div>';}).join("");

  /* pricing */
  $("#priceGrid").innerHTML=S.pricing.map(function(p){
    return '<div class="price rv'+(p.popular?' popular':'')+'">'+(p.popular?'<span class="pop">Most loved</span>':'')
      +'<h3>'+esc(p.name)+'</h3><div class="amt"><small>₹</small>'+esc(p.price)+'</div>'
      +'<ul>'+p.perks.map(function(x){return '<li>'+esc(x)+'</li>';}).join("")+'</ul>'
      +'<a class="btn '+(p.popular?'gold':'maroon')+'" target="_blank" rel="noopener" href="'+waLink("Hi! I'd like the "+p.name+" plan (₹"+p.price+"). Please help me get started.")+'">Choose '+esc(p.name)+'</a></div>';
  }).join("");
  $("#addonRow").innerHTML=S.addons.map(function(a){return '<div class="addon">'+esc(a.t)+'<b>₹'+esc(a.p)+'</b></div>';}).join("");

  /* steps */
  $("#steps").innerHTML=S.steps.map(function(s){return '<div class="step rv"><div class="n">'+s.n+'</div><h3>'+esc(s.t)+'</h3><p>'+esc(s.d)+'</p></div>';}).join("");

  /* testimonials */
  $("#testiGrid").innerHTML=S.testimonials.map(function(t){return '<div class="testi rv"><div class="stars">★★★★★</div><p class="q">“'+esc(t.q)+'”</p><p class="who"><b>'+esc(t.n)+'</b> · '+esc(t.r)+'</p></div>';}).join("");

  /* faq + schema */
  $("#faqList").innerHTML=S.faqs.map(function(f){return '<div class="faq-item"><button class="faq-q">'+esc(f.q)+'<span class="plus">+</span></button><div class="faq-a"><p>'+esc(f.a)+'</p></div></div>';}).join("");
  $$(".faq-q").forEach(function(q){q.onclick=function(){q.parentElement.classList.toggle("open");};});
  var ld=document.createElement("script");ld.type="application/ld+json";
  ld.textContent=JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:S.faqs.map(function(f){return{"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}};})});
  document.head.appendChild(ld);

  /* order form -> whatsapp */
  $("#orderForm").addEventListener("submit",function(e){
    e.preventDefault();
    var d=Object.fromEntries(new FormData(e.target));
    var msg="Namaste! I'd like to order a wedding invitation.\nName: "+d.name+"\nWhatsApp: "+d.phone+"\nWedding date: "+d.date+"\nTemplate/Plan: "+(d.plan||"-");
    $("#orderThanks").hidden=false;burst();
    setTimeout(function(){window.open(waLink(msg),"_blank");},500);
    e.target.reset();
  });

  /* reveal */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.14});
  $$(".rv,.divider").forEach(function(el){io.observe(el);});

  /* count up stats */
  $$("[data-count]").forEach(function(el){
    var cObs=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;
      var target=parseFloat(el.dataset.count),dec=+(el.dataset.decimal||0),t0=null;
      function step(ts){t0=t0||ts;var p=Math.min((ts-t0)/1500,1);var v=target*(1-Math.pow(1-p,3));el.textContent=dec?v.toFixed(dec):Math.floor(v).toLocaleString("en-IN");if(p<1)requestAnimationFrame(step);else el.textContent=dec?target.toFixed(dec):target.toLocaleString("en-IN");}
      requestAnimationFrame(step);cObs.unobserve(el);});},{threshold:.6});
    cObs.observe(el);
  });

  /* image-safe: confetti */
  function burst(){var col=["#c9a24b","#6a0f1c","#0e5a5e","#b3294e","#f0d79a"];for(var i=0;i<80;i++){(function(k){var x=document.createElement("div");x.style.cssText="position:fixed;z-index:999;width:8px;height:13px;top:-20px;pointer-events:none;left:"+Math.random()*100+"vw;background:"+col[k%5]+";border-radius:2px";document.body.appendChild(x);x.animate([{transform:"translateY(0) rotate(0)"},{transform:"translateY(106vh) rotate("+(720*(Math.random()>.5?1:-1))+"deg)"}],{duration:2400+Math.random()*1200,easing:"cubic-bezier(.2,.6,.3,1)"}).onfinish=function(){x.remove();};})(i);}}
})();
