# 🚀 The Invyte Co. — Launch Guide (do these, in order)

Your site is LIVE: **https://nayoora.github.io/invyte-co/**
Everything below is FREE. ~30–45 minutes total.

---

## ✅ Already done for you
- Live storefront with 6 royal templates, pricing, FAQ, mobile-ready.
- Order form that **emails you the lead AND opens WhatsApp** (919097099993).
- Email + WhatsApp + Instagram contact buttons.
- Personalizer tool to make each couple's invite in 2 minutes.
- SEO: meta, Open Graph, sitemap, robots, structured data, share image.

---

## 1) Turn on FREE email leads (5 min) — IMPORTANT
So every order form submission emails you (not just WhatsApp).
1. Go to **https://web3forms.com** → enter your email → they email you an **Access Key**.
2. Open `docs/data.js` (and `website/data.js`), find `web3formsKey: ""`.
3. Paste your key: `web3formsKey: "your-key-here",`
4. Save, then run the **Deploy** steps (bottom of this file).
> Free tier handles plenty of leads. No account/dashboard needed.

## 2) Set your real email + Instagram (2 min)
In `data.js`:
- `email: "youremail@gmail.com"` (a normal Gmail is fine)
- `instagram: "https://www.instagram.com/yourhandle"`
Deploy after editing.

## 3) Google so people find you (10 min)
1. **Google Search Console** → https://search.google.com/search-console → Add property → URL prefix → `https://nayoora.github.io/invyte-co/`.
2. Verify with the **HTML tag** method — copy the `<meta name="google-site-verification" ...>` tag they give you and send it to me (or paste it into `docs/index.html` inside `<head>`). Deploy.
3. In Search Console → Sitemaps → submit: `sitemap.xml`
4. (Optional, also free) Bing Webmaster Tools — same steps.

## 4) Instagram + WhatsApp (free marketing)
- Make an Instagram for "The Invyte Co."; bio link = your site.
- Post a **screen-recording of the scratch-to-reveal** opening (this format goes viral for invites). 1–3 reels/day.
- Put the link on your WhatsApp status and in family/vendor groups.

---

## 💼 How to fulfil an order (using the Personalizer)
1. Open **https://nayoora.github.io/invyte-co/personalizer.html** (private tool — don't share publicly).
2. Pick the template, type the couple's names, surnames, date, city → **Generate Preview**.
3. Click **Download Invite (.html)** — you get a file like `rahul-weds-priya.html`.
4. Upload it to the repo's **`docs/couples/`** folder (GitHub → Add file → Upload, or via Git).
5. Their live link becomes: `https://nayoora.github.io/invyte-co/couples/rahul-weds-priya.html`
6. Send that link + (optional) a QR. Done!
> For deeper changes (events, family members, venue, photos), open the downloaded file
> and edit the labelled text near the top — or send it to your developer.

## 💰 Taking payment (free to start)
- Customer messages WhatsApp → you send a **UPI ID / Razorpay payment link** → on payment, deliver the link.
- Later: add a Razorpay "Payment Button" to the site (free, no coding beyond pasting their snippet).

---

## 🛠 Deploy (publish your changes)
After editing any file in `website/`:
```
cd /Users/harshpandey/Claude/InvyteCo
cp website/index.html website/styles.css website/app.js website/data.js website/personalizer.html website/personalizer.js docs/
cd docs && sed -i '' 's#\.\./#templates/#g' data.js && cd ..
git add -A
git -c user.name="The Invyte Co." -c user.email="hello@theinvyteco.com" commit -m "update"
git push origin main
```
Site updates in ~1 minute. (Or just edit files on GitHub.com directly and it auto-deploys.)

## ⏭ Still to add when you can (need your input)
- Real couple/gallery **photos** (currently elegant placeholders).
- A real **shehnai/wedding music** track (currently generic ambient).
- A **custom domain** (then I update all SEO links + add a CNAME).

You're ready to start marketing. 🎉
