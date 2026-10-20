import { supabase } from "./supabase";
import { uploadCarImage } from "./carsApi";

// ---------- Makes ----------
export async function fetchMakes() {
  const { data, error } = await supabase
    .from("car_makes").select("*")
    .order("display_order", { ascending: true }).order("name", { ascending: true });
  if (error) throw error;
  return data || [];
}
export async function createMake(name, logo_url = "") {
  const { data, error } = await supabase
    .from("car_makes").insert([{ name: name.trim(), logo_url, display_order: 50 }]).select().single();
  if (error) throw error;
  return data;
}
export async function updateMake(id, patch) {
  const { data, error } = await supabase.from("car_makes").update(patch).eq("id", id).select().single();
  if (error) throw error;
  return data;
}
export async function deleteMake(id) {
  const { error } = await supabase.from("car_makes").delete().eq("id", id);
  if (error) throw error;
}

// ---------- Models ----------
export async function fetchModels() {
  const { data, error } = await supabase.from("car_models").select("*").order("name", { ascending: true });
  if (error) throw error;
  return data || [];
}
export async function createModel(make_id, name) {
  const { data, error } = await supabase
    .from("car_models").insert([{ make_id, name: name.trim() }]).select().single();
  if (error) throw error;
  return data;
}
export async function deleteModel(id) {
  const { error } = await supabase.from("car_models").delete().eq("id", id);
  if (error) throw error;
}

// ---------- Body types ----------
export async function fetchBodyTypesCatalog() {
  const { data, error } = await supabase
    .from("car_body_types").select("*")
    .order("display_order", { ascending: true }).order("name", { ascending: true });
  if (error) throw error;
  return data || [];
}
export async function createBodyType(name, icon_url = "") {
  const { data, error } = await supabase
    .from("car_body_types").insert([{ name: name.trim(), icon_url, display_order: 50 }]).select().single();
  if (error) throw error;
  return data;
}
export async function updateBodyType(id, patch) {
  const { data, error } = await supabase.from("car_body_types").update(patch).eq("id", id).select().single();
  if (error) throw error;
  return data;
}
export async function deleteBodyType(id) {
  const { error } = await supabase.from("car_body_types").delete().eq("id", id);
  if (error) throw error;
}

// logos / icons share the existing public car-images bucket
export const uploadCatalogImage = uploadCarImage;