(function () {
  const form = document.getElementById("appointment-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const success = document.getElementById("form-success");
  const refEl = document.getElementById("booking-ref");
  const dateInput = form.querySelector('input[name="preferredDate"]');

  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // Prefill service from ?service= query
  const params = new URLSearchParams(window.location.search);
  const service = params.get("service");
  const promo = params.get("promo");
  const serviceSelect = form.querySelector('select[name="service"]');
  const newPatientCheck = form.querySelector('input[name="isNewPatient"]');
  if (service && serviceSelect) {
    const opt = Array.from(serviceSelect.options).find((o) => o.value === service);
    if (opt) serviceSelect.value = service;
  }
  if ((promo === "1" || promo === "true") && newPatientCheck) {
    newPatientCheck.checked = true;
  }

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }
  function validatePhone(val) {
    return /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(val);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const date = (data.get("preferredDate") || "").toString().trim();

    if (!name || !email || !phone || !date) {
      if (status) {
        status.className = "form-status form-status--error";
        status.textContent = "Please complete name, email, phone, and preferred date.";
      }
      return;
    }
    if (!validateEmail(email)) {
      if (status) {
        status.className = "form-status form-status--error";
        status.textContent = "Please enter a valid email address.";
      }
      return;
    }
    if (!validatePhone(phone)) {
      if (status) {
        status.className = "form-status form-status--error";
        status.textContent = "Please enter a valid 10-digit phone number.";
      }
      return;
    }

    // Block weekends (UTC day from date string)
    const day = new Date(date + "T12:00:00").getDay();
    if (day === 0 || day === 6) {
      if (status) {
        status.className = "form-status form-status--error";
        status.textContent = "We are closed on weekends. Please choose Monday–Friday.";
      }
      return;
    }

    const ref = "SUMMIT-" + Math.floor(100000 + Math.random() * 900000);
    if (refEl) refEl.textContent = ref;
    if (status) status.textContent = "";
    form.classList.add("hidden");
    if (success) {
      success.classList.remove("hidden");
      success.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
})();
