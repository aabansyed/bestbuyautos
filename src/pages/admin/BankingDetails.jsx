import { useEffect, useState } from "react";
import { fetchSiteContent, saveSiteContent } from "../../lib/siteContentApi";
import { uploadBankingImage } from "../../lib/bankingApi";

const TEXT_FIELDS = [
  { key: "bank_company_name", label: "Company Name", type: "text" },
  { key: "bank_company_address", label: "Company Address (line break = new line)", type: "textarea" },
  { key: "bank_company_phone", label: "Company Phone(s)", type: "text" },
  { key: "bank_intro_text", label: "Intro paragraph (shown above the banking table)", type: "textarea" },
  { key: "bank_name", label: "Bank Name", type: "text" },
  { key: "bank_branch_code", label: "Branch Code", type: "text" },
  { key: "bank_address", label: "Bank Address", type: "text" },
  { key: "bank_account_name", label: "Account Name", type: "text" },
  { key: "bank_account_number", label: "Account Number", type: "text" },
  { key: "bank_swift_code", label: "Swift Code", type: "text" },
  { key: "bank_note", label: "Note (shown highlighted, e.g. who pays bank charges)", type: "textarea" },
  { key: "bank_video_url", label: "Video URL (optional - YouTube or Vimeo link)", type: "text" },
];

export default function BankingDetails() {
  const [values, setValues] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadBankingImage(file);
      setValues((prev) => ({ ...prev, bank_image_url: url }));
      setSaved(false);
    } catch (err) {
      setError(err.message || "Image upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = () => {
    setValues((prev) => ({ ...prev, bank_image_url: "" }));
    setSaved(false);
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
    return <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Bank Details</h1>
          <p className="admin-page-sub">Edit the beneficiary banking info, company header, image and video shown on the /bank-details page.</p>
        </div>
        <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
          <i className="fas fa-save"></i> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}
      {saved && (
        <div className="admin-auth-error" style={{ background: "rgba(46,204,113,.1)", borderColor: "rgba(46,204,113,.35)", color: "#5be08a" }}>
          <i className="fas fa-circle-check"></i> Saved - changes are live on the site now.
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="admin-form" style={{ marginBottom: 24 }}>
          <div className="admin-panel-title">Supporting Image</div>
          <p className="admin-panel-sub">Optional - e.g. a photo of the physical bank slip, or a company/bank logo image.</p>

          <div className="admin-image-grid">
            {values.bank_image_url && (
              <div className="admin-image-item">
                <img src={values.bank_image_url} alt="Bank details" />
                <div className="admin-image-actions">
                  <button type="button" title="Remove" onClick={removeImage}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            )}
            <label className="admin-image-upload">
              {uploading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-cloud-arrow-up"></i>}
              <span>{uploading ? "Uploading..." : "Upload"}</span>
              <input type="file" accept="image/*" hidden onChange={handleImageUpload} disabled={uploading} />
            </label>
          </div>
        </div>

        <div className="admin-form" style={{ marginBottom: 24 }}>
          <div className="admin-panel-title">Details</div>
          <p className="admin-panel-sub">Company header, banking table fields, and optional video/intro text.</p>

          <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr" }}>
            {TEXT_FIELDS.map((f) => (
              <div className="form-group" key={f.key}>
                <label className="form-label">{f.label}</label>
                {f.type === "text" && (
                  <input className="form-input" value={values[f.key] ?? ""} onChange={set(f.key)} />
                )}
                {f.type === "textarea" && (
                  <textarea className="form-input form-textarea" value={values[f.key] ?? ""} onChange={set(f.key)} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            <i className="fas fa-save"></i> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}