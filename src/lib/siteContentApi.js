import { supabase } from "./supabase";

export const CONTENT_DEFAULTS = {
  ceo_name: "Mr. Areeb Iftikhar",
  ceo_role: "CEO, BestBuy Auto Japan · Aichi, Japan",
  ceo_headline: "Welcome to BestBuy Auto Japan",
  ceo_subheading: "Your Global Partner in Premium Japanese Vehicles",
  ceo_body:
    "From the very beginning, our vision has been to make buying and exporting Japanese vehicles a transparent, reliable, and rewarding experience for customers worldwide.\n\nAs a leading Japanese car exporter, we specialize in sourcing premium vehicles directly from verified auctions across Japan.",

  company_hero_badge: "507-20 Shinpo Machi · Aichi, Japan",
  company_hero_desc:
    "For over 16 years, BestBuy Auto Japan has been connecting car buyers across the globe with the finest Japanese vehicles — with transparency, integrity, and world-class service.",
  company_stat_years: "16+",
  company_stat_countries: "120+",
  company_stat_cars: "85K+",

  mission_para1: "Since 2008, BestBuy Auto Japan has operated on one simple principle: every customer deserves a fair deal, complete transparency, and a vehicle they can trust.",
  mission_para2: "We don't just sell cars — we build lasting relationships.",
  mission_repeat_rate: "68%",
  mission_rating: "4.9 / 5",

  // --- Auction page (/auction) ---
  auction_stat_vehicles: "120,000+",
  auction_stat_houses: "150+",
  auction_hero_intro:
    "If you cannot find your desired vehicle in our available stock, BBA Japan Live Auction Service helps you source the exact vehicle directly from Japanese car auction houses. Our expert team assists you throughout the entire process — from vehicle search and auction sheet inspection to bidding, payment, and shipping — ensuring a smooth, secure, and transparent buying experience.",

  auction_feature1_title: "Buying from Japanese Car Auctions Made Simple",
  auction_feature1_text:
    "BBA Japan specializes in Japanese used car auctions, offering professional support to international buyers. Japanese vehicle auctions may seem complex, but with BBA Japan's auction experts, you receive step-by-step guidance to make purchasing easy, reliable, and stress-free.",

  auction_feature2_title: "Access to Over 150 Japanese Auction Houses",
  auction_feature2_intro: "By registering with BBA Japan's Live Auction Service, you gain access to:",
  auction_feature2_list:
    "150+ Japanese auction houses nationwide\n100,000+ vehicles updated weekly\nPassenger cars, SUVs, trucks, vans, and commercial vehicles",
  auction_feature2_outro: "With one of the largest Japanese vehicle inventories, your chances of finding the perfect vehicle increase significantly.",

  auction_feature3_title: "Free Consultation & Auction Sheet Translation",
  auction_feature3_intro: "BBA Japan provides free professional consultation, including:",
  auction_feature3_list:
    "Import regulations by country\nRecommended model year & engine size\nCompliance with local laws\nJapanese auction sheet inspection & translation",
  auction_feature3_outro: "Our specialists help you understand the true condition of the vehicle before you bid.",
  // --- Bank Details page (/bank-details) ---
  bank_company_name: "NEW MOTORS",
  bank_company_address: "Nerima Ku Mianmi Tanaka\n1-13-30 Tokyo Japan.",
  bank_company_phone: "+81 90-5651-8156 (JAPAN) / +81 90-3277-8605 (JAPAN)",
  bank_intro_text:
    "Use the beneficiary details below to send payment via international bank wire transfer. Please double-check every field with your bank before sending, and keep your transfer receipt for our records.",
  bank_name: "MIZUHO BANK LTD",
  bank_branch_code: "237 NERIMA FUJIME DAI",
  bank_address: "3-7-6 Nukui, Nerima-ku, Tokyo, Japan",
  bank_account_name: "NEW MOTORS",
  bank_account_number: "3028366",
  bank_swift_code: "MHCBJPT",
  bank_note: "BOTH SIDE BANK CHARGES WILL BE PAID BY CUSTOMER SIDE",
  bank_image_url: "",
  bank_video_url: "",
  // ---- How to Buy page ----
  htb_hero_tag: "Services",
  htb_hero_title: "How to",
  htb_hero_highlight: "Buy",
  htb_section_subtitle: "Trusted Japanese Used Cars Exporter — Simple & Reliable Buying from Japan",
  htb_section_title: "Buy a Vehicle from Japan with",
  htb_section_highlight: "BestBuy Auto",
  htb_notice_text:
    "Pay the remaining balance within 7 days of arrival. If unpaid, the company reserves the right to resell the vehicle and forfeit the initial deposit.",
  htb_whatsapp_link: "https://wa.me/8190XXXXXXXX",
  htb_quick_steps: JSON.stringify([
    { icon: "https://mdkjapan.com/assets/images/pages/how-to-buy/Select.svg", title: "Select", description: "Choose your ideal vehicle from our wide range of Japanese cars." },
    { icon: "https://mdkjapan.com/assets/images/pages/how-to-buy/Order.svg", title: "Order", description: "Place your order and get a detailed purchase agreement." },
    { icon: "https://mdkjapan.com/assets/images/pages/how-to-buy/Payment.svg", title: "Payment", description: "Pay securely via bank transfer or online methods." },
    { icon: "https://mdkjapan.com/assets/images/pages/how-to-buy/Clearance.svg", title: "Clearance", description: "Hassle-free customs clearance handled by our experts." },
    { icon: "https://mdkjapan.com/assets/images/pages/how-to-buy/Shipment.svg", title: "Shipment", description: "Track your vehicle's journey with live updates." },
    { icon: "https://mdkjapan.com/assets/images/pages/how-to-buy/Delivery.svg", title: "Delivery", description: "Vehicle delivered safely to your chosen port or location." },
  ]),
  htb_detail_steps: JSON.stringify([
    {
      heading: "Create an", highlight: "Account",
      bodyBefore: "Start by registering a free account with BestBuy Auto Japan, a trusted car dealership specializing in used Japanese cars export. Once registered, you can browse thousands of cars for sale, including sedans, SUVs, trucks, hybrids, and authentic Japanese car models.",
      tags: [], bodyAfter: "",
      image: "/how-to-buy-register.png", badgeIcon: "fa-user-plus", badgeText: "Free Registration",
    },
    {
      heading: "Find Used Cars", highlight: "in Japan",
      bodyBefore: "Explore our wide inventory of used cars for sale, sourced directly from Japan. You can search by:",
      tags: ["Make & Model", "Price & Year", "Mileage & Fuel Type"],
      bodyAfter: "Whether you're a dealer looking for bulk units or an individual searching for used cars, BestBuy Auto Japan provides export-ready vehicles at competitive prices.",
      image: "/how-to-buy-2.png", badgeIcon: "fa-search", badgeText: "Thousands of Listings",
    },
    {
      heading: "Reserve Your", highlight: "Vehicle",
      bodyBefore: "Once you find the right used car, click \"Buy Now\" or request a quotation. Our sales team will confirm availability, total cost, and shipping details. We also assist customers looking for rare JDM cars for sale and specialty Japanese vehicles.",
      tags: [], bodyAfter: "",
      image: "/how-to-buy-3.png", badgeIcon: "fa-lock", badgeText: "Secure Your Car",
    },
    {
      heading: "Secure", highlight: "Payment",
      bodyBefore: "Payments are made via international bank transfer. BestBuy Auto Japan ensures a safe transaction process for buyers worldwide searching for cheap used cars from Japan or bulk used Japanese cars export opportunities.",
      tags: [], bodyAfter: "",
      image: "/how-to-buy-4.png", badgeIcon: "fa-shield-alt", badgeText: "100% Safe Transfer",
    },
    {
      heading: "Shipping", highlight: "& Docs",
      bodyBefore: "After payment confirmation, your vehicle is shipped promptly. We provide all required export documents, making BestBuy Auto Japan a reliable partner among global Japanese car exporters.",
      tags: [], bodyAfter: "",
      image: "/how-to-buy-5.png", badgeIcon: "fa-ship", badgeText: "Full Documentation",
    },
    {
      heading: "Clearance", highlight: "& Delivery",
      bodyBefore: "Once the vehicle arrives, complete customs clearance in your country. With BestBuy Auto Japan, buying a Japanese used car is as easy as working with a local car dealership — just with better prices and a wider selection.",
      tags: [], bodyAfter: "",
      image: "/how-to-buy-6.png", badgeIcon: "fa-check-circle", badgeText: "Drive Your Dream!",
    },
  ]),

  // ---- Our Company page ----
  oc_values_tag: "Our Values",
  oc_values_title: "What",
  oc_values_title_gold: "Drives Us",
  oc_values: JSON.stringify([
    { icon: "fa-handshake", title: "Integrity First", desc: "We never misrepresent a vehicle's condition, history, or price. Honest deals, always." },
    { icon: "fa-users", title: "Customer-Centric", desc: "Every decision we make is filtered through one question: is this best for our customer?" },
    { icon: "fa-search", title: "Transparency", desc: "Full disclosure on mileage, inspection grades, accident history, and all costs upfront." },
    { icon: "fa-rocket", title: "Excellence", desc: "We set the highest standards in vehicle sourcing, logistics, and post-sale support." },
    { icon: "fa-leaf", title: "Sustainability", desc: "Promoting hybrid and EV adoption to reduce global carbon footprint, one export at a time." },
  ]),

  oc_team_tag: "Our People",
  oc_team_title: "Meet the",
  oc_team_title_gold: "Leadership",
  oc_team_desc: "The passionate team behind Japan's most trusted export platform.",
  oc_team: JSON.stringify([
    { initials: "TK", name: "Takeshi Kimura", role: "Founder & CEO", desc: "16+ years in the Japanese automotive export industry. Built BBA Japan from the ground up with a vision of accessible, honest car exports worldwide.", linkedin: "#", twitter: "#", whatsapp: "" },
    { initials: "AY", name: "Aiko Yamamoto", role: "Head of Operations", desc: "Logistics and export specialist with 12 years of experience managing container shipments to 60+ countries simultaneously.", linkedin: "#", twitter: "", whatsapp: "" },
    { initials: "RO", name: "Ravi Okafor", role: "Africa Regional Director", desc: "Oversees operations and partnerships across 30 African countries. Fluent in English, Swahili, and Japanese. Based in Nairobi.", linkedin: "#", twitter: "", whatsapp: "#" },
    { initials: "MH", name: "Mohammed Al-Harbi", role: "Middle East Director", desc: "Manages GCC and MENA market operations from Dubai. Specialist in luxury and premium vehicle procurement and export.", linkedin: "#", twitter: "", whatsapp: "" },
  ]),

  oc_partners_tag: "Our Network",
  oc_partners_title: "Trusted",
  oc_partners_title_gold: "Global Partners",
  oc_partners_desc: "We work with the most reputable shipping lines, auction houses, and customs agents worldwide.",
  oc_partners: JSON.stringify([
    { icon: "🏢", name: "USS Auctions", country: "Japan — #1 Auto Auction" },
    { icon: "🚢", name: "MOL Shipping", country: "Japan — Freight Partner" },
    { icon: "🚢", name: "Nippon Yusen", country: "Japan — RO-RO Carrier" },
    { icon: "🏦", name: "SMBC Japan", country: "Japan — Banking Partner" },
    { icon: "🔍", name: "JAAI Inspectors", country: "Japan — Vehicle Inspection" },
    { icon: "📦", name: "DP World", country: "UAE — Port Operations" },
  ]),

  oc_awards_tag: "Recognition",
  oc_awards_title: "Awards &",
  oc_awards_title_gold: "Certifications",
  oc_awards: JSON.stringify([
    { icon: "fa-trophy", title: "Best Export Company", year: "JAAI Export Awards · 2023" },
    { icon: "fa-shield-alt", title: "ISO 9001:2015 Certified", year: "Quality Management System" },
    { icon: "fa-star", title: "Top Rated Exporter", year: "Trustpilot · 4.9/5 · 3,200+ Reviews" },
    { icon: "fa-certificate", title: "JUMVEA Registered", year: "Japan Used Motor Vehicle Exporters" },
  ]),

  oc_timeline_tag: "How It Works",
  oc_timeline_title: "From Japan to",
  oc_timeline_title_gold: "Your Doorstep",
  oc_timeline_desc: "A transparent, end-to-end journey — no surprises, no hidden costs.",
  oc_timeline: JSON.stringify([
    { tag: "Step 01 — Discovery", title: "Browse & Select Your Vehicle", desc: "Explore thousands of verified vehicles on our platform. Filter by brand, year, price, body type, and more. Each listing includes full specs, inspection grades, and high-resolution photos.", points: ["5,000+ live stock listings updated daily", "Auction car sourcing on request", "WeTalk & WhatsApp support available 24/7"] },
    { tag: "Step 02 — Negotiation", title: "Get the Best Price", desc: "We encourage negotiation. Submit your target price and our team responds within 24 hours. Fleet buyers enjoy additional discounts and dedicated account management.", points: ["Direct negotiation with export team", "Fleet discounts for 3+ vehicles", "24-hour response guarantee"] },
    { tag: "Step 03 — Payment", title: "Secure Your Purchase", desc: "Pay via Bank Transfer (T/T) or Letter of Credit (LC). A 20% deposit secures the vehicle immediately. Balance payable before loading. Full commercial invoice issued instantly.", points: ["Bank Transfer (T/T) — most popular", "Letter of Credit (LC) for fleet buyers", "Official commercial invoice & receipt"] },
    { tag: "Step 04 — Pre-Export", title: "Vehicle Preparation", desc: "We deregister the vehicle from Japan's system, conduct a final inspection, thoroughly clean it, and prepare all export documentation. Your vehicle is then loaded into a container or placed on RO-RO vessel.", points: ["Japanese de-registration (Sakujo)", "Pre-export physical inspection", "Container or RO-RO loading at Yokohama Port"] },
    { tag: "Step 05 — Shipping", title: "Set Sail with Live Tracking", desc: "Your vehicle departs from Yokohama, Osaka, or Nagoya port. We send you the Bill of Lading, container number, and vessel name. Real-time tracking updates via email and dashboard.", points: ["Bill of Lading (BL) issued immediately", "Live container tracking link provided", "ETD/ETA updates via email"] },
    { tag: "Step 06 — Arrival", title: "Customs & Delivery 🎉", desc: "We supply all required customs documents for seamless clearance in your country. Collect your vehicle at the destination port or request door delivery. Your BBA journey is complete!", points: ["Full customs documentation package", "Port-to-door delivery available", "Post-delivery support & warranty options"] },
  ]),

  oc_inspection_tag: "Quality Control",
  oc_inspection_title: "Our",
  oc_inspection_title_gold: "Inspection Standard",
  oc_inspection_desc: "Every vehicle passes our 50-point inspection before being listed. We use the JAAI grading system — Japan's gold standard for used vehicle evaluation.",
  oc_inspection_items: JSON.stringify([
    { label: "Engine condition & oil checks" },
    { label: "Transmission & gearbox test" },
    { label: "Brake system & ABS function" },
    { label: "Exterior body panel assessment" },
    { label: "Interior condition & electronics" },
    { label: "Tyre tread depth & wheel alignment" },
    { label: "Air conditioning & climate control" },
    { label: "Accident history & chassis inspection" },
    { label: "Odometer authenticity verification" },
    { label: "Safety systems (SRS, seatbelts)" },
  ]),
  oc_grade_label: "JAAI Grade System",
  oc_grade_display: "4.5",
  oc_grade_sub: "Average Stock Grade (Max: 5)",
  oc_grade_bars: JSON.stringify([
    { label: "Grade 5 (Excellent)", percent: 28 },
    { label: "Grade 4.5 (Very Good)", percent: 42 },
    { label: "Grade 4 (Good)", percent: 22 },
    { label: "Grade 3.5 & Below", percent: 8 },
  ]),
  oc_grade_legend: JSON.stringify([
    { grade: "Grade 5:", meaning: "Like new, no visible defects" },
    { grade: "Grade 4-4.5:", meaning: "Excellent condition, minor wear" },
    { grade: "Grade 3-3.5:", meaning: "Good condition, normal use marks" },
  ]),

  oc_documents_tag: "Documentation",
  oc_documents_title: "Documents",
  oc_documents_title_gold: "You Receive",
  oc_documents_desc: "Complete documentation is standard with every export. No extras, no surprises.",
  oc_documents: JSON.stringify([
    { icon: "fa-file-alt", name: "Export Certificate (Sakujo)", note: "Japanese de-registration confirmation" },
    { icon: "fa-ship", name: "Bill of Lading (BL)", note: "Shipping contract & ownership transfer" },
    { icon: "fa-receipt", name: "Commercial Invoice", note: "For customs clearance in your country" },
    { icon: "fa-box", name: "Packing List", note: "Container contents declaration" },
    { icon: "fa-clipboard-check", name: "Inspection Report", note: "JAAI graded vehicle assessment" },
    { icon: "fa-tachometer-alt", name: "Odometer Declaration", note: "Certified mileage confirmation" },
    { icon: "fa-shield-alt", name: "Insurance Certificate", note: "Marine cargo insurance (on request)" },
    { icon: "fa-camera", name: "Pre-Shipment Photos", note: "Full condition photo set before loading" },
  ]),

  oc_guarantees_tag: "Our Commitment",
  oc_guarantees_title: "The",
  oc_guarantees_title_gold: "BBA Guarantee",
  oc_guarantees: JSON.stringify([
    { icon: "fa-shield-alt", title: "Verified Stock Promise", desc: "Every listed vehicle is physically located in Japan and available. No phantom listings, ever." },
    { icon: "fa-lock", title: "Deposit Protection", desc: "Your deposit is fully refundable if the vehicle doesn't match its described condition at the point of sale." },
    { icon: "fa-shipping-fast", title: "On-Time Shipping", desc: "95%+ of our shipments depart on the agreed ETD. We communicate proactively if any delay occurs." },
    { icon: "fa-headset", title: "24/7 Post-Sale Support", desc: "Our team doesn't disappear after you pay. We support you through customs clearance and beyond." },
  ]),

  oc_cta_title: "Ready to Import Your",
  oc_cta_title_gold: "Dream Car?",
  oc_cta_desc: "Join 85,000+ satisfied customers who trust BestBuy Auto Japan for their vehicle imports",
  oc_whatsapp_link: "https://wa.me/8190XXXXXXXX?text=Hi%2C%20I'm%20interested%20in%20a%20car%20from%20BestBuy%20Auto",
};

// site_content stores everything as text, so the two How-to-Buy step lists
// are kept as JSON strings under one key each. These helpers give callers a
// real array back and never throw on bad/missing JSON.
export function getHtbQuickSteps(content) {
  try {
    return JSON.parse(content.htb_quick_steps || CONTENT_DEFAULTS.htb_quick_steps);
  } catch {
    return JSON.parse(CONTENT_DEFAULTS.htb_quick_steps);
  }
}

export function getHtbDetailSteps(content) {
  try {
    return JSON.parse(content.htb_detail_steps || CONTENT_DEFAULTS.htb_detail_steps);
  } catch {
    return JSON.parse(CONTENT_DEFAULTS.htb_detail_steps);
  }
}

// ---- generic JSON-array getter for the Our Company lists below ----
function jsonListGetter(key) {
  return (content) => {
    try {
      return JSON.parse(content[key] || CONTENT_DEFAULTS[key]);
    } catch {
      return JSON.parse(CONTENT_DEFAULTS[key]);
    }
  };
}

export const getOcValues = jsonListGetter("oc_values");
export const getOcTeam = jsonListGetter("oc_team");
export const getOcPartners = jsonListGetter("oc_partners");
export const getOcAwards = jsonListGetter("oc_awards");
export const getOcTimeline = jsonListGetter("oc_timeline");
export const getOcInspectionItems = jsonListGetter("oc_inspection_items");
export const getOcGradeBars = jsonListGetter("oc_grade_bars");
export const getOcGradeLegend = jsonListGetter("oc_grade_legend");
export const getOcDocuments = jsonListGetter("oc_documents");
export const getOcGuarantees = jsonListGetter("oc_guarantees");

export async function fetchSiteContent() {
  const { data, error } = await supabase.from("site_content").select("key, value");
  if (error) throw error;
  const map = { ...CONTENT_DEFAULTS };
  (data || []).forEach((row) => { map[row.key] = row.value; });
  return map;
}

export async function saveSiteContent(updates) {
  const rows = Object.entries(updates).map(([key, value]) => ({ key, value }));
  const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
  if (error) throw error;
}