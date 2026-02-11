// src/components/admin/GeneratedLink.js
import { useState } from "react"
import toast from "react-hot-toast"
import styled from "styled-components"

const Container = styled.div`
  background: ${(props) => props.theme.surface};
  border: 2px solid ${(props) => props.theme.primary};
  padding: 2rem;
  margin-top: 3rem;
  border-radius: ${(props) => props.theme.cardRadius};
  display: ${(props) => (props.show ? "block" : "none")};
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const Title = styled.h2`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 1.8rem;
  color: ${(props) => props.theme.primary};
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
`

const Description = styled.p`
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  line-height: 1.6;
`

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const LinkInput = styled.input`
  flex-grow: 1;
  background: ${(props) => props.theme.inputBg};
  border: 2px solid ${(props) => props.theme.inputBorder};
  padding: 1rem 1.5rem;
  color: ${(props) => props.theme.primary};
  font-family: "Monaco", "Courier New", monospace;
  font-size: 0.9rem;
  border-radius: calc(${(props) => props.theme.buttonRadius} / 2);
  cursor: text;

  @media (max-width: 640px) {
    width: 100%;
  }
`

const CopyButton = styled.button`
  padding: 1rem 2rem;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 600;
  font-family: ${(props) => props.theme.fontBody};
  transition: all 0.3s ease;
  border-radius: ${(props) => props.theme.buttonRadius};
  flex-shrink: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`

const ProjectInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${(props) => props.theme.border};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

const InfoLabel = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textSecondary};
  font-weight: 600;
`

const InfoValue = styled.div`
  font-size: 0.95rem;
  color: ${(props) => props.theme.text};
  font-weight: 500;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const ActionButton = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  cursor: pointer;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 600;
  font-family: ${(props) => props.theme.fontBody};
  transition: all 0.3s ease;
  border-radius: ${(props) => props.theme.buttonRadius};

  &:hover {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.background};
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`

function GeneratedLink({ projectData, show }) {
  const [copied, setCopied] = useState(false)

  if (!projectData) return null

  const formUrl = `http://localhost:3000/form/${projectData.slug}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formUrl)
      setCopied(true)
      toast.success("Link kopiert!")

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      toast.error("Fehler beim Kopieren")
      console.error("Copy failed:", err)
    }
  }

  const handleEmailLink = () => {
    const subject = encodeURIComponent(
      `Eure Hochzeits-Website - Inhalte hochladen`
    )
    const body = encodeURIComponent(
      `Hallo ${projectData.partner1_first_name} & ${projectData.partner2_first_name},\n\n` +
        `vielen Dank für euer Vertrauen! 🎉\n\n` +
        `Hier ist der Link, um eure Inhalte für die Website hochzuladen:\n` +
        `${formUrl}\n\n` +
        `Bitte ladet alle Texte, Bilder und Informationen über dieses Formular hoch.\n\n` +
        `Bei Fragen stehen wir euch jederzeit zur Verfügung!\n\n` +
        `Liebe Grüße,\n` +
        `Sarah & Iver`
    )

    window.location.href = `mailto:${projectData.customer_email}?subject=${subject}&body=${body}`
  }

  const handleViewForm = () => {
    window.open(formUrl, "_blank")
  }

  return (
    <Container show={show}>
      <Title>✓ Projekt erstellt!</Title>
      <Description>
        Das Projekt wurde erfolgreich erstellt. Sende den folgenden Link an
        deine Kunden, damit sie die Inhalte für ihre Website hochladen können:
      </Description>

      <LinkContainer>
        <LinkInput
          type='text'
          value={formUrl}
          readOnly
          onClick={(e) => e.target.select()}
        />
        <CopyButton onClick={handleCopy}>
          {copied ? "✓ Kopiert!" : "Link Kopieren"}
        </CopyButton>
      </LinkContainer>

      <ProjectInfo>
        <InfoItem>
          <InfoLabel>Projekt-ID</InfoLabel>
          <InfoValue>{projectData.id}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Slug</InfoLabel>
          <InfoValue>{projectData.slug}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Theme</InfoLabel>
          <InfoValue>{projectData.theme}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Paket</InfoLabel>
          <InfoValue>{projectData.package}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Status</InfoLabel>
          <InfoValue>Entwurf</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Erstellt</InfoLabel>
          <InfoValue>
            {new Date(projectData.created_at).toLocaleDateString("de-DE")}
          </InfoValue>
        </InfoItem>
      </ProjectInfo>

      <ActionButtons>
        <ActionButton onClick={handleViewForm}>Formular Ansehen</ActionButton>
        <ActionButton onClick={handleEmailLink}>Per Email Senden</ActionButton>
      </ActionButtons>
    </Container>
  )
}

export default GeneratedLink
