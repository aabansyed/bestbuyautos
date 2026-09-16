import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSiteContent, getHtbQuickSteps, getHtbDetailSteps } from "../lib/siteContentApi";
import "../styles/howtobuy.css";

export default function HowToBuy() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setContent(await fetchSiteContent());
      } catch {
        setContent({}); // fall back to defaults baked into the getters below
      }
    })();
  }, []);

  if (!content) {
    return (
      <div className="htb-loading-screen">
        <i className="fas fa-circle-notch fa-spin"></i>
      </div>
    );
  }

  const quickSteps = getHtbQuickSteps(content);
  const detailSteps = getHtbDetailSteps(content);

  return (
    <>
      <div className="breadcrumb-section">
        <img className="bc-bg" src="/topside.png" alt="" />
        <div className="bc-overlay"></div>
        <div className="bc-glow"></div>

        <div style={{ position: "absolute", top: "0", left: "0", right: "0", height: "2px", background: "linear-gradient(90deg,transparent,var(--gold),transparent)", zIndex: "3" }}></div>
        <div style={{ position: "absolute", bottom: "0", left: "0", right: "0", height: "2px", background: "linear-gradient(90deg,transparent,var(--gold),transparent)", zIndex: "3" }}></div>

        <div className="bc-content">
          <div className="breadcrumb-tag">{content.htb_hero_tag}</div>
          <h1 className="breadcrumb-title">
            {content.htb_hero_title}{" "}
            <span style={{ background: "linear-gradient(135deg,var(--gold-dark),var(--gold-light))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {content.htb_hero_highlight}
            </span>
          </h1>
          <div className="gold-line"></div>
          <nav className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span className="sep"><i className="fas fa-chevron-right"></i></span>
            <span className="active-crumb">How to Buy</span>
          </nav>
        </div>
      </div>

      <section className="main-section">
        <div className="container-inner">
          <div className="section-heading" data-aos="fade-up">
            <div className="section-subtitle">{content.htb_section_subtitle}</div>
            <h2 className="section-title-main">
              {content.htb_section_title} <span className="gold">{content.htb_section_highlight}</span>
            </h2>
            <div className="gold-line"></div>
          </div>

          <div className="step-cards-grid">
            {quickSteps.map((step, i) => (
              <div className="step-card" data-aos="fade-up" data-aos-delay={i * 60} key={i}>
                <div className="step-number">{String(i + 1).padStart(2, "0")}</div>
                <div className="step-icon-wrap">
                  <img src={step.icon} alt={step.title} className="step-icon-svg" />
                </div>
                <div className="step-title">{step.title}</div>
                <div className="step-description">{step.description}</div>
              </div>
            ))}
          </div>

          <div className="browse-notice" data-aos="fade-up">
            <span><i className="fas fa-car" style={{ marginRight: "8px" }}></i>Browse Our Latest Japanese Used Cars with Full Specifications</span>
          </div>

          {detailSteps.map((step, i) => (
            <div className={"detail-step-row" + (i % 2 === 1 ? " reverse" : "")} data-aos="fade-up" key={i}>
              <div className="step-text-block">
                <div className="step-num-label">
                  <div className="step-num-badge">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="step-heading">{step.heading} <span className="gold">{step.highlight}</span></h3>
                </div>
                <div className="step-body">
                  <p>{step.bodyBefore}</p>
                  {step.tags?.length > 0 && (
                    <div className="tag-row">
                      {step.tags.map((tag) => <span className="spec-tag" key={tag}>{tag}</span>)}
                    </div>
                  )}
                  {step.bodyAfter && <p>{step.bodyAfter}</p>}
                </div>
              </div>
              <div className="step-img-block">
                <div className="step-img-frame">
                  <img src={step.image} alt={`${step.heading} ${step.highlight}`} />
                  <div className="step-img-badge"><i className={`fas ${step.badgeIcon}`}></i> {step.badgeText}</div>
                </div>
              </div>
            </div>
          ))}

          <div className="important-notice" data-aos="fade-up">
            <div className="notice-icon"><i className="fas fa-triangle-exclamation"></i></div>
            <div className="notice-text">
              <strong>Important:</strong> {content.htb_notice_text}
            </div>
          </div>
        </div>
      </section>

      <div className="float-group">
        <a className="float-btn float-wa" href={content.htb_whatsapp_link} target="_blank" rel="noreferrer">
          <span className="float-label">WhatsApp Us</span>
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </>
  );
}