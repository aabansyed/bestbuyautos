// NOTE: supabase client ka import wahi rakhein jo carsApi.js ke top par hai.
// Agar carsApi.js me `import { supabase } from "./supabaseClient";` hai to neeche bhi wahi.
import { supabase } from "./supabase";

/** Public form se query save karo (visitor, login ki zaroorat nahi). */
export async function submitEmailQuery({ name, email, phoneCode, phone, whatsapp, remarks, source }) {
  // .select() nahi lagana: anon user ko select permission nahi hai.
  const { error } = await supabase.from("email_queries").insert({
    name: String(name || "").trim(),
    email: String(email || "").trim(),
    phone_code: phoneCode || null,
    phone: String(phone || "").trim() || null,
    whatsapp: String(whatsapp || "").trim() || null,
    remarks: String(remarks || "").trim(),
    source: source || "verify-email",
  });
  if (error) throw error;
}

/** Admin: saari queries (newest first). */
export async function fetchEmailQueries() {
  const { data, error } = await supabase
    .from("email_queries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

/** Admin: status badlo (new / read / replied). */
export async function updateEmailQueryStatus(id, status) {
  const { error } = await supabase.from("email_queries").update({ status }).eq("id", id);
  if (error) throw error;
}

/** Admin: query delete karo. */
export async function deleteEmailQuery(id) {
  const { error } = await supabase.from("email_queries").delete().eq("id", id);
  if (error) throw error;
}