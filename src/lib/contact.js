// src/lib/contact.js
import { supabase } from "./supabase"

/**
 * Neue Kontaktanfrage erstellen (vom Marketing-Formular)
 */
export async function createContactRequest(data) {
  try {
    const { data: result, error } = await supabase
      .from("contact_requests")
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          wedding_date: data.weddingDate || null,
          guest_count: data.guestCount || null,
          interested_package: data.interestedPackage || null,
          interested_theme: data.interestedTheme || null,
          message: data.message || null,
          source: data.source || "website",
          referral_code: data.referralCode || null,
          status: "new",
        },
      ])
      .select()
      .single()

    if (error) throw error

    return { data: result, error: null }
  } catch (error) {
    console.error("Error creating contact request:", error)
    return { data: null, error: error.message }
  }
}

/**
 * Alle Kontaktanfragen abrufen (für Admin)
 */
export async function getContactRequests(filters = {}) {
  try {
    let query = supabase
      .from("contact_requests")
      .select("*")
      .order("created_at", { ascending: false })

    // Filter nach Status
    if (filters.status) {
      query = query.eq("status", filters.status)
    }

    // Limit
    if (filters.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error("Error fetching contact requests:", error)
    return { data: null, error: error.message }
  }
}

/**
 * Einzelne Kontaktanfrage abrufen
 */
export async function getContactRequestById(id) {
  try {
    const { data, error } = await supabase
      .from("contact_requests")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error("Error fetching contact request:", error)
    return { data: null, error: error.message }
  }
}

/**
 * Kontaktanfrage Status aktualisieren
 */
export async function updateContactRequestStatus(id, status, notes = null) {
  try {
    const updateData = { status }

    // Timestamps je nach Status setzen
    if (status === "contacted") {
      updateData.contacted_at = new Date().toISOString()
    } else if (status === "converted") {
      updateData.converted_at = new Date().toISOString()
    }

    // Notizen hinzufügen wenn vorhanden
    if (notes) {
      updateData.notes = notes
    }

    const { data, error } = await supabase
      .from("contact_requests")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error("Error updating contact request:", error)
    return { data: null, error: error.message }
  }
}

/**
 * Kontaktanfrage löschen
 */
export async function deleteContactRequest(id) {
  try {
    const { error } = await supabase
      .from("contact_requests")
      .delete()
      .eq("id", id)

    if (error) throw error

    return { error: null }
  } catch (error) {
    console.error("Error deleting contact request:", error)
    return { error: error.message }
  }
}

/**
 * Statistiken für Dashboard
 */
export async function getContactStats() {
  try {
    const { data, error } = await supabase
      .from("contact_requests")
      .select("status, created_at")

    if (error) throw error

    // Statistiken berechnen
    const stats = {
      total: data.length,
      new: data.filter((r) => r.status === "new").length,
      contacted: data.filter((r) => r.status === "contacted").length,
      qualified: data.filter((r) => r.status === "qualified").length,
      converted: data.filter((r) => r.status === "converted").length,
      lost: data.filter((r) => r.status === "lost").length,
      thisMonth: data.filter((r) => {
        const created = new Date(r.created_at)
        const now = new Date()
        return (
          created.getMonth() === now.getMonth() &&
          created.getFullYear() === now.getFullYear()
        )
      }).length,
    }

    return { data: stats, error: null }
  } catch (error) {
    console.error("Error fetching contact stats:", error)
    return { data: null, error: error.message }
  }
}
