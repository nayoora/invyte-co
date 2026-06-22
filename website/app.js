/* ============================================================
   The Invyte Co. — Shared engine (works across all pages)
   Renders only the sections present on the current page.
   ============================================================ */
(function(){
  var S=window.SITE;
  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var esc=function(s){return String(s==null?"":s).replace(/[<>&]/g,function(c){return{"<":"&lt;",">":"&gt;","&":"&amp;"}[c]})};
  var waBase="https://wa.me/"+S.whatsapp;
  function waLink(msg){return waBase+"?text="+encodeURIComponent(msg||"Hi! I'd like to know more about your wedding invitations.");}
  function set(id,html){var el=$("#"+id); if(el) el.innerHTML=html;}

  /* reveal observer */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12});
  function observe(){ $$(".rv:not(.in)").forEach(function(el){io.observe(el);}); }

  window.addEventListener("load",function(){var l=$("#loader"); if(l) setTimeout(function(){l.classList.add("done");},400);});
  var yr=$("#yr"); if(yr) yr.textContent=new Date().getFullYear();

  /* nav + progress */
  addEventListener("scroll",function(){var n=$("#nav"); if(n) n.classList.toggle("solid",scrollY>30); var p=$("#progress"); if(p){var h=document.documentElement;p.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%";}},{passive:true});
  var burger=$("#burger"); if(burger) burger.onclick=function(){$("#nlinks").classList.toggle("open");};
  $$("#nlinks a").forEach(function(a){a.onclick=function(){var nl=$("#nlinks"); if(nl) nl.classList.remove("open");};});

  /* whatsapp + demo links */
  $$("[data-wa]").forEach(function(el){el.href=waLink(el.getAttribute("data-wa"));});
  var fab=$("#waFab"); if(fab) fab.href=waLink("Hi! I'd like to order a wedding invitation.");
  var liveTemplates=S.templates.filter(function(t){return t.file;});
  var firstFile=liveTemplates[0]?liveTemplates[0].file:"";
  var hd=$("#heroDemo"); if(hd) hd.href=firstFile;
  var fd=$("#footDemo"); if(fd) fd.href=firstFile;

  /* trust */
  if($("#trustRow")&&S.trust){
    var TIC='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2l2.4 5 5.6.6-4 4 1 5.4L12 19l-5 3 1-5.4-4-4 5.6-.6z"/></svg>';
    set("trustRow",S.trust.map(function(x){return '<div class="trust-item rv"><span class="ti-ic">'+TIC+'</span><div><b>'+esc(x.t)+'</b><small>'+esc(x.d)+'</small></div></div>';}).join(""));
  }

  /* moodboard */
  if($("#moodTrack")&&S.gallery){
    set("moodTrack",S.gallery.concat(S.gallery).map(function(u){return '<div class="mood-card"><img src="'+u+'" alt="Indian wedding moment" loading="lazy" onerror="this.parentNode.remove()"></div>';}).join(""));
  }

  /* mini fallback cover */
  function miniCover(t){
    var c1=t.palette[0],c2=t.palette[1],c3=t.palette[2]||"#cda24e";
    var base='style="--c1:'+c1+';--c2:'+c2+'"';
    var dots='<div class="dots"><i style="background:'+c1+'"></i><i style="background:'+c2+'"></i><i style="background:'+c3+'"></i></div>';
    var st=t.style||"royal";
    if(st==="modern") return '<div class="mini modern" '+base+'><div class="topbar"></div><div class="ov">The Wedding Of</div><div class="nm" style="color:#fff">Aarav<br>Diya</div><div class="ln" style="background:'+c3+'"></div><div class="dt">12 . 12 . 2026</div>'+dots+'</div>';
    if(st==="arch") return '<div class="mini arch" '+base+'><div class="topbar"></div><div class="archframe" style="background:linear-gradient(155deg,'+c1+','+c2+')"><span>A&amp;D</span></div><div class="nm" style="color:#fff">Aarav <em>&amp;</em> Diya</div><div class="dt">12 · 12 · 2026</div>'+dots+'</div>';
    if(st==="floral") return '<div class="mini floral" '+base+'><div class="topbar"></div><div class="scr">Save the Date</div><div class="fdiv" style="color:'+c3+'">&#10047;</div><div class="nm" style="color:#fff">Aarav &amp; Diya</div><div class="dt">12 · 12 · 2026</div>'+dots+'</div>';
    return '<div class="mini royal" '+base+'><div class="topbar"></div><svg class="om" style="color:'+c3+'"><use href="#om"/></svg><div class="pre dev">सादर आमंत्रण</div><div class="nm">Aarav <em>&amp;</em> Diya</div><div class="dt">12 · 12 · 2026</div><div class="std">'+esc(t.tagline)+'</div>'+dots+'</div>';
  }

  /* templates + filter */
  if($("#tplGrid")){
    var TIERS=["All","Basic","Premium","Luxury"];
    var renderTemplates=function(tier){
      var list=(!tier||tier==="All")?S.templates:S.templates.filter(function(t){return t.tier===tier;});
      set("tplGrid",list.map(function(t){
        var live=t.file?('<a class="btn gold sm" target="_blank" rel="noopener" href="'+t.file+'">Live Demo</a>'):'';
        var order=t.file?('<a class="btn ghost-light sm" target="_blank" rel="noopener" href="'+waLink("Hi! I'm interested in the \""+t.name+"\" design ("+t.tier+"). Please share details.")+'">Order</a>'):('<span class="soon">On request</span>');
        var ov=t.file?'<div class="overlay"><a class="btn gold sm" target="_blank" rel="noopener" href="'+t.file+'">Open Demo ↗</a></div>':'<div class="overlay"><span class="soon-ov">On request</span></div>';
        var photo=t.img?'<img class="tpl-img" src="'+t.img+'" alt="'+esc(t.name)+' — Indian wedding invitation" loading="lazy" onerror="this.remove()">':'';
        return '<article class="tpl rv"><div class="thumb"><span class="badge">'+esc(t.tier)+'</span><div class="ph">'+miniCover(t)+photo+ov+'</div></div>'
          +'<div class="body"><div class="row"><h3>'+esc(t.name)+'</h3>'+(t.tag?'<span class="tier">'+esc(t.tag)+'</span>':'')+'</div><p>'+esc(t.desc)+'</p><div class="actions">'+live+order+'</div></div></article>';
      }).join(""));
      observe();
    };
    if($("#filters")){
      set("filters",TIERS.map(function(t,i){return '<button class="chip '+(i===0?'active':'')+'" data-tier="'+t+'">'+t+'</button>';}).join(""));
      $$("#filters .chip").forEach(function(b){b.onclick=function(){$$("#filters .chip").forEach(function(x){x.classList.remove("active");});b.classList.add("active");renderTemplates(b.dataset.tier);};});
    }
    renderTemplates("All");
  }

  /* features */
  if($("#featGrid")){
    var FIC={scratch:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="14" width="32" height="20" rx="3"/><path d="M14 24l8 4 10-8"/></svg>',ganesh:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="9"/></svg>',rsvp:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="12" width="32" height="24" rx="3"/><path d="M8 16l16 10 16-10"/></svg>',events:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="11" width="30" height="28" rx="3"/><path d="M9 19h30M17 7v8M31 7v8"/></svg>',countdown:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="26" r="14"/><path d="M24 26V18M24 26l6 4M18 7h12"/></svg>',music:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 33V13l17-4v20"/><circle cx="14" cy="33" r="4"/><circle cx="31" cy="29" r="4"/></svg>',mobile:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="15" y="6" width="18" height="36" rx="4"/><path d="M22 36h4"/></svg>',edit:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M30 10l8 8-20 20-9 1 1-9z"/><path d="M27 13l8 8"/></svg>'};
    set("featGrid",S.features.map(function(f){return '<div class="feat rv"><div class="ic">'+(FIC[f.i]||'')+'</div><h3>'+esc(f.t)+'</h3><p>'+esc(f.d)+'</p></div>';}).join(""));
  }

  /* steps */
  if($("#steps")) set("steps",S.steps.map(function(s){return '<div class="step rv"><div class="n">'+s.n+'</div><h3>'+esc(s.t)+'</h3><p>'+esc(s.d)+'</p></div>';}).join(""));

  /* pricing */
  if($("#priceGrid")){
    set("priceGrid",S.pricing.map(function(p){return '<div class="price rv'+(p.popular?' popular':'')+'">'+(p.popular?'<span class="pop">Most loved</span>':'')+'<h3>'+esc(p.name)+'</h3><div class="amt"><small>₹</small>'+esc(p.price)+'</div><ul>'+p.perks.map(function(x){return '<li>'+esc(x)+'</li>';}).join("")+'</ul><a class="btn '+(p.popular?'gold':'ghost-light')+'" target="_blank" rel="noopener" href="'+waLink("Hi! I'd like the "+p.name+" plan (₹"+p.price+"). Please help me get started.")+'">Choose '+esc(p.name)+'</a></div>';}).join(""));
  }
  if($("#addonRow")) set("addonRow",S.addons.map(function(a){return '<div class="addon"><span class="t">'+esc(a.t)+'</span>'+(a.d?'<span class="d">'+esc(a.d)+'</span>':'')+'<b>+ ₹'+esc(a.p)+'</b></div>';}).join(""));

  /* testimonials */
  if($("#testiGrid")) set("testiGrid",S.testimonials.map(function(t){var ini=(t.n||"?").trim()[0];return '<div class="testi rv"><div class="stars">★★★★★</div><p class="q">“'+esc(t.q)+'”</p><div class="who-row"><span class="avatar">'+esc(ini)+'</span><p class="who"><b>'+esc(t.n)+'</b><br>'+esc(t.r)+'</p></div></div>';}).join(""));

  /* faq + schema */
  if($("#faqList")){
    set("faqList",S.faqs.map(function(f){return '<div class="faq-item"><button class="faq-q">'+esc(f.q)+'<span class="plus">+</span></button><div class="faq-a"><p>'+esc(f.a)+'</p></div></div>';}).join(""));
    $$(".faq-q").forEach(function(q){q.onclick=function(){q.parentElement.classList.toggle("open");};});
    var ld=document.createElement("script");ld.type="application/ld+json";
    ld.textContent=JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:S.faqs.map(function(f){return{"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}};})});
    document.head.appendChild(ld);
  }

  /* order */
  var em=$("#emailBtn"); if(em) em.href="mailto:"+S.email+"?subject="+encodeURIComponent("Wedding invitation enquiry")+"&body="+encodeURIComponent("Hi, I'd like to order a wedding invitation. My wedding date is: ");
  var ig=$("#instaBtn"); if(ig) ig.href=S.instagram;
  var form=$("#orderForm");
  if(form) form.addEventListener("submit",function(e){
    e.preventDefault();var d=Object.fromEntries(new FormData(e.target));
    var msg="Namaste! I'd like to order a wedding invitation.\nName: "+d.name+"\nWhatsApp: "+d.phone+(d.email?"\nEmail: "+d.email:"")+"\nWedding date: "+d.date+"\nPlan: "+(d.plan||"-");
    if(S.web3formsKey){try{var fd2=new FormData();fd2.append("access_key",S.web3formsKey);fd2.append("subject","New wedding invite lead — "+(d.name||""));fd2.append("Name",d.name||"");fd2.append("WhatsApp",d.phone||"");fd2.append("Email",d.email||"");fd2.append("Wedding date",d.date||"");fd2.append("Plan",d.plan||"");fetch("https://api.web3forms.com/submit",{method:"POST",body:fd2}).catch(function(){});}catch(x){}}
    var th=$("#orderThanks"); if(th) th.hidden=false; burst();
    setTimeout(function(){window.open(waLink(msg),"_blank");},500);e.target.reset();
  });

  observe();

  /* luxury custom cursor + magnetic buttons (desktop only) */
  (function(){
    if(!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    if(matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    var dot=document.createElement("div"),ring=document.createElement("div");
    dot.className="cur-dot";ring.className="cur-ring";document.body.appendChild(dot);document.body.appendChild(ring);
    var mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
    addEventListener("mousemove",function(e){mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px";},{passive:true});
    addEventListener("mouseleave",function(){dot.classList.add("hide");ring.classList.add("hide");});
    addEventListener("mouseenter",function(){dot.classList.remove("hide");ring.classList.remove("hide");});
    (function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.left=rx+"px";ring.style.top=ry+"px";requestAnimationFrame(loop);})();
    var hot="a,button,.tpl,.chip,.faq-q,input,select,.price,.addon";
    document.addEventListener("mouseover",function(e){if(e.target.closest(hot))ring.classList.add("hot");});
    document.addEventListener("mouseout",function(e){if(e.target.closest(hot))ring.classList.remove("hot");});
    /* magnetic pull on primary buttons */
    $$(".btn.gold,.btn.glass").forEach(function(b){
      b.addEventListener("mousemove",function(e){var r=b.getBoundingClientRect();b.style.transform="translate("+((e.clientX-r.left-r.width/2)*.22)+"px,"+((e.clientY-r.top-r.height/2)*.32)+"px)";});
      b.addEventListener("mouseleave",function(){b.style.transform="";});
    });
  })();

  (function(){
    var cv=$("#heroParticles"); if(!cv) return;
    if(matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    var ctx=cv.getContext("2d"),W,H,parts=[],raf;
    function size(){var r=cv.parentNode.getBoundingClientRect();W=cv.width=r.width;H=cv.height=r.height;}
    function mk(){
      var petal=Math.random()<.22;
      return{x:Math.random()*W,y:Math.random()*H,r:petal?(7+Math.random()*7):(.6+Math.random()*1.8),
        vy:petal?(.25+Math.random()*.5):(.12+Math.random()*.4),vx:(Math.random()-.5)*.4,
        a:.25+Math.random()*.55,sp:(Math.random()-.5)*.04,rot:Math.random()*6.28,petal:petal};
    }
    function init(){parts=[];var n=Math.min(70,Math.round(W/14));for(var i=0;i<n;i++)parts.push(mk());}
    function draw(){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<parts.length;i++){var p=parts[i];p.y+=p.vy;p.x+=p.vx;p.rot+=p.sp;
        if(p.y-p.r>H){p.y=-p.r;p.x=Math.random()*W;}
        ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.globalAlpha=p.a;
        if(p.petal){ctx.fillStyle="#e0922f";ctx.beginPath();ctx.ellipse(0,0,p.r*.6,p.r,0,0,6.28);ctx.fill();
          ctx.fillStyle="#f6b24a";ctx.beginPath();ctx.ellipse(0,-p.r*.2,p.r*.34,p.r*.6,0,0,6.28);ctx.fill();}
        else{ctx.fillStyle="#f0d49a";ctx.beginPath();ctx.arc(0,0,p.r,0,6.28);ctx.fill();
          ctx.shadowColor="#cda24e";ctx.shadowBlur=6;ctx.fill();}
        ctx.restore();
      }
      raf=requestAnimationFrame(draw);
    }
    size();init();draw();
    addEventListener("resize",function(){cancelAnimationFrame(raf);size();init();draw();},{passive:true});
  })();
  function burst(){var col=["#cda24e","#7a1228","#2a8f86","#c2415c","#f0d49a"];for(var i=0;i<70;i++){(function(k){var x=document.createElement("div");x.style.cssText="position:fixed;z-index:999;width:8px;height:13px;top:-20px;pointer-events:none;left:"+Math.random()*100+"vw;background:"+col[k%5]+";border-radius:2px";document.body.appendChild(x);x.animate([{transform:"translateY(0) rotate(0)"},{transform:"translateY(106vh) rotate("+(720*(Math.random()>.5?1:-1))+"deg)"}],{duration:2400+Math.random()*1200,easing:"cubic-bezier(.2,.6,.3,1)"}).onfinish=function(){x.remove();};})(i);}}
})();
