import { useEffect, useState } from "react";
import { fetchSiteContent, saveSiteContent } from "../../lib/siteContentApi";
import { uploadBankingImage } from "../../lib/bankingApi";

// Shared (dono banks ke liye)
const COMPANY_FIELDS = [
  { key: "bank_section_title", label: "Page Heading (shown at top, e.g. Our Suppliers Bank Account)", type: "text" },
  { key: "bank_company_name", label: "Company Name", type: "text" },
  { key: "bank_company_address", label: "Company Address (line break = new line)", type: "textarea" },
  { key: "bank_company_phone", label: "Company Phone(s)", type: "text" },
  { key: "bank_intro_text", label: "Intro paragraph (shown above the banking table)", type: "textarea" },
  { key: "bank_video_url", label: "Video URL (optional - YouTube or Vimeo link)", type: "text" },
];

// Har bank ke fields. Bank 1 keys: bank_name, bank_branch_code ...
// Bank 2 keys: bank2_name, bank2_branch_code ...
const BANK_FIELDS = [
  { suffix: "name", label: "Bank Name", type: "text" },
  { suffix: "branch_code", label: "Branch Code (optional)", type: "text" },
  { suffix: "address", label: "Bank Address", type: "text" },
  { suffix: "account_name", label: "Account Name", type: "text" },
  { suffix: "account_number", label: "Account Number", type: "text" },
  { suffix: "swift_code", label: "Swift Code", type: "text" },
  { suffix: "routing_number", label: "Routing Number (optional - US banks)", type: "text" },
  { suffix: "note", label: "Note (shown highlighted, e.g. who pays bank charges)", type: "textarea" },
];

// Sirf Bank 2: page par New Motors ke neeche iski apni heading banti hai
const BANK2_EXTRA_FIELDS = [
  { suffix: "company_name", label: "Bank 2 Company / Heading (e.g. KHAN JAPAN TRADING)", type: "text" },
  { suffix: "subtitle", label: "Bank 2 Subtitle (optional)", type: "text" },
];

const ALL_BANK2_FIELDS = [...BANK2_EXTRA_FIELDS, ...BANK_FIELDS];

const bankKey = (prefix, suffix) => `${prefix}_${suffix}`;

export default function BankingDetails() {
  const [values, setValues] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

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

  const removeSecondBank = () => {
    if (!window.confirm("Bank 2 ki saari details clear ho jayengi. Continue?")) return;
    setValues((prev) => {
      const next = { ...prev };
      ALL_BANK2_FIELDS.forEach((f) => { next[bankKey("bank2", f.suffix)] = ""; });
      return next;
    });
    setShowSecond(false);
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

  // Bank 2 card dikhao agar user ne add kiya ho ya pehle se data saved ho
  const hasSecond =
    showSecond || ALL_BANK2_FIELDS.some((f) => values[bankKey("bank2", f.suffix)]);

  const renderField = (key, f) => (
    <div className="form-group" key={key}>
      <label className="form-label">{f.label}</label>
      {f.type === "text" && (
        <input className="form-input" value={values[key] ?? ""} onChange={set(key)} />
      )}
      {f.type === "textarea" && (
        <textarea className="form-input form-textarea" value={values[key] ?? ""} onChange={set(key)} />
      )}
    </div>
  );

  const renderBankCard = (prefix, title, subtitle, fields, onRemove) => (
    <div className="admin-form" style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div>
          <div className="admin-panel-title">{title}</div>
          <p className="admin-panel-sub">{subtitle}</p>
        </div>
        {onRemove && (
          <button type="button" className="admin-btn-danger" onClick={onRemove}>
            <i className="fas fa-trash"></i> Remove Bank 2
          </button>
        )}
      </div>
      <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr" }}>
        {fields.map((f) => renderField(bankKey(prefix, f.suffix), f))}
      </div>
    </div>
  );

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
          <div className="admin-panel-title">Company & Intro</div>
          <p className="admin-panel-sub">Company header, intro text and optional video (dono banks ke liye common).</p>
          <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr" }}>
            {COMPANY_FIELDS.map((f) => renderField(f.key, f))}
          </div>
        </div>

        {renderBankCard("bank", "Bank 1", "Supplier #1 - primary banking details (New Motors).", BANK_FIELDS)}

        {hasSecond ? (
          renderBankCard(
            "bank2",
            "Bank 2",
            "Supplier #2 - second bank account (optional), Supplier #1 ke neeche dikhega.",
            ALL_BANK2_FIELDS,
            removeSecondBank
          )
        ) : (
          <div style={{ marginBottom: 24 }}>
            <button type="button" className="admin-btn-primary" onClick={() => setShowSecond(true)}>
              <i className="fas fa-plus"></i> Add Second Bank
            </button>
          </div>
        )}

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            <i className="fas fa-save"></i> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}