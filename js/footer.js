(function () {
  const cfg = window.SSW || {};
  const year = new Date().getFullYear();
  const root = document.getElementById("site-footer");
  if (!root) return;
  const base = document.body.dataset.navBase || "";
  const logo = base + (cfg.assets?.logoWhite || "images/logo/summit-spine-logo-white.png");
  const phone = cfg.phone || "(817) 555-0199";
  const phoneHref = cfg.phoneHref || "tel:+18175550199";
  const email = cfg.email || "care@summitcolleyville.com";
  const emailHref = cfg.emailHref || "mailto:care@summitcolleyville.com";
  const phoneNote = cfg.placeholders?.phone ? '<span class="placeholder-note ml-1">Placeholder</span>' : "";
  const emailNote = cfg.placeholders?.email ? '<span class="placeholder-note ml-1">Placeholder</span>' : "";

  root.innerHTML = `
  <footer class="bg-brand-green-950 text-[#faf7f2]/70 py-16 border-t border-white/5 font-sans relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div class="md:col-span-5 space-y-6 text-left">
          <a href="/" class="flex items-center group">
            <img src="${logo}" alt="Summit Spine & Wellness Logo" class="h-16 sm:h-20 w-auto object-contain transition-all duration-300 group-hover:scale-105">
          </a>
          <p class="text-xs sm:text-sm text-neutral-400 font-light max-w-sm leading-relaxed">
            We are committed to providing premium chiropractic, computerized spinal decompression, and dynamic soft tissue recovery options in South DFW.
          </p>
          <div class="text-xs text-neutral-400 font-mono space-y-1 block">
            <span>📍 6416 Colleyville Blvd, Suite 108 · Colleyville, TX 76034</span><br>
            <span>📞 Phone: <a href="${phoneHref}" class="hover:text-brand-yellow-400">${phone}</a>${phoneNote}</span><br>
            <span>✉ Email: <a href="${emailHref}" class="hover:text-brand-yellow-400">${email}</a>${emailNote}</span>
          </div>
        </div>
        <div class="md:col-span-3 text-left space-y-4">
          <h5 class="font-mono text-xs font-bold text-white uppercase tracking-wider">EXPLORE PATHWAYS</h5>
          <ul class="text-xs sm:text-sm space-y-2.5 font-bold font-sans uppercase tracking-wider">
            <li><a href="/services/" class="hover:text-brand-yellow-400 transition-colors">Services</a></li>
            <li><a href="/conditions/" class="hover:text-brand-yellow-400 transition-colors">Conditions Treated</a></li>
            <li><a href="/about/" class="hover:text-brand-yellow-400 transition-colors">About</a></li>
            <li><a href="/contact/" class="hover:text-brand-yellow-400 transition-colors">Contact</a></li>
            <li><a href="/new-patient-special/" class="hover:text-brand-yellow-400 transition-colors">$99 Special</a></li>
          </ul>
        </div>
        <div class="md:col-span-4 text-left space-y-5">
          <h5 class="font-mono text-xs font-bold text-white uppercase tracking-wider">LICENSES & INTEGRATIONS</h5>
          <div class="space-y-3 bg-[#faf7f2]/5 p-5 rounded-2xl border border-white/5">
            <span class="block text-[10px] font-mono text-[#d4af37] font-bold uppercase">✓ BOARD & SPECIALIST DECLARED</span>
            <p class="text-xs text-neutral-400 font-light leading-relaxed">Webster pelvic safety criteria fully applied. In-house digital diagnostics, dynamic cupping, therapeutic lasers, and full recovery cabins on site.</p>
            <div class="flex gap-2 flex-wrap">
              <span class="inline-block bg-white/5 border border-white/10 px-2.5 py-1 rounded text-[9px] font-bold text-white tracking-widest uppercase">HSA/FSA VALID</span>
              <span class="inline-block bg-white/5 border border-white/10 px-2.5 py-1 rounded text-[9px] font-bold text-white tracking-widest uppercase">WEBSTER CERT</span>
            </div>
          </div>
          <button type="button" data-open-booking class="w-full sm:w-auto px-6 py-3 bg-brand-green-500 hover:bg-brand-green-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl">Request Appointment</button>
        </div>
      </div>
      <div class="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-white/50">
        <p>© ${year} Summit Spine & Wellness, LLC. All rights reserved.</p>
        <div class="flex gap-4">
          <a href="/privacy-policy/" class="hover:text-brand-yellow-400">Privacy Policy</a>
          <a href="/terms-of-service/" class="hover:text-brand-yellow-400">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>`;
})();
