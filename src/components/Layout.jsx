import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AOS from "aos";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { initGlobalScript } from "../utils/globalScript";

export default function Layout() {
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");

  const location = useLocation();

  useEffect(() => {
    initGlobalScript();
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic", offset: 80 });
    window.AOS = AOS;

    const t = setTimeout(() => setLoaderHidden(true), 1400);

    const onScroll = () => {
      const nav = document.getElementById("navbar");
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
      const bar = document.getElementById("scrollProgress");
      if (bar) {
        const prog = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = `${prog}%`;
      }
    };
    window.addEventListener("scroll", onScroll);

    const openAuth = () => setAuthOpen(true);
    window.addEventListener("open-auth-modal", openAuth);

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("open-auth-modal", openAuth);
    };
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, [location.pathname]);

  return (
    <>
      {/* Loader */}
      <div id="loader" className={loaderHidden ? "hidden" : ""}>
        <div style={{ textAlign: "center" }}>
          <div className="loader-logo">⚡ BBA JAPAN</div>
          <div style={{ fontSize: ".75rem", color: "var(--gray)", letterSpacing: "3px", marginTop: 6 }}>
            JAPANESE CAR EXPORTER
          </div>
          <div className="loader-bar" style={{ alignItems: "center" }}>
            <div className="loader-fill"></div>
          </div>
        </div>
      </div>

      {/* Scroll Progress */}
      <div className="scroll-progress" id="scrollProgress"></div>

      {/* Notice Marquee */}
      <div className="marquee-bar">
        <div className="marquee-label">
          <i className="fas fa-triangle-exclamation"></i> Notice
        </div>
        <div className="marquee-track-wrap">
          <div className="marquee-track">
            <span>
              <i className="fas fa-shield-halved"></i>
              For all payments and customer support, please use only the banking details and contact number
              provided on our website. Any communication or payment to other numbers will not be the
              responsibility of BestBuy Auto.
              &nbsp;&nbsp;&nbsp;
              <i className="fas fa-car"></i>
              &nbsp;&nbsp;&nbsp;
              For all payments and customer support, please use only the banking details and contact number
              provided on our website. Any communication or payment to other numbers will not be the
              responsibility of BestBuy Auto.
              &nbsp;&nbsp;&nbsp;
              <i className="fas fa-shield-halved"></i>
              &nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>

      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-left">
          <div className="social-icons">
            <a href="https://www.facebook.com/NO1BESTBUYAUTO/"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/no1bestbuyauto"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="tb-divider"></div>
          <div className="topbar-dropdowns">
            <div className="tb-dropdown">
              <i className="fas fa-dollar-sign"></i> USD <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
        <div className="topbar-right">
          <a href="#" className="tb-btn"><i className="fas fa-user"></i> Register</a>
          <a href="#" className="tb-btn" onClick={(e) => { e.preventDefault(); setAuthOpen(true); }}>
            <i className="fas fa-arrow-right-to-bracket"></i> Login
          </a>
        </div>
      </div>

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      {/* Auth Modal */}
      <div className={`modal-overlay ${authOpen ? "active" : ""}`} id="authModal">
        <div className="modal" style={{ maxWidth: 460 }}>
          <div className="modal-header">
            <div className="modal-title">👤 My Account</div>
            <button className="modal-close" onClick={() => setAuthOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body">
            <div className="auth-tabs">
              <button className={`auth-tab ${authTab === "login" ? "active" : ""}`} onClick={() => setAuthTab("login")}>Login</button>
              <button className={`auth-tab ${authTab === "signup" ? "active" : ""}`} onClick={() => setAuthTab("signup")}>Sign Up</button>
            </div>
            <div className={`auth-form ${authTab === "login" ? "active" : ""}`} id="loginForm">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" type="password" placeholder="••••••••" />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <a href="#" style={{ fontSize: ".82rem", color: "var(--gold)", textDecoration: "none" }}>Forgot password?</a>
              </div>
              <button
                className="btn-submit"
                onClick={() => { setAuthOpen(false); window.showToast && window.showToast("Welcome back! You are logged in. 👋", "success"); }}
              >
                <i className="fas fa-sign-in-alt"></i> Login
              </button>
              <p style={{ textAlign: "center", marginTop: 16, fontSize: ".82rem", color: "var(--gray)" }}>
                New here? <a href="#" style={{ color: "var(--gold)" }} onClick={(e) => { e.preventDefault(); setAuthTab("signup"); }}>Create account</a>
              </p>
            </div>
            <div className={`auth-form ${authTab === "signup" ? "active" : ""}`} id="signupForm">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" type="text" placeholder="John Smith" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Country</label>
                <select className="form-input" defaultValue="">
                  <option value="">Select country…</option>
                  <option>Tanzania</option><option>Kenya</option><option>Nigeria</option>
                  <option>UAE</option><option>Saudi Arabia</option><option>New Zealand</option>
                  <option>Australia</option><option>UK</option><option>USA</option><option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" type="password" placeholder="Minimum 8 characters" />
              </div>
              <button
                className="btn-submit"
                onClick={() => { setAuthOpen(false); window.showToast && window.showToast("Account created! Welcome to BestBuy Auto 🎉", "success"); }}
              >
                <i className="fas fa-user-plus"></i> Create Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className="toast" id="toast">
        <i className="fas fa-check-circle"></i>
        <span id="toastMsg"></span>
      </div>
    </>
  );
}
