import { Link } from "react-router-dom";

import { useSiteSettings } from "../lib/siteSettings";

export default function Footer() {
  const { site } = useSiteSettings();
  return (
    <footer>
    <div className="container">
  <div className="footer-grid">
    <div>
      <div className="footer-logo-wrap">
        <Link to="/" className="nav-logo">
          <img
            src="/bba-logo.png"
            alt="BBA Japan Logo"
            className="nav-logo-img"
   
            style={{
              height: 100,
              width: "auto",
              display: "block",
            }}

          />
          <div className="logo-text">BBA JAPAN</div>
                  <div className="logo-sub">JAPANESE CAR EXPORTER</div>
        </Link>
      </div>
            <p className="footer-desc">Japan's premier car export marketplace. We connect buyers worldwide with the finest Japanese vehicles at unbeatable prices.</p>
           <div className="social-row">
  {site.facebook && <a href={site.facebook} className="social-btn" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>}
  {site.instagram && <a href={site.instagram} className="social-btn" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>}
  {site.twitter && <a href={site.twitter} className="social-btn" target="_blank" rel="noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>}
  {site.youtube && <a href={site.youtube} className="social-btn" target="_blank" rel="noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>}
  {site.linkedin && <a href={site.linkedin} className="social-btn" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>}
</div>
          </div>
          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links">
         <li><Link to="/stock-cars">Browse Cars</Link></li>
              <li><a href="/#shipping">Container Shipping</a></li>
              <li><a href="/#payment">Payment Methods</a></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
              <li><a href="/#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Car Types</div>
            <ul className="footer-links">
              <li><Link to="/stock-cars">Luxury Cars</Link></li>
<li><Link to="/stock-cars?body=SUV">SUVs & 4x4</Link></li>
<li><Link to="/stock-cars?body=Coupe">JDM Sports</Link></li>
<li><Link to="/stock-cars?fuel=Hybrid">Hybrid / EV</Link></li>
<li><Link to="/stock-cars?body=Van">Vans & Buses</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Legal</div>
            <ul className="footer-links">
              <li><Link to="/privacy-policy">Terms of Service</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/privacy-policy">Refund Policy</Link></li>
              <li><Link to="/privacy-policy">Cookie Policy</Link></li>
              <li><Link to="/privacy-policy">Compliance</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
        <div className="footer-copyright">© {new Date().getFullYear()} BestBuy Auto. All rights reserved. {site.location_short}.</div>
          <div style={{ fontSize: ".78rem", color: "var(--gray)" }}>Trusted by 50,000+ customers in 120+ countries</div>
        </div>
      </div>
    </footer>
  );
}
