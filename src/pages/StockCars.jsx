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
                <option>2024</option><option>2023</option><option>2022</option>
                <option>2021</option><option>2020</option><option>2019</option>
                <option>2018</option><option>2015–2017</option><option>2010–2014</option>
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

      <div className="modal-overlay" id="negoModal">
        <div className="modal" style={{ maxWidth: '500px' }}>
          <div className="modal-header">
            <div className="modal-title">💬 Negotiate Price</div>
            <button className="modal-close" onClick={() => { window.closeModal('negoModal') }}><i className="fas fa-times"></i></button>
          </div>
          <div className="modal-body">
            <p style={{ color: 'var(--gray)', marginBottom: '24px', fontSize: '.9rem' }}>Submit your desired price and our team will respond within 24 hours.</p>
            <input type="hidden" id="negoCarName" />
            <div className="form-group">
              <label className="form-label">Car</label>
              <input className="form-input" id="negoCarDisplay" readOnly style={{ background: 'var(--dark3)' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Listed Price</label>
              <input className="form-input" id="negoListedPrice" readOnly style={{ background: 'var(--dark3)', color: 'var(--gold)' }} />
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
              <textarea className="form-textarea" id="negoMsg" placeholder="Any specific requirements or comments…" style={{ minHeight: '80px' }}></textarea>
            </div>
            <button className="btn-submit" onClick={() => { window.submitNego() }}>
              <i className="fas fa-paper-plane"></i> Submit Offer
            </button>
          </div>
        </div>
      </div>

      <div className="modal-overlay" id="payModal">
        <div className="modal" style={{ maxWidth: '500px' }}>
          <div className="modal-header">
            <div className="modal-title">💳 Purchase / Request Invoice</div>
            <button className="modal-close" onClick={() => { window.closeModal('payModal') }}><i className="fas fa-times"></i></button>
          </div>
          <div className="modal-body">
            <div style={{ background: 'linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.03))', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '.78rem', color: 'var(--gray)' }}>Vehicle</div>
              <div style={{ fontWeight: '700', marginBottom: '6px' }} id="payCarName">—</div>
              <div style={{ fontFamily: '\'Orbitron\',sans-serif', fontSize: '1.3rem', color: 'var(--gold)' }} id="payCarPrice">—</div>
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
            <button className="btn-submit" onClick={() => { window.submitPayment() }}>
              <i className="fas fa-lock"></i> Confirm & Proceed
            </button>
          </div>
        </div>
      </div>

      <div className="modal-overlay" id="compareModal">
        <div className="modal" style={{ maxWidth: '900px' }}>
          <div className="modal-header">
            <div className="modal-title">⚖️ Compare Cars</div>
            <button className="modal-close" onClick={() => { window.closeModal('compareModal') }}><i className="fas fa-times"></i></button>
          </div>
          <div className="modal-body" id="compareBody"></div>
        </div>
      </div>

      <div id="compareBar">
        <div style={{ fontWeight: '700', color: 'var(--gold)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fas fa-balance-scale"></i> Compare:
        </div>
        <div className="compare-items" id="compareItemsBar"></div>
        <button className="btn-do-compare" onClick={() => { window.doCompare() }}>Compare Now</button>
        <button onClick={() => { window.clearCompare() }} style={{ background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer', fontSize: '.9rem', padding: '8px' }}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </>
  );
}