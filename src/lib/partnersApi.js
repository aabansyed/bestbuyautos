import { supabase } from "./supabase";

export const PARTNER_CATEGORIES = ["shipping", "inspection", "banking", "clearing"];

export async function fetchPublicPartners() {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function fetchAllPartners() {
  return fetchPublicPartners();
}

export async function createPartner(afterOrder) {
  const { data, error } = await supabase
    .from("partners")
    .insert([{
      category: "shipping",
      icon: "🚢",
      accent_color: "#6ab0ff",
      name: "New Partner",
      type_label: "",
      description: "",
      tags: "",
      partner_since: "",
      link_url: "#",
      display_order: afterOrder,
    }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updatePartner(id, patch) {
  const { data, error } = await supabase.from("partners").update(patch).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deletePartner(id) {
  const { error } = await supabase.from("partners").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderPartners(orderedPartners) {
  const updates = orderedPartners.map((p, i) =>
    supabase.from("partners").update({ display_order: i }).eq("id", p.id)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw failed.error;
}