export function initAuctionPage() {
  function toggleFaq(btn, listId) {
    const item = btn.parentElement;
    const list = document.getElementById(listId);
    if (!list) return;
    const isOpen = item.classList.contains("open");
    list.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  }
  window.toggleFaq = toggleFaq;

  const btn = document.querySelector(".newsletter-btn");
  const onSubscribe = function () {
    const inp = document.querySelector(".newsletter-input");
    if (!inp.value || !inp.value.includes("@")) { inp.style.borderColor = "#e74c3c"; return; }
    inp.style.borderColor = "var(--gold)";
    btn.textContent = "✓ Subscribed!";
    setTimeout(() => { btn.textContent = "SUBSCRIBE"; inp.value = ""; inp.style.borderColor = ""; }, 2500);
  };
  btn?.addEventListener("click", onSubscribe);

  const backTop = document.getElementById("backTop");
  const onScroll = () => {
    if (backTop) backTop.style.display = window.scrollY > 400 ? "flex" : "none";
  };
  window.addEventListener("scroll", onScroll);

  return function cleanup() {
    btn?.removeEventListener("click", onSubscribe);
    window.removeEventListener("scroll", onScroll);
  };
}
