import Price from "./Price";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFeaturedCars } from "../lib/carsApi";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800";

export default function FeaturedCarsSection() {
  const [cars, setCars] = useState(null);

  useEffect(() => {
    fetchFeaturedCars().then(setCars).catch(() => setCars([]));
  }, []);

  return (
    <section id="inventory">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <div className="section-tag">Handpicked For You</div>
          <h2 className="section-title">Featured <span className="gold">Vehicles</span></h2>
          <div className="gold-line"></div>
          <p className="section-desc" style={{ marginTop: "16px" }}>
            A few of our team's current top picks — browse our full stock for everything we have available
          </p>
        </div>

        {cars === null && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray)" }}>
            <i className="fas fa-circle-notch fa-spin" style={{ fontSize: "1.8rem", color: "var(--gold)" }}></i>
          </div>
        )}

        {cars && cars.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray)" }}>
            <i className="fas fa-car" style={{ fontSize: "2rem", display: "block", marginBottom: 12, color: "var(--dark3)" }}></i>
            No featured vehicles right now — check out our full stock instead.
          </div>
        )}

        {cars && cars.length > 0 && (
          <div className="cars-grid" data-aos="fade-up" data-aos-delay="100">
            {cars.map((car) => (
              <div className="car-card" key={car.id}>
                <div className="car-img-wrap">
                  {car.badge && <div className={`car-badge ${car.badge === "New" ? "new" : car.badge === "Hot" ? "hot" : ""}`}>{car.badge}</div>}
                  <img
                    src={car.images?.[0] || FALLBACK_IMG}
                    alt={car.name}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                  />
                </div>
                <div className="car-body">
                  <div className="car-brand">{car.brand}</div>
                  <div className="car-name">{car.name}</div>
                  <div className="car-specs">
                    <div className="spec-pill"><i className="fas fa-calendar"></i> {car.year}</div>
                    <div className="spec-pill"><i className="fas fa-tachometer-alt"></i> {Number(car.mileage).toLocaleString()} km</div>
                    <div className="spec-pill"><i className="fas fa-gas-pump"></i> {car.fuel}</div>
                    <div className="spec-pill"><i className="fas fa-cogs"></i> {car.trans}</div>
                  </div>
                  <div className="car-footer">
                    <div className="car-price"><Price usd={car.price} /></div>
                    <div className="car-actions">
                      <Link to={`/stock-cars?carId=${car.id}`} className="btn-card btn-card-primary">View</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="load-more-wrap" data-aos="fade-up">
          <Link to="/stock-cars" className="btn-hero-primary">
            <i className="fas fa-car"></i> View All Stock Cars
          </Link>
        </div>
      </div>
    </section>
  );
}