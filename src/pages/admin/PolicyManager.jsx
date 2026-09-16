import { useEffect, useState } from "react";
import {
  fetchAllPolicyBlocks,
  createPolicyBlock,
  updatePolicyBlock,
  deletePolicyBlock,
  reorderPolicyBlocks,
} from "../../lib/policyApi";

export default function PolicyManager() {
  const [blocks, setBlocks] = useState(null);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [dirty, setDirty] = useState({});

  const load = async () => {
    try {
      setBlocks(await fetchAllPolicyBlocks());
    } catch (err) {
      setError(err.message || "Failed to load policy sections.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const editField = (id, field) => (e) => {
    const value = e.target.value;
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
    setDirty((prev) => ({ ...prev, [id]: true }));
  };

  const handleSave = async (block) => {
    setBusyId(block.id);
    try {
      await updatePolicyBlock(block.id, { icon: block.icon, title: block.title, body: block.body });
      setDirty((prev) => ({ ...prev, [block.id]: false }));
    } catch (err) {
      alert(err.message || "Failed to save.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (block) => {
    if (!window.confirm(`Delete section "${block.title}"?`)) return;
    setBusyId(block.id);
    try {
      await deletePolicyBlock(block.id);
      setBlocks((prev) => prev.filter((b) => b.id !== block.id));
    } catch (err) {
      alert(err.message || "Failed to delete.");
    } finally {
      setBusyId(null);
    }
  };

  const handleAdd = async () => {
    try {
      const nextOrder = blocks.length ? Math.max(...blocks.map((b) => b.display_order)) + 1 : 0;
      const created = await createPolicyBlock(nextOrder);
      setBlocks((prev) => [...prev, created]);
    } catch (err) {
      alert(err.message || "Failed to add section.");
    }
  };

  const move = async (index, dir) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    setBlocks(next);
    try {
      await reorderPolicyBlocks(next);
    } catch (err) {
      alert(err.message || "Failed to reorder.");
      load();
    }
  };

  if (!blocks) {
    return <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading…</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Privacy Policy</h1>
          <p className="admin-page-sub">
            Sections shown on the /privacy-policy page, in this order. Leave a blank line between
            paragraphs, start a line with "- " for a bullet point, and wrap text in **double
            asterisks** to bold it.
          </p>
        </div>
        <button className="admin-btn-primary" onClick={handleAdd}>
          <i className="fas fa-circle-plus"></i> Add Section
        </button>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

      {blocks.length === 0 && (
        <div className="admin-empty">
          <i className="fas fa-file-shield"></i>
          <p>No sections yet — add your first one.</p>
        </div>
      )}

      <div className="faq-admin-list">
        {blocks.map((block, i) => (
          <div className="faq-admin-card" key={block.id}>
            <div className="faq-admin-order">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Move up">
                <i className="fas fa-chevron-up"></i>
              </button>
              <span>{i + 1}</span>
              <button type="button" onClick={() => move(i, 1)} disabled={i === blocks.length - 1} title="Move down">
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>

            <div className="faq-admin-fields">
              <div className="admin-form-grid" style={{ gridTemplateColumns: "140px 1fr" }}>
                <div className="form-group">
                  <label className="form-label">Icon (Font Awesome)</label>
                  <input className="form-input" value={block.icon} onChange={editField(block.id, "icon")} placeholder="fa-shield-halved" />
                </div>
                <div className="form-group">
                  <label className="form-label">Section Title</label>
                  <input className="form-input" value={block.title} onChange={editField(block.id, "title")} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Body</label>
                <textarea
                  className="form-input form-textarea"
                  style={{ minHeight: 160, fontFamily: "monospace", fontSize: "0.82rem" }}
                  value={block.body}
                  onChange={editField(block.id, "body")}
                />
              </div>
            </div>

            <div className="faq-admin-actions">
              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => handleSave(block)}
                disabled={busyId === block.id || !dirty[block.id]}
              >
                <i className="fas fa-save"></i> {dirty[block.id] ? "Save" : "Saved"}
              </button>
              <button
                type="button"
                className="admin-icon-btn danger"
                onClick={() => handleDelete(block)}
                disabled={busyId === block.id}
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