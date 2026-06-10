// src/components/tools/BudgetRechner.js
// Kostenloses Tool: Hochzeitsbudget-Rechner für den DACH-Raum
// Gästezahl + Stil rein → realistische Kostenverteilung raus.
import React, { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import SEOHead from '../shared/SEOHead';

/* ============================================================
   BUDGET-LOGIK (Erfahrungswerte DACH, Stand 2026)
   ============================================================ */

const STYLES = [
  { id: 'einfach', label: 'Schlicht & persönlich', perGuest: 180, base: 3500, note: 'Standesamt-Fokus, Restaurant oder private Location, DJ statt Band, dezente Deko.' },
  { id: 'klassisch', label: 'Klassisch', perGuest: 300, base: 6000, note: 'Eigene Feierlocation, Catering-Menü, Profi-Fotografie, Florist, DJ.' },
  { id: 'premium', label: 'Premium', perGuest: 480, base: 12000, note: 'Top-Location, mehrgängiges Menü, Foto & Video, Live-Musik, aufwendiges Konzept.' },
];

// Verteilung in % – Summe 100
const CATEGORIES = [
  { key: 'Location & Catering', pct: 48, tip: 'Der größte Posten. Getränkepauschale vs. Abrechnung nach Verbrauch vorab klären – das macht oft 1.000 € Unterschied.' },
  { key: 'Foto & Video', pct: 11, tip: 'Hier nicht sparen: Die Bilder sind das, was bleibt. Pakete mit Voraus-Shooting vergleichen.' },
  { key: 'Musik & Unterhaltung', pct: 9, tip: 'DJ inkl. Technik ist meist günstiger als Band – Musikwünsche vorab digital sammeln füllt jede Tanzfläche.' },
  { key: 'Outfits & Beauty', pct: 9, tip: 'Brautkleid inkl. Änderungen kalkulieren (+15–20 % auf den Kleidpreis). Probetermine früh buchen.' },
  { key: 'Blumen & Dekoration', pct: 7, tip: 'Saisonale Blumen und Mietdeko sparen deutlich. Trockenblumen lassen sich teils weiterverkaufen.' },
  { key: 'Ringe', pct: 4, tip: 'Mit Gravur 8–12 Wochen Vorlauf einplanen.' },
  { key: 'Papeterie & Hochzeitswebsite', pct: 4, tip: 'Save-the-Date digital + Website mit RSVP spart Porto, Druckkosten und Wochen an Verwaltungsarbeit.' },
  { key: 'Puffer & Sonstiges', pct: 8, tip: 'Die wichtigste Zeile: Ohne 8–10 % Reserve wird der letzte Monat teuer und ungemütlich.' },
];

const euro = (n) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

/* ============================================================
   STYLES
   ============================================================ */

const ToolFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap');
`;

const ink = '#1B1612';
const paper = '#FAF6EF';
const cardBg = '#FFFFFF';
const accent = '#7A2E1D';
const line = '#E5DCCC';
const muted = '#6F655A';

const Page = styled.main`
  min-height: 100vh; background: ${paper}; color: ${ink};
  font-family: 'Inter', sans-serif; padding: 0 24px 96px;
`;
const Shell = styled.div`max-width: 920px; margin: 0 auto;`;
const TopBar = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 28px 0; border-bottom: 1px solid ${line};
  a { color: ${ink}; text-decoration: none; font-size: 14px; }
  a:hover, a:focus-visible { color: ${accent}; }
`;
const Brand = styled(Link)`font-weight: 600;`;
const Kicker = styled.p`
  font-family: 'Space Grotesk', monospace; font-size: 12px; letter-spacing: 0.22em;
  text-transform: uppercase; color: ${accent}; margin: 64px 0 16px;
`;
const H1 = styled.h1`
  font-family: 'Instrument Serif', Georgia, serif; font-weight: 400;
  font-size: clamp(40px, 6vw, 68px); line-height: 1.02; margin: 0 0 20px;
`;
const Sub = styled.p`font-size: 17px; line-height: 1.65; color: ${muted}; max-width: 60ch; margin: 0 0 48px;`;

const Panel = styled.section`
  background: ${cardBg}; border: 1px solid ${line}; padding: 28px; margin-bottom: 18px;
`;

const Label = styled.label`
  display: block; font-family: 'Space Grotesk', monospace; font-size: 12px;
  letter-spacing: 0.14em; text-transform: uppercase; color: ${muted}; margin-bottom: 12px;
`;

const GuestRow = styled.div`
  display: flex; align-items: center; gap: 20px;
  input[type='range'] { flex: 1; accent-color: ${accent}; }
`;

const GuestNum = styled.span`
  font-family: 'Instrument Serif', Georgia, serif; font-size: 44px; min-width: 84px; text-align: right;
`;

const StyleGrid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;
`;

const StyleCard = styled.button`
  text-align: left; padding: 18px; background: ${(p) => (p.$active ? ink : 'transparent')};
  color: ${(p) => (p.$active ? paper : ink)}; border: 1px solid ${(p) => (p.$active ? ink : line)};
  cursor: pointer; font-family: 'Inter', sans-serif;
  h3 { font-size: 16px; margin: 0 0 6px; font-weight: 600; }
  p { font-size: 13px; line-height: 1.55; margin: 0; color: ${(p) => (p.$active ? '#CFC6B8' : muted)}; }
  &:hover { border-color: ${accent}; }
  &:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
`;

const Result = styled.section`
  background: ${cardBg}; border: 1px solid ${ink}; padding: clamp(28px, 5vw, 48px); margin-top: 32px;
  position: relative;
  &::before { content: ''; position: absolute; inset: 8px; border: 1px solid ${line}; pointer-events: none; }
`;

const TotalKicker = styled.p`
  font-family: 'Space Grotesk', monospace; font-size: 11px; letter-spacing: 0.3em;
  text-transform: uppercase; color: ${muted}; margin: 0 0 10px; text-align: center;
`;

const Total = styled.p`
  font-family: 'Instrument Serif', Georgia, serif; font-style: italic;
  font-size: clamp(48px, 9vw, 92px); line-height: 1; margin: 0 0 8px; text-align: center;
`;

const PerGuest = styled.p`text-align: center; font-size: 14.5px; color: ${muted}; margin: 0 0 40px;`;

const Row = styled.div`
  display: grid; grid-template-columns: 200px 1fr 110px; gap: 16px; align-items: center;
  padding: 14px 0; border-top: 1px solid ${line};
  @media (max-width: 640px) { grid-template-columns: 1fr 90px; }
`;

const RowName = styled.button`
  text-align: left; font-size: 14.5px; font-weight: 500; color: ${ink};
  background: none; border: 0; padding: 0; cursor: pointer; font-family: 'Inter', sans-serif;
  span { color: ${muted}; font-weight: 400; font-size: 12px; margin-left: 6px; }
  &:hover, &:focus-visible { color: ${accent}; outline: none; }
`;

const Bar = styled.div`
  height: 10px; background: ${paper}; border: 1px solid ${line}; position: relative;
  @media (max-width: 640px) { display: none; }
  &::after {
    content: ''; position: absolute; inset: 0; width: ${(p) => p.$pct * 2}%;
    background: ${accent}; max-width: 100%;
  }
`;

const RowAmount = styled.p`
  font-family: 'Space Grotesk', monospace; font-size: 15px; text-align: right; margin: 0;
`;

const Tip = styled.p`
  grid-column: 1 / -1; font-size: 13.5px; line-height: 1.6; color: ${muted};
  margin: 0; padding: 0 0 6px;
`;

const ShareBox = styled.aside`
  margin-top: 56px; border: 1px solid ${ink}; padding: 28px; background: ${cardBg};
  display: flex; flex-wrap: wrap; gap: 18px; align-items: center; justify-content: space-between;
  p { margin: 0; font-size: 14.5px; line-height: 1.6; color: ${muted}; max-width: 56ch; }
  strong { color: ${ink}; }
`;

const CopyBtn = styled.button`
  font-family: 'Space Grotesk', monospace; font-size: 13px; padding: 12px 22px;
  background: ${ink}; color: ${paper}; border: 1px solid ${ink}; cursor: pointer;
  &:hover { background: ${accent}; border-color: ${accent}; }
  &:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
`;

const CTA = styled.section`
  margin-top: 28px; padding: 40px 28px; background: ${ink}; color: ${paper}; text-align: center;
  h2 { font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; font-size: clamp(26px, 4vw, 34px); margin: 0 0 12px; }
  p { font-size: 15px; line-height: 1.65; color: #CFC6B8; max-width: 56ch; margin: 0 auto 24px; }
  a {
    display: inline-block; font-family: 'Space Grotesk', monospace; font-size: 14px;
    padding: 14px 30px; background: ${paper}; color: ${ink}; text-decoration: none;
    &:hover { background: #fff; }
    &:focus-visible { outline: 2px solid ${paper}; outline-offset: 3px; }
  }
`;

const Related = styled.nav`
  margin-top: 40px; font-size: 14.5px; line-height: 2;
  p { color: ${muted}; margin: 0 0 4px; }
  a { color: ${accent}; }
`;

const Disclaimer = styled.p`
  margin-top: 28px; font-size: 12.5px; line-height: 1.6; color: ${muted};
`;

/* ============================================================
   KOMPONENTE
   ============================================================ */

const BudgetRechner = () => {
  const [guests, setGuests] = useState(70);
  const [styleId, setStyleId] = useState('klassisch');
  const [openTip, setOpenTip] = useState(null);
  const [copied, setCopied] = useState(false);

  const style = STYLES.find((s) => s.id === styleId);
  const total = useMemo(() => Math.round((style.base + guests * style.perGuest) / 100) * 100, [guests, style]);

  const copyLink = useCallback(() => {
    const url = 'https://www.sarahiver.com/hochzeitsbudget-rechner';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
  }, []);

  const schema = {
    '@type': 'WebApplication',
    name: 'Hochzeitsbudget-Rechner',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    publisher: { '@type': 'Organization', name: 'S&I. Wedding', url: 'https://www.sarahiver.com' },
  };

  return (
    <Page>
      <ToolFonts />
      <SEOHead
        title="Hochzeitsbudget-Rechner: Was kostet eure Hochzeit wirklich?"
        description="Gästezahl und Stil eingeben – realistische Kostenschätzung mit Aufschlüsselung nach Kategorien erhalten. Kostenloser Hochzeitsbudget-Rechner für Deutschland, Österreich & Schweiz."
        path="/hochzeitsbudget-rechner"
        type="website"
        schema={schema}
        keywords={['hochzeitsbudget rechner', 'was kostet eine hochzeit', 'hochzeit kosten rechner', 'hochzeitskosten pro gast', 'hochzeitsbudget planen']}
      />
      <Shell>
        <TopBar>
          <Brand to="/">S&amp;I.</Brand>
          <Link to="/hochzeitsdatum-finder">Zum Hochzeitsdatum-Finder →</Link>
        </TopBar>

        <Kicker>Kostenloses Tool von S&amp;I.</Kicker>
        <H1>Der Hochzeitsbudget-Rechner</H1>
        <Sub>
          Die erste und wichtigste Frage der Hochzeitsplanung – beantwortet in 30 Sekunden:
          Gästezahl wählen, Stil wählen, realistische Kostenverteilung erhalten. Basierend auf
          Erfahrungswerten aus dem DACH-Raum.
        </Sub>

        <Panel>
          <Label htmlFor="guests">Wie viele Gäste feiern mit?</Label>
          <GuestRow>
            <input
              id="guests" type="range" min="20" max="200" step="5" value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              aria-valuetext={`${guests} Gäste`}
            />
            <GuestNum>{guests}</GuestNum>
          </GuestRow>
        </Panel>

        <Panel>
          <Label as="p">Welcher Stil passt zu euch?</Label>
          <StyleGrid role="group" aria-label="Hochzeitsstil wählen">
            {STYLES.map((s) => (
              <StyleCard key={s.id} $active={styleId === s.id} onClick={() => setStyleId(s.id)} aria-pressed={styleId === s.id}>
                <h3>{s.label}</h3>
                <p>{s.note}</p>
              </StyleCard>
            ))}
          </StyleGrid>
        </Panel>

        <Result aria-live="polite">
          <TotalKicker>Euer Richtwert</TotalKicker>
          <Total>{euro(total)}</Total>
          <PerGuest>≈ {euro(total / guests)} pro Gast · {guests} Gäste · Stil: {style.label}</PerGuest>

          {CATEGORIES.map((c) => {
            const amount = Math.round((total * c.pct) / 100 / 50) * 50;
            const open = openTip === c.key;
            return (
              <React.Fragment key={c.key}>
                <Row>
                  <RowName onClick={() => setOpenTip(open ? null : c.key)} aria-expanded={open}>
                    {c.key} <span>{c.pct} % {open ? '▴' : '▾'}</span>
                  </RowName>
                  <Bar $pct={c.pct} aria-hidden="true" />
                  <RowAmount>{euro(amount)}</RowAmount>
                  {open && <Tip>{c.tip}</Tip>}
                </Row>
              </React.Fragment>
            );
          })}
        </Result>

        <Disclaimer>
          Alle Werte sind Richtwerte auf Basis typischer DACH-Hochzeiten (Stand 2026) und ersetzen
          keine individuellen Angebote. Regionale Unterschiede – besonders bei Locations in
          Großstädten – können deutlich ausfallen.
        </Disclaimer>

        <ShareBox>
          <p>
            <strong>Ihr schreibt über Hochzeitsplanung?</strong> Dieser Rechner darf gerne verlinkt
            oder Paaren empfohlen werden – dauerhaft kostenlos, ohne Anmeldung.
          </p>
          <CopyBtn onClick={copyLink}>{copied ? '✓ Link kopiert' : 'Link zum Tool kopieren'}</CopyBtn>
        </ShareBox>

        <CTA>
          <h2>4 % fürs Digitale – 100 % weniger Chaos.</h2>
          <p>
            Papeterie &amp; Website sind der kleinste Posten eures Budgets, sparen aber die meiste
            Zeit: RSVP, Erinnerungen, Gäste-Infos und Foto-Sammlung laufen automatisch.
          </p>
          <a href="https://www.sarahiver.com">Hochzeitswebsites entdecken</a>
        </CTA>

        <Related>
          <p>Weiterlesen im Hochzeits-Blog:</p>
          <Link to="/blog/hochzeit-2027-planen-checkliste">Hochzeit 2027 planen: Die komplette Checkliste</Link><br />
          <Link to="/blog/hochzeitswebsite-kosten-was-kostet">Hochzeitswebsite Kosten: Alle Preismodelle im Vergleich</Link><br />
          <Link to="/blog/hochzeitsdatum-2027">Hochzeitsdatum 2027: Die besten Termine</Link>
        </Related>
      </Shell>
    </Page>
  );
};

export default BudgetRechner;
