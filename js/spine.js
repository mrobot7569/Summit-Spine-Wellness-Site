/**
 * Virtual Spine interactive map — AI Studio parity
 */
(function () {
  const root = document.getElementById("virtual-spine");
  if (!root) return;

  const data = window.SSW_DATA || {};
  const conditions = data.conditionsData || [];
  const base = document.body.dataset.navBase || "";
  const human = base + "images/photos/summit-human.svg";

  const regions = [
    { id: "head", label: "Head & Cranial", description: "Headaches, Migraines & Cervico-Cranial pressure", anatomyDetail: "Often caused by misalignments at the Occiput and C1-C2 vertebrae, leading to vertebral artery friction and suboccipital muscular spasms." },
    { id: "neck", label: "Neck (Cervical Spine)", description: "Neck Pain, Whiplash, Text Neck & Cervical strain", anatomyDetail: "The cervical spine bears the weight of the skull. Long screen sessions and rear-end whiplash accidents tear supportive ligaments and lock facet joints." },
    { id: "spine", label: "Spinal Canal & Discs", description: "Sciatica, Herniations, Degeneration & Scoliosis", anatomyDetail: "Spinal discs rely on physical compression cycles for nutrients. Structural faults leak outer fluid, pressing on nerve tracks and causing shooting motor/sensory deficits." },
    { id: "back", label: "Lower & Upper Back", description: "Thoracic muscle binding, Lumbar strain & Facet locks", anatomyDetail: "The core foundations of load bearing. Mechanical flaws, prolonged sitting, and lifting errors create severe muscular guarding loops." },
    { id: "hip", label: "Hips & SI Joint", description: "Sacroiliac stiffness, pelvic imbalances & prenatal strain", anatomyDetail: "The pelvic girdle must pivot fluidly during movement. Webster Certified protocols focus on easing pelvic facet strain and optimizing pelvic dimensions." },
    { id: "hand-foot", label: "Extremity Pathways", description: "Carpal Tunnel, Sprains/Strains & Foot pain", anatomyDetail: "Nerves supplying your extremities originate in the cervical and lumbar roots. Treating the spine alongside direct joint therapy fixes the true issue." }
  ];

  let active = "back";

  function markerClass(id) {
    return active === id
      ? "fill-brand-yellow-400 stroke-white"
      : id === "spine"
        ? "fill-emerald-500/40 stroke-emerald-400/50"
        : "fill-slate-500/80 stroke-slate-400";
  }

  function render() {
    const meta = regions.find((r) => r.id === active) || regions[3];
    const matched = conditions.filter((c) => c.bodyPart === active);

    root.innerHTML = `
    <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl shadow-slate-100/30">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#040e0b] rounded-2xl border border-emerald-950/40 min-h-[460px] relative overflow-hidden shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)]">
          <div class="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-500/20 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-wider z-10">Interactive Biomechanical Scan</div>
          <div class="absolute top-4 right-4 text-[9px] font-mono font-bold text-slate-500 bg-black/40 px-2 py-0.5 rounded border border-white/5 uppercase tracking-widest">Anatomy Focus v2.0</div>
          <div class="relative w-full max-w-[195px] aspect-[487/1233] my-4 select-none">
            <img src="${human}" alt="Summit Spine Anatomy Model" class="w-full h-full object-contain pointer-events-none opacity-90 brightness-110 drop-shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <svg class="absolute inset-0 w-full h-full" viewBox="0 0 487 1233" fill="none">
              <defs>
                <filter id="glow-yellow" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="12" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
              </defs>
              ${
                active === "head"
                  ? `<circle cx="243" cy="95" r="45" class="stroke-brand-yellow-400/30 fill-brand-yellow-400/5 stroke-2 animate-ping"/><circle cx="243" cy="95" r="32" class="stroke-brand-yellow-400/50 fill-brand-yellow-400/10 stroke-[1.5]" filter="url(#glow-yellow)"/>`
                  : ""
              }
              ${
                active === "neck"
                  ? `<circle cx="243" cy="175" r="40" class="stroke-brand-yellow-400/30 fill-brand-yellow-400/5 stroke-2 animate-ping"/><circle cx="243" cy="175" r="28" class="stroke-brand-yellow-400/50 fill-brand-yellow-400/10 stroke-[1.5]" filter="url(#glow-yellow)"/>`
                  : ""
              }
              ${
                active === "spine"
                  ? `<rect x="231" y="240" rx="12" width="24" height="420" class="stroke-brand-yellow-400/40 fill-brand-yellow-400/5 stroke-2 animate-pulse"/><line x1="243" y1="240" x2="243" y2="660" class="stroke-brand-yellow-400/80 stroke-[4px]" filter="url(#glow-yellow)" stroke-linecap="round"/>`
                  : ""
              }
              ${
                active === "back"
                  ? `<rect x="216" y="440" rx="15" width="54" height="260" class="stroke-brand-yellow-400/30 fill-brand-yellow-400/5 stroke-2 animate-pulse"/><rect x="221" y="445" rx="10" width="44" height="250" class="stroke-brand-yellow-500/50 fill-brand-yellow-500/10 stroke-[1.5]" filter="url(#glow-yellow)"/>`
                  : ""
              }
              ${
                active === "hip"
                  ? `<rect x="188" y="775" rx="20" width="110" height="100" class="stroke-brand-yellow-400/30 fill-brand-yellow-400/5 stroke-2"/><rect x="193" y="780" rx="15" width="100" height="90" class="stroke-brand-yellow-400/50 fill-brand-yellow-400/10 stroke-[1.5]" filter="url(#glow-yellow)"/>`
                  : ""
              }
              ${
                active === "hand-foot"
                  ? `<circle cx="355" cy="365" r="35" class="stroke-brand-yellow-400/30 fill-brand-yellow-400/5 stroke-2 animate-pulse"/><circle cx="135" cy="1005" r="35" class="stroke-brand-yellow-400/30 fill-brand-yellow-400/5 stroke-2 animate-pulse"/><circle cx="74" cy="541" r="30" class="stroke-brand-yellow-400/30 fill-brand-yellow-400/5 stroke-2 animate-pulse"/>`
                  : ""
              }
              <circle cx="243" cy="95" r="45" class="fill-transparent cursor-pointer" data-region="head"/>
              <circle cx="243" cy="175" r="35" class="fill-transparent cursor-pointer" data-region="neck"/>
              <rect x="228" y="240" width="31" height="420" class="fill-transparent cursor-pointer" data-region="spine"/>
              <rect x="213" y="440" width="60" height="260" class="fill-transparent cursor-pointer" data-region="back"/>
              <rect x="183" y="770" width="120" height="110" class="fill-transparent cursor-pointer" data-region="hip"/>
              <circle cx="355" cy="365" r="40" class="fill-transparent cursor-pointer" data-region="hand-foot"/>
              <circle cx="135" cy="1005" r="40" class="fill-transparent cursor-pointer" data-region="hand-foot"/>
              <circle cx="74" cy="541" r="35" class="fill-transparent cursor-pointer" data-region="hand-foot"/>
              <circle cx="243" cy="95" r="8" class="pointer-events-none stroke-[2.5px] ${markerClass("head")}"/>
              <circle cx="243" cy="175" r="8" class="pointer-events-none stroke-[2.5px] ${markerClass("neck")}"/>
              <circle cx="243" cy="360" r="8" class="pointer-events-none stroke-[2.5px] ${markerClass("spine")}"/>
              <circle cx="243" cy="540" r="8" class="pointer-events-none stroke-[2.5px] ${markerClass("back")}"/>
              <circle cx="243" cy="810" r="8" class="pointer-events-none stroke-[2.5px] ${markerClass("hip")}"/>
              <circle cx="355" cy="365" r="8" class="pointer-events-none stroke-[2.5px] ${markerClass("hand-foot")}"/>
              <circle cx="135" cy="1005" r="8" class="pointer-events-none stroke-[2.5px] ${markerClass("hand-foot")}"/>
              <circle cx="74" cy="541" r="8" class="pointer-events-none stroke-[2.5px] ${markerClass("hand-foot")}"/>
            </svg>
          </div>
          <span class="text-[10px] text-emerald-500/80 font-mono tracking-wide mt-3 text-center">Click target nodes or body segments to run diagnostics</span>
        </div>

        <div class="lg:col-span-7 flex flex-col gap-5 justify-between h-full">
          <div>
            <span class="text-brand-teal-600 text-xs sm:text-sm font-bold tracking-wider uppercase block mb-1">Select Pain Focus Area</span>
            <h3 class="text-xl sm:text-2xl font-extrabold font-display text-brand-green-900 tracking-tight leading-tight">Clinical Symptom Analysis Map</h3>
            <p class="text-slate-500 text-xs sm:text-sm mt-1">Chiropractic goes beyond symptom chasing. Pinpoint your discomfort to see its deep physiological root-cause and Dr. Spencer's solution.</p>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            ${regions
              .map(
                (r) => `<button type="button" data-region="${r.id}" class="text-left p-3 rounded-xl border text-xs font-bold transition-all ${
                  active === r.id
                    ? "border-brand-yellow-400 bg-brand-green-950 text-white shadow-md"
                    : "border-slate-100 bg-slate-50 text-slate-700 hover:border-brand-green-500/30"
                }">${r.label}</button>`
              )
              .join("")}
          </div>
          <div class="bg-brand-cream rounded-2xl border border-brand-cream-dark p-5 sm:p-6 space-y-3">
            <div class="flex items-start justify-between gap-3">
              <div>
                <span class="text-[10px] font-mono font-bold text-brand-green-600 uppercase tracking-widest">Active Region</span>
                <h4 class="font-display font-extrabold text-lg text-brand-green-900 mt-1">${meta.label}</h4>
                <p class="text-xs text-slate-500 mt-1">${meta.description}</p>
              </div>
            </div>
            <p class="text-sm text-slate-600 leading-relaxed">${meta.anatomyDetail}</p>
            <div class="pt-2 border-t border-slate-200/80">
              <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Matched conditions</span>
              <div class="flex flex-wrap gap-2 mt-2">
                ${
                  matched.length
                    ? matched
                        .map(
                          (c) =>
                            `<button type="button" data-condition="${c.id}" class="px-3 py-1.5 rounded-lg bg-white border border-slate-150 text-[11px] font-bold text-slate-700 hover:border-brand-green-500/40">${c.name}</button>`
                        )
                        .join("")
                    : `<span class="text-xs text-slate-400 italic">No mapped conditions for this region.</span>`
                }
              </div>
            </div>
            <button type="button" data-open-booking class="w-full mt-2 py-3 bg-brand-green-600 hover:bg-brand-green-500 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl">Book Recommended Care →</button>
          </div>
        </div>
      </div>
    </div>`;

    root.querySelectorAll("[data-region]").forEach((el) => {
      el.addEventListener("click", () => {
        active = el.getAttribute("data-region");
        render();
      });
    });
    root.querySelectorAll("[data-condition]").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-condition");
        const cond = conditions.find((c) => c.id === id);
        if (cond && window.SSW_HOME?.highlightCondition) {
          window.SSW_HOME.highlightCondition(cond);
        }
        document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  render();
})();
