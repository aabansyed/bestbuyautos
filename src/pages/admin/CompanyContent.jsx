import { useEffect, useState } from "react";
import { fetchSiteContent, saveSiteContent } from "../../lib/siteContentApi";

const FIELD_GROUPS = [
  {
    title: "CEO Message",
    desc: "Shown on the /ceo-message page.",
    fields: [
      { key: "ceo_name", label: "CEO Name", type: "text" },
      { key: "ceo_role", label: "Role / Location line", type: "text" },
      { key: "ceo_headline", label: "Headline", type: "text" },
      { key: "ceo_subheading", label: "Subheading", type: "text" },
      { key: "ceo_body", label: "Message body (leave a blank line between paragraphs)", type: "textarea-lg" },
    ],
  },
  {
    title: "Our Company — Hero",
    desc: "Top banner on the /our-company page.",
    fields: [
      { key: "company_hero_badge", label: "Location badge", type: "text" },
      { key: "company_hero_desc", label: "Hero description", type: "textarea" },
      { key: "company_stat_years", label: "Stat: Years in Business", type: "text" },
      { key: "company_stat_countries", label: "Stat: Countries Served", type: "text" },
      { key: "company_stat_cars", label: "Stat: Cars Exported", type: "text" },
    ],
  },
  {
    title: "Our Company — Mission",
    desc: "\"Built on Trust & Integrity\" section.",
    fields: [
      { key: "mission_para1", label: "Paragraph 1", type: "textarea" },
      { key: "mission_para2", label: "Paragraph 2", type: "textarea" },
      { key: "mission_repeat_rate", label: "Repeat customer rate", type: "text" },
      { key: "mission_rating", label: "Average rating", type: "text" },
    ],
  },
];

export default function CompanyContent() {
  const [values, setValues] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setValues(await fetchSiteContent());
      } catch (err) {
        setError(err.message || "Failed to load content.");
      }
    })();
  }, []);

  const set = (key) => (e) => {
    setSaved(false);
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await saveSiteContent(values);
      setSaved(true);
    } catch (err) {
      setError(err.message || "Failed to save content.");
    } finally {
      setSaving(false);
    }
  };

  if (!values) {
    return <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading…</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Company Info</h1>
          <p className="admin-page-sub">Edit the CEO message, company hero, and mission text shown on the public site.</p>
        </div>
        <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
          <i className="fas fa-save"></i> {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}
      {saved && (
        <div className="admin-auth-error" style={{ background: "rgba(46,204,113,.1)", borderColor: "rgba(46,204,113,.35)", color: "#5be08a" }}>
          <i className="fas fa-circle-check"></i> Saved — changes are live on the site now.
        </div>
      )}

      <form onSubmit={handleSave}>
        {FIELD_GROUPS.map((group) => (
          <div className="admin-form" key={group.title} style={{ marginBottom: 24 }}>
            <div className="admin-panel-title">{group.title}</div>
            <p className="admin-panel-sub">{group.desc}</p>

            <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr" }}>
              {group.fields.map((f) => (
                <div className="form-group" key={f.key}>
                  <label className="form-label">{f.label}</label>
                  {f.type === "text" && (
                    <input className="form-input" value={values[f.key] ?? ""} onChange={set(f.key)} />
                  )}
                  {f.type === "textarea" && (
                    <textarea className="form-input form-textarea" value={values[f.key] ?? ""} onChange={set(f.key)} />
                  )}
                  {f.type === "textarea-lg" && (
                    <textarea
                      className="form-input form-textarea"
                      style={{ minHeight: 220 }}
                      value={values[f.key] ?? ""}
                      onChange={set(f.key)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            <i className="fas fa-save"></i> {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}