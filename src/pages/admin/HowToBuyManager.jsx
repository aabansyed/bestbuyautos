import { useEffect, useState } from "react";
import { fetchSiteContent, saveSiteContent, getHtbQuickSteps, getHtbDetailSteps } from "../../lib/siteContentApi";

const emptyQuickStep = () => ({ icon: "", title: "New Step", description: "" });
const emptyDetailStep = () => ({
  heading: "New", highlight: "Step", bodyBefore: "", tags: [], bodyAfter: "",
  image: "", badgeIcon: "fa-circle-check", badgeText: "",
});

export default function HowToBuyManager() {
  const [fields, setFields] = useState(null);
  const [quickSteps, setQuickSteps] = useState(null);
  const [detailSteps, setDetailSteps] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const content = await fetchSiteContent();
        setFields({
          htb_hero_tag: content.htb_hero_tag,
          htb_hero_title: content.htb_hero_title,
          htb_hero_highlight: content.htb_hero_highlight,
          htb_section_subtitle: content.htb_section_subtitle,
          htb_section_title: content.htb_section_title,
          htb_section_highlight: content.htb_section_highlight,
          htb_notice_text: content.htb_notice_text,
          htb_whatsapp_link: content.htb_whatsapp_link,
        });
        setQuickSteps(getHtbQuickSteps(content));
        setDetailSteps(getHtbDetailSteps(content));
      } catch (err) {
        setError(err.message || "Failed to load How to Buy content.");
      }
    })();
  }, []);

  const markDirty = () => setSaved(false);

  const setField = (key) => (e) => {
    markDirty();
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
  };

  // ---- quick steps ----
  const editQuickStep = (i, key) => (e) => {
    markDirty();
    const value = e.target.value;
    setQuickSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)));
  };
  const addQuickStep = () => { markDirty(); setQuickSteps((prev) => [...prev, emptyQuickStep()]); };
  const removeQuickStep = (i) => {
    if (!window.confirm("Remove this step?")) return;
    markDirty();
    setQuickSteps((prev) => prev.filter((_, idx) => idx !== i));
  };
  const moveQuickStep = (i, dir) => {
    const newIndex = i + dir;
    if (newIndex < 0 || newIndex >= quickSteps.length) return;
    markDirty();
    setQuickSteps((prev) => {
      const next = [...prev];
      [next[i], next[newIndex]] = [next[newIndex], next[i]];
      return next;
    });
  };

  // ---- detail steps ----
  const editDetailStep = (i, key) => (e) => {
    markDirty();
    const value = e.target.value;
    setDetailSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)));
  };
  const editDetailTags = (i) => (e) => {
    markDirty();
    const tags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
    setDetailSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, tags } : s)));
  };
  const addDetailStep = () => { markDirty(); setDetailSteps((prev) => [...prev, emptyDetailStep()]); };
  const removeDetailStep = (i) => {
    if (!window.confirm("Remove this step?")) return;
    markDirty();
    setDetailSteps((prev) => prev.filter((_, idx) => idx !== i));
  };
  const moveDetailStep = (i, dir) => {
    const newIndex = i + dir;
    if (newIndex < 0 || newIndex >= detailSteps.length) return;
    markDirty();
    setDetailSteps((prev) => {
      const next = [...prev];
      [next[i], next[newIndex]] = [next[newIndex], next[i]];
      return next;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await saveSiteContent({
        ...fields,
        htb_quick_steps: JSON.stringify(quickSteps),
        htb_detail_steps: JSON.stringify(detailSteps),
      });
      setSaved(true);
    } catch (err) {
      setError(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (!fields || !quickSteps || !detailSteps) {
    return <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading…</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>How to Buy</h1>
          <p className="admin-page-sub">Everything shown on the public /how-to-buy page — edit here, changes go live on save.</p>
        </div>
        <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
          <i className="fas fa-save"></i> {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}
      {saved && (
        <div className="admin-auth-error" style={{ background: "rgba(62,207,125,.1)", borderColor: "rgba(62,207,125,.3)", color: "#5be08a" }}>
          <i className="fas fa-circle-check"></i> Saved — changes are live on the site now.
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* ---- Hero + section heading ---- */}
        <div className="admin-form" style={{ marginBottom: 24 }}>
          <div className="admin-panel-title">Page Header</div>
          <p className="admin-panel-sub">The breadcrumb banner and the section heading right below it.</p>

          <div className="admin-form-grid">
            <div className="form-group">
              <label className="form-label">Eyebrow tag</label>
              <input className="form-input" value={fields.htb_hero_tag} onChange={setField("htb_hero_tag")} />
            </div>
            <div className="form-group">
              <label className="form-label">Title (plain part)</label>
              <input className="form-input" value={fields.htb_hero_title} onChange={setField("htb_hero_title")} />
            </div>
            <div className="form-group">
              <label className="form-label">Title (gold highlight word)</label>
              <input className="form-input" value={fields.htb_hero_highlight} onChange={setField("htb_hero_highlight")} />
            </div>
          </div>

          <div className="admin-form-grid" style={{ marginTop: 4 }}>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="form-label">Section subtitle (small line above the heading)</label>
              <input className="form-input" value={fields.htb_section_subtitle} onChange={setField("htb_section_subtitle")} />
            </div>
            <div className="form-group">
              <label className="form-label">Section title (plain part)</label>
              <input className="form-input" value={fields.htb_section_title} onChange={setField("htb_section_title")} />
            </div>
            <div className="form-group">
              <label className="form-label">Section title (gold highlight)</label>
              <input className="form-input" value={fields.htb_section_highlight} onChange={setField("htb_section_highlight")} />
            </div>
          </div>
        </div>

        {/* ---- Quick steps ---- */}
        <div className="admin-form" style={{ marginBottom: 24 }}>
          <div className="admin-page-header" style={{ marginBottom: 8 }}>
            <div>
              <div className="admin-panel-title">Quick Steps</div>
              <p className="admin-panel-sub">The 6 small numbered cards (Select, Order, Payment…).</p>
            </div>
            <button type="button" className="admin-btn-secondary" onClick={addQuickStep}>
              <i className="fas fa-circle-plus"></i> Add Step
            </button>
          </div>

          <div className="faq-admin-list">
            {quickSteps.map((step, i) => (
              <div className="faq-admin-card" key={i}>
                <div className="faq-admin-order">
                  <button type="button" onClick={() => moveQuickStep(i, -1)} disabled={i === 0} title="Move up">
                    <i className="fas fa-chevron-up"></i>
                  </button>
                  <span>{i + 1}</span>
                  <button type="button" onClick={() => moveQuickStep(i, 1)} disabled={i === quickSteps.length - 1} title="Move down">
                    <i className="fas fa-chevron-down"></i>
                  </button>
                </div>

                <div className="faq-admin-fields">
                  <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 2fr" }}>
                    <div className="form-group">
                      <label className="form-label">Title</label>
                      <input className="form-input" value={step.title} onChange={editQuickStep(i, "title")} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Icon URL</label>
                      <input className="form-input" value={step.icon} onChange={editQuickStep(i, "icon")} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <input className="form-input" value={step.description} onChange={editQuickStep(i, "description")} />
                  </div>
                </div>

                <div className="faq-admin-actions">
                  <button type="button" className="admin-icon-btn danger" onClick={() => removeQuickStep(i)} title="Remove">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Detail steps ---- */}
        <div className="admin-form" style={{ marginBottom: 24 }}>
          <div className="admin-page-header" style={{ marginBottom: 8 }}>
            <div>
              <div className="admin-panel-title">Detail Steps</div>
              <p className="admin-panel-sub">The 6 large image + text rows below the "Browse" banner.</p>
            </div>
            <button type="button" className="admin-btn-secondary" onClick={addDetailStep}>
              <i className="fas fa-circle-plus"></i> Add Step
            </button>
          </div>

          <div className="faq-admin-list">
            {detailSteps.map((step, i) => (
              <div className="faq-admin-card" key={i} style={{ flexWrap: "wrap" }}>
                <div className="faq-admin-order">
                  <button type="button" onClick={() => moveDetailStep(i, -1)} disabled={i === 0} title="Move up">
                    <i className="fas fa-chevron-up"></i>
                  </button>
                  <span>{i + 1}</span>
                  <button type="button" onClick={() => moveDetailStep(i, 1)} disabled={i === detailSteps.length - 1} title="Move down">
                    <i className="fas fa-chevron-down"></i>
                  </button>
                </div>

                <div className="faq-admin-fields" style={{ minWidth: 340 }}>
                  <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                    <div className="form-group">
                      <label className="form-label">Heading (plain part)</label>
                      <input className="form-input" value={step.heading} onChange={editDetailStep(i, "heading")} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Heading (gold highlight)</label>
                      <input className="form-input" value={step.highlight} onChange={editDetailStep(i, "highlight")} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Body text (before any tags)</label>
                    <textarea className="form-input form-textarea" value={step.bodyBefore} onChange={editDetailStep(i, "bodyBefore")} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Spec tags (comma-separated, optional — e.g. "Make & Model, Price & Year")</label>
                    <input className="form-input" value={step.tags?.join(", ") || ""} onChange={editDetailTags(i)} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Body text (after tags, optional)</label>
                    <textarea className="form-input form-textarea" value={step.bodyAfter} onChange={editDetailStep(i, "bodyAfter")} />
                  </div>

                  <div className="admin-form-grid" style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
                    <div className="form-group">
                      <label className="form-label">Image path / URL</label>
                      <input className="form-input" value={step.image} onChange={editDetailStep(i, "image")} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Badge icon (Font Awesome class)</label>
                      <input className="form-input" value={step.badgeIcon} onChange={editDetailStep(i, "badgeIcon")} placeholder="fa-lock" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Badge text</label>
                      <input className="form-input" value={step.badgeText} onChange={editDetailStep(i, "badgeText")} />
                    </div>
                  </div>
                </div>

                <div className="faq-admin-actions">
                  <button type="button" className="admin-icon-btn danger" onClick={() => removeDetailStep(i)} title="Remove">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Notice + contact ---- */}
        <div className="admin-form" style={{ marginBottom: 24 }}>
          <div className="admin-panel-title">Notice &amp; Contact</div>
          <p className="admin-panel-sub">The important-notice banner and the floating WhatsApp button.</p>

          <div className="form-group">
            <label className="form-label">Important notice text (shown after "Important:")</label>
            <textarea className="form-input form-textarea" value={fields.htb_notice_text} onChange={setField("htb_notice_text")} />
          </div>
          <div className="form-group">
            <label className="form-label">WhatsApp link</label>
            <input className="form-input" value={fields.htb_whatsapp_link} onChange={setField("htb_whatsapp_link")} />
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            <i className="fas fa-save"></i> {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}