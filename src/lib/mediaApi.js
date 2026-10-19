import { supabase } from "./supabase";

/** Public + admin: fetch every media entry as a map keyed by its `key`. */
export async function fetchMediaMap() {
  const { data, error } = await supabase.from("site_media").select("*");
  if (error) throw error;
  const map = {};
  (data || []).forEach((row) => { map[row.key] = row; });
  return map;
}

/** Admin: list every media entry, most recently updated first. */
export async function fetchAllMedia() {
  const { data, error } = await supabase
    .from("site_media")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

/** Uploads a file to the `site-media` storage bucket and returns its public URL. */
export async function uploadMediaFile(file) {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("site-media").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("site-media").getPublicUrl(path);
  return data.publicUrl;
}

function guessType(file) {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  if (file.type === "application/pdf") return "pdf";
  return "file";
}

/**
 * Create or replace the media entry for a given key. Uploading a new
 * file under a key that already exists overwrites what the site shows
 * for that key (old storage object is left as-is, just no longer linked).
 */
export async function saveMedia({ key, label, file }) {
  const url = await uploadMediaFile(file);
  const type = guessType(file);
  const { data, error } = await supabase
    .from("site_media")
    .upsert([{ key, label, url, type }], { onConflict: "key" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteMedia(key) {
  const { error } = await supabase.from("site_media").delete().eq("key", key);
  if (error) throw error;
}

/** Turns a free-typed label into a safe, stable key: "My Cool File!" -> "my_cool_file" */
export function slugifyKey(label) {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "") || `media_${Date.now()}`;
}