import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPublicCars } from "../lib/carsApi";
import "../styles/hero-search.css";

const MAKES = [
  "Toyota", "Nissan", "Honda", "Lexus", "Mitsubishi", "Mazda",
  "Subaru", "BMW", "Mercedes", "Audi", "Land Rover", "Porsche",
];
const BODY_TYPES = ["Sedan", "SUV", "Coupe", "Hatchback", "Van", "Truck"];
// Values yahan StockCars.jsx ke filters (fPrice / fYear) se match karte hain
const PRICE_RANGES = [
  { value: "0-5000", label: "Under $5,000" },
  { value: "5000-15000", label: "$5,000 – $15,000" },
  { value: "15000-30000", label: "$15,000 – $30,000" },
  { value: "30000-60000", label: "$30,000 – $60,000" },
  { value: "60000+", label: "$60,000+" },
];
const YEAR_RANGES = [
  { value: "2023-2026", label: "2023 – 2026" },
  { value: "2020-2022", label: "2020 – 2022" },
  { value: "2015-2019", label: "2015 – 2019" },
  { value: "2010-2014", label: "2010 – 2014" },
  { value: "2000-2009", label: "2000 – 2009" },
];
const MILEAGES = [
  { value: "20000", label: "Up to 20,000 km" },
  { value: "50000", label: "Up to 50,000 km" },
  { value: "100000", label: "Up to 100,000 km" },
  { value: "150000", label: "Up to 150,000 km" },
  { value: "200000", label: "Up to 200,000 km" },
];

export default function HeroSearch() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [form, setForm] = useState({ q: "", body: "", price: "", year: "", mileage: "" });

  useEffect(() => {
    let cancelled = false;
    fetchPublicCars()
      .then((cars) => { if (!cancelled) setCount(cars.length); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(form).forEach(([k, v]) => {
      const val = String(v).trim();
      if (val) params.set(k, val);
    });
    const qs = params.toString();
    navigate(`/stock-cars${qs ? `?${qs}` : ""}`);
  };

  return (
    <div className="hero-search">
      <h2 className="hero-search-title">DRIVE WHAT'S NEXT</h2>

      <form className="hero-search-card" onSubmit={handleSubmit}>
        <div className="hero-search-count">
          {count !== null ? `${count.toLocaleString()} Cars` : "Cars"}
        </div>

        <div className="hs-field">
          <input
            type="text"
            list="hsMakes"
            placeholder="Select a Make and Model"
            value={form.q}
            onChange={update("q")}
          />
          <datalist id="hsMakes">
            {MAKES.map((m) => <option key={m} value={m} />)}
          </datalist>
          <i className="fas fa-circle-plus"></i>
        </div>

        <div className="hs-field">
          <select value={form.body} onChange={update("body")}>
            <option value="">Select Body Type</option>
            {BODY_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <i className="fas fa-circle-plus"></i>
        </div>

        <div className="hs-field">
          <select value={form.price} onChange={update("price")}>
            <option value="">Select Vehicle Price Range</option>
            {PRICE_RANGES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
          <i className="fas fa-circle-plus"></i>
        </div>

        <div className="hs-field">
          <select value={form.year} onChange={update("year")}>
            <option value="">Select Year Range</option>
            {YEAR_RANGES.map((y) => <option key={y.value} value={y.value}>{y.label}</option>)}
          </select>
          <i className="fas fa-circle-plus"></i>
        </div>

        <div className="hs-field">
          <select value={form.mileage} onChange={update("mileage")}>
            <option value="">Select Mileage(km)</option>
            {MILEAGES.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
          <i className="fas fa-circle-plus"></i>
        </div>

        <button type="submit" className="hero-search-btn">
          <i className="fas fa-search"></i> Search
        </button>
      </form>
    </div>
  );
}