import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllCars, deleteCar, updateCar, BODY_TYPES } from "../../lib/carsApi";

export default function CarsList() {
  const [cars, setCars] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [bodyFilter, setBodyFilter] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    try {
      const data = await fetchAllCars();
      setCars(data);
    } catch (err) {
      setError(err.message || "Failed to load cars.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const bodyTypesInUse = useMemo(() => {
    if (!cars) return BODY_TYPES;
    const set = new Set(cars.map((c) => c.body));
    BODY_TYPES.forEach((b) => set.add(b));
    return Array.from(set);
  }, [cars]);

  const filtered = useMemo(() => {
    if (!cars) return [];
    return cars.filter((c) => {
      const matchesSearch =
        !search ||
        `${c.brand} ${c.name}`.toLowerCase().includes(search.toLowerCase());
      const matchesBody = !bodyFilter || c.body === bodyFilter;
      return matchesSearch && matchesBody;
    });
  }, [cars, search, bodyFilter]);

  const handleDelete = async (car) => {
    if (!window.confirm(`Delete "${car.brand} ${car.name}"? This can't be undone.`)) return;
    setBusyId(car.id);
    try {
      await deleteCar(car.id);
      setCars((prev) => prev.filter((c) => c.id !== car.id));
    } catch (err) {
      alert(err.message || "Failed to delete car.");
    } finally {
      setBusyId(null);
    }
  };

  const handleToggleStock = async (car) => {
    setBusyId(car.id);
    try {
      const updated = await updateCar(car.id, { in_stock: !car.in_stock });
      setCars((prev) => prev.map((c) => (c.id === car.id ? updated : c)));
    } catch (err) {
      alert(err.message || "Failed to update car.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Cars</h1>
          <p className="admin-page-sub">
            {cars ? `${cars.length} total · ${cars.filter((c) => c.in_stock).length} visible on site` : "Loading…"}
          </p>
        </div>
        <Link to="/admin/cars/new" className="admin-btn-primary">
          <i className="fas fa-circle-plus"></i> Add Car
        </Link>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search brand or model…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="admin-select" value={bodyFilter} onChange={(e) => setBodyFilter(e.target.value)}>
          <option value="">All body types</option>
          {bodyTypesInUse.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

      {!cars && !error && (
        <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading cars…</div>
      )}

      {cars && filtered.length === 0 && (
        <div className="admin-empty">
          <i className="fas fa-car-side"></i>
          <p>No cars match your search.</p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Car</th>
                <th>Body</th>
                <th>Year</th>
                <th>Price</th>
                <th>Mileage</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((car) => (
                <tr key={car.id} className={busyId === car.id ? "is-busy" : ""}>
                  <td>
                    <img
                      className="admin-thumb"
                      src={car.images?.[0] || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200"}
                      alt={car.name}
                    />
                  </td>
                  <td>
                    <div className="admin-car-name">{car.brand} {car.name}</div>
                    {car.badge && <span className="admin-badge-pill">{car.badge}</span>}
                  </td>
                  <td>{car.body}</td>
                  <td>{car.year}</td>
                  <td>${Number(car.price).toLocaleString()}</td>
                  <td>{Number(car.mileage).toLocaleString()} km</td>
                  <td>
                    <button
                      className={`admin-status-toggle ${car.in_stock ? "on" : "off"}`}
                      onClick={() => handleToggleStock(car)}
                      disabled={busyId === car.id}
                      title="Toggle visibility on the public site"
                    >
                      <span className="dot"></span> {car.in_stock ? "Live" : "Hidden"}
                    </button>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <Link to={`/admin/cars/${car.id}`} className="admin-icon-btn" title="Edit">
                        <i className="fas fa-pen"></i>
                      </Link>
                      <button
                        className="admin-icon-btn danger"
                        onClick={() => handleDelete(car)}
                        disabled={busyId === car.id}
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}