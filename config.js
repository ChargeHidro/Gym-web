// =====================================================================
//  GYM DEMO CONFIG
//  Each gym gets its own link:   index.html?gym=<key>
//      e.g.  https://your-site.netlify.app/?gym=planet-ultrafit
//  A gym entry only needs what is different. Everything else comes from
//  GYM_DEFAULTS below.
//  Lines marked TODO: fill them in from Google Maps or after talking to the owner.
// =====================================================================

window.DEMO_BY = {
  name: "Rohit Sharma",
  portfolio: "https://portfolio-green-rho-91.vercel.app/",
};

window.GYMS = {
  "planet-ultrafit": {
    name: "Planet Ultrafit",
    tagline: "Gym & Fitness",
    phone: "919999737252", // WhatsApp/call number: 91 + 10 digits
    accent: "#38bdf8",
    area: "Delhi", // TODO: exact area
  },
  barbarian: {
    name: "Barbarian",
    tagline: "The Grand Fitness",
    phone: "918178187649",
    accent: "#ff5a1f",
    area: "Delhi", // TODO
  },
  dangal: {
    name: "The Dangal",
    tagline: "Unisex Gym",
    phone: "919911552013",
    accent: "#ffc300",
    area: "Delhi", // TODO
  },
  "realtime-fitness": {
    name: "Realtime Fitness",
    tagline: "Gym & Fitness",
    phone: "919268989891",
    accent: "#c6ff00",
    area: "Delhi", // TODO
  },
};

window.GYM_DEFAULTS = {
  tagline: "Gym & Fitness",
  area: "Delhi",
  address: "", // TODO: full address. If empty, the map searches "name + area"
  accent: "#c6ff00",
  heroImage: "", // optional: a real photo of the gym (path or URL). Looks great dimmed behind the headline.
  rating: null, // TODO: Google rating, e.g. 4.7  (leave null to hide)
  reviewCount: null, // TODO: e.g. 312

  headline: ["Train harder.", "Live stronger."],
  subheadline:
    "Modern equipment, expert trainers and a community that pushes you to show up every day. Start your fitness journey with a free trial session.",

  stats: [
    { value: "Free", label: "Trial session" },
    { value: "6 AM", label: "Opens daily" },
    { value: "1:1", label: "Personal coaching" },
    { value: "AC", label: "Air-conditioned floor" },
  ],

  offer: {
    badge: "New Year 2027 batch · limited slots",
    title: "New Year offer",
    headline: "Start 2027 stronger",
    text: "Join before 31 December and get 1 extra month on the annual plan. Your first session is free.",
    ends: "2026-12-31", // banner hides itself after this date
  },

  programs: [
    { icon: "dumbbell", title: "Strength Training", text: "Free weights, machines and a progressive plan to build real, lasting muscle." },
    { icon: "flame", title: "Fat Loss", text: "Cardio and HIIT programs designed to burn fat and keep it off for good." },
    { icon: "zap", title: "Functional / CrossFit", text: "High-energy circuits that build power, speed and everyday stamina." },
    { icon: "user", title: "Personal Training", text: "1-on-1 coaching with a trainer who plans your workouts and tracks progress." },
    { icon: "music", title: "Zumba & Aerobics", text: "Fun, music-driven group classes. Perfect if you are just getting started." },
    { icon: "leaf", title: "Diet Guidance", text: "Simple Indian diet plans that match your goal, budget and routine." },
  ],

  facilities: [
    "Modern equipment",
    "Certified trainers",
    "Air-conditioned",
    "Lockers & changing rooms",
    "Separate cardio zone",
    "Parking nearby",
  ],

  // TODO: real fees from the owner
  plans: [
    {
      name: "Monthly",
      price: "₹1,500",
      period: "month",
      features: ["Full gym access", "Cardio + strength zones", "Trainer guidance on the floor"],
    },
    {
      name: "Annual",
      price: "₹12,000",
      period: "year",
      note: "Save ₹6,000 vs monthly",
      popular: true,
      features: ["Everything in Monthly", "Personal diet plan", "Monthly body-composition check", "+1 month free (New Year offer)"],
    },
    {
      name: "Personal Training",
      price: "₹6,000",
      period: "month",
      features: ["Dedicated 1-on-1 trainer", "Custom workout plan", "Weekly progress tracking", "Diet plan included"],
    },
  ],
  plansNote: "Sample prices for this demo. These will be replaced with your actual fees.",

  timings: [
    { days: "Monday – Saturday", hours: "6:00 AM – 11:00 AM  ·  4:00 PM – 10:00 PM" },
    { days: "Sunday", hours: "7:00 AM – 12:00 PM" },
  ],

  goals: ["Weight loss", "Muscle gain", "General fitness", "Personal training", "Zumba / Aerobics"],
  slots: ["Morning (6 – 11 AM)", "Evening (4 – 10 PM)"],
};
