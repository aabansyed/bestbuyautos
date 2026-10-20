import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { initAuctionPage } from "./scripts/auctionScript";
import { fetchSiteContent, CONTENT_DEFAULTS } from "../lib/siteContentApi";
import { fetchPublicFaqs } from "../lib/faqApi";
import { fetchMediaMap } from "../lib/mediaApi";
import "../styles/auction.css";

export default function Auction() {
  const [content, setContent] = useState(CONTENT_DEFAULTS);
  const [faqs, setFaqs] = useState(null);
  const [media, setMedia] = useState({});

  useEffect(() => {
    const cleanup = initAuctionPage();
    return cleanup;
  }, []);

  useEffect(() => {
    fetchSiteContent().then(setContent).catch(() => {});
    fetchPublicFaqs("auction").then(setFaqs).catch(() => setFaqs([]));
    fetchMediaMap().then(setMedia).catch(() => {});
  }, []);

  // Group auction FAQs by category, preserving first-appearance order.
  const faqCategories = useMemo(() => {
    if (!faqs) return [];
    const order = [];
    const map = {};
    faqs.forEach((f) => {
      const cat = f.category || "General";
      if (!map[cat]) { map[cat] = []; order.push(cat); }
      map[cat].push(f);
    });
    return order.map((cat) => ({ category: cat, items: map[cat] }));
  }, [faqs]);

  const locationMap = media.auction_location_map;
  const sheetGuide = media.auction_sheet_guide;

  return (
    <>
<div className="breadcrumb-banner">

  <img className="bc-bg" src="/topside.png" alt="" />

  <div className="bc-overlay"></div>

  <div className="bc-content">
    <div className="bc-tag"><span></span> Live Auction Access</div>
   <div className="auc-title-row">
  <h1>Vehicle <span className="gold">Auctions</span></h1>
  <ol className="breadcrumb-ol">
    <li><Link to="/">Home</Link></li>
    <li className="sep">/</li>
    <li>Services</li>
    <li className="sep">/</li>
    <li className="active">Auctions</li>
  </ol>
</div>
<div className="gold-line"></div>
  </div>

</div>


<div className="sptb" style={{background: 'var(--dark)'}}>
  <div className="container">

    
    <section className="auction-live-highlight" data-aos="fade-up">
      <div className="auction-live-highlight-content">
        <div className="auction-live-heading">
          <div className="auction-live-icon">
            <div style={{width: '52px', height: '52px', background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem'}}><i className="fas fa-car-side"></i></div>
          </div>
          <h2 className="auction-live-title">Find Your Dream Vehicle with <span>BBA Japan</span></h2>
        </div>
        <div className="auction-live-subtitle">Live Auction in Japan</div>
        <p className="auction-live-text">Unlock instant access to <strong>{content.auction_stat_vehicles}</strong> Japanese vehicles every week from <strong>{content.auction_stat_houses}</strong> top auction houses across Japan.</p>
        <p className="auction-live-text">Whether you're searching for reliability, style, or rarity, BBA Japan brings Japan's finest vehicles straight to you.</p>
        <div className="auction-live-actions">
          {locationMap && (
            <a href={locationMap.url} target="_blank" rel="noreferrer" className="btn-auction">
              <i className="fas fa-map-location-dot"></i> Auction Location Map
            </a>
          )}
          {sheetGuide && (
            <a href={sheetGuide.url} target="_blank" rel="noreferrer" className="btn-auction">
              <i className="fas fa-file-alt"></i> Auction Sheet Guide
            </a>
          )}
        </div>
      </div>
      <div className="auction-live-map">
        <img src="/live-auction-map.webp" alt="Japan Auction Map" />
      </div>
    </section>

    
    <div className="auction-hero-center" data-aos="fade-up">
      <div className="auction-hero-badge">Transparent Auction Pricing</div>
      <h2 className="auction-hero-title">BBA Japan <span className="gold">Live Auctions</span></h2>
      <p className="auction-hero-intro">{content.auction_hero_intro}</p>
    </div>

    
    <div className="auction-features">

      <div className="auction-feature" data-aos="fade-up" data-aos-delay="0">
        <div className="auction-feature-icon"><i className="fas fa-handshake-simple"></i></div>
        <div>
          <div className="auction-feature-title">{content.auction_feature1_title}</div>
          <p className="auction-feature-text">{content.auction_feature1_text}</p>
        </div>
      </div>

      <div className="auction-feature" data-aos="fade-up" data-aos-delay="80">
        <div className="auction-feature-icon"><i className="fas fa-building-columns"></i></div>
        <div>
          <div className="auction-feature-title">{content.auction_feature2_title}</div>
          <p className="auction-feature-text">{content.auction_feature2_intro}</p>
          <ul className="auction-feature-list">
            {content.auction_feature2_list.split("\n").filter(Boolean).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="auction-feature-text">{content.auction_feature2_outro}</p>
        </div>
      </div>

      <div className="auction-feature" data-aos="fade-up" data-aos-delay="160">
        <div className="auction-feature-icon"><i className="fas fa-comments"></i></div>
        <div>
          <div className="auction-feature-title">{content.auction_feature3_title}</div>
          <p className="auction-feature-text">{content.auction_feature3_intro}</p>
          <ul className="auction-feature-list">
            {content.auction_feature3_list.split("\n").filter(Boolean).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="auction-feature-text">{content.auction_feature3_outro}</p>
        </div>
      </div>

    </div>

    
    <div className="auc-live-cta" data-aos="fade-up">
      <div className="process-badge">Browse Live Auction Inventory</div>
      <h2 className="process-title">Explore <span>Live Auction Listings</span></h2>
      <p className="auction-hero-intro" style={{marginBottom: '30px'}}>Browse real-time vehicle listings directly from Japanese auction houses. Once you find a vehicle you like, contact our team with the lot number to start the bidding process.</p>
      <a href="https://auc.onejp.net/japan" target="_blank" rel="noreferrer" className="auc-live-btn">
        <i className="fas fa-gavel"></i> View Live Auction
      </a>
    </div>


    
    <div className="auction-process-section" data-aos="fade-up">
      <div className="process-badge">Step-by-Step Guide</div>
      <h2 className="process-title">BBA Japan <span>Auction Process</span></h2>

      <div className="process-card">
        <div className="process-steps">

          <div className="process-step">
            <div className="step-icon-box"><i className="fas fa-user-plus"></i></div>
            <div>
              <div className="step-head"><span className="step-num">Step 1</span><span className="step-title">Registration</span></div>
              <p className="step-desc">Register for BBA Japan Live Auction Service by submitting the Inquiry Form or contacting us directly. Once registered, your auction account will be activated within 24 hours.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-icon-box"><i className="fas fa-magnifying-glass"></i></div>
            <div>
              <div className="step-head"><span className="step-num">Step 2</span><span className="step-title">Vehicle Search</span></div>
              <p className="step-desc">Access real-time listings from Japanese auction houses and search for vehicles based on:</p>
              <ul className="step-list">
                <li>Make &amp; model</li>
                <li>Year &amp; mileage</li>
                <li>Auction grade</li>
              </ul>
              <p className="step-desc">Shortlist the vehicles you wish to bid on.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-icon-box"><i className="fas fa-university"></i></div>
            <div>
              <div className="step-head"><span className="step-num">Step 3</span><span className="step-title">Advance Security Deposit</span></div>
              <p className="step-desc">An advance refundable deposit is required before bidding.</p>
              <ul className="step-list">
                <li>Deposits made via bank wire transfer</li>
                <li>100% refundable if no successful bid is made (bank charges apply)</li>
                <li>Minimum deposit: USD 1,000</li>
              </ul>
              <div className="deposit-table-wrap">
                <table className="deposit-table">
                  <thead>
                    <tr>
                      <th>Vehicle Price (JPY)</th>
                      <th>Required Deposit (JPY)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Up to 1,000,000</td><td>100,000</td></tr>
                    <tr><td>1,000,001 - 2,000,000</td><td>200,000</td></tr>
                    <tr><td>2,000,001 - 3,000,000</td><td>300,000</td></tr>
                    <tr><td>3,000,001 - 4,000,000</td><td>400,000</td></tr>
                    <tr><td>4,000,001 - 5,000,000</td><td>500,000</td></tr>
                    <tr><td>Above 5,000,001</td><td>20% of vehicle price</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="process-step">
            <div className="step-icon-box"><i className="fas fa-car"></i></div>
            <div>
              <div className="step-head"><span className="step-num">Step 4</span><span className="step-title">Vehicle Selection &amp; Bid Placement</span></div>
              <p className="step-desc">After deposit confirmation:</p>
              <ul className="step-list">
                <li>Submit your maximum bid price</li>
                <li>Bid on up to 10 vehicles per day</li>
                <li>BBA Japan reviews and explains the auction sheet before bidding</li>
              </ul>
              <p className="step-desc">Our sales team will confirm the vehicle condition before activating your bid.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-icon-box"><i className="fas fa-gavel"></i></div>
            <div>
              <div className="step-head"><span className="step-num">Step 5</span><span className="step-title">Live Auction Bidding</span></div>
              <p className="step-desc">BBA Japan places the bid on your behalf at the auction. You will be informed immediately of the auction result. If successful, a Proforma Invoice will be issued within 24 hours.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-icon-box"><i className="fas fa-credit-card"></i></div>
            <div>
              <div className="step-head"><span className="step-num">Step 6</span><span className="step-title">Final Payment</span></div>
              <p className="step-desc">Pay the remaining balance via:</p>
              <ul className="step-list">
                <li>Bank Wire Transfer (T/T)</li>
                <li>Letter of Credit (LC)</li>
                <li>Online Payment (where applicable)</li>
              </ul>
              <p className="step-desc">Additional charges may include inspection, container packing, or other optional services.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-icon-box"><i className="fas fa-ship"></i></div>
            <div>
              <div className="step-head"><span className="step-num">Step 7</span><span className="step-title">Yard Inspection &amp; Vehicle Shipping</span></div>
              <p className="step-desc">After payment confirmation:</p>
              <ul className="step-list">
                <li>Arrange yard inspection</li>
                <li>Prepare export documents (BL, Export Certificate, Commercial Invoice)</li>
                <li>Book shipping - RoRo or Container</li>
              </ul>
              <p className="step-desc">You can track your shipment anytime through our Customer Dashboard or contact your dedicated agent.</p>
            </div>
          </div>

        </div>
      </div>
    </div>

    
    <div className="auction-notice" data-aos="fade-up" role="status">
      <div className="notice-icon">!</div>
      <div>
        <div className="notice-title">Important Notice</div>
        <p className="notice-text">Import duties, port charges, taxes, and clearance fees at the destination port are the buyer's responsibility. Please consult your local customs authorities for exact costs before placing a bid.</p>
      </div>
    </div>


    <div className="faq-section">
      {faqCategories.map((cat, catIdx) => {
        const listId = `faqList-${catIdx}`;
        return (
          <div className="faq-category" data-aos="fade-up" key={cat.category}>
            <div className="faq-category-header">
              <h2 className="faq-cat-title">{cat.category}</h2>
              <div className="gold-line"></div>
            </div>
            <div className="faq-list" id={listId}>
              {cat.items.map((faq, i) => (
                <div className={`faq-item${i === 0 ? " open" : ""}`} key={faq.id}>
                  <div className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget, listId)}>
                    <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                    <span style={{flex: '1'}}>{faq.question}</span>
                    <div className="faq-icon"><i className="fas fa-plus"></i></div>
                  </div>
                  <div className="faq-a">{faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
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

<button id="backTop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <i className="fas fa-chevron-up"></i>
</button>
    </>
  );
}