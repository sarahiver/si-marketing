// src/components/admin/ThemeSelector.js
import styled from "styled-components"
import { THEMES, THEME_PREVIEWS } from "../../utils/constants"

const Container = styled.div`
  margin-bottom: 2rem;
`

const Title = styled.h2`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 1.5rem;
  color: ${(props) => props.theme.primary};
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
`

const Subtitle = styled.p`
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
`

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
`

const ThemeCard = styled.div`
  padding: 0.75rem;
  border: 2px solid
    ${(props) => (props.selected ? props.theme.primary : props.theme.border)};
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  background: ${(props) =>
    props.selected ? props.theme.surface : props.theme.background};
  position: relative;

  &:hover {
    border-color: ${(props) => props.theme.primary};
    transform: translateY(-3px);
  }
`

const CheckMark = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 20px;
  height: 20px;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  border-radius: 50%;
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.7rem;
`

const ThemePreview = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: 0.6rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  border: ${(props) => (props.border ? `1px solid ${props.border}` : "none")};
  font-family: ${(props) => props.fontFamily || "inherit"};
`

const ThemeName = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${(props) => props.theme.text};
  text-align: center;
`

function ThemeSelector({ selectedTheme, onThemeChange }) {
  return (
    <Container>
      <Title>Design-Theme</Title>
      <Subtitle>Wähle das Theme für die Hochzeitswebsite des Kunden.</Subtitle>

      <ThemeGrid>
        {Object.values(THEMES).map((theme) => {
          const preview = THEME_PREVIEWS[theme.id] || THEME_PREVIEWS.editorial

          return (
            <ThemeCard
              key={theme.id}
              selected={selectedTheme === theme.id}
              onClick={() => onThemeChange(theme.id)}
            >
              <CheckMark show={selectedTheme === theme.id}>✓</CheckMark>

              <ThemePreview
                background={preview.background}
                color={preview.color}
                border={preview.border}
                fontFamily={preview.fontFamily}
              >
                {preview.text}
              </ThemePreview>

              <ThemeName>{theme.name}</ThemeName>
            </ThemeCard>
          )
        })}
      </ThemeGrid>
    </Container>
  )
}

export default ThemeSelector
