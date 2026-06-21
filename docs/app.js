/* ============================================================
   The Invyte Co. — Storefront engine
   ============================================================ */
(function(){
  var S=window.SITE;
  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var esc=function(s){return String(s==null?"":s).replace(/[<>&]/g,function(c){return{"<":"&lt;",">":"&gt;","&":"&amp;"}[c]})};
  var waBase="https://wa.me/"+S.whatsapp;
  function waLink(msg){return waBase+"?text="+encodeURIComponent(msg||"Hi! I'd like to know more about your wedding invitations.");}

  /* reveal-on-scroll observer (defined first so template render can use it) */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12});
  function observe(){ $$(".rv:not(.in)").forEach(function(el){io.observe(el);}); }

  window.addEventListener("load",function(){setTimeout(function(){$("#loader").classList.add("done");},450);});
  $("#yr").textContent=new Date().getFullYear();

  /* nav + progress */
  addEventListener("scroll",function(){$("#nav").classList.toggle("solid",scrollY>30);var h=document.documentElement;$("#progress").style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%";},{passive:true});
  $("#burger").onclick=function(){$("#nlinks").classList.toggle("open");};
  $$("#nlinks a").forEach(function(a){a.onclick=function(){$("#nlinks").classList.remove("open");};});

  /* whatsapp + demo links */
  $$("[data-wa]").forEach(function(el){el.href=waLink(el.getAttribute("data-wa"));});
  if($("#waFab"))$("#waFab").href=waLink("Hi! I'd like to order a wedding invitation.");
  var liveTemplates=S.templates.filter(function(t){return t.file;});
  var firstFile=liveTemplates[0]?liveTemplates[0].file:"";
  if($("#heroDemo"))$("#heroDemo").href=firstFile;
  if($("#footDemo"))$("#footDemo").href=firstFile;

  /* mini invitation thumbnail — different cover design per template */
  function miniCover(t){
    var c1=t.palette[0],c2=t.palette[1],c3=t.palette[2]||"#b8893f";
    var base='style="--c1:'+c1+';--c2:'+c2+'"';
    var dots='<div class="dots"><i style="background:'+c1+'"></i><i style="background:'+c2+'"></i><i style="background:'+c3+'"></i></div>';
    var st=t.style||"royal";
    if(st==="modern"){
      return '<div class="mini modern" '+base+'><div class="topbar"></div><div class="ov">The Wedding Of</div>'
        +'<div class="nm" style="color:'+c1+'">Aarav<br>Diya</div><div class="ln" style="background:'+c1+'"></div>'
        +'<div class="dt">12 . 12 . 2026</div>'+dots+'</div>';
    }
    if(st==="arch"){
      return '<div class="mini arch" '+base+'><div class="topbar"></div>'
        +'<div class="archframe" style="background:linear-gradient(155deg,'+c1+','+c2+')"><span>A&amp;D</span></div>'
        +'<div class="nm" style="color:'+c1+'">Aarav <em>&amp;</em> Diya</div><div class="dt">12 · 12 · 2026</div>'+dots+'</div>';
    }
    if(st==="floral"){
      return '<div class="mini floral" '+base+'><div class="topbar"></div><div class="scr" style="color:'+c1+'">Save the Date</div>'
        +'<div class="fdiv" style="color:'+c3+'">&#10047;</div><div class="nm" style="color:'+c1+'">Aarav &amp; Diya</div>'
        +'<div class="dt">12 · 12 · 2026</div>'+dots+'</div>';
    }
    return '<div class="mini royal" '+base+'><div class="topbar"></div><svg class="om" style="color:'+c3+'"><use href="#om"/></svg>'
      +'<div class="pre dev">सादर आमंत्रण</div><div class="nm" style="color:'+c1+'">Aarav <em>&amp;</em> Diya</div>'
      +'<div class="dt">12 · 12 · 2026</div><div class="std">'+esc(t.tagline)+'</div>'+dots+'</div>';
  }

  /* trust bar */
  if($("#trustRow")&&S.trust){
    var TIC='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2l2.4 5 5.6.6-4 4 1 5.4L12 19l-5 3 1-5.4-4-4 5.6-.6z"/></svg>';
    $("#trustRow").innerHTML=S.trust.map(function(x){return '<div class="trust-item rv"><span class="ti-ic">'+TIC+'</span><div><b>'+esc(x.t)+'</b><small>'+esc(x.d)+'</small></div></div>';}).join("");
  }

  /* moodboard (duplicate list for seamless marquee) */
  if($("#moodTrack")&&S.gallery){
    var imgs=S.gallery.concat(S.gallery).map(function(u){return '<div class="mood-card"><img src="'+u+'" alt="Indian wedding moment" loading="lazy" onerror="this.parentNode.remove()"></div>';}).join("");
    $("#moodTrack").innerHTML=imgs;
  }

  /* templates + tier filter */
  var TIERS=["All","Basic","Premium","Luxury"];
  function renderTemplates(tier){
    var list=(!tier||tier==="All")?S.templates:S.templates.filter(function(t){return t.tier===tier;});
    $("#tplGrid").innerHTML=list.map(function(t){
      var live=t.file?('<a class="btn gold sm" target="_blank" rel="noopener" href="'+t.file+'">Live Preview</a>'):'';
      var order=t.file
        ?('<a class="btn ghost sm" target="_blank" rel="noopener" href="'+waLink("Hi! I'm interested in the \""+t.name+"\" template ("+t.tier+"). Please share details.")+'">Order</a>')
        :('<span class="soon">On request</span>');
      var ov=t.file?'<div class="overlay"><a class="btn gold sm" target="_blank" rel="noopener" href="'+t.file+'">Open Preview ↗</a></div>':'<div class="overlay"><span class="soon-ov">On request</span></div>';
      var photo=t.img?'<img class="tpl-img" src="'+t.img+'" alt="'+esc(t.name)+' — Indian wedding invitation" loading="lazy" onerror="this.remove()">':'';
      return '<article class="tpl rv">'
        +'<div class="thumb"><span class="badge">'+esc(t.tier)+'</span>'
        +'<div class="ph">'+miniCover(t)+photo+ov+'</div></div>'
        +'<div class="body"><div class="row"><h3>'+esc(t.name)+'</h3>'+(t.tag?'<span class="tier">'+esc(t.tag)+'</span>':'')+'</div>'
        +'<p>'+esc(t.desc)+'</p><div class="actions">'+live+order+'</div></div></article>';
    }).join("");
    observe();
  }
  $("#filters").innerHTML=TIERS.map(function(t,i){return '<button class="chip '+(i===0?'active':'')+'" data-tier="'+t+'">'+t+'</button>';}).join("");
  $$("#filters .chip").forEach(function(b){b.onclick=function(){
    $$("#filters .chip").forEach(function(x){x.classList.remove("active");});b.classList.add("active");
    renderTemplates(b.dataset.tier);
  };});
  renderTemplates("All");

  /* features */
  var FIC={
    scratch:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="14" width="32" height="20" rx="3"/><path d="M14 24l8 4 10-8"/></svg>',
    ganesh:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="9"/></svg>',
    rsvp:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="12" width="32" height="24" rx="3"/><path d="M8 16l16 10 16-10"/></svg>',
    events:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="11" width="30" height="28" rx="3"/><path d="M9 19h30M17 7v8M31 7v8"/></svg>',
    countdown:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="26" r="14"/><path d="M24 26V18M24 26l6 4M18 7h12"/></svg>',
    music:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 33V13l17-4v20"/><circle cx="14" cy="33" r="4"/><circle cx="31" cy="29" r="4"/></svg>',
    mobile:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="15" y="6" width="18" height="36" rx="4"/><path d="M22 36h4"/></svg>',
    edit:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M30 10l8 8-20 20-9 1 1-9z"/><path d="M27 13l8 8"/></svg>'
  };
  $("#featGrid").innerHTML=S.features.map(function(f){return '<div class="feat rv"><div class="ic">'+(FIC[f.i]||'')+'</div><h3>'+esc(f.t)+'</h3><p>'+esc(f.d)+'</p></div>';}).join("");

  /* steps */
  $("#steps").innerHTML=S.steps.map(function(s){return '<div class="step rv"><div class="n">'+s.n+'</div><h3>'+esc(s.t)+'</h3><p>'+esc(s.d)+'</p></div>';}).join("");

  /* pricing */
  $("#priceGrid").innerHTML=S.pricing.map(function(p){
    return '<div class="price rv'+(p.popular?' popular':'')+'">'+(p.popular?'<span class="pop">Most loved</span>':'')
      +'<h3>'+esc(p.name)+'</h3><div class="amt"><small>₹</small>'+esc(p.price)+'</div>'
      +'<ul>'+p.perks.map(function(x){return '<li>'+esc(x)+'</li>';}).join("")+'</ul>'
      +'<a class="btn '+(p.popular?'gold':'ghost')+'" target="_blank" rel="noopener" href="'+waLink("Hi! I'd like the "+p.name+" plan (₹"+p.price+"). Please help me get started.")+'">Choose '+esc(p.name)+'</a></div>';
  }).join("");
  $("#addonRow").innerHTML=S.addons.map(function(a){return '<div class="addon"><span class="t">'+esc(a.t)+'</span>'+(a.d?'<span class="d">'+esc(a.d)+'</span>':'')+'<b>+ ₹'+esc(a.p)+'</b></div>';}).join("");

  /* testimonials */
  $("#testiGrid").innerHTML=S.testimonials.map(function(t){var ini=(t.n||"?").trim()[0];return '<div class="testi rv"><div class="stars">★★★★★</div><p class="q">“'+esc(t.q)+'”</p><div class="who-row"><span class="avatar">'+esc(ini)+'</span><p class="who"><b>'+esc(t.n)+'</b><br>'+esc(t.r)+'</p></div></div>';}).join("");

  /* faq + schema */
  $("#faqList").innerHTML=S.faqs.map(function(f){return '<div class="faq-item"><button class="faq-q">'+esc(f.q)+'<span class="plus">+</span></button><div class="faq-a"><p>'+esc(f.a)+'</p></div></div>';}).join("");
  $$(".faq-q").forEach(function(q){q.onclick=function(){q.parentElement.classList.toggle("open");};});
  var ld=document.createElement("script");ld.type="application/ld+json";
  ld.textContent=JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:S.faqs.map(function(f){return{"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}};})});
  document.head.appendChild(ld);
  var il=document.createElement("script");il.type="application/ld+json";
  il.textContent=JSON.stringify({"@context":"https://schema.org","@type":"ItemList","name":"Wedding Invitation Templates","itemListElement":S.templates.map(function(t,i){return{"@type":"ListItem","position":i+1,"name":t.name+" — "+t.tagline};})});
  document.head.appendChild(il);

  /* order — emails you the lead (free, Web3Forms) AND opens WhatsApp */
  if($("#emailBtn"))$("#emailBtn").href="mailto:"+S.email+"?subject="+encodeURIComponent("Wedding invitation enquiry")+"&body="+encodeURIComponent("Hi, I'd like to order a wedding invitation. My wedding date is: ");
  if($("#instaBtn"))$("#instaBtn").href=S.instagram;
  $("#orderForm").addEventListener("submit",function(e){
    e.preventDefault();var d=Object.fromEntries(new FormData(e.target));
    var msg="Namaste! I'd like to order a wedding invitation.\nName: "+d.name+"\nWhatsApp: "+d.phone+(d.email?"\nEmail: "+d.email:"")+"\nWedding date: "+d.date+"\nPlan: "+(d.plan||"-");
    if(S.web3formsKey){
      try{
        var fd=new FormData();fd.append("access_key",S.web3formsKey);
        fd.append("subject","New wedding invite lead — "+(d.name||""));
        fd.append("from_name","The Invyte Co. Website");
        fd.append("Name",d.name||"");fd.append("WhatsApp",d.phone||"");fd.append("Email",d.email||"");
        fd.append("Wedding date",d.date||"");fd.append("Plan",d.plan||"");
        fetch("https://api.web3forms.com/submit",{method:"POST",body:fd}).catch(function(){});
      }catch(x){}
    }
    $("#orderThanks").hidden=false;burst();
    setTimeout(function(){window.open(waLink(msg),"_blank");},500);e.target.reset();
  });

  observe();

  function burst(){var col=["#b8893f","#6a0f1c","#0e5a5e","#b3294e","#e3c483"];for(var i=0;i<70;i++){(function(k){var x=document.createElement("div");x.style.cssText="position:fixed;z-index:999;width:8px;height:13px;top:-20px;pointer-events:none;left:"+Math.random()*100+"vw;background:"+col[k%5]+";border-radius:2px";document.body.appendChild(x);x.animate([{transform:"translateY(0) rotate(0)"},{transform:"translateY(106vh) rotate("+(720*(Math.random()>.5?1:-1))+"deg)"}],{duration:2400+Math.random()*1200,easing:"cubic-bezier(.2,.6,.3,1)"}).onfinish=function(){x.remove();};})(i);}}
})();
