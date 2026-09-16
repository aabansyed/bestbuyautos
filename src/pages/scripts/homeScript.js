import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initHomePage() {
  const timers = [];

  function initGSAP() {
    const title = document.getElementById('heroTitle');
    if (title) {
      gsap.from(title, { opacity: 0, y: 40, duration: 1, ease: 'power3.out', delay: .3 });
    }
    gsap.to('.nav-logo', { opacity: 1, duration: .5, delay: .5 });
    gsap.utils.toArray('.gold-line').forEach((el) => {
      gsap.from(el, {
        scaleX: 0, transformOrigin: 'left', duration: .8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });
  }

  const t = setTimeout(initGSAP, 300);
  timers.push(t);

  return function cleanup() {
    timers.forEach(clearTimeout);
  };
}