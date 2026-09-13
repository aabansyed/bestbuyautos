import { supabase } from "./supabase";

export async function getCarsCount() {
  const { count, error } = await supabase.from("cars").select("*", { count: "exact", head: true });
  if (error) throw error;
  return count || 0;
}

export async function getBodyTypeBreakdown() {
  const { data, error } = await supabase.from("cars").select("body");
  if (error) throw error;
  const counts = {};
  (data || []).forEach((row) => {
    counts[row.body] = (counts[row.body] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([body, count]) => ({ body, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getReviewsCount() {
  const { count, error } = await supabase.from("reviews").select("*", { count: "exact", head: true });
  if (error) throw error;
  return count || 0;
}

export async function getInquiriesCount() {
  const { count, error } = await supabase.from("inquiries").select("*", { count: "exact", head: true });
  if (error) throw error;
  return count || 0;
}

export async function getRecentInquiries(limit = 5) {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function getRecentReviews(limit = 5) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}