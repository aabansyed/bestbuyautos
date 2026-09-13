import { useEffect } from "react";
import { Link } from "react-router-dom";
import { initAuctionPage } from "./scripts/auctionScript";
import "../styles/auction.css";

export default function Auction() {
  useEffect(() => {
    const cleanup = initAuctionPage();
    return cleanup;
  }, []);

  return (
    <>
<div className="breadcrumb-banner">

  <img className="bc-bg" src="/topside.png" alt="" />

  <div className="bc-overlay"></div>

  <div className="bc-content">
    <div className="bc-tag"><span></span> Live Auction Access</div>
    <h1>Vehicle <span className="gold">Auctions</span></h1>
    <div className="gold-line"></div>
    <ol className="breadcrumb-ol">
      <li><Link to="/">Home</Link></li>
      <li className="sep">/</li>
      <li>Services</li>
      <li className="sep">/</li>
      <li className="active">Auctions</li>
    </ol>
  </div>

</div>


<div className="sptb" style={{background: 'var(--dark)'}}>
  <div className="container">

    
    <section className="auction-live-highlight" data-aos="fade-up">
      <div className="auction-live-highlight-content">
        <div className="auction-live-heading">
          <div className="auction-live-icon">
            <div style={{width: '52px', height: '52px', background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem'}}>🏎️</div>
          </div>
          <h2 className="auction-live-title">Find Your Dream Vehicle with <span>BBA Japan</span></h2>
        </div>
        <div className="auction-live-subtitle">Live Auction in Japan</div>
        <p className="auction-live-text">Unlock instant access to <strong>120,000+</strong> Japanese vehicles every week from <strong>150+</strong> top auction houses across Japan.</p>
        <p className="auction-live-text">Whether you're searching for reliability, style, or rarity, BBA Japan brings Japan's finest vehicles straight to you.</p>
        <div className="auction-live-actions">
          <a href="#" className="btn-auction"><i className="fas fa-map-location-dot"></i> Auction Location Map</a>
          <a href="#" className="btn-auction"><i className="fas fa-file-alt"></i> Auction Sheet Guide</a>
        </div>
      </div>
      <div className="auction-live-map">
        <img src="/live-auction-map.webp" alt="Japan Auction Map" />
      </div>
    </section>

    
    <div className="auction-hero-center" data-aos="fade-up">
      <div className="auction-hero-badge">Transparent Auction Pricing</div>
      <h2 className="auction-hero-title">BBA Japan <span className="gold">Live Auctions</span></h2>
      <p className="auction-hero-intro">If you cannot find your desired vehicle in our available stock, BBA Japan Live Auction Service helps you source the exact vehicle directly from Japanese car auction houses. Our expert team assists you throughout the entire process — from vehicle search and auction sheet inspection to bidding, payment, and shipping — ensuring a smooth, secure, and transparent buying experience.</p>
    </div>

    
    <div className="auction-features">

      <div className="auction-feature" data-aos="fade-up" data-aos-delay="0">
        <div className="auction-feature-icon"><i className="fas fa-handshake-simple"></i></div>
        <div>
          <div className="auction-feature-title">Buying from Japanese Car Auctions Made Simple</div>
          <p className="auction-feature-text">BBA Japan specializes in Japanese used car auctions, offering professional support to international buyers. Japanese vehicle auctions may seem complex, but with BBA Japan's auction experts, you receive step-by-step guidance to make purchasing easy, reliable, and stress-free.</p>
        </div>
      </div>

      <div className="auction-feature" data-aos="fade-up" data-aos-delay="80">
        <div className="auction-feature-icon"><i className="fas fa-building-columns"></i></div>
        <div>
          <div className="auction-feature-title">Access to Over 150 Japanese Auction Houses</div>
          <p className="auction-feature-text">By registering with BBA Japan's Live Auction Service, you gain access to:</p>
          <ul className="auction-feature-list">
            <li>150+ Japanese auction houses nationwide</li>
            <li>100,000+ vehicles updated weekly</li>
            <li>Passenger cars, SUVs, trucks, vans, and commercial vehicles</li>
          </ul>
          <p className="auction-feature-text">With one of the largest Japanese vehicle inventories, your chances of finding the perfect vehicle increase significantly.</p>
        </div>
      </div>

      <div className="auction-feature" data-aos="fade-up" data-aos-delay="160">
        <div className="auction-feature-icon"><i className="fas fa-comments"></i></div>
        <div>
          <div className="auction-feature-title">Free Consultation & Auction Sheet Translation</div>
          <p className="auction-feature-text">BBA Japan provides free professional consultation, including:</p>
          <ul className="auction-feature-list">
            <li>Import regulations by country</li>
            <li>Recommended model year & engine size</li>
            <li>Compliance with local laws</li>
            <li>Japanese auction sheet inspection & translation</li>
          </ul>
          <p className="auction-feature-text">Our specialists help you understand the true condition of the vehicle before you bid.</p>
        </div>
      </div>

    </div>

    
    <div className="auction-process-section" data-aos="fade-up">
      <div className="process-badge">Browse Live Auction Inventory</div>
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
                    <tr><td>1,000,001 – 2,000,000</td><td>200,000</td></tr>
                    <tr><td>2,000,001 – 3,000,000</td><td>300,000</td></tr>
                    <tr><td>3,000,001 – 4,000,000</td><td>400,000</td></tr>
                    <tr><td>4,000,001 – 5,000,000</td><td>500,000</td></tr>
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
                <li>Book shipping — RoRo or Container</li>
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

      
      <div className="faq-category" data-aos="fade-up">
        <div className="faq-category-header">
          <div className="faq-cat-tag">How to Buy Cars From Japan Auctions</div>
          <h2 className="faq-cat-title">Auction &amp; Bidding FAQ's</h2>
          <div className="gold-line"></div>
        </div>
        <div className="faq-list" id="faqList1">
          <div className="faq-item open">
            <div className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget, "faqList1")}>
              <span className="faq-num">01</span>
              <span style={{flex: '1'}}>What Is a Bid Price in Vehicle Auctions?</span>
              <div className="faq-icon"><i className="fas fa-plus"></i></div>
            </div>
            <div className="faq-a">A Bid Price (or "Bid") is the maximum amount a buyer is willing to offer for a specific vehicle during an auction. It represents the buyer's highest price to secure the vehicle and determines competitiveness against other bidders.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget, "faqList1")}>
              <span className="faq-num">02</span>
              <span style={{flex: '1'}}>Why Is an Advance Deposit Required for Auction Bidding?</span>
              <div className="faq-icon"><i className="fas fa-plus"></i></div>
            </div>
            <div className="faq-a">An Advance Deposit is required for security purposes to confirm genuine bidding intent. It helps prevent last-minute bid cancellations and eliminates fake or spam bid requests, ensuring a fair and reliable auction process for all buyers.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget, "faqList1")}>
              <span className="faq-num">03</span>
              <span style={{flex: '1'}}>Is the Advance Deposit Refundable?</span>
              <div className="faq-icon"><i className="fas fa-plus"></i></div>
            </div>
            <div className="faq-a">Yes, the Advance Deposit is 100% refundable. It may also be used for your next auction bid or vehicle purchase. Please note that any bank charges or transfer fees will be covered by the buyer.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget, "faqList1")}>
              <span className="faq-num">04</span>
              <span style={{flex: '1'}}>Is There a Deadline for Placing Auction Bids?</span>
              <div className="faq-icon"><i className="fas fa-plus"></i></div>
            </div>
            <div className="faq-a">Yes, all auction bids must be placed at least one hour before the auction start time. For example, if an auction begins at 10:00 AM (JST), your bid must be submitted by 9:00 AM (JST) to be accepted.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget, "faqList1")}>
              <span className="faq-num">05</span>
              <span style={{flex: '1'}}>What Happens If I Bid on Multiple Vehicles but Want to Purchase Only One?</span>
              <div className="faq-icon"><i className="fas fa-plus"></i></div>
            </div>
            <div className="faq-a">Our system automatically cancels all other active bids once you successfully win a bid for one vehicle. If you wish to purchase more than one vehicle, you can easily set the number of vehicles you intend to buy in advance.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget, "faqList1")}>
              <span className="faq-num">06</span>
              <span style={{flex: '1'}}>After Winning a Bid, When Is the Payment Deadline?</span>
              <div className="faq-icon"><i className="fas fa-plus"></i></div>
            </div>
            <div className="faq-a">After winning an auction bid, the initial payment must be made within 10 days of receiving the invoice. The remaining balance must be paid at least 10 days before the estimated time of arrival (ETA). If you are unable to complete the payment within this timeframe, please inform us in advance to discuss possible arrangements.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget, "faqList1")}>
              <span className="faq-num">07</span>
              <span style={{flex: '1'}}>Is It Possible to Cancel After Winning an Auction Bid?</span>
              <div className="faq-icon"><i className="fas fa-plus"></i></div>
            </div>
            <div className="faq-a">Yes, cancellation is possible after winning a bid. If the cancellation is made within one hour of winning, no cancellation fee will be charged. However, if the cancellation is requested after one hour, a cancellation fee of JPY 88,000 will apply.</div>
          </div>
        </div>
      </div>

      
      <div className="faq-category" data-aos="fade-up">
        <div className="faq-category-header">
          <div className="faq-cat-tag">Vehicle Costs, Pricing &amp; Global Shipping Information</div>
          <h2 className="faq-cat-title">Vehicle Pricing &amp; Shipping</h2>
          <div className="gold-line"></div>
        </div>
        <div className="faq-list" id="faqList2">
          <div className="faq-item open">
            <div className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget, "faqList2")}>
              <span className="faq-num">01</span>
              <span style={{flex: '1'}}>What Costs Do I Need to Cover When Purchasing Through a Live Auction?</span>
              <div className="faq-icon"><i className="fas fa-plus"></i></div>
            </div>
            <div className="faq-a">When purchasing a vehicle through a Live Auction, the total cost is: Bid Price + Auction Service Fee + Shipping Cost (from Japan to destination country). These combined charges make up the final total cost of your vehicle purchase.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget, "faqList2")}>
              <span className="faq-num">02</span>
              <span style={{flex: '1'}}>What Does the Auction Service Fee Include and How Much Does It Cost?</span>
              <div className="faq-icon"><i className="fas fa-plus"></i></div>
            </div>
            <div className="faq-a">The Auction Service Fee covers essential services required to prepare and export your vehicle. This includes delivery from the auction house to the Japanese port, customs clearance fees, documentation fees, courier charges, and handling fees. The exact Auction Service Fee varies depending on the vehicle's final destination country. Please contact BBA Japan for detailed pricing information.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget, "faqList2")}>
              <span className="faq-num">03</span>
              <span style={{flex: '1'}}>Can Auto Parts Be Shipped Together Inside the Vehicle?</span>
              <div className="faq-icon"><i className="fas fa-plus"></i></div>
            </div>
            <div className="faq-a">No, shipping auto parts inside a vehicle is not permitted. Most international shipping companies prohibit this due to safety concerns and the risk of damage during transit. To comply with shipping regulations and ensure vehicle protection, auto parts must be shipped separately.</div>
          </div>
        </div>
      </div>

      
      <div className="faq-category" data-aos="fade-up">
        <div className="faq-category-header">
          <div className="faq-cat-tag">Overall Vehicle Condition</div>
          <h2 className="faq-cat-title">Vehicle Condition</h2>
          <div className="gold-line"></div>
        </div>
        <div className="faq-list" id="faqList3">
          <div className="faq-item open">
            <div className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget, "faqList3")}>
              <span className="faq-num">01</span>
              <span style={{flex: '1'}}>How Can I Be Sure About the Vehicle's Condition Before Bidding?</span>
              <div className="faq-icon"><i className="fas fa-plus"></i></div>
            </div>
            <div className="faq-a">Before activating your bid, we review the official auction inspection sheet and inform you of any known defects or vehicle condition details. This ensures transparency and helps you make an informed decision before placing your bid.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget, "faqList3")}>
              <span className="faq-num">02</span>
              <span style={{flex: '1'}}>How Can I Read and Understand Auction Sheets?</span>
              <div className="faq-icon"><i className="fas fa-plus"></i></div>
            </div>
            <div className="faq-a">Each auction house uses its own auction sheet format, which may vary in symbols and grading standards. If you need help interpreting an auction sheet, you may contact BBA Japan for assistance. You can also download the Auction Sheet Guide above to better understand vehicle grades, condition marks, and inspection details.</div>
          </div>
        </div>
      </div>

    </div>

  </div>
</div>


<section className="footer-wrapper">
  <div className="footer-newsletter">
    <div className="newsletter-inner">
      <p>Stay updated with the latest auction listings and vehicle deals from Japan</p>
      <div className="newsletter-form">
        <input type="email" className="newsletter-input" placeholder="john.doe@example.com" />
        <button className="newsletter-btn">SUBSCRIBE</button>
      </div>
    </div>
  </div>

  <div className="footer-main">
    <div className="footer-grid">
      <div>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px'}}>
          <div className="logo-icon-box" style={{width: '36px', height: '36px', fontSize: '1rem'}}>🚗</div>
          <div>
            <div className="logo-text" style={{fontSize: '.9rem'}}>BBA JAPAN</div>
            <div className="logo-sub">JAPANESE CAR EXPORTER</div>
          </div>
        </div>
        <p className="footer-desc">Japan's premier car auction & export marketplace. We connect buyers worldwide with the finest Japanese vehicles at unbeatable prices with full transparency.</p>
        <div className="social-row">
          <a href="https://www.facebook.com/NO1BESTBUYAUTO/" className="social-btn"><i className="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/no1bestbuyauto" className="social-btn"><i className="fab fa-instagram"></i></a>
          <a href="#" className="social-btn"><i className="fab fa-twitter"></i></a>
          <a href="#" className="social-btn"><i className="fab fa-youtube"></i></a>
          <a href="#" className="social-btn"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
      <div>
        <div className="footer-col-title">Quick Links</div>
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><a href="bba-auction.html">Live Auctions</a></li>
          <li><a href="bba-auctioncar.html">Auction Cars</a></li>
          <li><a href="index.html#inventory">Used Cars</a></li>
          <li><a href="howtobuy.html">How to Buy</a></li>
          <li><a href="bankingdetails.html">Bank Details</a></li>
        </ul>
      </div>
      <div>
        <div className="footer-col-title">Opening Hours</div>
        <ul className="footer-links" style={{gap: '6px'}}>
          <li style={{color: 'var(--gray)', fontSize: '.84rem', fontWeight: '600', color: 'var(--white)'}}>Sales Department</li>
          <li><span style={{color: 'var(--gray)', fontSize: '.83rem'}}>Mon–Fri: 9:00am – 6:00pm</span></li>
          <li><span style={{color: 'var(--gray)', fontSize: '.83rem'}}>Saturday, Sunday closed</span></li>
          <li style={{marginTop: '10px', color: 'var(--white)', fontSize: '.84rem', fontWeight: '600'}}>Service Department</li>
          <li><span style={{color: 'var(--gray)', fontSize: '.83rem'}}>Mon–Fri: 9:00am – 6:00pm</span></li>
          <li><span style={{color: 'var(--gray)', fontSize: '.83rem'}}>Saturday, Sunday closed</span></li>
        </ul>
      </div>
      <div>
        <div className="footer-col-title">Contact Details</div>
        <ul className="footer-contact" style={{listStyle: 'none'}}>
          <li><i className="fas fa-map-location-dot"></i><span>Aichi, Japan</span></li>
          <li><a href="tel:+8190XXXXXXXX"><i className="fas fa-phone"></i>+81-90-XXXX-XXXX</a></li>
          <li><a href="mailto:sales@bestbuyauto.jp"><i className="fas fa-envelope"></i>sales@bestbuyauto.jp</a></li>
        </ul>
        <a href="contact-us.html" style={{display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '50px', color: 'var(--gold)', fontSize: '.8rem', textDecoration: 'none', marginTop: '8px', transition: 'all .3s'}}>
          View Details <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="footer-copyright">
        © 2025 BestBuy Auto Japan. All rights reserved.
        <a href="#">Privacy Policy</a>
        <a href="#">Terms &amp; Conditions</a>
      </div>
      <div style={{fontSize: '.76rem', color: 'var(--gray)'}}>Trusted by 50,000+ customers in 120+ countries</div>
    </div>
  </div>
</section>


<a className="float-wa" href="https://wa.me/8190XXXXXXXX?text=Hi%2C%20I'm%20interested%20in%20BBA%20Japan%20auction%20service" target="_blank">
  <span className="float-wa-tooltip">WhatsApp Us</span>
  <i className="fab fa-whatsapp"></i>
</a>


<button id="backTop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <i className="fas fa-chevron-up"></i>
</button>
    </>
  );
}
