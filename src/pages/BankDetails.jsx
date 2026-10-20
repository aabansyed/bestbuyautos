import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSiteContent, CONTENT_DEFAULTS } from "../lib/siteContentApi";
import { toEmbedUrl } from "../lib/bankingApi";
import "../styles/bank-details.css";

function CopyField({ label, value, icon }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard not available - ignore */
    }
  };

  return (
    <div className="bd-row">
      <div className="bd-row-label"><i className={`fas ${icon}`}></i> {label}</div>
      <div className="bd-row-value">
        <span>{value}</span>
        <button type="button" className="bd-copy-btn" onClick={handleCopy} title={`Copy ${label}`}>
          <i className={`fas ${copied ? "fa-check" : "fa-copy"}`}></i>
        </button>
      </div>
    </div>
  );
}

// Ek bank ka poora table. prefix = "bank" (Bank 1) ya "bank2" (Bank 2).
// Khali fields automatically hide ho jati hain.
function BankTable({ content, prefix }) {
  const get = (suffix) => (content[`${prefix}_${suffix}`] || "").trim();

  const plainRows = [
    { suffix: "name", label: "Bank Name", icon: "fa-landmark" },
    { suffix: "branch_code", label: "Branch Code", icon: "fa-code-branch" },
    { suffix: "address", label: "Bank Address", icon: "fa-map-location-dot" },
    { suffix: "account_name", label: "Account Name", icon: "fa-user" },
  ];
  const copyRows = [
    { suffix: "account_number", label: "Account Number", icon: "fa-hashtag" },
    { suffix: "swift_code", label: "Swift Code", icon: "fa-globe" },
    { suffix: "routing_number", label: "Routing Number", icon: "fa-route" },
  ];

  return (
    <div className="bd-table-wrap" data-aos="fade-up">
      <div className="bd-table-title">
        <i className="fas fa-shield-halved"></i> Beneficiary Banking Details for International Transfer
      </div>

      <div className="bd-table">
        {plainRows.map((r) =>
          get(r.suffix) ? (
            <div className="bd-row" key={r.suffix}>
              <div className="bd-row-label"><i className={`fas ${r.icon}`}></i> {r.label}</div>
              <div className="bd-row-value"><span>{get(r.suffix)}</span></div>
            </div>
          ) : null
        )}
        {copyRows.map((r) =>
          get(r.suffix) ? (
            <CopyField key={r.suffix} label={r.label} value={get(r.suffix)} icon={r.icon} />
          ) : null
        )}
      </div>

      {get("note") && (
        <div className="bd-note">
          <i className="fas fa-triangle-exclamation"></i> <span>{get("note")}</span>
        </div>
      )}
    </div>
  );
}

export default function BankDetails() {
  const [content, setContent] = useState(CONTENT_DEFAULTS);

  useEffect(() => {
    fetchSiteContent().then(setContent).catch(() => {});
  }, []);

  const embedUrl = toEmbedUrl(content.bank_video_url);

  // Bank 2 tabhi dikhao jab uska account number ya bank name bhara ho
  const hasBank2 = Boolean(
    (content.bank2_account_number || "").trim() || (content.bank2_name || "").trim()
  );

  return (
    <>
      <div className="breadcrumb-banner">
        <img className="bc-bg" src="/topside.png" alt="" />
        <div className="bc-overlay"></div>
        <div className="bc-content">
          <div className="bc-tag"><span></span> Secure Payments</div>
         <div className="bd-title-row">
  <h1>Bank <span className="gold">Details</span></h1>
  <ol className="breadcrumb-ol">
    <li><Link to="/">Home</Link></li>
    <li className="sep">/</li>
    <li>About Us</li>
    <li className="sep">/</li>
    <li className="active">Bank Details</li>
  </ol>
</div>
<div className="gold-line"></div>
        </div>
      </div>

      <div className="sptb" style={{ background: "var(--dark)" }}>
        <div className="container">

          <div className="bd-section-head" data-aos="fade-up">
            <h2>{content.bank_section_title}</h2>
            <div className="gold-line"></div>
          </div>

          {content.bank_intro_text && (
            <p className="bd-intro" data-aos="fade-up">{content.bank_intro_text}</p>
          )}

          <div className="bd-supplier-label" data-aos="fade-up">
            <span>Supplier #1</span>
          </div>

          <div className="bd-company-card" data-aos="fade-up">
            <div className="bd-company-icon">
              <i className="fas fa-building-columns"></i>
            </div>
            <div className="bd-company-info">
              <div className="bd-company-name">{content.bank_company_name}</div>
              {(content.bank_company_address || "").split("\n").filter(Boolean).map((line, i) => (
                <div className="bd-company-line" key={i}>{line}</div>
              ))}
              {content.bank_company_phone && (
                <div className="bd-company-line bd-company-phone">
                  <i className="fas fa-phone"></i> {content.bank_company_phone}
                </div>
              )}
            </div>
          </div>

          {/* ---- Supplier #1: New Motors ---- */}
          <BankTable content={content} prefix="bank" />

          {/* ---- Supplier #2: Khan Japan Trading ---- */}
          {hasBank2 && (
            <>
              <div className="bd-supplier-label" data-aos="fade-up">
                <span>Supplier #2</span>
              </div>
              <div className="bd-company-card bd-bank-heading" data-aos="fade-up">
                <div className="bd-company-icon">
                  <i className="fas fa-building-columns"></i>
                </div>
                <div className="bd-company-info">
                  <div className="bd-company-name">{content.bank2_company_name}</div>
                  {content.bank2_subtitle && (
                    <div className="bd-company-line">{content.bank2_subtitle}</div>
                  )}
                </div>
              </div>
              <BankTable content={content} prefix="bank2" />
            </>
          )}

          {content.bank_image_url && (
            <div className="bd-image-wrap" data-aos="fade-up">
              <img src={content.bank_image_url} alt="Bank details" />
            </div>
          )}

          {embedUrl && (
            <div className="bd-video-wrap" data-aos="fade-up">
              <div className="bd-video-title"><i className="fas fa-circle-play"></i> How to Send Payment</div>
              <div className="bd-video-frame">
                <iframe src={embedUrl} title="Bank payment guide" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
          )}

          <div className="bd-cta" data-aos="fade-up">
            <div>
              <div className="bd-cta-title">Sent your payment?</div>
              <div className="bd-cta-text">Share your transfer receipt with our team so we can confirm it quickly.</div>
            </div>
            <a href="https://wa.me/17862160122?text=Hi%2C%20I'm%20interested%20in%20a%20car%20from%20BestBuy%20Auto%2C%20please%20share%20details" target="_blank" rel="noreferrer" className="bd-cta-btn">
              <i className="fab fa-whatsapp"></i> Send Receipt on WhatsApp
            </a>
          </div>

        </div>
      </div>

      <div className="float-group">
        <a
          className="float-btn float-wa"
          href="https://wa.me/17862160122?text=Hi%2C%20I'm%20interested%20in%20a%20car%20from%20BestBuy%20Auto%2C%20please%20share%20details"
          target="_blank"
          rel="noreferrer"
        >
          <span className="float-label">WhatsApp Us</span>
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>

      <button id="backTop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <i className="fas fa-chevron-up"></i>
      </button>
    </>
  );
}