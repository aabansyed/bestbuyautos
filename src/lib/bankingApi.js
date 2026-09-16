import { supabase } from "./supabase";

/** Uploads a file to the `banking-images` storage bucket and returns its public URL. */
export async function uploadBankingImage(file) {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("banking-images").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("banking-images").getPublicUrl(path);
  return data.publicUrl;
}

/** Turns a plain YouTube/Vimeo URL into an embeddable iframe URL. Returns null if not recognized. */
export function toEmbedUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (u.pathname.startsWith("/embed/")) return url;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace("/", "");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}