import { useEffect, useRef, useState } from "react";
import { fetchAllMedia, saveMedia, deleteMedia, slugifyKey } from "../../lib/mediaApi";

// Ready-made slots for known site spots that expect a specific piece of
// media. Uploading here fills that slot immediately — no code changes
// needed. Add more entries here any time a new page needs a fixed spot.
const SUGGESTED_SLOTS = [
  { key: "auction_sheet_guide", label: "Auction Sheet Guide (PDF)", accept: "application/pdf", hint: "Shown as the \"Auction Sheet Guide\" button on the Auction page." },
  { key: "auction_location_map", label: "Auction Location Map (Image)", accept: "image/*", hint: "Shown as the \"Auction Location Map\" button on the Auction page." },
];

function TypeIcon({ type }) {
  const icon = type === "image" ? "fa-image" : type === "video" ? "fa-file-video" : type === "pdf" ? "fa-file-pdf" : "fa-file";
  return <i className={`fas ${icon}`}></i>;
}

function MediaThumb({ item }) {
  if (item && item.type === "image") {
    return <img className="media-thumb" src={item.url} alt={item.label} />;
  }
  return (
    <div className="media-thumb-placeholder">
      <TypeIcon type={item?.type} />
    </div>
  );
}

function SlotRow({ slot, existing, onUpload, busy }) {
  const inputRef = useRef(null);

  return (
    <div className="media-row">
      <MediaThumb item={existing} />
      <div className="media-info">
        <div className="media-title">{slot.label}</div>
        <div className="media-hint">{slot.hint}</div>
        {existing ? (
          <a href={existing.url} target="_blank" rel="noreferrer" className="media-link">
            View current file <i className="fas fa-arrow-up-right-from-square"></i>
          </a>
        ) : (
          <div className="media-status-missing">Not uploaded yet — hidden on the site until you add one</div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={slot.accept}
        className="media-upload-input"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(slot.key, slot.label, file);
          e.target.value = "";
        }}
      />
      <div className="media-row-actions">
        <button
          className="admin-btn-secondary"
          disabled={busy === slot.key}
          onClick={() => inputRef.current?.click()}
        >
          <i className="fas fa-upload"></i> {busy === slot.key ? "Uploading…" : existing ? "Replace" : "Upload"}
        </button>
      </div>
    </div>
  );
}

export default function MediaManager() {
  const [media, setMedia] = useState(null);
  const [busyKey, setBusyKey] = useState(null);
  const [error, setError] = useState("");

  // "Add new" form state
  const [newLabel, setNewLabel] = useState("");
  const [newFile, setNewFile] = useState(null);
  const newFileInputRef = useRef(null);

  const load = () => {
    fetchAllMedia().then(setMedia).catch((e) => setError(e.message || "Failed to load media"));
  };

  useEffect(() => { load(); }, []);

  const byKey = (key) => media?.find((m) => m.key === key);

  const handleUpload = async (key, label, file) => {
    setError("");
    setBusyKey(key);
    try {
      await saveMedia({ key, label, file });
      load();
    } catch (e) {
      setError(e.message || "Upload failed");
    } finally {
      setBusyKey(null);
    }
  };

  const handleAddNew = async () => {
    if (!newLabel.trim() || !newFile) return;
    const key = slugifyKey(newLabel);
    await handleUpload(key, newLabel.trim(), newFile);
    setNewLabel("");
    setNewFile(null);
    if (newFileInputRef.current) newFileInputRef.current.value = "";
  };

  const handleDelete = async (key) => {
    if (!window.confirm("Delete this media item? It will disappear from the site immediately.")) return;
    setError("");
    setBusyKey(key);
    try {
      await deleteMedia(key);
      load();
    } catch (e) {
      setError(e.message || "Delete failed");
    } finally {
      setBusyKey(null);
    }
  };

  const suggestedKeys = new Set(SUGGESTED_SLOTS.map((s) => s.key));
  const customItems = media ? media.filter((m) => !suggestedKeys.has(m.key)) : [];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Media Library</h1>
          <div className="admin-page-sub">Upload, replace, or remove any image, PDF, or video used on the site. Changes go live immediately.</div>
        </div>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

      <div className="admin-panel" style={{ marginBottom: 24 }}>
        <div className="admin-panel-title">Site Slots</div>
        <div className="admin-panel-sub">Fixed spots that specific pages already look for.</div>
        {SUGGESTED_SLOTS.map((slot) => (
          <SlotRow key={slot.key} slot={slot} existing={byKey(slot.key)} onUpload={handleUpload} busy={busyKey} />
        ))}
      </div>

      <div className="admin-panel" style={{ marginBottom: 24 }}>
        <div className="admin-panel-title">Add New Media</div>
        <div className="admin-panel-sub">For anything without a fixed slot yet — upload it here, then let us know where it should appear.</div>
        <div className="media-add-form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. Company Brochure 2026"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">File (image, PDF, or video)</label>
            <input
              ref={newFileInputRef}
              className="form-input"
              type="file"
              accept="image/*,application/pdf,video/*"
              onChange={(e) => setNewFile(e.target.files?.[0] || null)}
            />
          </div>
          <button
            className="admin-btn-primary"
            disabled={!newLabel.trim() || !newFile || busyKey === slugifyKey(newLabel || "")}
            onClick={handleAddNew}
          >
            <i className="fas fa-upload"></i> Upload
          </button>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-title">All Custom Media</div>
        {media === null && <div className="admin-panel-sub">Loading…</div>}
        {media && customItems.length === 0 && (
          <div className="admin-empty">
            <i className="fas fa-photo-film"></i>
            Nothing uploaded here yet.
          </div>
        )}
        {media && customItems.map((item) => (
          <div className="media-row" key={item.key}>
            <MediaThumb item={item} />
            <div className="media-info">
              <div className="media-title">{item.label || item.key}</div>
              <div className="media-key">key: {item.key}</div>
              <a href={item.url} target="_blank" rel="noreferrer" className="media-link">
                View <i className="fas fa-arrow-up-right-from-square"></i>
              </a>
            </div>
            <div className="media-row-actions">
              <button
                className="admin-btn-danger"
                disabled={busyKey === item.key}
                onClick={() => handleDelete(item.key)}
              >
                <i className="fas fa-trash"></i> {busyKey === item.key ? "…" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}