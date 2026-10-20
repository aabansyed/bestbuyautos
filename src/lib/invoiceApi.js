// ⚠️ Ye line apne project ke mutabiq theek kar lena:
// src/lib/carsApi.js ya galleryApi.js kholo aur dekho wahan supabase client
// kahan se import ho raha hai, bilkul wahi line yahan copy kar do.
import { supabase } from "./supabase";

const TABLE = "invoice_requests";

/** Public website form -> naya request save karo (login ki zaroorat nahi) */
export async function submitInvoiceRequest(values) {
  const row = {
    full_name: values.full_name.trim(),
    email: values.email.trim().toLowerCase(),
    whatsapp: values.whatsapp.trim(),
    vehicle_model: values.vehicle_model.trim(),
    vehicle_year: values.vehicle_year.trim(),
  };
  // NOTE: yahan .select() nahi lagaya, kyunke visitors ko read ka haq nahi hai
  const { error } = await supabase.from(TABLE).insert(row);
  if (error) throw new Error(error.message || "Could not send your request.");
}

/** Admin: saare requests (naye pehle) */
export async function fetchInvoiceRequests() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message || "Failed to load requests.");
  return data || [];
}

/** Admin: status badlo (new / contacted / closed) */
export async function updateInvoiceRequestStatus(id, status) {
  const { error } = await supabase.from(TABLE).update({ status }).eq("id", id);
  if (error) throw new Error(error.message || "Failed to update status.");
}

/** Admin: request delete karo */
export async function deleteInvoiceRequest(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message || "Failed to delete request.");
}