/**
 * Multi-step appointment modal — AI Studio parity
 */
(function () {
  const data = window.SSW_DATA || {};
  const all = data.allServicesData || [];

  function ensureModal() {
    if (document.getElementById("booking-modal")) return;
    const el = document.createElement("div");
    el.id = "booking-modal";
    el.className = "booking-modal hidden";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `
      <div class="booking-modal__backdrop" data-booking-close></div>
      <div class="booking-modal__panel" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <div class="booking-modal__head">
          <button type="button" class="booking-modal__x" data-booking-close aria-label="Close">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
          <div class="flex items-center gap-2">
            <span id="booking-badge" class="bg-brand-yellow-400 text-brand-green-900 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Optimal Care Request</span>
          </div>
          <h3 id="booking-title" class="text-xl sm:text-2xl font-display font-extrabold mt-2 text-white">Request Your Consultation</h3>
          <p id="booking-sub" class="text-white/85 text-xs sm:text-sm mt-1">With Dr. Spencer Hiebert | Colleyville, TX</p>
        </div>
        <div id="booking-progress" class="flex h-1 bg-brand-green-50"><div id="booking-progress-bar" class="bg-brand-yellow-500 transition-all duration-300" style="width:33%"></div></div>
        <div class="booking-modal__body" id="booking-body"></div>
      </div>`;
    document.body.appendChild(el);
  }

  let step = 1;
  let serviceId = all[0]?.id || "chiro";
  let date = "";
  let timeSlot = "morning";
  let name = "";
  let email = "";
  let phone = "";
  let isNewPatient = false;
  let message = "";
  let refId = "";
  let errors = {};

  function open(opts = {}) {
    ensureModal();
    step = 1;
    serviceId = opts.serviceId || all[0]?.id || "chiro";
    isNewPatient = !!opts.isPromo;
    date = "";
    timeSlot = "morning";
    name = email = phone = message = "";
    refId = "";
    errors = {};
    document.getElementById("booking-modal").classList.remove("hidden");
    document.getElementById("booking-modal").setAttribute("aria-hidden", "false");
    document.body.classList.add("booking-open");
    render();
  }

  function close() {
    const m = document.getElementById("booking-modal");
    if (!m) return;
    m.classList.add("hidden");
    m.setAttribute("aria-hidden", "true");
    document.body.classList.remove("booking-open");
  }

  function todayStr() {
    return new Date().toISOString().split("T")[0];
  }

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }
  function validatePhone(v) {
    return /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(v);
  }

  function render() {
    const badge = document.getElementById("booking-badge");
    const title = document.getElementById("booking-title");
    const sub = document.getElementById("booking-sub");
    const prog = document.getElementById("booking-progress");
    const bar = document.getElementById("booking-progress-bar");
    const body = document.getElementById("booking-body");
    if (!body) return;

    badge.textContent = isNewPatient ? "New Patient Special Plan" : "Optimal Care Request";
    if (step === 4) {
      title.textContent = "Appointment Requested!";
      sub.textContent = "We have reserved your slot.";
      prog.classList.add("hidden");
    } else {
      title.textContent = "Request Your Consultation";
      sub.textContent = "With Dr. Spencer Hiebert | Colleyville, TX";
      prog.classList.remove("hidden");
      bar.style.width = `${(step / 3) * 100}%`;
    }

    if (step === 1) {
      body.innerHTML = `
        <div class="space-y-5">
          <div>
            <label class="block text-sm font-bold text-slate-800 mb-2">What is your primary care focus?</label>
            <div class="grid grid-cols-1 gap-2.5 max-h-[40vh] overflow-y-auto pr-1">
              ${all
                .map(
                  (s) => `
                <button type="button" data-pick-service="${s.id}" class="flex items-start text-left p-3.5 rounded-2xl border transition-all w-full ${
                  serviceId === s.id
                    ? "border-brand-green-500 bg-brand-green-50 shadow-sm"
                    : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                }">
                  <div class="w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-0.5 ${
                    serviceId === s.id ? "border-brand-green-500 bg-brand-green-500 text-white" : "border-slate-300 bg-white"
                  }">${serviceId === s.id ? "✓" : ""}</div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-slate-800">${s.name}</p>
                    <p class="text-xs text-slate-500 mt-0.5 line-clamp-1">${s.description}</p>
                  </div>
                </button>`
                )
                .join("")}
            </div>
          </div>
          <div class="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl">
            <label class="flex items-center gap-3 cursor-pointer text-xs sm:text-sm font-semibold text-slate-700">
              <input type="checkbox" id="booking-new-patient" class="w-5 h-5 rounded border-slate-300 text-brand-green-600" ${isNewPatient ? "checked" : ""}>
              Apply the $99 New Patient Special ($350 value)
            </label>
          </div>
          <button type="button" id="booking-next-1" class="w-full py-4 bg-brand-green-600 hover:bg-brand-teal-600 text-white text-sm font-bold rounded-2xl shadow-lg transition-all">Continue to Scheduling →</button>
        </div>`;
    } else if (step === 2) {
      body.innerHTML = `
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-bold text-slate-800 mb-2">Select your preferred appointment date</label>
            <input type="date" id="booking-date" min="${todayStr()}" value="${date}" class="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-green-500/20 focus:border-brand-green-500 text-slate-800 font-medium">
            <p class="text-xs text-slate-400 mt-2">Mon–Thu: 9:00 AM – 1:00 PM & 2:30 PM – 6:00 PM; Fri: 9:00 AM – 1:00 PM. Closed weekends.</p>
            ${errors.date ? `<p class="text-red-500 text-xs font-semibold mt-1">${errors.date}</p>` : ""}
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-800 mb-3">Preferred window of the day</label>
            <div class="grid grid-cols-2 gap-3">
              <button type="button" data-slot="morning" class="p-4 rounded-2xl border text-center transition-all ${timeSlot === "morning" ? "border-brand-green-500 bg-brand-green-50 text-brand-green-800 font-bold" : "border-slate-100 bg-slate-50 font-semibold text-slate-600"}">
                <span class="block text-base">🌅 Morning</span>
                <span class="block text-xs font-normal text-slate-500 mt-1">9:00 AM – 1:00 PM</span>
              </button>
              <button type="button" data-slot="afternoon" class="p-4 rounded-2xl border text-center transition-all ${timeSlot === "afternoon" ? "border-brand-green-500 bg-brand-green-50 text-brand-green-800 font-bold" : "border-slate-100 bg-slate-50 font-semibold text-slate-600"}">
                <span class="block text-base">🌇 Afternoon</span>
                <span class="block text-xs font-normal text-slate-500 mt-1">2:30 PM – 6:00 PM</span>
              </button>
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <button type="button" id="booking-back-2" class="flex-1 py-4 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-2xl">← Back</button>
            <button type="button" id="booking-next-2" class="flex-1 py-4 bg-brand-green-600 hover:bg-brand-teal-600 text-white font-bold rounded-2xl shadow-lg">Continue →</button>
          </div>
        </div>`;
    } else if (step === 3) {
      body.innerHTML = `
        <form id="booking-form" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-slate-800 mb-1">Full Name</label>
            <input type="text" id="booking-name" required placeholder="Enter your first and last name" value="${name}" class="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-green-500/20 focus:border-brand-green-500">
            ${errors.name ? `<p class="text-red-500 text-xs font-semibold mt-1">${errors.name}</p>` : ""}
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-800 mb-1">Email Address</label>
            <input type="email" id="booking-email" required placeholder="you@email.com" value="${email}" class="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white">
            ${errors.email ? `<p class="text-red-500 text-xs font-semibold mt-1">${errors.email}</p>` : ""}
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-800 mb-1">Cell Phone Number</label>
            <input type="tel" id="booking-phone" required placeholder="(817) 555-0199" value="${phone}" class="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white">
            ${errors.phone ? `<p class="text-red-500 text-xs font-semibold mt-1">${errors.phone}</p>` : ""}
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-800 mb-1">Message (optional)</label>
            <textarea id="booking-message" rows="3" placeholder="Briefly describe your symptoms or goals" class="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white">${message}</textarea>
          </div>
          <div class="flex gap-3 pt-2">
            <button type="button" id="booking-back-3" class="flex-1 py-4 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-2xl">← Back</button>
            <button type="submit" class="flex-1 py-4 bg-brand-green-600 hover:bg-brand-teal-600 text-white font-bold rounded-2xl shadow-lg">Submit Request</button>
          </div>
        </form>`;
    } else {
      const selected = all.find((s) => s.id === serviceId);
      body.innerHTML = `
        <div class="text-center space-y-5 py-2">
          <div class="w-16 h-16 mx-auto rounded-full bg-brand-green-50 text-brand-green-600 flex items-center justify-center text-2xl font-bold">✓</div>
          <p class="text-sm text-slate-600 leading-relaxed">Our intake coordinator will reach out via text/phone in the next couple of business hours to verify and lock in your exact time.</p>
          <div class="bg-slate-50 rounded-2xl p-5 text-left text-sm space-y-2 border border-slate-100">
            <p><span class="text-slate-400 font-mono text-[10px] uppercase font-bold">Reference</span><br><strong class="font-mono text-brand-green-700">${refId}</strong></p>
            <p><span class="text-slate-400 font-mono text-[10px] uppercase font-bold">Service</span><br><strong>${selected?.name || "Consultation"}</strong></p>
            <p><span class="text-slate-400 font-mono text-[10px] uppercase font-bold">Preferred</span><br><strong>${date} · ${timeSlot}</strong></p>
            <p class="text-xs text-slate-500 pt-2">6416 Colleyville Blvd, Suite 108, Colleyville, TX 76034</p>
          </div>
          <p class="text-[10px] text-slate-400"><span class="placeholder-note">Demo form</span> — connect Formbold / clinic software to go live.</p>
          <button type="button" data-booking-close class="w-full py-4 bg-brand-green-600 text-white font-bold rounded-2xl">Done</button>
        </div>`;
    }

    bindStep();
  }

  function bindStep() {
    const modal = document.getElementById("booking-modal");
    modal.querySelectorAll("[data-booking-close]").forEach((el) => el.addEventListener("click", close));
    modal.querySelectorAll("[data-pick-service]").forEach((btn) => {
      btn.addEventListener("click", () => {
        serviceId = btn.getAttribute("data-pick-service");
        render();
      });
    });
    document.getElementById("booking-new-patient")?.addEventListener("change", (e) => {
      isNewPatient = e.target.checked;
    });
    document.getElementById("booking-next-1")?.addEventListener("click", () => {
      if (!serviceId) return;
      step = 2;
      render();
    });
    document.getElementById("booking-back-2")?.addEventListener("click", () => {
      step = 1;
      render();
    });
    modal.querySelectorAll("[data-slot]").forEach((btn) => {
      btn.addEventListener("click", () => {
        timeSlot = btn.getAttribute("data-slot");
        render();
      });
    });
    document.getElementById("booking-date")?.addEventListener("change", (e) => {
      date = e.target.value;
    });
    document.getElementById("booking-next-2")?.addEventListener("click", () => {
      errors = {};
      if (!date) {
        errors.date = "Please select a preferred date";
        render();
        return;
      }
      const day = new Date(date + "T12:00:00").getDay();
      if (day === 0 || day === 6) {
        errors.date = "We are closed on weekends. Please select Mon–Fri.";
        render();
        return;
      }
      step = 3;
      render();
    });
    document.getElementById("booking-back-3")?.addEventListener("click", () => {
      step = 2;
      render();
    });
    document.getElementById("booking-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      name = document.getElementById("booking-name").value.trim();
      email = document.getElementById("booking-email").value.trim();
      phone = document.getElementById("booking-phone").value.trim();
      message = document.getElementById("booking-message").value.trim();
      errors = {};
      if (!name) errors.name = "Full name is required";
      if (!email || !validateEmail(email)) errors.email = "Please provide a valid email";
      if (!phone || !validatePhone(phone)) errors.phone = "Valid 10-digit phone number is required";
      if (Object.keys(errors).length) {
        render();
        return;
      }
      refId = "SUMMIT-" + Math.floor(100000 + Math.random() * 900000);
      step = 4;
      render();
    });
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open-booking]");
    if (!btn) return;
    e.preventDefault();
    open({
      serviceId: btn.getAttribute("data-service") || "",
      isPromo: btn.hasAttribute("data-promo")
    });
  });

  // Deep-link support
  const params = new URLSearchParams(window.location.search);
  if (params.get("book") === "1" || params.get("promo") === "1") {
    document.addEventListener("DOMContentLoaded", () => {
      open({ serviceId: params.get("service") || "", isPromo: params.get("promo") === "1" });
    });
  }

  window.SSW_BOOKING = { open, close };
})();
