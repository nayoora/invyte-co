/* ============================================================
   The Invyte Co. — Storefront content
   Edit this file to manage templates, pricing & contact.
   ============================================================ */
window.SITE = {
  // >>> CHANGE THIS to your real WhatsApp number (country code, no +, no spaces)
  whatsapp: "919097099993",
  email: "hello@theinvyteco.com",
  instagram: "https://www.instagram.com/theinvyteco",

  // Live, working templates (these are the real demo files)
  templates: [
    {
      name: "Shubh Vivah — Royal",
      tagline: "With Love Story",
      cat: "Wedding",
      tier: "Signature",
      tag: "Bestseller",
      desc: "Scratch-to-reveal Save the Date, marigold toran, mandala, diyas, love story & timeline. Maroon + teal + gold.",
      file: "templates/indian-wedding-with-story.html",
      palette: ["#6a0f1c", "#0e5a5e", "#c9a24b"],
    },
    {
      name: "Shubh Vivah — Traditional",
      tagline: "Without Love Story",
      cat: "Wedding",
      tier: "Signature",
      tag: "For families",
      desc: "Same royal design, family-first. No romance sections — leads with blessings, ideal for traditional families.",
      file: "templates/indian-wedding-no-story.html",
      palette: ["#0e5a5e", "#6a0f1c", "#c9a24b"],
    },
    {
      name: "Ivory Elegance",
      tagline: "Modern Luxury",
      cat: "Wedding",
      tier: "Luxury",
      tag: "",
      desc: "Editorial ivory & gold theme with cinematic envelope reveal. Clean, modern, Instagram-worthy.",
      file: "templates/demo.html",
      palette: ["#b08d4f", "#7b5cff", "#d8be86"],
    },
    {
      name: "Peacock Royal",
      tagline: "Blue · Teal · Gold",
      cat: "Wedding",
      tier: "Signature",
      tag: "New",
      desc: "Regal peacock-blue palette with teal and gold. Same royal experience — scratch reveal, full functions, blessings & RSVP.",
      file: "templates/royal-peacock.html",
      palette: ["#123c72", "#0e5a5e", "#c9a24b"],
    },
    {
      name: "Rani Pink Royal",
      tagline: "Magenta · Purple · Gold",
      cat: "Wedding",
      tier: "Signature",
      tag: "Trending",
      desc: "Vibrant rani-pink and royal purple — bold, festive and feminine. Perfect for a glamorous big-fat-Indian wedding.",
      file: "templates/royal-rani-pink.html",
      palette: ["#a3164f", "#5a2b6e", "#c9a24b"],
    },
    {
      name: "Emerald Royal",
      tagline: "Green · Wine · Gold",
      cat: "Wedding",
      tier: "Signature",
      tag: "",
      desc: "Deep emerald with wine and gold — a rich, heritage-royal look that feels timeless and luxurious.",
      file: "templates/royal-emerald.html",
      palette: ["#0f5132", "#7a1f3a", "#c9a24b"],
    },
    {
      name: "Engagement & Roka",
      tagline: "Coming soon",
      cat: "Engagement",
      tier: "Premium",
      tag: "New",
      desc: "A dedicated engagement / roka announcement. Ask us to craft yours in your colours.",
      file: "",
      palette: ["#b3294e", "#c9a24b", "#6a0f1c"],
    },
    {
      name: "Save The Date",
      tagline: "Coming soon",
      cat: "Save the Date",
      tier: "Basic",
      tag: "",
      desc: "A quick, gorgeous one-screen teaser with live countdown and scratch reveal.",
      file: "",
      palette: ["#0e5a5e", "#1d8189", "#c9a24b"],
    },
    {
      name: "Reception Invite",
      tagline: "Coming soon",
      cat: "Reception",
      tier: "Luxury",
      tag: "",
      desc: "An elegant reception / pritibhoj invitation with RSVP and venue details.",
      file: "",
      palette: ["#46324f", "#c9a24b", "#b3294e"],
    },
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
    { name: "Luxury", price: "2,999", popular: true, perks: ["Full 6+ function suite", "Love story + timeline", "Family blessings section", "Digital shagun (UPI)", "48-hr priority delivery"] },
    { name: "Signature", price: "4,999", popular: false, perks: ["Everything in Luxury", "Custom colours & fonts", "Custom domain (1 yr)", "Personalised guest links", "Dedicated designer"] },
  ],

  addons: [
    { t: "Custom Domain", p: "299" }, { t: "Premium Music", p: "299" },
    { t: "Additional Function", p: "399" }, { t: "Video Invite", p: "699" },
    { t: "Guest Photo Gallery", p: "399" }, { t: "Digital Shagun", p: "499" },
    { t: "Per-Guest Links", p: "699" }, { t: "Wedding Album Site", p: "1,499" },
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
    { q: "How soon will my invitation be ready?", a: "Usually within 24–48 hours of receiving your details and photos. Rush delivery is available." },
    { q: "Can I get it without the love story?", a: "Yes — we offer a traditional, family-first version with no romance sections. Perfect for arranged or conservative families." },
    { q: "Do my guests need to install anything?", a: "No. It's a simple link that opens beautifully in any browser and in WhatsApp." },
    { q: "Can you match my wedding colours?", a: "Absolutely. On Signature we fully customise colours, fonts and motifs to your theme." },
    { q: "Can I edit details after it's live?", a: "Yes, send us changes anytime and we'll update your invite quickly." },
    { q: "How do I pay?", a: "UPI, cards and netbanking. Message us on WhatsApp to get started." },
  ],
};
