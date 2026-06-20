/* ============================================================
   The Invyte Co. — Personalizer (client-side, free, no backend)
   Fetches a template, replaces the demo details, previews & downloads.
   ============================================================ */
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var generatedHTML = "", fileName = "invite.html";

  function vals() {
    return {
      tpl: $("#tpl").value,
      groom: ($("#groom").value || "Aarav").trim(),
      bride: ($("#bride").value || "Diya").trim(),
      groomSur: $("#groomSur").value.trim(),
      brideSur: $("#brideSur").value.trim(),
      date: $("#date").value || "2026-12-12",
      city: ($("#city").value || "Udaipur").trim(),
    };
  }

  function repl(html, v) {
    var d = new Date(v.date + "T18:00:00");
    var dd = String(d.getDate()).padStart(2, "0");
    var mm = String(d.getMonth() + 1).padStart(2, "0");
    var yy = d.getFullYear();
    var long = d.getDate() + " " + MONTHS[d.getMonth()] + " " + yy; // 12 December 2026
    var dotted = dd + " · " + mm + " · " + yy;                       // 12 · 12 · 2026
    var dev = dd + " • " + mm + " • " + yy;                          // replaces Devanagari date
    var weekday = DAYS[d.getDay()];

    function swap(s, a, b) { return (a && b && a !== b) ? s.split(a).join(b) : s; }

    // names first (so #AaravWedsDiya -> #GroomWedsBride automatically)
    html = swap(html, "Aarav", v.groom);
    html = swap(html, "Diya", v.bride);
    if (v.groomSur) html = swap(html, "Mehra", v.groomSur);
    if (v.brideSur) html = swap(html, "Sharma", v.brideSur);
    // dates
    html = swap(html, "2026-12-12T18:00:00", v.date + "T18:00:00");
    html = swap(html, "12 December 2026", long);
    html = swap(html, "12 · 12 · 2026", dotted);
    html = swap(html, "१२ • १२ • २०२६", dev);
    html = swap(html, "Saturday", weekday);
    // city
    if (v.city) html = swap(html, "Udaipur", v.city);
    return html;
  }

  function generate() {
    var v = vals();
    $("#genBtn").textContent = "Loading…";
    fetch(v.tpl)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) {
        generatedHTML = repl(html, v);
        var blob = new Blob([generatedHTML], { type: "text/html" });
        $("#frame").src = URL.createObjectURL(blob);
        fileName = (v.groom + "-weds-" + v.bride).toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".html";
        $("#dlBtn").disabled = false;
        $("#genBtn").textContent = "Generate Preview";
      })
      .catch(function (err) {
        $("#genBtn").textContent = "Generate Preview";
        alert("Could not load the template (" + err.message + ").\nMake sure you're opening this on the live site (https://nayoora.github.io/invyte-co/personalizer.html), not as a local file.");
      });
  }

  function download() {
    if (!generatedHTML) return;
    var blob = new Blob([generatedHTML], { type: "text/html" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    var ok = $("#ok");
    ok.style.display = "block";
    ok.innerHTML = "Saved <b>" + fileName + "</b>. Next: upload it to your repo's <b>docs/couples/</b> folder (or send the file to the couple). Their link will be <b>https://nayoora.github.io/invyte-co/couples/" + fileName + "</b>";
  }

  $("#genBtn").addEventListener("click", generate);
  $("#dlBtn").addEventListener("click", download);
  generate(); // initial preview with demo defaults
})();
