import { useEffect, useMemo, useState } from "react";
import {
  fetchMakes, createMake, updateMake, deleteMake,
  fetchModels, createModel, deleteModel,
  fetchBodyTypesCatalog, createBodyType, updateBodyType, deleteBodyType,
  uploadCatalogImage,
} from "../../lib/catalogApi";

const TABS = [
  { id: "makes", label: "Makes", icon: "fa-copyright" },
  { id: "models", label: "Models", icon: "fa-car-side" },
  { id: "body", label: "Body Types", icon: "fa-truck-pickup" },
];

function Thumb({ url, fallback }) {
  return url ? (
    <img src={url} alt="" style={{ width: 44, height: 32, objectFit: "contain", background: "#fff", borderRadius: 6, padding: 3 }} />
  ) : (
    <span style={{ width: 44, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.06)", borderRadius: 6, color: "var(--gray)" }}>
      <i className={`fas ${fallback}`}></i>
    </span>
  );
}

export default function CatalogManager() {
  const [tab, setTab] = useState("makes");
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [bodies, setBodies] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const [newMake, setNewMake] = useState("");
  const [newMakeLogo, setNewMakeLogo] = useState("");
  const [modelMakeId, setModelMakeId] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newBodyIcon, setNewBodyIcon] = useState("");

  const load = async () => {
    try {
      const [mk, md, bd] = await Promise.all([fetchMakes(), fetchModels(), fetchBodyTypesCatalog()]);
      setMakes(mk); setModels(md); setBodies(bd);
      setModelMakeId((cur) => cur || (mk[0] ? String(mk[0].id) : ""));
    } catch (e) {
      setError(e.message || "Failed to load. Did you run schema_v15_catalog.sql?");
    }
  };
  useEffect(() => { load(); }, []);

  const run = async (fn) => {
    setBusy(true); setError("");
    try { await fn(); await load(); } catch (e) { setError(e.message || "Something went wrong."); }
    finally { setBusy(false); }
  };

  const upload = async (file, setter) => {
    if (!file) return;
    setBusy(true); setError("");
    try { setter(await uploadCatalogImage(file)); } catch (e) { setError(e.message || "Upload failed."); }
    finally { setBusy(false); }
  };

  const modelsOfMake = useMemo(
    () => models.filter((m) => String(m.make_id) === String(modelMakeId)),
    [models, modelMakeId]
  );
  const modelCount = (makeId) => models.filter((m) => m.make_id === makeId).length;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Makes, Models &amp; Body Types</h1>
          <p className="admin-page-sub">
            Yahan se add/delete karein — yehi list Add Car form aur website ke search popup mein dikhegi.
          </p>
        </div>
      </div>

      <div className="admin-toolbar" style={{ gap: 8 }}>
        {TABS.map((t) => (
          <button key={t.id} type="button" className={tab === t.id ? "admin-btn-primary" : "admin-btn-secondary"} onClick={() => setTab(t.id)}>
            <i className={`fas ${t.icon}`}></i> {t.label}
          </button>
        ))}
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

      {/* ───────── MAKES ───────── */}
      {tab === "makes" && (
        <>
          <form
            className="admin-form"
            style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 18 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (!newMake.trim()) return;
              run(async () => { await createMake(newMake, newMakeLogo); setNewMake(""); setNewMakeLogo(""); });
            }}
          >
            <input className="form-input" style={{ maxWidth: 260 }} placeholder="New make e.g. Toyota" value={newMake} onChange={(e) => setNewMake(e.target.value)} />
            <label className="admin-btn-secondary" style={{ cursor: "pointer" }}>
              <i className="fas fa-cloud-arrow-up"></i> {newMakeLogo ? "Logo ✓" : "Logo (optional)"}
              <input type="file" accept="image/*" hidden onChange={(e) => upload(e.target.files[0], setNewMakeLogo)} />
            </label>
            <button className="admin-btn-primary" disabled={busy}><i className="fas fa-plus"></i> Add Make</button>
          </form>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Logo</th><th>Make</th><th>Models</th><th>Order</th><th></th></tr></thead>
              <tbody>
                {makes.map((m) => (
                  <tr key={m.id}>
                    <td><Thumb url={m.logo_url} fallback="fa-car" /></td>
                    <td>{m.name}</td>
                    <td>{modelCount(m.id)}</td>
                    <td>
                      <input
                        className="form-input" type="number" style={{ width: 80 }} defaultValue={m.display_order}
                        onBlur={(e) => Number(e.target.value) !== m.display_order && run(() => updateMake(m.id, { display_order: Number(e.target.value) || 0 }))}
                      />
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <label className="admin-icon-btn" title="Change logo" style={{ cursor: "pointer" }}>
                          <i className="fas fa-image"></i>
                          <input type="file" accept="image/*" hidden onChange={async (e) => {
                            const f = e.target.files[0]; if (!f) return;
                            run(async () => updateMake(m.id, { logo_url: await uploadCatalogImage(f) }));
                          }} />
                        </label>
                        <button className="admin-icon-btn danger" title="Delete" disabled={busy}
                          onClick={() => window.confirm(`Delete "${m.name}" and its models from the list? (Existing cars are not deleted.)`) && run(() => deleteMake(m.id))}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ───────── MODELS ───────── */}
      {tab === "models" && (
        <>
          <form
            className="admin-form"
            style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 18 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (!newModel.trim() || !modelMakeId) return;
              run(async () => { await createModel(Number(modelMakeId), newModel); setNewModel(""); });
            }}
          >
            <select className="form-input" style={{ maxWidth: 220 }} value={modelMakeId} onChange={(e) => setModelMakeId(e.target.value)}>
              {makes.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <input className="form-input" style={{ maxWidth: 260 }} placeholder="New model e.g. Yaris Hybrid G" value={newModel} onChange={(e) => setNewModel(e.target.value)} />
            <button className="admin-btn-primary" disabled={busy || !modelMakeId}><i className="fas fa-plus"></i> Add Model</button>
          </form>

          {modelsOfMake.length === 0 ? (
            <div className="admin-empty"><i className="fas fa-car-side"></i><p>Is make ka koi model nahi.</p></div>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {modelsOfMake.map((m) => (
                <span key={m.id} className="admin-badge-pill" style={{ display: "inline-flex", gap: 8, alignItems: "center", padding: "8px 12px" }}>
                  {m.name}
                  <button type="button" title="Delete" disabled={busy} style={{ background: "none", border: "none", color: "#e74c3c", cursor: "pointer" }}
                    onClick={() => run(() => deleteModel(m.id))}>
                    <i className="fas fa-xmark"></i>
                  </button>
                </span>
              ))}
            </div>
          )}
        </>
      )}

      {/* ───────── BODY TYPES ───────── */}
      {tab === "body" && (
        <>
          <form
            className="admin-form"
            style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 18 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (!newBody.trim()) return;
              run(async () => { await createBodyType(newBody, newBodyIcon); setNewBody(""); setNewBodyIcon(""); });
            }}
          >
            <input className="form-input" style={{ maxWidth: 260 }} placeholder="New body type e.g. Pick up" value={newBody} onChange={(e) => setNewBody(e.target.value)} />
            <label className="admin-btn-secondary" style={{ cursor: "pointer" }}>
              <i className="fas fa-cloud-arrow-up"></i> {newBodyIcon ? "Icon ✓" : "Icon (optional)"}
              <input type="file" accept="image/*" hidden onChange={(e) => upload(e.target.files[0], setNewBodyIcon)} />
            </label>
            <button className="admin-btn-primary" disabled={busy}><i className="fas fa-plus"></i> Add Body Type</button>
          </form>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Icon</th><th>Body Type</th><th>Order</th><th></th></tr></thead>
              <tbody>
                {bodies.map((b) => (
                  <tr key={b.id}>
                    <td><Thumb url={b.icon_url} fallback="fa-car-side" /></td>
                    <td>{b.name}</td>
                    <td>
                      <input
                        className="form-input" type="number" style={{ width: 80 }} defaultValue={b.display_order}
                        onBlur={(e) => Number(e.target.value) !== b.display_order && run(() => updateBodyType(b.id, { display_order: Number(e.target.value) || 0 }))}
                      />
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <label className="admin-icon-btn" title="Change icon" style={{ cursor: "pointer" }}>
                          <i className="fas fa-image"></i>
                          <input type="file" accept="image/*" hidden onChange={async (e) => {
                            const f = e.target.files[0]; if (!f) return;
                            run(async () => updateBodyType(b.id, { icon_url: await uploadCatalogImage(f) }));
                          }} />
                        </label>
                        <button className="admin-icon-btn danger" title="Delete" disabled={busy}
                          onClick={() => window.confirm(`Delete body type "${b.name}" from the list?`) && run(() => deleteBodyType(b.id))}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}