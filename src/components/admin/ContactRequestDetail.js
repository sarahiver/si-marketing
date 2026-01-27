// src/components/admin/ContactRequestDetail.js
import { useState } from "react"
import styled from "styled-components"
import toast from "react-hot-toast"
import {
  updateRequestStatus,
  updateRequestNotes,
  deleteContactRequest,
  REQUEST_STATUS,
  STATUS_LABELS,
  STATUS_COLORS,
} from "../../lib/contactRequests"

const Container = styled.div`
  background: ${(props) => props.theme.surface};
  border: 2px solid ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.cardRadius};
  overflow: hidden;
`

const Header = styled.div`
  background: ${(props) => props.theme.background};
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${(props) => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  font-family: ${(props) => props.theme.fontBody};

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`

const StatusBadge = styled.div`
  background: ${(props) => props.color}20;
  color: ${(props) => props.color};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

const Content = styled.div`
  padding: 2rem;
`

const Title = styled.h2`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 2rem;
  color: ${(props) => props.theme.text};
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.02em;
`

const Email = styled.a`
  font-size: 1rem;
  color: ${(props) => props.theme.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Section = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${(props) => props.theme.border};
`

const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textSecondary};
  margin: 0 0 1rem 0;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

const InfoLabel = styled.div`
  font-size: 0.7rem;
  color: ${(props) => props.theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

const InfoValue = styled.div`
  font-size: 0.95rem;
  color: ${(props) => props.theme.text};
  font-weight: 500;
`

const MessageBox = styled.div`
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: calc(${(props) => props.theme.cardRadius} / 2);
  padding: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${(props) => props.theme.text};
  white-space: pre-wrap;
`

const StatusButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`

const StatusButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: ${(props) => (props.active ? props.color : "transparent")};
  color: ${(props) => (props.active ? "#fff" : props.color)};
  border: 2px solid ${(props) => props.color};
  border-radius: 25px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${(props) => props.theme.fontBody};

  &:hover {
    background: ${(props) => props.color};
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const NotesTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  background: ${(props) => props.theme.background};
  border: 2px solid ${(props) => props.theme.border};
  border-radius: calc(${(props) => props.theme.cardRadius} / 2);
  padding: 1rem;
  font-size: 0.9rem;
  color: ${(props) => props.theme.text};
  font-family: ${(props) => props.theme.fontBody};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
    opacity: 0.6;
  }
`

const SaveNotesButton = styled.button`
  margin-top: 0.75rem;
  padding: 0.6rem 1.5rem;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  border: none;
  border-radius: ${(props) => props.theme.buttonRadius};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: ${(props) => props.theme.fontBody};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ActionSection = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: ${(props) =>
    props.theme.name === "gold"
      ? "rgba(212, 175, 55, 0.1)"
      : "rgba(139, 115, 85, 0.1)"};
  border-radius: calc(${(props) => props.theme.cardRadius} / 2);
  text-align: center;
`

const ActionTitle = styled.div`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 1.3rem;
  color: ${(props) => props.theme.text};
  margin-bottom: 0.5rem;
`

const ActionText = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 1.5rem;
`

const CreateProjectButton = styled.button`
  padding: 1rem 3rem;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  border: none;
  border-radius: ${(props) => props.theme.buttonRadius};
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: ${(props) => props.theme.fontBody};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`

const DangerZone = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${(props) => props.theme.border};
`

const DeleteButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
  border-radius: ${(props) => props.theme.buttonRadius};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: ${(props) => props.theme.fontBody};
  transition: all 0.2s ease;

  &:hover {
    background: #ef4444;
    color: #fff;
  }
`

function ContactRequestDetail({
  request,
  onBack,
  onStatusChange,
  onCreateProject,
}) {
  const [notes, setNotes] = useState(request.internal_notes || "")
  const [saving, setSaving] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  const currentStatus = request.status || REQUEST_STATUS.NEW

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) return

    setUpdatingStatus(true)
    const { data, error } = await updateRequestStatus(request.id, newStatus)

    if (error) {
      toast.error("Fehler beim Aktualisieren")
    } else {
      toast.success(`Status geändert: ${STATUS_LABELS[newStatus]}`)
      onStatusChange(data)
    }
    setUpdatingStatus(false)
  }

  const handleSaveNotes = async () => {
    setSaving(true)
    const { data, error } = await updateRequestNotes(request.id, notes)

    if (error) {
      toast.error("Fehler beim Speichern")
    } else {
      toast.success("Notizen gespeichert")
      onStatusChange(data)
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Anfrage wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.",
      )
    ) {
      return
    }

    const { error } = await deleteContactRequest(request.id)

    if (error) {
      toast.error("Fehler beim Löschen")
    } else {
      toast.success("Anfrage gelöscht")
      onBack()
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatPackage = (pkg) => {
    const packages = {
      essential: "Essential (€1.890)",
      signature: "Signature (€2.490)",
      luxe: "Luxe (€2.990)",
      individual: "Individual (ab €3.890)",
    }
    return packages[pkg] || pkg || "Nicht angegeben"
  }

  const formatTheme = (theme) => {
    const themes = {
      gold: "Gold & Schwarz",
      botanical: "Botanical",
      editorial: "Editorial",
    }
    return themes[theme] || theme || "Nicht angegeben"
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>← Zurück zur Übersicht</BackButton>
        <StatusBadge color={STATUS_COLORS[currentStatus]}>
          {STATUS_LABELS[currentStatus]}
        </StatusBadge>
      </Header>

      <Content>
        <Title>{request.name}</Title>
        <Email href={`mailto:${request.email}`}>{request.email}</Email>

        <Section>
          <SectionTitle>Anfrage-Details</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Hochzeitsdatum</InfoLabel>
              <InfoValue>
                {request.wedding_date
                  ? new Date(request.wedding_date).toLocaleDateString("de-DE")
                  : "—"}
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Gewünschtes Paket</InfoLabel>
              <InfoValue>{formatPackage(request.package)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Gewünschtes Theme</InfoLabel>
              <InfoValue>{formatTheme(request.theme)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Eingang</InfoLabel>
              <InfoValue>{formatDate(request.created_at)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Letzte Aktualisierung</InfoLabel>
              <InfoValue>
                {formatDate(request.updated_at || request.created_at)}
              </InfoValue>
            </InfoItem>
          </InfoGrid>
        </Section>

        {request.message && (
          <Section>
            <SectionTitle>Nachricht</SectionTitle>
            <MessageBox>{request.message}</MessageBox>
          </Section>
        )}

        <Section>
          <SectionTitle>Status ändern</SectionTitle>
          <StatusButtons>
            <StatusButton
              color={STATUS_COLORS.new}
              active={currentStatus === REQUEST_STATUS.NEW}
              onClick={() => handleStatusChange(REQUEST_STATUS.NEW)}
              disabled={updatingStatus}
            >
              Neu
            </StatusButton>
            <StatusButton
              color={STATUS_COLORS.contacted}
              active={currentStatus === REQUEST_STATUS.CONTACTED}
              onClick={() => handleStatusChange(REQUEST_STATUS.CONTACTED)}
              disabled={updatingStatus}
            >
              Kontaktiert
            </StatusButton>
            <StatusButton
              color={STATUS_COLORS.deal}
              active={currentStatus === REQUEST_STATUS.DEAL}
              onClick={() => handleStatusChange(REQUEST_STATUS.DEAL)}
              disabled={updatingStatus}
            >
              Deal! 🎉
            </StatusButton>
            <StatusButton
              color={STATUS_COLORS.cancelled}
              active={currentStatus === REQUEST_STATUS.CANCELLED}
              onClick={() => handleStatusChange(REQUEST_STATUS.CANCELLED)}
              disabled={updatingStatus}
            >
              Abgesagt
            </StatusButton>
          </StatusButtons>
        </Section>

        <Section>
          <SectionTitle>Interne Notizen</SectionTitle>
          <NotesTextarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder='Notizen zu dieser Anfrage (z.B. Gesprächsnotizen, Besonderheiten...)'
          />
          <SaveNotesButton onClick={handleSaveNotes} disabled={saving}>
            {saving ? "Speichert..." : "Notizen speichern"}
          </SaveNotesButton>
        </Section>

        {currentStatus === REQUEST_STATUS.DEAL && (
          <ActionSection>
            <ActionTitle>🎉 Deal abgeschlossen!</ActionTitle>
            <ActionText>
              Erstelle jetzt das Projekt und konfiguriere Theme, Paket und
              Komponenten für den Kunden.
            </ActionText>
            <CreateProjectButton onClick={() => onCreateProject(request)}>
              Projekt erstellen →
            </CreateProjectButton>
          </ActionSection>
        )}

        <DangerZone>
          <SectionTitle>Gefahrenzone</SectionTitle>
          <DeleteButton onClick={handleDelete}>Anfrage löschen</DeleteButton>
        </DangerZone>
      </Content>
    </Container>
  )
}

export default ContactRequestDetail
