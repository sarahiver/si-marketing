// src/pages/admin/AdminPage.js
import { useState } from "react"
import toast from "react-hot-toast"
import styled from "styled-components"
import ComponentCheckboxes from "../../components/admin/ComponentCheckboxes"
import ContactRequestDetail from "../../components/admin/ContactRequestDetail"
import ContactRequestsList from "../../components/admin/ContactRequestsList"
import CustomerForm from "../../components/admin/CustomerForm"
import GeneratedLink from "../../components/admin/GeneratedLink"
import PackageSelector from "../../components/admin/PackageSelector"
import ThemeSelector from "../../components/admin/ThemeSelector"
import { linkRequestToProject } from "../../lib/contactRequests"
import { createProject } from "../../lib/projects"
import {
  OPTIONAL_COMPONENTS,
  PACKAGES,
  STANDARD_COMPONENTS,
} from "../../utils/constants"

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.background};
`

const Navigation = styled.nav`
  background: ${(props) => props.theme.background};
  padding: 1.5rem 4rem;
  border-bottom: 2px solid ${(props) => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    flex-direction: column;
    gap: 1rem;
  }
`

const Logo = styled.div`
  font-family: ${(props) => props.theme.fontBody};
  font-size: 2rem;
  font-weight: 800;
  color: ${(props) => props.theme.text};
  letter-spacing: 0.05em;
`

const NavTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  background: ${(props) => props.theme.surface};
  padding: 0.3rem;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.border};
`

const NavTab = styled.button`
  padding: 0.7rem 1.5rem;
  background: ${(props) =>
    props.active ? props.theme.primary : "transparent"};
  color: ${(props) =>
    props.active ? props.theme.background : props.theme.text};
  border: none;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${(props) => props.theme.fontBody};

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.active ? props.theme.primary : props.theme.border};
  }
`

const NavActions = styled.div`
  display: flex;
  gap: 1rem;
`

const NavButton = styled.button`
  padding: 0.8rem 2rem;
  background: transparent;
  border: 2px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  cursor: pointer;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: ${(props) => props.theme.fontBody};
  border-radius: ${(props) => props.theme.buttonRadius};

  &:hover {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.background};
  }
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const PageHeader = styled.div`
  margin-bottom: 2rem;
`

const PageTitle = styled.h1`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.primary};
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const PageSubtitle = styled.p`
  font-size: 0.95rem;
  font-weight: 300;
  color: ${(props) => props.theme.textSecondary};
  letter-spacing: 0.05em;
`

const Section = styled.div`
  background: ${(props) => props.theme.surface};
  border: 2px solid ${(props) => props.theme.border};
  padding: 2.5rem;
  margin-bottom: 2rem;
  border-radius: ${(props) => props.theme.cardRadius};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const SubmitButton = styled.button`
  display: inline-block;
  padding: 1.3rem 4rem;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.3rem 2rem;
  }
`

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid ${(props) => props.theme.background};
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
  margin-right: 10px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

const FromRequestBanner = styled.div`
  background: ${(props) =>
    props.theme.name === "gold"
      ? "rgba(212, 175, 55, 0.15)"
      : "rgba(139, 115, 85, 0.15)"};
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: ${(props) => props.theme.cardRadius};
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`

const BannerInfo = styled.div``

const BannerTitle = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.text};
  margin-bottom: 0.3rem;
`

const BannerText = styled.div`
  font-size: 0.85rem;
  color: ${(props) => props.theme.textSecondary};
`

const BannerButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: transparent;
  border: 1px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${(props) => props.theme.fontBody};

  &:hover {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.background};
  }
`

// View states
const VIEW = {
  REQUESTS_LIST: "requests_list",
  REQUEST_DETAIL: "request_detail",
  PROJECT_CONFIG: "project_config",
}

function AdminPage() {
  // View State
  const [currentView, setCurrentView] = useState(VIEW.REQUESTS_LIST)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [fromRequest, setFromRequest] = useState(null) // Anfrage, aus der Projekt erstellt wird

  // State für Theme (nur für Projekt-Konfiguration, nicht global)
  const [selectedTheme, setSelectedTheme] = useState("editorial")

  // State für Package
  const [selectedPackage, setSelectedPackage] = useState("signature")

  // State für Customer Form
  const [customerData, setCustomerData] = useState({
    partner1FirstName: "",
    partner1LastName: "",
    partner2FirstName: "",
    partner2LastName: "",
    weddingDate: "",
    customerEmail: "",
    customerPhone: "",
    customerStreet: "",
    customerZip: "",
    customerCity: "",
    slug: "",
    slugManuallyEdited: false,
    internalName: "",
    internalNotes: "",
  })

  // State für Components
  const [selectedComponents, setSelectedComponents] = useState(() => {
    const initial = {}
    STANDARD_COMPONENTS.forEach((comp) => {
      initial[comp.id] = true
    })
    OPTIONAL_COMPONENTS.forEach((comp) => {
      initial[comp.id] = false
    })
    return initial
  })

  // State für Submission
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdProject, setCreatedProject] = useState(null)
  const [showGeneratedLink, setShowGeneratedLink] = useState(false)

  // Handle Request Selection
  const handleSelectRequest = (request) => {
    setSelectedRequest(request)
    setCurrentView(VIEW.REQUEST_DETAIL)
  }

  // Handle Back to List
  const handleBackToList = () => {
    setSelectedRequest(null)
    setCurrentView(VIEW.REQUESTS_LIST)
  }

  // Handle Status Change
  const handleStatusChange = (updatedRequest) => {
    setSelectedRequest(updatedRequest)
  }

  // Handle Create Project from Request
  const handleCreateProjectFromRequest = (request) => {
    setFromRequest(request)

    // Pre-fill form data from request
    const nameParts = request.name?.split(" ") || []
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    setCustomerData({
      partner1FirstName: firstName,
      partner1LastName: lastName,
      partner2FirstName: "",
      partner2LastName: "",
      weddingDate: request.wedding_date || "",
      customerEmail: request.email || "",
      customerPhone: "",
      customerStreet: "",
      customerZip: "",
      customerCity: "",
      slug: "",
      slugManuallyEdited: false,
      internalName: "",
      internalNotes: request.internal_notes || "",
    })

    // Set package and theme from request if available
    if (request.package) {
      setSelectedPackage(request.package)
    }
    if (request.theme) {
      setSelectedTheme(request.theme)
    }

    setCurrentView(VIEW.PROJECT_CONFIG)
  }

  // Handle New Project (without request)
  const handleNewProject = () => {
    setFromRequest(null)
    resetProjectForm()
    setCurrentView(VIEW.PROJECT_CONFIG)
  }

  // Reset Form
  const resetProjectForm = () => {
    setCustomerData({
      partner1FirstName: "",
      partner1LastName: "",
      partner2FirstName: "",
      partner2LastName: "",
      weddingDate: "",
      customerEmail: "",
      customerPhone: "",
      customerStreet: "",
      customerZip: "",
      customerCity: "",
      slug: "",
      slugManuallyEdited: false,
      internalName: "",
      internalNotes: "",
    })
    setSelectedTheme("editorial")
    setSelectedPackage("signature")
    setSelectedComponents(() => {
      const initial = {}
      STANDARD_COMPONENTS.forEach((comp) => {
        initial[comp.id] = true
      })
      OPTIONAL_COMPONENTS.forEach((comp) => {
        initial[comp.id] = false
      })
      return initial
    })
    setCreatedProject(null)
    setShowGeneratedLink(false)
  }

  // Validate Form
  const validateForm = () => {
    const errors = []

    if (!customerData.partner1FirstName) errors.push("Partner 1 Vorname fehlt")
    if (!customerData.partner1LastName) errors.push("Partner 1 Nachname fehlt")
    if (!customerData.partner2FirstName) errors.push("Partner 2 Vorname fehlt")
    if (!customerData.partner2LastName) errors.push("Partner 2 Nachname fehlt")
    if (!customerData.weddingDate) errors.push("Hochzeitsdatum fehlt")
    if (!customerData.customerEmail) errors.push("Kunden-Email fehlt")
    if (!customerData.slug) errors.push("Projekt-Slug fehlt")

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (
      customerData.customerEmail &&
      !emailRegex.test(customerData.customerEmail)
    ) {
      errors.push("Ungültige Email-Adresse")
    }

    if (
      customerData.slug &&
      (customerData.slug.length < 3 || customerData.slug.length > 50)
    ) {
      errors.push("Slug muss zwischen 3 und 50 Zeichen lang sein")
    }

    return errors
  }

  // Handle Submit
  const handleSubmit = async () => {
    const errors = validateForm()
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error))
      return
    }

    setIsSubmitting(true)

    try {
      const pkg = PACKAGES[selectedPackage]
      const priceNetto = pkg.price
      const priceBrutto = priceNetto * 1.19

      const projectData = {
        slug: customerData.slug,
        internalName:
          customerData.internalName ||
          `Hochzeit ${customerData.partner1FirstName} & ${customerData.partner2FirstName}`,

        partner1FirstName: customerData.partner1FirstName,
        partner1LastName: customerData.partner1LastName,
        partner2FirstName: customerData.partner2FirstName,
        partner2LastName: customerData.partner2LastName,

        customerStreet: customerData.customerStreet,
        customerZip: customerData.customerZip,
        customerCity: customerData.customerCity,
        customerEmail: customerData.customerEmail,
        customerPhone: customerData.customerPhone,

        weddingDate: customerData.weddingDate,
        theme: selectedTheme,
        package: selectedPackage,

        components: selectedComponents,

        priceNetto: priceNetto,
        priceBrutto: priceBrutto,

        internalNotes: customerData.internalNotes,
      }

      const { data, error } = await createProject(projectData)

      if (error) {
        throw new Error(error)
      }

      // Link request to project if created from request
      if (fromRequest) {
        await linkRequestToProject(fromRequest.id, data.id)
      }

      toast.success("Projekt erfolgreich erstellt! 🎉")
      setCreatedProject(data)
      setShowGeneratedLink(true)

      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        })
      }, 100)
    } catch (error) {
      console.error("Error creating project:", error)
      toast.error(`Fehler: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle Another Project
  const handleAnotherProject = () => {
    setFromRequest(null)
    resetProjectForm()
    setCurrentView(VIEW.REQUESTS_LIST)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Cancel Project Creation
  const handleCancelProjectCreation = () => {
    setFromRequest(null)
    resetProjectForm()
    setCurrentView(VIEW.REQUESTS_LIST)
  }

  return (
    <PageContainer>
      <Navigation>
        <Logo>S&I Admin</Logo>

        <NavTabs>
          <NavTab
            active={
              currentView === VIEW.REQUESTS_LIST ||
              currentView === VIEW.REQUEST_DETAIL
            }
            onClick={() => {
              setCurrentView(VIEW.REQUESTS_LIST)
              setSelectedRequest(null)
            }}
          >
            📥 Anfragen
          </NavTab>
          <NavTab
            active={currentView === VIEW.PROJECT_CONFIG}
            onClick={handleNewProject}
          >
            ⚙️ Neues Projekt
          </NavTab>
        </NavTabs>

        <NavActions>
          <NavButton onClick={() => (window.location.href = "/")}>
            ← Website
          </NavButton>
        </NavActions>
      </Navigation>

      <Container>
        {/* REQUESTS LIST VIEW */}
        {currentView === VIEW.REQUESTS_LIST && (
          <>
            <PageHeader>
              <PageTitle>Kontaktanfragen</PageTitle>
              <PageSubtitle>
                Verwalte eingehende Anfragen und erstelle Projekte
              </PageSubtitle>
            </PageHeader>

            <ContactRequestsList
              onSelectRequest={handleSelectRequest}
              selectedRequestId={selectedRequest?.id}
            />
          </>
        )}

        {/* REQUEST DETAIL VIEW */}
        {currentView === VIEW.REQUEST_DETAIL && selectedRequest && (
          <ContactRequestDetail
            request={selectedRequest}
            onBack={handleBackToList}
            onStatusChange={handleStatusChange}
            onCreateProject={handleCreateProjectFromRequest}
          />
        )}

        {/* PROJECT CONFIG VIEW */}
        {currentView === VIEW.PROJECT_CONFIG && (
          <>
            <PageHeader>
              <PageTitle>Website Konfigurator</PageTitle>
              <PageSubtitle>
                Erstelle die perfekte Hochzeitswebsite für deine Kunden
              </PageSubtitle>
            </PageHeader>

            {fromRequest && (
              <FromRequestBanner>
                <BannerInfo>
                  <BannerTitle>
                    Projekt aus Anfrage: {fromRequest.name}
                  </BannerTitle>
                  <BannerText>
                    {fromRequest.email} •{" "}
                    {fromRequest.package
                      ? `Gewünschtes Paket: ${fromRequest.package}`
                      : "Kein Paket angegeben"}
                  </BannerText>
                </BannerInfo>
                <BannerButton onClick={handleCancelProjectCreation}>
                  Abbrechen
                </BannerButton>
              </FromRequestBanner>
            )}

            {/* Theme Selection */}
            <Section>
              <ThemeSelector
                selectedTheme={selectedTheme}
                onThemeChange={setSelectedTheme}
              />
            </Section>

            {/* Package Selection */}
            <Section>
              <PackageSelector
                selectedPackage={selectedPackage}
                onPackageChange={setSelectedPackage}
              />
            </Section>

            {/* Customer Form */}
            <Section>
              <CustomerForm
                formData={customerData}
                onChange={setCustomerData}
              />
            </Section>

            {/* Component Checkboxes */}
            <Section>
              <ComponentCheckboxes
                selectedComponents={selectedComponents}
                onComponentsChange={setSelectedComponents}
                selectedPackage={selectedPackage}
              />

              <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting && <LoadingSpinner />}
                {isSubmitting
                  ? "Projekt wird erstellt..."
                  : "Konfiguration Speichern & Link Generieren"}
              </SubmitButton>
            </Section>

            {/* Generated Link */}
            {showGeneratedLink && (
              <>
                <GeneratedLink
                  projectData={createdProject}
                  show={showGeneratedLink}
                />

                <Section style={{ textAlign: "center", marginTop: "1rem" }}>
                  <NavButton onClick={handleAnotherProject}>
                    ← Zurück zu Anfragen
                  </NavButton>
                </Section>
              </>
            )}
          </>
        )}
      </Container>
    </PageContainer>
  )
}

export default AdminPage
