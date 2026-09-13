import { useEffect, useState } from "react";
import {
  fetchAllPartners,
  createPartner,
  updatePartner,
  deletePartner,
  reorderPartners,
  PARTNER_CATEGORIES,
} from "../../lib/partnersApi";

export default function PartnersManager() {
  const [partners, setPartners] = useState(null);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [dirty, setDirty] = useState({});

  const load = async () => {
    try {
      setPartners(await fetchAllPartners());
    } catch (err) {
      setError(err.message || "Failed to load partners.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const editField = (id, field) => (e) => {
    const value = e.target.value;
    setPartners((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    setDirty((prev) => ({ ...prev, [id]: true }));
  };

  const handleSave = async (p) => {
    setBusyId(p.id);
    try {
      await updatePartner(p.id, {
        category: p.category,
        icon: p.icon,
        accent_color: p.accent_color,
        name: p.name,
        type_label: p.type_label,
        description: p.description,
        tags: p.tags,
        partner_since: p.partner_since,
        link_url: p.link_url,
      });
      setDirty((prev) => ({ ...prev, [p.id]: false }));
    } catch (err) {
      alert(err.message || "Failed to save.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete partner "${p.name}"?`)) return;
    setBusyId(p.id);
    try {
      await deletePartner(p.id);
      setPartners((prev) => prev.filter((x) => x.id !== p.id));
    } catch (err) {
      alert(err.message || "Failed to delete.");
    } finally {
      setBusyId(null);
    }
  };

  const handleAdd = async () => {
    try {
      const nextOrder = partners.length ? Math.max(...partners.map((p) => p.display_order)) + 1 : 0;
      const created = await createPartner(nextOrder);
      setPartners((prev) => [...prev, created]);
    } catch (err) {
      alert(err.message || "Failed to add partner.");
    }
  };

  const move = async (index, dir) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= partners.length) return;
    const next = [...partners];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    setPartners(next);
    try {
      await reorderPartners(next);
    } catch (err) {
      alert(err.message || "Failed to reorder.");
      load();
    }
  };

  if (!partners) {
    return <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading…</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Our Partners</h1>
          <p className="admin-page-sub">Partner cards shown on the /our-partners page, in this order.</p>
        </div>
        <button className="admin-btn-primary" onClick={handleAdd}>
          <i className="fas fa-circle-plus"></i> Add Partner
        </button>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

      {partners.length === 0 && (
        <div className="admin-empty">
          <i className="fas fa-handshake"></i>
          <p>No partners yet — add your first one.</p>
        </div>
      )}

      <div className="faq-admin-list">
        {partners.map((p, i) => (
          <div className="faq-admin-card partner-admin-card" key={p.id}>
            <div className="faq-admin-order">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Move up">
                <i className="fas fa-chevron-up"></i>
              </button>
              <span>{i + 1}</span>
              <button type="button" onClick={() => move(i, 1)} disabled={i === partners.length - 1} title="Move down">
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>

            <div className="faq-admin-fields">
              <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div className="form-group">
                  <label className="form-label">Partner Name</label>
                  <input className="form-input" value={p.name} onChange={editField(p.id, "name")} />
                </div>
                <div className="form-group">
                  <label className="form-label">Type / Role</label>
                  <input className="form-input" value={p.type_label} onChange={editField(p.id, "type_label")} placeholder="Freight & Container Shipping" />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-input" value={p.category} onChange={editField(p.id, "category")}>
                    {PARTNER_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Partner Since (year)</label>
                  <input className="form-input" value={p.partner_since} onChange={editField(p.id, "partner_since")} placeholder="2012" />
                </div>

                <div className="form-group">
                  <label className="form-label">Icon (one emoji)</label>
                  <input className="form-input" value={p.icon} onChange={editField(p.id, "icon")} placeholder="🚢" />
                </div>
                <div className="form-group">
                  <label className="form-label">Accent Color</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input type="color" value={p.accent_color} onChange={editField(p.id, "accent_color")} style={{ width: 44, height: 40, border: "none", borderRadius: 8, background: "none", cursor: "pointer" }} />
                    <input className="form-input" value={p.accent_color} onChange={editField(p.id, "accent_color")} />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input form-textarea" value={p.description} onChange={editField(p.id, "description")} />
              </div>

              <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div className="form-group">
                  <label className="form-label">Tags (comma-separated)</label>
                  <input className="form-input" value={p.tags} onChange={editField(p.id, "tags")} placeholder="Africa Routes, Middle East" />
                </div>
                <div className="form-group">
                  <label className="form-label">Visit Link URL</label>
                  <input className="form-input" value={p.link_url} onChange={editField(p.id, "link_url")} placeholder="https://..." />
                </div>
              </div>
            </div>

            <div className="faq-admin-actions">
              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => handleSave(p)}
                disabled={busyId === p.id || !dirty[p.id]}
              >
                <i className="fas fa-save"></i> {dirty[p.id] ? "Save" : "Saved"}
              </button>
              <button
                type="button"
                className="admin-icon-btn danger"
                onClick={() => handleDelete(p)}
                disabled={busyId === p.id}
                title="Delete"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}