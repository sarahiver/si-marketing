// src/components/form/FormSection.js
import styled from "styled-components"
import { useState } from "react"

const Section = styled.section`
  background: ${(props) => props.theme.surface};
  border: 2px solid ${(props) => props.theme.border};
  margin-bottom: 2rem;
  border-radius: ${(props) => props.theme.cardRadius};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${(props) => props.theme.borderHover};
  }
`

const SectionHeader = styled.div`
  padding: 1.5rem 2rem;
  background: ${(props) => props.theme.background};
  border-bottom: 1px solid ${(props) => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.surface};
  }
`

const SectionTitle = styled.h2`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) => props.theme.primary};
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

const SectionIcon = styled.span`
  font-size: 1.2rem;
`

const ToggleIcon = styled.span`
  font-size: 1.5rem;
  color: ${(props) => props.theme.primary};
  transition: transform 0.3s ease;
  transform: rotate(${(props) => (props.isOpen ? "180deg" : "0deg")});
`

const SectionContent = styled.div`
  padding: ${(props) => (props.isOpen ? "2rem" : "0 2rem")};
  max-height: ${(props) => (props.isOpen ? "2000px" : "0")};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  overflow: hidden;
  transition: all 0.4s ease;
`

const SectionDescription = styled.p`
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 2rem;
  font-size: 0.9rem;
  line-height: 1.6;
`

const SaveIndicator = styled.div`
  font-size: 0.75rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  letter-spacing: 0.05em;
  background: ${(props) => {
    switch (props.status) {
      case "saved":
        return "rgba(76, 175, 80, 0.1)"
      case "saving":
        return "rgba(255, 193, 7, 0.1)"
      case "error":
        return "rgba(244, 67, 54, 0.1)"
      default:
        return "transparent"
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "saved":
        return "#4caf50"
      case "saving":
        return "#ffc107"
      case "error":
        return "#f44336"
      default:
        return props.theme.textSecondary
    }
  }};
`

function FormSection({
  title,
  icon,
  description,
  children,
  saveStatus,
  defaultOpen = true,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const getStatusText = () => {
    switch (saveStatus) {
      case "saved":
        return "✓ Gespeichert"
      case "saving":
        return "⟳ Speichert..."
      case "error":
        return "✗ Fehler"
      default:
        return ""
    }
  }

  return (
    <Section>
      <SectionHeader onClick={() => setIsOpen(!isOpen)}>
        <SectionTitle>
          <SectionIcon>{icon}</SectionIcon>
          {title}
        </SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {saveStatus && (
            <SaveIndicator status={saveStatus}>{getStatusText()}</SaveIndicator>
          )}
          <ToggleIcon isOpen={isOpen}>▼</ToggleIcon>
        </div>
      </SectionHeader>

      <SectionContent isOpen={isOpen}>
        {description && <SectionDescription>{description}</SectionDescription>}
        {children}
      </SectionContent>
    </Section>
  )
}

export default FormSection
