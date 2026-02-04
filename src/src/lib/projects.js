// src/lib/projects.js
import { supabase, supabaseAdmin } from "./supabase"

/**
 * Erstelle ein neues Projekt
 */
export async function createProject(projectData) {
  try {
    const { data, error } = await supabaseAdmin
      .from("projects")
      .insert([
        {
          slug: projectData.slug,
          internal_name: projectData.internalName,

          partner1_first_name: projectData.partner1FirstName,
          partner1_last_name: projectData.partner1LastName,
          partner2_first_name: projectData.partner2FirstName,
          partner2_last_name: projectData.partner2LastName,

          customer_street: projectData.customerStreet,
          customer_zip: projectData.customerZip,
          customer_city: projectData.customerCity,
          customer_email: projectData.customerEmail,
          customer_phone: projectData.customerPhone,

          wedding_date: projectData.weddingDate,
          theme: projectData.theme,
          package: projectData.package,

          components: projectData.components,

          price_netto: projectData.priceNetto,
          price_brutto: projectData.priceBrutto,

          internal_notes: projectData.internalNotes,

          status: "draft",
        },
      ])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error creating project:", error)
    return { data: null, error: error.message }
  }
}

/**
 * Hole ein Projekt via Slug
 */
export async function getProjectBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error fetching project:", error)
    return { data: null, error: error.message }
  }
}

/**
 * Hole ein Projekt via Form Token (für Kunden)
 */
export async function getProjectByToken(token) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("form_token", token)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error fetching project by token:", error)
    return { data: null, error: error.message }
  }
}

/**
 * Hole alle Projekte (Admin)
 */
export async function getAllProjects() {
  try {
    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error fetching projects:", error)
    return { data: null, error: error.message }
  }
}

/**
 * Update ein Projekt
 */
export async function updateProject(projectId, updates) {
  try {
    const { data, error } = await supabaseAdmin
      .from("projects")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error updating project:", error)
    return { data: null, error: error.message }
  }
}

/**
 * Lösche ein Projekt
 */
export async function deleteProject(projectId) {
  try {
    const { error } = await supabaseAdmin
      .from("projects")
      .delete()
      .eq("id", projectId)

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error("Error deleting project:", error)
    return { error: error.message }
  }
}

/**
 * Prüfe ob Slug verfügbar ist
 */
export async function checkSlugAvailability(slug) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("slug")
      .eq("slug", slug)
      .maybeSingle()

    if (error) throw error
    return { available: !data, error: null }
  } catch (error) {
    console.error("Error checking slug:", error)
    return { available: false, error: error.message }
  }
}
