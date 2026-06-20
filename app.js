/* ============================================================
   The Invyte Co. — Guest Site Engine
   ============================================================ */
(function () {
  const cfg = Store.get();
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const params = new URLSearchParams(location.search);

  /* ---------- Template preset (?template=royal-gold) ---------- */
  const presetId = params.get("template");
  if (presetId && window.TEMPLATES && window.TEMPLATES[presetId]) {
    const p = window.TEMPLATES[presetId];
    if (p.theme) cfg.theme = Object.assign({}, cfg.theme, p.theme);
    if (p.meta) cfg.meta = Object.assign({}, cfg.meta, p.meta);
    // only apply the template's cover if the user hasn't set a custom one
    if (p.cover && cfg.couple.coverImage === DEFAULT_CONFIG.couple.coverImage) cfg.couple.coverImage = p.cover;
    cfg.meta.template = p.name;
    document.title = `${cfg.couple.groom} & ${cfg.couple.bride} — ${p.name} | The Invyte Co.`;
  }

  const initials = `${cfg.couple.groom[0]}&${cfg.couple.bride[0]}`;

  /* ---------- Apply theme tokens & colors ---------- */
  function applyTheme() {
    const t = cfg.theme;
    const r = document.documentElement.style;
    r.setProperty("--gold", t.primary);
    r.setProperty("--bronze", t.accent);
    r.setProperty("--bg", cfg.meta.theme === "dark" ? t.bgDark : t.bgLight);
    r.setProperty("--f-head", t.fontHeading);
    r.setProperty("--f-body", t.fontBody);
    document.body.setAttribute("data-theme", cfg.meta.theme);
    document.documentElement.lang = cfg.meta.locale;
  }
  applyTheme();

  /* ---------- i18n (light touch) ---------- */
  const I18N = {
    en: { open: "Open Invitation", save: "⤓ Save the Date", rsvp: "Send RSVP", live: "Join the Live Stream" },
    hi: { open: "निमंत्रण खोलें", save: "⤓ तारीख सहेजें", rsvp: "उत्तर भेजें", live: "लाइव देखें" },
  };
  const t = (k) => (I18N[cfg.meta.locale] || I18N.en)[k] || I18N.en[k];

  /* ---------- Loader ---------- */
  $("#loaderInitials").textContent = initials;
  window.addEventListener("load", () =>
    setTimeout(() => $("#loader").classList.add("done"), 700)
  );

  /* ---------- Envelope ---------- */
  $("#envNames").innerHTML = `${cfg.couple.groom} &amp; ${cfg.couple.bride}`;
  $("#sealInitials").textContent = initials;
  const envelope = $("#envelope");
  let opened = false;
  function openEnvelope() {
    if (opened) return;
    opened = true;
    envelope.classList.add("open");
    playSound();
    setTimeout(() => {
      $("#envelopeStage").classList.add("gone");
      $("#site").classList.remove("hidden");
      revealInit();
      if (cfg.meta.soundOn) startMusic();
    }, 1700);
  }
  envelope.addEventListener("click", openEnvelope);

  /* ---------- Build nav ---------- */
  const navMap = [
    ["story", "Story"], ["timeline", "Journey"], ["family", "Family"],
    ["events", "Events"], ["countdown", "Countdown"], ["gallery", "Gallery"],
    ["rsvp", "RSVP"], ["wishes", "Wishes"], ["gift", "Shagun"], ["contact", "Contact"],
  ];
  $("#navLinks").innerHTML = navMap
    .filter(([k]) => cfg.sections[k] !== false)
    .map(([k, label]) => `<li><a href="#${k}">${label}</a></li>`)
    .join("");
  $("#navLogo").innerHTML = `${cfg.couple.groom[0]} &amp; ${cfg.couple.bride[0]}`;
  $("#navToggle").onclick = () => $("#navLinks").classList.toggle("open");
  $$("#navLinks a").forEach((a) =>
    (a.onclick = () => $("#navLinks").classList.remove("open"))
  );
  addEventListener("scroll", () =>
    $("#nav").classList.toggle("scrolled", scrollY > 40)
  );

  /* ---------- Hide disabled sections ---------- */
  $$("[data-section]").forEach((sec) => {
    if (cfg.sections[sec.dataset.section] === false) sec.style.display = "none";
  });

  /* ---------- Hero ---------- */
  $("#heroNames").innerHTML = `${cfg.couple.groom} &amp; ${cfg.couple.bride}`;
  $("#heroTagline").textContent = cfg.couple.tagline;
  $("#heroHashtag").textContent = cfg.couple.hashtag;
  $("#heroBg").style.backgroundImage = `url('${cfg.couple.coverImage}')`;
  $("#openInviteBtn").textContent = t("open");
  const wd = new Date(cfg.couple.weddingDate);
  $("#heroDate").textContent = wd.toLocaleDateString(undefined, {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  /* ---------- Personalized welcome ---------- */
  const guest = params.get("guest");
  if (guest) {
    const rib = $("#welcomeRibbon");
    rib.hidden = false;
    rib.textContent = cfg.welcomeMessageTemplate.replace("{guest}", guest);
  }

  /* ---------- Story ---------- */
  $("#storyGroomImg").src = cfg.couple.groomImage;
  $("#storyBrideImg").src = cfg.couple.brideImage;
  $("#groomName").textContent = cfg.couple.groom;
  $("#brideName").textContent = cfg.couple.bride;
  $("#storyHow").textContent = cfg.story.how;
  $("#proposalText").textContent = cfg.story.proposal;

  /* ---------- Timeline ---------- */
  $("#timeline-list").innerHTML = cfg.timeline
    .map(
      (i) => `<div class="tl-item reveal">
        <div class="tl-year">${i.year}</div>
        <div class="tl-title">${i.title}</div>
        <div class="tl-text">${i.text}</div></div>`
    )
    .join("");

  /* ---------- Family ---------- */
  const fam = (f) => `<h3>${f.label}</h3><p class="parents">${f.parents}</p>
    <ul>${f.members.map((m) => `<li>${m}</li>`).join("")}</ul>`;
  $("#groomFamily").innerHTML = fam(cfg.family.groomSide);
  $("#brideFamily").innerHTML = fam(cfg.family.brideSide);

  /* ---------- Bride / Groom side filter ---------- */
  let sideMode = 0; // 0 all, 1 groom, 2 bride
  $("#sideToggle").onclick = () => {
    sideMode = (sideMode + 1) % 3;
    const g = $("#groomFamily"), b = $("#brideFamily");
    g.style.opacity = sideMode === 2 ? ".25" : "1";
    b.style.opacity = sideMode === 1 ? ".25" : "1";
    $("#sideToggle").classList.toggle("active", sideMode !== 0);
    $("#sideToggle").title =
      ["Showing both sides", "Groom's side", "Bride's side"][sideMode];
  };

  /* ---------- Events ---------- */
  function fmt(d) {
    const x = new Date(d);
    return {
      date: x.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }),
      time: x.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
    };
  }
  function gcal(ev) {
    const s = new Date(ev.date);
    const e = new Date(s.getTime() + 3 * 3600 * 1000);
    const z = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `${cfg.couple.groom} & ${cfg.couple.bride} — ${ev.name}`
    )}&dates=${z(s)}/${z(e)}&location=${encodeURIComponent(ev.venue + ", " + ev.address)}`;
  }
  $("#events-grid").innerHTML = cfg.events
    .map((ev) => {
      const f = fmt(ev.date);
      return `<div class="event-card reveal">
        <div class="event-icon">${ev.icon}</div>
        <h3>${ev.name}</h3>
        <div class="event-meta">
          <span><b>📅 ${f.date}</b></span>
          <span>🕒 ${f.time}</span>
          <span>📍 ${ev.venue}</span>
          <span>${ev.address}</span>
        </div>
        <span class="event-tag">Dress code · ${ev.dressCode}</span>
        <div class="event-actions">
          <a class="mini-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.mapQuery)}">Map</a>
          <a class="mini-btn" target="_blank" rel="noopener" href="${gcal(ev)}">Add to Calendar</a>
        </div></div>`;
    })
    .join("");

  /* ---------- Countdown ---------- */
  function tick() {
    const diff = wd - new Date();
    const set = (id, v) => ($("#" + id).textContent = String(Math.max(0, v)).padStart(2, "0"));
    if (diff <= 0) { set("cd-days", 0); set("cd-hours", 0); set("cd-mins", 0); set("cd-secs", 0); return; }
    set("cd-days", Math.floor(diff / 86400000));
    set("cd-hours", Math.floor((diff / 3600000) % 24));
    set("cd-mins", Math.floor((diff / 60000) % 60));
    set("cd-secs", Math.floor((diff / 1000) % 60));
  }
  tick(); setInterval(tick, 1000);
  $("#saveDateBtn").textContent = t("save");
  $("#saveDateBtn").onclick = downloadICS;

  function downloadICS() {
    const ev = cfg.events.find((e) => e.id === "wedding") || cfg.events[0];
    const s = new Date(ev.date), e = new Date(s.getTime() + 3 * 3600000);
    const z = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT",
      `DTSTART:${z(s)}`, `DTEND:${z(e)}`,
      `SUMMARY:${cfg.couple.groom} & ${cfg.couple.bride} Wedding`,
      `LOCATION:${ev.venue}, ${ev.address}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url; a.download = "save-the-date.ics"; a.click();
    URL.revokeObjectURL(url);
  }

  /* ---------- Gallery + lightbox ---------- */
  $("#gallery-grid").innerHTML = cfg.gallery
    .map((src) => `<img loading="lazy" src="${src}" alt="Moment" />`)
    .join("");
  $("#gallery-grid").addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      $("#lightboxImg").src = e.target.src;
      $("#lightbox").hidden = false;
    }
  });
  $("#lightboxClose").onclick = () => ($("#lightbox").hidden = true);
  $("#lightbox").onclick = (e) => { if (e.target.id === "lightbox") $("#lightbox").hidden = true; };

  /* ---------- RSVP ---------- */
  $("#rsvpForm").querySelector("button").textContent = t("rsvp");
  $("#rsvpForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    Store.addRSVP(data);
    e.target.reset();
    $("#rsvpThanks").hidden = false;
    confetti();
  });

  /* ---------- Wishes ---------- */
  function renderWishes() {
    const w = Store.getWishes();
    $("#wishes-wall").innerHTML = w.length
      ? w.map((x) => `<div class="wish"><b>${esc(x.name)}</b><p>${esc(x.text)}</p></div>`).join("")
      : `<p style="text-align:center;color:var(--muted);width:100%">Be the first to leave a wish 💌</p>`;
  }
  function esc(s) { return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }
  $("#wishForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    Store.addWish(d); e.target.reset(); renderWishes();
  });
  renderWishes();

  /* ---------- Gift / UPI / QR ---------- */
  $("#giftNote").textContent = cfg.gift.note;
  $("#giftUpi").textContent = cfg.gift.upiId;
  $("#copyUpiBtn").onclick = () => {
    navigator.clipboard?.writeText(cfg.gift.upiId);
    $("#copyUpiBtn").textContent = "Copied ✓";
    setTimeout(() => ($("#copyUpiBtn").textContent = "Copy UPI ID"), 1500);
  };
  const upiUri = `upi://pay?pa=${encodeURIComponent(cfg.gift.upiId)}&pn=${encodeURIComponent(cfg.gift.payeeName)}&cu=INR`;
  if (window.QRCode) QRCode.toCanvas(makeCanvas("#giftQr"), upiUri, { width: 170, margin: 1 });

  function makeCanvas(sel) {
    const c = document.createElement("canvas");
    $(sel).appendChild(c);
    return c;
  }

  /* ---------- Live stream ---------- */
  $("#liveNote").textContent = cfg.liveStream.note;
  $("#liveBtn").href = cfg.liveStream.url;
  $("#liveBtn").textContent = t("live");

  /* ---------- Contact + WhatsApp ---------- */
  $("#groomPhone").textContent = cfg.contact.groomPhone;
  $("#groomPhone").href = "tel:" + cfg.contact.groomPhone.replace(/\s/g, "");
  $("#bridePhone").textContent = cfg.contact.bridePhone;
  $("#bridePhone").href = "tel:" + cfg.contact.bridePhone.replace(/\s/g, "");
  const shareText = `You're invited to ${cfg.couple.groom} & ${cfg.couple.bride}'s wedding! ${cfg.couple.hashtag} ${location.href}`;
  $("#waShare").href = "https://wa.me/?text=" + encodeURIComponent(shareText);

  /* ---------- Footer ---------- */
  $("#footerNames").innerHTML = `${cfg.couple.groom} &amp; ${cfg.couple.bride}`;
  $("#footerHash").textContent = cfg.couple.hashtag;

  /* ---------- Theme / lang toggles ---------- */
  $("#themeToggle").onclick = () => {
    cfg.meta.theme = cfg.meta.theme === "dark" ? "light" : "dark";
    Store.save(cfg); applyTheme();
    $("#themeToggle").textContent = cfg.meta.theme === "dark" ? "☀" : "☾";
  };
  $("#langToggle").onclick = () => {
    cfg.meta.locale = cfg.meta.locale === "hi" ? "en" : "hi";
    Store.save(cfg); location.reload();
  };

  /* ---------- Background music ---------- */
  const audio = $("#bgMusic");
  let musicReady = false;
  function startMusic() {
    if (!cfg.music.enabled || !cfg.music.url) return;
    if (!musicReady) { audio.src = cfg.music.url; musicReady = true; }
    audio.volume = 0.4;
    audio.play().then(() => $("#musicToggle").classList.add("active")).catch(() => {});
  }
  $("#musicToggle").onclick = () => {
    if (audio.paused) startMusic();
    else { audio.pause(); $("#musicToggle").classList.remove("active"); }
  };

  /* tiny click sound for envelope (WebAudio, no asset) */
  function playSound() {
    if (!cfg.meta.soundOn) return;
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      const o = ac.createOscillator(), g = ac.createGain();
      o.frequency.value = 660; o.type = "sine";
      o.connect(g); g.connect(ac.destination);
      g.gain.setValueAtTime(0.0001, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.2, ac.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.4);
      o.start(); o.stop(ac.currentTime + 0.4);
    } catch {}
  }

  /* ---------- Scroll reveal ---------- */
  function revealInit() {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    $$(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------- Parallax hero ---------- */
  addEventListener("scroll", () => {
    const y = scrollY;
    if (y < window.innerHeight) $("#heroBg").style.transform = `translateY(${y * 0.35}px) scale(1.08)`;
  }, { passive: true });

  /* ---------- Custom cursor ---------- */
  const dot = $("#cursorDot"), ring = $("#cursorRing");
  let rx = 0, ry = 0, mx = 0, my = 0;
  addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px"; dot.style.top = my + "px";
  });
  (function follow() {
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
    ring.style.left = rx + "px"; ring.style.top = ry + "px";
    requestAnimationFrame(follow);
  })();
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a,button,.event-card,img")) ring.classList.add("grow");
    else ring.classList.remove("grow");
  });

  /* ---------- Falling petals ---------- */
  const canvas = $("#petals"), ctx = canvas.getContext("2d");
  let petals = [];
  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); addEventListener("resize", resize);
  for (let i = 0; i < 28; i++) {
    petals.push({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      r: 6 + Math.random() * 8, s: 0.4 + Math.random() * 1, a: Math.random() * Math.PI,
      sw: 0.5 + Math.random(),
    });
  }
  function drawPetal(p) {
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
    ctx.fillStyle = "rgba(231,201,139,.55)";
    ctx.beginPath();
    ctx.ellipse(0, 0, p.r, p.r / 2, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.restore();
  }
  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach((p) => {
      p.y += p.s; p.x += Math.sin(p.a) * p.sw; p.a += 0.01;
      if (p.y > innerHeight + 20) { p.y = -20; p.x = Math.random() * innerWidth; }
      drawPetal(p);
    });
    requestAnimationFrame(animate);
  })();

  /* ---------- Confetti (RSVP success) ---------- */
  function confetti() {
    const colors = ["#b88a44", "#e7c98b", "#8a5a44", "#fff"];
    for (let i = 0; i < 80; i++) {
      const d = document.createElement("div");
      d.style.cssText = `position:fixed;z-index:9999;width:8px;height:12px;top:-20px;pointer-events:none;
        left:${Math.random() * 100}vw;background:${colors[i % 4]};opacity:.9;border-radius:2px;
        transform:rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(d);
      const fall = d.animate(
        [{ transform: `translateY(0) rotate(0)` }, { transform: `translateY(105vh) rotate(${720 * (Math.random() > .5 ? 1 : -1)}deg)` }],
        { duration: 2200 + Math.random() * 1200, easing: "cubic-bezier(.2,.6,.3,1)" }
      );
      fall.onfinish = () => d.remove();
    }
  }

  /* ---------- AI Wedding Assistant ---------- */
  const aiPanel = $("#aiPanel");
  $("#aiFab").onclick = () => { aiPanel.hidden = !aiPanel.hidden; if (!aiPanel.hidden && !$("#aiLog").children.length) botSay("Namaste! 🙏 Ask me about the venue, timing, dress code, parking, or gifts."); };
  $("#aiClose").onclick = () => (aiPanel.hidden = true);
  const chips = ["Venue?", "Time?", "Dress code?", "Parking?", "Gifts?", "Events?"];
  $("#aiChips").innerHTML = chips.map((c) => `<button>${c}</button>`).join("");
  $$("#aiChips button").forEach((b) => (b.onclick = () => ask(b.textContent)));
  $("#aiForm").addEventListener("submit", (e) => { e.preventDefault(); const v = $("#aiText").value.trim(); if (v) ask(v); $("#aiText").value = ""; });

  function userSay(t) { add("user", t); }
  function botSay(t) { add("bot", t); }
  function add(role, txt) {
    const d = document.createElement("div");
    d.className = "ai-msg " + role; d.textContent = txt;
    $("#aiLog").appendChild(d); $("#aiLog").scrollTop = $("#aiLog").scrollHeight;
  }
  function ask(q) {
    userSay(q);
    setTimeout(() => botSay(answer(q.toLowerCase())), 350);
  }
  function answer(q) {
    const w = cfg.events.find((e) => e.id === "wedding") || cfg.events[0];
    const f = fmt(w.date);
    if (/venue|where|location|address/.test(q)) return `The wedding is at ${w.venue}, ${w.address}. Tap "Map" on the Events section for directions.`;
    if (/time|when|date/.test(q)) return `The main wedding is on ${f.date} at ${f.time}. Check the Events section for all functions.`;
    if (/dress|wear|outfit/.test(q)) return `Dress code for the wedding is "${w.dressCode}". Each event has its own dress code listed.`;
    if (/park/.test(q)) return "Valet and complimentary parking are available at all venues. Look for The Invyte Co. signage.";
    if (/gift|shagun|money|registry/.test(q)) return `Your blessings are enough! For a digital shagun, use UPI: ${cfg.gift.upiId} (Shagun section).`;
    if (/event|function|haldi|mehendi|sangeet|recep/.test(q)) return `We have ${cfg.events.length} celebrations: ${cfg.events.map((e) => e.name).join(", ")}. See the Events section for details.`;
    if (/rsvp|confirm|attend/.test(q)) return "Please scroll to the RSVP section and fill in your details. We can't wait to celebrate with you!";
    if (/stream|live|online/.test(q)) return cfg.liveStream.enabled ? "Yes! Join us live from the 'Watch Live' section on the wedding day." : "The ceremony will be in person only.";
    return "I can help with venue, timing, dress code, parking, gifts, events, RSVP and live stream. What would you like to know?";
  }

  /* ---------- Image fallbacks: never show a broken box ---------- */
  function gradientFor(seed) {
    const palettes = [
      ["#c79a3e", "#7d2b22"], ["#c9a27e", "#b06a78"], ["#e7c98b", "#7b5cff"],
      ["#d98a8a", "#9c5560"], ["#3f8f86", "#27514c"], ["#caa14a", "#6e1f24"],
    ];
    let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    return palettes[h % palettes.length];
  }
  function placeholderSVG(label, seed) {
    const [a, b] = gradientFor(seed || label);
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='750'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs>
      <rect width='600' height='750' fill='url(#g)'/>
      <text x='50%' y='48%' font-family='Georgia,serif' font-size='120' fill='rgba(255,255,255,.85)' text-anchor='middle'>${label}</text>
      <text x='50%' y='60%' font-family='Arial' font-size='22' letter-spacing='4' fill='rgba(255,255,255,.6)' text-anchor='middle'>THE INVYTE CO.</text>
    </svg>`;
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }
  function guardImages() {
    $$("img").forEach((img) => {
      img.addEventListener("error", function () {
        if (this.dataset.fallback) return;
        this.dataset.fallback = "1";
        const seed = this.alt || this.src || "Invyte";
        const label = (this.alt && this.alt[0]) || "✦";
        this.src = placeholderSVG(label, seed);
      });
      // already-broken images (cached error)
      if (img.complete && img.naturalWidth === 0 && !img.dataset.fallback) {
        img.dispatchEvent(new Event("error"));
      }
    });
  }
  // Hero background: preload, fall back to a rich gradient if it fails
  (function guardHero() {
    const url = cfg.couple.coverImage;
    const [a, b] = gradientFor(url || initials);
    const fallback = `linear-gradient(135deg, ${a}, ${b})`;
    const test = new Image();
    test.onerror = () => { $("#heroBg").style.background = fallback; $("#heroBg").style.backgroundSize = "cover"; };
    test.onload = () => { if (test.naturalWidth === 0) test.onerror(); };
    test.src = url;
    // base color behind the photo regardless
    $("#heroBg").style.backgroundColor = a;
  })();
  guardImages();
  // re-guard gallery (built dynamically above) — already covered by guardImages since it ran after

  /* ---------- Auto-open envelope if no envelope desired (?skip=1) ---------- */
  if (params.get("skip") === "1") openEnvelope();
})();
