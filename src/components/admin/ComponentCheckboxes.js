// src/components/admin/ComponentCheckboxes.js
import styled from "styled-components"
import {
  OPTIONAL_COMPONENTS,
  PACKAGES,
  STANDARD_COMPONENTS,
} from "../../utils/constants"

const Container = styled.div`
  margin-bottom: 3rem;
`

const Title = styled.h2`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 1.8rem;
  color: ${(props) => props.theme.primary};
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
`

const Subtitle = styled.p`
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 2rem;
  font-size: 0.9rem;
`

const ComponentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const ComponentCard = styled.div`
  background: ${(props) =>
    props.disabled ? props.theme.surface : props.theme.background};
  border: 2px solid
    ${(props) => (props.selected ? props.theme.primary : props.theme.border)};
  padding: 1.5rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  position: relative;
  border-radius: ${(props) => props.theme.cardRadius};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  &:hover {
    ${(props) =>
      !props.disabled &&
      `
      border-color: ${props.theme.primary};
      transform: translateY(-5px);
    `}
  }
`

const ComponentBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  padding: 0.3rem 0.8rem;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: calc(${(props) => props.theme.buttonRadius} / 2);
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`

const CheckboxCustom = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid ${(props) => props.theme.primary};
  background: ${(props) =>
    props.checked ? props.theme.primary : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  border-radius: ${(props) => (props.theme.name === "botanical" ? "50%" : "0")};

  &::after {
    content: "✓";
    color: ${(props) => props.theme.background};
    font-size: 1rem;
    font-weight: 700;
    opacity: ${(props) => (props.checked ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`

const ComponentInfo = styled.div`
  flex: 1;
`

const ComponentName = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: ${(props) => props.theme.text};
  margin-bottom: ${(props) => (props.hasDescription ? "0.3rem" : "0")};
`

const ComponentDescription = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.4;
`

const SectionDivider = styled.div`
  margin: 2rem 0;
  border-top: 1px solid ${(props) => props.theme.border};
`

const LimitWarning = styled.div`
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 152, 0, 0.1);
  border: 1px solid rgba(255, 152, 0, 0.3);
  border-radius: calc(${(props) => props.theme.buttonRadius} / 2);
  color: #ff9800;
  font-size: 0.9rem;
  display: ${(props) => (props.show ? "block" : "none")};
`

function ComponentCheckboxes({
  selectedComponents,
  onComponentsChange,
  selectedPackage,
}) {
  const pkg = PACKAGES[selectedPackage]
  const maxComponents = pkg ? pkg.maxComponents : 999

  // Count selected optional components
  const selectedOptionalCount = OPTIONAL_COMPONENTS.filter(
    (comp) => selectedComponents[comp.id]
  ).length

  const isLimitReached =
    selectedOptionalCount >= maxComponents && maxComponents !== 999

  const handleToggle = (componentId) => {
    // Don't allow toggling if component is always enabled
    const component = [...STANDARD_COMPONENTS, ...OPTIONAL_COMPONENTS].find(
      (c) => c.id === componentId
    )

    if (component && component.alwaysEnabled) {
      return
    }

    // Check if limit is reached and trying to enable
    if (!selectedComponents[componentId] && isLimitReached) {
      return
    }

    onComponentsChange({
      ...selectedComponents,
      [componentId]: !selectedComponents[componentId],
    })
  }

  return (
    <Container>
      <Title>Gebuchte Komponenten</Title>
      <Subtitle>
        Standard-Komponenten sind automatisch aktiviert.
        {pkg &&
          pkg.maxComponents !== 999 &&
          ` Aktuelles Paket erlaubt ${pkg.maxComponents} zusätzliche Komponenten.`}
      </Subtitle>

      <ComponentsGrid>
        {STANDARD_COMPONENTS.map((component) => (
          <ComponentCard key={component.id} selected={true} disabled={true}>
            <ComponentBadge>Standard</ComponentBadge>
            <CheckboxLabel disabled={true}>
              <CheckboxCustom checked={true} />
              <ComponentInfo>
                <ComponentName>{component.name}</ComponentName>
              </ComponentInfo>
            </CheckboxLabel>
          </ComponentCard>
        ))}
      </ComponentsGrid>

      <SectionDivider />

      <ComponentsGrid>
        {OPTIONAL_COMPONENTS.map((component) => {
          const isSelected = selectedComponents[component.id]
          const isDisabled = !isSelected && isLimitReached

          return (
            <ComponentCard
              key={component.id}
              selected={isSelected}
              disabled={isDisabled}
              onClick={() => !isDisabled && handleToggle(component.id)}
            >
              <CheckboxLabel disabled={isDisabled}>
                <CheckboxCustom checked={isSelected} />
                <ComponentInfo>
                  <ComponentName hasDescription={!!component.description}>
                    {component.name}
                  </ComponentName>
                  {component.description && (
                    <ComponentDescription>
                      {component.description}
                    </ComponentDescription>
                  )}
                </ComponentInfo>
              </CheckboxLabel>
            </ComponentCard>
          )
        })}
      </ComponentsGrid>

      <LimitWarning show={isLimitReached}>
        ⚠️ Limit erreicht! Das {pkg?.name}-Paket erlaubt maximal {maxComponents}{" "}
        optionale Komponenten. Deaktiviere eine Komponente, um eine andere zu
        aktivieren.
      </LimitWarning>
    </Container>
  )
}

export default ComponentCheckboxes
