import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchPublicCars } from "../lib/carsApi";
import "../styles/inventory-browse.css";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500";

export default function InventoryBrowse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState(null);
  const [error, setError] = useState("");

  const bodyFilter = searchParams.get("body") || "";
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    (async () => {
      try {
        setCars(await fetchPublicCars());
      } catch (err) {
        setError(err.message || "Failed to load cars.");
      }
    })();
  }, []);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [bodyFilter, query]);

  const bodyTypes = useMemo(() => {
    if (!cars) return [];
    return Array.from(new Set(cars.map((c) => c.body))).sort();
  }, [cars]);

  const filtered = useMemo(() => {
    if (!cars) return [];
    const q = query.trim().toLowerCase();
    return cars.filter((c) => {
      const matchesBody = !bodyFilter || c.body === bodyFilter;
      const matchesQuery = !q || `${c.brand} ${c.name}`.toLowerCase().includes(q);
      return matchesBody && matchesQuery;
    });
  }, [cars, bodyFilter, query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (searchInput.trim()) next.set("q", searchInput.trim());
    else next.delete("q");
    setSearchParams(next);
  };

  const setBodyFilter = (body) => {
    const next = new URLSearchParams(searchParams);
    if (body) next.set("body", body);
    else next.delete("body");
    setSearchParams(next);
  };

  return (
    <div className="inv-browse">
      <section className="breadcrumb-banner">
        <h1>{bodyFilter || "Browse"} Stock Cars</h1>
        <div className="breadcrumb-nav">
          <Link to="/">Home</Link>
          <span className="sep"><i className="fas fa-chevron-right" style={{ fontSize: ".7rem" }}></i></span>
          <span className="current">Inventory</span>
        </div>
      </section>

      <div className="container inv-browse-body">
        <form className="inv-search-bar" onSubmit={handleSearchSubmit}>
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by brand or model…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {(query || bodyFilter) && (
            <button
              type="button"
              className="inv-clear-btn"
              onClick={() => { setSearchParams({}); setSearchInput(""); }}
            >
              Clear <i className="fas fa-xmark"></i>
            </button>
          )}
          <button type="submit" className="btn-hero-primary">Search</button>
        </form>

        <div className="inv-chips">
          <button className={`inv-chip ${!bodyFilter ? "active" : ""}`} onClick={() => setBodyFilter("")}>
            All Types
          </button>
          {bodyTypes.map((b) => (
            <button key={b} className={`inv-chip ${bodyFilter === b ? "active" : ""}`} onClick={() => setBodyFilter(b)}>
              {b}
            </button>
          ))}
        </div>

        {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

        {cars === null && !error && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray)" }}>
            <i className="fas fa-circle-notch fa-spin" style={{ fontSize: "2rem", color: "var(--gold)" }}></i>
          </div>
        )}

        {cars && (
          <p className="inv-result-count">
            {filtered.length} {filtered.length === 1 ? "car" : "cars"} found
            {bodyFilter ? ` in ${bodyFilter}` : ""}{query ? ` matching "${query}"` : ""}
          </p>
        )}

        {cars && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray)" }}>
            <i className="fas fa-car-side" style={{ fontSize: "2rem", display: "block", marginBottom: 12, color: "var(--gold)" }}></i>
            No cars match your search. Try a different body type or keyword.
          </div>
        )}

        {filtered.length > 0 && (
          <div className="inv-grid">
            {filtered.map((car) => (
              <div className="inv-card" key={car.id}>
                <div className="inv-card-img" style={{ backgroundImage: `url(${car.images?.[0] || FALLBACK_IMG})` }}>
                  {car.badge && <span className={`car-badge ${car.badge.toLowerCase()}`}>{car.badge}</span>}
                </div>
                <div className="inv-card-body">
                  <div className="inv-card-brand">{car.brand}</div>
                  <div className="inv-card-name">{car.name}</div>
                  <div className="inv-card-specs">
                    <span><i className="fas fa-calendar"></i> {car.year}</span>
                    <span><i className="fas fa-road"></i> {Number(car.mileage).toLocaleString()} km</span>
                    <span><i className="fas fa-gas-pump"></i> {car.fuel}</span>
                  </div>
                  <div className="inv-card-footer">
                    <div className="inv-card-price">${Number(car.price).toLocaleString()}</div>
                    <Link to={`/stock-cars?carId=${car.id}`} className="btn-hero-primary inv-view-btn">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}