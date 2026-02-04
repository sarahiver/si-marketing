// src/components/admin/PackageSelector.js
import styled from "styled-components"
import { PACKAGES } from "../../utils/constants"

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

const PackageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const PackageCard = styled.div`
  padding: 2rem;
  border: 2px solid
    ${(props) => (props.selected ? props.theme.primary : props.theme.border)};
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: ${(props) => props.theme.cardRadius};
  background: ${(props) =>
    props.selected ? props.theme.surface : props.theme.background};
  position: relative;

  &:hover {
    border-color: ${(props) => props.theme.primary};
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
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

const PackageName = styled.div`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.text};
`

const PackagePrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.primary};
  margin-bottom: 0.5rem;

  span {
    font-size: 0.9rem;
    font-weight: 400;
    color: ${(props) => props.theme.textSecondary};
  }
`

const PackageDescription = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.border};
`

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const Feature = styled.li`
  font-size: 0.85rem;
  color: ${(props) => props.theme.text};
  padding: 0.5rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  &::before {
    content: "✓";
    color: ${(props) => props.theme.primary};
    font-weight: 700;
    flex-shrink: 0;
  }
`

const RadioButton = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 20px;
  height: 20px;
  border: 2px solid
    ${(props) => (props.selected ? props.theme.primary : props.theme.border)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &::after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(props) => props.theme.primary};
    opacity: ${(props) => (props.selected ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`

function PackageSelector({ selectedPackage, onPackageChange }) {
  return (
    <Container>
      <Title>Paket auswählen</Title>
      <Subtitle>Wähle das gebuchte Paket für dieses Projekt.</Subtitle>

      <PackageGrid>
        {Object.values(PACKAGES).map((pkg) => (
          <PackageCard
            key={pkg.id}
            selected={selectedPackage === pkg.id}
            onClick={() => onPackageChange(pkg.id)}
          >
            {pkg.popular && <PopularBadge>Beliebt</PopularBadge>}
            <RadioButton selected={selectedPackage === pkg.id} />

            <PackageName>{pkg.name}</PackageName>
            <PackagePrice>
              {pkg.price}€ <span>netto</span>
            </PackagePrice>
            <PackageDescription>{pkg.description}</PackageDescription>

            <FeatureList>
              {pkg.features.map((feature, index) => (
                <Feature key={index}>{feature}</Feature>
              ))}
            </FeatureList>
          </PackageCard>
        ))}
      </PackageGrid>
    </Container>
  )
}

export default PackageSelector
