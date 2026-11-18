(function () {
  "use strict";

  const app = document.getElementById("app");
  const gyms = window.GYMS || {};
  const DEMO = window.DEMO_BY || { name: "", portfolio: "#" };
  const params = new URLSearchParams(location.search);
  const slug = params.get("gym");

  // ---------- Small helpers ----------
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const lines = (x) => (Array.isArray(x) ? x : [x]).map(esc).join("<br />");
  const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
  const merge = (a, b) => {
    const out = { ...a };
    for (const k in b) out[k] = isObj(a[k]) && isObj(b[k]) ? merge(a[k], b[k]) : b[k];
    return out;
  };

  const ICONS = {
    arrow: '<path d="M7 17 17 7M8 7h9v9"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  };
  const icon = (name, cls = "w-4 h-4") =>
    `<svg class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  // Without a valid ?gym=..., show a neutral page (or the full list with ?all=1)
  if (!slug || !gyms[slug]) {
    if (params.has("all")) renderIndex();
    else renderPrivate();
    return;
  }

  const g = merge(window.GYM_DEFAULTS, gyms[slug]);
  applyTheme(g.theme);
  document.title = `${g.name} · ${g.tagline}`;

  const fullName = `${g.name} ${g.tagline}`;
  const wa = (text) => `https://wa.me/${g.phone}?text=${encodeURIComponent(text)}`;
  const tel = `tel:+${g.phone}`;
  const phonePretty = `+${g.phone.slice(0, 2)} ${g.phone.slice(2, 7)} ${g.phone.slice(7)}`;
  const mapQuery = encodeURIComponent(g.address || `${fullName}, ${g.area}`);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const daysLeft = Math.ceil((new Date(`${g.offer.ends}T23:59:59`) - new Date()) / 86400000);
  const wrap = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  const ext = 'target="_blank" rel="noopener"';

  // Section heading: small label, big title, optional side text
  const head = (s, tone) => `
    <div class="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-5">
      <div>
        <div class="label ${tone === "dark" ? "text-accent" : "muted-light"}">${esc(s.label)}</div>
        <h2 class="font-head text-[clamp(2.6rem,6vw,4.75rem)] mt-4">${lines(s.title)}</h2>
      </div>
      ${s.text ? `<p class="text-sm max-w-xs ${tone === "dark" ? "muted-dark" : "muted-light"}">${esc(s.text)}</p>` : ""}
    </div>`;

  // ---------- Sections ----------

  const demoBar = `
    <div class="bg-white text-black text-[11px] sm:text-xs text-center px-4 py-2 font-medium">
      Website demo prepared for <b>${esc(g.name)}</b> by ${esc(DEMO.name)} · not the official website
    </div>`;

  const nav = `
    <header id="nav" class="bg-dark sticky top-0 z-40 border-b line-dark">
      <div class="${wrap} h-16 flex items-center justify-between gap-4">
        <a href="#top" class="font-head text-2xl sm:text-[1.75rem] tracking-wide truncate">${esc(g.name)}<span class="text-accent text-sm align-top ml-0.5">●</span></a>
        <nav class="hidden md:flex items-center gap-10 text-xs muted-dark">
          <a href="#programs" class="hover:text-white transition">Programs</a>
          <a href="#why" class="hover:text-white transition">Why us</a>
          <a href="#plans" class="hover:text-white transition">Membership</a>
          <a href="#visit" class="hover:text-white transition">Visit</a>
        </nav>
        <a href="#trial" class="btn btn-accent btn-sm shrink-0">Free pass ${icon("arrow")}</a>
      </div>
    </header>`;

  const hero = `
    <section id="top" class="bg-dark relative overflow-hidden">
      <div class="${wrap} relative z-10 pt-12 pb-14 lg:pt-28 lg:pb-32">
        <div class="lg:w-[46%]">
          <div class="reveal label text-accent">${esc(g.eyebrow)}</div>
          <h1 class="reveal font-head text-[clamp(3.4rem,8vw,7rem)] mt-5">${lines(g.headline)}</h1>
          <p class="reveal mt-6 max-w-md text-sm sm:text-base muted-dark leading-relaxed">${esc(g.subheadline)}</p>
          <div class="reveal mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#trial" class="btn btn-accent">Start your journey ${icon("arrow")}</a>
            <a href="#programs" class="btn btn-outline-light">Explore programs ${icon("arrow")}</a>
          </div>
          <div class="reveal label text-[10px] muted-dark mt-8">${esc(g.heroNote)}</div>
        </div>
      </div>
      <div class="relative h-[440px] sm:h-[540px] lg:h-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-[56%]">
        <img src="${esc(g.images.hero)}" alt="Training at ${esc(g.name)}" class="img-cover" fetchpriority="high" />
        <div class="absolute inset-0 hero-fade"></div>
        <div class="absolute right-4 bottom-4 sm:right-8 sm:bottom-8 bg-accent px-5 py-4 sm:px-7 sm:py-5">
          <div class="font-head text-3xl sm:text-4xl">${esc(g.callout[0])}</div>
          <div class="label text-[10px] mt-1.5 opacity-80">${esc(g.callout[1])}</div>
        </div>
      </div>
    </section>`;

  const phrase = g.marquee
    .map((m) => `<span class="px-8 sm:px-12">${esc(m)}</span><span class="opacity-60">×</span>`)
    .join("");
  const marquee = `
    <div class="bg-accent overflow-hidden py-4" aria-hidden="true">
      <div class="marquee font-head text-xl sm:text-2xl whitespace-nowrap">${phrase.repeat(3)}${phrase.repeat(3)}</div>
    </div>`;

  const programs = `
    <section id="programs" class="bg-light scroll-mt-16">
      <div class="${wrap} py-20 lg:py-28">
        ${head(g.programsSection, "light")}
        <div class="grid md:grid-cols-3 gap-6 lg:gap-8 mt-12">
          ${g.programs
            .map(
              (p, i) => `
            <a href="${wa(`Hi ${g.name}! I'm interested in ${p.title}. Please share the details.`)}" ${ext} class="group reveal block">
              <div class="zoom relative aspect-[4/3] bg-light2">
                <img src="${esc(g.images.programs[i] || g.images.about)}" alt="${esc(p.title)} at ${esc(g.name)}" loading="lazy" class="img-cover" />
                <span class="absolute left-3 top-3 bg-accent font-head text-base px-2 py-1">0${i + 1}</span>
              </div>
              <div class="mt-5 flex items-start justify-between gap-3">
                <h3 class="font-head text-3xl">${esc(p.title)}</h3>
                <span class="mt-1 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">${icon("arrow", "w-5 h-5")}</span>
              </div>
              <div class="font-semibold text-sm mt-1.5">${esc(p.sub)}</div>
              <p class="text-sm muted-light mt-2 leading-relaxed">${esc(p.text)}</p>
            </a>`
            )
            .join("")}
        </div>
        ${
          g.extras.length
            ? `<div class="reveal mt-14 flex flex-wrap items-center gap-2 text-sm">
                <span class="label muted-light mr-2">Also at ${esc(g.name)}</span>
                ${g.extras.map((e) => `<span class="border line-light px-3 py-1.5">${esc(e)}</span>`).join("")}
              </div>`
            : ""
        }
      </div>
    </section>`;

  const about = `
    <section id="why" class="bg-dark scroll-mt-16">
      <div class="${wrap} py-20 lg:py-28 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div class="reveal relative mb-6">
          <div class="aspect-[5/4] lg:aspect-[4/5] overflow-hidden">
            <img src="${esc(g.images.about)}" alt="Inside ${esc(g.name)}" loading="lazy" class="img-cover" />
          </div>
          <div class="absolute -bottom-6 right-4 sm:right-8 bg-accent px-6 py-5">
            <div class="font-head text-3xl">${esc(g.about.callout[0])}</div>
            <div class="label text-[10px] mt-1.5 opacity-80">${esc(g.about.callout[1])}</div>
          </div>
        </div>
        <div>
          <div class="reveal label text-accent">${esc(g.about.label)}</div>
          <h2 class="reveal font-head text-[clamp(2.6rem,5.5vw,4.5rem)] mt-4">${lines(g.about.title)}</h2>
          <p class="reveal mt-6 max-w-md text-sm sm:text-base muted-dark leading-relaxed">${esc(g.about.text)}</p>
          <ol class="mt-10 space-y-6">
            ${g.about.points
              .map(
                (p, i) => `
              <li class="reveal grid grid-cols-[2.5rem_1fr]">
                <span class="label text-accent pt-0.5">0${i + 1}</span>
                <div>
                  <div class="label text-white">${esc(p.title)}</div>
                  <div class="text-sm muted-dark mt-1.5">${esc(p.text)}</div>
                </div>
              </li>`
              )
              .join("")}
          </ol>
          <div class="reveal mt-10 flex flex-wrap gap-2">
            ${g.facilities.map((f) => `<span class="border line-dark px-3 py-1.5 text-xs muted-dark">${esc(f)}</span>`).join("")}
          </div>
        </div>
      </div>
    </section>`;

  const plans = `
    <section id="plans" class="bg-light scroll-mt-16">
      <div class="${wrap} py-20 lg:py-28">
        ${head(g.plansSection, "light")}
        <div class="grid md:grid-cols-3 gap-5 mt-12">
          ${g.plans
            .map(
              (p) => `
            <div class="reveal flex flex-col p-6 sm:p-8 ${p.popular ? "bg-accent" : "bg-light2"}">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="font-head text-2xl">${esc(p.name)}</div>
                  <div class="text-xs mt-1 opacity-70">${esc(p.sub)}</div>
                </div>
                ${p.popular ? `<span class="bg-dark text-white label text-[9px] px-2.5 py-1.5 whitespace-nowrap">Most popular</span>` : ""}
              </div>
              <div class="mt-8 flex items-end gap-2">
                <span class="font-head text-6xl">${esc(p.price)}</span>
                <span class="text-xs opacity-70 mb-1.5">/ ${esc(p.period)}</span>
              </div>
              <ul class="border-t ${p.popular ? "border-black/15" : "line-light"} mt-6 pt-6 space-y-3 text-sm flex-1">
                ${p.features.map((f) => `<li class="flex gap-3">${icon("check")}<span>${esc(f)}</span></li>`).join("")}
              </ul>
              <a href="${wa(`Hi ${g.name}! I'm interested in the ${p.name} membership (${p.price} / ${p.period}). Please share the details.`)}" ${ext}
                 class="btn ${p.popular ? "btn-dark" : "btn-outline-dark"} mt-8 w-full">Choose ${esc(p.name)} ${icon("arrow")}</a>
            </div>`
            )
            .join("")}
        </div>
        <div class="reveal mt-10 flex flex-col md:flex-row md:items-center gap-2 md:gap-8 text-sm">
          <span class="font-bold uppercase tracking-wide text-xs">Not sure where to start?</span>
          <span class="muted-light">Try us out. Your first session is on us.</span>
          <a href="#trial" class="md:ml-auto mt-2 md:mt-0 font-bold uppercase tracking-wide text-xs inline-flex items-center gap-2">Claim your free day pass ${icon("arrow")}</a>
        </div>
        ${g.plansNote ? `<p class="text-xs muted-light mt-8">${esc(g.plansNote)}</p>` : ""}
      </div>
    </section>`;

  const c = g.community;
  const community = `
    <section class="bg-dark">
      <div class="${wrap} py-20 lg:py-28">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div class="reveal label text-accent">${esc(c.label)}</div>
            <h2 class="reveal font-head text-[clamp(2.4rem,4.4vw,4rem)] mt-4">${lines(c.title)}</h2>
            <p class="reveal mt-6 max-w-md text-sm sm:text-base muted-dark leading-relaxed">${esc(c.text)}</p>
            <div class="reveal label text-accent mt-10">${esc(c.kicker)}</div>
            <p class="reveal mt-3 text-sm muted-dark">${esc(c.text2)}</p>
          </div>
          <figure class="reveal bg-dark2 p-8 sm:p-10">
            <div class="font-head text-7xl text-accent leading-none h-10">“</div>
            <blockquote class="font-head text-3xl sm:text-4xl mt-4 leading-[1.02]">${esc(c.quote)}</blockquote>
            <figcaption class="border-t line-dark mt-8 pt-6 flex items-end justify-between gap-4">
              <div>
                <div class="label text-white">${esc(c.quoteBy || `The ${g.name} team`)}</div>
                <div class="text-xs muted-dark mt-1.5">${esc(c.quoteRole)}</div>
              </div>
              ${
                g.rating
                  ? `<a href="${mapsLink}" ${ext} class="text-right">
                      <div class="font-head text-3xl text-accent">${esc(g.rating)} ★</div>
                      <div class="text-xs muted-dark">${esc(g.reviewCount || "")} Google reviews</div>
                    </a>`
                  : ""
              }
            </figcaption>
          </figure>
        </div>
        <div class="mt-16 pt-6 border-t line-dark flex flex-col sm:flex-row justify-between gap-2 label text-[10px]">
          <span class="muted-dark">${esc(c.footLeft)}</span>
          <span class="text-accent">${esc(c.footRight)}</span>
        </div>
      </div>
    </section>`;

  const visit = `
    <section id="visit" class="bg-light scroll-mt-16">
      <div class="${wrap} py-20 lg:py-28">
        ${head(g.visit, "light")}
        <div class="grid lg:grid-cols-[1fr_1.4fr] gap-5 mt-12">
          <div class="reveal bg-light2 p-6 sm:p-8 flex flex-col">
            <div class="label muted-light flex items-center gap-2">${icon("clock")} Timings</div>
            <div class="mt-3 divide-y divide-black/10">
              ${g.timings
                .map(
                  (t) => `
                <div class="py-3.5">
                  <div class="font-semibold text-sm">${esc(t.days)}</div>
                  <div class="text-sm muted-light mt-0.5">${esc(t.hours)}</div>
                </div>`
                )
                .join("")}
            </div>
            <div class="label muted-light flex items-center gap-2 mt-8">${icon("pin")} Address</div>
            <div class="mt-3 font-semibold text-sm">${esc(fullName)}</div>
            <div class="text-sm muted-light mt-0.5">${esc(g.address || g.area)}</div>
            <div class="mt-auto pt-8 flex flex-col sm:flex-row gap-3">
              <a href="${mapsLink}" ${ext} class="btn btn-dark">Get directions ${icon("arrow")}</a>
              <a href="${tel}" class="btn btn-outline-dark">Call ${esc(phonePretty)}</a>
            </div>
          </div>
          <div class="reveal bg-light2 min-h-[340px]">
            <iframe title="Map showing ${esc(fullName)}" class="map-gray w-full h-full min-h-[340px] block" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed"></iframe>
          </div>
        </div>
      </div>
    </section>`;

  const trial = `
    <section id="trial" class="bg-accent scroll-mt-16">
      <div class="${wrap} py-20 lg:py-24 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
        <div class="reveal">
          ${
            daysLeft > 0
              ? `<div class="inline-flex items-center gap-2 bg-dark text-white label text-[10px] px-3 py-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>${esc(g.offer.title)} · ${daysLeft} days left
                </div>`
              : ""
          }
          <h2 class="font-head text-[clamp(3rem,7vw,6.25rem)] mt-6">${lines(g.cta.title)}</h2>
          <p class="mt-5 max-w-md text-sm sm:text-base opacity-80 leading-relaxed">${esc(g.cta.text)}</p>
          ${daysLeft > 0 ? `<p class="label text-[10px] mt-6 opacity-70">${esc(g.offer.text)}</p>` : ""}
        </div>
        <form id="trial-form" class="reveal bg-dark text-white p-6 sm:p-8 space-y-4" novalidate>
          <div class="font-head text-3xl">Get your free day pass</div>
          <label class="block">
            <span class="label text-[10px] muted-dark">Your name</span>
            <input name="fullName" class="field mt-2" placeholder="e.g. Aman Verma" autocomplete="name" />
          </label>
          <label class="block">
            <span class="label text-[10px] muted-dark">Mobile number</span>
            <input name="mobile" class="field mt-2" placeholder="10-digit mobile number" inputmode="numeric" autocomplete="tel" />
          </label>
          <div class="grid sm:grid-cols-2 gap-4">
            <label class="block">
              <span class="label text-[10px] muted-dark">Your goal</span>
              <select name="goal" class="field mt-2">${g.goals.map((x) => `<option>${esc(x)}</option>`).join("")}</select>
            </label>
            <label class="block">
              <span class="label text-[10px] muted-dark">Preferred time</span>
              <select name="slot" class="field mt-2">${g.slots.map((x) => `<option>${esc(x)}</option>`).join("")}</select>
            </label>
          </div>
          <p id="form-error" class="text-sm text-red-400" hidden></p>
          <button type="submit" class="btn btn-accent w-full">Get my free day pass ${icon("arrow")}</button>
          <p class="label text-[10px] muted-dark">No pressure. No commitment. Just show up.</p>
        </form>
      </div>
    </section>`;

  const footCol = (title, links) => `
    <div>
      <div class="label text-accent">${esc(title)}</div>
      <ul class="mt-4 space-y-2.5 text-sm muted-dark">
        ${links
          .map(
            ([text, href, external]) =>
              `<li><a href="${href}" ${external ? ext : ""} class="hover:text-white transition inline-flex items-center gap-1">${esc(text)}${external ? icon("arrow", "w-3 h-3") : ""}</a></li>`
          )
          .join("")}
      </ul>
    </div>`;

  const footer = `
    <footer class="bg-dark border-t line-dark">
      <div class="${wrap} pt-16 pb-28 md:pb-10">
        <div class="grid sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          <div>
            <div class="font-head text-5xl">${esc(g.name)}<span class="text-accent text-lg align-top ml-1">●</span></div>
            <p class="text-sm muted-dark mt-3">${esc(g.footerTag)}</p>
          </div>
          ${footCol("The gym", [["Programs", "#programs"], ["Membership", "#plans"], ["Timings", "#visit"]])}
          ${footCol("Come through", [["Get directions", mapsLink, true], ["Free day pass", "#trial"], ["Call us", tel]])}
          ${footCol("Stay connected", [["WhatsApp", wa(`Hi ${g.name}! I have a question about membership.`), true], [phonePretty, tel]])}
        </div>
        <div class="mt-14 pt-6 border-t line-dark flex flex-col sm:flex-row justify-between gap-3 label text-[10px] muted-dark">
          <span>© ${new Date().getFullYear()} ${esc(fullName)}</span>
          <span>Website demo by <a href="${esc(DEMO.portfolio)}" ${ext} class="underline hover:text-white">${esc(DEMO.name)}</a></span>
        </div>
      </div>
    </footer>`;

  const mobileBar = `
    <div class="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-dark border-t line-dark grid grid-cols-2 gap-3">
      <a href="${tel}" class="btn btn-outline-light justify-center">Call now</a>
      <a href="#trial" class="btn btn-accent justify-center">Free pass</a>
    </div>`;

  const waFloat = `
    <a href="${wa(`Hi ${g.name}! I have a question about membership.`)}" ${ext} aria-label="Chat on WhatsApp"
       class="hidden md:grid fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full place-items-center bg-[#25D366] text-white shadow-lg shadow-black/40 hover:scale-105 transition">
      ${icon("chat", "w-7 h-7")}
    </a>`;

  app.innerHTML =
    demoBar + nav + "<main>" + hero + marquee + programs + about + plans + community + visit + trial + "</main>" + footer + mobileBar + waFloat;

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

  // ---------- Functions ----------

  function applyTheme(t) {
    const root = document.documentElement.style;
    const dark = t.dark || "#121212";
    const light = t.light || "#f1f0ea";
    root.setProperty("--accent", t.accent);
    root.setProperty("--dark", dark);
    root.setProperty("--dark-2", mix(dark, "#ffffff", 0.06));
    root.setProperty("--light", light);
    root.setProperty("--light-2", mix(light, "#000000", 0.055));
    root.setProperty("--ink", dark);
    // Pick black or white text on the accent colour, whichever reads better
    const L = luminance(t.accent);
    root.setProperty("--on-accent", (L + 0.05) / 0.05 >= 1.05 / (L + 0.05) ? "#111111" : "#ffffff");
  }

  function rgb(hex) {
    let h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function mix(a, b, t) {
    const A = rgb(a);
    const B = rgb(b);
    return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
  }
  function luminance(hex) {
    const [r, g2, b] = rgb(hex).map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g2 + 0.0722 * b;
  }

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
          <div class="font-head text-5xl">Private demo</div>
          <p class="muted-dark mt-2">Please open the link you received on WhatsApp.</p>
        </div>
      </main>`;
  }

  function renderIndex() {
    document.title = "Gym demos";
    app.innerHTML = `
      <main class="max-w-2xl mx-auto px-4 py-16">
        <h1 class="font-head text-5xl">Gym demos</h1>
        <p class="muted-dark mt-2">Send each owner only their own link.</p>
        <div class="mt-8 space-y-3">
          ${Object.entries(gyms)
            .map(([key, v]) => {
              const accent = esc((v.theme && v.theme.accent) || "#d4f53c");
              return `
            <a href="?gym=${encodeURIComponent(key)}" class="flex items-center justify-between gap-4 p-5 border line-dark hover:bg-white/5 transition">
              <div class="min-w-0">
                <div class="font-semibold">${esc(v.name)} <span class="muted-dark font-normal">${esc(v.tagline || "")}</span></div>
                <div class="text-sm muted-dark truncate">?gym=${esc(key)}</div>
              </div>
              <span class="w-4 h-4 shrink-0" style="background:${accent}"></span>
            </a>`;
            })
            .join("")}
        </div>
      </main>`;
  }
})();
