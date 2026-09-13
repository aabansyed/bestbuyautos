import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSiteContent, CONTENT_DEFAULTS } from "../lib/siteContentApi";
import "../styles/ceo-message.css";

export default function CeoMessage() {
  const [content, setContent] = useState(CONTENT_DEFAULTS);

  useEffect(() => {
    fetchSiteContent().then(setContent).catch(() => {});
  }, []);

  const bodyParagraphs = (content.ceo_body || "").split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <div className="breadcrumb-section" style={{ position: 'relative', overflow: 'hidden', minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <img src="/topside.png" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} alt="" />
        <div style={{ position: 'absolute', inset: '0', background: 'linear-gradient(135deg,rgba(10,10,10,0.88) 0%,rgba(10,10,10,0.65) 60%,rgba(160,120,48,0.25) 100%)' }}></div>
        <div style={{ position: 'absolute', inset: '0', background: 'radial-gradient(ellipse at 50% 100%,rgba(201,168,76,0.12) 0%,transparent 70%)' }}></div>
        <div style={{ position: 'relative', zIndex: '1', padding: '60px 32px' }}>
          <div className="breadcrumb-tag">About BestBuy Auto</div>
          <h1 className="breadcrumb-title">Message from our <span style={{ background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>CEO</span></h1>
          <nav className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span className="sep"><i className="fas fa-chevron-right"></i></span>
            <Link to="/our-company">About</Link>
            <span className="sep"><i className="fas fa-chevron-right"></i></span>
            <span className="active">CEO Message</span>
          </nav>
        </div>
      </div>

      <section className="ceo-section" style={{ background: 'var(--black)', padding: '80px 5%' }}>
        <div className="ceo-container">
          <div className="ceo-letter-card" data-aos="fade-up">

            <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg,var(--gold-dark),var(--gold-light))', borderRadius: '2px', marginBottom: '28px' }}></div>

            <div className="ceo-badge"><span></span> Message from our CEO</div>

            <h2 className="ceo-heading">{content.ceo_headline}</h2>
            <p className="ceo-subheading">{content.ceo_subheading}</p>

            <div className="ceo-divider"></div>

            <div className="ceo-body">
              {bodyParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="ceo-signature-block">
              <div className="ceo-avatar">{content.ceo_name?.[0] || "B"}</div>
              <div className="ceo-sig-text">
                <div className="ceo-sig-handwritten">BestBuy Auto</div>
                <div className="ceo-sig-name">{content.ceo_name}</div>
                <div className="ceo-sig-role">{content.ceo_role}</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="milestones-section">
        <div className="milestones-container">
          <div className="milestones-panel" data-aos="fade-up" data-aos-delay="100">
            <div className="milestones-grid">

              <div className="milestone-col">
                <div className="milestone-col-title"><i className="fas fa-user-tie"></i> Meet Our CEO</div>
                <div className="milestone-item">
                  <div className="milestone-year">Leadership</div>
                  <div className="milestone-detail">Guiding BestBuy Auto's global growth with decades of automotive expertise.</div>
                </div>
                <div className="milestone-item">
                  <div className="milestone-year">Leadership Role</div>
                  <div className="milestone-detail">Chief Executive Officer ensuring quality and trust across every export.</div>
                </div>
                <div className="milestone-item">
                  <div className="milestone-year">Organization</div>
                  <div className="milestone-detail">BestBuy Auto Japan, serving buyers across 120+ countries worldwide.</div>
                </div>
              </div>

              <div className="milestone-col">
                <div className="milestone-col-title"><i className="fas fa-road"></i> Career Milestones</div>
                <div className="milestone-item">
                  <div className="milestone-year">Early Days – First Export</div>
                  <div className="milestone-detail">Founded BestBuy Auto and started first exports directly from Japanese ports.</div>
                </div>
                <div className="milestone-item">
                  <div className="milestone-year">Global Expansion</div>
                  <div className="milestone-detail">Expanded globally with dedicated support centers across Asia and Africa.</div>
                </div>
                <div className="milestone-item">
                  <div className="milestone-year">Present – Industry Leader</div>
                  <div className="milestone-detail">Now leading exports across Asia, Africa, Middle East, and Europe.</div>
                </div>
              </div>

              <div className="milestone-col">
                <div className="milestone-col-title"><i className="fas fa-trophy"></i> Trailblazing Success</div>
                <div className="milestone-item">
                  <div className="milestone-year">Market Growth</div>
                  <div className="milestone-detail">Consistent revenue growth driven by 50,000+ satisfied global customers.</div>
                </div>
                <div className="milestone-item">
                  <div className="milestone-year">Innovation Pioneering</div>
                  <div className="milestone-detail">Introduced advanced digital inspection reports and real-time container tracking.</div>
                </div>
                <div className="milestone-item">
                  <div className="milestone-year">Recognition</div>
                  <div className="milestone-detail">Honored for customer loyalty, transparency, and global export leadership.</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <div className="float-group">
        <a className="float-btn float-wa" href="https://wa.me/8190XXXXXXXX" target="_blank" rel="noreferrer">
          <span className="float-label">WhatsApp Us</span>
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </>
  );
}