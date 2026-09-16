import { supabase } from "./supabase";

export async function fetchPublicPolicyBlocks() {
  const { data, error } = await supabase
    .from("policy_blocks")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function fetchAllPolicyBlocks() {
  return fetchPublicPolicyBlocks();
}

export async function createPolicyBlock(afterOrder) {
  const { data, error } = await supabase
    .from("policy_blocks")
    .insert([{ icon: "fa-file-lines", title: "New Section", body: "", display_order: afterOrder }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updatePolicyBlock(id, patch) {
  const { data, error } = await supabase.from("policy_blocks").update(patch).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deletePolicyBlock(id) {
  const { error } = await supabase.from("policy_blocks").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderPolicyBlocks(orderedBlocks) {
  const updates = orderedBlocks.map((b, i) =>
    supabase.from("policy_blocks").update({ display_order: i }).eq("id", b.id)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed) throw failed.error;
}

export function parsePolicyBody(text) {
  const lines = (text || "").split("\n");
  const blocks = [];
  let para = [];
  let list = [];

  const flushPara = () => {
    if (para.length) { blocks.push({ type: "p", content: para.join(" ") }); para = []; }
  };
  const flushList = () => {
    if (list.length) { blocks.push({ type: "ul", items: list }); list = []; }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (line === "") { flushPara(); flushList(); continue; }
    if (line.startsWith("- ")) { flushPara(); list.push(line.slice(2)); continue; }
    flushList();
    para.push(line);
  }
  flushPara();
  flushList();
  return blocks;
}

export function renderInline(text, keyPrefix = "") {
  const parts = text.split("**");
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={`${keyPrefix}-${i}`}>{part}</strong> : <span key={`${keyPrefix}-${i}`}>{part}</span>
  );
}