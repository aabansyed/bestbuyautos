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

          <div className="filters-wrap sf-wrap" data-aos="fade-up" data-aos-delay="100">
            <div className="sf-grid sf-grid-4">
              <div className="sf-field"><label>Make</label><select className="filter-select" id="fMake"></select></div>
              <div className="sf-field"><label>Model</label><select className="filter-select" id="fModel" disabled></select></div>
              <div className="sf-field"><label>Model Code</label><select className="filter-select" id="fModelCode" disabled></select></div>
              <div className="sf-field"><label>Body Type</label><select className="filter-select" id="fBody"></select></div>
            </div>

            <div className="sf-grid sf-grid-range">
              <div className="sf-field sf-pair">
                <label>Vehicle Price (USD)</label>
                <div><select className="filter-select" id="fPriceMin"></select><select className="filter-select" id="fPriceMax"></select></div>
              </div>
              <div className="sf-field sf-pair sf-pair-wide">
                <label>Year / Month</label>
                <div>
                  <select className="filter-select" id="fYearMin"></select>
                  <select className="filter-select" id="fMonthMin" disabled></select>
                  <select className="filter-select" id="fYearMax"></select>
                  <select className="filter-select" id="fMonthMax" disabled></select>
                </div>
              </div>
              <div className="sf-field sf-pair">
                <label>Mileage (km)</label>
                <div><select className="filter-select" id="fMileMin"></select><select className="filter-select" id="fMileMax"></select></div>
              </div>
            </div>

            <div className="sf-grid sf-grid-5">
              <div className="sf-field"><label>Fuel</label><select className="filter-select" id="fFuel"></select></div>
              <div className="sf-field"><label>Transmission</label><select className="filter-select" id="fTrans"></select></div>
              <div className="sf-field"><label>Steering</label><select className="filter-select" id="fSteering"></select></div>
              <div className="sf-field"><label>Drive</label><select className="filter-select" id="fDrive"></select></div>
              <div className="sf-field"><label>Keyword / Stock ID</label><input className="filter-input" type="text" placeholder="Search…" id="fSearch" /></div>
            </div>

            <div className="sf-actions">
              <button className="sf-reset" type="button" onClick={() => { window.resetFilters() }}><i className="fas fa-rotate-left"></i> Reset</button>
              <button className="btn-filter" type="button" onClick={() => { window.applyFilters() }}>
                <i className="fas fa-search"></i> Search Cars <span id="sfCount"></span>
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