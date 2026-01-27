// src/components/form/FormSuccess.js
import styled from "styled-components"

const SuccessContainer = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
`

const SuccessIcon = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  margin-bottom: 2rem;
  animation: pop 0.5s ease-out;

  @keyframes pop {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`

const SuccessTitle = styled.h1`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 3rem;
  font-weight: 400;
  color: ${(props) => props.theme.primary};
  margin-bottom: 1rem;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const SuccessMessage = styled.p`
  max-width: 500px;
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.8;
  font-size: 1rem;
  margin-bottom: 2rem;
`

const BackButton = styled.button`
  padding: 1rem 3rem;
  background: transparent;
  border: 2px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  cursor: pointer;
  font-size: 0.8rem;
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
`

const Emoji = styled.span`
  display: ${(props) => (props.theme.name === "botanical" ? "inline" : "none")};
`

function FormSuccess({ onBack, partnerNames }) {
  return (
    <SuccessContainer>
      <SuccessIcon>✓</SuccessIcon>

      <SuccessTitle>
        <Emoji>🌿 </Emoji>
        Vielen Dank!
        <Emoji> 🌿</Emoji>
      </SuccessTitle>

      <SuccessMessage>
        Eure Inhalte wurden erfolgreich übermittelt! Wir werden uns in Kürze bei
        euch melden und mit der Erstellung eurer Hochzeits-Website beginnen.
        {partnerNames && (
          <>
            <br />
            <br />
            Wir freuen uns auf eure Hochzeit, {partnerNames}! 💍
          </>
        )}
      </SuccessMessage>

      {onBack && <BackButton onClick={onBack}>Zurück zum Formular</BackButton>}
    </SuccessContainer>
  )
}

export default FormSuccess
