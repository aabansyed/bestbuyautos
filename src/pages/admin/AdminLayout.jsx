import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";

const NAV_ITEMS = [
  { to: "/admin", end: true, icon: "fa-gauge", label: "Overview" },
  { to: "/admin/cars", icon: "fa-car", label: "Cars" },
  { to: "/admin/cars/new", icon: "fa-circle-plus", label: "Add Car" },
  { to: "/admin/catalog", icon: "fa-tags", label: "Makes, Models & Body Types" },
  { to: "/admin/auction-cars", icon: "fa-gavel", label: "Auction Cars" },
  { to: "/admin/auction-cars/new", icon: "fa-circle-plus", label: "Add Auction Listing" },
  { to: "/admin/company", icon: "fa-file-lines", label: "Company Info" },
  { to: "/admin/faqs", icon: "fa-circle-question", label: "FAQs" },
  { to: "/admin/banner", icon: "fa-images", label: "Hero Banner" },
  { to: "/admin/media", icon: "fa-photo-film", label: "Media Library" },
  { to: "/admin/partners", icon: "fa-handshake", label: "Our Partners" },
  { to: "/admin/blog", icon: "fa-newspaper", label: "Blog Posts" },
  { to: "/admin/how-to-buy", icon: "fa-route", label: "How to Buy" },
  { to: "/admin/privacy-policy", icon: "fa-file-shield", label: "Privacy Policy" },
  { to: "/admin/our-company", icon: "fa-building", label: "Our Company" },
  { to: "/admin/banking", icon: "fa-building-columns", label: "Bank Details" },
  { to: "/admin/gallery", icon: "fa-images", label: "Photo Gallery" },
  { to: "/admin/settings", icon: "fa-sliders", label: "Site Settings" },
  { to: "/admin/queries", icon: "fa-envelope", label: "Queries" },
  { to: "/admin/email-queries", icon: "fa-envelope-open-text", label: "Email Queries" },
  { to: "/admin/invoice-requests", icon: "fa-file-invoice", label: "Request Invoice Queries" },
];

export default function AdminLayout() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close the drawer whenever the route changes (link click, back button, etc.)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  const initials = session?.user?.email?.[0]?.toUpperCase() || "A";
  const activeItem = NAV_ITEMS.find((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)
  );

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <button className="admin-hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open admin menu">
          <i className="fas fa-bars"></i>
        </button>
        <div className="admin-topbar-title">
          <img src="/bba-logo.png" alt="BBA Japan" className="admin-topbar-logo" />
          <span>{activeItem?.label || "Admin Panel"}</span>
        </div>
        <div className="admin-user-avatar admin-topbar-avatar">{initials}</div>
      </header>

      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      <aside className={`admin-sidebar${sidebarOpen ? " is-open" : ""}`}>
        <div className="admin-sidebar-logo">
          <img src="/bba-logo.png" alt="BBA Japan" className="admin-sidebar-logo-img" />
          <div className="admin-sidebar-logo-text">
            <div className="admin-sidebar-logo-title">BBA Japan</div>
            <div className="admin-sidebar-logo-sub">Admin Panel</div>
          </div>
          <button className="admin-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close admin menu">
            <i className="fas fa-xmark"></i>
          </button>
        </div>

        <div className="admin-sidebar-nav">
          <div className="admin-sidebar-section-label">Admin Portal</div>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => "admin-nav-link" + (isActive ? " active" : "")}
            >
              <span className="admin-nav-icon"><i className={`fas ${item.icon}`}></i></span>
              <span className="admin-nav-label">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer" className="admin-nav-link admin-nav-link-muted">
            <span className="admin-nav-icon"><i className="fas fa-arrow-up-right-from-square"></i></span>
            <span className="admin-nav-label">View Site</span>
          </a>

          <div className="admin-sidebar-user">
            <div className="admin-user-avatar">{initials}</div>
            <div className="admin-user-info">
              <div className="admin-user-email">{session?.user?.email}</div>
              <div className="admin-user-role">Administrator</div>
            </div>
          </div>

          <button className="admin-logout-btn" onClick={handleLogout}>
            <i className="fas fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}