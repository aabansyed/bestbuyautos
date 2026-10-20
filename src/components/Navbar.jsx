import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

// Active class sirf tab lagegi jab user usi page par ho
const navClass = ({ isActive }) => (isActive ? "active" : "");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobSub, setOpenMobSub] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);
  const toggleMobile = () => setMobileOpen((v) => !v);
  const toggleMobDrop = (id) => setOpenMobSub((prev) => (prev === id ? null : id));

  const openLogin = () => {
    closeMobile();
    window.dispatchEvent(new CustomEvent("open-auth-modal"));
    if (window.location.pathname !== "/") navigate("/");
  };

  return (
    <>
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <Link to="/" className="nav-logo">
          <img
            src="/bba-logo.png"
            alt="BBA Japan Logo"
            className="nav-logo-img"
            style={{ height: 170, alignItems: "center", display: "flex", marginTop: 15 }}
          />
        </Link>

        {/* ── DESKTOP NAV LINKS ── */}
        <ul className="nav-links">
          {/* About Us with MEGA DROPDOWN */}
          <li className="has-dropdown" id="aboutDropdown">
            <NavLink to="/our-company" className={navClass}>
              About Us <i className="fas fa-chevron-down drop-arrow"></i>
            </NavLink>

            <div className="mega-dropdown">
              <div className="mega-grid">
                <Link to="/bank-details" className="mega-item">
                  <div className="mega-icon"><i className="fas fa-university"></i></div>
                  <div className="mega-text">
                    <div className="mega-title">Bank Details</div>
                    <div className="mega-desc">Official BBA Japan bank account details for payments.</div>
                  </div>
                </Link>

                <div className="mega-divider"></div>

                <Link to="/ceo-message" className="mega-item">
                  <div className="mega-icon"><i className="fas fa-user-tie"></i></div>
                  <div className="mega-text">
                    <div className="mega-title">CEO Message</div>
                    <div className="mega-desc">BBA Japan — Excellence in Japanese vehicle exports.</div>
                  </div>
                </Link>

                <div className="mega-divider"></div>

                <Link to="/our-partners" className="mega-item">
                  <div className="mega-icon"><i className="fas fa-handshake"></i></div>
                  <div className="mega-text">
                    <div className="mega-title">Our Partners</div>
                    <div className="mega-desc">Trusted global partners powering BBA Japan's export network.</div>
                  </div>
                </Link>

                <div className="mega-divider"></div>
              </div>
            </div>
          </li>

          {/* Stock Cars with dropdown */}
          <li className="has-dropdown">
            <NavLink to="/stock-cars" className={navClass}>
              Stock Cars <i className="fas fa-chevron-down drop-arrow"></i>
            </NavLink>
            <div className="nav-dropdown">
              <Link to="/auction"><i className="fas fa-car"></i> Auction Cars</Link>
            </div>
          </li>

          <li><NavLink to="/how-to-buy" className={navClass}>How to Buy</NavLink></li>
          <li><NavLink to="/blog" className={navClass}>Blogs</NavLink></li>
          <li><a href="/#testimonials">Reviews</a></li>

          {/* Contact with dropdown */}
          <li className="has-dropdown">
            <NavLink to="/contact-us" className={navClass}>
              Contact Us <i className="fas fa-chevron-down drop-arrow"></i>
            </NavLink>
            <div className="nav-dropdown">
              <Link to="/contact-us"><i className="fas fa-envelope"></i> Contact Us</Link>
              <div className="drop-divider"></div>
              <Link to="/privacy-policy"><i className="fas fa-shield-alt"></i> Privacy & Policy</Link>
            </div>
          </li>
        </ul>

        <div className="nav-actions">
          <div className={`hamburger ${mobileOpen ? "open" : ""}`} onClick={toggleMobile}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`} id="mobileMenu">
        <a href="/#hero" onClick={closeMobile}>Home</a>

        {/* About Us */}
        <div
          className={`mob-parent ${openMobSub === "mobAbout" ? "open" : ""}`}
          onClick={() => toggleMobDrop("mobAbout")}
        >
          About Us <i className="fas fa-chevron-down mob-arrow"></i>
        </div>
        <div className={`mob-sub ${openMobSub === "mobAbout" ? "open" : ""}`}>
          <Link to="/bank-details" onClick={closeMobile}><i className="fas fa-university"></i> Bank Details</Link>
          <Link to="/ceo-message" onClick={closeMobile}><i className="fas fa-user-tie"></i> CEO Message</Link>
          <Link to="/our-partners" onClick={closeMobile}><i className="fas fa-handshake"></i> Our Partners</Link>
        </div>

        {/* Stock Cars */}
        <div
          className={`mob-parent ${openMobSub === "mobStock" ? "open" : ""}`}
          onClick={() => toggleMobDrop("mobStock")}
        >
          Stock Cars <i className="fas fa-chevron-down mob-arrow"></i>
        </div>
        <div className={`mob-sub ${openMobSub === "mobStock" ? "open" : ""}`}>
          <Link to="/stock-cars" onClick={closeMobile}><i className="fas fa-car"></i> All Stock Cars</Link>
          <Link to="/auction" onClick={closeMobile}><i className="fas fa-gavel"></i> Auction Cars</Link>
        </div>

        <Link to="/how-to-buy" onClick={closeMobile}>How to Buy</Link>
        <Link to="/blog" onClick={closeMobile}>Blogs</Link>
        <a href="/#testimonials" onClick={closeMobile}>Reviews</a>

        {/* Contact Us */}
        <div
          className={`mob-parent ${openMobSub === "mobContact" ? "open" : ""}`}
          onClick={() => toggleMobDrop("mobContact")}
        >
          Contact Us <i className="fas fa-chevron-down mob-arrow"></i>
        </div>
        <div className={`mob-sub ${openMobSub === "mobContact" ? "open" : ""}`}>
          <Link to="/contact-us" onClick={closeMobile}><i className="fas fa-envelope"></i> Contact Us</Link>
          <Link to="/privacy-policy" onClick={closeMobile}><i className="fas fa-shield-alt"></i> Privacy & Policy</Link>
        </div>

        <a href="#" onClick={(e) => { e.preventDefault(); openLogin(); }}>
          <i className="fas fa-user"></i> Login / Sign Up
        </a>
      </div>
    </>
  );
}