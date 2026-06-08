// src/components/admin/content-studio/styles.js
import styled from "styled-components"

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`

export const Tabs = styled.div`
  display: inline-flex;
  gap: 0.3rem;
  background: ${(p) => p.theme.surface};
  padding: 0.3rem;
  border-radius: 30px;
  border: 1px solid ${(p) => p.theme.border};
`

export const Tab = styled.button`
  padding: 0.6rem 1.4rem;
  background: ${(p) => (p.active ? p.theme.primary : "transparent")};
  color: ${(p) => (p.active ? p.theme.background : p.theme.text)};
  border: none;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  font-family: ${(p) => p.theme.fontBody};
  transition: all 0.2s ease;
`

export const Btn = styled.button`
  padding: ${(p) => (p.small ? "0.45rem 0.9rem" : "0.7rem 1.4rem")};
  background: ${(p) => (p.ghost ? "transparent" : p.theme.primary)};
  color: ${(p) => (p.ghost ? p.theme.primary : p.theme.background)};
  border: 2px solid ${(p) => p.theme.primary};
  border-radius: ${(p) => p.theme.buttonRadius || "8px"};
  font-size: ${(p) => (p.small ? "0.72rem" : "0.78rem")};
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: ${(p) => p.theme.fontBody};
  transition: all 0.2s ease;
  opacity: ${(p) => (p.disabled ? 0.5 : 1)};
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};

  &:hover {
    background: ${(p) => (p.ghost ? p.theme.primary : p.theme.text)};
    color: ${(p) => p.theme.background};
    border-color: ${(p) => (p.ghost ? p.theme.primary : p.theme.text)};
  }
`

export const KPIs = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`

export const KPI = styled.div`
  background: ${(p) => p.theme.surface};
  border: 1px solid ${(p) => p.theme.border};
  border-radius: 10px;
  padding: 0.5rem 0.9rem;
  min-width: 84px;
  text-align: center;

  b {
    display: block;
    font-family: ${(p) => p.theme.fontHeading};
    font-size: 1.4rem;
    color: ${(p) => p.theme.text};
    line-height: 1;
  }
  span {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${(p) => p.theme.text};
    opacity: 0.6;
  }
`

export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  align-items: start;
`

export const Column = styled.div`
  background: ${(p) => p.theme.surface};
  border: 1px solid ${(p) => p.theme.border};
  border-radius: 14px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  min-height: 80px;
`

export const ColTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${(p) => p.theme.text};
  opacity: 0.7;
  display: flex;
  justify-content: space-between;
`

export const Card = styled.div`
  background: ${(p) => p.theme.background};
  border: 1px solid ${(p) => p.theme.border};
  border-radius: 12px;
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`

export const CardTitle = styled.div`
  font-family: ${(p) => p.theme.fontHeading};
  font-size: 0.98rem;
  color: ${(p) => p.theme.text};
  line-height: 1.25;
`

export const Hook = styled.div`
  font-size: 0.8rem;
  color: ${(p) => p.theme.text};
  opacity: 0.8;
  font-style: italic;
`

export const Tag = styled.span`
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.55rem;
  border-radius: 20px;
  background: ${(p) => p.theme.primary};
  color: ${(p) => p.theme.background};
`

export const Meta = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.66rem;
  color: ${(p) => p.theme.text};
  opacity: 0.6;
`

export const Actions = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`

export const Detail = styled.div`
  border-top: 1px dashed ${(p) => p.theme.border};
  padding-top: 0.55rem;
  font-size: 0.76rem;
  color: ${(p) => p.theme.text};
  white-space: pre-wrap;
  line-height: 1.45;

  h5 {
    margin: 0.5rem 0 0.2rem;
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.6;
  }
  code {
    font-family: ${(p) => p.theme.fontMono || "monospace"};
    font-size: 0.72rem;
  }
  img {
    width: 100%;
    border-radius: 8px;
    margin: 0.3rem 0;
  }
`

export const Banner = styled.div`
  padding: 0.7rem 1rem;
  border-radius: 10px;
  font-size: 0.8rem;
  background: ${(p) => (p.error ? "#7a1f1f" : p.theme.surface)};
  color: ${(p) => (p.error ? "#fff" : p.theme.text)};
  border: 1px solid ${(p) => p.theme.border};
`

export const Empty = styled.div`
  font-size: 0.74rem;
  color: ${(p) => p.theme.text};
  opacity: 0.45;
  text-align: center;
  padding: 0.5rem;
`
