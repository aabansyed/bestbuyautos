import { useEffect, useState } from "react";
import { initOurCompanyPage } from "./scripts/ourCompanyScript";
import { fetchSiteContent, CONTENT_DEFAULTS } from "../lib/siteContentApi";
import "../styles/our-company.css";

export default function OurCompany() {
  const [content, setContent] = useState(CONTENT_DEFAULTS);

  useEffect(() => {
    fetchSiteContent().then(setContent).catch(() => {});
  }, []);

  useEffect(() => {
    const cleanup = initOurCompanyPage();
    return cleanup;
  }, []);
  return (
    <>
<div className="about-hero" id="aboutHero">
  <div className="about-hero-inner">
    <div data-aos="fade-right">
           <div className="hero-badge"><span className="blink"></span> {content.company_hero_badge}</div>
      <h1 className="about-hero-title" id="heroTitle">
        Japan's Most <span style={{background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Trusted</span> Car Exporter
      </h1>
      <p className="about-hero-desc">{content.company_hero_desc}</p>
      <div className="hero-stats">
        <div className="stat"><div className="stat-num">{content.company_stat_years}</div><div className="stat-lbl">Years in Business</div></div>
        <div className="stat"><div className="stat-num">{content.company_stat_countries}</div><div className="stat-lbl">Countries Served</div></div>
        <div className="stat"><div className="stat-num">{content.company_stat_cars}</div><div className="stat-lbl">Cars Exported</div></div>
      </div>
      <h1 className="about-hero-title" id="heroTitle">
        Japan's Most <span style={{background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Trusted</span> Car Exporter
      </h1>
      <p className="about-hero-desc">For over 16 years, BestBuy Auto Japan has been connecting car buyers across the globe with the finest Japanese vehicles — with transparency, integrity, and world-class service.</p>
      <div className="hero-stats">
        <div className="stat"><div className="stat-num">16+</div><div className="stat-lbl">Years in Business</div></div>
        <div className="stat"><div className="stat-num">120+</div><div className="stat-lbl">Countries Served</div></div>
        <div className="stat"><div className="stat-num">85K+</div><div className="stat-lbl">Cars Exported</div></div>
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

  <section style={{background: 'var(--black)'}}>
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
          <div className="gold-line" style={{marginBottom: '22px'}}></div>
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

  <section style={{background: 'var(--dark)'}}>
    <div className="container">
      <div className="section-header" style={{textAlign: 'center', marginBottom: '46px'}} data-aos="fade-up">
        <div className="section-tag">Our Values</div>
        <h2 className="section-title">What <span className="gold">Drives Us</span></h2>
        <div className="gold-line" style={{margin: '16px auto 0'}}></div>
      </div>
      <div className="values-grid">
        <div className="value-card" data-aos="fade-up" data-aos-delay="0"><div className="value-num">01</div><div className="value-icon"><i className="fas fa-handshake"></i></div><div className="value-title">Integrity First</div><div className="value-desc">We never misrepresent a vehicle's condition, history, or price. Honest deals, always.</div></div>
        <div className="value-card" data-aos="fade-up" data-aos-delay="80"><div className="value-num">02</div><div className="value-icon"><i className="fas fa-users"></i></div><div className="value-title">Customer-Centric</div><div className="value-desc">Every decision we make is filtered through one question: is this best for our customer?</div></div>
        <div className="value-card" data-aos="fade-up" data-aos-delay="160"><div className="value-num">03</div><div className="value-icon"><i className="fas fa-search"></i></div><div className="value-title">Transparency</div><div className="value-desc">Full disclosure on mileage, inspection grades, accident history, and all costs upfront.</div></div>
        <div className="value-card" data-aos="fade-up" data-aos-delay="240"><div className="value-num">04</div><div className="value-icon"><i className="fas fa-rocket"></i></div><div className="value-title">Excellence</div><div className="value-desc">We set the highest standards in vehicle sourcing, logistics, and post-sale support.</div></div>
        <div className="value-card" data-aos="fade-up" data-aos-delay="320"><div className="value-num">05</div><div className="value-icon"><i className="fas fa-leaf"></i></div><div className="value-title">Sustainability</div><div className="value-desc">Promoting hybrid and EV adoption to reduce global carbon footprint, one export at a time.</div></div>
      </div>
    </div>
  </section>

  <section style={{background: 'var(--black)'}}>
    <div className="container">
      <div className="section-header" style={{textAlign: 'center', marginBottom: '46px'}} data-aos="fade-up">
        <div className="section-tag">Our People</div>
        <h2 className="section-title">Meet the <span className="gold">Leadership</span></h2>
        <div className="gold-line" style={{margin: '16px auto 0'}}></div>
        <p className="section-desc" style={{margin: '16px auto 0'}}>The passionate team behind Japan's most trusted export platform.</p>
      </div>
      <div className="team-grid">
        <div className="team-card" data-aos="fade-up" data-aos-delay="0"><div className="team-img-wrap"><div className="team-avatar-large">TK</div></div><div className="team-body"><div className="team-name">Takeshi Kimura</div><div className="team-role">Founder &amp; CEO</div><div className="team-desc">16+ years in the Japanese automotive export industry. Built BBA Japan from the ground up with a vision of accessible, honest car exports worldwide.</div><div className="team-social"><a href="#" className="team-soc-btn"><i className="fab fa-linkedin-in"></i></a><a href="#" className="team-soc-btn"><i className="fab fa-twitter"></i></a></div></div></div>
        <div className="team-card" data-aos="fade-up" data-aos-delay="80"><div className="team-img-wrap"><div className="team-avatar-large">AY</div></div><div className="team-body"><div className="team-name">Aiko Yamamoto</div><div className="team-role">Head of Operations</div><div className="team-desc">Logistics and export specialist with 12 years of experience managing container shipments to 60+ countries simultaneously.</div><div className="team-social"><a href="#" className="team-soc-btn"><i className="fab fa-linkedin-in"></i></a></div></div></div>
        <div className="team-card" data-aos="fade-up" data-aos-delay="160"><div className="team-img-wrap"><div className="team-avatar-large">RO</div></div><div className="team-body"><div className="team-name">Ravi Okafor</div><div className="team-role">Africa Regional Director</div><div className="team-desc">Oversees operations and partnerships across 30 African countries. Fluent in English, Swahili, and Japanese. Based in Nairobi.</div><div className="team-social"><a href="#" className="team-soc-btn"><i className="fab fa-linkedin-in"></i></a><a href="#" className="team-soc-btn"><i className="fab fa-whatsapp"></i></a></div></div></div>
        <div className="team-card" data-aos="fade-up" data-aos-delay="240"><div className="team-img-wrap"><div className="team-avatar-large">MH</div></div><div className="team-body"><div className="team-name">Mohammed Al-Harbi</div><div className="team-role">Middle East Director</div><div className="team-desc">Manages GCC and MENA market operations from Dubai. Specialist in luxury and premium vehicle procurement and export.</div><div className="team-social"><a href="#" className="team-soc-btn"><i className="fab fa-linkedin-in"></i></a></div></div></div>
      </div>
    </div>
  </section>

  <section style={{background: 'var(--dark)', paddingBottom: '46px'}}>
    <div className="container">
      <div className="section-header" style={{textAlign: 'center', marginBottom: '46px'}} data-aos="fade-up">
        <div className="section-tag">Our Network</div>
        <h2 className="section-title">Trusted <span className="gold">Global Partners</span></h2>
        <div className="gold-line" style={{margin: '16px auto 0'}}></div>
        <p className="section-desc" style={{margin: '16px auto 0'}}>We work with the most reputable shipping lines, auction houses, and customs agents worldwide.</p>
      </div>
      <div className="partners-grid">
        <div className="partner-card" data-aos="fade-up" data-aos-delay="0"><div className="partner-icon">🏢</div><div className="partner-name">USS Auctions</div><div className="partner-country">Japan — #1 Auto Auction</div></div>
        <div className="partner-card" data-aos="fade-up" data-aos-delay="60"><div className="partner-icon">🚢</div><div className="partner-name">MOL Shipping</div><div className="partner-country">Japan — Freight Partner</div></div>
        <div className="partner-card" data-aos="fade-up" data-aos-delay="120"><div className="partner-icon">🚢</div><div className="partner-name">Nippon Yusen</div><div className="partner-country">Japan — RO-RO Carrier</div></div>
        <div className="partner-card" data-aos="fade-up" data-aos-delay="180"><div className="partner-icon">🏦</div><div className="partner-name">SMBC Japan</div><div className="partner-country">Japan — Banking Partner</div></div>
        <div className="partner-card" data-aos="fade-up" data-aos-delay="240"><div className="partner-icon">🔍</div><div className="partner-name">JAAI Inspectors</div><div className="partner-country">Japan — Vehicle Inspection</div></div>
        <div className="partner-card" data-aos="fade-up" data-aos-delay="300"><div className="partner-icon">📦</div><div className="partner-name">DP World</div><div className="partner-country">UAE — Port Operations</div></div>
      </div>
      <div style={{marginTop: '46px'}}>
        <div className="section-header" style={{textAlign: 'center', marginBottom: '26px'}} data-aos="fade-up">
          <div className="section-tag">Recognition</div>
          <h2 className="section-title" style={{fontSize: '1.7rem'}}>Awards &amp; <span className="gold">Certifications</span></h2>
        </div>
        <div className="awards-row">
          <div className="award-item" data-aos="fade-up" data-aos-delay="0"><div className="award-icon"><i className="fas fa-trophy"></i></div><div><div className="award-title">Best Export Company</div><div className="award-year">JAAI Export Awards · 2023</div></div></div>
          <div className="award-item" data-aos="fade-up" data-aos-delay="60"><div className="award-icon"><i className="fas fa-shield-alt"></i></div><div><div className="award-title">ISO 9001:2015 Certified</div><div className="award-year">Quality Management System</div></div></div>
          <div className="award-item" data-aos="fade-up" data-aos-delay="120"><div className="award-icon"><i className="fas fa-star"></i></div><div><div className="award-title">Top Rated Exporter</div><div className="award-year">Trustpilot · 4.9/5 · 3,200+ Reviews</div></div></div>
          <div className="award-item" data-aos="fade-up" data-aos-delay="180"><div className="award-icon"><i className="fas fa-certificate"></i></div><div><div className="award-title">JUMVEA Registered</div><div className="award-year">Japan Used Motor Vehicle Exporters</div></div></div>
        </div>
      </div>
    </div>
  </section>

</div>


<div className="page-section" id="page-process">

  <section style={{background: 'var(--black)'}}>
    <div className="container">
      <div className="section-header" style={{textAlign: 'center', marginBottom: '60px'}} data-aos="fade-up">
        <div className="section-tag">How It Works</div>
        <h2 className="section-title">From Japan to <span className="gold">Your Doorstep</span></h2>
        <div className="gold-line" style={{margin: '16px auto 0'}}></div>
        <p className="section-desc" style={{margin: '16px auto 0'}}>A transparent, end-to-end journey — no surprises, no hidden costs.</p>
      </div>
      <div className="timeline">
        <div className="timeline-item" data-aos="fade-right"><div className="timeline-content"><div className="timeline-tag">Step 01 — Discovery</div><div className="timeline-title">Browse &amp; Select Your Vehicle</div><div className="timeline-desc">Explore thousands of verified vehicles on our platform. Filter by brand, year, price, body type, and more. Each listing includes full specs, inspection grades, and high-resolution photos.</div><div className="timeline-detail"><div className="tl-point"><i className="fas fa-check-circle"></i> 5,000+ live stock listings updated daily</div><div className="tl-point"><i className="fas fa-check-circle"></i> Auction car sourcing on request</div><div className="tl-point"><i className="fas fa-check-circle"></i> WeTalk &amp; WhatsApp support available 24/7</div></div></div><div className="timeline-dot">01</div></div>
        <div className="timeline-item" data-aos="fade-left"><div className="timeline-content"><div className="timeline-tag">Step 02 — Negotiation</div><div className="timeline-title">Get the Best Price</div><div className="timeline-desc">We encourage negotiation. Submit your target price and our team responds within 24 hours. Fleet buyers enjoy additional discounts and dedicated account management.</div><div className="timeline-detail"><div className="tl-point"><i className="fas fa-check-circle"></i> Direct negotiation with export team</div><div className="tl-point"><i className="fas fa-check-circle"></i> Fleet discounts for 3+ vehicles</div><div className="tl-point"><i className="fas fa-check-circle"></i> 24-hour response guarantee</div></div></div><div className="timeline-dot">02</div></div>
        <div className="timeline-item" data-aos="fade-right"><div className="timeline-content"><div className="timeline-tag">Step 03 — Payment</div><div className="timeline-title">Secure Your Purchase</div><div className="timeline-desc">Pay via Bank Transfer (T/T) or Letter of Credit (LC). A 20% deposit secures the vehicle immediately. Balance payable before loading. Full commercial invoice issued instantly.</div><div className="timeline-detail"><div className="tl-point"><i className="fas fa-check-circle"></i> Bank Transfer (T/T) — most popular</div><div className="tl-point"><i className="fas fa-check-circle"></i> Letter of Credit (LC) for fleet buyers</div><div className="tl-point"><i className="fas fa-check-circle"></i> Official commercial invoice &amp; receipt</div></div></div><div className="timeline-dot">03</div></div>
        <div className="timeline-item" data-aos="fade-left"><div className="timeline-content"><div className="timeline-tag">Step 04 — Pre-Export</div><div className="timeline-title">Vehicle Preparation</div><div className="timeline-desc">We deregister the vehicle from Japan's system, conduct a final inspection, thoroughly clean it, and prepare all export documentation. Your vehicle is then loaded into a container or placed on RO-RO vessel.</div><div className="timeline-detail"><div className="tl-point"><i className="fas fa-check-circle"></i> Japanese de-registration (Sakujo)</div><div className="tl-point"><i className="fas fa-check-circle"></i> Pre-export physical inspection</div><div className="tl-point"><i className="fas fa-check-circle"></i> Container or RO-RO loading at Yokohama Port</div></div></div><div className="timeline-dot">04</div></div>
        <div className="timeline-item" data-aos="fade-right"><div className="timeline-content"><div className="timeline-tag">Step 05 — Shipping</div><div className="timeline-title">Set Sail with Live Tracking</div><div className="timeline-desc">Your vehicle departs from Yokohama, Osaka, or Nagoya port. We send you the Bill of Lading, container number, and vessel name. Real-time tracking updates via email and dashboard.</div><div className="timeline-detail"><div className="tl-point"><i className="fas fa-check-circle"></i> Bill of Lading (BL) issued immediately</div><div className="tl-point"><i className="fas fa-check-circle"></i> Live container tracking link provided</div><div className="tl-point"><i className="fas fa-check-circle"></i> ETD/ETA updates via email</div></div></div><div className="timeline-dot">05</div></div>
        <div className="timeline-item" data-aos="fade-left"><div className="timeline-content"><div className="timeline-tag">Step 06 — Arrival</div><div className="timeline-title">Customs &amp; Delivery 🎉</div><div className="timeline-desc">We supply all required customs documents for seamless clearance in your country. Collect your vehicle at the destination port or request door delivery. Your BBA journey is complete!</div><div className="timeline-detail"><div className="tl-point"><i className="fas fa-check-circle"></i> Full customs documentation package</div><div className="tl-point"><i className="fas fa-check-circle"></i> Port-to-door delivery available</div><div className="tl-point"><i className="fas fa-check-circle"></i> Post-delivery support &amp; warranty options</div></div></div><div className="timeline-dot">06</div></div>
      </div>
    </div>
  </section>

  <section style={{background: 'var(--dark)'}}>
    <div className="container">
      <div className="section-header" style={{textAlign: 'center', marginBottom: '46px'}} data-aos="fade-up">
        <div className="section-tag">Quality Control</div>
        <h2 className="section-title">Our <span className="gold">Inspection Standard</span></h2>
        <div className="gold-line" style={{margin: '16px auto 0'}}></div>
        <p className="section-desc" style={{margin: '16px auto 0'}}>Every vehicle passes our 50-point inspection before being listed. We use the JAAI grading system — Japan's gold standard for used vehicle evaluation.</p>
      </div>
      <div className="inspection-grid">
        <div data-aos="fade-right">
          <div className="inspection-list">
            <div className="insp-item"><div className="insp-num">1</div><div className="insp-label">Engine condition &amp; oil checks</div><div className="insp-check"><i className="fas fa-check"></i></div></div>
            <div className="insp-item"><div className="insp-num">2</div><div className="insp-label">Transmission &amp; gearbox test</div><div className="insp-check"><i className="fas fa-check"></i></div></div>
            <div className="insp-item"><div className="insp-num">3</div><div className="insp-label">Brake system &amp; ABS function</div><div className="insp-check"><i className="fas fa-check"></i></div></div>
            <div className="insp-item"><div className="insp-num">4</div><div className="insp-label">Exterior body panel assessment</div><div className="insp-check"><i className="fas fa-check"></i></div></div>
            <div className="insp-item"><div className="insp-num">5</div><div className="insp-label">Interior condition &amp; electronics</div><div className="insp-check"><i className="fas fa-check"></i></div></div>
            <div className="insp-item"><div className="insp-num">6</div><div className="insp-label">Tyre tread depth &amp; wheel alignment</div><div className="insp-check"><i className="fas fa-check"></i></div></div>
            <div className="insp-item"><div className="insp-num">7</div><div className="insp-label">Air conditioning &amp; climate control</div><div className="insp-check"><i className="fas fa-check"></i></div></div>
            <div className="insp-item"><div className="insp-num">8</div><div className="insp-label">Accident history &amp; chassis inspection</div><div className="insp-check"><i className="fas fa-check"></i></div></div>
            <div className="insp-item"><div className="insp-num">9</div><div className="insp-label">Odometer authenticity verification</div><div className="insp-check"><i className="fas fa-check"></i></div></div>
            <div className="insp-item"><div className="insp-num">10</div><div className="insp-label">Safety systems (SRS, seatbelts)</div><div className="insp-check"><i className="fas fa-check"></i></div></div>
          </div>
        </div>
        <div data-aos="fade-left">
          <div className="inspection-card">
            <div className="insp-grade">
              <div className="grade-label">JAAI Grade System</div>
              <div className="grade-display">4.5</div>
              <div className="grade-sub">Average Stock Grade (Max: 5)</div>
            </div>
            <div className="grade-bar-row"><div className="grade-bar-label"><span>Grade 5 (Excellent)</span><span>28%</span></div><div className="grade-bar"><div className="grade-fill" style={{width: '28%'}}></div></div></div>
            <div className="grade-bar-row"><div className="grade-bar-label"><span>Grade 4.5 (Very Good)</span><span>42%</span></div><div className="grade-bar"><div className="grade-fill" style={{width: '42%'}}></div></div></div>
            <div className="grade-bar-row"><div className="grade-bar-label"><span>Grade 4 (Good)</span><span>22%</span></div><div className="grade-bar"><div className="grade-fill" style={{width: '22%'}}></div></div></div>
            <div className="grade-bar-row"><div className="grade-bar-label"><span>Grade 3.5 &amp; Below</span><span>8%</span></div><div className="grade-bar"><div className="grade-fill" style={{width: '8%'}}></div></div></div>
            <div style={{marginTop: '18px', padding: '13px', background: 'rgba(201,168,76,.06)', border: '1px solid rgba(201,168,76,.15)', borderRadius: '10px'}}>
              <div style={{fontSize: '.76rem', color: 'var(--gray)', marginBottom: '6px'}}>What our grades mean:</div>
              <div style={{fontSize: '.81rem', lineHeight: '1.8', color: 'var(--white)'}}>
                <span style={{color: 'var(--gold)', fontWeight: '600'}}>Grade 5:</span> Like new, no visible defects<br />
                <span style={{color: 'var(--gold)', fontWeight: '600'}}>Grade 4-4.5:</span> Excellent condition, minor wear<br />
                <span style={{color: 'var(--gold)', fontWeight: '600'}}>Grade 3-3.5:</span> Good condition, normal use marks
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section style={{background: 'var(--black)'}}>
    <div className="container">
      <div className="section-header" style={{textAlign: 'center', marginBottom: '46px'}} data-aos="fade-up">
        <div className="section-tag">Documentation</div>
        <h2 className="section-title">Documents <span className="gold">You Receive</span></h2>
        <div className="gold-line" style={{margin: '16px auto 0'}}></div>
        <p className="section-desc" style={{margin: '16px auto 0'}}>Complete documentation is standard with every export. No extras, no surprises.</p>
      </div>
      <div className="doc-list">
        <div className="doc-item" data-aos="fade-up" data-aos-delay="0"><div className="doc-icon"><i className="fas fa-file-alt"></i></div><div><div className="doc-name">Export Certificate (Sakujo)</div><div className="doc-note">Japanese de-registration confirmation</div></div></div>
        <div className="doc-item" data-aos="fade-up" data-aos-delay="60"><div className="doc-icon"><i className="fas fa-ship"></i></div><div><div className="doc-name">Bill of Lading (BL)</div><div className="doc-note">Shipping contract &amp; ownership transfer</div></div></div>
        <div className="doc-item" data-aos="fade-up" data-aos-delay="120"><div className="doc-icon"><i className="fas fa-receipt"></i></div><div><div className="doc-name">Commercial Invoice</div><div className="doc-note">For customs clearance in your country</div></div></div>
        <div className="doc-item" data-aos="fade-up" data-aos-delay="180"><div className="doc-icon"><i className="fas fa-box"></i></div><div><div className="doc-name">Packing List</div><div className="doc-note">Container contents declaration</div></div></div>
        <div className="doc-item" data-aos="fade-up" data-aos-delay="240"><div className="doc-icon"><i className="fas fa-clipboard-check"></i></div><div><div className="doc-name">Inspection Report</div><div className="doc-note">JAAI graded vehicle assessment</div></div></div>
        <div className="doc-item" data-aos="fade-up" data-aos-delay="300"><div className="doc-icon"><i className="fas fa-tachometer-alt"></i></div><div><div className="doc-name">Odometer Declaration</div><div className="doc-note">Certified mileage confirmation</div></div></div>
        <div className="doc-item" data-aos="fade-up" data-aos-delay="360"><div className="doc-icon"><i className="fas fa-shield-alt"></i></div><div><div className="doc-name">Insurance Certificate</div><div className="doc-note">Marine cargo insurance (on request)</div></div></div>
        <div className="doc-item" data-aos="fade-up" data-aos-delay="420"><div className="doc-icon"><i className="fas fa-camera"></i></div><div><div className="doc-name">Pre-Shipment Photos</div><div className="doc-note">Full condition photo set before loading</div></div></div>
      </div>
    </div>
  </section>

  <section style={{background: 'var(--dark)'}}>
    <div className="container">
      <div className="section-header" style={{textAlign: 'center', marginBottom: '46px'}} data-aos="fade-up">
        <div className="section-tag">Our Commitment</div>
        <h2 className="section-title">The <span className="gold">BBA Guarantee</span></h2>
        <div className="gold-line" style={{margin: '16px auto 0'}}></div>
      </div>
      <div className="guarantees-grid">
        <div className="guarantee-card" data-aos="fade-up" data-aos-delay="0"><div className="guarantee-icon"><i className="fas fa-shield-alt"></i></div><div className="guarantee-title">Verified Stock Promise</div><div className="guarantee-desc">Every listed vehicle is physically located in Japan and available. No phantom listings, ever.</div></div>
        <div className="guarantee-card" data-aos="fade-up" data-aos-delay="80"><div className="guarantee-icon"><i className="fas fa-lock"></i></div><div className="guarantee-title">Deposit Protection</div><div className="guarantee-desc">Your deposit is fully refundable if the vehicle doesn't match its described condition at the point of sale.</div></div>
        <div className="guarantee-card" data-aos="fade-up" data-aos-delay="160"><div className="guarantee-icon"><i className="fas fa-shipping-fast"></i></div><div className="guarantee-title">On-Time Shipping</div><div className="guarantee-desc">95%+ of our shipments depart on the agreed ETD. We communicate proactively if any delay occurs.</div></div>
        <div className="guarantee-card" data-aos="fade-up" data-aos-delay="240"><div className="guarantee-icon"><i className="fas fa-headset"></i></div><div className="guarantee-title">24/7 Post-Sale Support</div><div className="guarantee-desc">Our team doesn't disappear after you pay. We support you through customs clearance and beyond.</div></div>
      </div>
    </div>
  </section>

</div>


<section style={{padding: '56px 4%', background: 'var(--black)'}}>
  <div className="container">
    <div className="glass-banner" data-aos="zoom-in">
      <h2>Ready to Import Your <span style={{background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Dream Car?</span></h2>
      <p>Join 85,000+ satisfied customers who trust BestBuy Auto Japan for their vehicle imports</p>
      <div className="glass-banner-btns">
        <a href="/#inventory" className="btn-primary"><i className="fas fa-car"></i> Browse Inventory</a>
        <a href="/#contact" className="btn-outline"><i className="fas fa-envelope"></i> Contact Our Team</a>
      </div>
    </div>
  </div>
</section>




<div className="float-group">
  <a className="float-btn float-wa" href="https://wa.me/8190XXXXXXXX?text=Hi%2C%20I'm%20interested%20in%20a%20car%20from%20BestBuy%20Auto" target="_blank">
    <i className="fab fa-whatsapp"></i>
  </a>
</div>


    </>
  );
}
