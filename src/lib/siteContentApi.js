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
};

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