import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo-wrap">
              <Link to="/" className="nav-logo">
                <div className="logo-icon">🚗</div>
                <div>
                  <div className="logo-text">BBA JAPAN</div>
                  <div className="logo-sub">JAPANESE CAR EXPORTER</div>
                </div>
              </Link>
            </div>
            <p className="footer-desc">Japan's premier car export marketplace. We connect buyers worldwide with the finest Japanese vehicles at unbeatable prices.</p>
            <div className="social-row">
              <a href="#" className="social-btn"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-btn"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-btn"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-btn"><i className="fab fa-youtube"></i></a>
              <a href="#" className="social-btn"><i className="fab fa-linkedin-in"></i></a>
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
          <div className="footer-copyright">© 2024 BestBuy Auto. All rights reserved. Yokohama, Japan.</div>
          <div style={{ fontSize: ".78rem", color: "var(--gray)" }}>Trusted by 50,000+ customers in 120+ countries</div>
        </div>
      </div>
    </footer>
  );
}
