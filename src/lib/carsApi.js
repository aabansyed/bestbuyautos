import { supabase } from "./supabase";
/** Public site: only in-stock cars, newest first. */
export async function fetchPublicCars() {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("in_stock", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
/** Homepage's "Featured Cars" section — only in-stock AND admin-featured. */
export async function fetchFeaturedCars() {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("in_stock", true)
    .eq("featured", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

/** Admin panel: every car, including hidden/out-of-stock ones. */
export async function fetchAllCars() {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createCar(car) {
  const { data, error } = await supabase.from("cars").insert([car]).select().single();
  if (error) throw error;
  return data;
}

export async function updateCar(id, car) {
  const { data, error } = await supabase.from("cars").update(car).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteCar(id) {
  const { error } = await supabase.from("cars").delete().eq("id", id);
  if (error) throw error;
}

/** Uploads a file to the `car-images` storage bucket and returns its public URL. */
export async function uploadCarImage(file) {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("car-images").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("car-images").getPublicUrl(path);
  return data.publicUrl;
}

export const BODY_TYPES = ["Sedan", "SUV", "Coupe", "Van", "Hatchback", "Truck", "Wagon"];
export const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Electric"];
export const TRANS_TYPES = ["Automatic", "Manual", "CVT"];
export const BADGE_TYPES = ["", "New", "Hot", "Premium"];
/** Distinct brands already in use, for the admin's brand picker. */
export async function fetchDistinctBrands() {
  const { data, error } = await supabase.from("cars").select("brand");
  if (error) throw error;
  return [...new Set((data || []).map((row) => row.brand).filter(Boolean))].sort();
}