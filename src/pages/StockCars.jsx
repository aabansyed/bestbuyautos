import { useEffect } from "react";
import { Link } from "react-router-dom";
import { initStockCarsPage } from "./scripts/stockCarsScript";
import "../styles/home.css";

export default function StockCars() {
  useEffect(() => {
    const cleanup = initStockCarsPage();
    return cleanup;
  }, []);

  return (
    <>
      <section className="breadcrumb-banner">
        <h1>Stock Cars</h1>
        <div className="breadcrumb-nav">
          <Link to="/">Home</Link>
          <span className="sep"><i className="fas fa-chevron-right" style={{ fontSize: ".7rem" }}></i></span>
          <span className="current">Stock Cars</span>
        </div>
      </section>

      <section id="inventory" style={{ paddingTop: "40px" }}>
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-tag">Our Inventory</div>
            <h2 className="section-title">Find Your <span className="gold">Perfect Car</span></h2>
            <div className="gold-line"></div>
            <p className="section-desc" style={{ marginTop: '16px' }}>Browse thousands of premium vehicles available for worldwide export</p>
          </div>

          <div className="filters-wrap" data-aos="fade-up" data-aos-delay="100">
            <div className="filters-grid">
              <input className="filter-input" type="text" placeholder="Search brand or model…" id="fSearch" />
              <select className="filter-select" id="fBrand">
                <option value="">All Brands</option>
                <option>Toyota</option><option>Nissan</option><option>Honda</option>
                <option>Lexus</option><option>Mitsubishi</option><option>Mazda</option>
                <option>Subaru</option><option>BMW</option><option>Mercedes</option>
                <option>Audi</option><option>Land Rover</option><option>Porsche</option>
              </select>
              <select className="filter-select" id="fYear">
                <option value="">Any Year</option>
                <option value="2023-2026">2023 – 2026</option>
                <option value="2020-2022">2020 – 2022</option>
                <option value="2015-2019">2015 – 2019</option>
                <option value="2010-2014">2010 – 2014</option>
                <option value="2000-2009">2000 – 2009</option>
              </select>
              <select className="filter-select" id="fPrice">
                <option value="">Any Price</option>
                <option value="0-5000">Under $5,000</option>
                <option value="5000-15000">$5,000 – $15,000</option>
                <option value="15000-30000">$15,000 – $30,000</option>
                <option value="30000-60000">$30,000 – $60,000</option>
                <option value="60000+">$60,000+</option>
              </select>
              <select className="filter-select" id="fFuel">
                <option value="">Any Fuel</option>
                <option>Petrol</option><option>Diesel</option>
                <option>Hybrid</option><option>Electric</option>
              </select>
              <select className="filter-select" id="fTrans">
                <option value="">Any Transmission</option>
                <option>Automatic</option><option>Manual</option><option>CVT</option>
              </select>
              <select className="filter-select" id="fBody">
                <option value="">Any Body</option>
                <option>Sedan</option><option>SUV</option><option>Coupe</option>
                <option>Hatchback</option><option>Van</option><option>Truck</option>
              </select>
              <input className="filter-input" type="number" placeholder="Max Mileage (km)" id="fMileage" />
              <button className="btn-filter" onClick={() => { window.applyFilters() }}>
                <i className="fas fa-search"></i> Search Cars
              </button>
            </div>
          </div>

          <div className="cars-grid" id="carsGrid"></div>

          <div className="load-more-wrap" data-aos="fade-up">
            <button className="btn-hero-primary" id="loadMoreBtn" onClick={() => { window.loadMore() }}>
              <i className="fas fa-plus"></i> Load More Cars
            </button>
          </div>
        </div>
      </section>

      <div id="recently" style={{ display: 'none' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>🕐 Recently Viewed</h3>
            <button onClick={() => { window.clearRecent() }} style={{ background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer', fontSize: '.82rem' }}>Clear All</button>
          </div>
          <div className="recent-row" id="recentRow"></div>
        </div>
      </div>

      <div className="modal-overlay" id="carModal">
        <div className="modal" id="carModalContent">
          <div className="modal-header">
            <div className="modal-title" id="modalCarName">Car Name</div>
            <button className="modal-close" onClick={() => { window.closeModal('carModal') }}><i className="fas fa-times"></i></button>
          </div>
          <div className="modal-body" id="modalBody"></div>
        </div>
      </div>

      {/* Total Price request form (opened by "Verify via Email") */}
      <div className="modal-overlay" id="payModal">
        <div className="modal" style={{ maxWidth: '500px' }}>
          <div className="modal-header">
            <div className="modal-title">✉️ Verify via Email</div>
            <button className="modal-close" onClick={() => { window.closeModal('payModal') }}><i className="fas fa-times"></i></button>
          </div>
          <div className="modal-body">
            {/* Car summary */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '20px' }}>
              <img
                id="payCarImg"
                alt="Selected car"
                style={{ width: '110px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400'; }}
              />
              <div>
                <div style={{ fontWeight: '700', lineHeight: 1.3 }} id="payCarName">—</div>
                <div style={{ fontSize: '.75rem', color: 'var(--gray)', margin: '4px 0 8px' }} id="payCarStock">Stock Id : —</div>
                <div style={{ fontSize: '.78rem', color: 'var(--gray)' }}>Vehicle Price</div>
                <div style={{ fontFamily: '\'Orbitron\',sans-serif', fontSize: '1.1rem', color: 'var(--gold)' }} id="payCarPrice">—</div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>Total Price</div>
              <div style={{ fontSize: '.85rem', color: 'var(--gray)' }}>Get an estimate by completing this form</div>
            </div>

            <div className="form-group">
              <label className="form-label">Name <span style={{ color: '#e74c3c' }}>*</span></label>
              <input className="form-input" type="text" id="payName" placeholder="Your full name" />
            </div>

            <div className="form-group">
              <label className="form-label">Email <span style={{ color: '#e74c3c' }}>*</span></label>
              <input className="form-input" type="email" id="payEmail" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <select className="form-input" id="payCode" style={{ width: '110px', flexShrink: 0 }}>
                  <option value="+92">+92 PK</option>
                  <option value="+81">+81 JP</option>
                  <option value="+255">+255 TZ</option>
                  <option value="+254">+254 KE</option>
                  <option value="+234">+234 NG</option>
                  <option value="+971">+971 AE</option>
                  <option value="+966">+966 SA</option>
                  <option value="+94">+94 LK</option>
                  <option value="+64">+64 NZ</option>
                  <option value="+61">+61 AU</option>
                  <option value="+44">+44 UK</option>
                  <option value="+1">+1 US</option>
                </select>
                <input className="form-input" type="tel" id="payPhone" placeholder="Enter your phone number" />
              </div>
              <div style={{ fontSize: '.7rem', color: 'var(--gray)', marginTop: '4px' }}>The first 0 will be omitted</div>
            </div>

            <div className="form-group">
              <label className="form-label">WhatsApp</label>
              <input className="form-input" type="tel" id="payWhatsapp" placeholder="Enter your WhatsApp number" />
            </div>

            <div className="form-group">
              <label className="form-label">Remarks <span style={{ color: '#e74c3c' }}>*</span></label>
              <textarea className="form-input" id="payRemarks" rows="3" style={{ resize: 'vertical' }}></textarea>
            </div>

            <button className="btn-submit" onClick={() => { window.submitPayment() }}>
              <i className="fas fa-paper-plane"></i> Submit
            </button>
          </div>
        </div>
      </div>

    </>
  );
}