import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { getBodyTypeBreakdown } from "../../lib/statsApi";
import {
  createCar,
  updateCar,
  uploadCarImage,
  fetchDistinctBrands,
  BODY_TYPES,
  FUEL_TYPES,
  TRANS_TYPES,
  BADGE_TYPES,
  STEERING_TYPES,
  DRIVE_TYPES,
  REPAIR_TYPES,
  MONTHS,
} from "../../lib/carsApi";
import { fetchMakes, fetchModels, fetchBodyTypesCatalog, createMake, createModel, createBodyType } from "../../lib/catalogApi";
const emptyCar = {
  brand: "",
  name: "",
  model_code: "",
  stock_id: "",
  chassis_number: "",
  year: new Date().getFullYear(),
  reg_month: "",
  manufacture_year: "",
  price: "",
  mileage: "",
  fuel: "Petrol",
  trans: "Automatic",
  body: "SUV",
  color: "",
  engine: "",
  engine_code: "",
  displacement_cc: "",
  hp: "",
  drive: "",
  steering: "Right",
  doors: "",
  seats: "",
  repair_history: "No Repair History",
  location: "YOKOHAMA, JAPAN",
  badge: "",
  description: "",
  images: [],
  in_stock: true,
  featured: false,
};

// Generic "pick existing or add new" field (used for body type).
function PickOrAdd({ label, value, options, onPick, onAdd, placeholder, blank, disabled }) {
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState("");
  const confirm = () => {
    const v = text.trim();
    if (v) onAdd(v);
    setText("");
    setAdding(false);
  };
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {!adding ? (
        <select
          className="form-input"
          value={value}
          disabled={disabled}
          onChange={(e) => (e.target.value === "__add_new__" ? setAdding(true) : onPick(e.target.value))}
        >
          {blank && <option value="">{blank}</option>}
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
          <option value="__add_new__">+ Add new…</option>
        </select>
      ) : (
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="form-input"
            autoFocus
            placeholder={placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); confirm(); }
              if (e.key === "Escape") { setAdding(false); setText(""); }
            }}
          />
          <button type="button" className="admin-btn-secondary" onClick={confirm}><i className="fas fa-check"></i></button>
          <button type="button" className="admin-btn-secondary" onClick={() => { setAdding(false); setText(""); }}><i className="fas fa-xmark"></i></button>
        </div>
      )}
    </div>
  );
}

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
  const [brandOptions, setBrandOptions] = useState([]);
  const [catalog, setCatalog] = useState({ makes: [], models: [] });
  const [addingBrand, setAddingBrand] = useState(false);
  const [newBrandValue, setNewBrandValue] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [brands, makes, models, bodies] = await Promise.all([
          fetchDistinctBrands(),
          fetchMakes().catch(() => []),
          fetchModels().catch(() => []),
          fetchBodyTypesCatalog().catch(() => []),
        ]);
        setCatalog({ makes, models });
        setBrandOptions([...new Set([...makes.map((m) => m.name), ...brands])].sort());
        if (bodies.length) setBodyOptions(bodies.map((b) => b.name));
      } catch {
        // non-critical — the "+ Add new brand" option still works
      }
    })();
  }, []);

  const confirmNewBrand = () => {
    const value = newBrandValue.trim();
    if (!value) { setAddingBrand(false); return; }
    setBrandOptions((prev) => (prev.includes(value) ? prev : [...prev, value].sort()));
    createMake(value).then((m) => setCatalog((c) => ({ ...c, makes: [...c.makes, m] }))).catch(() => {});
    setCar((prev) => ({ ...prev, brand: value }));
    setNewBrandValue("");
    setAddingBrand(false);
  };
  // Body-type dropdown always starts from the built-in list, plus any
  // custom types an admin has already added to real cars in the DB —
  // so once someone adds "Pickup" once, it shows up as a normal option
  // for every future car too.
  useEffect(() => {
    (async () => {
      try {
        const breakdown = await getBodyTypeBreakdown();
        const extra = breakdown.map((b) => b.body).filter((b) => !BODY_TYPES.includes(b));
        if (extra.length) setBodyOptions((prev) => [...new Set([...prev, ...extra])]);
      } catch {
        // non-critical — falls back to the built-in list
      }
    })();
  }, []);


  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const { data, error: fetchError } = await supabase.from("cars").select("*").eq("id", id).single();
      if (fetchError) {
        setError(fetchError.message);
      } else {
        setCar({ ...emptyCar, ...Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v ?? emptyCar[k] ?? ""])) });
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
      setError("Make, model name, year and price are required.");
      return;
    }

    const num = (v) => (v === "" || v === null || v === undefined ? null : Number(v));
    const payload = {
      brand: car.brand.trim(),
      name: car.name.trim(),
      model_code: String(car.model_code).trim(),
      stock_id: String(car.stock_id).trim(),
      chassis_number: String(car.chassis_number).trim(),
      year: Number(car.year),
      reg_month: num(car.reg_month),
      manufacture_year: num(car.manufacture_year),
      price: Number(car.price),
      mileage: Number(car.mileage) || 0,
      fuel: car.fuel,
      trans: car.trans,
      body: car.body,
      color: String(car.color).trim(),
      engine: String(car.engine).trim(),
      engine_code: String(car.engine_code).trim(),
      displacement_cc: num(car.displacement_cc),
      hp: Number(car.hp) || 0,
      drive: car.drive,
      steering: car.steering,
      doors: num(car.doors),
      seats: num(car.seats),
      repair_history: car.repair_history,
      location: String(car.location).trim(),
      badge: car.badge,
      description: String(car.description).trim(),
      images: car.images,
      in_stock: car.in_stock,
      featured: car.featured,
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
        <h3 className="admin-form-section">Basic Info</h3>
        <div className="admin-form-grid">
          <div className="form-group">
            <label className="form-label">Make *</label>
            {!addingBrand ? (
              <select
                className="form-input"
                value={car.brand}
                onChange={(e) => {
                  if (e.target.value === "__add_new__") { setAddingBrand(true); return; }
                  setCar((p) => ({ ...p, brand: e.target.value, name: p.brand === e.target.value ? p.name : "" }));
                }}
              >
                <option value="">Select brand…</option>
                {brandOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                <option value="__add_new__">+ Add new brand…</option>
              </select>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  className="form-input"
                  autoFocus
                  placeholder="e.g. Toyota"
                  value={newBrandValue}
                  onChange={(e) => setNewBrandValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); confirmNewBrand(); }
                    if (e.key === "Escape") { setAddingBrand(false); setNewBrandValue(""); }
                  }}
                />
                <button type="button" className="admin-btn-secondary" onClick={confirmNewBrand}>
                  <i className="fas fa-check"></i>
                </button>
                <button type="button" className="admin-btn-secondary" onClick={() => { setAddingBrand(false); setNewBrandValue(""); }}>
                  <i className="fas fa-xmark"></i>
                </button>
              </div>
            )}
          </div>

          <PickOrAdd
            label="Model Name *"
            value={car.name}
            blank={car.brand ? "Select model…" : "Select make first"}
            disabled={!car.brand}
            options={[...new Set([
              ...catalog.models
                .filter((m) => catalog.makes.find((k) => k.id === m.make_id)?.name === car.brand)
                .map((m) => m.name),
              ...(car.name ? [car.name] : []),
            ])]}
            placeholder="e.g. Yaris Hybrid G"
            onPick={(v) => setCar((p) => ({ ...p, name: v }))}
            onAdd={async (v) => {
              setCar((p) => ({ ...p, name: v }));
              const mk = catalog.makes.find((k) => k.name === car.brand);
              if (mk) {
                try { const m = await createModel(mk.id, v); setCatalog((c) => ({ ...c, models: [...c.models, m] })); } catch { /* already exists */ }
              }
            }}
          />
          <div className="form-group">
            <label className="form-label">Model Code</label>
            <input className="form-input" type="text" value={car.model_code} onChange={set("model_code")} placeholder="MXPH10" />
          </div>
          <PickOrAdd
            label="Body Type"
            value={car.body}
            options={bodyOptions}
            placeholder="e.g. Pickup"
            onPick={(v) => setCar((p) => ({ ...p, body: v }))}
            onAdd={(v) => { setBodyOptions((p) => (p.includes(v) ? p : [...p, v])); setCar((p) => ({ ...p, body: v })); createBodyType(v).catch(() => {}); }}
          />
          <div className="form-group">
            <label className="form-label">Stock ID</label>
            <input className="form-input" type="text" value={car.stock_id} onChange={set("stock_id")} placeholder="AU9771" />
          </div>
          <div className="form-group">
            <label className="form-label">Chassis Number (VIN)</label>
            <input className="form-input" type="text" value={car.chassis_number} onChange={set("chassis_number")} placeholder="MXPH10-2012345" />
          </div>
          <div className="form-group">
            <label className="form-label">Price (USD) *</label>
            <input className="form-input" type="number" value={car.price} onChange={set("price")} placeholder="12500" />
          </div>
          <div className="form-group">
            <label className="form-label">Mileage (km)</label>
            <input className="form-input" type="number" value={car.mileage} onChange={set("mileage")} placeholder="62000" />
          </div>
        </div>

        <h3 className="admin-form-section">Registration</h3>
        <div className="admin-form-grid">
          <div className="form-group">
            <label className="form-label">Registration Year *</label>
            <input className="form-input" type="number" value={car.year} onChange={set("year")} placeholder="2021" />
          </div>
          <div className="form-group">
            <label className="form-label">Registration Month</label>
            <select className="form-input" value={car.reg_month} onChange={set("reg_month")}>
              <option value="">—</option>
              {MONTHS.map((m, i) => <option key={m} value={i + 1}>{String(i + 1).padStart(2, "0")} - {m}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Manufacture Year</label>
            <input className="form-input" type="number" value={car.manufacture_year} onChange={set("manufacture_year")} placeholder="2021" />
          </div>
          <div className="form-group">
            <label className="form-label">Repair History</label>
            <select className="form-input" value={car.repair_history} onChange={set("repair_history")}>
              {REPAIR_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <h3 className="admin-form-section">Specifications</h3>
        <div className="admin-form-grid">
          <div className="form-group">
            <label className="form-label">Fuel Type</label>
            <select className="form-input" value={car.fuel} onChange={set("fuel")}>
              {FUEL_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Transmission</label>
            <select className="form-input" value={car.trans} onChange={set("trans")}>
              {TRANS_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Steering</label>
            <select className="form-input" value={car.steering} onChange={set("steering")}>
              {STEERING_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Drive</label>
            <select className="form-input" value={car.drive} onChange={set("drive")}>
              <option value="">—</option>{DRIVE_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Displacement (cc)</label>
            <input className="form-input" type="number" value={car.displacement_cc} onChange={set("displacement_cc")} placeholder="1500" />
          </div>
          <div className="form-group">
            <label className="form-label">Engine</label>
            <input className="form-input" type="text" value={car.engine} onChange={set("engine")} placeholder="1.5L Hybrid" />
          </div>
          <div className="form-group">
            <label className="form-label">Engine Code</label>
            <input className="form-input" type="text" value={car.engine_code} onChange={set("engine_code")} placeholder="M15A-FXE" />
          </div>
          <div className="form-group">
            <label className="form-label">Horsepower</label>
            <input className="form-input" type="number" value={car.hp} onChange={set("hp")} placeholder="116" />
          </div>
          <div className="form-group">
            <label className="form-label">Doors</label>
            <input className="form-input" type="number" value={car.doors} onChange={set("doors")} placeholder="5" />
          </div>
          <div className="form-group">
            <label className="form-label">Seats</label>
            <input className="form-input" type="number" value={car.seats} onChange={set("seats")} placeholder="5" />
          </div>
          <div className="form-group">
            <label className="form-label">Color</label>
            <input className="form-input" type="text" value={car.color} onChange={set("color")} placeholder="Gray M" />
          </div>
          <div className="form-group">
            <label className="form-label">Inventory Location</label>
            <input className="form-input" type="text" value={car.location} onChange={set("location")} placeholder="YOKOHAMA, JAPAN" />
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
<label className="admin-checkbox-row">
  <input type="checkbox" checked={car.featured} onChange={set("featured")} />
  Featured on Homepage
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