import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";
import {
  getCarsCount,
  getBodyTypeBreakdown,
  getReviewsCount,
  getInquiriesCount,
  getRecentInquiries,
} from "../../lib/statsApi";

const STAT_ICONS = {
  cars: "fa-car",
  body: "fa-shapes",
  reviews: "fa-star",
  queries: "fa-envelope",
};

export default function Overview() {
  const { session } = useAuth();
  const [stats, setStats] = useState(null);
  const [breakdown, setBreakdown] = useState([]);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [carsCount, bodyBreakdown, reviewsCount, inquiriesCount, recent] = await Promise.all([
          getCarsCount(),
          getBodyTypeBreakdown(),
          getReviewsCount(),
          getInquiriesCount(),
          getRecentInquiries(5),
        ]);
        setStats({
          cars: carsCount,
          bodyTypes: bodyBreakdown.length,
          reviews: reviewsCount,
          queries: inquiriesCount,
        });
        setBreakdown(bodyBreakdown);
        setRecentInquiries(recent);
      } catch (err) {
        setError(err.message || "Failed to load dashboard stats.");
      }
    })();
  }, []);

  const adminName = session?.user?.email?.split("@")[0]?.toUpperCase() || "ADMIN";
  const maxCount = Math.max(1, ...breakdown.map((b) => b.count));

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Welcome back, {adminName}</h1>
          <p className="admin-page-sub">Everything happening across BestBuy Auto's stock inventory.</p>
        </div>
        <Link to="/admin/cars/new" className="admin-btn-primary">
          <i className="fas fa-circle-plus"></i> Add Car
        </Link>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

      <div className="admin-stat-grid">
        <StatCard featured icon={STAT_ICONS.cars} label="Total Cars Listed" value={stats?.cars} sub="Across all body types" />
        <StatCard icon={STAT_ICONS.body} label="Body Types" value={stats?.bodyTypes} sub="Distinct categories in stock" />
        <StatCard icon={STAT_ICONS.reviews} label="Reviews" value={stats?.reviews} sub="Customer submissions" />
        <StatCard icon={STAT_ICONS.queries} label="Queries" value={stats?.queries} sub="Contact form inquiries" />
      </div>

      <div className="admin-overview-grid">
        <div className="admin-panel">
          <div className="admin-panel-title">Cars by Body Type</div>
          <p className="admin-panel-sub">Live breakdown of your current stock inventory.</p>

          {breakdown.length === 0 && stats && (
            <div className="admin-empty" style={{ padding: "30px 0" }}>
              <i className="fas fa-car-side"></i>
              <p>No cars added yet.</p>
            </div>
          )}

          <div className="admin-breakdown-list">
            {breakdown.map((b) => (
              <div className="admin-breakdown-row" key={b.body}>
                <span className="admin-breakdown-label">{b.body}</span>
                <div className="admin-breakdown-bar-wrap">
                  <div className="admin-breakdown-bar" style={{ width: `${(b.count / maxCount) * 100}%` }}></div>
                </div>
                <span className="admin-breakdown-count">{b.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-title">Recent Queries</div>
          <p className="admin-panel-sub">Latest contact form submissions.</p>

          {recentInquiries.length === 0 && stats && (
            <div className="admin-empty" style={{ padding: "30px 0" }}>
              <i className="fas fa-envelope-open"></i>
              <p>No queries yet.</p>
            </div>
          )}

          <div className="admin-recent-list">
            {recentInquiries.map((inq) => (
              <div className="admin-recent-item" key={inq.id}>
                <div className="admin-recent-avatar">{inq.name?.[0]?.toUpperCase() || "?"}</div>
                <div className="admin-recent-body">
                  <div className="admin-recent-name">{inq.name}</div>
                  <div className="admin-recent-meta">{inq.inquiry_type || "General"} · {inq.country || "—"}</div>
                </div>
                <div className="admin-recent-time">
                  {new Date(inq.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, featured = false }) {
  const displayValue = useCountUp(value);
  return (
    <div className={"admin-stat-card" + (featured ? " is-featured" : "")}>
      <div className="admin-stat-card-top">
        <span className="admin-stat-label">{label}</span>
        <span className="admin-stat-icon"><i className={`fas ${icon}`}></i></span>
      </div>
      <div className="admin-stat-value">{value === undefined || value === null ? "—" : displayValue}</div>
      <div className="admin-stat-sub">{sub}</div>
    </div>
  );
}

// Small, deliberate motion moment on dashboard load: counts up to the real
// value once, instead of the number just appearing.
function useCountUp(value, duration = 700) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === undefined || value === null) return;
    let raf;
    const start = performance.now();
    const from = 0;
    const to = Number(value) || 0;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return display;
}