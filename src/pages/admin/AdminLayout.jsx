import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";
const NAV_ITEMS = [
  { to: "/admin", end: true, icon: "fa-gauge", label: "Overview" },
  { to: "/admin/cars", icon: "fa-car", label: "Cars" },
  { to: "/admin/cars/new", icon: "fa-circle-plus", label: "Add Car" },
  { to: "/admin/company", icon: "fa-file-lines", label: "Company Info" },
  { to: "/admin/faqs", icon: "fa-circle-question", label: "FAQs" },
  { to: "/admin/banner", icon: "fa-images", label: "Hero Banner" },
  { to: "/admin/partners", icon: "fa-handshake", label: "Our Partners" },
  { to: "/admin/blog", icon: "fa-newspaper", label: "Blog Posts" },
];

export default function AdminLayout() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  const initials = session?.user?.email?.[0]?.toUpperCase() || "A";

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <img src="/bba-logo.png" alt="BBA Japan" className="admin-sidebar-logo-img" />
          <div className="admin-sidebar-logo-text">
            <div className="admin-sidebar-logo-title">BBA Japan</div>
            <div className="admin-sidebar-logo-sub">Admin Panel</div>
          </div>
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