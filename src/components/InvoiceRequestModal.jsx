import { useEffect, useRef, useState } from "react";
import { submitInvoiceRequest } from "../lib/invoiceApi";
import "../styles/invoice-request.css";

const EMPTY = {
  full_name: "",
  email: "",
  whatsapp: "",
  vehicle_model: "",
  vehicle_year: "",
};

function validate(v) {
  const errors = {};
  const maxYear = new Date().getFullYear() + 1;

  if (!v.full_name.trim()) errors.full_name = "Please enter your full name.";

  if (!v.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    errors.email = "Enter a valid email address.";

  const digits = v.whatsapp.replace(/\D/g, "");
  if (!v.whatsapp.trim()) errors.whatsapp = "Please enter your WhatsApp number.";
  else if (digits.length < 7 || digits.length > 15)
    errors.whatsapp = "Enter a valid number with country code.";

  if (!v.vehicle_model.trim())
    errors.vehicle_model = "Please tell us which vehicle you want.";

  const year = v.vehicle_year.trim();
  if (!year) errors.vehicle_year = "Required.";
  else if (!/^\d{4}$/.test(year) || Number(year) < 1970 || Number(year) > maxYear)
    errors.vehicle_year = `1970 – ${maxYear}`;

  return errors;
}

function Field({ label, icon, error, children }) {
  return (
    <div className="ir-field">
      <label className="ir-label">
        <i className={`fas ${icon}`}></i> {label} <span className="ir-req">*</span>
      </label>
      {children}
      {error && <div className="ir-err">{error}</div>}
    </div>
  );
}

export default function InvoiceRequestModal({ open, onClose }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState(false);
  const [trap, setTrap] = useState(""); // honeypot - bots hi isay bharte hain

  const firstRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Modal band hone par form reset
  useEffect(() => {
    if (!open) {
      setValues(EMPTY);
      setErrors({});
      setServerError("");
      setSubmitting(false);
      setDone(false);
      setTrap("");
    }
  }, [open]);

  // Escape se band, background scroll lock, pehle field par focus
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  if (!open) return null;

  const set = (key) => (e) => {
    const val = e.target.value;
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (trap) { // bot - chupke se "success" dikha do
      setDone(true);
      return;
    }

    setSubmitting(true);
    setServerError("");
    try {
      await submitInvoiceRequest(values);
      setDone(true);
    } catch (err) {
      setServerError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const cls = (key) => `ir-input${errors[key] ? " invalid" : ""}`;

  return (
    <div
      className="ir-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="irTitle"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="ir-modal">
        <button type="button" className="ir-close" onClick={onClose} aria-label="Close">
          <i className="fas fa-times"></i>
        </button>

        {done ? (
          <div className="ir-success">
            <div className="ir-success-icon"><i className="fas fa-check"></i></div>
            <h3 className="ir-success-title">Request received!</h3>
            <p className="ir-success-text">
              Thank you, {values.full_name.trim().split(" ")[0] || "friend"}. Our team will prepare your
              proforma invoice and contact you on WhatsApp or email shortly.
            </p>
            <button type="button" className="ir-btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="ir-head">
              <div className="ir-head-icon"><i className="fas fa-file-invoice"></i></div>
              <div>
                <h3 className="ir-title" id="irTitle">Request an Invoice</h3>
                <p className="ir-sub">
                  Tell us which vehicle you want and we'll send a proforma invoice with the FOB price
                  and payment instructions.
                </p>
              </div>
            </div>

            <Field label="Full name" icon="fa-user" error={errors.full_name}>
              <input
                ref={firstRef}
                className={cls("full_name")}
                type="text"
                value={values.full_name}
                onChange={set("full_name")}
                placeholder="John Smith"
                maxLength={120}
                autoComplete="name"
              />
            </Field>

            <div className="ir-row">
              <Field label="WhatsApp number" icon="fa-whatsapp" error={errors.whatsapp}>
                <input
                  className={cls("whatsapp")}
                  type="tel"
                  value={values.whatsapp}
                  onChange={set("whatsapp")}
                  placeholder="+1 234 567 8900"
                  maxLength={30}
                  autoComplete="tel"
                />
              </Field>
              <Field label="Email" icon="fa-envelope" error={errors.email}>
                <input
                  className={cls("email")}
                  type="email"
                  value={values.email}
                  onChange={set("email")}
                  placeholder="your@email.com"
                  maxLength={160}
                  autoComplete="email"
                />
              </Field>
            </div>

            <div className="ir-row ir-row-model">
              <Field
                label="Vehicle model you want to import"
                icon="fa-car"
                error={errors.vehicle_model}
              >
                <input
                  className={cls("vehicle_model")}
                  type="text"
                  value={values.vehicle_model}
                  onChange={set("vehicle_model")}
                  placeholder="e.g. Toyota Harrier, white"
                  maxLength={160}
                />
              </Field>
              <Field label="Year" icon="fa-calendar" error={errors.vehicle_year}>
                <input
                  className={cls("vehicle_year")}
                  type="text"
                  inputMode="numeric"
                  value={values.vehicle_year}
                  onChange={set("vehicle_year")}
                  placeholder="2017"
                  maxLength={4}
                />
              </Field>
            </div>

            {/* Honeypot: asli users ko nazar nahi aata */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={trap}
              onChange={(e) => setTrap(e.target.value)}
              className="ir-trap"
              aria-hidden="true"
            />

            {serverError && (
              <div className="ir-server-error">
                <i className="fas fa-circle-exclamation"></i> {serverError}
              </div>
            )}

            <button type="submit" className="ir-btn ir-btn-block" disabled={submitting}>
              {submitting ? (
                <><i className="fas fa-circle-notch fa-spin"></i> Sending…</>
              ) : (
                <><i className="fas fa-paper-plane"></i> Send Request</>
              )}
            </button>
            <p className="ir-note">All fields are required. We never share your details.</p>
          </form>
        )}
      </div>
    </div>
  );
}