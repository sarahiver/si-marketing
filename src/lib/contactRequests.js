// src/lib/contactRequests.js
import { supabase } from "./supabase"

// Status-Konstanten
export const REQUEST_STATUS = {
  NEW: "new",
  CONTACTED: "contacted",
  DEAL: "deal",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
}

export const STATUS_LABELS = {
  new: "Neu",
  contacted: "Kontaktiert",
  deal: "Deal!",
  cancelled: "Abgesagt",
  completed: "Abgeschlossen",
}

export const STATUS_COLORS = {
  new: "#3B82F6", // Blau
  contacted: "#F59E0B", // Orange
  deal: "#10B981", // Grün
  cancelled: "#EF4444", // Rot
  completed: "#6B7280", // Grau
}

// Alle Kontaktanfragen abrufen
export async function getContactRequests() {
  const { data, error } = await supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching contact requests:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

// Einzelne Anfrage abrufen
export async function getContactRequest(id) {
  const { data, error } = await supabase
    .from("contact_requests")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching contact request:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

// Status einer Anfrage aktualisieren
export async function updateRequestStatus(id, status, notes = null) {
  const updateData = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (notes !== null) {
    updateData.internal_notes = notes
  }

  const { data, error } = await supabase
    .from("contact_requests")
    .update(updateData)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating request status:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

// Notizen aktualisieren
export async function updateRequestNotes(id, notes) {
  const { data, error } = await supabase
    .from("contact_requests")
    .update({
      internal_notes: notes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating notes:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

// Anfrage mit Projekt verknüpfen
export async function linkRequestToProject(requestId, projectId) {
  const { data, error } = await supabase
    .from("contact_requests")
    .update({
      project_id: projectId,
      status: REQUEST_STATUS.COMPLETED,
      updated_at: new Date().toISOString(),
    })
    .eq("id", requestId)
    .select()
    .single()

  if (error) {
    console.error("Error linking request to project:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

// Anfrage löschen
export async function deleteContactRequest(id) {
  const { error } = await supabase
    .from("contact_requests")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting contact request:", error)
    return { error: error.message }
  }

  return { error: null }
}
