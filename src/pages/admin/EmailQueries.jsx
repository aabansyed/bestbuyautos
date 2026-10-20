import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchEmailQueries,
  updateEmailQueryStatus,
  deleteEmailQuery,
} from "../../lib/emailQueriesApi";
import "../../styles/admin-email-queries.css";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "read", label: "Read" },
  { key: "replied", label: "Replied" },
];

const STATUS_LABEL = { new: "New", read: "Read", replied: "Replied" };

function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function whatsappLink(whatsapp, code) {
  let digits = String(whatsapp || "").replace(/\D/g, "");
  if (!digits) return null;
  const codeDigits = String(code || "").replace(/\D/g, "");
  digits = digits.replace(/^0+/, "");
  if (codeDigits && !digits.startsWith(codeDigits)) digits = codeDigits + digits;
  return `https://wa.me/${digits}`;
}

export default function EmailQueries() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setRows(await fetchEmailQueries());
    } catch (e) {
      setError(e.message || "Queries load nahi ho sakin.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const counts = useMemo(() => {
    const c = { all: rows.length, new: 0, read: 0, replied: 0 };
    rows.forEach((r) => { c[r.status] = (c[r.status] || 0) + 1; });
    return c;
  }, [rows]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!q) return true;
      return [r.name, r.email, r.phone, r.whatsapp, r.remarks, r.car_title, r.stock_id]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [rows, filter, search]);

  const setStatus = async (id, status) => {
    const prev = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      await updateEmailQueryStatus(id, status);
    } catch (e) {
      setRows(prev);
      setError(e.message || "Status update nahi ho saka.");
    }
  };

  const toggleOpen = (row) => {
    const opening = openId !== row.id;
    setOpenId(opening ? row.id : null);
    if (opening && row.status === "new") setStatus(row.id, "read");
  };

  const remove = async (id) => {
    if (!window.confirm("Ye query hamesha ke liye delete ho jayegi. Continue?")) return;
    const prev = rows;
    setRows((rs) => rs.filter((r) => r.id !== id));
    try {
      await deleteEmailQuery(id);
    } catch (e) {
      setRows(prev);
      setError(e.message || "Delete nahi ho saka.");
    }
  };

  return (
    <div className="eq-page">
      <div className="eq-head">
        <div>
          <h1 className="eq-title">Email Queries</h1>
          <p className="eq-sub">“Verify via email” form se aayi hui saari queries.</p>
        </div>
        <button type="button" className="eq-btn" onClick={load} disabled={loading}>
          <i className="fas fa-rotate"></i> {loading ? "Loading…" : "Refresh"}
        </button>
      </div>

      <div className="eq-toolbar">
        <div className="eq-filters" role="tablist" aria-label="Status filter">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              className={`eq-filter${filter === f.key ? " is-active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label} <span className="eq-count">{counts[f.key] || 0}</span>
            </button>
          ))}
        </div>
        <input
          type="search"
          className="eq-search"
          placeholder="Name, email, phone ya remarks se dhoondein"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="eq-error" role="alert">{error}</div>}

      {loading && rows.length === 0 ? (
        <div className="eq-empty">Queries load ho rahi hain…</div>
      ) : visible.length === 0 ? (
        <div className="eq-empty">
          {rows.length === 0
            ? "Abhi tak koi email query nahi aayi. Jab koi visitor form bharega to yahan nazar aayegi."
            : "Is filter ya search se koi query match nahi hui."}
        </div>
      ) : (
        <ul className="eq-list">
          {visible.map((r) => {
            const open = openId === r.id;
            const wa = whatsappLink(r.whatsapp, r.phone_code);
            return (
              <li key={r.id} className={`eq-item st-${r.status}${open ? " is-open" : ""}`}>
                <button
                  type="button"
                  className="eq-row"
                  onClick={() => toggleOpen(r)}
                  aria-expanded={open}
                >
                  <span className="eq-avatar">{(r.name || "?").charAt(0).toUpperCase()}</span>
                  <span className="eq-main">
                    <span className="eq-name">{r.name}</span>
                    <span className="eq-email">{r.email}</span>
                    <span className="eq-snippet">{r.remarks}</span>
                  </span>
                  <span className="eq-meta">
                    <span className={`eq-badge st-${r.status}`}>{STATUS_LABEL[r.status] || r.status}</span>
                    <span className="eq-date">{formatDate(r.created_at)}</span>
                  </span>
                </button>

                {open && (
                  <div className="eq-detail">
                    <dl className="eq-grid">
                      <div><dt>Name</dt><dd>{r.name}</dd></div>
                      <div><dt>Email</dt><dd><a href={`mailto:${r.email}`}>{r.email}</a></dd></div>
                      <div>
                        <dt>Phone</dt>
                        <dd>{r.phone ? `${r.phone_code || ""} ${r.phone}`.trim() : "—"}</dd>
                      </div>
                      <div>
                        <dt>WhatsApp</dt>
                        <dd>{r.whatsapp ? r.whatsapp : "—"}</dd>
                      </div>
                      {r.car_title && (
  <div>
    <dt>Vehicle</dt>
    <dd>
      {r.car_title}
      {r.stock_id ? ` (Stock ${r.stock_id})` : ""}
      {r.car_price ? ` · $${Number(r.car_price).toLocaleString()}` : ""}
    </dd>
  </div>
)}  
                    </dl>

                    <div className="eq-remarks-label">Remarks</div>
                    <p className="eq-remarks">{r.remarks}</p>

                    <div className="eq-actions">
                      <a
                        className="eq-btn eq-btn-gold"
                        href={`mailto:${r.email}?subject=${encodeURIComponent("Re: your enquiry at BestBuy Auto")}`}
                        onClick={() => r.status !== "replied" && setStatus(r.id, "replied")}
                      >
                        <i className="fas fa-envelope"></i> Reply by email
                      </a>
                      {wa && (
                        <a className="eq-btn" href={wa} target="_blank" rel="noreferrer">
                          <i className="fab fa-whatsapp"></i> WhatsApp
                        </a>
                      )}
                      {r.status !== "replied" ? (
                        <button type="button" className="eq-btn" onClick={() => setStatus(r.id, "replied")}>
                          <i className="fas fa-check"></i> Mark replied
                        </button>
                      ) : (
                        <button type="button" className="eq-btn" onClick={() => setStatus(r.id, "new")}>
                          <i className="fas fa-rotate-left"></i> Mark as new
                        </button>
                      )}
                      <button type="button" className="eq-btn eq-btn-danger" onClick={() => remove(r.id)}>
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}