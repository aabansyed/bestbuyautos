import emailjs from "@emailjs/browser";
import { supabase } from "../../lib/supabase";

// NOTE: these are placeholder keys carried over from the original site.
// Replace with real EmailJS credentials to enable live email delivery —
// until then, submitForm() automatically falls back to opening the
// visitor's email client (mailto:), exactly like the original site did.
// Either way, every submission is also saved to Supabase (`inquiries`
// table) so it shows up in the admin dashboard's Queries count.
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

let selectedInquiry = "Stock Car";

function shake(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add("error");
  el.animate(
    [
      { transform: "translateX(-6px)" }, { transform: "translateX(6px)" },
      { transform: "translateX(-4px)" }, { transform: "translateX(4px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 350, easing: "ease-out" }
  );
  setTimeout(() => el.classList.remove("error"), 2000);
}

async function submitForm() {
  const val = (id) => document.getElementById(id)?.value.trim() || "";
  const name = val("fName");
  const email = val("fEmail");
  const phone = val("fPhone");
  const country = document.getElementById("fCountry")?.value || "";
  const car = val("fCar");
  const budget = document.getElementById("fBudget")?.value || "";
  const message = val("fMessage");
  const source = document.getElementById("fSource")?.value || "";
  const privacy = document.getElementById("fPrivacy")?.checked;

  if (!name) { shake("fName"); return window.showToast("Please enter your full name.", "info"); }
  if (!email || !email.includes("@")) { shake("fEmail"); return window.showToast("Please enter a valid email address.", "info"); }
  if (!country) { shake("fCountry"); return window.showToast("Please select your country.", "info"); }
  if (!message) { shake("fMessage"); return window.showToast("Please write your message.", "info"); }
  if (!privacy) { return window.showToast("Please agree to the Privacy Policy to continue.", "info"); }

  const btn = document.getElementById("submitBtn");
  btn?.classList.add("loading");

  // Always save the inquiry to Supabase first, so it's counted on the
  // admin dashboard even if email delivery below fails or isn't configured.
  try {
    await supabase.from("inquiries").insert([{
      inquiry_type: selectedInquiry,
      name, email, phone,
      country, car, budget, message, source,
    }]);
  } catch (dbErr) {
    console.error("Failed to save inquiry to Supabase:", dbErr);
  }

  const templateParams = {
    inquiry_type: selectedInquiry,
    from_name: name,
    from_email: email,
    reply_to: email,
    phone: phone || "Not provided",
    country,
    car_interest: car || "Not specified",
    budget: budget || "Not specified",
    message,
    source: source || "Not specified",
    to_email: "aabansyed48@gmail.com",
  };

  try {
    if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") throw new Error("EmailJS not configured");
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
  } catch (err) {
    const subject = encodeURIComponent(`[BBA Japan] ${selectedInquiry} Inquiry – ${name}`);
    const body = encodeURIComponent(
      `Inquiry Type: ${selectedInquiry}\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nCountry: ${country}\nCar: ${car || "N/A"}\nBudget: ${budget || "N/A"}\n\nMessage:\n${message}\n\nHow they found us: ${source || "N/A"}`
    );
    window.location.href = `mailto:aabansyed48@gmail.com?subject=${subject}&body=${body}`;
  } finally {
    btn?.classList.remove("loading");
    document.getElementById("theForm").style.display = "none";
    document.getElementById("formSuccess").classList.add("show");
    document.getElementById("formWrap")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function resetForm() {
  document.getElementById("theForm").style.display = "block";
  document.getElementById("formSuccess").classList.remove("show");
  ["fName", "fEmail", "fPhone", "fCar", "fMessage"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  ["fCountry", "fBudget", "fSource"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  const priv = document.getElementById("fPrivacy");
  if (priv) priv.checked = false;
  const cc = document.getElementById("charCount");
  if (cc) cc.textContent = "0";
  document.querySelectorAll(".inq-btn").forEach((b, i) => b.classList.toggle("active", i === 0));
  selectedInquiry = "Stock Car";
}

export function initContactPage() {
  try {
    if (EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  } catch (e) { /* not configured yet */ }

  window.submitForm = submitForm;
  window.resetForm = resetForm;

  const inquiryRow = document.getElementById("inquiryRow");
  const onInquiryClick = (e) => {
    const btn = e.target.closest(".inq-btn");
    if (!btn) return;
    document.querySelectorAll(".inq-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedInquiry = btn.dataset.type;
    const carTypes = ["Stock Car", "Auction Car"];
    document.getElementById("carFields").style.display = carTypes.includes(selectedInquiry) ? "grid" : "none";
  };
  inquiryRow?.addEventListener("click", onInquiryClick);

  const msgEl = document.getElementById("fMessage");
  const onInput = function () {
    document.getElementById("charCount").textContent = this.value.length;
  };
  msgEl?.addEventListener("input", onInput);

  return function cleanup() {
    inquiryRow?.removeEventListener("click", onInquiryClick);
    msgEl?.removeEventListener("input", onInput);
  };
}