(function () {
  const base = document.body.dataset.navBase || "";
  const cfg = window.SSW || {};
  const year = new Date().getFullYear();
  const root = document.getElementById("site-footer");
  if (!root) return;

  const phone = cfg.phone || "(817) 555-0199";
  const phoneHref = cfg.phoneHref || "tel:+18175550199";
  const email = cfg.email || "care@summitcolleyville.com";
  const emailHref = cfg.emailHref || "mailto:care@summitcolleyville.com";
  const addr = (cfg.address && cfg.address.full) || "6416 Colleyville Blvd, Suite 108, Colleyville, TX 76034";
  const phoneNote =
    cfg.placeholders && cfg.placeholders.phone
      ? '<span class="placeholder-note">Placeholder</span>'
      : "";
  const emailNote =
    cfg.placeholders && cfg.placeholders.email
      ? '<span class="placeholder-note">Placeholder</span>'
      : "";

  /* Root-relative clean URLs for Vercel */
  const home = "/";
  const services = "/services/";
  const conditions = "/conditions/";
  const about = "/about/";
  const special = "/new-patient-special/";
  const appointment = "/appointment/";
  const contact = "/contact/";
  const privacy = "/privacy-policy/";
  const terms = "/terms-of-service/";

  root.innerHTML = `
  <footer class="site-footer">
    <div class="container py-14">
      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-1">
          <a href="${home}" class="footer-logo inline-block mb-4">
            <img src="${base}images/logo/summit-spine-logo-white.png" alt="Summit Spine & Wellness" class="footer-logo__img" width="200" height="72" loading="lazy">
          </a>
          <p class="text-sm text-white/70 leading-relaxed max-w-xs">
            Premium chiropractic, spinal decompression, and recovery care in Colleyville, TX. Root-cause care so you can move better and get back to the summit.
          </p>
        </div>
        <div>
          <h3 class="footer-heading">Explore</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="${services}">Services</a></li>
            <li><a href="${conditions}">Conditions Treated</a></li>
            <li><a href="${about}">About Dr. Hiebert</a></li>
            <li><a href="${special}">$99 New Patient Special</a></li>
            <li><a href="${appointment}">Book Appointment</a></li>
            <li><a href="${contact}">Contact & Hours</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-heading">Service Area</h3>
          <ul class="space-y-2 text-sm text-white/75">
            <li>Colleyville, TX</li>
            <li>Grapevine · Southlake · Keller</li>
            <li>DFW metro patients welcome</li>
            <li>Walk-ins welcome</li>
          </ul>
        </div>
        <div>
          <h3 class="footer-heading">Visit Us</h3>
          <ul class="space-y-3 text-sm">
            <li class="text-white/75">${addr}</li>
            <li>
              <a href="${phoneHref}" class="font-bold text-white hover:text-[var(--ssw-gold)]">${phone}</a>
              ${phoneNote}
            </li>
            <li>
              <a href="${emailHref}">${email}</a>
              ${emailNote}
            </li>
            <li class="text-white/70">Mon–Thu full day · Fri morning · Closed weekends</li>
          </ul>
          <a href="${appointment}" class="btn btn-primary btn-sm mt-5">Request Appointment</a>
        </div>
      </div>
      <div class="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-white/50">
        <p>© ${year} Summit Spine & Wellness, LLC. All rights reserved.</p>
        <div class="flex gap-4">
          <a href="${privacy}">Privacy Policy</a>
          <a href="${terms}">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>`;
})();
