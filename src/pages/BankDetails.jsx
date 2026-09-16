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

export default function BankDetails() {
  const [content, setContent] = useState(CONTENT_DEFAULTS);

  useEffect(() => {
    fetchSiteContent().then(setContent).catch(() => {});
  }, []);

  const embedUrl = toEmbedUrl(content.bank_video_url);

  return (
    <>
      <div className="breadcrumb-banner">
        <img className="bc-bg" src="/topside.png" alt="" />
        <div className="bc-overlay"></div>
        <div className="bc-content">
          <div className="bc-tag"><span></span> Secure Payments</div>
          <h1>Bank <span className="gold">Details</span></h1>
          <div className="gold-line"></div>
          <ol className="breadcrumb-ol">
            <li><Link to="/">Home</Link></li>
            <li className="sep">/</li>
            <li>About Us</li>
            <li className="sep">/</li>
            <li className="active">Bank Details</li>
          </ol>
        </div>
      </div>

      <div className="sptb" style={{ background: "var(--dark)" }}>
        <div className="container">

          <div className="bd-company-card" data-aos="fade-up">
            <div className="bd-company-icon">
              <i className="fas fa-building-columns"></i>
            </div>
            <div className="bd-company-info">
              <div className="bd-company-name">{content.bank_company_name}</div>
              {content.bank_company_address.split("\n").filter(Boolean).map((line) => (
                <div className="bd-company-line" key={line}>{line}</div>
              ))}
              <div className="bd-company-line bd-company-phone">
                <i className="fas fa-phone"></i> {content.bank_company_phone}
              </div>
            </div>
          </div>

          {content.bank_intro_text && (
            <p className="bd-intro" data-aos="fade-up">{content.bank_intro_text}</p>
          )}

          <div className="bd-table-wrap" data-aos="fade-up">
            <div className="bd-table-title">
              <i className="fas fa-shield-halved"></i> Beneficiary Banking Details for International Transfer
            </div>

            <div className="bd-table">
              <div className="bd-row">
                <div className="bd-row-label"><i className="fas fa-landmark"></i> Bank Name</div>
                <div className="bd-row-value"><span>{content.bank_name}</span></div>
              </div>
              <div className="bd-row">
                <div className="bd-row-label"><i className="fas fa-code-branch"></i> Branch Code</div>
                <div className="bd-row-value"><span>{content.bank_branch_code}</span></div>
              </div>
              <div className="bd-row">
                <div className="bd-row-label"><i className="fas fa-map-location-dot"></i> Bank Address</div>
                <div className="bd-row-value"><span>{content.bank_address}</span></div>
              </div>
              <div className="bd-row">
                <div className="bd-row-label"><i className="fas fa-user"></i> Account Name</div>
                <div className="bd-row-value"><span>{content.bank_account_name}</span></div>
              </div>
              <CopyField label="Account Number" value={content.bank_account_number} icon="fa-hashtag" />
              <CopyField label="Swift Code" value={content.bank_swift_code} icon="fa-globe" />
            </div>

            {content.bank_note && (
              <div className="bd-note">
                <i className="fas fa-triangle-exclamation"></i> {content.bank_note}
              </div>
            )}
          </div>

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
            
                      <a href="https://wa.me/8190XXXXXXXX?text=Hi%2C%20I%27ve%20sent%20a%20bank%20transfer%20for%20my%20order" target="_blank" rel="noreferrer" className="bd-cta-btn">
              <i className="fab fa-whatsapp"></i> Send Receipt on WhatsApp
            </a>
          </div>

        </div>
      </div>

      <a className="float-wa" href="https://wa.me/8190XXXXXXXX?text=Hi%2C%20I%20have%20a%20question%20about%20bank%20details" target="_blank" rel="noreferrer">
        <span className="float-wa-tooltip">WhatsApp Us</span>
        <i className="fab fa-whatsapp"></i>
      </a>

      <button id="backTop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <i className="fas fa-chevron-up"></i>
      </button>
    </>
  );
}