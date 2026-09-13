import { useEffect, useState } from "react";
import { fetchPublicPartners } from "../lib/partnersApi";

const CATEGORY_LABELS = {
  all: "All",
  shipping: "🚢 Shipping",
  inspection: "🔍 Inspection",
  banking: "🏦 Banking",
  clearing: "📋 Clearing",
};

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function PartnersGrid() {
  const [partners, setPartners] = useState(null);
  const [activeCat, setActiveCat] = useState("all");

  useEffect(() => {
    fetchPublicPartners().then(setPartners).catch(() => setPartners([]));
  }, []);

  const filtered = partners ? partners.filter((p) => activeCat === "all" || p.category === activeCat) : [];

  return (
    <>
      <div className="cat-tabs" data-aos="fade-up" data-aos-delay="80">
        {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
          <button
            key={cat}
            className={`cat-tab${activeCat === cat ? " active" : ""}`}
            onClick={() => setActiveCat(cat)}
          >
            {label}
          </button>
        ))}
      </div>

      {partners === null && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray)" }}>
          <i className="fas fa-circle-notch fa-spin" style={{ fontSize: "1.8rem", color: "var(--gold)" }}></i>
        </div>
      )}

      {partners && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray)" }}>
          No partners in this category yet.
        </div>
      )}

      <div className="partners-grid" id="partnersGrid">
        {filtered.map((p) => {
          const tags = (p.tags || "").split(",").map((t) => t.trim()).filter(Boolean);
          return (
            <div className="partner-card" key={p.id} data-cat={p.category} data-aos="fade-up">
              <div
                className="partner-card-top"
                style={{ background: `linear-gradient(135deg,${hexToRgba(p.accent_color, 0.28)},${hexToRgba(p.accent_color, 0.6)})` }}
              >
                <div className="partner-logo-icon">{p.icon}</div>
                <span
                  className="partner-cat-badge"
                  style={{
                    background: hexToRgba(p.accent_color, 0.2),
                    border: `1px solid ${hexToRgba(p.accent_color, 0.4)}`,
                    color: p.accent_color,
                  }}
                >
                  {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
                </span>
              </div>
              <div className="partner-card-body">
                <div className="partner-name">{p.name}</div>
                <div className="partner-type"><i className="fas fa-building"></i> {p.type_label}</div>
                <div className="partner-desc">{p.description}</div>
                {tags.length > 0 && (
                  <div className="partner-tags">
                    {tags.map((t) => <div className="p-tag" key={t}>{t}</div>)}
                  </div>
                )}
              </div>
              <div className="partner-card-footer">
                <div className="partner-since">Partner Since {p.partner_since}</div>
                <a href={p.link_url} className="partner-link">Visit <i className="fas fa-arrow-right"></i></a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}