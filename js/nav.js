(function () {
  const base = document.body.dataset.navBase || "";
  const active = document.body.dataset.navActive || "";
  const cfg = window.SSW || {};

  /** Root-relative clean URLs (works with Vercel cleanUrls + trailingSlash). */
  const pages = {
    home: "/",
    services: "/services/",
    conditions: "/conditions/",
    about: "/about/",
    special: "/new-patient-special/",
    appointment: "/appointment/",
    contact: "/contact/"
  };

  const desktopLinks = [
    { id: "services", label: "Services", href: pages.services },
    { id: "conditions", label: "Conditions", href: pages.conditions },
    { id: "about", label: "About", href: pages.about },
    { id: "special", label: "New Patient", href: pages.special },
    { id: "contact", label: "Contact", href: pages.contact }
  ];

  const mobileLinks = [
    { id: "home", label: "Home", href: pages.home, hint: "Summit Spine & Wellness" },
    { id: "services", label: "Services", href: pages.services, hint: "Chiropractic · Decompression · Recovery" },
    { id: "conditions", label: "Conditions", href: pages.conditions, hint: "Back, neck, sciatica & more" },
    { id: "about", label: "About", href: pages.about, hint: "Meet Dr. Hiebert" },
    { id: "special", label: "New Patient Special", href: pages.special, hint: "$99 clinical starter package" },
    { id: "appointment", label: "Book Appointment", href: pages.appointment, hint: "Request a visit" },
    { id: "contact", label: "Contact", href: pages.contact, hint: "Hours, map & phone" }
  ];

  function isActive(id) {
    return active === id ? " is-active" : "";
  }

  const phoneHref = cfg.phoneHref || "tel:+18175550199";
  const phoneText = cfg.phone || "(817) 555-0199";
  const bookHref = pages.appointment;

  /* Asset base for images (still depth-relative for local file:// if needed) */
  const assetBase = base;

  const desktop = document.getElementById("desktop-nav");
  if (desktop) {
    desktop.innerHTML = desktopLinks
      .map((l) => `<a href="${l.href}" class="nav-link${isActive(l.id)}">${l.label}</a>`)
      .join("");
  }

  /* Header logo + primary CTA → clean URLs */
  document.querySelectorAll(".site-header a[aria-label]").forEach((el) => {
    const label = (el.getAttribute("aria-label") || "").toLowerCase();
    if (label.includes("home")) el.setAttribute("href", pages.home);
  });
  document.querySelectorAll(".site-header a.btn").forEach((el) => {
    const text = (el.textContent || "").toLowerCase();
    if (text.includes("claim")) {
      el.setAttribute("href", pages.appointment + "?promo=1");
    } else if (text.includes("book") || text.includes("appointment")) {
      el.setAttribute("href", pages.appointment);
    }
  });

  const mobile = document.getElementById("mobile-nav");
  if (mobile) {
    if (mobile.parentElement !== document.body) {
      document.body.appendChild(mobile);
    }
    mobile.className = "mobile-menu";
    mobile.setAttribute("aria-hidden", "true");
    mobile.setAttribute("aria-label", "Mobile navigation");
    mobile.innerHTML = `
      <div class="mobile-menu__backdrop" data-menu-close tabindex="-1" aria-hidden="true"></div>
      <div class="mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="mobile-menu__top">
          <a href="${pages.home}" class="mobile-menu__logo" aria-label="Summit Spine & Wellness home">
            <img src="${assetBase}images/logo/summit-spine-logo.png" alt="Summit Spine & Wellness" width="200" height="56" decoding="async">
          </a>
          <button type="button" class="mobile-menu__close" data-menu-close aria-label="Close menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18"/>
            </svg>
          </button>
        </div>
        <div class="mobile-menu__scroll">
          <p class="mobile-menu__eyebrow">Navigate</p>
          <nav class="mobile-menu__links" aria-label="Site pages">
            ${mobileLinks
              .map(
                (l, i) => `
              <a href="${l.href}" class="mobile-menu__link${isActive(l.id)}" style="--i:${i}">
                <span class="mobile-menu__link-main">
                  <span class="mobile-menu__link-label">${l.label}</span>
                  <span class="mobile-menu__link-hint">${l.hint}</span>
                </span>
                <span class="mobile-menu__link-arrow" aria-hidden="true">→</span>
              </a>`
              )
              .join("")}
          </nav>
          <div class="mobile-menu__meta">
            <a href="${phoneHref}" class="mobile-menu__meta-row">
              <span class="mobile-menu__meta-icon" aria-hidden="true">📞</span>
              <span>
                <span class="mobile-menu__meta-label">Call clinic</span>
                <span class="mobile-menu__meta-value">${phoneText}</span>
              </span>
            </a>
            <div class="mobile-menu__meta-row mobile-menu__meta-row--static">
              <span class="mobile-menu__meta-icon" aria-hidden="true">📍</span>
              <span>
                <span class="mobile-menu__meta-label">Location</span>
                <span class="mobile-menu__meta-value">Colleyville, TX</span>
              </span>
            </div>
          </div>
        </div>
        <div class="mobile-menu__sticky-ctas">
          <a href="${phoneHref}" class="btn btn-outline-dark mobile-menu__cta">📞 Call</a>
          <a href="${bookHref}" class="btn btn-primary mobile-menu__cta">Book Visit</a>
        </div>
      </div>
    `;
  }

  if (!document.getElementById("mobile-sticky-cta")) {
    const sticky = document.createElement("div");
    sticky.id = "mobile-sticky-cta";
    sticky.className = "mobile-sticky-cta";
    sticky.setAttribute("role", "region");
    sticky.setAttribute("aria-label", "Quick actions");
    sticky.innerHTML = `
      <div class="mobile-sticky-cta__inner">
        <a href="${phoneHref}" class="mobile-sticky-cta__btn mobile-sticky-cta__btn--call">
          <span class="mobile-sticky-cta__label">Call</span>
          <span class="mobile-sticky-cta__value">${phoneText}</span>
        </a>
        <a href="${bookHref}" class="mobile-sticky-cta__btn mobile-sticky-cta__btn--book">
          <span class="mobile-sticky-cta__label">Book</span>
          <span class="mobile-sticky-cta__value">Appointment</span>
        </a>
      </div>
    `;
    document.body.appendChild(sticky);
  }

  const toggle = document.getElementById("nav-toggle");
  let lastFocus = null;

  function setMenuOpen(open) {
    document.body.classList.toggle("menu-open", open);
    if (mobile) {
      mobile.classList.toggle("is-open", open);
      mobile.setAttribute("aria-hidden", open ? "false" : "true");
    }
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.classList.toggle("is-active", open);
    }
    if (open) {
      lastFocus = document.activeElement;
      const closeBtn = mobile && mobile.querySelector(".mobile-menu__close");
      if (closeBtn) closeBtn.focus();
    } else if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  if (toggle) {
    toggle.classList.add("nav-burger");
    toggle.innerHTML = `
      <span class="nav-burger__box" aria-hidden="true">
        <span class="nav-burger__line"></span>
        <span class="nav-burger__line"></span>
        <span class="nav-burger__line"></span>
      </span>
    `;
    toggle.addEventListener("click", () => {
      setMenuOpen(!document.body.classList.contains("menu-open"));
    });
  }

  if (mobile) {
    mobile.querySelectorAll("[data-menu-close]").forEach((el) => {
      el.addEventListener("click", () => setMenuOpen(false));
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
      setMenuOpen(false);
    }
  });

  /* Top bar */
  const topBar = document.getElementById("site-top-bar");
  if (topBar) {
    const addr = (cfg.address && cfg.address.street) || "6416 Colleyville Blvd";
    topBar.innerHTML = `
      <div class="top-bar">
        <div class="container top-bar__inner">
          <p class="top-bar__tagline">Colleyville chiropractic · Webster Certified · HSA/FSA accepted</p>
          <div class="top-bar__contact">
            <a href="${phoneHref}" data-ssw-phone-href><span data-ssw-phone-text>${phoneText}</span></a>
            <span class="top-bar__sep">·</span>
            <span>${addr}</span>
          </div>
        </div>
      </div>
    `;
  }
})();
