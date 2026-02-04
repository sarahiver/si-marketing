// src/components/form/FormHeader.js
import styled from "styled-components"
import { format } from "date-fns"
import { de } from "date-fns/locale"

const HeaderContainer = styled.header`
  text-align: center;
  padding: 4rem 2rem;
  background: ${(props) => props.theme.surface};
  border-bottom: 2px solid ${(props) => props.theme.border};
  margin-bottom: 3rem;
`

const Eyebrow = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 1rem;
  font-weight: 500;
`

const Names = styled.h1`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 3.5rem;
  font-weight: 400;
  color: ${(props) => props.theme.primary};
  margin-bottom: 1rem;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Ampersand = styled.span`
  font-style: italic;
  margin: 0 0.5rem;
  opacity: 0.8;
`

const WeddingDate = styled.div`
  font-size: 1.1rem;
  color: ${(props) => props.theme.text};
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
`

const Description = styled.p`
  max-width: 600px;
  margin: 0 auto;
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.8;
  font-size: 0.95rem;
`

const Emoji = styled.span`
  display: ${(props) => (props.theme.name === "botanical" ? "inline" : "none")};
`

function FormHeader({ project }) {
  const formattedDate = project.wedding_date
    ? format(new Date(project.wedding_date), "d. MMMM yyyy", { locale: de })
    : ""

  return (
    <HeaderContainer>
      <Eyebrow>
        <Emoji>🌿 </Emoji>
        Hochzeits-Website Inhalte
        <Emoji> 🌿</Emoji>
      </Eyebrow>

      <Names>
        {project.partner1_first_name}
        <Ampersand>&</Ampersand>
        {project.partner2_first_name}
      </Names>

      <WeddingDate>{formattedDate}</WeddingDate>

      <Description>
        Willkommen! Bitte fülle die folgenden Abschnitte aus und lade eure
        Bilder hoch. Alle Inhalte werden automatisch gespeichert und für eure
        Hochzeits-Website verwendet.
      </Description>
    </HeaderContainer>
  )
}

export default FormHeader
