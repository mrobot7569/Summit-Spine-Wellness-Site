/**
 * Homepage interactions: services filter/detail, conditions, testimonials, special offer
 */
(function () {
  const data = window.SSW_DATA || {};
  const services = data.servicesData || data.allServicesData?.slice(0, 6) || [];
  const all = data.allServicesData || services;
  const conditions = data.conditionsData || [];
  const testimonials = data.testimonialsData || [];
  const faqs = data.faqsData || [];

  let filter = "all";
  let matchedIds = [];
  let testimonialIdx = 0;

  function catLabel(cat) {
    if (cat === "chiropractic") return "Joint Alignment";
    if (cat === "specialized") return "Computerized Structural";
    return "Athletic Recovery Soft-Tissue";
  }

  function renderServices() {
    const grid = document.getElementById("services-grid");
    if (!grid) return;
    const list = services.filter((s) => filter === "all" || s.category === filter);
    grid.innerHTML = list
      .map((s) => {
        const match = matchedIds.includes(s.id);
        return `<div class="service-card-ai ${match ? "is-match" : ""}" data-service-id="${s.id}">
          ${match ? `<span class="service-match-badge">⚡ Ideal Match</span>` : ""}
          <div class="space-y-4">
            <span class="service-card__cat">${catLabel(s.category)}</span>
            <h3 class="font-display font-extrabold text-xl text-white tracking-tight leading-snug">${s.name}</h3>
            <p class="text-xs text-neutral-300 leading-relaxed min-h-[50px] line-clamp-3">${s.description}</p>
          </div>
          <div class="pt-6 mt-6 border-t border-white/5 flex gap-2">
            <button type="button" class="flex-1 py-2.5 border border-white/15 hover:bg-white/10 rounded-xl text-xs font-bold text-neutral-200" data-service-info="${s.id}">More Info</button>
            <button type="button" class="flex-1 py-2.5 bg-brand-green-500 hover:bg-brand-green-600 text-white rounded-xl text-xs font-bold" data-open-booking data-service="${s.id}">Book Session</button>
          </div>
        </div>`;
      })
      .join("");

    grid.querySelectorAll("[data-service-info]").forEach((btn) => {
      btn.addEventListener("click", () => openDetail(btn.getAttribute("data-service-info")));
    });
  }

  function openDetail(id) {
    const s = all.find((x) => x.id === id) || services.find((x) => x.id === id);
    if (!s) return;
    let modal = document.getElementById("service-detail-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "service-detail-modal";
      document.body.appendChild(modal);
    }
    modal.className = "service-detail-modal";
    modal.innerHTML = `
      <div class="service-detail-modal__backdrop" data-close-detail></div>
      <div class="service-detail-modal__panel">
        <div class="bg-brand-green-900 text-white p-6 relative">
          <button type="button" class="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 p-2 rounded-full" data-close-detail aria-label="Close">✕</button>
          <h4 class="text-xl font-display font-extrabold pr-6">${s.name}</h4>
          <span class="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] mt-1.5 block font-bold">${catLabel(s.category)}</span>
        </div>
        <div class="p-6 space-y-6 text-slate-800">
          <div>
            <span class="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase block mb-1.5">How This Therapy Works:</span>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${s.details}</p>
          </div>
          <div>
            <span class="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase block mb-2">Key Patient Benefits:</span>
            <ul class="space-y-2">
              ${(s.benefits || []).map((b) => `<li class="flex items-start gap-2.5 text-xs font-semibold"><span class="bg-brand-green-100 text-brand-green-500 w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">✓</span><span>${b}</span></li>`).join("")}
            </ul>
          </div>
          <div class="pt-2 flex gap-3">
            <button type="button" data-close-detail class="flex-1 py-3 border border-slate-200 text-slate-500 font-bold rounded-xl text-xs">Close</button>
            <button type="button" data-open-booking data-service="${s.id}" data-close-detail class="flex-1 py-3 bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold rounded-xl text-xs">Book Session</button>
          </div>
        </div>
      </div>`;
    modal.querySelectorAll("[data-close-detail]").forEach((el) => {
      el.addEventListener("click", () => modal.remove());
    });
  }

  function renderConditions() {
    const wrap = document.getElementById("conditions-pills");
    const insight = document.getElementById("condition-insight");
    if (!wrap) return;
    wrap.innerHTML = conditions
      .map(
        (c) =>
          `<button type="button" data-cond="${c.id}" class="condition-pill"><span class="w-2 h-2 rounded-full bg-brand-green-500 mr-2 shrink-0"></span>${c.name}</button>`
      )
      .join("");

    wrap.querySelectorAll("[data-cond]").forEach((btn) => {
      const id = btn.getAttribute("data-cond");
      const cond = conditions.find((c) => c.id === id);
      btn.addEventListener("mouseenter", () => showInsight(cond, true));
      btn.addEventListener("mouseleave", () => showInsight(null, false));
      btn.addEventListener("click", () => {
        highlightCondition(cond);
        document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
        toast(`High-efficiency therapy recommended for: ${cond.name}!`);
      });
    });

    if (insight) {
      insight.innerHTML = `<p class="text-slate-500 text-xs sm:text-sm italic">Hover over or select any condition above to inspect deep neurological symptoms and Dr. Spencer's designated recovery track.</p>`;
    }
  }

  function showInsight(cond, hover) {
    const insight = document.getElementById("condition-insight");
    if (!insight) return;
    if (!cond) {
      if (!hover) {
        insight.innerHTML = `<p class="text-slate-500 text-xs sm:text-sm italic">Hover over or select any condition above to inspect deep neurological symptoms and Dr. Spencer's designated recovery track.</p>`;
      }
      matchedIds = [];
      renderServices();
      return;
    }
    matchedIds = cond.recommendedServices || [];
    renderServices();
    insight.innerHTML = `
      <div class="space-y-3 text-left">
        <h4 class="text-brand-green-900 font-display font-extrabold text-base flex items-center gap-2"><span class="text-brand-yellow-400">⚡</span> Physiology Support Track: ${cond.name}</h4>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">${cond.description}</p>
        <div class="pt-2 border-t border-slate-50 flex flex-wrap items-center gap-2">
          <span class="text-[10px] text-slate-400 font-mono font-bold uppercase">Reportable symptoms:</span>
          ${(cond.symptoms || []).map((s) => `<span class="bg-brand-green-50 px-2 py-0.5 rounded text-[10px] text-brand-green-700 font-mono font-bold">${s}</span>`).join("")}
        </div>
      </div>`;
  }

  function highlightCondition(cond) {
    matchedIds = cond?.recommendedServices || [];
    renderServices();
    showInsight(cond, true);
    document.querySelectorAll(".condition-pill").forEach((p) => {
      p.classList.toggle("is-active", p.getAttribute("data-cond") === cond?.id);
    });
  }

  function toast(msg) {
    let t = document.getElementById("ssw-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "ssw-toast";
      t.className = "ssw-toast";
      document.body.appendChild(t);
    }
    t.innerHTML = `<span class="text-brand-yellow-400 animate-bounce">⚡</span><p class="text-sm font-semibold">${msg}</p>`;
    t.classList.add("is-visible");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => t.classList.remove("is-visible"), 4000);
  }

  function renderTestimonials() {
    const card = document.getElementById("testimonial-card");
    if (!card || !testimonials.length) return;
    const current = testimonials[testimonialIdx];
    card.innerHTML = `
      <div class="relative bg-white border border-slate-100 rounded-[2.5rem] p-8 sm:p-14 shadow-xl shadow-brand-green-900/5 overflow-hidden">
        <div class="absolute top-8 right-12 text-slate-100/50 pointer-events-none text-8xl font-display leading-none opacity-40">“</div>
        <div class="relative z-10 flex flex-col justify-between min-h-[220px]">
          <div class="space-y-6">
            <div class="flex text-amber-500 gap-1">${"★".repeat(current.rating || 5)}</div>
            <blockquote class="text-slate-800 text-lg sm:text-xl font-medium leading-relaxed italic">"${current.quote}"</blockquote>
          </div>
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-slate-100 mt-8">
            <div>
              <span class="block font-display text-slate-900 font-extrabold text-base">${current.patientName}</span>
              <span class="block font-mono text-[10px] text-brand-green-600 tracking-wider font-bold mt-0.5 uppercase">✓ VERIFIED PATIENT · ${current.city}</span>
              <span class="inline-flex items-center gap-1.5 mt-1 bg-brand-green-50 text-brand-green-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">Verified 5-Star Review</span>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" id="testimonial-prev" class="w-12 h-12 rounded-xl border border-slate-150 hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-sm" aria-label="Previous">←</button>
              <button type="button" id="testimonial-next" class="w-12 h-12 rounded-xl border border-slate-150 hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-sm" aria-label="Next">→</button>
            </div>
          </div>
        </div>
      </div>`;
    document.getElementById("testimonial-prev")?.addEventListener("click", () => {
      testimonialIdx = (testimonialIdx - 1 + testimonials.length) % testimonials.length;
      renderTestimonials();
    });
    document.getElementById("testimonial-next")?.addEventListener("click", () => {
      testimonialIdx = (testimonialIdx + 1) % testimonials.length;
      renderTestimonials();
    });
  }

  function renderFaqs() {
    const root = document.getElementById("home-faqs");
    if (!root) return;
    root.innerHTML = faqs
      .map(
        (f, i) => `
      <div class="faq-item-ai" data-faq>
        <button type="button" class="faq-item-ai__btn" aria-expanded="false">
          <span>${f.question}</span>
          <span class="faq-chevron">▾</span>
        </button>
        <div class="faq-item-ai__panel" hidden>${f.answer}</div>
      </div>`
      )
      .join("");
    root.querySelectorAll("[data-faq]").forEach((item) => {
      const btn = item.querySelector(".faq-item-ai__btn");
      const panel = item.querySelector(".faq-item-ai__panel");
      btn.addEventListener("click", () => {
        const open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
        panel.hidden = !open;
      });
    });
  }

  function bindSpecialOffer() {
    const form = document.getElementById("special-unlock-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector('input[name="email"]')?.value?.trim();
      if (!email || !email.includes("@")) return;
      const code = "SUM99-" + Math.floor(100 + Math.random() * 900);
      const box = document.getElementById("special-unlock-result");
      if (box) {
        box.classList.remove("hidden");
        box.innerHTML = `
          <div class="text-center space-y-3">
            <p class="text-brand-yellow-400 font-mono text-xs font-bold uppercase">Voucher unlocked</p>
            <p class="text-3xl font-mono font-black text-white">${code}</p>
            <p class="text-xs text-white/70">A voucher details copy has been reserved for: <b>${email}</b></p>
            <button type="button" data-open-booking data-promo class="w-full py-3 bg-brand-yellow-400 text-brand-green-950 font-extrabold text-xs uppercase tracking-widest rounded-xl">Claim Appointment Slot →</button>
          </div>`;
      }
      form.classList.add("hidden");
    });
  }

  function bindFilters() {
    document.querySelectorAll("[data-service-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        filter = btn.getAttribute("data-service-filter");
        document.querySelectorAll("[data-service-filter]").forEach((b) => b.classList.toggle("is-active", b === btn));
        renderServices();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderServices();
    renderConditions();
    renderTestimonials();
    renderFaqs();
    bindSpecialOffer();
    bindFilters();
  });

  // also run if already loaded
  if (document.readyState !== "loading") {
    renderServices();
    renderConditions();
    renderTestimonials();
    renderFaqs();
    bindSpecialOffer();
    bindFilters();
  }

  window.SSW_HOME = { highlightCondition, toast };
})();
