import { useEffect, useRef, useState } from "react";
import { fetchPublicSlides } from "../lib/bannerApi";

export default function HomeBannerSlider() {
  const [slides, setSlides] = useState(null);
  const [current, setCurrent] = useState(0);
  const autoTimerRef = useRef(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    fetchPublicSlides().then(setSlides).catch(() => setSlides([]));
  }, []);

  const total = slides?.length || 0;

  const goTo = (n) => {
    if (total === 0) return;
    setCurrent(((n % total) + total) % total);
  };

  const stopAuto = () => clearInterval(autoTimerRef.current);
  const startAuto = () => {
    stopAuto();
    if (total > 1) {
      autoTimerRef.current = setInterval(() => setCurrent((c) => (c + 1) % total), 3500);
    }
  };

  useEffect(() => {
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const handlePrev = () => { stopAuto(); goTo(current - 1); startAuto(); };
  const handleNext = () => { stopAuto(); goTo(current + 1); startAuto(); };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; stopAuto(); };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
    startAuto();
  };

  if (slides === null) {
    return (
      <div className="slider-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <i className="fas fa-circle-notch fa-spin" style={{ fontSize: "2rem", color: "var(--gold)" }}></i>
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <div className="slider-wrap" id="sliderWrap">
      <div className="slide-counter" id="counter">{current + 1} / {total}</div>
      <div
        className="slider-track"
        id="track"
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide) => (
          <div className="slide" key={slide.id}>
            <img src={slide.image_url} alt={slide.title} />
            <div className="slide-caption"><p>{slide.title}</p><span>{slide.subtitle}</span></div>
          </div>
        ))}
      </div>

      <button className="btn-prev" id="btnPrev" aria-label="Previous slide" onClick={handlePrev}>
        <svg viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button className="btn-next" id="btnNext" aria-label="Next slide" onClick={handleNext}>
        <svg viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      <div className="dots" id="dots">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`dot${i === current ? " active" : ""}`}
            onClick={() => { stopAuto(); goTo(i); startAuto(); }}
          ></div>
        ))}
      </div>
    </div>
  );
}