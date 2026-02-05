// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js"

// Supabase Configuration – aus ENV-Variablen laden
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ""
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase ENV-Variablen nicht gesetzt. Admin-Features funktionieren nicht.")
}

// Supabase Client (nur für Frontend-Admin-Features, NICHT für API Routes)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Admin Client = gleicher Client (RLS regelt Zugriff)
export const supabaseAdmin = supabase
