(function () {
  const cfg = window.SSW || {};

  document.querySelectorAll("[data-ssw-phone-text]").forEach((el) => {
    el.textContent = cfg.phone || el.textContent;
  });
  document.querySelectorAll("[data-ssw-phone-href]").forEach((el) => {
    if (cfg.phoneHref) el.setAttribute("href", cfg.phoneHref);
  });
  document.querySelectorAll("[data-ssw-email-text]").forEach((el) => {
    el.textContent = cfg.email || el.textContent;
  });
  document.querySelectorAll("[data-ssw-email-href]").forEach((el) => {
    if (cfg.emailHref) el.setAttribute("href", cfg.emailHref);
  });

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  /* FAQ accordion */
  document.querySelectorAll("[data-faq-item]").forEach((item) => {
    const btn = item.querySelector("[data-faq-toggle]");
    const panel = item.querySelector("[data-faq-panel]");
    if (!btn || !panel) return;
    btn.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      panel.hidden = !open;
    });
  });

  /* Service filter tabs on services page / home */
  const filterRoot = document.querySelector("[data-service-filters]");
  if (filterRoot) {
    const buttons = filterRoot.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll("[data-service-category]");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const value = btn.getAttribute("data-filter") || "all";
        buttons.forEach((b) => b.classList.toggle("is-active", b === btn));
        cards.forEach((card) => {
          const cat = card.getAttribute("data-service-category");
          const show = value === "all" || cat === value;
          card.classList.toggle("hidden", !show);
        });
      });
    });
  }

  /* Header scroll shadow */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
