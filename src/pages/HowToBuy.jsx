import { Link } from "react-router-dom";
import "../styles/howtobuy.css";

export default function HowToBuy() {
  return (
    <>
<div className="breadcrumb-section">

  
  <img className="bc-bg" src="/topside.png" alt="" />

  <div className="bc-overlay"></div>
  <div className="bc-glow"></div>

  <div style={{position: 'absolute', top: '0', left: '0', right: '0', height: '2px', background: 'linear-gradient(90deg,transparent,var(--gold),transparent)', zIndex: '3'}}></div>
  <div style={{position: 'absolute', bottom: '0', left: '0', right: '0', height: '2px', background: 'linear-gradient(90deg,transparent,var(--gold),transparent)', zIndex: '3'}}></div>

  
  <div className="bc-content">
    <div className="breadcrumb-tag">Services</div>
    <h1 className="breadcrumb-title">How to
      <span style={{background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Buy</span>
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
      <div className="section-subtitle">Trusted Japanese Used Cars Exporter — Simple & Reliable Buying from Japan</div>
      <h2 className="section-title-main">Buy a Vehicle from Japan with <span className="gold">BestBuy Auto</span></h2>
      <div className="gold-line"></div>
    </div>

    
    <div className="step-cards-grid">
      <div className="step-card" data-aos="fade-up" data-aos-delay="0">
        <div className="step-number">01</div>
        <div className="step-icon-wrap">
          <img src="https://mdkjapan.com/assets/images/pages/how-to-buy/Select.svg" alt="Select" className="step-icon-svg" />
        </div>
        <div className="step-title">Select</div>
        <div className="step-description">Choose your ideal vehicle from our wide range of Japanese cars.</div>
      </div>
      <div className="step-card" data-aos="fade-up" data-aos-delay="60">
        <div className="step-number">02</div>
        <div className="step-icon-wrap">
          <img src="https://mdkjapan.com/assets/images/pages/how-to-buy/Order.svg" alt="Order" className="step-icon-svg" />
        </div>
        <div className="step-title">Order</div>
        <div className="step-description">Place your order and get a detailed purchase agreement.</div>
      </div>
      <div className="step-card" data-aos="fade-up" data-aos-delay="120">
        <div className="step-number">03</div>
        <div className="step-icon-wrap">
          <img src="https://mdkjapan.com/assets/images/pages/how-to-buy/Payment.svg" alt="Payment" className="step-icon-svg" />
        </div>
        <div className="step-title">Payment</div>
        <div className="step-description">Pay securely via bank transfer or online methods.</div>
      </div>
      <div className="step-card" data-aos="fade-up" data-aos-delay="180">
        <div className="step-number">04</div>
        <div className="step-icon-wrap">
          <img src="https://mdkjapan.com/assets/images/pages/how-to-buy/Clearance.svg" alt="Clearance" className="step-icon-svg" />
        </div>
        <div className="step-title">Clearance</div>
        <div className="step-description">Hassle-free customs clearance handled by our experts.</div>
      </div>
      <div className="step-card" data-aos="fade-up" data-aos-delay="240">
        <div className="step-number">05</div>
        <div className="step-icon-wrap">
          <img src="https://mdkjapan.com/assets/images/pages/how-to-buy/Shipment.svg" alt="Shipment" className="step-icon-svg" />
        </div>
        <div className="step-title">Shipment</div>
        <div className="step-description">Track your vehicle's journey with live updates.</div>
      </div>
      <div className="step-card" data-aos="fade-up" data-aos-delay="300">
        <div className="step-number">06</div>
        <div className="step-icon-wrap">
          <img src="https://mdkjapan.com/assets/images/pages/how-to-buy/Delivery.svg" alt="Delivery" className="step-icon-svg" />
        </div>
        <div className="step-title">Delivery</div>
        <div className="step-description">Vehicle delivered safely to your chosen port or location.</div>
      </div>
    </div>

    
    <div className="browse-notice" data-aos="fade-up">
      <span><i className="fas fa-car" style={{marginRight: '8px'}}></i>Browse Our Latest Japanese Used Cars with Full Specifications</span>
    </div>

    

    
    <div className="detail-step-row" data-aos="fade-up">
      <div className="step-text-block">
        <div className="step-num-label">
          <div className="step-num-badge">01</div>
          <h3 className="step-heading">Create an <span className="gold">Account</span></h3>
        </div>
        <div className="step-body">
          <p>Start by registering a free account with BestBuy Auto Japan, a trusted car dealership specializing in used Japanese cars export. Once registered, you can browse thousands of cars for sale, including sedans, SUVs, trucks, hybrids, and authentic Japanese car models.</p>
        </div>
      </div>
      <div className="step-img-block">
        <div className="step-img-frame">
          <img src="/how-to-buy-register.png" alt="Create an Account" />
          <div className="step-img-badge"><i className="fas fa-user-plus"></i> Free Registration</div>
        </div>
      </div>
    </div>

    
    <div className="detail-step-row reverse" data-aos="fade-up">
      <div className="step-text-block">
        <div className="step-num-label">
          <div className="step-num-badge">02</div>
          <h3 className="step-heading">Find Used Cars <span className="gold">in Japan</span></h3>
        </div>
        <div className="step-body">
          <p>Explore our wide inventory of used cars for sale, sourced directly from Japan. You can search by:</p>
          <div className="tag-row">
            <span className="spec-tag">Make & Model</span>
            <span className="spec-tag">Price & Year</span>
            <span className="spec-tag">Mileage & Fuel Type</span>
          </div>
          <p>Whether you're a dealer looking for bulk units or an individual searching for used cars, BestBuy Auto Japan provides export-ready vehicles at competitive prices.</p>
        </div>
      </div>
      <div className="step-img-block">
        <div className="step-img-frame">
          <img src="/how-to-buy-2.png" alt="Find Used Cars in Japan" />
          <div className="step-img-badge"><i className="fas fa-search"></i> Thousands of Listings</div>
        </div>
      </div>
    </div>

    
    <div className="detail-step-row" data-aos="fade-up">
      <div className="step-text-block">
        <div className="step-num-label">
          <div className="step-num-badge">03</div>
          <h3 className="step-heading">Reserve Your <span className="gold">Vehicle</span></h3>
        </div>
        <div className="step-body">
          <p>Once you find the right used car, click "Buy Now" or request a quotation. Our sales team will confirm availability, total cost, and shipping details. We also assist customers looking for rare JDM cars for sale and specialty Japanese vehicles.</p>
        </div>
      </div>
      <div className="step-img-block">
        <div className="step-img-frame">
          <img src="/how-to-buy-3.png" alt="Reserve Your Vehicle" />
          <div className="step-img-badge"><i className="fas fa-lock"></i> Secure Your Car</div>
        </div>
      </div>
    </div>

    
    <div className="detail-step-row reverse" data-aos="fade-up">
      <div className="step-text-block">
        <div className="step-num-label">
          <div className="step-num-badge">04</div>
          <h3 className="step-heading">Secure <span className="gold">Payment</span></h3>
        </div>
        <div className="step-body">
          <p>Payments are made via international bank transfer. BestBuy Auto Japan ensures a safe transaction process for buyers worldwide searching for cheap used cars from Japan or bulk used Japanese cars export opportunities.</p>
        </div>
      </div>
      <div className="step-img-block">
        <div className="step-img-frame">
          <img src="/how-to-buy-4.png" alt="Secure Payment" />
          <div className="step-img-badge"><i className="fas fa-shield-alt"></i> 100% Safe Transfer</div>
        </div>
      </div>
    </div>

    
    <div className="detail-step-row" data-aos="fade-up">
      <div className="step-text-block">
        <div className="step-num-label">
          <div className="step-num-badge">05</div>
          <h3 className="step-heading">Shipping <span className="gold">&amp; Docs</span></h3>
        </div>
        <div className="step-body">
          <p>After payment confirmation, your vehicle is shipped promptly. We provide all required export documents, making BestBuy Auto Japan a reliable partner among global Japanese car exporters.</p>
        </div>
      </div>
      <div className="step-img-block">
        <div className="step-img-frame">
          <img src="/how-to-buy-5.png" alt="Shipping & Docs" />
          <div className="step-img-badge"><i className="fas fa-ship"></i> Full Documentation</div>
        </div>
      </div>
    </div>

    
    <div className="detail-step-row reverse" data-aos="fade-up">
      <div className="step-text-block">
        <div className="step-num-label">
          <div className="step-num-badge">06</div>
          <h3 className="step-heading">Clearance <span className="gold">&amp; Delivery</span></h3>
        </div>
        <div className="step-body">
          <p>Once the vehicle arrives, complete customs clearance in your country. With BestBuy Auto Japan, buying a Japanese used car is as easy as working with a local car dealership — just with better prices and a wider selection.</p>
        </div>
      </div>
      <div className="step-img-block">
        <div className="step-img-frame">
          <img src="/how-to-buy-6.png" alt="Clearance & Delivery" />
          <div className="step-img-badge"><i className="fas fa-check-circle"></i> Drive Your Dream!</div>
        </div>
      </div>
    </div>

    
    <div className="important-notice" data-aos="fade-up">
      <div className="notice-icon"><i className="fas fa-triangle-exclamation"></i></div>
      <div className="notice-text">
        <strong>Important:</strong> Pay the remaining balance within 7 days of arrival. If unpaid, the company reserves the right to resell the vehicle and forfeit the initial deposit.
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
