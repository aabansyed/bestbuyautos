import { supabase } from "./supabase";

export async function fetchAllInquiries() {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateInquiryStatus(id, status) {
  const { data, error } = await supabase.from("inquiries").update({ status }).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteInquiry(id) {
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) throw error;
}