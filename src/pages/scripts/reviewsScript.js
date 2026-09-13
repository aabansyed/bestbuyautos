import { supabase } from "../../lib/supabase";

export function initReviewsPage() {
  function filterReviews(region, btn) {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    if (btn) btn.classList.add("active");

    const cards = document.querySelectorAll("#reviewsMasonry .review-card");
    let count = 0;
    cards.forEach((card) => {
      if (region === "all" || card.dataset.region === region) { card.style.display = ""; count++; }
      else { card.style.display = "none"; }
    });
    const cEl = document.getElementById("reviewCount");
    if (cEl) cEl.textContent = count;
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  let selectedStars = 0;
  function setStars(n) {
    selectedStars = n;
    const stars = document.querySelectorAll("#starPicker i");
    stars.forEach((s, i) => s.classList.toggle("lit", i < n));
  }

  async function submitReview() {
    const val = (id) => document.getElementById(id)?.value.trim() || "";
    const name = val("rName");
    const email = val("rEmail");
    const country = val("rCountry");
    const car = val("rCar");
    const text = val("rText");
    if (!name || !email || !text || selectedStars === 0) {
      window.showToast("Please fill all fields and select a rating", "info");
      return;
    }
    try {
      await supabase.from("reviews").insert([{
        name, email, country, car,
        rating: selectedStars,
        message: text,
      }]);
      window.showToast("Thank you, " + name + "! Your review is under review. 🌟", "success");
    } catch (err) {
      console.error("Failed to save review to Supabase:", err);
      window.showToast("Something went wrong saving your review. Please try again.", "info");
      return;
    }
    ["rName", "rEmail", "rCountry", "rCar", "rText"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    setStars(0);
  }

  window.filterReviews = filterReviews;
  window.setStars = setStars;
  window.submitReview = submitReview;
}