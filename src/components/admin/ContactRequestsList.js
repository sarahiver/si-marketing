// src/components/admin/ContactRequestsList.js
import { useEffect, useState } from "react"
import styled from "styled-components"
import {
  getContactRequests,
  STATUS_COLORS,
  STATUS_LABELS,
} from "../../lib/contactRequests"

const Container = styled.div`
  margin-bottom: 2rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`

const Title = styled.h2`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 1.8rem;
  color: ${(props) => props.theme.primary};
  letter-spacing: 0.05em;
  margin: 0;
`

const FilterTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const FilterTab = styled.button`
  padding: 0.5rem 1rem;
  background: ${(props) =>
    props.active ? props.theme.primary : "transparent"};
  color: ${(props) =>
    props.active ? props.theme.background : props.theme.text};
  border: 1px solid
    ${(props) => (props.active ? props.theme.primary : props.theme.border)};
  border-radius: 20px;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${(props) => props.theme.fontBody};

  &:hover {
    border-color: ${(props) => props.theme.primary};
  }
`

const RequestsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const RequestCard = styled.div`
  background: ${(props) => props.theme.surface};
  border: 2px solid
    ${(props) => (props.selected ? props.theme.primary : props.theme.border)};
  padding: 1.5rem;
  border-radius: ${(props) => props.theme.cardRadius};
  cursor: pointer;
  transition: all 0.3s ease;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 1.5rem;
  align-items: center;

  &:hover {
    border-color: ${(props) => props.theme.primary};
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const StatusBadge = styled.div`
  background: ${(props) => props.color}20;
  color: ${(props) => props.color};
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
`

const RequestInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

const RequestName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) => props.theme.text};
`

const RequestEmail = styled.div`
  font-size: 0.85rem;
  color: ${(props) => props.theme.textSecondary};
`

const RequestMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`

const MetaLabel = styled.div`
  font-size: 0.7rem;
  color: ${(props) => props.theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

const MetaValue = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.text};
  font-weight: 500;
`

const ArrowIcon = styled.div`
  font-size: 1.2rem;
  color: ${(props) => props.theme.textSecondary};
  transition: transform 0.2s ease;

  ${RequestCard}:hover & {
    transform: translateX(5px);
    color: ${(props) => props.theme.primary};
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: ${(props) => props.theme.surface};
  border: 2px dashed ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.cardRadius};
`

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const EmptyTitle = styled.div`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 1.3rem;
  color: ${(props) => props.theme.text};
  margin-bottom: 0.5rem;
`

const EmptyText = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};
`

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${(props) => props.theme.textSecondary};
`

const Stats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${(props) => props.theme.surface};
  border-radius: ${(props) => props.theme.cardRadius};
  border: 1px solid ${(props) => props.theme.border};

  @media (max-width: 640px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => props.color || props.theme.primary};
`

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

function ContactRequestsList({ onSelectRequest, selectedRequestId }) {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    setLoading(true)
    const { data, error } = await getContactRequests()

    if (!error && data) {
      setRequests(data)
    }
    setLoading(false)
  }

  // Filter requests
  const filteredRequests =
    filter === "all" ? requests : requests.filter((r) => r.status === filter)

  // Calculate stats
  const stats = {
    total: requests.length,
    new: requests.filter((r) => r.status === "new" || !r.status).length,
    contacted: requests.filter((r) => r.status === "contacted").length,
    deal: requests.filter((r) => r.status === "deal").length,
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatPackage = (pkg) => {
    const packages = {
      essential: "Essential",
      signature: "Signature",
      luxe: "Luxe",
      individual: "Individual",
    }
    return packages[pkg] || pkg || "—"
  }

  if (loading) {
    return <LoadingState>Lädt Anfragen...</LoadingState>
  }

  return (
    <Container>
      <Stats>
        <StatItem>
          <StatNumber>{stats.total}</StatNumber>
          <StatLabel>Gesamt</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber color={STATUS_COLORS.new}>{stats.new}</StatNumber>
          <StatLabel>Neu</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber color={STATUS_COLORS.contacted}>
            {stats.contacted}
          </StatNumber>
          <StatLabel>Kontaktiert</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber color={STATUS_COLORS.deal}>{stats.deal}</StatNumber>
          <StatLabel>Deals</StatLabel>
        </StatItem>
      </Stats>

      <Header>
        <Title>Kontaktanfragen</Title>
        <FilterTabs>
          <FilterTab active={filter === "all"} onClick={() => setFilter("all")}>
            Alle ({requests.length})
          </FilterTab>
          <FilterTab active={filter === "new"} onClick={() => setFilter("new")}>
            Neu ({stats.new})
          </FilterTab>
          <FilterTab
            active={filter === "contacted"}
            onClick={() => setFilter("contacted")}
          >
            Kontaktiert ({stats.contacted})
          </FilterTab>
          <FilterTab
            active={filter === "deal"}
            onClick={() => setFilter("deal")}
          >
            Deals ({stats.deal})
          </FilterTab>
        </FilterTabs>
      </Header>

      {filteredRequests.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📭</EmptyIcon>
          <EmptyTitle>Keine Anfragen</EmptyTitle>
          <EmptyText>
            {filter === "all"
              ? "Es sind noch keine Kontaktanfragen eingegangen."
              : `Keine Anfragen mit Status "${STATUS_LABELS[filter]}".`}
          </EmptyText>
        </EmptyState>
      ) : (
        <RequestsGrid>
          {filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              selected={selectedRequestId === request.id}
              onClick={() => onSelectRequest(request)}
            >
              <StatusBadge
                color={STATUS_COLORS[request.status] || STATUS_COLORS.new}
              >
                {STATUS_LABELS[request.status] || "Neu"}
              </StatusBadge>

              <RequestInfo>
                <RequestName>{request.name}</RequestName>
                <RequestEmail>{request.email}</RequestEmail>
              </RequestInfo>

              <RequestMeta>
                <MetaLabel>Paket</MetaLabel>
                <MetaValue>{formatPackage(request.package)}</MetaValue>
              </RequestMeta>

              <RequestMeta>
                <MetaLabel>Eingang</MetaLabel>
                <MetaValue>{formatDate(request.created_at)}</MetaValue>
              </RequestMeta>

              <ArrowIcon>→</ArrowIcon>
            </RequestCard>
          ))}
        </RequestsGrid>
      )}
    </Container>
  )
}

export default ContactRequestsList
