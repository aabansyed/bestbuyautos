import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPublicPolicyBlocks, parsePolicyBody, renderInline } from "../lib/policyApi";
import "../styles/privacypolicy.css";

export default function PrivacyPolicy() {
  const [blocks, setBlocks] = useState(null);

  useEffect(() => {
    fetchPublicPolicyBlocks().then(setBlocks).catch(() => setBlocks([]));
  }, []);

  return (
    <>
      <div className="breadcrumb-section">
        <div className="breadcrumb-tag">Legal</div>
        <h1 className="breadcrumb-title">Privacy <span style={{ background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Policy</span></h1>
        <nav className="breadcrumb-nav">
          <Link to="/">Home</Link>
          <span className="sep"><i className="fas fa-chevron-right"></i></span>
          <span className="active-crumb">Privacy Policy</span>
        </nav>
        <div className="gold-line"></div>
      </div>

      <section className="policy-section">
        <div className="policy-inner">

          <aside className="policy-toc" data-aos="fade-right"></aside>

          <div className="policy-content">

            {blocks === null && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray)" }}>
                <i className="fas fa-circle-notch fa-spin" style={{ fontSize: "2rem", color: "var(--gold)" }}></i>
              </div>
            )}

            {blocks && blocks.map((block) => {
              const parsed = parsePolicyBody(block.body);
              return (
                <div className="policy-block" id={`block-${block.id}`} key={block.id} data-aos="fade-up">
                  <div className="block-header">
                    <div className="block-icon"><i className={`fas ${block.icon}`}></i></div>
                    <h2 className="block-title">{block.title}</h2>
                  </div>
                  <div className="policy-text">
                    {parsed.map((item, i) =>
                      item.type === "ul" ? (
                        <ul key={i}>
                          {item.items.map((li, li_i) => (
                            <li key={li_i}>{renderInline(li, `${i}-${li_i}`)}</li>
                          ))}
                        </ul>
                      ) : (
                        <p key={i}>{renderInline(item.content, `${i}`)}</p>
                      )
                    )}
                  </div>
                </div>
              );
            })}

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