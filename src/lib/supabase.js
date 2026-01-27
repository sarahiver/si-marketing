// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js"

// Supabase Configuration
const supabaseUrl = "https://wikxhpvikelfgzdgndlf.supabase.co"
const supabaseAnonKey = "sb_publishable_20ivv0vDLuEfx9sJzKiCxw_iYmFdZDa" // ← Ersetze mit deinem sb_publishable_... key!

console.log("🔍 Supabase Config:")
console.log("URL:", supabaseUrl)
console.log("Key loaded:", supabaseAnonKey ? "✅" : "❌")

// Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin Client = gleicher Client (RLS regelt Zugriff)
export const supabaseAdmin = supabase
