// src/components/form/FAQEditor.js
import styled from "styled-components"

const FAQContainer = styled.div`
  margin-bottom: 1.5rem;
`

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FAQItem = styled.div`
  background: ${(props) => props.theme.inputBg};
  border: 2px solid ${(props) => props.theme.inputBorder};
  padding: 1.5rem;
  border-radius: calc(${(props) => props.theme.buttonRadius} / 2);
  position: relative;
`

const FAQNumber = styled.div`
  position: absolute;
  top: -10px;
  left: 1rem;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
`

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(props) => props.theme.primary};
  margin-bottom: 0.5rem;
`

const Input = styled.input`
  width: 100%;
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  padding: 0.8rem 1rem;
  color: ${(props) => props.theme.text};
  font-family: ${(props) => props.theme.fontBody};
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border-radius: calc(${(props) => props.theme.buttonRadius} / 3);
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
    opacity: 0.5;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  padding: 0.8rem 1rem;
  color: ${(props) => props.theme.text};
  font-family: ${(props) => props.theme.fontBody};
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border-radius: calc(${(props) => props.theme.buttonRadius} / 3);
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
    opacity: 0.5;
  }
`

const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;
  transition: color 0.2s ease;

  &:hover {
    color: #f44336;
  }
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: 2px dashed ${(props) => props.theme.border};
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
  font-size: 0.9rem;
  font-family: ${(props) => props.theme.fontBody};
  transition: all 0.3s ease;
  border-radius: calc(${(props) => props.theme.buttonRadius} / 2);
  margin-top: 1rem;

  &:hover {
    border-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.primary};
  }
`

function FAQEditor({ faqs = [], onFAQsChange }) {
  const handleQuestionChange = (index, question) => {
    const newFAQs = [...faqs]
    newFAQs[index] = { ...newFAQs[index], question }
    onFAQsChange(newFAQs)
  }

  const handleAnswerChange = (index, answer) => {
    const newFAQs = [...faqs]
    newFAQs[index] = { ...newFAQs[index], answer }
    onFAQsChange(newFAQs)
  }

  const handleAdd = () => {
    onFAQsChange([...faqs, { question: "", answer: "" }])
  }

  const handleRemove = (index) => {
    const newFAQs = faqs.filter((_, i) => i !== index)
    onFAQsChange(newFAQs)
  }

  return (
    <FAQContainer>
      <FAQList>
        {faqs.map((faq, index) => (
          <FAQItem key={index}>
            <FAQNumber>{index + 1}</FAQNumber>
            <RemoveButton onClick={() => handleRemove(index)}>×</RemoveButton>

            <Label>Frage</Label>
            <Input
              type='text'
              placeholder='z.B. Gibt es einen Dresscode?'
              value={faq.question || ""}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />

            <Label>Antwort</Label>
            <TextArea
              placeholder='z.B. Wir freuen uns über festliche Kleidung...'
              value={faq.answer || ""}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          </FAQItem>
        ))}
      </FAQList>

      <AddButton onClick={handleAdd}>
        <span>+</span> Weitere Frage hinzufügen
      </AddButton>
    </FAQContainer>
  )
}

export default FAQEditor
