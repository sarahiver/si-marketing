// src/components/admin/CustomerForm.js
import { useEffect, useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  margin-bottom: 3rem;
`

const Title = styled.h2`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 1.8rem;
  color: ${(props) => props.theme.primary};
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  &.full-width {
    grid-column: 1 / -1;
  }
`

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(props) => props.theme.primary};
  margin-bottom: 0.8rem;

  span {
    color: ${(props) => props.theme.textSecondary};
    font-weight: 400;
    text-transform: none;
  }
`

const Input = styled.input`
  background: ${(props) => props.theme.inputBg};
  border: 2px solid ${(props) => props.theme.inputBorder};
  padding: 1rem 1.5rem;
  color: ${(props) => props.theme.text};
  font-family: ${(props) => props.theme.fontBody};
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border-radius: calc(${(props) => props.theme.buttonRadius} / 2);

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    background: ${(props) => props.theme.surface};
  }

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
    opacity: 0.5;
  }
`

const TextArea = styled.textarea`
  background: ${(props) => props.theme.inputBg};
  border: 2px solid ${(props) => props.theme.inputBorder};
  padding: 1rem 1.5rem;
  color: ${(props) => props.theme.text};
  font-family: ${(props) => props.theme.fontBody};
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border-radius: calc(${(props) => props.theme.buttonRadius} / 2);
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    background: ${(props) => props.theme.surface};
  }

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
    opacity: 0.5;
  }
`

const SlugPreview = styled.div`
  margin-top: 0.5rem;
  padding: 0.8rem 1rem;
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: calc(${(props) => props.theme.buttonRadius} / 2);
  font-size: 0.85rem;
  color: ${(props) => props.theme.textSecondary};
  font-family: "Monaco", "Courier New", monospace;

  span {
    color: ${(props) => props.theme.primary};
    font-weight: 600;
  }
`

const ErrorMessage = styled.div`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.3);
  border-radius: calc(${(props) => props.theme.buttonRadius} / 2);
  color: #f44336;
  font-size: 0.85rem;
`

function CustomerForm({ formData, onChange }) {
  const [slugError, setSlugError] = useState("")

  // Auto-generate slug from partner names
  useEffect(() => {
    if (
      formData.partner1FirstName &&
      formData.partner2FirstName &&
      !formData.slugManuallyEdited
    ) {
      const autoSlug =
        `${formData.partner1FirstName}-${formData.partner2FirstName}`
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "")

      onChange({ ...formData, slug: autoSlug })
    }
  }, [formData.partner1FirstName, formData.partner2FirstName])

  const handleSlugChange = (e) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")

    onChange({
      ...formData,
      slug: value,
      slugManuallyEdited: true,
    })

    // Validate slug
    if (value.length < 3) {
      setSlugError("Slug muss mindestens 3 Zeichen lang sein")
    } else if (value.length > 50) {
      setSlugError("Slug darf maximal 50 Zeichen lang sein")
    } else {
      setSlugError("")
    }
  }

  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value })
  }

  return (
    <Container>
      <Title>Basis-Informationen</Title>

      <FormGrid>
        <FormGroup>
          <Label>Name Partner 1 *</Label>
          <Input
            type='text'
            placeholder='Vorname'
            value={formData.partner1FirstName || ""}
            onChange={(e) => handleChange("partner1FirstName", e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Nachname Partner 1 *</Label>
          <Input
            type='text'
            placeholder='Nachname'
            value={formData.partner1LastName || ""}
            onChange={(e) => handleChange("partner1LastName", e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Name Partner 2 *</Label>
          <Input
            type='text'
            placeholder='Vorname'
            value={formData.partner2FirstName || ""}
            onChange={(e) => handleChange("partner2FirstName", e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Nachname Partner 2 *</Label>
          <Input
            type='text'
            placeholder='Nachname'
            value={formData.partner2LastName || ""}
            onChange={(e) => handleChange("partner2LastName", e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Hochzeitsdatum *</Label>
          <Input
            type='date'
            value={formData.weddingDate || ""}
            onChange={(e) => handleChange("weddingDate", e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Kunden-Email *</Label>
          <Input
            type='email'
            placeholder='kunde@beispiel.de'
            value={formData.customerEmail || ""}
            onChange={(e) => handleChange("customerEmail", e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>
            Telefon <span>(Optional)</span>
          </Label>
          <Input
            type='tel'
            placeholder='+49 123 456789'
            value={formData.customerPhone || ""}
            onChange={(e) => handleChange("customerPhone", e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            Straße & Hausnummer <span>(Optional)</span>
          </Label>
          <Input
            type='text'
            placeholder='Musterstraße 123'
            value={formData.customerStreet || ""}
            onChange={(e) => handleChange("customerStreet", e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            PLZ <span>(Optional)</span>
          </Label>
          <Input
            type='text'
            placeholder='12345'
            value={formData.customerZip || ""}
            onChange={(e) => handleChange("customerZip", e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            Stadt <span>(Optional)</span>
          </Label>
          <Input
            type='text'
            placeholder='Berlin'
            value={formData.customerCity || ""}
            onChange={(e) => handleChange("customerCity", e.target.value)}
          />
        </FormGroup>

        <FormGroup className='full-width'>
          <Label>
            Projekt-Slug * <span>(URL-freundlicher Name)</span>
          </Label>
          <Input
            type='text'
            placeholder='max-erika'
            value={formData.slug || ""}
            onChange={handleSlugChange}
            pattern='[a-z0-9-]+'
            required
          />
          {formData.slug && !slugError && (
            <SlugPreview>
              Formular-URL: https://form.sarahiver.de/
              <span>{formData.slug}</span>
            </SlugPreview>
          )}
          {slugError && <ErrorMessage>{slugError}</ErrorMessage>}
        </FormGroup>

        <FormGroup className='full-width'>
          <Label>
            Interner Projekt-Name <span>(Optional, nur für euch sichtbar)</span>
          </Label>
          <Input
            type='text'
            placeholder='z.B. Hochzeit Max & Erika - Sommer 2026'
            value={formData.internalName || ""}
            onChange={(e) => handleChange("internalName", e.target.value)}
          />
        </FormGroup>

        <FormGroup className='full-width'>
          <Label>
            Interne Notizen <span>(Optional)</span>
          </Label>
          <TextArea
            placeholder='Besondere Wünsche, Anmerkungen, etc.'
            value={formData.internalNotes || ""}
            onChange={(e) => handleChange("internalNotes", e.target.value)}
          />
        </FormGroup>
      </FormGrid>
    </Container>
  )
}

export default CustomerForm
