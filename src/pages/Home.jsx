import { useEffect } from "react";
import { initHomePage } from "./scripts/homeScript";
import "../styles/home.css";
import HomeDiscoverySections from "../components/HomeDiscoverySections";
import HomeFaqSection from "../components/HomeFaqSection";
import FeaturedCarsSection from "../components/FeaturedCarsSection";
import HomeBannerSlider from "../components/HomeBannerSlider";
import HeroSearch from "../components/HeroSearch";
import HomeGallerySection from "../components/HomeGallerySection";
import { useSiteSettings } from "../lib/siteSettings";
export default function Home() {
  useEffect(() => {
    const cleanup = initHomePage();
    return cleanup;
  }, []);

  return (
    <>
<HomeBannerSlider />
<HeroSearch />
<div className="marquee-section">
  <div className="marquee-track" id="marqueeTrack">
    <div className="marquee-item"><i className="fas fa-car"></i> Toyota</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Nissan</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Honda</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Mitsubishi</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Mazda</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Subaru</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Mercedes</div>
    <div className="marquee-item"><i className="fas fa-car"></i> BMW</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Isuzu</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Audi</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Land Rover</div>
    
    <div className="marquee-item"><i className="fas fa-car"></i> Toyota</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Nissan</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Honda</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Mitsubishi</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Mazda</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Subaru</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Mercedes</div>
    <div className="marquee-item"><i className="fas fa-car"></i> BMW</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Isuzu</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Audi</div>
    <div className="marquee-item"><i className="fas fa-car"></i> Land Rover</div>
  </div>
</div>


<FeaturedCarsSection />
<HomeDiscoverySections />



<div id="recently" style={{display: 'none'}}>
  <div className="container">
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px'}}>
      <h3 style={{fontSize: '1.1rem', fontWeight: '700'}}>🕐 Recently Viewed</h3>
      <button onClick={() => { clearRecent() }} style={{background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer', fontSize: '.82rem'}}>Clear All</button>
    </div>
    <div className="recent-row" id="recentRow"></div>
  </div>
</div>

<section id="shipping">
  <div className="container">
    <div className="section-header" data-aos="fade-up">
      <div className="section-tag">Export Process</div>
      <h2 className="section-title">Container <span className="gold">Shipping</span></h2>
      <div className="gold-line"></div>
      <p className="section-desc" style={{marginTop: '16px'}}>From Japan to your country — transparent, reliable, end-to-end</p>
    </div>
    <div className="process-steps-grid">
      <div className="step-card" data-aos="fade-up" data-aos-delay="0">
        <div className="step-num">1</div>
        <div className="step-content">
          <h4>Select Your Vehicle</h4>
          <p>Browse our inventory, choose your car and request a quote.</p>
        </div>
      </div>
      <div className="step-card" data-aos="fade-up" data-aos-delay="80">
        <div className="step-num">2</div>
        <div className="step-content">
          <h4>Negotiate the Price</h4>
          <p>Talk directly with our team — we believe in fair deals and the best price.</p>
        </div>
      </div>
      <div className="step-card" data-aos="fade-up" data-aos-delay="0">
        <div className="step-num">3</div>
        <div className="step-content">
          <h4>Payment &amp; Invoice</h4>
          <p>Secure your purchase via Bank Transfer or LC. We issue a formal commercial invoice.</p>
        </div>
      </div>
      <div className="step-card" data-aos="fade-up" data-aos-delay="80">
        <div className="step-num">4</div>
        <div className="step-content">
          <h4>Vehicle Preparation</h4>
          <p>Deregistration, inspection, cleaning, and container loading at Japanese port.</p>
        </div>
      </div>
      <div className="step-card" data-aos="fade-up" data-aos-delay="0">
        <div className="step-num">5</div>
        <div className="step-content">
          <h4>Pre-Shipment Photos</h4>
          <p>Full condition photo set and inspection report shared before your car is loaded.</p>
        </div>
      </div>
      <div className="step-card" data-aos="fade-up" data-aos-delay="80">
        <div className="step-num">6</div>
        <div className="step-content">
          <h4>Shipping &amp; Tracking</h4>
          <p>Your vehicle sets sail. We provide container tracking and ETD/ETA updates.</p>
        </div>
      </div>
      <div className="step-card" data-aos="fade-up" data-aos-delay="0">
        <div className="step-num">7</div>
        <div className="step-content">
          <h4>Customs Clearance</h4>
          <p>We provide all export certificates, BL, and customs docs for smooth clearance.</p>
        </div>
      </div>
      <div className="step-card" data-aos="fade-up" data-aos-delay="80">
        <div className="step-num">8</div>
        <div className="step-content">
          <h4>Delivery to You 🎉</h4>
          <p>Collect your car at port or request door delivery. Drive your dream!</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="payment">
  <div className="container">
    <div className="section-header" data-aos="fade-up">
      <div className="section-tag">Payment Options</div>
      <h2 className="section-title">Secure <span className="gold">Payment Methods</span></h2>
      <div className="gold-line"></div>
    </div>
    <div className="payment-grid">
      <div className="payment-card" data-aos="fade-up" data-aos-delay="0">
        <div className="payment-icon"><i className="fas fa-university"></i></div>
        <div className="payment-name">Bank Transfer (T/T)</div>
        <div className="payment-desc">Direct telegraphic transfer to our Japanese bank account. Fast, secure, and widely accepted for vehicle purchases worldwide.</div>
        <div style={{marginTop: '16px', fontSize: '.8rem', color: 'var(--gold)'}}><i className="fas fa-check-circle" style={{marginRight: '6px'}}></i>Most Popular Method</div>
      </div>
      <div className="payment-card" data-aos="fade-up" data-aos-delay="160">
        <div className="payment-icon"><i className="fas fa-credit-card"></i></div>
        <div className="payment-name">Online Payment</div>
        <div className="payment-desc">Pay securely via credit/debit card or PayPal for deposits and small transactions. Instant confirmation.</div>
        <div style={{marginTop: '16px', fontSize: '.8rem', color: 'var(--gold)'}}><i className="fas fa-check-circle" style={{marginRight: '6px'}}></i>Quick & Convenient</div>
      </div>
      <div className="payment-card" data-aos="fade-up" data-aos-delay="240">
        <div className="payment-icon"><i className="fas fa-file-contract"></i></div>
        <div className="payment-name">Request Invoice</div>
        <div className="payment-desc">Get a formal proforma invoice with complete vehicle details, FOB price, and payment instructions for your records.</div>
        <div style={{marginTop: '16px', fontSize: '.8rem', color: 'var(--gold)'}}><i className="fas fa-check-circle" style={{marginRight: '6px'}}></i>Full Documentation</div>
      </div>
    </div>
  </div>
</section>


<div className="glass-banner" data-aos="zoom-in" style={{marginBottom: '0'}}>
  <h2>Ready to Import Your <span style={{background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Dream Car?</span></h2>
  <p>Join 50,000+ satisfied customers who trust BestBuy Auto for their vehicle imports</p>
  <div className="glass-banner-btns">
    <a href="#inventory" className="btn-hero-primary"><i className="fas fa-car"></i> Browse Inventory</a>
    <button className="btn-hero-secondary" onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal'))}><i className="fas fa-user-plus"></i> Create Account</button>
  </div>
</div>




<HomeFaqSection />
<HomeGallerySection />




<section id="why">
  <div className="container">
    <div className="section-header" data-aos="fade-up">
      <div className="section-tag">Why BestBuy Auto</div>
      <h2 className="section-title">The <span className="gold">Gold Standard</span> in Export</h2>
      <div className="gold-line"></div>
    </div>
    <div className="why-grid">
      <div className="why-card" data-aos="fade-up" data-aos-delay="0">
        <div className="why-icon"><i className="fas fa-shield-alt"></i></div>
        <div className="why-title">100% Verified Stock</div>
        <div className="why-desc">All vehicles are physically inspected and verified before listing. No surprises on delivery.</div>
      </div>
      <div className="why-card" data-aos="fade-up" data-aos-delay="80">
        <div className="why-icon"><i className="fas fa-globe"></i></div>
        <div className="why-title">Global Export Network</div>
        <div className="why-desc">Shipping to 120+ countries. Experienced freight partners ensure safe and timely delivery.</div>
      </div>
      <div className="why-card" data-aos="fade-up" data-aos-delay="160">
        <div className="why-icon"><i className="fas fa-handshake"></i></div>
        <div className="why-title">Price Negotiation</div>
        <div className="why-desc">We believe in fair deals. Negotiate directly with our team for the best price.</div>
      </div>
      <div className="why-card" data-aos="fade-up" data-aos-delay="240">
        <div className="why-icon"><i className="fas fa-file-alt"></i></div>
        <div className="why-title">Full Documentation</div>
        <div className="why-desc">Export certificates, de-registration, customs docs — we handle everything end-to-end.</div>
      </div>
      <div className="why-card" data-aos="fade-up" data-aos-delay="320">
        <div className="why-icon"><i className="fas fa-headset"></i></div>
        <div className="why-title">24/7 Support</div>
        <div className="why-desc">Our support team is always online via WeTalk, WhatsApp, and email around the clock.</div>
      </div>
      <div className="why-card" data-aos="fade-up" data-aos-delay="400">
        <div className="why-icon"><i className="fas fa-lock"></i></div>
        <div className="why-title">Secure Payment</div>
        <div className="why-desc">Bank transfer, LC, and online payment options — all transactions are fully secured.</div>
      </div>
    </div>
  </div>
</section>
<div className="float-group">
  
  <a className="float-btn float-wa" href="https://wa.me/8190XXXXXXXX?text=Hi%2C%20I'm%20interested%20in%20a%20car%20from%20BestBuy%20Auto%2C%20please%20share%20details" target="_blank" rel="noreferrer">
     
    <span className="float-label">WhatsApp Us</span>
    <i className="fab fa-whatsapp"></i>
    
  </a>

</div>


<div className="wetalk-panel" id="wetalkPanel">
  <div className="wetalk-header">
    <div className="wetalk-avatar">🎧</div>
    <div>
      <div className="wetalk-name">BestBuy Auto Support</div>
      <div className="wetalk-status"><span className="status-dot"></span> Online – 24/7 Support</div>
    </div>
    <button className="wetalk-close-btn" onClick={() => { toggleWeTalk() }}><i className="fas fa-times"></i></button>
  </div>
  <div className="wetalk-messages" id="wetalkMessages">
    <div className="msg bot">
      Hello! Welcome to BestBuy Auto 👋 How can we help you?
      <div className="msg-time">Just now</div>
    </div>
    <div className="msg bot">
      Feel free to ask about any vehicle, shipping quotes, or payment options!
      <div className="msg-time">Just now</div>
    </div>
  </div>
  <div className="wetalk-input-row">
    <input className="wetalk-input" id="wetalkInput" placeholder="Type your message…" onKeyDown={() => { if(event.key==='Enter')sendWeTalk() }} />
    <button className="wetalk-send" onClick={() => { sendWeTalk() }}><i className="fas fa-paper-plane"></i></button>
  </div>
</div>


<div className="modal-overlay" id="carModal">
  <div className="modal" id="carModalContent">
    <div className="modal-header">
      <div className="modal-title" id="modalCarName">Car Name</div>
      <button className="modal-close" onClick={() => { closeModal('carModal') }}><i className="fas fa-times"></i></button>
    </div>
    <div className="modal-body" id="modalBody"></div>
  </div>
</div>


<div className="modal-overlay" id="negoModal">
  <div className="modal" style={{maxWidth: '500px'}}>
    <div className="modal-header">
      <div className="modal-title">💬 Negotiate Price</div>
      <button className="modal-close" onClick={() => { closeModal('negoModal') }}><i className="fas fa-times"></i></button>
    </div>
    <div className="modal-body">
      <p style={{color: 'var(--gray)', marginBottom: '24px', fontSize: '.9rem'}}>Submit your desired price and our team will respond within 24 hours.</p>
      <input type="hidden" id="negoCarName" />
      <div className="form-group">
        <label className="form-label">Car</label>
        <input className="form-input" id="negoCarDisplay" readOnly style={{background: 'var(--dark3)'}} />
      </div>
      <div className="form-group">
        <label className="form-label">Listed Price</label>
        <input className="form-input" id="negoListedPrice" readOnly style={{background: 'var(--dark3)', color: 'var(--gold)'}} />
      </div>
      <div className="form-group">
        <label className="form-label">Your Desired Price (USD)</label>
        <input className="form-input" type="number" id="negoPrice" placeholder="Enter your offer price" />
      </div>
      <div className="form-group">
        <label className="form-label">Your Name</label>
        <input className="form-input" type="text" id="negoName" placeholder="Full name" />
      </div>
      <div className="form-group">
        <label className="form-label">Your Email</label>
        <input className="form-input" type="email" id="negoEmail" placeholder="your@email.com" />
      </div>
      <div className="form-group">
        <label className="form-label">Message (optional)</label>
        <textarea className="form-textarea" id="negoMsg" placeholder="Any specific requirements or comments…" style={{minHeight: '80px'}}></textarea>
      </div>
      <button className="btn-submit" onClick={() => { submitNego() }}>
        <i className="fas fa-paper-plane"></i> Submit Offer
      </button>
    </div>
  </div>
</div>


<div className="modal-overlay" id="payModal">
  <div className="modal" style={{maxWidth: '500px'}}>
    <div className="modal-header">
      <div className="modal-title">💳 Purchase / Request Invoice</div>
      <button className="modal-close" onClick={() => { closeModal('payModal') }}><i className="fas fa-times"></i></button>
    </div>
    <div className="modal-body">
      <div style={{background: 'linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.03))', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '12px', padding: '16px', marginBottom: '24px'}}>
        <div style={{fontSize: '.78rem', color: 'var(--gray)'}}>Vehicle</div>
        <div style={{fontWeight: '700', marginBottom: '6px'}} id="payCarName">—</div>
        <div style={{fontFamily: '\'Orbitron\',sans-serif', fontSize: '1.3rem', color: 'var(--gold)'}} id="payCarPrice">—</div>
      </div>
      <div className="form-group">
        <label className="form-label">Payment Method</label>
        <select className="form-input" id="payMethod">
          <option>Bank Transfer (T/T)</option>
          <option>Letter of Credit (LC)</option>
          <option>Online Payment (Card)</option>
          <option>Request Invoice Only</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input className="form-input" type="text" placeholder="As per ID / passport" />
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input className="form-input" type="email" placeholder="your@email.com" />
      </div>
      <div className="form-group">
        <label className="form-label">Country</label>
        <select className="form-input">
          <option>Select country…</option>
          <option>Tanzania</option><option>Kenya</option><option>Nigeria</option>
          <option>UAE</option><option>Saudi Arabia</option><option>Sri Lanka</option>
          <option>New Zealand</option><option>Australia</option><option>UK</option>
          <option>USA</option><option>Other</option>
        </select>
      </div>
      <button className="btn-submit" onClick={() => { submitPayment() }}>
        <i className="fas fa-lock"></i> Confirm & Proceed
      </button>
    </div>
  </div>
</div>


<div className="modal-overlay" id="compareModal">
  <div className="modal" style={{maxWidth: '900px'}}>
    <div className="modal-header">
      <div className="modal-title">⚖️ Compare Cars</div>
      <button className="modal-close" onClick={() => { closeModal('compareModal') }}><i className="fas fa-times"></i></button>
    </div>
    <div className="modal-body" id="compareBody"></div>
  </div>
</div>




<div id="compareBar">
  <div style={{fontWeight: '700', color: 'var(--gold)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px'}}>
    <i className="fas fa-balance-scale"></i> Compare:
  </div>
  <div className="compare-items" id="compareItemsBar"></div>
  <button className="btn-do-compare" onClick={() => { doCompare() }}>Compare Now</button>
  <button onClick={() => { clearCompare() }} style={{background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer', fontSize: '.9rem', padding: '8px'}}>
    <i className="fas fa-times"></i>
  </button>
</div>
    </>
  );
}
