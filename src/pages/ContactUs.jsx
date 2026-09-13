import { useEffect } from "react";
import { initContactPage } from "./scripts/contactScript";
import "../styles/contact-us.css";

export default function ContactUs() {
  useEffect(() => {
    const cleanup = initContactPage();
    return cleanup;
  }, []);

  return (
    <>
<section className="contact-hero">
  <div className="hero-bg">

  </div>

  <div className="hero-content" data-aos="fade-up">
    <h1 className="hero-title">
      We're Here to <span className="accent">Help You</span><br />
      Import Your Dream
    </h1>
    <p className="hero-desc">
      Whether you're buying your first Japanese car or managing a fleet order — our team is ready.
    </p>
    <div className="hero-contact-pills">
      <div className="contact-pill">
        <div className="pill-icon"><i className="fas fa-envelope"></i></div>
        <div>
          <div className="pill-label">Email Us</div>
          <div className="pill-value"><a href="mailto:info@bbajapan.com">info@bbajapan.com</a></div>
        </div>
      </div>
      <div className="contact-pill">
        <div className="pill-icon"><i className="fab fa-whatsapp"></i></div>
        <div>
          <div className="pill-label">WhatsApp</div>
          <div className="pill-value">+81 80-8343-4841 &nbsp;·&nbsp; +1 786-216-0122</div>
        </div>
      </div>
      <div className="contact-pill">
        <div className="pill-icon"><i className="fas fa-clock"></i></div>
        <div>
          <div className="pill-label">Response Time</div>
          <div className="pill-value">Within 24 hours · Mon–Sat</div>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="contact-main" id="contactForm">
  <div className="contact-grid">

    
    <div className="info-panel" data-aos="fade-right">
      <div className="info-tag">Our Offices</div>
      <h2 className="info-title">Find Us <span className="g">Worldwide</span></h2>
      <div className="gold-bar"></div>
      <p className="info-desc">BBA Japan operates globally with dedicated teams across three regions. No matter where you are, we have someone nearby to support your vehicle import journey.</p>
      <div className="office-cards">
        <div className="office-card">
          <div className="oc-icon"><i className="fas fa-map-marker-alt"></i></div>
          <div>
            <div className="oc-flag">🇯🇵 BBA Japan</div>
            <div className="oc-name">Headquarters — Aichi, Japan</div>
            <div className="oc-detail">507-20 Shinpo-machi, Tokai-shi, Aichi Prefecture,<br /> Aichi-gun, Aichi, Japan, 476-0005<br />Tel/Whatsapp: +81 80-8343-4841</div>
          </div>
        </div>
        <div className="office-card">
          <div className="oc-icon"><i className="fas fa-map-marker-alt"></i></div>
          <div>
            <div className="oc-flag">🇺🇸 BBA Japan — USA</div>
            <div className="oc-detail">19038 SE 15th Ln Silver Springs Florida,<br /> United States of America, 34488<br /> Tel/Whatsapp: +1 786-216-0122</div>
          </div>
        </div>
      </div>
      <p style={{fontSize: '.72rem', color: 'var(--gray)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px'}}>Follow Us</p>
      <div className="social-strip">
        <a href="https://www.facebook.com/NO1BESTBUYAUTO/" className="soc-btn" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i> Facebook</a>
        <a href="https://www.instagram.com/no1bestbuyauto" className="soc-btn" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i> Instagram</a>
        <a href="https://whatsapp.com/channel/0029VbBuIAFDjiOaNllfrx3w" className="soc-btn" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i> WhatsApp Channel</a>
      </div>
    </div>

    
    <div className="form-panel" data-aos="fade-left" id="formWrap">
      <div id="theForm">
        <h2 className="form-title">Send Us an Inquiry</h2>
        <p className="form-subtitle">Fill in the details below and our team will respond within 24 hours. All fields marked <span style={{color: 'var(--gold)'}}>*</span> are required.</p>

        <p style={{fontSize: '.72rem', fontWeight: '600', color: 'var(--gray-light)', letterSpacing: '.8px', textTransform: 'uppercase', marginBottom: '10px'}}>Inquiry Type <span style={{color: 'var(--gold)'}}>*</span></p>
        <div className="inquiry-row" id="inquiryRow">
          <button type="button" className="inq-btn active" data-type="Stock Car">
            <span className="inq-icon">🚗</span><span className="inq-label">Stock Car</span>
          </button>
          <button type="button" className="inq-btn" data-type="Auction Car">
            <span className="inq-icon">🔨</span><span className="inq-label">Auction</span>
          </button>
          <button type="button" className="inq-btn" data-type="Shipping Info">
            <span className="inq-icon">🚢</span><span className="inq-label">Shipping</span>
          </button>
          <button type="button" className="inq-btn" data-type="Payment">
            <span className="inq-icon">💳</span><span className="inq-label">Payment</span>
          </button>
          <button type="button" className="inq-btn" data-type="Complaint">
            <span className="inq-icon">🛠️</span><span className="inq-label">Complaint</span>
          </button>
          <button type="button" className="inq-btn" data-type="Other">
            <span className="inq-icon">💬</span><span className="inq-label">Other</span>
          </button>
          <button type="button" className="inq-btn" data-type="Customer Support">
            <span className="inq-icon">🎧</span><span className="inq-label">Customer Support</span>
          </button>
        </div>

        <div className="form-row">
          <div>
            <label className="f-label"><i className="fas fa-user"></i> Full Name <span className="req">*</span></label>
            <input className="f-input" type="text" id="fName" placeholder="John Smith" maxLength="80" />
          </div>
          <div>
            <label className="f-label"><i className="fas fa-envelope"></i> Email Address <span className="req">*</span></label>
            <input className="f-input" type="email" id="fEmail" placeholder="your@email.com" />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label className="f-label"><i className="fas fa-phone"></i> Phone / WhatsApp</label>
            <input className="f-input" type="tel" id="fPhone" placeholder="+1 234 567 8900" />
          </div>
          <div>
            <label className="f-label"><i className="fas fa-globe"></i> Country <span className="req">*</span></label>
            <select className="f-input" id="fCountry">
              <option value="">Select your country…</option>
              <optgroup label="Africa">
                <option>Tanzania</option><option>Kenya</option><option>Uganda</option>
                <option>Nigeria</option><option>Ghana</option><option>South Africa</option>
                <option>Zimbabwe</option><option>Zambia</option><option>Ethiopia</option>
                <option>Rwanda</option><option>Mozambique</option>
              </optgroup>
              <optgroup label="Middle East">
                <option>UAE</option><option>Saudi Arabia</option><option>Qatar</option>
                <option>Kuwait</option><option>Bahrain</option><option>Oman</option>
                <option>Jordan</option><option>Iraq</option>
              </optgroup>
              <optgroup label="South Asia">
                <option>Pakistan</option><option>Bangladesh</option><option>Sri Lanka</option>
                <option>Nepal</option>
              </optgroup>
              <optgroup label="Oceania">
                <option>New Zealand</option><option>Australia</option><option>Fiji</option>
              </optgroup>
              <optgroup label="Europe &amp; Americas">
                <option>United Kingdom</option><option>USA</option><option>Canada</option>
                <option>Germany</option><option>France</option>
              </optgroup>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row" id="carFields">
          <div>
            <label className="f-label"><i className="fas fa-car"></i> Car Make / Model</label>
            <input className="f-input" type="text" id="fCar" placeholder="e.g. Toyota Land Cruiser 200" />
          </div>
          <div>
            <label className="f-label"><i className="fas fa-dollar-sign"></i> Budget (USD)</label>
            <select className="f-input" id="fBudget">
              <option value="">Select budget range…</option>
              <option>Under $5,000</option>
              <option>$5,000 – $10,000</option>
              <option>$10,000 – $20,000</option>
              <option>$20,000 – $35,000</option>
              <option>$35,000 – $60,000</option>
              <option>Above $60,000</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="f-label"><i className="fas fa-comment-dots"></i> Your Message <span className="req">*</span></label>
          <textarea className="f-input" id="fMessage" maxLength="1200" placeholder="Tell us what you're looking for — car specs, destination port, shipping timeline, or any specific requirements…"></textarea>
          <div className="char-counter"><span id="charCount">0</span> / 1200</div>
        </div>

        <div className="form-group">
          <label className="f-label"><i className="fas fa-bullhorn"></i> How did you hear about us?</label>
          <select className="f-input" id="fSource">
            <option value="">Select…</option>
            <option>Google Search</option>
            <option>Facebook</option>
            <option>Instagram</option>
            <option>WhatsApp</option>
            <option>Friend / Referral</option>
            <option>Returning Customer</option>
            <option>Other</option>
          </select>
        </div>

        <div className="check-row">
          <input type="checkbox" id="fPrivacy" />
          <label htmlFor="fPrivacy">I agree to BestBuy Auto Japan's <a href="#">Privacy Policy</a> and consent to being contacted regarding my inquiry. <span style={{color: 'var(--gold)'}}>*</span></label>
        </div>

        <button className="btn-submit" id="submitBtn" onClick={() => window.submitForm()}>
          <span className="btn-text"><i className="fas fa-paper-plane"></i> Send Inquiry</span>
          <div className="spinner"></div>
        </button>
      </div>

      
      <div className="form-success" id="formSuccess">
        <div className="success-icon">✓</div>
        <h3 className="success-title">Inquiry Sent!</h3>
        <p className="success-desc">Thank you for reaching out to BestBuy Auto Japan. Our team has received your message and will get back to you within <strong>24 hours</strong>. A confirmation has been sent to your email.</p>
        <button className="btn-reset" onClick={() => window.resetForm()}><i className="fas fa-redo"></i> Send Another Inquiry</button>
      </div>
    </div>

  </div>
</section>



<div className="float-group">
  <a className="float-btn float-wa" href="https://whatsapp.com/channel/0029VbBuIAFDjiOaNllfrx3w" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i></a>
</div>
    </>
  );
}
