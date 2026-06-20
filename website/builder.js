/* ============================================================
   The Invyte Co. — Self-Service Builder Wizard
   Reuses the shared config Store + template presets.
   ============================================================ */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));

  let cfg = Store.get();
  let step = 0;
  let chosen = "royal-gold";

  /* ---------- Step 1: template picker ---------- */
  $("#tplPick").innerHTML = SITE.templates
    .map((t) => `<div class="pick ${t.id === chosen ? "sel" : ""}" data-id="${t.id}">
      <span class="check">✓</span><img src="${t.img}" alt="${esc(t.name)}" loading="lazy" /><span>${esc(t.name)}</span></div>`)
    .join("");
  $$(".pick").forEach((p) =>
    (p.onclick = () => {
      $$(".pick").forEach((x) => x.classList.remove("sel"));
      p.classList.add("sel");
      chosen = p.dataset.id;
      applyPreset();
      refreshPreview();
    })
  );

  function applyPreset() {
    const preset = TEMPLATES[chosen];
    if (!preset) return;
    if (preset.theme) cfg.theme = Object.assign({}, cfg.theme, preset.theme);
    if (preset.meta) cfg.meta = Object.assign({}, cfg.meta, preset.meta);
    if (preset.cover && !$("#b_cover").value) cfg.couple.coverImage = preset.cover;
    cfg.meta.template = preset.name;
  }

  /* ---------- Prefill step 2 ---------- */
  const toLocal = (iso) => { const d = new Date(iso), p = (n) => String(n).padStart(2, "0"); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`; };
  $("#b_groom").value = cfg.couple.groom;
  $("#b_bride").value = cfg.couple.bride;
  $("#b_tagline").value = cfg.couple.tagline;
  $("#b_hashtag").value = cfg.couple.hashtag;
  $("#b_date").value = toLocal(cfg.couple.weddingDate);

  ["b_groom", "b_bride", "b_tagline", "b_hashtag", "b_date", "b_cover"].forEach((id) =>
    ($("#" + id).oninput = collectAndPreview)
  );

  function collectAndPreview() {
    cfg.couple.groom = $("#b_groom").value.trim() || "Groom";
    cfg.couple.bride = $("#b_bride").value.trim() || "Bride";
    cfg.couple.tagline = $("#b_tagline").value;
    cfg.couple.hashtag = $("#b_hashtag").value;
    if ($("#b_date").value) cfg.couple.weddingDate = new Date($("#b_date").value).toISOString();
    if ($("#b_cover").value.trim()) cfg.couple.coverImage = $("#b_cover").value.trim();
    refreshPreview();
  }

  /* ---------- Step 3: events ---------- */
  function renderEvents() {
    $("#evMiniList").innerHTML = cfg.events
      .map(
        (e, i) => `<div class="ev-mini"><div class="grid2">
          <div class="fld" style="margin:0"><label>Name</label><input data-ev="${i}" data-k="name" value="${esc(e.name)}"></div>
          <div class="fld" style="margin:0"><label>Date & time</label><input type="datetime-local" data-ev="${i}" data-k="date" value="${toLocal(e.date)}"></div>
          <div class="fld" style="margin:0"><label>Venue</label><input data-ev="${i}" data-k="venue" value="${esc(e.venue)}"></div>
          <div class="fld" style="margin:0"><label>Dress code</label><input data-ev="${i}" data-k="dressCode" value="${esc(e.dressCode)}"></div>
        </div><button class="btn-pill ghost" data-del="${i}" style="margin-top:8px;padding:7px 16px">Remove</button></div>`
      )
      .join("");
    $$("[data-ev]").forEach((inp) => (inp.oninput = () => {
      const i = +inp.getAttribute("data-ev");
      cfg.events[i][inp.dataset.k] = inp.dataset.k === "date" ? new Date(inp.value).toISOString() : inp.value;
      refreshPreview();
    }));
    $$("[data-del]").forEach((b) => (b.onclick = () => { cfg.events.splice(+b.getAttribute("data-del"), 1); renderEvents(); refreshPreview(); }));
  }
  $("#addEvBtn").onclick = () => {
    cfg.events.push({ id: "ev" + Date.now(), name: "New Event", icon: "✨", date: cfg.couple.weddingDate, venue: "", address: "", dressCode: "", mapQuery: "" });
    renderEvents(); refreshPreview();
  };
  renderEvents();

  /* ---------- Preview (saves to Store so iframe reads it) ---------- */
  let saveTimer;
  function refreshPreview() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      Store.save(cfg);
      const f = $("#pvFrame");
      f.src = `../index.html?template=${chosen}&skip=1&t=${Date.now()}`;
    }, 250);
  }
  applyPreset();
  refreshPreview();

  /* ---------- Step navigation ---------- */
  function go(n) {
    step = Math.max(0, Math.min(3, n));
    $$(".wz").forEach((w) => w.classList.toggle("active", +w.dataset.step === step));
    $$(".sbar").forEach((b) => {
      const s = +b.dataset.s;
      b.classList.toggle("active", s === step);
      b.classList.toggle("done", s < step);
    });
    if (step === 3) buildPublish();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  $$("[data-next]").forEach((b) => (b.onclick = () => { collectAndPreview(); go(step + 1); }));
  $$("[data-prev]").forEach((b) => (b.onclick = () => go(step - 1)));
  $$(".sbar").forEach((b) => (b.onclick = () => go(+b.dataset.s)));

  /* ---------- Step 4: publish ---------- */
  function buildPublish() {
    Store.save(cfg);
    const url = new URL("../index.html", location.href).href + `?template=${chosen}`;
    $("#pubNames").textContent = `${cfg.couple.groom} & ${cfg.couple.bride}`;
    const d = new Date(cfg.couple.weddingDate);
    $("#pubMeta").textContent = `${cfg.meta.template} · ${d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}`;
    $("#pubLink").value = url;
    $("#openInvite").href = url;
    const msg = `You're invited to ${cfg.couple.groom} & ${cfg.couple.bride}'s wedding! ${cfg.couple.hashtag} ${url}`;
    $("#waSend").href = "https://wa.me/?text=" + encodeURIComponent(msg);
  }
  $("#copyLink").onclick = () => {
    navigator.clipboard?.writeText($("#pubLink").value);
    $("#copyLink").textContent = "Copied ✓";
    setTimeout(() => ($("#copyLink").textContent = "Copy"), 1500);
  };
})();
