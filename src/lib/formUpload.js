// src/lib/formUpload.js
import { supabase } from "./supabase"

/**
 * Hole Projekt via Slug (für Kunden-Formular)
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
 * Speichere/Update Form-Upload für eine Komponente
 */
export async function saveFormUpload(
  projectId,
  componentType,
  content,
  images = []
) {
  try {
    // Prüfe ob bereits ein Upload für diese Komponente existiert
    const { data: existing } = await supabase
      .from("form_uploads")
      .select("id")
      .eq("project_id", projectId)
      .eq("component_type", componentType)
      .single()

    let result

    if (existing) {
      // Update existing
      result = await supabase
        .from("form_uploads")
        .update({
          content,
          images,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single()
    } else {
      // Insert new
      result = await supabase
        .from("form_uploads")
        .insert([
          {
            project_id: projectId,
            component_type: componentType,
            content,
            images,
          },
        ])
        .select()
        .single()
    }

    if (result.error) throw result.error
    return { data: result.data, error: null }
  } catch (error) {
    console.error("Error saving form upload:", error)
    return { data: null, error: error.message }
  }
}

/**
 * Hole alle Form-Uploads für ein Projekt
 */
export async function getFormUploads(projectId) {
  try {
    const { data, error } = await supabase
      .from("form_uploads")
      .select("*")
      .eq("project_id", projectId)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error fetching form uploads:", error)
    return { data: null, error: error.message }
  }
}

/**
 * Update Projekt-Status
 */
export async function updateProjectStatus(projectId, status) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", projectId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error updating project status:", error)
    return { data: null, error: error.message }
  }
}

/**
 * Markiere Formular als komplett
 */
export async function markFormComplete(projectId) {
  return updateProjectStatus(projectId, "form_completed")
}
