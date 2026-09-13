export function initPartnersPage() {
  function animateStats() {
    const items = [
      { id: "p1", end: 85, suffix: "+" },
      { id: "p2", end: 6, suffix: "" },
      { id: "p3", end: 42, suffix: "+" },
      { id: "p4", end: 12, suffix: "" },
    ];
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      let start = 0;
      const step = (item.end / 2000) * 16;
      const timer = setInterval(() => {
        start += step;
        if (start >= item.end) { start = item.end; clearInterval(timer); }
        el.textContent = Math.floor(start) + item.suffix;
      }, 16);
    });
  }

  function filterPartners(cat, btn) {
    document.querySelectorAll(".cat-tab").forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".partner-card").forEach((card) => {
      const show = cat === "all" || card.dataset.cat === cat;
      card.style.display = show ? "" : "none";
    });
  }

  function submitPartner() {
    const val = (id) => document.getElementById(id)?.value || "";
    const company = val("pCompany");
    const name = val("pName");
    const email = val("pEmail");
    const type = val("pType");
    const msg = val("pMsg");
    const country = val("pCountry");
    if (!company || !name || !email) {
      window.showToast("Please fill all required fields", "info");
      return;
    }
    const subject = `Partnership Inquiry – ${company} (${type})`;
    const body = `Company: ${company}\nCountry: ${country}\nContact: ${name}\nEmail: ${email}\nType: ${type}\n\n${msg}`;
    window.location.href = `mailto:sales@bestbuyauto.jp?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.showToast("Partnership inquiry sent! We will respond in 2 business days. 🤝", "success");
  }

  window.filterPartners = filterPartners;
  window.submitPartner = submitPartner;

  const t = setTimeout(animateStats, 400);
  return () => clearTimeout(t);
}
