# The Invyte Co. — Luxury Digital Wedding Invitations

Premium, animated Indian wedding invitation websites + a storefront to sell them.

## Live site / deploy

The deployable website lives in **`/docs`** (so GitHub Pages can serve it directly).

```
docs/
├── index.html          # Storefront (homepage)
├── styles.css app.js data.js
├── robots.txt sitemap.xml llms.txt site.webmanifest 404.html
└── templates/          # The actual invitation templates (self-contained)
    ├── indian-wedding-with-story.html
    ├── indian-wedding-no-story.html
    ├── royal-peacock.html
    ├── royal-rani-pink.html
    ├── royal-emerald.html
    └── demo.html
```

### GitHub Pages (temp domain)
1. Push this repo to GitHub.
2. Repo → **Settings → Pages**.
3. **Source:** Deploy from a branch → Branch: `main` → Folder: **`/docs`** → Save.
4. Your temp URL: `https://<user>.github.io/<repo>/`

### Hostinger (later, with real domain)
Upload the **contents of `/docs`** into `public_html` (so `index.html` and `templates/` sit directly inside `public_html`). Enable free SSL.

### Custom domain (later)
Add a `CNAME` file inside `/docs` containing your domain, point DNS to GitHub Pages / Hostinger, then find-replace `theinvyteco.com` in `index.html`, `sitemap.xml`, `robots.txt`, `llms.txt` with your real domain.

## Editing content
Everything sellable is data-driven in **`docs/data.js`**:
- `whatsapp` — your WhatsApp number (currently set)
- `templates`, `pricing`, `addons`, `features`, `faqs`, `testimonials`

## Source files
The root-level `*.html` are the editable source templates; `/docs/templates` holds the deployed copies. The `website/` folder is the storefront source (kept in sync into `/docs`).

Built with ❤️ for The Invyte Co.
