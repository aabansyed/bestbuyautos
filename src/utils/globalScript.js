// Shared site-wide utility functions, ported from the original static site's
// inline <script> blocks. Attached to window so JSX onClick handlers
// (converted from the original onclick="..." attributes) keep working.
// Called once from Layout.jsx on mount.

export function initGlobalScript() {
  if (window.__bbaGlobalInit) return; // avoid double-binding on re-mounts
  window.__bbaGlobalInit = true;

  // ── MODAL HELPERS ──────────────────────────────────────────────
  window.openModal = function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  window.closeModal = function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("active");
    document.body.style.overflow = "";
  };
  document.addEventListener("click", (e) => {
    if (e.target.classList && e.target.classList.contains("modal-overlay")) {
      window.closeModal(e.target.id);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.active").forEach((m) => window.closeModal(m.id));
    }
  });

  // ── TOAST ───────────────────────────────────────────────────────
  let toastTimeout;
  window.showToast = function (msg, type = "info") {
    const toast = document.getElementById("toast");
    if (!toast) return;
    const icon = toast.querySelector("i");
    const msgEl = document.getElementById("toastMsg");
    if (msgEl) msgEl.textContent = msg;
    toast.className = `toast ${type} show`;
    if (icon) icon.className = type === "success" ? "fas fa-check-circle" : "fas fa-info-circle";
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 3500);
  };

  // ── AUTH MODAL ──────────────────────────────────────────────────
  window.switchAuth = function (tab, btn) {
    document.querySelectorAll(".auth-tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".auth-form").forEach((f) => f.classList.remove("active"));
    const form = document.getElementById(tab + "Form");
    if (form) form.classList.add("active");
    if (btn) {
      btn.classList.add("active");
    } else {
      const tabs = document.querySelectorAll(".auth-tab");
      if (tabs[tab === "login" ? 0 : 1]) tabs[tab === "login" ? 0 : 1].classList.add("active");
    }
  };
  window.authLogin = function () {
    window.closeModal("authModal");
    window.showToast("Welcome back! You are logged in. 👋", "success");
  };
  window.authSignup = function () {
    window.closeModal("authModal");
    window.showToast("Account created! Welcome to BestBuy Auto 🎉", "success");
  };

  // ── FAQ ACCORDION ───────────────────────────────────────────────
  window.toggleFaq = function (el) {
    const item = el.parentElement;
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((f) => f.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  };

  // ── CONTACT FORM ─────────────────────────────────────────────────
  window.sendInquiry = function () {
    const name = document.getElementById("cName")?.value;
    const email = document.getElementById("cEmail")?.value;
    const subj = document.getElementById("cSubject")?.value;
    const msg = document.getElementById("cMessage")?.value;
    if (!name || !email || !msg) {
      window.showToast("Please fill all fields", "info");
      return;
    }
    window.location.href = `mailto:sales@bestbuyauto.jp?subject=${encodeURIComponent(
      subj || ""
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`)}`;
    window.showToast("Opening email client… 📩", "success");
  };

  // ── SHIPPING CALCULATOR ──────────────────────────────────────────
  window.calcShipping = function () {
    const sel = document.getElementById("calcCountry");
    if (!sel) return;
    const opt = sel.options[sel.selectedIndex];
    const baseCost = parseFloat(opt?.dataset.cost || 0);
    const days = opt?.dataset.days || "—";
    const vMult = parseFloat(document.getElementById("calcType")?.value || 1);
    const cMult = parseFloat(document.getElementById("calcContainer")?.value || 1);
    if (!baseCost) {
      window.showToast("Please select a destination country", "info");
      return;
    }
    const total = Math.round(baseCost * vMult * cMult);
    const costEl = document.getElementById("calcCostVal");
    const daysEl = document.getElementById("calcDaysVal");
    if (costEl) costEl.textContent = `$${total.toLocaleString()} – $${(total + 350).toLocaleString()} USD`;
    if (daysEl) daysEl.textContent = `${days} days`;
    const res = document.getElementById("calcResult");
    if (res) res.classList.add("show");
  };

  // ── WETALK CHAT WIDGET ───────────────────────────────────────────
  const wetalkResponses = [
    "Thank you for your message! One of our agents will assist you shortly. 🙏",
    "Great question! Our team is checking the details for you right now.",
    "We have that information ready. Could you share your preferred country for export?",
    "Absolutely! We can arrange a competitive price for that vehicle. Please send your offer!",
    "We ship to 120+ countries worldwide. Which country are you importing to?",
    "Our shipping cost calculator can give you an estimate. Or I can check manually for you!",
  ];
  let wetalkResponseIdx = 0;

  window.escapeHtml = function (s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };
  window.toggleWeTalk = function () {
    document.getElementById("wetalkPanel")?.classList.toggle("open");
  };
  window.sendWeTalk = function () {
    const input = document.getElementById("wetalkInput");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    const msgs = document.getElementById("wetalkMessages");
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    msgs.innerHTML += `<div class="msg user">${window.escapeHtml(text)}<div class="msg-time">${time}</div></div>`;
    input.value = "";
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => {
      const resp = wetalkResponses[wetalkResponseIdx % wetalkResponses.length];
      wetalkResponseIdx++;
      const t2 = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      msgs.innerHTML += `<div class="msg bot">${resp}<div class="msg-time">${t2}</div></div>`;
      msgs.scrollTop = msgs.scrollHeight;
    }, 1000 + Math.random() * 800);
  };
}
