import { useEffect } from "react";
import { Link } from "react-router-dom";
import { initPartnersPage } from "./scripts/ourPartnersScript";
import PartnersGrid from "../components/PartnersGrid";
import "../styles/ourpartners.css";

export default function OurPartners() {
  useEffect(() => {
    const cleanup = initPartnersPage();
    return cleanup;
  }, []);

  return (
    <>
<div className="page-hero">
  <div className="hero-inner">
    <div className="page-badge" data-aos="fade-down"><span></span> Trusted Worldwide Network</div>
    <h1 data-aos="fade-up" data-aos-delay="100">Our Global <span className="gold">Partner</span><br />Network</h1>
    <p data-aos="fade-up" data-aos-delay="200">Behind every smooth transaction at BestBuy Auto is a carefully vetted network of global partners — shipping lines, inspection agencies, banks, and clearing agents — who make it all possible.</p>
    <div className="breadcrumb" data-aos="fade-up" data-aos-delay="280">
      <Link to="/">Home</Link><i className="fas fa-chevron-right"></i>
      <span style={{color: 'var(--gold)'}}>Our Partners</span>
    </div>
  </div>
</div>


<div className="partners-stats">
  <div className="container">
    <div className="ps-grid">
      <div className="ps-item" data-aos="fade-up"><div className="ps-num" id="p1">0</div><div className="ps-lbl">Global Partners</div></div>
      <div className="ps-item" data-aos="fade-up" data-aos-delay="80"><div className="ps-num" id="p2">0</div><div className="ps-lbl">Shipping Lines</div></div>
      <div className="ps-item" data-aos="fade-up" data-aos-delay="160"><div className="ps-num" id="p3">0</div><div className="ps-lbl">Countries with Agents</div></div>
      <div className="ps-item" data-aos="fade-up" data-aos-delay="240"><div className="ps-num" id="p4">0</div><div className="ps-lbl">Banking Partners</div></div>
    </div>
  </div>
</div>


<div className="types-section">
  <div className="container">
    <div className="section-header" data-aos="fade-up">
      <div className="section-tag">Partnership Categories</div>
      <h2 className="section-title">The Pillars of Our <span className="gold">Network</span></h2>
      <div className="gold-line"></div>
      <p className="section-desc" style={{marginTop: '16px'}}>Every partner category plays a critical role in delivering your vehicle safely, on time, and with full documentation.</p>
    </div>
    <div className="types-grid">
      <div className="type-card" data-aos="fade-up" data-aos-delay="0">
        <div className="type-icon"><i className="fas fa-ship"></i></div>
        <div className="type-content"><h4>Shipping &amp; Freight Partners</h4><p>We partner with world-class shipping lines and RO-RO operators to transport your vehicle across oceans. Our freight partners provide containerized and RO-RO shipping from Yokohama, Nagoya, and Osaka ports to 120+ destinations.</p></div>
      </div>
      <div className="type-card" data-aos="fade-up" data-aos-delay="80">
        <div className="type-icon"><i className="fas fa-search-dollar"></i></div>
        <div className="type-content"><h4>Vehicle Inspection Agencies</h4><p>Independent third-party inspection agencies verify every vehicle before export. Their certified reports give buyers confidence in the condition, mileage, and authenticity of the vehicle they're purchasing from thousands of miles away.</p></div>
      </div>
      <div className="type-card" data-aos="fade-up" data-aos-delay="160">
        <div className="type-icon"><i className="fas fa-university"></i></div>
        <div className="type-content"><h4>Banking &amp; Finance Partners</h4><p>Our banking relationships span Japan, UAE, UK, and East Africa, enabling seamless T/T transfers, Letter of Credit processing, and multi-currency transactions. All payments are processed through licensed financial institutions.</p></div>
      </div>
      <div className="type-card" data-aos="fade-up" data-aos-delay="240">
        <div className="type-icon"><i className="fas fa-file-import"></i></div>
        <div className="type-content"><h4>Customs Clearing Agents</h4><p>In 40+ countries, we have trusted clearing agents who handle import documentation, port fees, and local registration requirements on your behalf. These local experts eliminate stress and delays at your destination port.</p></div>
      </div>
    </div>
  </div>
</div>


<section className="section" style={{background: 'var(--black)'}}>
  <div className="container">
    <div className="section-header" data-aos="fade-up">
      <div className="section-tag">Featured Partners</div>
      <h2 className="section-title">Who We <span className="gold">Work With</span></h2>
      <div className="gold-line"></div>
    </div>
   <PartnersGrid />
  </div>
</section>




<div className="logos-section">
  <div className="container">
    <div className="logos-title">Our Extended Partner Ecosystem</div>
    <div style={{overflow: 'hidden'}}>
      <div className="logos-track">
        <div className="logo-chip"><i className="fas fa-ship"></i> MOL Shipping</div>
        <div className="logo-chip"><i className="fas fa-anchor"></i> NYK Line</div>
        <div className="logo-chip"><i className="fas fa-award"></i> SGS Japan</div>
        <div className="logo-chip"><i className="fas fa-landmark"></i> MUFG Bank</div>
        <div className="logo-chip"><i className="fas fa-globe-asia"></i> JAAI</div>
        <div className="logo-chip"><i className="fas fa-shipping-fast"></i> K Line</div>
        <div className="logo-chip"><i className="fas fa-university"></i> Emirates NBD</div>
        <div className="logo-chip"><i className="fas fa-file-import"></i> TanzaClear</div>
        <div className="logo-chip"><i className="fas fa-file-contract"></i> Pacific Auto Imports</div>
        <div className="logo-chip"><i className="fas fa-shield-alt"></i> JEVIC Inspection</div>
        <div className="logo-chip"><i className="fas fa-ship"></i> MOL Shipping</div>
        <div className="logo-chip"><i className="fas fa-anchor"></i> NYK Line</div>
        <div className="logo-chip"><i className="fas fa-award"></i> SGS Japan</div>
        <div className="logo-chip"><i className="fas fa-landmark"></i> MUFG Bank</div>
        <div className="logo-chip"><i className="fas fa-globe-asia"></i> JAAI</div>
        <div className="logo-chip"><i className="fas fa-shipping-fast"></i> K Line</div>
        <div className="logo-chip"><i className="fas fa-university"></i> Emirates NBD</div>
        <div className="logo-chip"><i className="fas fa-file-import"></i> TanzaClear</div>
        <div className="logo-chip"><i className="fas fa-file-contract"></i> Pacific Auto Imports</div>
        <div className="logo-chip"><i className="fas fa-shield-alt"></i> JEVIC Inspection</div>
      </div>
    </div>
  </div>
</div>


<div className="become-section">
  <div className="container">
    <div className="become-grid">
      <div className="become-visual" data-aos="fade-up">
        <span className="become-icon-big">🤝</span>
        <h3>Join Our Partner Network</h3>
        <p>We're always looking for reliable, professional partners who share our commitment to quality and customer satisfaction.</p>
        <div className="benefit-list">
          <div className="benefit-item"><div className="benefit-dot"></div><span>Access to 1,200+ annual shipments</span></div>
          <div className="benefit-item"><div className="benefit-dot"></div><span>Listed on our website for customer referrals</span></div>
          <div className="benefit-item"><div className="benefit-dot"></div><span>Co-marketing opportunities</span></div>
          <div className="benefit-item"><div className="benefit-dot"></div><span>Dedicated partner account manager</span></div>
          <div className="benefit-item"><div className="benefit-dot"></div><span>Priority support and fast communication</span></div>
        </div>
      </div>
      <div className="become-form-wrap" data-aos="fade-up" data-aos-delay="80">
        <h2>Become a <span className="gold">Partner</span></h2>
        <p>Submit your partnership inquiry below. Our team responds within 2 business days.</p>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Company Name</label><input className="form-input" type="text" placeholder="Your company name" id="pCompany" /></div>
          <div className="form-group"><label className="form-label">Country</label><input className="form-input" type="text" placeholder="Operating country" id="pCountry" /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Contact Name</label><input className="form-input" type="text" placeholder="Your full name" id="pName" /></div>
          <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="business@email.com" id="pEmail" /></div>
        </div>
        <div className="form-group"><label className="form-label">Partnership Type</label>
          <select className="form-input form-select-f" id="pType">
            <option>Shipping / Freight</option><option>Vehicle Inspection</option>
            <option>Customs Clearing Agent</option><option>Banking / Finance</option>
            <option>Local Distributor</option><option>Other</option>
          </select>
        </div>
        <div className="form-group"><label className="form-label">Brief Description</label><textarea className="form-textarea form-input" id="pMsg" placeholder="Tell us about your company and how you'd like to partner with BBA Japan…"></textarea></div>
        <button className="btn-submit" onClick={() => window.submitPartner()}><i className="fas fa-paper-plane"></i> Submit Partnership Inquiry</button>
      </div>
    </div>
  </div>
</div>


<div className="cta-section">
  <div className="container">
    <h2 data-aos="fade-up">Ready to Import with <span className="gold">Confidence?</span></h2>
    <p data-aos="fade-up" data-aos-delay="80">Our partner network is the backbone of every successful delivery. Browse our cars and experience the BBA difference.</p>
    <div className="cta-btns" data-aos="fade-up" data-aos-delay="160">
     <Link className="btn-primary" to="/stock-cars"><i className="fas fa-car"></i> Browse Inventory</Link>
      <Link to="/our-company" className="btn-outline-gold"><i className="fas fa-building"></i> About Our Company</Link>
    </div>
  </div>
</div>




<div className="float-group">
  <a className="float-btn float-wa" href="https://wa.me/818083434841" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i></a>
</div>
    </>
  );
}
