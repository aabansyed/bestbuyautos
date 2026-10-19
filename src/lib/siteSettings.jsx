import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";

/**
 * Site-wide contact details, edited in Admin → Site Settings.
 * Stored in the existing `site_content` table under keys prefixed `site_`.
 * Defaults below mirror what was already on the Contact Us page, so the
 * site looks the same until an admin changes something.
 */
export const SITE_DEFAULTS = {
  site_whatsapp: "818083434841", // digits only, with country code
  site_phone_jp: "+81 80-8343-4841",
  site_phone_us: "+1 786-216-0122",
  site_email: "info@bbajapan.com", // shown publicly
  site_notify_email: "info@bbajapan.com", // where form submissions are sent
  site_hours: "Mon–Sat: 9AM – 7PM JST",
  site_location_short: "Aichi, Japan",
  site_address_jp: "507-20 Shinpo-machi, Tokai-shi, Aichi Prefecture,\nAichi-gun, Aichi, Japan, 476-0005",
  site_address_us: "19038 SE 15th Ln Silver Springs Florida,\nUnited States of America, 34488",
  // Empty = the button is hidden (no more dead "#" links)
  site_facebook: "https://www.facebook.com/NO1BESTBUYAUTO/",
  site_instagram: "https://www.instagram.com/no1bestbuyauto",
  site_whatsapp_channel: "https://whatsapp.com/channel/0029VbBuIAFDjiOaNllfrx3w",
  site_twitter: "",
  site_youtube: "",
  site_linkedin: "",
};

/** { site_email: "x" } -> { email: "x" } — nicer to use in components. */
function toSettings(raw) {
  const out = {};
  for (const [k, v] of Object.entries(raw)) out[k.replace(/^site_/, "")] = v;
  return out;
}

/** Raw `site_*` rows merged over the defaults (used by the admin form). */
export async function fetchSiteSettingsRaw() {
  const { data, error } = await supabase.from("site_content").select("key, value").like("key", "site_%");
  if (error) throw error;
  const merged = { ...SITE_DEFAULTS };
  (data || []).forEach((row) => {
    if (row.key in SITE_DEFAULTS) merged[row.key] = row.value ?? "";
  });
  return merged;
}

// Module-level copy so plain (non-React) scripts can read the latest values too.
let current = toSettings(SITE_DEFAULTS);
export function getSiteSettings() {
  return current;
}

/** https://wa.me/<number>?text=<encoded text> — never ships a broken link. */
export function buildWaLink(settings, text) {
  const digits = String(settings?.whatsapp || "").replace(/\D/g, "");
  if (!digits) return "#";
  return text ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : `https://wa.me/${digits}`;
}

const SiteSettingsContext = createContext({
  site: current,
  wa: (text) => buildWaLink(current, text),
  reload: async () => {},
});

export function SiteSettingsProvider({ children }) {
  const [site, setSite] = useState(current);

  const reload = useCallback(async () => {
    try {
      current = toSettings(await fetchSiteSettingsRaw());
      setSite(current);
    } catch {
      /* keep defaults if the request fails */
    }
  }, []);

  // Load once on mount. (Async setState inside .then — and skipped after unmount.)
  useEffect(() => {
    let alive = true;
    fetchSiteSettingsRaw()
      .then((raw) => {
        if (!alive) return;
        current = toSettings(raw);
        setSite(current);
      })
      .catch(() => { /* keep defaults if the request fails */ });
    return () => { alive = false; };
  }, []);

  const value = useMemo(() => ({ site, wa: (text) => buildWaLink(site, text), reload }), [site, reload]);
  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}