import { useEffect, useState } from "react";
import { fetchAllFaqs, createFaq, updateFaq, deleteFaq, reorderFaqs } from "../../lib/faqApi";

const PAGES = [
  { key: "home", label: "Home Page" },
  { key: "auction", label: "Auction Page" },
];

export default function FaqManager() {
  const [page, setPage] = useState("home");
  const [faqs, setFaqs] = useState(null);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [dirty, setDirty] = useState({});

  const load = async (p) => {
    setFaqs(null);
    try {
      setFaqs(await fetchAllFaqs(p));
    } catch (err) {
      setError(err.message || "Failed to load FAQs.");
    }
  };

  useEffect(() => {
    load(page);
  }, [page]);

  const editField = (id, field) => (e) => {
    const value = e.target.value;
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
    setDirty((prev) => ({ ...prev, [id]: true }));
  };

  const handleSave = async (faq) => {
    setBusyId(faq.id);
    try {
      const patch = { question: faq.question, answer: faq.answer };
      if (page === "auction") patch.category = faq.category || "";
      await updateFaq(faq.id, patch);
      setDirty((prev) => ({ ...prev, [faq.id]: false }));
    } catch (err) {
      alert(err.message || "Failed to save.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (faq) => {
    if (!window.confirm(`Delete "${faq.question}"?`)) return;
    setBusyId(faq.id);
    try {
      await deleteFaq(faq.id);
      setFaqs((prev) => prev.filter((f) => f.id !== faq.id));
    } catch (err) {
      alert(err.message || "Failed to delete.");
    } finally {
      setBusyId(null);
    }
  };

  const handleAdd = async () => {
    try {
      const nextOrder = faqs.length ? Math.max(...faqs.map((f) => f.display_order)) + 1 : 0;
      const created = await createFaq(nextOrder, page, page === "auction" ? "General" : null);
      setFaqs((prev) => [...prev, created]);
    } catch (err) {
      alert(err.message || "Failed to add FAQ.");
    }
  };

  const move = async (index, dir) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= faqs.length) return;
    const next = [...faqs];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    setFaqs(next);
    try {
      await reorderFaqs(next);
    } catch (err) {
      alert(err.message || "Failed to reorder.");
      load(page);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>FAQs</h1>
          <p className="admin-page-sub">
            {page === "home"
              ? "Shown in the Home page's \"Frequently Asked Questions\" section, in this order."
              : "Shown in the Auction page's FAQ section, grouped by category."}
          </p>
        </div>
        <button className="admin-btn-primary" onClick={handleAdd} disabled={!faqs}>
          <i className="fas fa-circle-plus"></i> Add FAQ
        </button>
      </div>

      <div className="admin-toolbar">
        {PAGES.map((p) => (
          <button
            key={p.key}
            type="button"
            className={`admin-btn-secondary${page === p.key ? " active" : ""}`}
            style={page === p.key ? { borderColor: "var(--gold)", color: "var(--gold)" } : undefined}
            onClick={() => setPage(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

      {!faqs && !error && (
        <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading…</div>
      )}

      {faqs && faqs.length === 0 && (
        <div className="admin-empty">
          <i className="fas fa-circle-question"></i>
          <p>No FAQs yet — add your first one.</p>
        </div>
      )}

      {faqs && faqs.length > 0 && (
        <div className="faq-admin-list">
          {faqs.map((faq, i) => (
            <div className="faq-admin-card" key={faq.id}>
              <div className="faq-admin-order">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Move up">
                  <i className="fas fa-chevron-up"></i>
                </button>
                <span>{i + 1}</span>
                <button type="button" onClick={() => move(i, 1)} disabled={i === faqs.length - 1} title="Move down">
                  <i className="fas fa-chevron-down"></i>
                </button>
              </div>

              <div className="faq-admin-fields">
                {page === "auction" && (
                  <div className="form-group">
                    <label className="form-label">Category (section heading)</label>
                    <input
                      className="form-input"
                      value={faq.category || ""}
                      onChange={editField(faq.id, "category")}
                      placeholder="e.g. Auction & Bidding FAQ's"
                    />
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label">Question</label>
                  <input className="form-input" value={faq.question} onChange={editField(faq.id, "question")} />
                </div>
                <div className="form-group">
                  <label className="form-label">Answer</label>
                  <textarea className="form-input form-textarea" value={faq.answer} onChange={editField(faq.id, "answer")} />
                </div>
              </div>

              <div className="faq-admin-actions">
                <button
                  type="button"
                  className="admin-btn-primary"
                  onClick={() => handleSave(faq)}
                  disabled={busyId === faq.id || !dirty[faq.id]}
                >
                  <i className="fas fa-save"></i> {dirty[faq.id] ? "Save" : "Saved"}
                </button>
                <button
                  type="button"
                  className="admin-icon-btn danger"
                  onClick={() => handleDelete(faq)}
                  disabled={busyId === faq.id}
                  title="Delete"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}