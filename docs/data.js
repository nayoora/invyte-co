/* ============================================================
   The Invyte Co. — Storefront content
   ============================================================ */
window.SITE = {
  whatsapp: "919097099993",
  email: "hello@theinvyteco.com",
  instagram: "https://www.instagram.com/theinvyteco",
  // FREE email leads: get a key at https://web3forms.com and paste it here.
  web3formsKey: "",

  templates: [
    { name: "Shubh Vivah — Royal", tagline: "With Love Story", cat: "Wedding", tier: "Signature", tag: "Bestseller", style: "royal",
      desc: "Ornate maroon & teal with mandala, marigold toran, diyas, scratch-reveal date, love story, timeline, blessings & RSVP.",
      file: "templates/indian-wedding-with-story.html", img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=70&auto=format&fit=crop", palette: ["#6a0f1c","#0e5a5e","#c9a24b"] },
    { name: "Emerald Heritage", tagline: "Green · Wine · Gold", cat: "Wedding", tier: "Ultra Premium", tag: "Ultra", style: "modern",
      desc: "Deep emerald with wine & gold and a refined Marcellus typeface. Our most luxurious, timeless heritage design.",
      file: "templates/royal-emerald.html", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=70&auto=format&fit=crop", palette: ["#0f5132","#7a1f3a","#c9a24b"] },
    { name: "Peacock Royal", tagline: "Blue · Teal · Gold", cat: "Wedding", tier: "Signature", tag: "New", style: "arch",
      desc: "Regal peacock-blue with a Playfair display face and arched portraits. Bold, contemporary and grand.",
      file: "templates/royal-peacock.html", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=70&auto=format&fit=crop", palette: ["#123c72","#0e5a5e","#c9a24b"] },
    { name: "Wine & Sage", tagline: "Burgundy · Green · Gold", cat: "Wedding", tier: "Signature", tag: "", style: "modern",
      desc: "Rich wine paired with soft sage and gold. Sophisticated, warm and unmistakably premium.",
      file: "templates/royal-wine.html", img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=70&auto=format&fit=crop", palette: ["#5c1a2b","#2f5d3a","#c9a24b"] },
    { name: "Royal Purple", tagline: "Purple · Teal · Gold", cat: "Wedding", tier: "Premium", tag: "", style: "royal",
      desc: "Majestic royal purple with teal and gold accents — regal, vibrant and full of celebration.",
      file: "templates/royal-purple.html", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=70&auto=format&fit=crop", palette: ["#4a2370","#0e5a5e","#c9a24b"] },
    { name: "Royal Blue Classic", tagline: "Navy · Teal · Gold", cat: "Wedding", tier: "Luxury", tag: "", style: "arch",
      desc: "Deep navy and gold for a classic, stately wedding look. Elegant and effortlessly refined.",
      file: "templates/royal-navy.html", img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900&q=70&auto=format&fit=crop", palette: ["#1b2a6b","#0e5a5e","#c9a24b"] },
    { name: "Rani Pink Royal", tagline: "Magenta · Purple · Gold", cat: "Wedding", tier: "Premium", tag: "Trending", style: "floral",
      desc: "Vibrant rani-pink & royal purple with a romantic, floral feel. A glamorous big-fat-Indian-wedding look.",
      file: "templates/royal-rani-pink.html", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=70&auto=format&fit=crop", palette: ["#a3164f","#5a2b6e","#c9a24b"] },
    { name: "Shubh Vivah — Traditional", tagline: "Without Love Story", cat: "Wedding", tier: "Luxury", tag: "For families", style: "royal",
      desc: "Royal design, family-first. No romance sections — leads with blessings. Ideal for traditional families.",
      file: "templates/indian-wedding-no-story.html", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=70&auto=format&fit=crop", palette: ["#0e5a5e","#6a0f1c","#c9a24b"] },
    { name: "Terracotta Boho", tagline: "Rust · Teal · Gold", cat: "Wedding", tier: "Basic", tag: "", style: "floral",
      desc: "Earthy terracotta and teal — a warm, boho-chic palette perfect for day & haldi celebrations.",
      file: "templates/royal-rust.html", img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=900&q=70&auto=format&fit=crop", palette: ["#9c4a1f","#0e5a5e","#c9a24b"] },
    { name: "Ivory Minimal", tagline: "Modern Minimal", cat: "Wedding", tier: "Basic", tag: "", style: "modern",
      desc: "Clean editorial ivory & gold with a cinematic envelope reveal. Minimal, modern and Instagram-worthy.",
      file: "templates/demo.html", img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=900&q=70&auto=format&fit=crop", palette: ["#b08d4f","#9a7b3f","#d8be86"] },
  ],

  features: [
    { i: "scratch", t: "Scratch to Reveal", d: "A gold-foil Save the Date your guests physically scratch to uncover the date." },
    { i: "ganesh", t: "Pure Indian Design", d: "Ganesh invocation, mandala, marigold toran, diyas and Devanagari — truly desi." },
    { i: "rsvp", t: "Smart RSVP", d: "Collect names, family count, food preference & blessings. Exported to you." },
    { i: "events", t: "All Functions", d: "Tilak, Haldi, Mehndi, Sangeet, Vivah, Reception — each with date, venue & dress code." },
    { i: "countdown", t: "Live Countdown", d: "A glowing countdown to the pheras, ticking in real time." },
    { i: "music", t: "Music & Motion", d: "Background music, smooth scroll animations and floating marigold petals." },
    { i: "mobile", t: "Mobile-First", d: "Designed for the phone first — opens beautifully in any WhatsApp chat." },
    { i: "edit", t: "Fully Customised", d: "Your names, photos, events, colours and language — we set it all up for you." },
  ],

  pricing: [
    { name: "Basic", price: "999", popular: false, perks: ["1 single-event invite", "Save the Date / Engagement", "RSVP collection", "Mobile-first design", "WhatsApp ready"] },
    { name: "Premium", price: "1,799", popular: false, perks: ["Up to 3 functions", "Gallery + live countdown", "Scratch reveal", "QR invite", "Background music"] },
    { name: "Luxury", price: "2,999", popular: true, perks: ["Full 6+ function suite", "Love story + timeline", "Family blessings section", "Digital shagun (UPI)", "48-hr delivery"] },
    { name: "Signature", price: "4,999", popular: false, perks: ["Everything in Luxury", "Custom colours & fonts", "Custom domain (1 yr)", "Personalised guest links", "Dedicated designer"] },
    { name: "Ultra Premium", price: "7,999", popular: false, perks: ["Everything in Signature", "Bespoke from-scratch design", "Live streaming + guest wall", "Voice / AI greeting", "Wedding album site", "Priority same-day support"] },
  ],

  addons: [
    { t: "Personalised Guest Links", p: "699", d: "Each guest opens to “Welcome, Sharma Family”" },
    { t: "Voice / AI Greeting", p: "499", d: "Your voice or an AI host welcomes guests" },
    { t: "Live Wedding Streaming", p: "699", d: "Guests join the pheras live, from anywhere" },
    { t: "Guest Photo Wall", p: "599", d: "Guests upload selfies & wishes in real time" },
    { t: "Digital Shagun (UPI)", p: "499", d: "Accept blessings via a built-in UPI QR" },
    { t: "Same-Day Express", p: "999", d: "Your invite ready within hours, not days" },
    { t: "Custom Domain", p: "599", d: "aarav-weds-diya.com for one full year" },
    { t: "Wedding Album Website", p: "1,499", d: "A post-wedding gallery to relive the day" },
  ],

  steps: [
    { n: "01", t: "Choose & pay", d: "Pick a template and plan. Pay securely via UPI or card." },
    { n: "02", t: "Send details", d: "Share names, dates, venues and photos on WhatsApp." },
    { n: "03", t: "We design it", d: "Your personalised invite is ready in 24–48 hours." },
    { n: "04", t: "Share & celebrate", d: "Get your link + QR and share with all your guests." },
  ],

  testimonials: [
    { q: "Guests called just to ask how we made it. The scratch Save the Date was a hit with everyone.", n: "Priya & Rahul", r: "Udaipur" },
    { q: "We wanted a traditional feel with no love story — they had exactly that. Our elders loved it.", n: "The Agarwal Family", r: "Jaipur" },
    { q: "Set up in two days, looked more premium than cards costing 10x. Worth every rupee.", n: "Aditya & Sneha", r: "Hyderabad" },
  ],

  faqs: [
    { q: "How soon will my invitation be ready?", a: "Usually within 24–48 hours of receiving your details and photos. Same-day express is available as an add-on." },
    { q: "Can I get it without the love story?", a: "Yes — we offer a traditional, family-first version with no romance sections. Perfect for arranged or conservative families." },
    { q: "Do my guests need to install anything?", a: "No. It's a simple link that opens beautifully in any browser and inside WhatsApp." },
    { q: "Can you match my wedding colours?", a: "Absolutely. We have 10+ palettes, and on Signature & Ultra Premium we fully customise colours, fonts and motifs." },
    { q: "Can I edit details after it's live?", a: "Yes, send us changes anytime and we'll update your invite quickly." },
    { q: "How do I pay?", a: "UPI, cards and netbanking. Message us on WhatsApp to get started." },
  ],
};
