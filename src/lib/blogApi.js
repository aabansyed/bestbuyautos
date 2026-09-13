import { supabase } from "./supabase";

export const BLOG_CATEGORIES = [
  { value: "vehicle", label: "Vehicle" },
  { value: "reviews", label: "Reviews" },
  { value: "buying-guide", label: "Buying Guide" },
  { value: "maintenance", label: "Maintenance" },
];

export async function fetchPublishedPosts() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchAllPosts() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchPostBySlug(slug) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (error) throw error;
  return data;
}

export async function fetchPostById(id) {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

export function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createPost(post) {
  const { data, error } = await supabase.from("blog_posts").insert([post]).select().single();
  if (error) throw error;
  return data;
}

export async function updatePost(id, patch) {
  const { data, error } = await supabase.from("blog_posts").update(patch).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deletePost(id) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadBlogImage(file) {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("blog-images").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
  return data.publicUrl;
}