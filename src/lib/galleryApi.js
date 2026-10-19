import { supabase } from "./supabase";

/** Public homepage: every gallery photo, oldest-first display order. */
export async function fetchPublicGalleryPhotos() {
  const { data, error } = await supabase
    .from("gallery_photos")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data;
}

/** Admin panel: same data, alias kept for symmetry with the other *Api files. */
export async function fetchAllGalleryPhotos() {
  return fetchPublicGalleryPhotos();
}

export async function createGalleryPhoto(imageUrl, afterOrder, caption = "") {
  const { data, error } = await supabase
    .from("gallery_photos")
    .insert([{ image_url: imageUrl, caption, display_order: afterOrder }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateGalleryPhoto(id, patch) {
  const { data, error } = await supabase.from("gallery_photos").update(patch).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteGalleryPhoto(id) {
  const { error } = await supabase.from("gallery_photos").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderGalleryPhotos(orderedPhotos) {
  const updates = orderedPhotos.map((p, i) =>
    supabase.from("gallery_photos").update({ display_order: i }).eq("id", p.id)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw failed.error;
}

/** Uploads a file to the `gallery-images` storage bucket and returns its public URL. */
export async function uploadGalleryImage(file) {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("gallery-images").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("gallery-images").getPublicUrl(path);
  return data.publicUrl;
}