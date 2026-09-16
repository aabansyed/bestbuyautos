import { useEffect, useMemo, useState, Fragment } from "react";
import { fetchAllInquiries, updateInquiryStatus, deleteInquiry } from "../../lib/inquiriesApi";

const STATUS_OPTIONS = ["new", "contacted", "closed"];

export default function QueriesManager() {
  const [inquiries, setInquiries] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const load = async () => {
    try {
      setInquiries(await fetchAllInquiries());
    } catch (err) {
      setError(err.message || "Failed to load queries.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!inquiries) return [];
    const q = search.toLowerCase();
    return inquiries.filter((inq) => {
      const matchesSearch = !q || `${inq.name} ${inq.email} ${inq.message}`.toLowerCase().includes(q);
      const matchesStatus = !statusFilter || inq.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [inquiries, search, statusFilter]);

  const handleStatusChange = async (inq, status) => {
    setBusyId(inq.id);
    try {
      const updated = await updateInquiryStatus(inq.id, status);
      setInquiries((prev) => prev.map((i) => (i.id === inq.id ? updated : i)));
    } catch (err) {
      alert(err.message || "Failed to update status.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (inq) => {
    if (!window.confirm(`Delete the query from "${inq.name}"? This can't be undone.`)) return;
    setBusyId(inq.id);
    try {
      await deleteInquiry(inq.id);
      setInquiries((prev) => prev.filter((i) => i.id !== inq.id));
    } catch (err) {
      alert(err.message || "Failed to delete.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Queries</h1>
          <p className="admin-page-sub">
            {inquiries ? `${inquiries.length} total · ${inquiries.filter((i) => i.status === "new").length} new` : "Loading…"}
          </p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search name, email or message…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="admin-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

      {!inquiries && !error && (
        <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading queries…</div>
      )}

      {inquiries && filtered.length === 0 && (
        <div className="admin-empty">
          <i className="fas fa-envelope-open"></i>
          <p>No queries match your search.</p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Type</th>
                <th>Country</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inq) => (
                <Fragment key={inq.id}>
                  <tr
                    className={busyId === inq.id ? "is-busy" : ""}
                    style={{ cursor: "pointer" }}
                    onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
                  >
                    <td>
                      <div className="admin-car-name">{inq.name}</div>
                      <div style={{ fontSize: ".76rem", color: "var(--gray)" }}>{inq.email}</div>
                    </td>
                    <td>{inq.inquiry_type || "General"}</td>
                    <td>{inq.country || "—"}</td>
                    <td>{new Date(inq.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <select
                        className="admin-select"
                        style={{ padding: "6px 10px", fontSize: ".78rem" }}
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq, e.target.value)}
                        disabled={busyId === inq.id}
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <div className="admin-row-actions" onClick={(e) => e.stopPropagation()}>
                        <button className="admin-icon-btn" onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)} title="View details">
                          <i className={`fas fa-chevron-${expandedId === inq.id ? "up" : "down"}`}></i>
                        </button>
                        <button className="admin-icon-btn danger" onClick={() => handleDelete(inq)} disabled={busyId === inq.id} title="Delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === inq.id && (
                    <tr>
                      <td colSpan={6} style={{ background: "var(--dark3)", padding: "18px 20px" }}>
                        <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", marginBottom: 12 }}>
                          <div><strong style={{ color: "var(--gold)" }}>Phone:</strong> {inq.phone || "—"}</div>
                          <div><strong style={{ color: "var(--gold)" }}>Car interest:</strong> {inq.car || "—"}</div>
                          <div><strong style={{ color: "var(--gold)" }}>Budget:</strong> {inq.budget || "—"}</div>
                          <div><strong style={{ color: "var(--gold)" }}>Source:</strong> {inq.source || "—"}</div>
                          <div><strong style={{ color: "var(--gold)" }}>Full date:</strong> {new Date(inq.created_at).toLocaleString()}</div>
                        </div>
                        <div style={{ marginBottom: 12 }}>
                          <strong style={{ color: "var(--gold)" }}>Message:</strong>
                          <p style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>{inq.message}</p>
                        </div>
                        <a href={`mailto:${inq.email}`} className="admin-btn-secondary" style={{ textDecoration: "none", display: "inline-flex" }}>
                          <i className="fas fa-reply"></i> Reply via Email
                        </a>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}