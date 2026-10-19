import { useEffect, useState } from "react";
import { saveSiteContent } from "../../lib/siteContentApi";
import { fetchSiteSettingsRaw, buildWaLink, useSiteSettings } from "../../lib/siteSettings";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({ value, onChange, label, hint, textarea, placeholder }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {textarea ? (
        <textarea className="form-input form-textarea" style={{ minHeight: 70 }} value={value} onChange={onChange} placeholder={placeholder} />
      ) : (
        <input className="form-input" value={value} onChange={onChange} placeholder={placeholder} />
      )}
      {hint && <div className="admin-hint">{hint}</div>}
    </div>
  );
}

export default function SiteSettingsManager() {
  const { reload } = useSiteSettings();
  const [f, setF] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSiteSettingsRaw()
      .then(setF)
      .catch((err) => setError(err.message || "Failed to load settings."));
  }, []);

  const set = (key) => (e) => {
    setSaved(false);
    setF((prev) => ({ ...prev, [key]: e.target.value }));
  };

  function validate(v) {
    if (v.site_whatsapp.replace(/\D/g, "").length < 8) return "WhatsApp number looks too short — include the country code (e.g. 818083434841).";
    if (!EMAIL_RE.test(v.site_email.trim())) return "Public email is not a valid email address.";
    if (!EMAIL_RE.test(v.site_notify_email.trim())) return "Notification email is not a valid email address.";
    const urlKeys = ["site_facebook", "site_instagram", "site_whatsapp_channel", "site_twitter", "site_youtube", "site_linkedin"];
    const bad = urlKeys.find((k) => v[k].trim() && !/^https?:\/\//i.test(v[k].trim()));
    if (bad) return `"${bad.replace("site_", "").replace("_", " ")}" link must start with https://`;
    return "";
  }

  const handleSave = async (e) => {
    e.preventDefault();
    const clean = Object.fromEntries(Object.entries(f).map(([k, v]) => [k, String(v).trim()]));
    clean.site_whatsapp = clean.site_whatsapp.replace(/\D/g, ""); // digits only
    const problem = validate(clean);
    if (problem) {
      setError(problem);
      setSaved(false);
      return;
    }
    setSaving(true);
    setError("");
    try {
      await saveSiteContent(clean);
      setF(clean);
      await reload(); // refresh the live site settings without a page reload
      setSaved(true);
    } catch (err) {
      setError(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (!f) return <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> {error || "Loading…"}</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Site Settings</h1>
          <p className="admin-page-sub">Contact details and social links — set once, used across the whole website.</p>
        </div>
        <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
          <i className="fas fa-save"></i> {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}
      {saved && (
        <div className="admin-auth-error" style={{ background: "rgba(62,207,125,.1)", borderColor: "rgba(62,207,125,.3)", color: "#5be08a" }}>
          <i className="fas fa-circle-check"></i> Saved — the website now uses these details.
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="admin-form" style={{ marginBottom: 24 }}>
          <div className="admin-panel-title">Contact</div>
          <p className="admin-panel-sub">Shown on the Contact page, Home contact section and footer.</p>
          <div className="admin-form-grid">
            <Field value={f.site_whatsapp} onChange={set("site_whatsapp")} label="WhatsApp number (digits only, with country code)" placeholder="818083434841"
              hint={<>Used for every "Chat on WhatsApp" button. <a href={buildWaLink({ whatsapp: f.site_whatsapp })} target="_blank" rel="noreferrer" style={{ color: "var(--gold)" }}>Test link ↗</a></>} />
            <Field value={f.site_email} onChange={set("site_email")} label="Public email" hint="Displayed to visitors." />
            <Field value={f.site_phone_jp} onChange={set("site_phone_jp")} label="Phone — Japan" />
            <Field value={f.site_phone_us} onChange={set("site_phone_us")} label="Phone — USA (optional)" />
            <Field value={f.site_hours} onChange={set("site_hours")} label="Business hours" />
            <Field value={f.site_location_short} onChange={set("site_location_short")} label="Short location (footer / home)" placeholder="Aichi, Japan" />
          </div>
        </div>

        <div className="admin-form" style={{ marginBottom: 24 }}>
          <div className="admin-panel-title">Form Notifications</div>
          <p className="admin-panel-sub">Where contact, negotiation and partnership form submissions are sent.</p>
          <Field value={f.site_notify_email} onChange={set("site_notify_email")} label="Notification email" hint="Private — never shown on the website." />
        </div>

        <div className="admin-form" style={{ marginBottom: 24 }}>
          <div className="admin-panel-title">Offices</div>
          <p className="admin-panel-sub">Use a new line where you want the address to break.</p>
          <div className="admin-form-grid">
            <Field value={f.site_address_jp} onChange={set("site_address_jp")} label="Japan office address" textarea />
            <Field value={f.site_address_us} onChange={set("site_address_us")} label="USA office address (optional)" textarea />
          </div>
        </div>

        <div className="admin-form" style={{ marginBottom: 24 }}>
          <div className="admin-panel-title">Social Links</div>
          <p className="admin-panel-sub">Leave a field empty to hide that icon — no more dead links.</p>
          <div className="admin-form-grid">
            <Field value={f.site_facebook} onChange={set("site_facebook")} label="Facebook" placeholder="https://facebook.com/…" />
            <Field value={f.site_instagram} onChange={set("site_instagram")} label="Instagram" placeholder="https://instagram.com/…" />
            <Field value={f.site_whatsapp_channel} onChange={set("site_whatsapp_channel")} label="WhatsApp Channel" placeholder="https://whatsapp.com/channel/…" />
            <Field value={f.site_youtube} onChange={set("site_youtube")} label="YouTube" placeholder="https://youtube.com/…" />
            <Field value={f.site_twitter} onChange={set("site_twitter")} label="Twitter / X" placeholder="https://x.com/…" />
            <Field value={f.site_linkedin} onChange={set("site_linkedin")} label="LinkedIn" placeholder="https://linkedin.com/…" />
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