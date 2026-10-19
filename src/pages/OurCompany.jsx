import { useEffect, useState } from "react";
import { initOurCompanyPage } from "./scripts/ourCompanyScript";
import {
  fetchSiteContent, CONTENT_DEFAULTS,
  getOcValues, getOcTeam, getOcPartners, getOcAwards, getOcTimeline,
  getOcInspectionItems, getOcGradeBars, getOcGradeLegend, getOcDocuments, getOcGuarantees,
} from "../lib/siteContentApi";
import "../styles/our-company.css";

const GoldSpan = ({ children }) => (
  <span style={{ background: "linear-gradient(135deg,var(--gold-dark),var(--gold-light))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

export default function OurCompany() {
  const [content, setContent] = useState(CONTENT_DEFAULTS);

  useEffect(() => {
    fetchSiteContent().then(setContent).catch(() => {});
  }, []);

  useEffect(() => {
    const cleanup = initOurCompanyPage();
    return cleanup;
  }, []);

  const values = getOcValues(content);
  const team = getOcTeam(content);
  const partners = getOcPartners(content);
  const awards = getOcAwards(content);
  const timeline = getOcTimeline(content);
  const inspectionItems = getOcInspectionItems(content);
  const gradeBars = getOcGradeBars(content);
  const gradeLegend = getOcGradeLegend(content);
  const documents = getOcDocuments(content);
  const guarantees = getOcGuarantees(content);

  return (
    <>
      <div className="about-hero" id="aboutHero">
        <div className="about-hero-inner">
          <div data-aos="fade-right">
            <div className="hero-badge"><span className="blink"></span> {content.company_hero_badge}</div>
            <h1 className="about-hero-title" id="heroTitle">
              Japan's Most <GoldSpan>Trusted</GoldSpan> Car Exporter
            </h1>
            <p className="about-hero-desc">{content.company_hero_desc}</p>
            <div className="hero-stats">
              <div className="stat"><div className="stat-num">{content.company_stat_years}</div><div className="stat-lbl">Years in Business</div></div>
              <div className="stat"><div className="stat-num">{content.company_stat_countries}</div><div className="stat-lbl">Countries Served</div></div>
              <div className="stat"><div className="stat-num">{content.company_stat_cars}</div><div className="stat-lbl">Cars Exported</div></div>
            </div>
          </div>
          <div className="about-hero-visual" data-aos="fade-left">
            <div className="geo-deco"></div>
            <div className="geo-deco2"></div>
            <div className="about-visual-grid">
              <div className="visual-img visual-img-large"><img src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80" alt="BBA Fleet" /></div>
              <div className="visual-img visual-img-sm"><img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80" alt="Export" /></div>
              <div className="visual-img visual-img-sm"><img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80" alt="Port" /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-tabs-wrap">
        <button className="page-tab active" id="tab-company" onClick={() => { switchPage('company') }}>
          <i className="fas fa-building"></i> Our Company
        </button>
        <button className="page-tab" id="tab-process" onClick={() => { switchPage('process') }}>
          <i className="fas fa-route"></i> Our Process
        </button>
      </div>

      <div className="page-section active" id="page-company">

        <section style={{ background: 'var(--black)' }}>
          <div className="container">
            <div className="mission-grid">
              <div className="mission-img-wrap" data-aos="fade-right">
                <div className="mission-img-stack">
                  <div className="mission-badge-float"><i className="fas fa-award"></i> #1 Rated Japan Exporter</div>
                  <img className="mission-img-main" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=80" alt="Our Mission" />
                  <img className="mission-img-float" src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300&q=80" alt="Team" />
                </div>
              </div>
              <div className="mission-text" data-aos="fade-left">
                <div className="section-tag">Our Mission</div>
                <h2 className="section-title">Built on <span className="gold">Trust &amp; Integrity</span></h2>
                <div className="gold-line" style={{ marginBottom: '22px' }}></div>
                <p>{content.mission_para1}</p>
                <p>{content.mission_para2}</p>
                <div className="mission-highlights">
                  <div className="highlight-row"><div className="highlight-icon"><i className="fas fa-check"></i></div><div className="highlight-text"><span>{content.mission_repeat_rate}</span> repeat customer rate — the highest in the industry</div></div>
                  <div className="highlight-row"><div className="highlight-icon"><i className="fas fa-shield-alt"></i></div><div className="highlight-text">Every vehicle physically inspected before listing</div></div>
                  <div className="highlight-row"><div className="highlight-icon"><i className="fas fa-globe"></i></div><div className="highlight-text">Active offices in Japan, UAE, and Kenya</div></div>
                  <div className="highlight-row"><div className="highlight-icon"><i className="fas fa-star"></i></div><div className="highlight-text"><span>{content.mission_rating}</span> average customer satisfaction rating</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '46px' }} data-aos="fade-up">
              <div className="section-tag">{content.oc_values_tag}</div>
              <h2 className="section-title">{content.oc_values_title} <span className="gold">{content.oc_values_title_gold}</span></h2>
              <div className="gold-line" style={{ margin: '16px auto 0' }}></div>
            </div>
            <div className="values-grid">
              {values.map((v, i) => (
                <div className="value-card" data-aos="fade-up" data-aos-delay={i * 80} key={i}>
                  <div className="value-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="value-icon"><i className={`fas ${v.icon}`}></i></div>
                  <div className="value-title">{v.title}</div>
                  <div className="value-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--black)' }}>
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '46px' }} data-aos="fade-up">
              <div className="section-tag">{content.oc_team_tag}</div>
              <h2 className="section-title">{content.oc_team_title} <span className="gold">{content.oc_team_title_gold}</span></h2>
              <div className="gold-line" style={{ margin: '16px auto 0' }}></div>
              <p className="section-desc" style={{ margin: '16px auto 0' }}>{content.oc_team_desc}</p>
            </div>
            <div className="team-grid">
              {team.map((m, i) => (
                <div className="team-card" data-aos="fade-up" data-aos-delay={i * 80} key={i}>
                  <div className="team-img-wrap"><div className="team-avatar-large">{m.initials}</div></div>
                  <div className="team-body">
                    <div className="team-name">{m.name}</div>
                    <div className="team-role">{m.role}</div>
                    <div className="team-desc">{m.desc}</div>
                    <div className="team-social">
                      {m.linkedin && <a href={m.linkedin} className="team-soc-btn"><i className="fab fa-linkedin-in"></i></a>}
                      {m.twitter && <a href={m.twitter} className="team-soc-btn"><i className="fab fa-twitter"></i></a>}
                      {m.whatsapp && <a href={m.whatsapp} className="team-soc-btn"><i className="fab fa-whatsapp"></i></a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--dark)', paddingBottom: '46px' }}>
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '46px' }} data-aos="fade-up">
              <div className="section-tag">{content.oc_partners_tag}</div>
              <h2 className="section-title">{content.oc_partners_title} <span className="gold">{content.oc_partners_title_gold}</span></h2>
              <div className="gold-line" style={{ margin: '16px auto 0' }}></div>
              <p className="section-desc" style={{ margin: '16px auto 0' }}>{content.oc_partners_desc}</p>
            </div>
            <div className="partners-grid">
              {partners.map((p, i) => (
                <div className="partner-card" data-aos="fade-up" data-aos-delay={i * 60} key={i}>
                  <div className="partner-icon">{p.icon}</div>
                  <div className="partner-name">{p.name}</div>
                  <div className="partner-country">{p.country}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '46px' }}>
              <div className="section-header" style={{ textAlign: 'center', marginBottom: '26px' }} data-aos="fade-up">
                <div className="section-tag">{content.oc_awards_tag}</div>
                <h2 className="section-title" style={{ fontSize: '1.7rem' }}>{content.oc_awards_title} <span className="gold">{content.oc_awards_title_gold}</span></h2>
              </div>
              <div className="awards-row">
                {awards.map((a, i) => (
                  <div className="award-item" data-aos="fade-up" data-aos-delay={i * 60} key={i}>
                    <div className="award-icon"><i className={`fas ${a.icon}`}></i></div>
                    <div><div className="award-title">{a.title}</div><div className="award-year">{a.year}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>

      <div className="page-section" id="page-process">

        <section style={{ background: 'var(--black)' }}>
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }} data-aos="fade-up">
              <div className="section-tag">{content.oc_timeline_tag}</div>
              <h2 className="section-title">{content.oc_timeline_title} <span className="gold">{content.oc_timeline_title_gold}</span></h2>
              <div className="gold-line" style={{ margin: '16px auto 0' }}></div>
              <p className="section-desc" style={{ margin: '16px auto 0' }}>{content.oc_timeline_desc}</p>
            </div>
            <div className="timeline">
              {timeline.map((step, i) => (
                <div className="timeline-item" data-aos={i % 2 === 0 ? "fade-right" : "fade-left"} key={i}>
                  <div className="timeline-content">
                    <div className="timeline-tag">{step.tag}</div>
                    <div className="timeline-title">{step.title}</div>
                    <div className="timeline-desc">{step.desc}</div>
                    <div className="timeline-detail">
                      {(step.points || []).map((pt, pi) => (
                        <div className="tl-point" key={pi}><i className="fas fa-check-circle"></i> {pt}</div>
                      ))}
                    </div>
                  </div>
                  <div className="timeline-dot">{String(i + 1).padStart(2, "0")}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '46px' }} data-aos="fade-up">
              <div className="section-tag">{content.oc_inspection_tag}</div>
              <h2 className="section-title">{content.oc_inspection_title} <span className="gold">{content.oc_inspection_title_gold}</span></h2>
              <div className="gold-line" style={{ margin: '16px auto 0' }}></div>
              <p className="section-desc" style={{ margin: '16px auto 0' }}>{content.oc_inspection_desc}</p>
            </div>
            <div className="inspection-grid">
              <div data-aos="fade-right">
                <div className="inspection-list">
                  {inspectionItems.map((it, i) => (
                    <div className="insp-item" key={i}>
                      <div className="insp-num">{i + 1}</div>
                      <div className="insp-label">{it.label}</div>
                      <div className="insp-check"><i className="fas fa-check"></i></div>
                    </div>
                  ))}
                </div>
              </div>
              <div data-aos="fade-left">
                <div className="inspection-card">
                  <div className="insp-grade">
                    <div className="grade-label">{content.oc_grade_label}</div>
                    <div className="grade-display">{content.oc_grade_display}</div>
                    <div className="grade-sub">{content.oc_grade_sub}</div>
                  </div>
                  {gradeBars.map((g, i) => (
                    <div className="grade-bar-row" key={i}>
                      <div className="grade-bar-label"><span>{g.label}</span><span>{g.percent}%</span></div>
                      <div className="grade-bar"><div className="grade-fill" style={{ width: `${g.percent}%` }}></div></div>
                    </div>
                  ))}
                  <div style={{ marginTop: '18px', padding: '13px', background: 'rgba(201,168,76,.06)', border: '1px solid rgba(201,168,76,.15)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '.76rem', color: 'var(--gray)', marginBottom: '6px' }}>What our grades mean:</div>
                    <div style={{ fontSize: '.81rem', lineHeight: '1.8', color: 'var(--white)' }}>
                      {gradeLegend.map((g, i) => (
                        <span key={i}><span style={{ color: 'var(--gold)', fontWeight: '600' }}>{g.grade}</span> {g.meaning}{i < gradeLegend.length - 1 ? <br /> : null}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--black)' }}>
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '46px' }} data-aos="fade-up">
              <div className="section-tag">{content.oc_documents_tag}</div>
              <h2 className="section-title">{content.oc_documents_title} <span className="gold">{content.oc_documents_title_gold}</span></h2>
              <div className="gold-line" style={{ margin: '16px auto 0' }}></div>
              <p className="section-desc" style={{ margin: '16px auto 0' }}>{content.oc_documents_desc}</p>
            </div>
            <div className="doc-list">
              {documents.map((d, i) => (
                <div className="doc-item" data-aos="fade-up" data-aos-delay={i * 60} key={i}>
                  <div className="doc-icon"><i className={`fas ${d.icon}`}></i></div>
                  <div><div className="doc-name">{d.name}</div><div className="doc-note">{d.note}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '46px' }} data-aos="fade-up">
              <div className="section-tag">{content.oc_guarantees_tag}</div>
              <h2 className="section-title">{content.oc_guarantees_title} <span className="gold">{content.oc_guarantees_title_gold}</span></h2>
              <div className="gold-line" style={{ margin: '16px auto 0' }}></div>
            </div>
            <div className="guarantees-grid">
              {guarantees.map((g, i) => (
                <div className="guarantee-card" data-aos="fade-up" data-aos-delay={i * 80} key={i}>
                  <div className="guarantee-icon"><i className={`fas ${g.icon}`}></i></div>
                  <div className="guarantee-title">{g.title}</div>
                  <div className="guarantee-desc">{g.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      <section style={{ padding: '56px 4%', background: 'var(--black)' }}>
        <div className="container">
          <div className="glass-banner" data-aos="zoom-in">
            <h2>{content.oc_cta_title} <GoldSpan>{content.oc_cta_title_gold}</GoldSpan></h2>
            <p>{content.oc_cta_desc}</p>
            <div className="glass-banner-btns">
              <a href="/#contact" className="btn-outline"><i className="fas fa-envelope"></i> Contact Our Team</a>
            </div>
          </div>
        </div>
      </section>

      <div className="float-group">
        <a className="float-btn float-wa" href={content.oc_whatsapp_link} target="_blank" rel="noreferrer">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </>
  );
}