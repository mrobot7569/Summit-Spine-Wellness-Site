/**
 * AI Studio parity navbar: transparent over hero, mega-menu, dark mobile drawer
 */
(function () {
  const cfg = window.SSW || {};
  const data = window.SSW_DATA || {};
  const all = data.allServicesData || [];
  const base = document.body.dataset.navBase || "";
  const mode = document.body.dataset.navMode || "home"; // home | solid | special
  const active = document.body.dataset.navActive || "";

  const logoDark = base + (cfg.assets?.logo || "images/logo/summit-spine-logo.png");
  const logoWhite = base + (cfg.assets?.logoWhite || "images/logo/summit-spine-logo-white.png");

  const megaSections = [
    {
      title: "Clinical Chiropractic & Diagnostics",
      description: "Precision alignment & digital radiography and safety consults",
      badge: "Diagnostic & Adjustments",
      services: ["chiro", "decompression", "prenatal", "accident", "xray"]
    },
    {
      title: "Clinical Rehab & Movement",
      description: "Strength, specialized posturing & dynamic joint taping",
      badge: "Movement & Posture",
      services: ["rehab", "exercises", "taping"]
    },
    {
      title: "Advanced Recovery & Pain Relief",
      description: "High-frequency trigger release, medical massage & thermal detox",
      badge: "Tissue & Cellular Therapy",
      services: ["needling", "massage", "red-light", "sauna", "cupping", "estim"]
    }
  ];

  const secondary = [
    { name: "CONDITIONS TREATED", href: mode === "home" ? "#conditions" : "/conditions/" },
    { name: "ABOUT", href: mode === "home" ? "#dr-hiebert" : "/about/" },
    { name: "CONTACT", href: mode === "home" ? "#find-us" : "/contact/" }
  ];

  function svc(id) {
    return all.find((s) => s.id === id);
  }

  const root = document.getElementById("site-nav");
  if (!root) return;

  root.innerHTML = `
  <nav id="main-navbar" class="ssw-navbar ${mode === "special" ? "is-special" : mode === "solid" ? "is-scrolled" : ""}" aria-label="Primary">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <a href="/" class="flex items-center group shrink-0" aria-label="Summit Spine & Wellness home">
          <img id="nav-logo" src="${mode === "solid" ? logoDark : logoWhite}" alt="Summit Spine & Wellness" class="nav-logo w-auto object-contain transition-all duration-300 group-hover:scale-105">
        </a>

        <div class="hidden lg:flex items-center gap-8">
          <div class="flex gap-6 items-center">
            <div class="relative py-2" id="mega-wrap">
              <button type="button" id="mega-trigger" class="nav-text-btn flex items-center gap-1 font-sans text-xs sm:text-sm font-bold uppercase tracking-widest transition-all">
                <span>SERVICES</span>
                <svg class="w-3.5 h-3.5 mega-chevron transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </div>
            ${secondary
              .map(
                (l) =>
                  `<a href="${l.href}" class="nav-text-btn font-sans text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors">${l.name}</a>`
              )
              .join("")}
          </div>
          <div class="flex items-center gap-4">
            <a href="/new-patient-special/" class="hidden xl:inline-flex text-xs font-bold uppercase tracking-wider text-brand-teal-700 bg-brand-teal-100 hover:bg-brand-teal-50 px-4 py-2 rounded-lg border border-brand-teal-200 transition-colors">Special Offer</a>
            <button type="button" data-open-booking class="inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-brand-green-600 hover:bg-brand-teal-600 shadow-md px-5 py-2.5 rounded-xl transition-all hover:-translate-y-0.5">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              Request Appointment
            </button>
          </div>
        </div>

        <div class="lg:hidden flex items-center gap-2.5">
          <a href="${cfg.phoneHref || "tel:+18175550199"}" class="p-2.5 rounded-xl text-brand-green-600 bg-brand-green-50 hover:bg-brand-green-100 border border-brand-green-100 shadow-sm" aria-label="Call clinic">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
          <button type="button" id="nav-toggle" class="p-2.5 rounded-xl text-slate-700 bg-slate-100/90 hover:bg-slate-200 border border-slate-200/50" aria-label="Open menu" aria-expanded="false">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
    </div>

    <div id="mega-menu" class="mega-menu hidden" aria-hidden="true">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div class="grid grid-cols-12 gap-8">
          <div class="col-span-9 grid grid-cols-3 gap-6 pr-6 border-r border-slate-100">
            ${megaSections
              .map(
                (section) => `
              <div class="space-y-4">
                <div class="space-y-1.5 pb-2 border-b border-slate-100">
                  <span class="text-[10px] font-extrabold font-mono tracking-wider text-brand-green-600 bg-brand-green-50/80 px-2.5 py-0.5 rounded-full uppercase">${section.badge}</span>
                  <h4 class="font-display font-extrabold text-sm text-slate-900 tracking-tight mt-1.5 leading-tight">${section.title}</h4>
                  <p class="text-[11px] text-slate-400 leading-relaxed">${section.description}</p>
                </div>
                <div class="grid grid-cols-1 gap-1">
                  ${section.services
                    .map((id) => {
                      const s = svc(id);
                      if (!s) return "";
                      return `<button type="button" data-open-booking data-service="${id}" class="group flex items-start text-left p-2 rounded-xl transition-all hover:bg-slate-50 w-full">
                        <div class="p-1.5 rounded-lg bg-teal-50 text-brand-teal-600 group-hover:bg-brand-teal-500 group-hover:text-white transition-all mr-2.5 mt-0.5 shrink-0">
                          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
                        </div>
                        <div class="min-w-0">
                          <p class="text-xs font-bold text-slate-800 uppercase tracking-wider group-hover:text-brand-green-600">${s.name}</p>
                          <p class="text-[10px] text-slate-500 line-clamp-1 mt-0.5">${s.description}</p>
                        </div>
                      </button>`;
                    })
                    .join("")}
                </div>
              </div>`
              )
              .join("")}
          </div>
          <div class="col-span-3 flex flex-col justify-between bg-zinc-50 border border-slate-100 p-6 rounded-2xl relative overflow-hidden shadow-sm">
            <div class="space-y-4 relative z-10">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1 bg-brand-yellow-400 text-brand-green-950 px-2.5 py-1 rounded-full font-mono text-[8px] font-extrabold uppercase tracking-widest">★ Exclusive Promotion</span>
                <span class="font-mono text-[10px] font-bold text-emerald-600">Active Special</span>
              </div>
              <div>
                <h4 class="font-display font-black text-lg text-slate-900 tracking-tight leading-snug">$99 New Patient Clinical Starter</h4>
                <p class="text-[11px] text-slate-500 mt-2 leading-relaxed">Includes fully detailed spine consultation, posture biomechanics analysis, diagnostic digital x-rays if needed, and customized care path plan.</p>
              </div>
              <div class="py-2 px-2.5 bg-white rounded-xl border border-slate-100 text-left space-y-1">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PROMO INCLUDES</p>
                <p class="text-[11px] font-bold text-slate-700">• Comprehensive Doctor Consult</p>
                <p class="text-[11px] font-bold text-slate-700">• Digital Biomechanical X-Rays</p>
              </div>
            </div>
            <a href="/new-patient-special/" class="w-full mt-6 py-3 bg-brand-green-600 hover:bg-brand-teal-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all font-mono shadow-md flex items-center justify-center gap-2">Claim Special Offer →</a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div id="mobile-drawer" class="mobile-drawer" aria-hidden="true">
    <div class="flex justify-between items-center pb-6 border-b border-white/15">
      <a href="/" class="flex items-center"><img src="${logoWhite}" alt="Summit Spine" class="h-12 w-auto object-contain"></a>
      <button type="button" id="nav-close" class="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-neutral-300" aria-label="Close">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <div class="py-8 space-y-6 flex-1 flex flex-col justify-center">
      <span class="block text-[10px] font-mono tracking-widest text-[#d4af37] font-bold uppercase">🧭 EXPLORE PATHWAYS</span>
      <div class="space-y-5">
        <div class="border-b border-white/10 pb-4">
          <button type="button" id="mobile-services-toggle" class="w-full flex items-center justify-between text-2xl font-display font-extrabold text-white/95 hover:text-brand-yellow-400 text-left">
            <span class="flex items-baseline gap-3"><span class="font-mono text-xs text-brand-yellow-400/40 font-bold">01</span><span>SERVICES</span></span>
            <svg class="w-5 h-5 text-brand-yellow-400 transition-transform" id="mobile-services-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div id="mobile-services-list" class="hidden mt-4 pl-6 grid grid-cols-1 gap-2 max-h-[30vh] overflow-y-auto">
            ${all
              .map(
                (s) => `<button type="button" data-open-booking data-service="${s.id}" class="flex items-start text-left p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-brand-yellow-400/20 w-full">
                <span class="w-1.5 h-1.5 rounded-full bg-brand-yellow-400 mr-2.5 mt-2 shrink-0"></span>
                <div><p class="text-xs font-bold text-white uppercase tracking-wider">${s.name}</p><p class="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">${s.description}</p></div>
              </button>`
              )
              .join("")}
          </div>
        </div>
        ${secondary
          .map(
            (l, i) => `<a href="${l.href}" class="mobile-drawer-link flex items-baseline gap-3 text-2xl font-display font-extrabold text-white/95 hover:text-brand-yellow-400 border-b border-white/10 pb-4">
            <span class="font-mono text-xs text-brand-yellow-400/40 font-bold">0${i + 2}</span><span>${l.name}</span>
          </a>`
          )
          .join("")}
        <a href="/new-patient-special/" class="mobile-drawer-link flex items-baseline gap-3 text-2xl font-display font-extrabold text-white/95 hover:text-brand-yellow-400 border-b border-white/10 pb-4">
          <span class="font-mono text-xs text-brand-yellow-400/40 font-bold">0${secondary.length + 2}</span><span>NEW PATIENT SPECIAL</span>
        </a>
      </div>
    </div>
    <div class="mb-8 bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
      <div class="flex items-center justify-between">
        <span class="bg-brand-yellow-400 text-brand-green-950 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">★ SPECIAL LAUNCH PRICING</span>
        <span class="font-mono text-xs font-bold text-slate-300">Active Promo</span>
      </div>
      <div>
        <h4 class="font-display font-bold text-lg text-white">$99 New Patient Special</h4>
        <p class="text-xs text-neutral-300 font-light mt-1.5 leading-relaxed">Includes full pelvic alignment, consult with Dr. Hiebert, x-ray assessment, diagnostics review, and optimal pain plans.</p>
      </div>
      <a href="/new-patient-special/" class="block w-full py-3 bg-brand-yellow-400 hover:bg-brand-yellow-500 text-brand-green-950 font-extrabold text-xs uppercase tracking-widest rounded-xl text-center font-mono">Claim Special Offer →</a>
    </div>
    <div class="pt-4 border-t border-white/10 space-y-4">
      <div class="flex flex-col gap-1 text-xs text-neutral-400">
        <span class="text-white font-semibold">📍 6416 Colleyville Blvd, Suite 108</span>
        <span>Mon-Thu: 9am-1pm & 2:30pm-6pm | Fri: 9am-1pm</span>
        <a href="${cfg.phoneHref || "tel:+18175550199"}" class="text-brand-yellow-400 hover:underline font-bold mt-1">📞 Call Clinic: ${cfg.phone || "(817) 555-0199"}</a>
      </div>
      <div class="flex justify-between items-center text-[10px] text-neutral-500 pt-2 font-mono uppercase">
        <span>© ${new Date().getFullYear()} SUMMIT SPINE</span>
        <div class="flex gap-3"><span>FB</span><span>IG</span><span>GMB</span></div>
      </div>
    </div>
  </div>
  `;

  const navbar = document.getElementById("main-navbar");
  const logo = document.getElementById("nav-logo");
  const mega = document.getElementById("mega-menu");
  const megaWrap = document.getElementById("mega-wrap");
  const megaTrigger = document.getElementById("mega-trigger");
  const drawer = document.getElementById("mobile-drawer");
  const toggle = document.getElementById("nav-toggle");
  const closeBtn = document.getElementById("nav-close");

  let megaOpen = false;
  let drawerOpen = false;

  function setScrolled(scrolled) {
    if (mode === "special" || mode === "solid") {
      if (mode === "solid") {
        navbar.classList.add("is-scrolled");
        logo.src = logoDark;
      }
      return;
    }
    navbar.classList.toggle("is-scrolled", scrolled);
    logo.src = scrolled ? logoDark : logoWhite;
  }

  function setMega(open) {
    megaOpen = open;
    mega.classList.toggle("hidden", !open);
    mega.setAttribute("aria-hidden", open ? "false" : "true");
    megaTrigger?.classList.toggle("is-open", open);
    document.querySelector(".mega-chevron")?.classList.toggle("rotate-180", open);
  }

  function setDrawer(open) {
    drawerOpen = open;
    document.body.classList.toggle("menu-open", open);
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    toggle?.setAttribute("aria-expanded", String(open));
  }

  window.addEventListener(
    "scroll",
    () => setScrolled(window.scrollY > 10),
    { passive: true }
  );
  setScrolled(window.scrollY > 10);

  megaWrap?.addEventListener("mouseenter", () => setMega(true));
  megaWrap?.addEventListener("mouseleave", () => setMega(false));
  mega?.addEventListener("mouseenter", () => setMega(true));
  mega?.addEventListener("mouseleave", () => setMega(false));
  megaTrigger?.addEventListener("click", () => setMega(!megaOpen));

  toggle?.addEventListener("click", () => setDrawer(true));
  closeBtn?.addEventListener("click", () => setDrawer(false));
  drawer?.querySelectorAll("a.mobile-drawer-link, a[href^='/'], a[href^='#']").forEach((a) => {
    a.addEventListener("click", () => setDrawer(false));
  });

  document.getElementById("mobile-services-toggle")?.addEventListener("click", () => {
    const list = document.getElementById("mobile-services-list");
    const chev = document.getElementById("mobile-services-chevron");
    list?.classList.toggle("hidden");
    chev?.classList.toggle("rotate-180");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setMega(false);
      setDrawer(false);
    }
  });

  // Sticky mobile CTA (AI Studio style)
  if (!document.getElementById("mobile-sticky-cta")) {
    const bar = document.createElement("div");
    bar.id = "mobile-sticky-cta";
    bar.className = "mobile-sticky-cta lg:hidden";
    bar.innerHTML = `
      <div class="mobile-sticky-cta__inner">
        <a href="${cfg.phoneHref || "tel:+18175550199"}" class="mobile-sticky-cta__btn mobile-sticky-cta__btn--call">
          <span class="mobile-sticky-cta__label">Call</span>
          <span class="mobile-sticky-cta__value">${cfg.phone || "(817) 555-0199"}</span>
        </a>
        <button type="button" data-open-booking class="mobile-sticky-cta__btn mobile-sticky-cta__btn--book">
          <span class="mobile-sticky-cta__label">Book</span>
          <span class="mobile-sticky-cta__value">Appointment</span>
        </button>
      </div>`;
    document.body.appendChild(bar);
  }
})();
