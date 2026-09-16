import { supabase } from "./supabase";

/** Public auction page: only live listings, newest first. */
export async function fetchPublicAuctionCars() {
  const { data, error } = await supabase
    .from("auction_cars")
    .select("*")
    .eq("in_stock", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

/** Admin panel: every listing, including hidden ones. */
export async function fetchAllAuctionCars() {
  const { data, error } = await supabase
    .from("auction_cars")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createAuctionCar(car) {
  const { data, error } = await supabase.from("auction_cars").insert([car]).select().single();
  if (error) throw error;
  return data;
}

export async function updateAuctionCar(id, car) {
  const { data, error } = await supabase.from("auction_cars").update(car).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteAuctionCar(id) {
  const { error } = await supabase.from("auction_cars").delete().eq("id", id);
  if (error) throw error;
}

/** Uploads a file to the `auction-images` storage bucket and returns its public URL. */
export async function uploadAuctionCarImage(file) {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("auction-images").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("auction-images").getPublicUrl(path);
  return data.publicUrl;
}

export const AUCTION_BODY_TYPES = ["Sedan", "SUV", "Coupe", "Van", "Hatchback", "Truck", "Wagon"];
export const AUCTION_FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Electric"];
export const AUCTION_TRANS_TYPES = ["Automatic", "Manual", "CVT"];
export const AUCTION_BADGE_TYPES = ["", "New", "Hot", "Premium"];
export const AUCTION_GRADES = ["S", "6", "5", "4.5", "4", "3.5", "3", "R", "RA"];