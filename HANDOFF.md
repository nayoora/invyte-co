# The Invyte Co. — Session Handoff (paste into any new Kiro/Claude session)

You are continuing an existing project, "The Invyte Co." — a premium Indian wedding
digital-invitation business: a storefront that sells animated, self-contained wedding
invitation templates. All files already exist on disk. Read them before changing
anything. Do NOT rebuild from scratch.

## Location & live
- Project: `/Users/harshpandey/Claude/InvyteCo/`
- Live (GitHub Pages, free): https://nayoora.github.io/invyte-co/
- Repo: https://github.com/nayoora/invyte-co  (gh CLI account: nayoora)
- Pages serves branch `main`, folder `/docs`. Every push auto-deploys (~1 min).
- Owner WhatsApp (in all order buttons): 919097099993

## What's built
- STOREFRONT: source in `website/`, deployed in `docs/`. Royal Indian look (ivory +
  maroon + teal + gold), lotus SVG logo, Fraunces/Cormorant fonts. Data-driven via
  `website/data.js` (templates, pricing, addons, features, faqs, testimonials, whatsapp).
  Sections: hero, templates grid (mini invitation-card thumbnails in 4 cover styles:
  royal/arch/floral/modern), how-it-works, live phone showcase, features, pricing,
  testimonials, FAQ, order (WhatsApp). Pricing 999/1799/2999/4999 INR. SEO complete
  (meta, OG, Twitter, JSON-LD Organization/Service/FAQPage/ItemList, sitemap.xml,
  robots.txt, llms.txt, manifest, og-cover.svg) — all URLs point to the live Pages URL.
- 6 SELF-CONTAINED TEMPLATES (root + copied to docs/templates/):
  indian-wedding-with-story.html, indian-wedding-no-story.html, royal-peacock.html
  (Playfair font), royal-rani-pink.html (floral), royal-emerald.html (Marcellus),
  demo.html (ivory modern). Features: scratch-to-reveal Save the Date, Ganesh ॐ,
  mandala, marigold toran, diyas, Devanagari, family blessings, events, countdown,
  gallery, RSVP (localStorage), music toggle, custom cursor, petals, confetti.
  Demo content: "Aarav & Diya", 12-12-2026, Udaipur. Mobile-responsive.
  EMBED MODE: `?embed=1` skips scratch, shows invite directly, no autoplay music.
  Storefront phone preview uses ?embed=1. Music pauses on tab visibilitychange.
- LEGACY (not deployed, leave alone): root index.html, app.js, config.js, templates.js,
  admin.html, admin.js, website/builder.html (older configurable system).

## Deploy workflow (follow exactly)
Storefront is at deploy ROOT; templates in `templates/` SUBFOLDER. So `website/data.js`
uses `../template.html` but deployed `docs/data.js` must use `templates/template.html`.
```
cd /Users/harshpandey/Claude/InvyteCo
cp website/index.html website/styles.css website/app.js website/data.js website/sitemap.xml website/robots.txt website/llms.txt website/og-cover.svg docs/
cp indian-wedding-*.html royal-*.html demo.html docs/templates/
cd docs && sed -i '' 's#\.\./#templates/#g' data.js && cd ..
git add -A
git -c user.name="The Invyte Co." -c user.email="hello@theinvyteco.com" commit -m "msg"
git push origin main
```
Rules: never modify global git config (use `git -c ...`); macOS sed is `sed -i ''`;
in execute_bash chain commands with `&&` on ONE line (no newlines); validate template
JS with: `awk '/<script>/{f=1;next}/<\/script>/{f=0}f' FILE.html > /tmp/x.js && node --check /tmp/x.js`
and `node --check docs/app.js docs/data.js`. Verify live with curl for HTTP 200.

## Pending (priority)
1. HIGHEST: a "Personalizer" page — form (names/date/events/venues/template) that
   generates a ready personalized invite file/link. Removes manual per-order HTML edits.
2. Real photos + a real shehnai music track (user provides; currently gradient
   placeholders + a generic pixabay mp3).
3. Razorpay payment button on the order section (stays static).
4. Custom domain later: find-replace the Pages URL in docs/website index.html,
   sitemap.xml, robots.txt, llms.txt + add docs/CNAME. Submit sitemap to Search Console.

## Working style
User wants big-brand, premium, aesthetic, mobile-perfect design; blunt feedback. Keep
Indian wedding authenticity (Shubh Vivah, pheras, aashirwad, Ganesh, Devanagari — no
Western "I do"). Keep everything static (free GitHub Pages). Be honest about what only
the user can provide (photos, music, domain, backlinks). Don't use fabricated stats or
fake review schema.

Start by reading README.md and the files above, confirm the live site loads, then ask
which pending task to tackle (Personalizer is usually first).
