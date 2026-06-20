/* ============================================================
   The Invyte Co. — Admin Studio
   ============================================================ */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  let cfg = Store.get();

  /* ---------- Tabs ---------- */
  $$("#tabs button").forEach((b) =>
    (b.onclick = () => {
      $$("#tabs button").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      $$(".tab").forEach((t) => t.classList.remove("active"));
      $(`[data-pane="${b.dataset.tab}"]`).classList.add("active");
      $("#pageTitle").textContent = b.textContent;
      if (b.dataset.tab === "rsvp") renderRSVP();
    })
  );

  /* ---------- Helpers ---------- */
  const toLocalInput = (iso) => {
    const d = new Date(iso);
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
  };

  /* ---------- Populate form ---------- */
  function fill() {
    $("#c_groom").value = cfg.couple.groom;
    $("#c_bride").value = cfg.couple.bride;
    $("#c_tagline").value = cfg.couple.tagline;
    $("#c_hashtag").value = cfg.couple.hashtag;
    $("#c_date").value = toLocalInput(cfg.couple.weddingDate);
    $("#c_cover").value = cfg.couple.coverImage;
    $("#c_groomImg").value = cfg.couple.groomImage;
    $("#c_brideImg").value = cfg.couple.brideImage;
    $("#c_welcome").value = cfg.welcomeMessageTemplate;

    $("#s_how").value = cfg.story.how;
    $("#s_proposal").value = cfg.story.proposal;
    renderTimeline();

    $("#f_gParents").value = cfg.family.groomSide.parents;
    $("#f_gMembers").value = cfg.family.groomSide.members.join("\n");
    $("#f_bParents").value = cfg.family.brideSide.parents;
    $("#f_bMembers").value = cfg.family.brideSide.members.join("\n");

    renderEvents();
    $("#g_list").value = cfg.gallery.join("\n");

    $("#gf_upi").value = cfg.gift.upiId;
    $("#gf_payee").value = cfg.gift.payeeName;
    $("#gf_note").value = cfg.gift.note;
    $("#lv_url").value = cfg.liveStream.url;
    $("#lv_note").value = cfg.liveStream.note;
    $("#ct_groom").value = cfg.contact.groomPhone;
    $("#ct_bride").value = cfg.contact.bridePhone;
    $("#mu_url").value = cfg.music.url;

    $("#d_primary").value = cfg.theme.primary;
    $("#d_primaryHex").value = cfg.theme.primary;
    $("#d_accent").value = cfg.theme.accent;
    $("#d_accentHex").value = cfg.theme.accent;
    $("#d_fhead").value = cfg.theme.fontHeading;
    $("#d_fbody").value = cfg.theme.fontBody;
    $("#d_theme").value = cfg.meta.theme;
    $("#d_locale").value = cfg.meta.locale;
    $("#d_template").value = cfg.meta.template;
    $("#d_sound").value = String(cfg.meta.soundOn);

    renderSectionToggles();
    $("#qr_url").value = location.href.replace(/admin\.html.*$/, "index.html");
  }

  /* color sync */
  $("#d_primary").oninput = (e) => ($("#d_primaryHex").value = e.target.value);
  $("#d_primaryHex").oninput = (e) => ($("#d_primary").value = e.target.value);
  $("#d_accent").oninput = (e) => ($("#d_accentHex").value = e.target.value);
  $("#d_accentHex").oninput = (e) => ($("#d_accent").value = e.target.value);

  /* ---------- Timeline editor ---------- */
  function renderTimeline() {
    $("#tlList").innerHTML = cfg.timeline
      .map(
        (i, x) => `<div class="tl-row"><div class="grid" style="grid-template-columns:120px 1fr">
        <div><label>Year</label><input data-tl="${x}" data-k="year" value="${esc(i.year)}"></div>
        <div><label>Title</label><input data-tl="${x}" data-k="title" value="${esc(i.title)}"></div>
        <div class="full"><label>Text</label><input data-tl="${x}" data-k="text" value="${esc(i.text)}"></div>
        </div><button class="btn danger" data-del-tl="${x}" style="margin-top:8px">Remove</button></div>`
      )
      .join("");
    bindRepeater("#tlList", "tl", cfg.timeline, "del-tl");
  }
  $("#addTl").onclick = () => { cfg.timeline.push({ year: "", title: "", text: "" }); renderTimeline(); };

  /* ---------- Events editor ---------- */
  function renderEvents() {
    $("#evList").innerHTML = cfg.events
      .map(
        (e, x) => `<div class="event-row">
        <div class="grid">
          <div><label>Name</label><input data-ev="${x}" data-k="name" value="${esc(e.name)}"></div>
          <div><label>Icon (emoji)</label><input data-ev="${x}" data-k="icon" value="${esc(e.icon)}"></div>
          <div><label>Date & Time</label><input type="datetime-local" data-ev="${x}" data-k="date" value="${toLocalInput(e.date)}"></div>
          <div><label>Venue</label><input data-ev="${x}" data-k="venue" value="${esc(e.venue)}"></div>
          <div><label>Address</label><input data-ev="${x}" data-k="address" value="${esc(e.address)}"></div>
          <div><label>Dress Code</label><input data-ev="${x}" data-k="dressCode" value="${esc(e.dressCode)}"></div>
          <div class="full"><label>Map search query</label><input data-ev="${x}" data-k="mapQuery" value="${esc(e.mapQuery)}"></div>
        </div>
        <button class="btn danger" data-del-ev="${x}" style="margin-top:8px">Remove event</button></div>`
      )
      .join("");
    bindRepeater("#evList", "ev", cfg.events, "del-ev");
  }
  $("#addEv").onclick = () => {
    cfg.events.push({ id: "event" + Date.now(), name: "New Event", icon: "✨",
      date: cfg.couple.weddingDate, venue: "", address: "", dressCode: "", mapQuery: "" });
    renderEvents();
  };

  function bindRepeater(container, attr, arr, delAttr) {
    $$(`[data-${attr}]`, $(container)).forEach((inp) => {
      inp.oninput = () => {
        const i = +inp.getAttribute(`data-${attr}`);
        let v = inp.value;
        if (inp.dataset.k === "date") v = new Date(v).toISOString();
        arr[i][inp.dataset.k] = v;
      };
    });
    $$(`[data-${delAttr}]`, $(container)).forEach((btn) => {
      btn.onclick = () => {
        arr.splice(+btn.getAttribute(`data-${delAttr}`), 1);
        attr === "tl" ? renderTimeline() : renderEvents();
      };
    });
  }

  /* ---------- Section toggles ---------- */
  function renderSectionToggles() {
    const labels = { story: "Couple Story", timeline: "Timeline", family: "Family",
      events: "Events", gallery: "Gallery", countdown: "Countdown", rsvp: "RSVP",
      wishes: "Guest Wishes", gift: "Digital Shagun", livestream: "Live Stream", contact: "Contact" };
    $("#secToggles").innerHTML = Object.keys(labels)
      .map((k) => `<div class="toggle"><span>${labels[k]}</span>
        <label class="switch"><input type="checkbox" data-sec="${k}" ${cfg.sections[k] !== false ? "checked" : ""}><span class="slider"></span></label></div>`)
      .join("");
    $$("[data-sec]").forEach((c) => (c.onchange = () => (cfg.sections[c.dataset.sec] = c.checked)));
  }

  /* ---------- Collect & save ---------- */
  function collect() {
    cfg.couple.groom = $("#c_groom").value.trim() || "Groom";
    cfg.couple.bride = $("#c_bride").value.trim() || "Bride";
    cfg.couple.tagline = $("#c_tagline").value;
    cfg.couple.hashtag = $("#c_hashtag").value;
    if ($("#c_date").value) cfg.couple.weddingDate = new Date($("#c_date").value).toISOString();
    cfg.couple.coverImage = $("#c_cover").value;
    cfg.couple.groomImage = $("#c_groomImg").value;
    cfg.couple.brideImage = $("#c_brideImg").value;
    cfg.welcomeMessageTemplate = $("#c_welcome").value;

    cfg.story.how = $("#s_how").value;
    cfg.story.proposal = $("#s_proposal").value;

    cfg.family.groomSide.parents = $("#f_gParents").value;
    cfg.family.groomSide.members = lines($("#f_gMembers").value);
    cfg.family.brideSide.parents = $("#f_bParents").value;
    cfg.family.brideSide.members = lines($("#f_bMembers").value);

    cfg.gallery = lines($("#g_list").value);

    cfg.gift.upiId = $("#gf_upi").value;
    cfg.gift.payeeName = $("#gf_payee").value;
    cfg.gift.note = $("#gf_note").value;
    cfg.liveStream.url = $("#lv_url").value;
    cfg.liveStream.note = $("#lv_note").value;
    cfg.contact.groomPhone = $("#ct_groom").value;
    cfg.contact.bridePhone = $("#ct_bride").value;
    cfg.contact.whatsapp = $("#ct_groom").value.replace(/\D/g, "");
    cfg.music.url = $("#mu_url").value;

    cfg.theme.primary = $("#d_primaryHex").value || $("#d_primary").value;
    cfg.theme.accent = $("#d_accentHex").value || $("#d_accent").value;
    cfg.theme.fontHeading = $("#d_fhead").value;
    cfg.theme.fontBody = $("#d_fbody").value;
    cfg.meta.theme = $("#d_theme").value;
    cfg.meta.locale = $("#d_locale").value;
    cfg.meta.template = $("#d_template").value;
    cfg.meta.soundOn = $("#d_sound").value === "true";

    Store.save(cfg);
  }
  function save(msg) {
    collect();
    const s = $("#saveStatus");
    s.textContent = msg || "Saved ✓ " + new Date().toLocaleTimeString();
    const btn = $("#saveAll"); btn.textContent = "Saved ✓";
    setTimeout(() => (btn.textContent = "Save changes"), 1400);
  }
  $("#saveAll").onclick = () => save();

  /* ---------- RSVP table ---------- */
  function renderRSVP() {
    const all = Store.getRSVPs();
    $("#rsvpCount").textContent = all.length;
    $("#rsvpTable tbody").innerHTML = all.length
      ? all.map((r) => `<tr><td>${esc(r.name)}</td><td>${esc(r.phone)}</td><td>${esc(r.attending || "")}</td>
        <td>${esc(r.guests || "")}</td><td>${esc(r.food || "")}</td><td>${esc(r.message || "")}</td>
        <td>${new Date(r.ts).toLocaleString()}</td></tr>`).join("")
      : `<tr><td colspan="7" style="text-align:center;color:#999">No responses yet</td></tr>`;
    const wishes = Store.getWishes();
    $("#wishCount").textContent = wishes.length;
    $("#wishAdmin").innerHTML = wishes.length
      ? wishes.map((w) => `<div class="event-row"><b>${esc(w.name)}</b> — ${esc(w.text)}</div>`).join("")
      : `<p class="hint">No wishes yet</p>`;
  }
  $("#exportCsv").onclick = () => {
    const all = Store.getRSVPs();
    if (!all.length) return alert("No RSVPs to export.");
    const cols = ["name", "phone", "attending", "guests", "food", "message", "ts"];
    const csv = [cols.join(",")]
      .concat(all.map((r) => cols.map((c) => `"${String(r[c] ?? "").replace(/"/g, '""')}"`).join(",")))
      .join("\n");
    dl(new Blob([csv], { type: "text/csv" }), "guest-list.csv");
  };
  $("#clearRsvp").onclick = () => { if (confirm("Delete all RSVP responses?")) { Store.clearRSVPs(); renderRSVP(); } };

  /* ---------- QR ---------- */
  $("#qrGen").onclick = () => {
    let url = $("#qr_url").value.trim();
    const g = $("#qr_guest").value.trim();
    if (g) url += (url.includes("?") ? "&" : "?") + "guest=" + encodeURIComponent(g);
    $("#qrOut").innerHTML = "";
    const c = document.createElement("canvas");
    $("#qrOut").appendChild(c);
    QRCode.toCanvas(c, url, { width: 220, margin: 1, color: { dark: cfg.theme.accent, light: "#ffffff" } }, (err) => {
      if (err) return;
      const link = $("#qrDownload");
      link.hidden = false;
      link.onclick = () => { const a = document.createElement("a"); a.href = c.toDataURL("image/png"); a.download = "invite-qr.png"; a.click(); };
    });
    const p = document.createElement("p");
    p.className = "hint"; p.textContent = url;
    $("#qrOut").appendChild(p);
  };

  /* ---------- Backup ---------- */
  $("#exportCfg").onclick = () => { collect(); dl(new Blob([JSON.stringify(cfg, null, 2)], { type: "application/json" }), "wedding-config.json"); };
  $("#importCfg").onchange = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = () => { try { cfg = Store.deepMerge(DEFAULT_CONFIG, JSON.parse(r.result)); Store.save(cfg); fill(); save("Config imported ✓"); } catch { alert("Invalid config file."); } };
    r.readAsText(file);
  };
  $("#resetCfg").onclick = () => { if (confirm("Reset to default template? This clears your edits (not RSVPs).")) { Store.reset(); cfg = Store.get(); fill(); save("Reset to default ✓"); } };

  /* ---------- utils ---------- */
  function lines(s) { return s.split("\n").map((x) => x.trim()).filter(Boolean); }
  function esc(s) { return String(s ?? "").replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c])); }
  function dl(blob, name) { const u = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = u; a.download = name; a.click(); URL.revokeObjectURL(u); }

  fill();
})();
