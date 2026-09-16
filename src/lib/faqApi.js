import { supabase } from "./supabase";

/** page: 'home' (default, flat list) or 'auction' (grouped by category). */
export async function fetchPublicFaqs(page = "home") {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("page", page)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function fetchAllFaqs(page = "home") {
  return fetchPublicFaqs(page);
}

export async function createFaq(afterOrder, page = "home", category = null) {
  const { data, error } = await supabase
    .from("faqs")
    .insert([{ question: "New question", answer: "New answer", display_order: afterOrder, page, category }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateFaq(id, patch) {
  const { data, error } = await supabase.from("faqs").update(patch).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteFaq(id) {
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderFaqs(orderedFaqs) {
  const updates = orderedFaqs.map((f, i) =>
    supabase.from("faqs").update({ display_order: i }).eq("id", f.id)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw failed.error;
}