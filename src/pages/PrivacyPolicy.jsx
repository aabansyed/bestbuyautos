import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPublicPolicyBlocks, parsePolicyBody, renderInline } from "../lib/policyApi";
import "../styles/privacy-policy.css";

export default function PrivacyPolicy() {
  const [blocks, setBlocks] = useState(null);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    fetchPublicPolicyBlocks().then(setBlocks).catch(() => setBlocks([]));
  }, []);

  // Scroll par sidebar mein current section highlight karo
  useEffect(() => {
    if (!blocks || blocks.length === 0) return;
    const els = blocks
      .map((b) => document.getElementById(`block-${b.id}`))
      .filter(Boolean);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [blocks]);

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <>
      {/* ── HERO ── */}
      <div className="pp-hero">
        <img className="pp-hero-bg" src="/topside.png" alt="" />
        <div className="pp-hero-overlay"></div>
        <div className="pp-hero-line pp-hero-line-top"></div>
        <div className="pp-hero-line pp-hero-line-bottom"></div>

        <div className="pp-hero-content">
          <div className="pp-hero-tag">Legal</div>
          <div className="pp-title-row">
            <h1 className="pp-hero-title">
              Privacy <span className="pp-gold">Policy</span>
            </h1>
            <div className="pp-crumbs">
              <Link to="/">Home</Link>
              <span className="pp-crumb-sep"><i className="fas fa-chevron-right"></i></span>
              <span className="pp-crumb-active">Privacy Policy</span>
            </div>
          </div>
          <div className="pp-gold-line"></div>
        </div>
      </div>

      {/* ── BODY ── */}
      <section className="pp-section">
        <div className="pp-inner">

          {/* Sidebar: table of contents */}
          <aside className="pp-toc">
            <div className="pp-toc-title"><i className="fas fa-list-ul"></i> On this page</div>
            <ul className="pp-toc-list">
              {blocks && blocks.map((block) => {
                const id = `block-${block.id}`;
                return (
                  <li key={block.id}>
                    <button
                      type="button"
                      className={`pp-toc-link${activeId === id ? " active" : ""}`}
                      onClick={() => goTo(id)}
                    >
                      <i className={`fas ${block.icon}`}></i>
                      <span>{block.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Content */}
          <div className="pp-content">
            {blocks === null && (
              <div className="pp-loading">
                <i className="fas fa-circle-notch fa-spin"></i>
              </div>
            )}

            {blocks && blocks.length === 0 && (
              <div className="pp-empty">
                <i className="fas fa-file-shield"></i>
                <p>Policy content is not available right now. Please check back soon.</p>
              </div>
            )}

            {blocks && blocks.map((block) => {
              const parsed = parsePolicyBody(block.body);
              return (
                <article className="pp-block" id={`block-${block.id}`} key={block.id}>
                  <header className="pp-block-head">
                    <div className="pp-block-icon"><i className={`fas ${block.icon}`}></i></div>
                    <h2 className="pp-block-title">{block.title}</h2>
                  </header>
                  <div className="pp-text">
                    {parsed.map((item, i) =>
                      item.type === "ul" ? (
                        <ul key={i}>
                          {item.items.map((li, liIdx) => (
                            <li key={liIdx}>{renderInline(li, `${i}-${liIdx}`)}</li>
                          ))}
                        </ul>
                      ) : (
                        <p key={i}>{renderInline(item.content, `${i}`)}</p>
                      )
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WhatsApp float ── */}
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
    </>
  );
}