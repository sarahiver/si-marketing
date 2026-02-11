// src/components/form/FormInputs.js
import styled from "styled-components"

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(props) => props.theme.primary};
  margin-bottom: 0.8rem;

  span {
    font-weight: 400;
    color: ${(props) => props.theme.textSecondary};
    text-transform: none;
    margin-left: 0.5rem;
  }
`

const StyledInput = styled.input`
  width: 100%;
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

const StyledTextArea = styled.textarea`
  width: 100%;
  background: ${(props) => props.theme.inputBg};
  border: 2px solid ${(props) => props.theme.inputBorder};
  padding: 1rem 1.5rem;
  color: ${(props) => props.theme.text};
  font-family: ${(props) => props.theme.fontBody};
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border-radius: calc(${(props) => props.theme.buttonRadius} / 2);
  resize: vertical;
  min-height: ${(props) => props.minHeight || "120px"};
  line-height: 1.6;

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

const CharCount = styled.div`
  text-align: right;
  font-size: 0.75rem;
  color: ${(props) => props.theme.textSecondary};
  margin-top: 0.5rem;
`

const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns || 2}, 1fr);
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

// TextInput Component
export function TextInput({
  label,
  optional,
  placeholder,
  value,
  onChange,
  type = "text",
  ...props
}) {
  return (
    <InputContainer>
      {label && (
        <Label>
          {label}
          {optional && <span>(Optional)</span>}
        </Label>
      )}
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </InputContainer>
  )
}

// TextArea Component
export function TextArea({
  label,
  optional,
  placeholder,
  value,
  onChange,
  maxLength,
  minHeight,
  ...props
}) {
  const currentLength = (value || "").length

  return (
    <InputContainer>
      {label && (
        <Label>
          {label}
          {optional && <span>(Optional)</span>}
        </Label>
      )}
      <StyledTextArea
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        minHeight={minHeight}
        {...props}
      />
      {maxLength && (
        <CharCount>
          {currentLength} / {maxLength} Zeichen
        </CharCount>
      )}
    </InputContainer>
  )
}

// Export InputRow for layouts
export { InputRow }
