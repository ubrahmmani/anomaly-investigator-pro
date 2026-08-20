import { createClient } from "@supabase/supabase-js";

//
// ⚠️ IMPORTANT: This project uses Vite, not Next.js.
// Vite only exposes env vars prefixed with VITE_ to the browser.
// NEXT_PUBLIC_* vars will NOT be available in import.meta.env.
//
// Please rename your env vars in the Freebuff Keys/API keys tab:
//   NEXT_PUBLIC_SUPABASE_URL      →  VITE_SUPABASE_URL
//   NEXT_PUBLIC_SUPABASE_ANON_KEY →  VITE_SUPABASE_ANON_KEY
//
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. " +
      "Rename your NEXT_PUBLIC_* keys to VITE_* in the Freebuff Keys tab."
  );
}

/**
 * Supabase client for user authentication.
 *
 * Usage:
 *   import { supabase } from "@/lib/supabase";
 *   const { data, error } = await supabase.auth.signInWithPassword({ email, password });
 */
export const supabase = createClient(
  supabaseUrl ?? "",
  supabaseAnonKey ?? ""
);
