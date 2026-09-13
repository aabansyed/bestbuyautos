import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { getBodyTypeBreakdown } from "../../lib/statsApi";
import {
  createCar,
  updateCar,
  uploadCarImage,
  BODY_TYPES,
  FUEL_TYPES,
  TRANS_TYPES,
  BADGE_TYPES,
} from "../../lib/carsApi";

const emptyCar = {
  brand: "",
  name: "",
  year: new Date().getFullYear(),
  price: "",
  mileage: "",
  fuel: "Petrol",
  trans: "Automatic",
  body: "SUV",
  color: "",
  engine: "",
  hp: "",
  badge: "",
  description: "",
  images: [],
  in_stock: true,
};

export default function CarForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [car, setCar] = useState(emptyCar);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [bodyOptions, setBodyOptions] = useState(BODY_TYPES);
  const [addingBody, setAddingBody] = useState(false);
  const [newBodyValue, setNewBodyValue] = useState("");

  // Body-type dropdown always starts from the built-in list, plus any
  // custom types an admin has already added to real cars in the DB —
  // so once someone adds "Pickup" once, it shows up as a normal option
  // for every future car too.
  useEffect(() => {
    (async () => {
      try {
        const breakdown = await getBodyTypeBreakdown();
        const extra = breakdown.map((b) => b.body).filter((b) => !BODY_TYPES.includes(b));
        if (extra.length) setBodyOptions([...BODY_TYPES, ...extra]);
      } catch {
        // non-critical — falls back to the built-in list
      }
    })();
  }, []);

  const confirmNewBody = () => {
    const value = newBodyValue.trim();
    if (!value) { setAddingBody(false); return; }
    setBodyOptions((prev) => (prev.includes(value) ? prev : [...prev, value]));
    setCar((prev) => ({ ...prev, body: value }));
    setNewBodyValue("");
    setAddingBody(false);
  };

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const { data, error: fetchError } = await supabase.from("cars").select("*").eq("id", id).single();
      if (fetchError) {
        setError(fetchError.message);
      } else {
        setCar(data);
      }
      setLoading(false);
    })();
  }, [id, isEdit]);

  const set = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setCar((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      const urls = [];
      for (const file of files) {
        const url = await uploadCarImage(file);
        urls.push(url);
      }
      setCar((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    } catch (err) {
      setError(err.message || "Image upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (idx) => {
    setCar((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const moveImageToFront = (idx) => {
    setCar((prev) => {
      const imgs = [...prev.images];
      const [picked] = imgs.splice(idx, 1);
      imgs.unshift(picked);
      return { ...prev, images: imgs };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!car.brand.trim() || !car.name.trim() || !car.price || !car.year) {
      setError("Brand, model name, year and price are required.");
      return;
    }

    const payload = {
      brand: car.brand.trim(),
      name: car.name.trim(),
      year: Number(car.year),
      price: Number(car.price),
      mileage: Number(car.mileage) || 0,
      fuel: car.fuel,
      trans: car.trans,
      body: car.body,
      color: car.color.trim(),
      engine: car.engine.trim(),
      hp: Number(car.hp) || 0,
      badge: car.badge,
      description: car.description.trim(),
      images: car.images,
      in_stock: car.in_stock,
    };

    setSaving(true);
    try {
      if (isEdit) {
        await updateCar(id, payload);
      } else {
        await createCar(payload);
      }
      navigate("/admin/cars");
    } catch (err) {
      setError(err.message || "Failed to save car.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading…</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>{isEdit ? "Edit Car" : "Add New Car"}</h1>
          <p className="admin-page-sub">
            {isEdit ? "Update details, images or visibility." : "This car will appear in the site's stock inventory once saved."}
          </p>
        </div>
        <button className="admin-btn-secondary" onClick={() => navigate("/admin/cars")}>
          <i className="fas fa-arrow-left"></i> Back to list
        </button>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          <div className="form-group">
            <label className="form-label">Brand *</label>
            <input className="form-input" value={car.brand} onChange={set("brand")} placeholder="Toyota" />
          </div>
          <div className="form-group">
            <label className="form-label">Model Name *</label>
            <input className="form-input" value={car.name} onChange={set("name")} placeholder="Land Cruiser 200 GX-R" />
          </div>

          <div className="form-group">
            <label className="form-label">Year *</label>
            <input className="form-input" type="number" value={car.year} onChange={set("year")} />
          </div>
          <div className="form-group">
            <label className="form-label">Price (USD) *</label>
            <input className="form-input" type="number" value={car.price} onChange={set("price")} placeholder="52000" />
          </div>

          <div className="form-group">
            <label className="form-label">Mileage (km)</label>
            <input className="form-input" type="number" value={car.mileage} onChange={set("mileage")} placeholder="38000" />
          </div>
          <div className="form-group">
            <label className="form-label">Body Type</label>
            {!addingBody ? (
              <select
                className="form-input"
                value={car.body}
                onChange={(e) => {
                  if (e.target.value === "__add_new__") { setAddingBody(true); return; }
                  set("body")(e);
                }}
              >
                {bodyOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                <option value="__add_new__">+ Add new body type…</option>
              </select>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  className="form-input"
                  autoFocus
                  placeholder="e.g. Pickup Truck"
                  value={newBodyValue}
                  onChange={(e) => setNewBodyValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); confirmNewBody(); }
                    if (e.key === "Escape") { setAddingBody(false); setNewBodyValue(""); }
                  }}
                />
                <button type="button" className="admin-btn-secondary" onClick={confirmNewBody}>
                  <i className="fas fa-check"></i>
                </button>
                <button type="button" className="admin-btn-secondary" onClick={() => { setAddingBody(false); setNewBodyValue(""); }}>
                  <i className="fas fa-xmark"></i>
                </button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Fuel Type</label>
            <select className="form-input" value={car.fuel} onChange={set("fuel")}>
              {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Transmission</label>
            <select className="form-input" value={car.trans} onChange={set("trans")}>
              {TRANS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Color</label>
            <input className="form-input" value={car.color} onChange={set("color")} placeholder="White" />
          </div>
          <div className="form-group">
            <label className="form-label">Engine</label>
            <input className="form-input" value={car.engine} onChange={set("engine")} placeholder="4.0L V6" />
          </div>

          <div className="form-group">
            <label className="form-label">Horsepower</label>
            <input className="form-input" type="number" value={car.hp} onChange={set("hp")} placeholder="270" />
          </div>
          <div className="form-group">
            <label className="form-label">Badge</label>
            <select className="form-input" value={car.badge} onChange={set("badge")}>
              {BADGE_TYPES.map((b) => <option key={b} value={b}>{b || "None"}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-input form-textarea"
            value={car.description}
            onChange={set("description")}
            placeholder="Short marketing description shown in the car's detail view…"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Images</label>
          <div className="admin-image-grid">
            {car.images.map((url, idx) => (
              <div className="admin-image-item" key={url + idx}>
                <img src={url} alt={`Car ${idx + 1}`} />
                {idx === 0 && <span className="admin-image-cover-tag">Cover</span>}
                <div className="admin-image-actions">
                  {idx !== 0 && (
                    <button type="button" title="Make cover image" onClick={() => moveImageToFront(idx)}>
                      <i className="fas fa-star"></i>
                    </button>
                  )}
                  <button type="button" title="Remove" onClick={() => removeImage(idx)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
            <label className="admin-image-upload">
              {uploading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-cloud-arrow-up"></i>}
              <span>{uploading ? "Uploading…" : "Upload"}</span>
              <input type="file" accept="image/*" multiple hidden onChange={handleImageUpload} disabled={uploading} />
            </label>
          </div>
          <p className="admin-hint">First image is used as the cover photo shown on the inventory grid.</p>
        </div>

        <label className="admin-checkbox-row">
          <input type="checkbox" checked={car.in_stock} onChange={set("in_stock")} />
          Visible on the public site (in stock)
        </label>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn-primary" disabled={saving || uploading}>
            <i className="fas fa-save"></i> {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
}