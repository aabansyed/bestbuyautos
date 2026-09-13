import { supabase } from "./supabase";

export async function fetchPublicSlides() {
  const { data, error } = await supabase
    .from("banner_slides")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function fetchAllSlides() {
  return fetchPublicSlides();
}

export async function createSlide(afterOrder) {
  const { data, error } = await supabase
    .from("banner_slides")
    .insert([{ image_url: "", title: "New Slide", subtitle: "", display_order: afterOrder }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateSlide(id, patch) {
  const { data, error } = await supabase.from("banner_slides").update(patch).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteSlide(id) {
  const { error } = await supabase.from("banner_slides").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderSlides(orderedSlides) {
  const updates = orderedSlides.map((s, i) =>
    supabase.from("banner_slides").update({ display_order: i }).eq("id", s.id)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw failed.error;
}

export async function uploadSlideImage(file) {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("banner-images").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("banner-images").getPublicUrl(path);
  return data.publicUrl;
}