/* ============================================================
   The Invyte Co. — Wedding Config & Data Layer
   ------------------------------------------------------------
   Everything on the guest site is driven by this object.
   The Admin Panel writes overrides to localStorage so a seller
   can create a brand-new wedding site in minutes — no code.
   ============================================================ */

const DEFAULT_CONFIG = {
  meta: {
    brand: "The Invyte Co.",
    template: "Signature",
    locale: "en", // en | hi
    theme: "light", // light | dark
    soundOn: false,
  },

  couple: {
    groom: "Arjun",
    bride: "Ananya",
    tagline: "Two souls, one beautiful journey",
    hashtag: "#ArjunWedsAnanya",
    quote: "And so the adventure begins…",
    weddingDate: "2026-12-12T18:00:00", // ISO — drives countdown
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    groomImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    brideImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },

  // Personalized greeting: ?guest=Rajesh%20Ji%20%26%20Family
  welcomeMessageTemplate: "Welcome, {guest}",

  story: {
    how: "We met on a rainy evening in a tiny bookstore café. One shared umbrella later, neither of us wanted the conversation to end.",
    proposal:
      "Under a sky full of fireworks in Udaipur, with the lake glowing gold, Arjun went down on one knee. Ananya said yes before he could finish.",
  },

  timeline: [
    { year: "2021", title: "First Hello", text: "A chance meeting at a bookstore café." },
    { year: "2022", title: "First Trip", text: "Lost in the streets of Jaipur, found in each other." },
    { year: "2024", title: "The Proposal", text: "A lakeside evening in Udaipur changed everything." },
    { year: "2026", title: "Forever Begins", text: "We tie the knot, surrounded by everyone we love." },
  ],

  family: {
    groomSide: {
      label: "Groom's Family",
      parents: "Son of Mr. Rakesh & Mrs. Sunita Mehra",
      members: ["Rakesh Mehra — Father", "Sunita Mehra — Mother", "Ishaan Mehra — Brother"],
    },
    brideSide: {
      label: "Bride's Family",
      parents: "Daughter of Mr. Vikram & Mrs. Meera Sharma",
      members: ["Vikram Sharma — Father", "Meera Sharma — Mother", "Riya Sharma — Sister"],
    },
  },

  events: [
    {
      id: "engagement",
      name: "Engagement",
      icon: "💍",
      date: "2026-12-08T19:00:00",
      venue: "The Leela Palace, Banquet Hall",
      address: "Old Airport Rd, Bengaluru",
      dressCode: "Cocktail Elegant",
      mapQuery: "The Leela Palace Bengaluru",
    },
    {
      id: "haldi",
      name: "Haldi",
      icon: "🌼",
      date: "2026-12-10T10:00:00",
      venue: "Mehra Residence, Garden Lawn",
      address: "Jubilee Hills, Hyderabad",
      dressCode: "Yellow & Floral",
      mapQuery: "Jubilee Hills Hyderabad",
    },
    {
      id: "mehendi",
      name: "Mehendi",
      icon: "🪷",
      date: "2026-12-10T16:00:00",
      venue: "Courtyard Pavilion",
      address: "Jubilee Hills, Hyderabad",
      dressCode: "Bright Festive",
      mapQuery: "Jubilee Hills Hyderabad",
    },
    {
      id: "sangeet",
      name: "Sangeet",
      icon: "🎶",
      date: "2026-12-11T20:00:00",
      venue: "Grand Ballroom",
      address: "Taj Krishna, Hyderabad",
      dressCode: "Indo-Western Glam",
      mapQuery: "Taj Krishna Hyderabad",
    },
    {
      id: "wedding",
      name: "Wedding",
      icon: "❤️",
      date: "2026-12-12T18:00:00",
      venue: "Royal Wedding Lawns",
      address: "Taj Falaknuma Palace, Hyderabad",
      dressCode: "Traditional Royal",
      mapQuery: "Taj Falaknuma Palace Hyderabad",
    },
    {
      id: "reception",
      name: "Reception",
      icon: "🥂",
      date: "2026-12-13T19:30:00",
      venue: "Crystal Hall",
      address: "ITC Kohenur, Hyderabad",
      dressCode: "Black Tie Optional",
      mapQuery: "ITC Kohenur Hyderabad",
    },
  ],

  gallery: [
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop",
  ],

  gift: {
    enabled: true,
    note: "Your presence is the only present we need. But if you wish to bless us, a digital shagun is warmly welcomed.",
    upiId: "arjunananya@upi",
    payeeName: "Arjun & Ananya",
  },

  liveStream: {
    enabled: true,
    note: "Can't make it in person? Join us live on the wedding day.",
    url: "https://www.youtube.com/",
  },

  contact: {
    groomPhone: "+91 90000 00001",
    bridePhone: "+91 90000 00002",
    whatsapp: "919000000001",
  },

  music: {
    enabled: true,
    // royalty-free ambient track
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749d484.mp3?filename=relaxing-145038.mp3",
  },

  // Section visibility (admin toggles)
  sections: {
    story: true,
    timeline: true,
    family: true,
    events: true,
    gallery: true,
    countdown: true,
    rsvp: true,
    wishes: true,
    gift: true,
    livestream: true,
    contact: true,
  },

  theme: {
    primary: "#b88a44",   // gold
    accent: "#8a5a44",    // bronze
    bgLight: "#fbf7f0",
    bgDark: "#0f0c0a",
    fontHeading: "'Cormorant Garamond', serif",
    fontBody: "'Jost', sans-serif",
  },
};

/* ---------- Store: merge defaults with admin overrides ---------- */
const Store = {
  KEY: "invyte.config",
  RSVP_KEY: "invyte.rsvp",
  WISH_KEY: "invyte.wishes",

  deepMerge(base, over) {
    if (Array.isArray(over)) return over;
    if (typeof over !== "object" || over === null) return over;
    const out = Array.isArray(base) ? [...base] : { ...base };
    for (const k of Object.keys(over)) {
      out[k] =
        k in base && typeof base[k] === "object" && !Array.isArray(base[k])
          ? this.deepMerge(base[k], over[k])
          : over[k];
    }
    return out;
  },

  get() {
    try {
      const over = JSON.parse(localStorage.getItem(this.KEY) || "{}");
      return this.deepMerge(DEFAULT_CONFIG, over);
    } catch {
      return DEFAULT_CONFIG;
    }
  },

  save(cfg) {
    localStorage.setItem(this.KEY, JSON.stringify(cfg));
  },

  reset() {
    localStorage.removeItem(this.KEY);
  },

  /* RSVP */
  getRSVPs() {
    try { return JSON.parse(localStorage.getItem(this.RSVP_KEY) || "[]"); }
    catch { return []; }
  },
  addRSVP(entry) {
    const all = this.getRSVPs();
    all.push({ ...entry, ts: new Date().toISOString() });
    localStorage.setItem(this.RSVP_KEY, JSON.stringify(all));
  },
  clearRSVPs() { localStorage.removeItem(this.RSVP_KEY); },

  /* Guest wishes */
  getWishes() {
    try { return JSON.parse(localStorage.getItem(this.WISH_KEY) || "[]"); }
    catch { return []; }
  },
  addWish(entry) {
    const all = this.getWishes();
    all.unshift({ ...entry, ts: new Date().toISOString() });
    localStorage.setItem(this.WISH_KEY, JSON.stringify(all));
    return all;
  },
};

if (typeof window !== "undefined") {
  window.DEFAULT_CONFIG = DEFAULT_CONFIG;
  window.Store = Store;
}
