// src/pages/form/CustomerFormPage.js
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"
import {
  getFormUploads,
  getProjectBySlug,
  markFormComplete,
  saveFormUpload,
} from "../../lib/formUpload"
import GlobalStyles from "../../styles/GlobalStyles"
import { themes } from "../../styles/themes"

// Components
import FAQEditor from "../../components/form/FAQEditor"
import FormHeader from "../../components/form/FormHeader"
import { InputRow, TextArea, TextInput } from "../../components/form/FormInputs"
import FormSection from "../../components/form/FormSection"
import FormSuccess from "../../components/form/FormSuccess"
import ImageUploader from "../../components/form/ImageUploader"
import TimeLineEditor from "../../components/form/TimeLineEditor"

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.background};
`

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem 4rem;

  @media (max-width: 768px) {
    padding: 0 1rem 2rem;
  }
`

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.background};
`

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid ${(props) => props.theme.border};
  border-top-color: ${(props) => props.theme.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

const LoadingText = styled.p`
  margin-top: 1.5rem;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.9rem;
`

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`

const ErrorTitle = styled.h1`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 2rem;
  color: ${(props) => props.theme.primary};
  margin-bottom: 1rem;
`

const ErrorMessage = styled.p`
  color: ${(props) => props.theme.textSecondary};
  max-width: 400px;
`

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 1.5rem 3rem;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 700;
  font-family: ${(props) => props.theme.fontBody};
  transition: all 0.3s ease;
  margin-top: 2rem;
  border-radius: ${(props) => props.theme.buttonRadius};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

// Debounce helper
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function CustomerFormPage() {
  const { slug } = useParams()

  // State
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [project, setProject] = useState(null)
  const [formData, setFormData] = useState({})
  const [saveStatus, setSaveStatus] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Load project on mount
  useEffect(() => {
    async function loadProject() {
      try {
        const { data, error } = await getProjectBySlug(slug)

        if (error || !data) {
          setError("Projekt nicht gefunden")
          return
        }

        setProject(data)

        // Load existing form uploads
        const { data: uploads } = await getFormUploads(data.id)

        if (uploads && uploads.length > 0) {
          const existingData = {}
          uploads.forEach((upload) => {
            existingData[upload.component_type] = {
              content: upload.content,
              images: upload.images,
            }
          })
          setFormData(existingData)
        }
      } catch (err) {
        console.error("Error loading project:", err)
        setError("Fehler beim Laden")
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [slug])

  // Auto-save function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const autoSave = useCallback(
    debounce(async (componentType, content, images) => {
      if (!project) return

      setSaveStatus((prev) => ({ ...prev, [componentType]: "saving" }))

      try {
        const { error } = await saveFormUpload(
          project.id,
          componentType,
          content,
          images,
        )

        if (error) throw new Error(error)

        setSaveStatus((prev) => ({ ...prev, [componentType]: "saved" }))

        // Clear saved status after 3 seconds
        setTimeout(() => {
          setSaveStatus((prev) => ({ ...prev, [componentType]: null }))
        }, 3000)
      } catch (err) {
        console.error("Auto-save error:", err)
        setSaveStatus((prev) => ({ ...prev, [componentType]: "error" }))
      }
    }, 1500),
    [project],
  )

  // Update form data and trigger auto-save
  const updateFormData = (componentType, field, value) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [componentType]: {
          ...prev[componentType],
          content: {
            ...(prev[componentType]?.content || {}),
            [field]: value,
          },
          images: prev[componentType]?.images || [],
        },
      }

      // Trigger auto-save
      autoSave(
        componentType,
        updated[componentType].content,
        updated[componentType].images,
      )

      return updated
    })
  }

  // Update images and trigger auto-save
  const updateImages = (componentType, images) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [componentType]: {
          ...prev[componentType],
          content: prev[componentType]?.content || {},
          images,
        },
      }

      // Trigger auto-save
      autoSave(
        componentType,
        updated[componentType].content,
        updated[componentType].images,
      )

      return updated
    })
  }

  // Handle final submit
  const handleSubmit = async () => {
    setSubmitting(true)

    try {
      // Mark form as complete
      const { error } = await markFormComplete(project.id)

      if (error) throw new Error(error)

      toast.success("Formular erfolgreich abgesendet! 🎉")
      setSubmitted(true)
    } catch (err) {
      console.error("Submit error:", err)
      toast.error("Fehler beim Absenden")
    } finally {
      setSubmitting(false)
    }
  }

  // Get value helper
  const getValue = (componentType, field) => {
    return formData[componentType]?.content?.[field] || ""
  }

  // Get images helper
  const getImages = (componentType) => {
    return formData[componentType]?.images || []
  }

  // Check if component is enabled
  const isEnabled = (componentId) => {
    if (!project?.components) return false
    return project.components[componentId] === true
  }

  // Determine theme
  const currentTheme = project?.theme || "gold"

  // Render loading state
  if (loading) {
    return (
      <ThemeProvider theme={themes[currentTheme]}>
        <GlobalStyles />
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Formular wird geladen...</LoadingText>
        </LoadingContainer>
      </ThemeProvider>
    )
  }

  // Render error state
  if (error || !project) {
    return (
      <ThemeProvider theme={themes[currentTheme]}>
        <GlobalStyles />
        <ErrorContainer>
          <ErrorTitle>Oops!</ErrorTitle>
          <ErrorMessage>
            {error ||
              "Das Projekt konnte nicht gefunden werden. Bitte überprüfe den Link."}
          </ErrorMessage>
        </ErrorContainer>
      </ThemeProvider>
    )
  }

  // Render success state
  if (submitted) {
    return (
      <ThemeProvider theme={themes[currentTheme]}>
        <GlobalStyles />
        <PageContainer>
          <FormSuccess
            partnerNames={`${project.partner1_first_name} & ${project.partner2_first_name}`}
            onBack={() => setSubmitted(false)}
          />
        </PageContainer>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <GlobalStyles />
      <PageContainer>
        <FormHeader project={project} />

        <Container>
          {/* HERO SECTION */}
          {isEnabled("hero") && (
            <FormSection
              title='Hero-Bild'
              icon='🖼️'
              description='Das große Hauptbild eurer Website. Wählt ein schönes Foto von euch beiden!'
              saveStatus={saveStatus.hero}
            >
              <ImageUploader
                label='Hero-Bild hochladen'
                images={getImages("hero")}
                onImagesChange={(images) => updateImages("hero", images)}
                maxImages={1}
                uploadPreset='wedding_hero'
                projectSlug={project.slug}
              />
              <TextInput
                label='Hero-Überschrift'
                optional
                placeholder='z.B. Wir heiraten!'
                value={getValue("hero", "headline")}
                onChange={(value) => updateFormData("hero", "headline", value)}
              />
              <TextArea
                label='Hero-Untertitel'
                optional
                placeholder='z.B. Feiert mit uns den schönsten Tag unseres Lebens'
                value={getValue("hero", "subheadline")}
                onChange={(value) =>
                  updateFormData("hero", "subheadline", value)
                }
              />
            </FormSection>
          )}

          {/* ÜBER UNS SECTION */}
          {isEnabled("ueberUns") && (
            <FormSection
              title='Über das Paar'
              icon='💑'
              description='Erzählt eure Liebesgeschichte! Wie habt ihr euch kennengelernt?'
              saveStatus={saveStatus.ueberUns}
            >
              <ImageUploader
                label='Paar-Fotos hochladen'
                images={getImages("ueberUns")}
                onImagesChange={(images) => updateImages("ueberUns", images)}
                maxImages={5}
                uploadPreset='wedding_gallery'
                projectSlug={project.slug}
              />
              <TextArea
                label='Eure Geschichte'
                placeholder='Erzählt, wie ihr euch kennengelernt habt, was euch verbindet, und warum ihr heiratet...'
                value={getValue("ueberUns", "story")}
                onChange={(value) => updateFormData("ueberUns", "story", value)}
                maxLength={2000}
                minHeight='200px'
              />
              <InputRow>
                <TextInput
                  label={`Über ${project.partner1_first_name}`}
                  optional
                  placeholder='Ein kurzer Text über Partner 1'
                  value={getValue("ueberUns", "partner1Bio")}
                  onChange={(value) =>
                    updateFormData("ueberUns", "partner1Bio", value)
                  }
                />
                <TextInput
                  label={`Über ${project.partner2_first_name}`}
                  optional
                  placeholder='Ein kurzer Text über Partner 2'
                  value={getValue("ueberUns", "partner2Bio")}
                  onChange={(value) =>
                    updateFormData("ueberUns", "partner2Bio", value)
                  }
                />
              </InputRow>
            </FormSection>
          )}

          {/* GALERIE SECTION */}
          {isEnabled("galerie") && (
            <FormSection
              title='Bildergalerie'
              icon='📸'
              description='Ladet weitere schöne Fotos hoch für eure Galerie-Sektion.'
              saveStatus={saveStatus.galerie}
            >
              <ImageUploader
                label='Galerie-Bilder hochladen'
                images={getImages("galerie")}
                onImagesChange={(images) => updateImages("galerie", images)}
                maxImages={20}
                uploadPreset='wedding_gallery'
                projectSlug={project.slug}
              />
            </FormSection>
          )}

          {/* ABLAUF SECTION */}
          {isEnabled("ablauf") && (
            <FormSection
              title='Tagesablauf'
              icon='📅'
              description='Wie ist der Ablauf eures Hochzeitstages geplant?'
              saveStatus={saveStatus.ablauf}
            >
              <TimeLineEditor
                events={getValue("ablauf", "events") || []}
                onEventsChange={(events) =>
                  updateFormData("ablauf", "events", events)
                }
              />
            </FormSection>
          )}

          {/* LOCATIONS SECTION */}
          {isEnabled("locations") && (
            <FormSection
              title='Locations'
              icon='📍'
              description='Wo findet die Trauung und die Feier statt?'
              saveStatus={saveStatus.locations}
            >
              <ImageUploader
                label='Location-Fotos'
                images={getImages("locations")}
                onImagesChange={(images) => updateImages("locations", images)}
                maxImages={4}
                uploadPreset='wedding_content'
                projectSlug={project.slug}
              />
              <TextInput
                label='Trauung - Name der Location'
                placeholder='z.B. Standesamt Mitte'
                value={getValue("locations", "ceremonyName")}
                onChange={(value) =>
                  updateFormData("locations", "ceremonyName", value)
                }
              />
              <TextInput
                label='Trauung - Adresse'
                placeholder='z.B. Musterstraße 123, 12345 Berlin'
                value={getValue("locations", "ceremonyAddress")}
                onChange={(value) =>
                  updateFormData("locations", "ceremonyAddress", value)
                }
              />
              <TextInput
                label='Feier - Name der Location'
                placeholder='z.B. Gut Sonnenhof'
                value={getValue("locations", "receptionName")}
                onChange={(value) =>
                  updateFormData("locations", "receptionName", value)
                }
              />
              <TextInput
                label='Feier - Adresse'
                placeholder='z.B. Am See 1, 12345 Brandenburg'
                value={getValue("locations", "receptionAddress")}
                onChange={(value) =>
                  updateFormData("locations", "receptionAddress", value)
                }
              />
              <TextArea
                label='Anfahrt & Parken'
                optional
                placeholder='Hinweise zur Anfahrt, Parkmöglichkeiten, etc.'
                value={getValue("locations", "directions")}
                onChange={(value) =>
                  updateFormData("locations", "directions", value)
                }
              />
            </FormSection>
          )}

          {/* FAQ SECTION */}
          {isEnabled("faq") && (
            <FormSection
              title='FAQ'
              icon='❓'
              description='Beantwortet häufige Fragen eurer Gäste vorab.'
              saveStatus={saveStatus.faq}
            >
              <FAQEditor
                faqs={getValue("faq", "items") || []}
                onFAQsChange={(items) => updateFormData("faq", "items", items)}
              />
            </FormSection>
          )}

          {/* GESCHENKE SECTION */}
          {isEnabled("geschenke") && (
            <FormSection
              title='Geschenkeliste'
              icon='🎁'
              description='Informationen zu Geschenkwünschen.'
              saveStatus={saveStatus.geschenke}
            >
              <TextArea
                label='Geschenkwünsche'
                placeholder='z.B. Wir wünschen uns keine Blumen oder Geschenke, sondern freuen uns über einen Beitrag zu unserer Hochzeitsreise...'
                value={getValue("geschenke", "message")}
                onChange={(value) =>
                  updateFormData("geschenke", "message", value)
                }
                maxLength={1000}
              />
              <TextInput
                label='Spendenziel'
                optional
                placeholder='z.B. Flitterwochen auf Bali'
                value={getValue("geschenke", "goal")}
                onChange={(value) => updateFormData("geschenke", "goal", value)}
              />
              <InputRow>
                <TextInput
                  label='IBAN'
                  optional
                  placeholder='DE89 3704 0044 0532 0130 00'
                  value={getValue("geschenke", "iban")}
                  onChange={(value) =>
                    updateFormData("geschenke", "iban", value)
                  }
                />
                <TextInput
                  label='Kontoinhaber'
                  optional
                  placeholder='Max & Erika Mustermann'
                  value={getValue("geschenke", "accountHolder")}
                  onChange={(value) =>
                    updateFormData("geschenke", "accountHolder", value)
                  }
                />
              </InputRow>
            </FormSection>
          )}

          {/* HOCHZEITS-ABC SECTION */}
          {isEnabled("abc") && (
            <FormSection
              title='Hochzeits-ABC'
              icon='🔤'
              description='Weitere wichtige Infos in alphabetischer Form.'
              saveStatus={saveStatus.abc}
            >
              <TextArea
                label='Hochzeits-ABC Einträge'
                placeholder={`A - Anfahrt: Beschreibung...
B - Blumen: Bitte keine mitbringen
C - Countdown: Wir zählen die Tage!
D - Dresscode: Festlich elegant
...`}
                value={getValue("abc", "content")}
                onChange={(value) => updateFormData("abc", "content", value)}
                maxLength={5000}
                minHeight='300px'
              />
            </FormSection>
          )}

          {/* SUBMIT BUTTON */}
          <SubmitButton onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Wird gesendet..." : "Formular Absenden"}
          </SubmitButton>
        </Container>
      </PageContainer>
    </ThemeProvider>
  )
}

export default CustomerFormPage
