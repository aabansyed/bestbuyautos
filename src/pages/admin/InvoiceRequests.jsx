import { useEffect, useMemo, useState } from "react";
import {
  fetchInvoiceRequests,
  updateInvoiceRequestStatus,
  deleteInvoiceRequest,
} from "../../lib/invoiceApi";
import "../../styles/invoice-request.css";

const STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function InvoiceRequests() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setRefreshing(true);
    try {
      setRows(await fetchInvoiceRequests());
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load requests.");
      setRows((prev) => prev || []);
    } finally {
      setRefreshing(false);
    }
  }

  const counts = useMemo(() => {
    const c = { all: 0, new: 0, contacted: 0, closed: 0 };
    (rows || []).forEach((r) => {
      c.all += 1;
      if (c[r.status] !== undefined) c[r.status] += 1;
    });
    return c;
  }, [rows]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (rows || []).filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!q) return true;
      return [r.full_name, r.email, r.whatsapp, r.vehicle_model, r.vehicle_year]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [rows, filter, query]);

  const handleStatus = async (row, status) => {
    const previous = row.status;
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status } : r)));
    try {
      await updateInvoiceRequestStatus(row.id, status);
    } catch (err) {
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: previous } : r)));
      setError(err.message || "Failed to update status.");
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete the request from ${row.full_name}?`)) return;
    try {
      await deleteInvoiceRequest(row.id);
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    } catch (err) {
      setError(err.message || "Failed to delete request.");
    }
  };

  if (!rows) {
    return (
      <div className="admin-empty">
        <i className="fas fa-circle-notch fa-spin"></i> Loading…
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Request Invoice Queries</h1>
          <p className="admin-page-sub">
            Customers who asked for a proforma invoice from the website.
            {counts.new > 0 && ` ${counts.new} new.`}
          </p>
        </div>
        <button className="admin-btn-primary" onClick={load} disabled={refreshing}>
          <i className={`fas fa-rotate${refreshing ? " fa-spin" : ""}`}></i> Refresh
        </button>
      </div>

      {error && (
        <div className="admin-auth-error">
          <i className="fas fa-circle-exclamation"></i> {error}
        </div>
      )}

      <div className="ir-toolbar">
        <div className="ir-tabs">
          {[{ value: "all", label: "All" }, ...STATUSES].map((t) => (
            <button
              key={t.value}
              type="button"
              className={`ir-tab${filter === t.value ? " active" : ""}`}
              onClick={() => setFilter(t.value)}
            >
              {t.label} <span className="ir-tab-count">{counts[t.value]}</span>
            </button>
          ))}
        </div>
        <div className="ir-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search name, email, vehicle…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="admin-empty">
          <i className="fas fa-file-invoice"></i>
          <p>
            {rows.length === 0
              ? "No invoice requests yet. They will appear here when customers submit the form."
              : "No requests match your filter."}
          </p>
        </div>
      ) : (
        <div className="ir-table-wrap">
          <table className="ir-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Contact</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => {
                const waDigits = (r.whatsapp || "").replace(/\D/g, "");
                return (
                  <tr key={r.id} className={r.status === "new" ? "ir-row-new" : ""}>
                    <td className="ir-cell-date">{formatDate(r.created_at)}</td>
                    <td className="ir-cell-name">{r.full_name}</td>
                    <td>
                      <div className="ir-cell-vehicle">{r.vehicle_model}</div>
                      <div className="ir-cell-year">{r.vehicle_year}</div>
                    </td>
                    <td>
                      <a className="ir-link" href={`mailto:${r.email}`}>
                        <i className="fas fa-envelope"></i> {r.email}
                      </a>
                      <a
                        className="ir-link ir-link-wa"
                        href={`https://wa.me/${waDigits}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-whatsapp"></i> {r.whatsapp}
                      </a>
                    </td>
                    <td>
                      <select
                        className={`ir-status ir-status-${r.status}`}
                        value={r.status}
                        onChange={(e) => handleStatus(r, e.target.value)}
                      >
                        {STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="ir-icon-btn"
                        onClick={() => handleDelete(r)}
                        title="Delete request"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}