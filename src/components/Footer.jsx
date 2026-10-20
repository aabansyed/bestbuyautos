import { Link } from "react-router-dom";
import { useSiteSettings } from "../lib/siteSettings";

export default function Footer() {
  const { site } = useSiteSettings();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* ── Brand + social ── */}
          <div>
            <p className="footer-desc" style={{ marginTop: 0 }}>
              Japan's premier car export marketplace. We connect buyers worldwide with the finest Japanese vehicles at unbeatable prices.
            </p>
            <div className="social-row">
              <a
                href={site.facebook || "#"}
                className="social-btn"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href={site.instagram || "#"}
                className="social-btn"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* ── Company (navbar: About Us + dropdown) ── */}
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><Link to="/our-company">About Us</Link></li>
              <li><Link to="/bank-details">Bank Details</Link></li>
              <li><Link to="/ceo-message">CEO Message</Link></li>
              <li><Link to="/our-partners">Our Partners</Link></li>
            </ul>
          </div>

          {/* ── Explore (navbar: remaining links) ── */}
          <div>
            <div className="footer-col-title">Explore</div>
            <ul className="footer-links">
              <li><Link to="/stock-cars">Stock Cars</Link></li>
              <li><Link to="/auction">Auction Cars</Link></li>
              <li><Link to="/how-to-buy">How to Buy</Link></li>
              <li><Link to="/blog">Blogs</Link></li>
              <li><a href="/#testimonials">Reviews</a></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>

          {/* ── Legal ── */}
          <div>
            <div className="footer-col-title">Legal</div>
            <ul className="footer-links">
              <li><Link to="/privacy-policy">Terms of Service</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} BestBuy Auto. All rights reserved. {site.location_short}.
          </div>
          <div style={{ fontSize: ".78rem", color: "var(--gray)" }}>
            Trusted by 50,000+ customers in 120+ countries
          </div>
        </div>
      </div>
    </footer>
  );
}