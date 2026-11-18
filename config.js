// =====================================================================
//  GYM DEMO CONFIG
//  Each gym gets its own link:   /?gym=<key>     e.g.  /?gym=barbarian
//  A gym entry only needs what is different. Everything else comes from
//  GYM_DEFAULTS at the bottom (nested objects like `about` merge too).
//  Lines marked TODO: fill them in from Google Maps or after talking to the owner.
//
//  Photos in /images are free stock photos from Pexels (free for commercial
//  use, no attribution required). For the real paid website, replace them
//  with photos of the actual gym.
// =====================================================================

window.DEMO_BY = {
  name: "Rohit Sharma",
  portfolio: "https://portfolio-green-rho-91.vercel.app/",
};

window.GYMS = {
  // ---------------------------------------------------------------- Lime / black
  "realtime-fitness": {
    name: "Realtime Fitness",
    tagline: "Gym & Fitness",
    phone: "919268989891", // 91 + 10-digit number (used for WhatsApp + call)
    area: "Delhi", // TODO: exact locality
    theme: { accent: "#d4f53c", dark: "#121212", light: "#f1f0ea" },
    images: {
      hero: "images/p1552249.jpg",
      about: "images/p4162451.jpg",
      programs: ["images/p841130.jpg", "images/p1552242.jpg", "images/p4058411.jpg"],
    },
    headline: ["Real work.", "Real time.", "Real results."],
    callout: ["1% better.", "Every single day."],
  },

  // ---------------------------------------------------------------- Orange / warm black
  barbarian: {
    name: "Barbarian",
    tagline: "The Grand Fitness",
    phone: "918178187649",
    area: "Delhi", // TODO
    theme: { accent: "#ff5a1f", dark: "#141110", light: "#f3eee7" },
    images: {
      hero: "images/p1431282.jpg",
      about: "images/p1552252.jpg",
      programs: ["images/p2261477.jpg", "images/p12890811.jpg", "images/p6455927.jpg"],
    },
    headline: ["Unleash", "your inner", "barbarian."],
    callout: ["No limits.", "No excuses."],
    marquee: ["Lift heavy", "Train savage", "Never skip", "Earn every rep"],
    about: {
      title: ["Heavy iron.", "Hard work.", "Real gains."],
      callout: ["Built for the grind.", "Since day one."],
    },
    community: { quote: "Strength isn't given. It's earned, one rep at a time." },
    footerTag: "Forged in iron. Built by effort.",
  },

  // ---------------------------------------------------------------- Turmeric gold / earthy brown
  dangal: {
    name: "The Dangal",
    tagline: "Unisex Gym",
    phone: "919911552013",
    area: "Delhi", // TODO
    theme: { accent: "#f5b700", dark: "#1a120c", light: "#f6efe2" },
    images: {
      hero: "images/p1547248.jpg",
      about: "images/p703016.jpg",
      programs: ["images/p949126.jpg", "images/p3253501.jpg", "images/p6455927.jpg"],
    },
    headline: ["Mehnat.", "Dum.", "Dangal."],
    subheadline:
      "A unisex gym with desi grit and modern equipment. Train hard, train smart, and your first session is on us.",
    callout: ["Apna dangal", "khud lado."],
    marquee: ["Mehnat se mazboot", "Desi dum", "No shortcuts", "Har din dangal"],
    about: {
      title: ["Desi grit.", "Modern gym.", "Zero excuses."],
      callout: ["Akhade ka josh.", "Gym ki technique."],
    },
    community: {
      quote: "Akhada ho ya gym, jeet sirf mehnat se milti hai.",
      footRight: "Har din dangal.",
    },
    cta: { title: "Aaj se shuru karo." },
    footerTag: "Mehnat se mazboot.",
  },

  // ---------------------------------------------------------------- Sky blue / navy
  "planet-ultrafit": {
    name: "Planet Ultrafit",
    tagline: "Gym & Fitness",
    phone: "919999737252",
    area: "Delhi", // TODO
    theme: { accent: "#38bdf8", dark: "#0b1220", light: "#eef3f8" },
    images: {
      hero: "images/p6550851.jpg",
      about: "images/p7031706.jpg",
      programs: ["images/p3837757.jpg", "images/p4164513.jpg", "images/p4058411.jpg"],
    },
    headline: ["Your planet", "of ultra", "fitness."],
    callout: ["Level up", "in 2027."],
    marquee: ["Move better", "Feel lighter", "Train smarter", "Go ultra"],
    about: {
      title: ["Bright space.", "Smart training.", "Real results."],
      callout: ["Fitness for", "every body."],
    },
    community: { quote: "Every body is welcome here. Every goal is worth chasing." },
    footerTag: "Your world of fitness.",
  },
};

// =====================================================================
//  DEFAULTS: shared by every gym unless overridden above
// =====================================================================
window.GYM_DEFAULTS = {
  tagline: "Gym & Fitness",
  area: "Delhi",
  address: "", // TODO: full address. If empty, the map searches "name + area"
  rating: null, // TODO: Google rating, e.g. 4.7  (null hides it)
  reviewCount: null, // TODO: e.g. 312

  theme: { accent: "#d4f53c", dark: "#121212", light: "#f1f0ea" },
  images: { hero: "", about: "", programs: [] },

  eyebrow: "New Year 2027 batch · Limited slots",
  headline: ["Build your", "strongest", "self."],
  subheadline:
    "Train with purpose, guided by coaches who know your name. Your first session is free. No pressure, no commitment.",
  heroNote: "No ego. Just effort.  ·  All levels welcome",
  callout: ["1% better.", "Every single day."],
  marquee: ["Train with purpose", "Break your limits", "Find your people", "Show up daily"],

  programsSection: {
    label: "01 / Find your fire",
    title: "Your goals. Your grind.",
    text: "Starting fresh or chasing a new personal best? There's a way forward for you here.",
  },
  programs: [
    { title: "Strength", sub: "Build a stronger foundation.", text: "Progressive strength training with free weights and machines, built around real results." },
    { title: "Conditioning", sub: "More energy. Less fat.", text: "High-intensity sessions with ropes, circuits and cardio that push your engine further." },
    { title: "Personal training", sub: "Built around you.", text: "1-on-1 coaching with a tailored plan, diet guidance and weekly progress checks." },
  ],
  extras: ["Zumba & aerobics", "Functional training", "Diet guidance", "Weight-loss programs"],

  about: {
    label: "02 / More than a gym",
    title: ["Good equipment.", "Great people.", "Zero excuses."],
    text: "A serious place to train that still welcomes everyone. Here you're not a membership number. You're part of the team.",
    points: [
      { title: "Trainers in your corner", text: "Certified coaches who know your name and your next step." },
      { title: "Space to push further", text: "Well-kept equipment, open floor space, everything you need." },
      { title: "A culture of showing up", text: "No intimidation. Just good people putting in the work." },
    ],
    callout: ["Built different.", "Just like you."],
  },
  facilities: ["Air-conditioned", "Lockers & showers", "Cardio zone", "Free weights", "Parking nearby"],

  plansSection: {
    label: "03 / Invest in yourself",
    title: "Big goals. Simple plans.",
    text: "No hidden fees. No pressure. Just the right support to keep you moving.",
  },
  // TODO: real fees from the owner
  plans: [
    {
      name: "Monthly",
      sub: "Your space. Your pace.",
      price: "₹1,500",
      period: "month",
      features: ["Full gym access", "Strength & cardio equipment", "Lockers & changing rooms", "Trainer guidance on the floor"],
    },
    {
      name: "Annual",
      sub: "Best value for serious results.",
      price: "₹12,000",
      period: "year",
      popular: true,
      features: ["Everything in Monthly", "Personal diet plan", "Monthly progress check-in", "+1 month free (New Year offer)"],
    },
    {
      name: "Coached",
      sub: "Your goals. Our game plan.",
      price: "₹6,000",
      period: "month",
      features: ["Everything in Monthly", "Dedicated personal trainer", "Custom workout & diet plan", "Weekly progress tracking"],
    },
  ],
  plansNote: "Sample prices for this demo. These will be replaced with your actual fees.",

  community: {
    label: "04 / Stronger together",
    title: ["Come for the workout.", "Stay for the people."],
    text: "The best part of your day starts here. A place to show up, be yourself and build something that lasts.",
    kicker: "Real people. Real progress.",
    text2: "A little encouragement. A lot of shared effort.",
    quote: "We don't sell memberships. We build habits that last.",
    quoteBy: "", // defaults to "The <name> team"
    quoteRole: "Our promise to every member",
    footLeft: "Every starting point. Every body. Every day.",
    footRight: "This is your place.",
  },

  visit: {
    label: "05 / Come through",
    title: "Find us. Train with us.",
    text: "Walk in any time during opening hours. Your first session is free.",
  },
  timings: [
    { days: "Monday – Saturday", hours: "6:00 AM – 11:00 AM  ·  4:00 PM – 10:00 PM" },
    { days: "Sunday", hours: "7:00 AM – 12:00 PM" },
  ],

  offer: {
    title: "New Year offer",
    text: "Join before 31 Dec · +1 month free on the annual plan",
    ends: "2026-12-31", // countdown hides itself after this date
  },
  cta: {
    title: "Your day one starts here.",
    text: "You don't need to be ready. You just need to start. Your first session is on us.",
  },
  footerTag: "Built by effort. Defined by you.",

  goals: ["Weight loss", "Muscle gain", "General fitness", "Personal training", "Zumba / Aerobics"],
  slots: ["Morning (6 – 11 AM)", "Evening (4 – 10 PM)"],
};
