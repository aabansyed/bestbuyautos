import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllAuctionCars, deleteAuctionCar, updateAuctionCar } from "../../lib/auctionCarsApi";

export default function AuctionCarsList() {
  const [cars, setCars] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    try {
      setCars(await fetchAllAuctionCars());
    } catch (err) {
      setError(err.message || "Failed to load auction listings.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!cars) return [];
    const q = search.toLowerCase();
    return cars.filter(
      (c) =>
        !q ||
        `${c.brand} ${c.name} ${c.lot_number} ${c.auction_house}`.toLowerCase().includes(q)
    );
  }, [cars, search]);

  const handleDelete = async (car) => {
    if (!window.confirm(`Delete "${car.brand} ${car.name}"? This can't be undone.`)) return;
    setBusyId(car.id);
    try {
      await deleteAuctionCar(car.id);
      setCars((prev) => prev.filter((c) => c.id !== car.id));
    } catch (err) {
      alert(err.message || "Failed to delete listing.");
    } finally {
      setBusyId(null);
    }
  };

  const handleToggleStock = async (car) => {
    setBusyId(car.id);
    try {
      const updated = await updateAuctionCar(car.id, { in_stock: !car.in_stock });
      setCars((prev) => prev.map((c) => (c.id === car.id ? updated : c)));
    } catch (err) {
      alert(err.message || "Failed to update listing.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Auction Cars</h1>
          <p className="admin-page-sub">
            {cars ? `${cars.length} total · ${cars.filter((c) => c.in_stock).length} live on the /auction page` : "Loading…"}
          </p>
        </div>
        <Link to="/admin/auction-cars/new" className="admin-btn-primary">
          <i className="fas fa-circle-plus"></i> Add Listing
        </Link>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search brand, model, lot #, auction house…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

      {!cars && !error && (
        <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading listings…</div>
      )}

      {cars && filtered.length === 0 && (
        <div className="admin-empty">
          <i className="fas fa-gavel"></i>
          <p>No auction listings match your search.</p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Car</th>
                <th>Grade</th>
                <th>Auction House</th>
                <th>Lot #</th>
                <th>Price</th>
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
                  <td>{car.grade || "—"}</td>
                  <td>{car.auction_house || "—"}</td>
                  <td>{car.lot_number || "—"}</td>
                  <td>${Number(car.price).toLocaleString()}</td>
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
                      <Link to={`/admin/auction-cars/${car.id}`} className="admin-icon-btn" title="Edit">
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