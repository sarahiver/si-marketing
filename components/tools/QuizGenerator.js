// src/components/tools/QuizGenerator.js
// Kostenloses Tool: Brautpaar-Quiz-Generator
// Generisch gehalten: beliebige Namen, beliebiger Anlass (Polterabend, JGA,
// Hochzeitsfeier), Kategorien wählbar, eigene Fragen ergänzbar.
// Komplett client-side – Fragen-Pool, Druckansicht, Präsentationsmodus.
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import SEOHead from '../shared/SEOHead';

/* ============================================================
   FRAGEN-POOL
   Typ 'wer'  = "Wer von beiden …?" (Schilder-Spiel)
   Typ 'gast' = Schätzfrage, die Gäste über das Paar beantworten
   ============================================================ */

const CATEGORIES = [
  { id: 'kennenlernen', label: 'Kennenlernen & Anfänge' },
  { id: 'alltag', label: 'Alltag & Gewohnheiten' },
  { id: 'liebe', label: 'Liebe & Beziehung' },
  { id: 'zukunft', label: 'Zukunft' },
  { id: 'party', label: 'Party & Pikant' },
  { id: 'gaeste', label: 'Gäste-Spezial (Schätzfragen)' },
];

const POOL = [
  // Kennenlernen & Anfänge
  { c: 'kennenlernen', t: 'wer', q: 'Wer hat den ersten Schritt gemacht?' },
  { c: 'kennenlernen', t: 'wer', q: 'Wer hat zuerst „Ich liebe dich“ gesagt?' },
  { c: 'kennenlernen', t: 'wer', q: 'Wer war vor dem ersten Date nervöser?' },
  { c: 'kennenlernen', t: 'wer', q: 'Wer hat den ersten Kuss initiiert?' },
  { c: 'kennenlernen', t: 'wer', q: 'Wer hat die Beziehung zuerst den Eltern erzählt?' },
  { c: 'kennenlernen', t: 'wer', q: 'Wer wusste zuerst: „Diesen Menschen heirate ich“?' },
  { c: 'kennenlernen', t: 'wer', q: 'Wer hat beim ersten Date mehr geredet?' },
  { c: 'kennenlernen', t: 'wer', q: 'Wer hat den anderen zuerst online gestalkt?' },
  { c: 'kennenlernen', t: 'wer', q: 'Wer erinnert sich besser an das erste Date?' },
  { c: 'kennenlernen', t: 'wer', q: 'Wer hat nach dem ersten Date zuerst geschrieben?' },
  // Alltag & Gewohnheiten
  { c: 'alltag', t: 'wer', q: 'Wer steht morgens zuerst auf?' },
  { c: 'alltag', t: 'wer', q: 'Wer braucht länger im Bad?' },
  { c: 'alltag', t: 'wer', q: 'Wer kocht besser?' },
  { c: 'alltag', t: 'wer', q: 'Wer lässt öfter Sachen herumliegen?' },
  { c: 'alltag', t: 'wer', q: 'Wer gibt mehr Geld aus?' },
  { c: 'alltag', t: 'wer', q: 'Wer schnarcht lauter?' },
  { c: 'alltag', t: 'wer', q: 'Wer hängt öfter am Handy?' },
  { c: 'alltag', t: 'wer', q: 'Wer gewinnt am Ende jede Diskussion?' },
  { c: 'alltag', t: 'wer', q: 'Wer ist der schlimmere Beifahrer?' },
  { c: 'alltag', t: 'wer', q: 'Wer vergisst öfter Geburtstage?' },
  { c: 'alltag', t: 'wer', q: 'Wer drückt öfter die Schlummertaste?' },
  { c: 'alltag', t: 'wer', q: 'Wer ist ohne Essen schneller schlecht gelaunt?' },
  // Liebe & Beziehung
  { c: 'liebe', t: 'wer', q: 'Wer entschuldigt sich öfter zuerst?' },
  { c: 'liebe', t: 'wer', q: 'Wer ist romantischer?' },
  { c: 'liebe', t: 'wer', q: 'Wer ist eifersüchtiger?' },
  { c: 'liebe', t: 'wer', q: 'Wer macht die besseren Geschenke?' },
  { c: 'liebe', t: 'wer', q: 'Wer kann schlechter Geheimnisse bewahren?' },
  { c: 'liebe', t: 'wer', q: 'Wer schreibt die längeren Nachrichten?' },
  { c: 'liebe', t: 'wer', q: 'Wer will öfter kuscheln?' },
  { c: 'liebe', t: 'wer', q: 'Wer vermisst den anderen schneller?' },
  // Zukunft
  { c: 'zukunft', t: 'wer', q: 'Wer wird strenger mit den Kindern sein?' },
  { c: 'zukunft', t: 'wer', q: 'Wer plant den nächsten Urlaub?' },
  { c: 'zukunft', t: 'wer', q: 'Wer wird im Alter der verrücktere Mensch?' },
  { c: 'zukunft', t: 'wer', q: 'Wer kümmert sich in Zukunft ums Geld?' },
  { c: 'zukunft', t: 'wer', q: 'Wer will (heimlich) mehr Haustiere?' },
  { c: 'zukunft', t: 'wer', q: 'Wer vergisst eher den Hochzeitstag?' },
  // Party & Pikant
  { c: 'party', t: 'wer', q: 'Wer verträgt mehr Alkohol?' },
  { c: 'party', t: 'wer', q: 'Wer tanzt besser?' },
  { c: 'party', t: 'wer', q: 'Wer steht als Letztes auf der Tanzfläche?' },
  { c: 'party', t: 'wer', q: 'Wer hatte den peinlicheren Urlaubsmoment?' },
  { c: 'party', t: 'wer', q: 'Wer flirtet (aus Versehen) mehr?' },
  { c: 'party', t: 'wer', q: 'Wer hat die wilderen Partygeschichten?' },
  { c: 'party', t: 'wer', q: 'Wer singt lauter (und schiefer) im Auto?' },
  { c: 'party', t: 'wer', q: 'Wer wäre beim Junggesellenabschied eher zu allem bereit?' },
  // Gäste-Spezial
  { c: 'gaeste', t: 'gast', q: 'Wo war das erste Date der beiden?' },
  { c: 'gaeste', t: 'gast', q: 'In welchem Monat haben sich die beiden kennengelernt?' },
  { c: 'gaeste', t: 'gast', q: 'Wie lief der Heiratsantrag ab?' },
  { c: 'gaeste', t: 'gast', q: 'Was ist das gemeinsame Lieblingsessen?' },
  { c: 'gaeste', t: 'gast', q: 'Wohin geht die Hochzeitsreise?' },
  { c: 'gaeste', t: 'gast', q: 'Wie viele Jahre sind die beiden schon ein Paar?' },
];

const COUNTS = [10, 15, 20, 30];

// Deterministisches Shuffle mit Seed (damit „Neu mischen“ bewusst passiert)
const shuffled = (arr, seed) => {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* ============================================================
   STYLES
   ============================================================ */

const ToolFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap');

  @media print {
    body * { visibility: hidden; }
    #quiz-print, #quiz-print * { visibility: visible; }
    #quiz-print { position: absolute; left: 0; top: 0; width: 100%; }
  }
`;

const ink = '#1A1A1A';
const paper = '#FFFFFF';
const cardBg = '#FAFAFA';
const accent = '#000000';
const line = '#E0E0E0';
const muted = '#666666';

const Page = styled.main`
  min-height: 100vh; background: ${paper}; color: ${ink};
  font-family: 'Inter', sans-serif; padding: ${(p) => (p.$embed ? '20px 16px 16px' : '0 24px 96px')};
`;
const Shell = styled.div`max-width: 960px; margin: 0 auto;`;
const TopBar = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 28px 0; border-bottom: 1px solid ${line};
  a { color: ${ink}; text-decoration: none; font-size: 14px; }
  a:hover, a:focus-visible { color: ${accent}; }
  @media print { display: none; }
`;
const Brand = styled(Link)`font-weight: 600;`;
const Kicker = styled.p`
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 12px; letter-spacing: 0.22em;
  text-transform: uppercase; color: ${accent}; margin: 64px 0 16px;
`;
const H1 = styled.h1`
  font-family: 'Instrument Serif', Georgia, serif; font-weight: 400;
  font-size: ${(p) => (p.$embed ? 'clamp(26px, 5vw, 34px)' : 'clamp(40px, 6vw, 68px)')};
  line-height: 1.02; margin: ${(p) => (p.$embed ? '4px 0 18px' : '0 0 20px')};
`;
const Sub = styled.p`font-size: 17px; line-height: 1.65; color: ${muted}; max-width: 62ch; margin: 0 0 48px;`;

const Panel = styled.section`
  background: ${cardBg}; border: 1px solid ${line}; padding: 24px 28px; margin-bottom: 14px;
`;

const Label = styled.p`
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 12px;
  letter-spacing: 0.14em; text-transform: uppercase; color: ${muted}; margin: 0 0 14px;
`;

const NameRow = styled.div`
  display: grid; grid-template-columns: 1fr auto 1fr; gap: 14px; align-items: center; max-width: 560px;
  span { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-size: 22px; color: ${muted}; }
  @media (max-width: 480px) { grid-template-columns: 1fr; span { display: none; } }
`;

const TextInput = styled.input`
  font-family: 'Inter', sans-serif; font-size: 15px; padding: 12px 16px;
  border: 1px solid ${ink}; background: ${paper}; color: ${ink}; width: 100%;
  &:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
`;

const Chips = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;

const Chip = styled.button`
  font-family: 'Inter', sans-serif; font-size: 13.5px; padding: 10px 16px;
  background: ${(p) => (p.$active ? ink : 'transparent')};
  color: ${(p) => (p.$active ? paper : ink)};
  border: 1px solid ${(p) => (p.$active ? ink : line)}; cursor: pointer;
  &:hover { border-color: ${accent}; }
  &:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
`;

const CustomArea = styled.textarea`
  font-family: 'Inter', sans-serif; font-size: 14.5px; padding: 12px 16px; width: 100%;
  min-height: 88px; border: 1px solid ${line}; background: ${paper}; color: ${ink}; resize: vertical;
  &:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
`;

const ActionBar = styled.div`
  display: flex; flex-wrap: wrap; gap: 10px; margin: 28px 0;
  @media print { display: none; }
`;

const Btn = styled.button`
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 13px; letter-spacing: 0.05em;
  padding: 13px 24px; background: ${ink}; color: ${paper}; border: 1px solid ${ink}; cursor: pointer;
  &:hover { background: ${accent}; border-color: ${accent}; }
  &:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
`;

const BtnGhost = styled(Btn)`
  background: transparent; color: ${ink};
  &:hover { background: transparent; color: ${accent}; }
`;

const QuizSheet = styled.section`
  background: ${cardBg}; border: 1px solid ${ink}; padding: clamp(24px, 5vw, 44px); position: relative;
  &::before { content: ''; position: absolute; inset: 8px; border: 1px solid ${line}; pointer-events: none; }
  @media print { border: none; &::before { display: none; } }
`;

const SheetHead = styled.div`
  text-align: center; margin-bottom: 28px;
  p { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: ${muted}; margin: 0 0 8px; }
  h2 { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-weight: 400; font-size: clamp(30px, 5vw, 44px); margin: 0; }
`;

const QGrid = styled.ol`
  list-style: none; margin: 0; padding: 0; display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px;
  @media print { grid-template-columns: 1fr 1fr; }
`;

const QCard = styled.li`
  border: 1px solid ${line}; padding: 16px 18px; break-inside: avoid;
  span { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: ${accent}; display: block; margin-bottom: 6px; }
  p { font-size: 15px; line-height: 1.5; margin: 0; }
`;

const ShareBox = styled.aside`
  margin-top: 56px; border: 1px solid ${ink}; padding: 28px; background: ${cardBg};
  display: flex; flex-wrap: wrap; gap: 18px; align-items: center; justify-content: space-between;
  p { margin: 0; font-size: 14.5px; line-height: 1.6; color: ${muted}; max-width: 56ch; }
  strong { color: ${ink}; }
  @media print { display: none; }
`;

const EmbedCode = styled.textarea`
  width: 100%; margin-top: 16px; padding: 14px; font-family: 'Inter', sans-serif; font-weight: 500;
  font-size: 12px; line-height: 1.6; color: ${ink}; background: ${paper};
  border: 1px solid ${line}; resize: vertical; min-height: 96px;
`;

const EmbedFooter = styled.p`
  margin: 20px 0 0; padding-top: 14px; border-top: 1px solid ${line};
  font-size: 12.5px; color: ${muted}; text-align: center;
  @media print { display: none; }
  a { color: ${accent}; text-decoration: none; }
  a:hover, a:focus-visible { text-decoration: underline; }
`;

const CTA = styled.section`
  margin-top: 28px; padding: 40px 28px; background: ${ink}; color: ${paper}; text-align: center;
  h2 { font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; font-size: clamp(26px, 4vw, 34px); margin: 0 0 12px; }
  p { font-size: 15px; line-height: 1.65; color: #BBBBBB; max-width: 56ch; margin: 0 auto 24px; }
  a {
    display: inline-block; font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px;
    padding: 14px 30px; background: ${paper}; color: ${ink}; text-decoration: none;
    &:hover { background: #fff; }
    &:focus-visible { outline: 2px solid ${paper}; outline-offset: 3px; }
  }
  @media print { display: none; }
`;

const Related = styled.nav`
  margin-top: 40px; font-size: 14.5px; line-height: 2;
  p { color: ${muted}; margin: 0 0 4px; }
  a { color: ${accent}; }
  @media print { display: none; }
`;

/* Präsentationsmodus */
const Present = styled.div`
  position: fixed; inset: 0; z-index: 1000; background: ${ink}; color: ${paper};
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 32px; text-align: center;
`;

const PresentKicker = styled.p`
  font-family: 'Inter', sans-serif; font-weight: 500; font-size: 12px; letter-spacing: 0.3em;
  text-transform: uppercase; color: #9B9082; margin: 0 0 24px;
`;

const PresentQ = styled.p`
  font-family: 'Instrument Serif', Georgia, serif; font-weight: 400;
  font-size: clamp(34px, 6vw, 72px); line-height: 1.15; max-width: 22ch; margin: 0 0 32px;
`;

const PresentNames = styled.p`
  font-family: 'Instrument Serif', Georgia, serif; font-style: italic;
  font-size: clamp(20px, 3vw, 30px); color: #BBBBBB; margin: 0 0 48px;
`;

const PresentNav = styled.div`
  display: flex; gap: 12px;
  button {
    font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px; padding: 13px 26px;
    background: transparent; color: ${paper}; border: 1px solid #5A5248; cursor: pointer;
    &:hover:not(:disabled) { border-color: ${paper}; }
    &:disabled { opacity: 0.35; cursor: default; }
    &:focus-visible { outline: 2px solid ${paper}; outline-offset: 2px; }
  }
`;

const PresentClose = styled.button`
  position: absolute; top: 24px; right: 24px; font-size: 14px;
  background: none; border: 0; color: #9B9082; cursor: pointer; font-family: 'Inter', sans-serif;
  &:hover { color: ${paper}; }
  &:focus-visible { outline: 2px solid ${paper}; outline-offset: 2px; }
`;

/* ============================================================
   KOMPONENTE
   ============================================================ */

const EMBED_SNIPPET = `<iframe src="https://www.sarahiver.com/embed/brautpaar-quiz" width="100%" height="980" style="border:0;max-width:960px;" title="Brautpaar-Quiz-Generator" loading="lazy"></iframe>
<p style="font-size:14px;">Tool: <a href="https://www.sarahiver.com/brautpaar-quiz">Brautpaar-Quiz-Generator</a> von <a href="https://www.sarahiver.com/">S&I. – Premium Hochzeitswebsites</a></p>`;

const QuizGenerator = ({ embed = false }) => {
  const [nameA, setNameA] = useState('');
  const [nameB, setNameB] = useState('');
  const [activeCats, setActiveCats] = useState(['kennenlernen', 'alltag', 'liebe', 'party']);
  const [count, setCount] = useState(15);
  const [customRaw, setCustomRaw] = useState('');
  const [seed, setSeed] = useState(7);
  const [copied, setCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  const copyEmbed = useCallback(() => {
    setShowEmbed(true);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(EMBED_SNIPPET).then(() => {
        setEmbedCopied(true);
        setTimeout(() => setEmbedCopied(false), 2200);
      });
    }
  }, []);
  const [presentIdx, setPresentIdx] = useState(null);

  const toggleCat = (id) => setActiveCats((c) => (c.includes(id) ? (c.length > 1 ? c.filter((x) => x !== id) : c) : [...c, id]));

  const couple = nameA.trim() && nameB.trim() ? `${nameA.trim()} & ${nameB.trim()}` : 'das Brautpaar';
  const whoLabel = nameA.trim() && nameB.trim() ? `${nameA.trim()} oder ${nameB.trim()}?` : 'Schild hochhalten!';

  const questions = useMemo(() => {
    const custom = customRaw.split('\n').map((x) => x.trim()).filter(Boolean)
      .map((q) => ({ c: 'eigene', t: 'wer', q }));
    const pool = shuffled(POOL.filter((p) => activeCats.includes(p.c)), seed);
    return [...custom, ...pool].slice(0, Math.max(count, custom.length));
  }, [activeCats, count, customRaw, seed]);

  const catLabel = (id) => (id === 'eigene' ? 'Eure Frage' : CATEGORIES.find((c) => c.id === id)?.label || '');

  const copyQuiz = useCallback(() => {
    const text = [`Brautpaar-Quiz für ${couple}`, '', ...questions.map((q, i) => `${i + 1}. ${q.q}`)].join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
  }, [questions, couple]);

  // Tastatursteuerung im Präsentationsmodus
  useEffect(() => {
    if (presentIdx === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setPresentIdx(null);
      if (e.key === 'ArrowRight') setPresentIdx((i) => Math.min(i + 1, questions.length - 1));
      if (e.key === 'ArrowLeft') setPresentIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [presentIdx, questions.length]);

  const schema = {
    '@type': 'WebApplication',
    name: 'Brautpaar-Quiz-Generator',
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    publisher: { '@type': 'Organization', name: 'S&I. Wedding', url: 'https://www.sarahiver.com' },
  };

  return (
    <Page $embed={embed}>
      <ToolFonts />
      {!embed && <SEOHead
        title="Brautpaar-Quiz-Generator: Fragen für Polterabend, JGA & Hochzeit"
        description="Erstellt euer persönliches Brautpaar-Quiz in 2 Minuten: 50 Fragen nach Kategorien, eigene Fragen ergänzen, drucken oder im Präsentationsmodus an die Wand werfen. Kostenlos."
        path="/brautpaar-quiz"
        type="website"
        schema={schema}
        keywords={['brautpaar quiz', 'brautpaar quiz fragen', 'hochzeitsquiz', 'polterabend spiele', 'jga quiz', 'mr und mrs fragen deutsch', 'hochzeitsspiele quiz']}
      />}
      <Shell>
        {!embed && (
        <TopBar>
          <Brand to="/">S&amp;I.</Brand>
          <Link to="/hochzeitsdatum-finder">Zum Hochzeitsdatum-Finder →</Link>
        </TopBar>
        )}

        {!embed && <Kicker>Kostenloses Tool von S&amp;I.</Kicker>}
        <H1 $embed={embed}>Der Brautpaar-Quiz-Generator</H1>
        {!embed && <Sub>
          Das Lieblingsspiel jeder Hochzeitsfeier, fertig in 2 Minuten: Namen eingeben, Kategorien
          wählen, eigene Fragen ergänzen – und dann drucken, kopieren oder direkt im
          Präsentationsmodus an die Wand werfen. Für Polterabend, JGA und den großen Tag.
        </Sub>}

        <Panel>
          <Label>Wie heißt ihr beiden?</Label>
          <NameRow>
            <TextInput placeholder="Name 1" value={nameA} maxLength={30} onChange={(e) => setNameA(e.target.value)} aria-label="Erster Name" />
            <span>&amp;</span>
            <TextInput placeholder="Name 2" value={nameB} maxLength={30} onChange={(e) => setNameB(e.target.value)} aria-label="Zweiter Name" />
          </NameRow>
        </Panel>

        <Panel>
          <Label>Welche Kategorien sollen rein?</Label>
          <Chips role="group" aria-label="Kategorien wählen">
            {CATEGORIES.map((c) => (
              <Chip key={c.id} $active={activeCats.includes(c.id)} aria-pressed={activeCats.includes(c.id)} onClick={() => toggleCat(c.id)}>
                {c.label}
              </Chip>
            ))}
          </Chips>
        </Panel>

        <Panel>
          <Label>Wie viele Fragen?</Label>
          <Chips role="group" aria-label="Anzahl Fragen">
            {COUNTS.map((n) => (
              <Chip key={n} $active={count === n} aria-pressed={count === n} onClick={() => setCount(n)}>{n} Fragen</Chip>
            ))}
          </Chips>
        </Panel>

        <Panel>
          <Label>Eigene Fragen (optional, eine pro Zeile)</Label>
          <CustomArea
            placeholder={'Wer hat beim Wandern den Weg „ganz sicher“ gekannt?\nWer hat das WLAN-Passwort auswendig gelernt?'}
            value={customRaw}
            onChange={(e) => setCustomRaw(e.target.value)}
            aria-label="Eigene Fragen, eine pro Zeile"
          />
        </Panel>

        <ActionBar>
          <Btn onClick={() => setPresentIdx(0)}>▶ Präsentationsmodus</Btn>
          <Btn onClick={() => window.print()}>Quiz drucken</Btn>
          <BtnGhost onClick={copyQuiz}>{copied ? '✓ Kopiert' : 'Als Text kopieren'}</BtnGhost>
          <BtnGhost onClick={() => setSeed((s) => s + 1)}>↻ Neu mischen</BtnGhost>
        </ActionBar>

        <QuizSheet id="quiz-print">
          <SheetHead>
            <p>Das große Quiz über</p>
            <h2>{couple}</h2>
          </SheetHead>
          <QGrid>
            {questions.map((q, i) => (
              <QCard key={`${q.q}-${i}`}>
                <span>{String(i + 1).padStart(2, '0')} · {catLabel(q.c)}</span>
                <p>{q.q}</p>
              </QCard>
            ))}
          </QGrid>
        </QuizSheet>

        {!embed && (<>
        <ShareBox>
          <p>
            <strong>Ihr plant Polterabend oder JGA für Freunde?</strong> Dieses Tool darf gerne
            geteilt, verlinkt – oder direkt auf eurer Seite eingebettet werden. Dauerhaft kostenlos, ohne Anmeldung.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <BtnGhost as="button" onClick={() => {
              if (navigator.clipboard) navigator.clipboard.writeText('https://www.sarahiver.com/brautpaar-quiz');
            }}>Link zum Tool kopieren</BtnGhost>
            <BtnGhost as="button" onClick={copyEmbed}>{embedCopied ? '✓ Code kopiert' : 'Auf eurer Seite einbinden'}</BtnGhost>
          </div>
          {showEmbed && (
            <EmbedCode
              readOnly
              value={EMBED_SNIPPET}
              aria-label="HTML-Code zum Einbetten des Tools"
              onFocus={(e) => e.target.select()}
            />
          )}
        </ShareBox>

        <CTA>
          <h2>Das Quiz ist fertig. Und eure Hochzeitswebsite?</h2>
          <p>
            Bei S&amp;I. gibt es das Brautpaar-Quiz auch als interaktive Komponente direkt auf eurer
            Hochzeitswebsite – neben RSVP, Foto-Upload, Musikwünschen und allem, was eure Gäste lieben.
          </p>
          <a href="/#contact">Unverbindlich anfragen</a>
        </CTA>

        <Related>
          <p>Weiterlesen im Hochzeits-Blog:</p>
          <Link to="/blog/brautpaar-quiz-polterabend">30 Brautpaar-Quiz-Fragen mit Spielanleitung</Link><br />
          <Link to="/blog/hochzeit-2027-planen-checkliste">Hochzeit 2027 planen: Die komplette Checkliste</Link><br />
          <Link to="/blog/hochzeitswebsite-musikwuensche-playlist">Musikwünsche: So wird eure Playlist zum Hit</Link>
        </Related>
        </>)}

        {embed && (
          <EmbedFooter>
            Tool von{' '}
            <a href="https://www.sarahiver.com/brautpaar-quiz" target="_blank" rel="noopener noreferrer">
              S&amp;I. – Premium Hochzeitswebsites
            </a>
          </EmbedFooter>
        )}
      </Shell>

      {presentIdx !== null && questions[presentIdx] && (
        <Present role="dialog" aria-modal="true" aria-label="Quiz-Präsentationsmodus">
          <PresentClose onClick={() => setPresentIdx(null)}>Schließen (Esc)</PresentClose>
          <PresentKicker>Frage {presentIdx + 1} von {questions.length}</PresentKicker>
          <PresentQ>{questions[presentIdx].q}</PresentQ>
          <PresentNames>{questions[presentIdx].t === 'gast' ? `Was meint ihr, liebe Gäste?` : whoLabel}</PresentNames>
          <PresentNav>
            <button onClick={() => setPresentIdx((i) => Math.max(i - 1, 0))} disabled={presentIdx === 0}>← Zurück</button>
            <button onClick={() => setPresentIdx((i) => Math.min(i + 1, questions.length - 1))} disabled={presentIdx === questions.length - 1}>Weiter →</button>
          </PresentNav>
        </Present>
      )}
    </Page>
  );
};

export default QuizGenerator;
