// src/components/form/TimelineEditor.js
import styled from "styled-components"

const TimelineContainer = styled.div`
  margin-bottom: 1.5rem;
`

const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1rem;
  align-items: start;
  background: ${(props) => props.theme.inputBg};
  border: 2px solid ${(props) => props.theme.inputBorder};
  padding: 1.5rem;
  border-radius: calc(${(props) => props.theme.buttonRadius} / 2);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const TimeInput = styled.input`
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  padding: 0.8rem 1rem;
  color: ${(props) => props.theme.text};
  font-family: ${(props) => props.theme.fontBody};
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  border-radius: calc(${(props) => props.theme.buttonRadius} / 3);

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
    opacity: 0.5;
  }
`

const EventInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const EventTitle = styled.input`
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  padding: 0.8rem 1rem;
  color: ${(props) => props.theme.text};
  font-family: ${(props) => props.theme.fontBody};
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: calc(${(props) => props.theme.buttonRadius} / 3);

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
    opacity: 0.5;
  }
`

const EventDescription = styled.input`
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  padding: 0.6rem 1rem;
  color: ${(props) => props.theme.textSecondary};
  font-family: ${(props) => props.theme.fontBody};
  font-size: 0.85rem;
  transition: all 0.3s ease;
  border-radius: calc(${(props) => props.theme.buttonRadius} / 3);

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.text};
  }

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
    opacity: 0.5;
  }
`

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;
  transition: color 0.2s ease;
  align-self: center;

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

function TimeLineEditor({ events = [], onEventsChange }) {
  const handleTimeChange = (index, time) => {
    const newEvents = [...events]
    newEvents[index] = { ...newEvents[index], time }
    onEventsChange(newEvents)
  }

  const handleTitleChange = (index, title) => {
    const newEvents = [...events]
    newEvents[index] = { ...newEvents[index], title }
    onEventsChange(newEvents)
  }

  const handleDescriptionChange = (index, description) => {
    const newEvents = [...events]
    newEvents[index] = { ...newEvents[index], description }
    onEventsChange(newEvents)
  }

  const handleAdd = () => {
    onEventsChange([...events, { time: "", title: "", description: "" }])
  }

  const handleRemove = (index) => {
    const newEvents = events.filter((_, i) => i !== index)
    onEventsChange(newEvents)
  }

  return (
    <TimelineContainer>
      <TimelineList>
        {events.map((event, index) => (
          <TimelineItem key={index}>
            <TimeInput
              type='text'
              placeholder='14:00'
              value={event.time || ""}
              onChange={(e) => handleTimeChange(index, e.target.value)}
            />

            <EventInputs>
              <EventTitle
                type='text'
                placeholder='z.B. Standesamtliche Trauung'
                value={event.title || ""}
                onChange={(e) => handleTitleChange(index, e.target.value)}
              />
              <EventDescription
                type='text'
                placeholder='Optional: Ort oder Beschreibung'
                value={event.description || ""}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
              />
            </EventInputs>

            <RemoveButton onClick={() => handleRemove(index)}>×</RemoveButton>
          </TimelineItem>
        ))}
      </TimelineList>

      <AddButton onClick={handleAdd}>
        <span>+</span> Weiteren Programmpunkt hinzufügen
      </AddButton>
    </TimelineContainer>
  )
}

export default TimeLineEditor
