import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPublicCars } from "../lib/carsApi";
import "../styles/discovery.css";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500";

export default function HomeDiscoverySections() {
  const [brands, setBrands] = useState(null);
  const [models, setModels] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const cars = await fetchPublicCars();

        const byBrand = {};
        cars.forEach((c) => {
          byBrand[c.brand] = (byBrand[c.brand] || 0) + 1;
        });
        setBrands(
          Object.entries(byBrand)
            .map(([brand, count]) => ({ brand, count }))
            .sort((a, b) => b.count - a.count)
        );

        const byModel = {};
        cars.forEach((c) => {
          const key = `${c.brand} ${c.name}`;
          if (!byModel[key]) {
            byModel[key] = { key, brand: c.brand, name: c.name, count: 0, image: c.images?.[0] || FALLBACK_IMG };
          }
          byModel[key].count++;
        });
        setModels(Object.values(byModel).sort((a, b) => b.count - a.count).slice(0, 5));

        const bodySet = new Set(cars.map((c) => c.body).filter(Boolean));
        const fuelSet = new Set(cars.map((c) => c.fuel).filter(Boolean));
        setTags([
          ...Array.from(bodySet).map((b) => ({ label: b, href: `/stock-cars?body=${encodeURIComponent(b)}` })),
          ...Array.from(fuelSet).map((f) => ({ label: f, href: `/stock-cars?fuel=${encodeURIComponent(f)}` })),
        ]);
      } catch (err) {
        console.error("Failed to load discovery sections:", err);
        setBrands([]);
        setModels([]);
      }
    })();
  }, []);

  return (
    <section className="brand-browse-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <div className="section-tag">Browse Our Inventory</div>
          <h2 className="section-title">Find Your Car By <span className="gold">Brand</span></h2>
          <div className="gold-line"></div>
        </div>

        {brands === null && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--gray)" }}>
            <i className="fas fa-circle-notch fa-spin" style={{ fontSize: "1.6rem", color: "var(--gold)" }}></i>
          </div>
        )}

        {brands && (
          <div className="brand-browse-grid" data-aos="fade-up" data-aos-delay="100">

            <aside className="brand-sidebar">
              <div className="brand-sidebar-header">Browse By Car Brand</div>
              <div className="brand-list">
                {brands.length === 0 && (
                  <div className="brand-empty">No cars in stock yet.</div>
                )}
                {brands.map((b) => (
                  <Link to={`/stock-cars?brand=${encodeURIComponent(b.brand)}`} className="brand-row" key={b.brand}>
                    <span className="brand-icon"><i className="fas fa-car-side"></i></span>
                    <span className="brand-name">{b.brand}</span>
                    <span className="brand-count">({b.count})</span>
                  </Link>
                ))}
              </div>
            </aside>

            <div className="brand-browse-main">
              <div className="brand-browse-topbar">
                <span>For You To Choose</span>
                <Link to="/stock-cars">Search Cars <i className="fas fa-chevron-right" style={{ fontSize: ".72rem" }}></i></Link>
              </div>

              <h3 className="brand-browse-subhead">Top Viewed Models</h3>
              {models && models.length > 0 ? (
                <div className="top-models-row">
                  {models.map((m) => (
                    <Link to={`/stock-cars?q=${encodeURIComponent(m.key)}`} className="top-model-card" key={m.key}>
                      <div className="top-model-img" style={{ backgroundImage: `url(${m.image})` }}></div>
                      <div className="top-model-brand">{m.brand}</div>
                      <div className="top-model-name">{m.name} <span>({m.count})</span></div>
                    </Link>
                  ))}
                </div>
              ) : (
                models && <div className="brand-empty">No models yet.</div>
              )}

              <h3 className="brand-browse-subhead">Popular Tags</h3>
              {tags.length > 0 ? (
                <div className="popular-tags-row">
                  {tags.map((t) => (
                    <Link to={t.href} className="popular-tag-pill" key={t.label}>{t.label}</Link>
                  ))}
                </div>
              ) : (
                <div className="brand-empty">No tags yet.</div>
              )}
            </div>

          </div>
        )}
      </div>
    </section>
  );
}