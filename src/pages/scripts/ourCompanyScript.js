import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initOurCompanyPage() {
  const titles = {
    company:
      'Japan\'s Most <span style="background:linear-gradient(135deg,var(--gold-dark),var(--gold-light));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Trusted</span> Car Exporter',
    process:
      'How We <span style="background:linear-gradient(135deg,var(--gold-dark),var(--gold-light));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Get It Done</span>',
  };

  function switchPage(page) {
    document.querySelectorAll(".page-section").forEach((s) => s.classList.remove("active"));
    document.querySelectorAll(".page-tab").forEach((t) => t.classList.remove("active"));
    document.getElementById("page-" + page)?.classList.add("active");
    document.getElementById("tab-" + page)?.classList.add("active");
    const heroTitle = document.getElementById("heroTitle");
    if (heroTitle) heroTitle.innerHTML = titles[page] || titles.company;
    const tabsWrap = document.querySelector(".page-tabs-wrap");
    if (tabsWrap) {
      window.scrollTo({ top: tabsWrap.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    }
  }
  window.switchPage = switchPage;

  if (window.location.hash === "#process") switchPage("process");

  const st = [];
  gsap.utils.toArray(".gold-line").forEach((el) => {
    st.push(
      gsap.from(el, { scaleX: 0, transformOrigin: "left", duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } })
    );
  });

  return function cleanup() {
    st.forEach((t) => t.scrollTrigger && t.scrollTrigger.kill());
  };
}
