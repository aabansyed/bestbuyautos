import { supabase } from "./supabase";

export async function fetchPublicFaqs() {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function fetchAllFaqs() {
  return fetchPublicFaqs();
}

export async function createFaq(afterOrder) {
  const { data, error } = await supabase
    .from("faqs")
    .insert([{ question: "New question", answer: "New answer", display_order: afterOrder }])
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