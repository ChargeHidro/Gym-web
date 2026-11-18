(function () {
  "use strict";

  const app = document.getElementById("app");
  const gyms = window.GYMS || {};
  const DEMO = window.DEMO_BY || { name: "", portfolio: "#" };
  const params = new URLSearchParams(location.search);
  const slug = params.get("gym");

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ICONS = {
    dumbbell: '<path d="M6 7v10M18 7v10M3 9v6M21 9v6M6 12h12"/>',
    flame:
      '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    user: '<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="m16 11 2 2 4-4"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/>',
    chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  };
  const icon = (name, cls = "w-6 h-6") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  // Without a valid ?gym=..., show a neutral page (or the full list with ?all=1)
  if (!slug || !gyms[slug]) {
    if (params.has("all")) renderIndex();
    else renderPrivate();
    return;
  }

  const g = { ...window.GYM_DEFAULTS, ...gyms[slug] };
  document.documentElement.style.setProperty("--accent", g.accent);
  document.title = `${g.name} · ${g.tagline}`;

  const fullName = `${g.name} ${g.tagline}`;
  const wa = (text) => `https://wa.me/${g.phone}?text=${encodeURIComponent(text)}`;
  const tel = `tel:+${g.phone}`;
  const phonePretty = `+${g.phone.slice(0, 2)} ${g.phone.slice(2, 7)} ${g.phone.slice(7)}`;
  const mapQuery = encodeURIComponent(g.address || `${fullName}, ${g.area}`);
  const initials = g.name
    .split(/\s+/)
    .filter((w) => !/^the$/i.test(w))
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const stats = [...g.stats];
  if (g.rating) stats.unshift({ value: `${g.rating}★`, label: `${g.reviewCount || ""} Google reviews`.trim() });

  const sectionHead = (eyebrow, title, text, center = false) => `
    <div class="reveal max-w-2xl ${center ? "mx-auto text-center" : ""}">
      <div class="text-xs font-semibold tracking-[0.2em] uppercase accent-text">${esc(eyebrow)}</div>
      <h2 class="font-display uppercase text-5xl sm:text-6xl mt-3 leading-[0.95]">${esc(title)}</h2>
      ${text ? `<p class="mt-4 text-zinc-400 leading-relaxed">${esc(text)}</p>` : ""}
    </div>`;

  // ---------- Sections ----------

  const demoBar = `
    <div class="bg-white text-black text-[11px] sm:text-xs text-center px-4 py-2 font-medium">
      Website demo prepared for <b>${esc(g.name)}</b> by ${esc(DEMO.name)} · not the official website
    </div>`;

  const nav = `
    <header id="nav" class="sticky top-0 z-40 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" class="flex items-center gap-3 min-w-0">
          <span class="accent-bg text-black font-display text-xl w-9 h-9 rounded-lg grid place-items-center shrink-0">${esc(initials)}</span>
          <span class="font-display text-2xl tracking-wide truncate">${esc(g.name)}</span>
        </a>
        <nav class="hidden md:flex items-center gap-8 text-sm text-zinc-300">
          <a href="#programs" class="hover:text-white transition">Programs</a>
          <a href="#plans" class="hover:text-white transition">Membership</a>
          <a href="#timings" class="hover:text-white transition">Timings</a>
          <a href="#location" class="hover:text-white transition">Location</a>
        </nav>
        <a href="#trial" class="btn-accent rounded-full px-4 sm:px-5 py-2 text-sm font-semibold shrink-0">Free Trial</a>
      </div>
    </header>`;

  const hero = `
    <section id="top" class="relative overflow-hidden">
      ${g.heroImage ? `<img src="${esc(g.heroImage)}" alt="" class="absolute inset-0 w-full h-full object-cover opacity-25" />` : ""}
      <div class="absolute inset-0 grid-bg"></div>
      <div class="glow float absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full"></div>
      <div class="glow absolute -bottom-60 -left-40 w-[420px] h-[420px] rounded-full opacity-60"></div>
      <div aria-hidden="true" class="stroke-text font-display absolute -bottom-[4vw] left-1/2 -translate-x-1/2 text-[26vw] leading-none whitespace-nowrap select-none pointer-events-none">STRONGER</div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-24 sm:pt-24 sm:pb-36">
        <div class="reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-zinc-300">
          <span class="w-2 h-2 rounded-full accent-bg animate-pulse"></span>${esc(g.offer.badge)}
        </div>
        <h1 class="reveal font-display uppercase leading-[0.88] mt-6 text-[clamp(3.5rem,13vw,9.5rem)]">
          ${esc(g.headline[0])}<br /><span class="accent-text">${esc(g.headline[1])}</span>
        </h1>
        <p class="reveal mt-6 max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed">${esc(g.subheadline)}</p>
        <div class="reveal mt-8 flex flex-col sm:flex-row gap-3">
          <a href="#trial" class="btn-accent rounded-full px-7 py-4 font-semibold inline-flex items-center justify-center gap-2">
            Book your free trial ${icon("arrow", "w-5 h-5")}
          </a>
          <a href="${wa(`Hi ${g.name}! I'd like to know more about membership.`)}" target="_blank" rel="noopener"
             class="rounded-full px-7 py-4 font-semibold border border-white/15 hover:bg-white/5 transition inline-flex items-center justify-center gap-2">
            ${icon("chat", "w-5 h-5")} WhatsApp us
          </a>
        </div>
        <div class="reveal mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 max-w-3xl">
          ${stats
            .slice(0, 4)
            .map(
              (s) => `
            <div class="bg-[#0d0d10] p-5">
              <div class="font-display text-3xl sm:text-4xl accent-text">${esc(s.value)}</div>
              <div class="text-xs sm:text-sm text-zinc-400 mt-1">${esc(s.label)}</div>
            </div>`
            )
            .join("")}
        </div>
      </div>
    </section>`;

  const stripWords = g.programs
    .map((p) => `<span class="px-6">${esc(p.title)}</span><span aria-hidden="true">✦</span>`)
    .join("");
  const stripHalf = stripWords.repeat(3);
  const marquee = `
    <div class="overflow-hidden py-6" aria-hidden="true">
      <div class="accent-bg text-black -rotate-1 scale-[1.03] py-3">
        <div class="marquee font-display text-2xl sm:text-3xl tracking-wider uppercase whitespace-nowrap">${stripHalf}${stripHalf}</div>
      </div>
    </div>`;

  const programs = `
    <section id="programs" class="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
      ${sectionHead("Programs", "Built for every goal", "Lose fat, build muscle or just feel fitter. There is a plan for you, and a trainer to guide you.")}
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        ${g.programs
          .map(
            (p) => `
          <div class="card reveal rounded-2xl p-6 sm:p-7">
            <div class="icon-tile w-12 h-12 rounded-xl grid place-items-center">${icon(p.icon)}</div>
            <h3 class="mt-5 text-xl font-semibold">${esc(p.title)}</h3>
            <p class="mt-2 text-zinc-400 text-sm leading-relaxed">${esc(p.text)}</p>
          </div>`
          )
          .join("")}
      </div>
    </section>`;

  const daysLeft = Math.ceil((new Date(`${g.offer.ends}T23:59:59`) - new Date()) / 86400000);
  const offer =
    daysLeft > 0
      ? `
    <section class="px-4 sm:px-6">
      <div class="reveal max-w-7xl mx-auto relative overflow-hidden rounded-3xl p-8 sm:p-12 accent-bg text-black">
        <div aria-hidden="true" class="absolute -right-6 -top-10 font-display text-[10rem] sm:text-[14rem] leading-none opacity-10 select-none">2027</div>
        <div class="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <div class="text-xs font-bold tracking-[0.2em] uppercase">${esc(g.offer.title)}</div>
            <h3 class="font-display text-5xl sm:text-6xl uppercase leading-none mt-2">${esc(g.offer.headline)}</h3>
            <p class="mt-3 max-w-xl font-medium text-black/70">${esc(g.offer.text)}</p>
          </div>
          <div class="flex md:flex-col items-center gap-4">
            <div class="text-center bg-black rounded-2xl px-6 py-4">
              <div class="font-display text-5xl accent-text leading-none">${daysLeft}</div>
              <div class="text-[11px] uppercase tracking-widest text-zinc-400 mt-1">days left</div>
            </div>
            <a href="#trial" class="bg-black text-white rounded-full px-6 py-3 font-semibold hover:bg-zinc-800 transition">Claim offer</a>
          </div>
        </div>
      </div>
    </section>`
      : "";

  const plans = `
    <section id="plans" class="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
      ${sectionHead("Membership", "Simple, honest pricing", "No hidden charges. Try a free session first, then pick what fits you.", true)}
      <div class="grid md:grid-cols-3 gap-5 mt-14 items-stretch">
        ${g.plans
          .map(
            (p) => `
          <div class="reveal relative rounded-3xl p-7 sm:p-8 flex flex-col ${p.popular ? "popular md:-translate-y-3" : "card"}">
            ${p.popular ? `<div class="absolute -top-3 left-1/2 -translate-x-1/2 accent-bg text-black text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">Most popular</div>` : ""}
            <div class="text-zinc-300 font-semibold">${esc(p.name)}</div>
            <div class="mt-3 flex items-end gap-1">
              <span class="font-display text-6xl leading-none">${esc(p.price)}</span>
              <span class="text-zinc-500 mb-1">/ ${esc(p.period)}</span>
            </div>
            ${p.note ? `<div class="text-sm accent-text mt-2 font-medium">${esc(p.note)}</div>` : ""}
            <ul class="mt-6 space-y-3 text-sm text-zinc-300 flex-1">
              ${p.features.map((f) => `<li class="flex gap-3"><span class="accent-text shrink-0">${icon("check", "w-5 h-5")}</span><span>${esc(f)}</span></li>`).join("")}
            </ul>
            <a href="${wa(`Hi ${g.name}! I'm interested in the ${p.name} membership (${p.price} / ${p.period}). Please share the details.`)}"
               target="_blank" rel="noopener"
               class="mt-8 text-center rounded-full py-3.5 font-semibold ${p.popular ? "btn-accent" : "border border-white/15 hover:bg-white/5 transition"}">
              Choose ${esc(p.name)}
            </a>
          </div>`
          )
          .join("")}
      </div>
      ${g.plansNote ? `<p class="text-center text-xs text-zinc-500 mt-8">${esc(g.plansNote)}</p>` : ""}
    </section>`;

  const stars = Array.from({ length: 5 }, () => icon("star", "w-4 h-4")).join("");
  const why = `
    <section class="border-y border-white/10 bg-white/[0.02]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          ${sectionHead("Why train with us", "Everything you need. Nothing you don't.", "A clean, well-equipped space and trainers who actually care whether you reach your goal.")}
          ${
            g.rating
              ? `
          <a href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" target="_blank" rel="noopener"
             class="reveal mt-8 inline-flex items-center gap-4 card rounded-2xl px-5 py-4">
            <div class="font-display text-5xl leading-none">${esc(g.rating)}</div>
            <div>
              <div class="flex gap-0.5 accent-text">${stars}</div>
              <div class="text-sm text-zinc-400 mt-1">${esc(g.reviewCount || "")} reviews on Google</div>
            </div>
          </a>`
              : ""
          }
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${g.facilities
            .map(
              (f) => `
            <div class="reveal card rounded-2xl p-5 flex items-center gap-3">
              <span class="icon-tile w-9 h-9 rounded-lg grid place-items-center shrink-0">${icon("check", "w-5 h-5")}</span>
              <span class="font-medium">${esc(f)}</span>
            </div>`
            )
            .join("")}
        </div>
      </div>
    </section>`;

  const trial = `
    <section id="trial" class="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 grid lg:grid-cols-2 gap-10 lg:gap-16">
      <div>
        ${sectionHead("Free trial", "Your first session is on us", "Fill in your details and we will confirm your slot on WhatsApp.")}
        <div id="timings" class="reveal mt-10 card rounded-2xl p-6 scroll-mt-24">
          <div class="flex items-center gap-3 font-semibold"><span class="accent-text">${icon("clock", "w-5 h-5")}</span>Timings</div>
          <div class="mt-4 divide-y divide-white/10">
            ${g.timings
              .map(
                (t) => `
              <div class="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span class="text-zinc-300">${esc(t.days)}</span>
                <span class="text-zinc-400 text-sm sm:text-base">${esc(t.hours)}</span>
              </div>`
              )
              .join("")}
          </div>
        </div>
        <div class="reveal mt-4 card rounded-2xl p-6 flex items-start gap-3">
          <span class="accent-text mt-0.5">${icon("pin", "w-5 h-5")}</span>
          <div class="min-w-0">
            <div class="font-semibold">${esc(fullName)}</div>
            <div class="text-zinc-400 text-sm mt-1">${esc(g.address || g.area)}</div>
            <a href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" target="_blank" rel="noopener"
               class="inline-flex items-center gap-1 mt-3 text-sm font-semibold accent-text">Get directions ${icon("arrow", "w-4 h-4")}</a>
          </div>
        </div>
      </div>

      <form id="trial-form" class="reveal card rounded-3xl p-6 sm:p-8 space-y-4 self-start" novalidate>
        <div class="font-display text-3xl uppercase">Book a free trial</div>
        <label class="block">
          <span class="text-sm text-zinc-400">Your name</span>
          <input name="fullName" class="field mt-1.5" placeholder="e.g. Aman Verma" autocomplete="name" />
        </label>
        <label class="block">
          <span class="text-sm text-zinc-400">Mobile number</span>
          <input name="mobile" class="field mt-1.5" placeholder="10-digit mobile number" inputmode="numeric" autocomplete="tel" />
        </label>
        <div class="grid sm:grid-cols-2 gap-4">
          <label class="block">
            <span class="text-sm text-zinc-400">Your goal</span>
            <select name="goal" class="field mt-1.5">${g.goals.map((x) => `<option>${esc(x)}</option>`).join("")}</select>
          </label>
          <label class="block">
            <span class="text-sm text-zinc-400">Preferred time</span>
            <select name="slot" class="field mt-1.5">${g.slots.map((x) => `<option>${esc(x)}</option>`).join("")}</select>
          </label>
        </div>
        <p id="form-error" class="text-sm text-red-400" hidden></p>
        <button type="submit" class="btn-accent w-full rounded-full py-4 font-semibold inline-flex items-center justify-center gap-2">
          ${icon("chat", "w-5 h-5")} Book free trial on WhatsApp
        </button>
        <p class="text-xs text-zinc-500 text-center">We'll only contact you about your trial session.</p>
      </form>
    </section>`;

  const map = `
    <section id="location" class="px-4 sm:px-6 pb-20 scroll-mt-20">
      <div class="reveal max-w-7xl mx-auto rounded-3xl overflow-hidden border border-white/10 h-[320px] sm:h-[420px] bg-zinc-900">
        <iframe title="Map showing ${esc(fullName)}" class="map-dark w-full h-full" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed"></iframe>
      </div>
    </section>`;

  const footer = `
    <footer class="border-t border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-28 md:pb-10 flex flex-col md:flex-row gap-6 justify-between text-sm text-zinc-500">
        <div>
          <div class="font-display text-3xl text-white">${esc(g.name)}</div>
          <div>${esc(g.tagline)} · ${esc(g.area)}</div>
        </div>
        <div class="md:text-right">
          <a href="${tel}" class="text-zinc-300 hover:text-white transition">${esc(phonePretty)}</a>
          <div class="mt-1">© ${new Date().getFullYear()} ${esc(g.name)}</div>
          <div class="mt-3 text-xs">Website demo by <a href="${esc(DEMO.portfolio)}" target="_blank" rel="noopener" class="underline hover:text-zinc-300">${esc(DEMO.name)}</a></div>
        </div>
      </div>
    </footer>`;

  const mobileBar = `
    <div class="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-[#09090b]/90 backdrop-blur border-t border-white/10 grid grid-cols-2 gap-3">
      <a href="${tel}" class="rounded-full border border-white/15 py-3 text-center font-semibold">Call now</a>
      <a href="#trial" class="btn-accent rounded-full py-3 text-center font-semibold">Free trial</a>
    </div>`;

  const waFloat = `
    <a href="${wa(`Hi ${g.name}! I have a question about membership.`)}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"
       class="hidden md:grid fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full place-items-center bg-[#25D366] text-white shadow-lg shadow-black/40 hover:scale-105 transition">
      ${icon("chat", "w-7 h-7")}
    </a>`;

  app.innerHTML = demoBar + nav + "<main>" + hero + marquee + programs + offer + plans + why + trial + map + "</main>" + footer + mobileBar + waFloat;

  // ---------- Behaviour ----------

  const navEl = document.getElementById("nav");
  const onScroll = () => navEl.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  revealOnScroll();

  document.getElementById("trial-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    const name = String(d.fullName || "").trim();
    const mobile = String(d.mobile || "").replace(/\D/g, "").slice(-10);
    const err = document.getElementById("form-error");
    if (!name || mobile.length !== 10) {
      err.textContent = "Please enter your name and a valid 10-digit mobile number.";
      err.hidden = false;
      return;
    }
    err.hidden = true;
    const msg =
      `Hi ${g.name}! I'd like to book a FREE trial session.\n\n` +
      `Name: ${name}\nMobile: ${mobile}\nGoal: ${d.goal}\nPreferred time: ${d.slot}`;
    window.open(wa(msg), "_blank", "noopener");
  });

  // ---------- Helpers ----------

  function revealOnScroll() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
  }

  function renderPrivate() {
    document.title = "Private demo";
    app.innerHTML = `
      <main class="min-h-screen grid place-items-center px-4 text-center">
        <div>
          <div class="font-display text-5xl">Private demo</div>
          <p class="text-zinc-400 mt-2">Please open the link you received on WhatsApp.</p>
        </div>
      </main>`;
  }

  function renderIndex() {
    document.title = "Gym demos";
    app.innerHTML = `
      <main class="max-w-2xl mx-auto px-4 py-16">
        <h1 class="font-display text-5xl">Gym demos</h1>
        <p class="text-zinc-400 mt-2">Send each owner only their own link.</p>
        <div class="mt-8 space-y-3">
          ${Object.entries(gyms)
            .map(
              ([key, v]) => `
            <a href="?gym=${encodeURIComponent(key)}" class="card flex items-center justify-between gap-4 rounded-2xl p-5" style="--accent:${esc(v.accent || "#c6ff00")}">
              <div class="min-w-0">
                <div class="font-semibold">${esc(v.name)} <span class="text-zinc-500 font-normal">${esc(v.tagline || "")}</span></div>
                <div class="text-sm text-zinc-500 truncate">?gym=${esc(key)}</div>
              </div>
              <span class="w-4 h-4 rounded-full shrink-0" style="background:${esc(v.accent || "#c6ff00")}"></span>
            </a>`
            )
            .join("")}
        </div>
      </main>`;
  }
})();
