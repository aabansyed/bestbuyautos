import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPublicCars } from "../lib/carsApi";
import "../styles/discovery.css";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500";

export default function HomeDiscoverySections() {
  const [bodyTypes, setBodyTypes] = useState(null);
  const [models, setModels] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const cars = await fetchPublicCars();

        // ── Body types: one representative card per body type, with count ──
        const byBody = {};
        cars.forEach((c) => {
          if (!byBody[c.body]) byBody[c.body] = { body: c.body, count: 0, image: c.images?.[0] || FALLBACK_IMG };
          byBody[c.body].count++;
        });
        setBodyTypes(Object.values(byBody).sort((a, b) => b.count - a.count).slice(0, 6));

        // ── Popular models: group by brand + model name, most-listed first ──
        const byModel = {};
        cars.forEach((c) => {
          const key = `${c.brand} ${c.name}`;
          if (!byModel[key]) {
            byModel[key] = { key, brand: c.brand, name: c.name, count: 0, image: c.images?.[0] || FALLBACK_IMG };
          }
          byModel[key].count++;
        });
        setModels(Object.values(byModel).sort((a, b) => b.count - a.count).slice(0, 6));
      } catch (err) {
        console.error("Failed to load discovery sections:", err);
        setBodyTypes([]);
        setModels([]);
      }
    })();
  }, []);

  return (
    <>
      {/* ── BROWSE BY BODY TYPE ── */}
      <section className="discover-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-tag">Browse By Category</div>
            <h2 className="section-title">Shop By <span className="gold">Body Type</span></h2>
            <div className="gold-line"></div>
            <p className="section-desc" style={{ marginTop: "16px" }}>
              Pick a body style to see every matching car in stock
            </p>
          </div>

          {bodyTypes === null && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--gray)" }}>
              <i className="fas fa-circle-notch fa-spin" style={{ fontSize: "1.6rem", color: "var(--gold)" }}></i>
            </div>
          )}

          {bodyTypes && bodyTypes.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--gray)" }}>
              No cars in stock yet.
            </div>
          )}

          {bodyTypes && bodyTypes.length > 0 && (
            <div className="discover-grid" data-aos="fade-up" data-aos-delay="100">
              {bodyTypes.map((b) => (
                <Link to={`/stock-cars?body=${encodeURIComponent(b.body)}`} className="discover-card" key={b.body}>
                  <div className="discover-card-img" style={{ backgroundImage: `url(${b.image})` }}>
                    <div className="discover-card-overlay"></div>
                    <span className="discover-count-badge">{b.count} {b.count === 1 ? "car" : "cars"}</span>
                  </div>
                  <div className="discover-card-label">{b.body}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── POPULAR MODELS ── */}
      <section className="discover-section discover-section-alt">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-tag">Trending Now</div>
            <h2 className="section-title">Popular <span className="gold">Models</span></h2>
            <div className="gold-line"></div>
            <p className="section-desc" style={{ marginTop: "16px" }}>
              The models our customers view and ask about most
            </p>
          </div>

          {models && models.length > 0 && (
            <div className="popular-grid" data-aos="fade-up" data-aos-delay="100">
              {models.map((m) => (
                <Link to={`/inventory?q=${encodeURIComponent(m.key)}`} className="popular-card" key={m.key}>
                  <div className="popular-card-img" style={{ backgroundImage: `url(${m.image})` }}></div>
                  <div className="popular-card-brand">{m.brand}</div>
                  <div className="popular-card-name">{m.name} <span>({m.count})</span></div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}