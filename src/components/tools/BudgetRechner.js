// src/components/tools/BudgetRechner.js
// Kostenloses Tool: Hochzeitsbudget-Rechner für den DACH-Raum (v2)
// Modulares Modell: 8 Vorabfragen statt Pauschal-Stil – bildet auch
// Edge Cases ab (große Party statt klassischer Hochzeit, Selbstversorgung,
// keine Torte, mehrtägige Feier …). Mit Preisherkunfts-Erklärung.
import React, { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import SEOHead from '../shared/SEOHead';

/* ============================================================
   BUDGET-MODELL
   Jede Option: fix (einmalig) + perGuest (pro Gast), Werte sind
   DACH-Erfahrungswerte Stand 2026 (siehe Transparenz-Block unten).
   ============================================================ */

const QUESTIONS = [
  {
    id: 'location',
    label: 'Wo feiert ihr?',
    category: 'Location',
    options: [
      { id: 'privat', label: 'Privat / Garten / Vereinsheim', fix: 600, perGuest: 0, hint: 'Zelt, Mobiliar oder Miete in kleinem Rahmen' },
      { id: 'restaurant', label: 'Restaurant', fix: 0, perGuest: 0, hint: 'Raummiete meist im Menüpreis enthalten' },
      { id: 'event', label: 'Eventlocation / Scheune', fix: 2800, perGuest: 0, hint: 'Tagesmiete, oft inkl. Grundausstattung' },
      { id: 'premium', label: 'Schloss / Gut / Premium', fix: 6000, perGuest: 0, hint: 'Exklusive Tagesmiete' },
    ],
  },
  {
    id: 'food',
    label: 'Wie lauft das Essen?',
    category: 'Essen & Getränke',
    options: [
      { id: 'menu', label: 'Mehrgängiges Menü', fix: 0, perGuest: 115, hint: 'Menü + Getränkepauschale' },
      { id: 'buffet', label: 'Buffet vom Caterer', fix: 0, perGuest: 80, hint: 'Buffet + Getränke' },
      { id: 'foodtruck', label: 'Foodtruck / Street Food', fix: 500, perGuest: 42, hint: 'Anfahrt + pro Portion, Getränke selbst' },
      { id: 'selbst', label: 'Selbst organisiert', fix: 0, perGuest: 25, hint: 'Einkauf, Helfer aus Familie & Freundeskreis' },
    ],
  },
  {
    id: 'cake',
    label: 'Gibt es eine Hochzeitstorte?',
    category: 'Torte & Kuchen',
    options: [
      { id: 'konditor', label: 'Torte vom Konditor', fix: 450, perGuest: 1, hint: 'Mehrstöckig, Lieferung inkl.' },
      { id: 'buffetkuchen', label: 'Kuchenbuffet (Familie backt)', fix: 80, perGuest: 0, hint: 'Zutaten & Equipment' },
      { id: 'keine', label: 'Keine Torte', fix: 0, perGuest: 0, hint: 'Dessert läuft übers Essen' },
    ],
  },
  {
    id: 'ceremony',
    label: 'Wie wird getraut?',
    category: 'Trauung',
    options: [
      { id: 'standesamt', label: 'Nur Standesamt', fix: 180, perGuest: 0, hint: 'Gebühren + Urkunden' },
      { id: 'frei', label: 'Standesamt + freie Trauung', fix: 1300, perGuest: 0, hint: 'Redner:in inkl. Vorgespräche' },
      { id: 'kirche', label: 'Standesamt + kirchlich', fix: 450, perGuest: 0, hint: 'Spende, Musik, Schmuck' },
    ],
  },
  {
    id: 'photo',
    label: 'Wer hält den Tag fest?',
    category: 'Foto & Video',
    options: [
      { id: 'fotovideo', label: 'Profi: Foto + Video', fix: 4200, perGuest: 0, hint: 'Ganztags, zwei Gewerke' },
      { id: 'foto', label: 'Profi: Foto ganztags', fix: 2600, perGuest: 0, hint: 'Getting Ready bis Party' },
      { id: 'halbtags', label: 'Profi: Foto halbtags', fix: 1400, perGuest: 0, hint: 'Trauung + Empfang' },
      { id: 'fotobox', label: 'Fotobox + Gäste-Upload', fix: 380, perGuest: 0, hint: 'Box-Miete; Gästefotos digital sammeln' },
    ],
  },
  {
    id: 'music',
    label: 'Was läuft auf der Tanzfläche?',
    category: 'Musik & Unterhaltung',
    options: [
      { id: 'band', label: 'Live-Band', fix: 3500, perGuest: 0, hint: 'Inkl. Technik' },
      { id: 'dj', label: 'DJ', fix: 1400, perGuest: 0, hint: 'Inkl. Anlage & Licht' },
      { id: 'playlist', label: 'Eigene Playlist + Anlage', fix: 280, perGuest: 0, hint: 'Boxen-Miete; Musikwünsche vorab sammeln' },
    ],
  },
  {
    id: 'outfit',
    label: 'Wie tretet ihr auf?',
    category: 'Outfits & Beauty',
    options: [
      { id: 'klassisch', label: 'Klassisch (Brautkleid + Anzug)', fix: 2800, perGuest: 0, hint: 'Inkl. Änderungen, Schuhe, Styling' },
      { id: 'elegant', label: 'Elegant, aber entspannt', fix: 1400, perGuest: 0, hint: 'Festliche Outfits ohne Couture' },
      { id: 'locker', label: 'Eure Lieblingsoutfits', fix: 600, perGuest: 0, hint: 'Party-tauglich statt Protokoll' },
    ],
  },
  {
    id: 'days',
    label: 'Wie lange wird gefeiert?',
    category: 'Feier-Umfang',
    options: [
      { id: 'eintag', label: 'Ein Tag', fix: 0, perGuest: 0, hint: 'Der Klassiker' },
      { id: 'wochenende', label: 'Ganzes Wochenende', fix: 0, perGuest: 35, hint: 'Welcome-Abend + Day-After-Brunch' },
    ],
  },
];

// Feste Posten (immer dabei)
const FIXED = [
  { category: 'Deko & Blumen', calc: (g, a) => (a.outfit === 'locker' ? 500 : a.location === 'premium' ? 2200 : 1300), tip: 'DIY und Mietdeko sparen deutlich; Florist-Vollservice liegt eher bei 1.800–2.500 €.' },
  { category: 'Ringe', calc: () => 900, tip: 'Spanne riesig (300–3.000 €+). Mit Gravur 8–12 Wochen Vorlauf.' },
  { category: 'Papeterie & Hochzeitswebsite', calc: () => 450, tip: 'Digital-first (Save-the-Date + Website mit RSVP) spart Porto, Druck und Wochen an Verwaltung.' },
];

const TIPS = {
  'Location': 'Bei Eventlocations auf Exklusivität, Sperrstunde und Korkgeld achten – das steht im Kleingedruckten.',
  'Essen & Getränke': 'Der größte Hebel im Budget. Getränkepauschale vs. Abrechnung nach Verbrauch vorab klären.',
  'Torte & Kuchen': 'Ein Kuchenbuffet von Familie & Freunden ist persönlicher als jede Etagere – und fast kostenlos.',
  'Trauung': 'Freie Redner:innen für die Hauptsaison 12+ Monate im Voraus anfragen.',
  'Foto & Video': 'Wenn gespart werden muss: lieber halbtags Profi als ganztags Hobby. Die Trauung gibt es nur einmal.',
  'Musik & Unterhaltung': 'Musikwünsche vorab digital sammeln füllt jede Tanzfläche – egal ob DJ oder Playlist.',
  'Outfits & Beauty': 'Brautkleid: Änderungen mit +15–20 % auf den Kleidpreis einkalkulieren.',
  'Feier-Umfang': 'Mehrtages-Feiern brauchen keine Vollverpflegung: Welcome-Abend als lockeres Get-together planen.',
};

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
const Shell = styled.div`max-width: 960px; margin: 0 auto;`;
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
const Sub = styled.p`font-size: 17px; line-height: 1.65; color: ${muted}; max-width: 62ch; margin: 0 0 48px;`;

const Panel = styled.section`
  background: ${cardBg}; border: 1px solid ${line}; padding: 24px 28px; margin-bottom: 14px;
`;

const Label = styled.p`
  font-family: 'Space Grotesk', monospace; font-size: 12px;
  letter-spacing: 0.14em; text-transform: uppercase; color: ${muted}; margin: 0 0 14px;
`;

const GuestRow = styled.div`
  display: flex; align-items: center; gap: 20px;
  input[type='range'] { flex: 1; accent-color: ${accent}; }
`;

const GuestNum = styled.span`
  font-family: 'Instrument Serif', Georgia, serif; font-size: 44px; min-width: 84px; text-align: right;
`;

const Chips = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;

const Chip = styled.button`
  font-family: 'Inter', sans-serif; font-size: 13.5px; padding: 10px 16px;
  background: ${(p) => (p.$active ? ink : 'transparent')};
  color: ${(p) => (p.$active ? paper : ink)};
  border: 1px solid ${(p) => (p.$active ? ink : line)}; cursor: pointer;
  span { display: block; font-size: 11px; color: ${(p) => (p.$active ? '#CFC6B8' : muted)}; margin-top: 2px; }
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

const PerGuest = styled.p`text-align: center; font-size: 14.5px; color: ${muted}; margin: 0 0 36px;`;

const Row = styled.div`
  display: grid; grid-template-columns: 1fr 110px; gap: 14px; align-items: baseline;
  padding: 13px 0; border-top: 1px solid ${line};
`;

const RowName = styled.button`
  text-align: left; font-size: 14.5px; font-weight: 500; color: ${ink};
  background: none; border: 0; padding: 0; cursor: pointer; font-family: 'Inter', sans-serif;
  span { display: block; color: ${muted}; font-weight: 400; font-size: 12.5px; margin-top: 2px; }
  &:hover, &:focus-visible { color: ${accent}; outline: none; }
`;

const RowAmount = styled.p`
  font-family: 'Space Grotesk', monospace; font-size: 15px; text-align: right; margin: 0;
`;

const Tip = styled.p`
  grid-column: 1 / -1; font-size: 13.5px; line-height: 1.6; color: ${muted};
  margin: 0; padding: 2px 0 6px;
`;

const Explain = styled.details`
  margin-top: 28px; border: 1px solid ${line}; background: ${cardBg};
  summary {
    cursor: pointer; padding: 18px 22px; font-size: 14.5px; font-weight: 600; list-style: none;
    &::-webkit-details-marker { display: none; }
    &::after { content: ' ▾'; color: ${muted}; }
    &:focus-visible { outline: 2px solid ${accent}; outline-offset: -2px; }
  }
  &[open] summary::after { content: ' ▴'; }
  div { padding: 0 22px 22px; font-size: 14px; line-height: 1.7; color: ${muted}; }
  div p { margin: 0 0 12px; }
  strong { color: ${ink}; }
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

/* ============================================================
   KOMPONENTE
   ============================================================ */

const DEFAULTS = {
  location: 'event', food: 'buffet', cake: 'konditor', ceremony: 'frei',
  photo: 'foto', music: 'dj', outfit: 'klassisch', days: 'eintag',
};

const BudgetRechner = () => {
  const [guests, setGuests] = useState(70);
  const [answers, setAnswers] = useState(DEFAULTS);
  const [openTip, setOpenTip] = useState(null);
  const [copied, setCopied] = useState(false);

  const setAnswer = (qid, oid) => setAnswers((a) => ({ ...a, [qid]: oid }));

  const breakdown = useMemo(() => {
    const rows = QUESTIONS.map((q) => {
      const opt = q.options.find((o) => o.id === answers[q.id]);
      const amount = opt.fix + opt.perGuest * guests;
      return { category: q.category, choice: opt.label, amount, tip: TIPS[q.category] };
    }).filter((r) => r.amount > 0 || r.category === 'Essen & Getränke');

    FIXED.forEach((f) => {
      rows.push({ category: f.category, choice: null, amount: f.calc(guests, answers), tip: f.tip });
    });

    const subtotal = rows.reduce((s, r) => s + r.amount, 0);
    const puffer = Math.round((subtotal * 0.08) / 50) * 50;
    rows.push({ category: 'Puffer (8 %)', choice: null, amount: puffer, tip: 'Die wichtigste Zeile: Ohne Reserve wird der letzte Monat teuer und ungemütlich.' });

    const total = Math.round((subtotal + puffer) / 100) * 100;
    return { rows: rows.map((r) => ({ ...r, amount: Math.round(r.amount / 50) * 50 })), total };
  }, [guests, answers]);

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
        description="Gästezahl wählen, 8 kurze Fragen beantworten – realistische Kostenschätzung erhalten. Vom DIY-Gartenfest bis zur Premium-Hochzeit. Kostenlos, ohne Anmeldung."
        path="/hochzeitsbudget-rechner"
        type="website"
        schema={schema}
        keywords={['hochzeitsbudget rechner', 'was kostet eine hochzeit', 'hochzeit kosten rechner', 'hochzeitskosten pro gast', 'hochzeit günstig feiern', 'hochzeitsbudget planen']}
      />
      <Shell>
        <TopBar>
          <Brand to="/">S&amp;I.</Brand>
          <Link to="/hochzeitsdatum-finder">Zum Hochzeitsdatum-Finder →</Link>
        </TopBar>

        <Kicker>Kostenloses Tool von S&amp;I.</Kicker>
        <H1>Der Hochzeitsbudget-Rechner</H1>
        <Sub>
          Keine Hochzeit ist wie die andere – euer Budget auch nicht. Beantwortet 8 kurze Fragen
          zu eurer Feier, und wir rechnen euch einen realistischen Richtwert aus: vom selbst
          organisierten Gartenfest bis zur Premium-Hochzeit im Schloss.
        </Sub>

        <Panel>
          <Label as="label" htmlFor="guests">Wie viele Gäste feiern mit?</Label>
          <GuestRow>
            <input
              id="guests" type="range" min="20" max="200" step="5" value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              aria-valuetext={`${guests} Gäste`}
            />
            <GuestNum>{guests}</GuestNum>
          </GuestRow>
        </Panel>

        {QUESTIONS.map((q) => (
          <Panel key={q.id}>
            <Label>{q.label}</Label>
            <Chips role="group" aria-label={q.label}>
              {q.options.map((o) => (
                <Chip key={o.id} $active={answers[q.id] === o.id} aria-pressed={answers[q.id] === o.id} onClick={() => setAnswer(q.id, o.id)}>
                  {o.label}
                  <span>{o.hint}</span>
                </Chip>
              ))}
            </Chips>
          </Panel>
        ))}

        <Result aria-live="polite">
          <TotalKicker>Euer Richtwert</TotalKicker>
          <Total>{euro(breakdown.total)}</Total>
          <PerGuest>≈ {euro(breakdown.total / guests)} pro Gast · {guests} Gäste</PerGuest>

          {breakdown.rows.map((r) => {
            const open = openTip === r.category;
            return (
              <Row key={r.category}>
                <RowName onClick={() => setOpenTip(open ? null : r.category)} aria-expanded={open}>
                  {r.category} {open ? '▴' : '▾'}
                  {r.choice && <span>{r.choice}</span>}
                </RowName>
                <RowAmount>{euro(r.amount)}</RowAmount>
                {open && <Tip>{r.tip}</Tip>}
              </Row>
            );
          })}
        </Result>

        <Explain>
          <summary>Woher kommen diese Zahlen?</summary>
          <div>
            <p>
              <strong>Erfahrungswerte aus dem DACH-Raum, Stand 2026</strong> – zusammengetragen aus
              realen Dienstleister-Angeboten, Location-Preislisten und den Budgets von Paaren, die
              wir bei ihrer Hochzeitswebsite begleitet haben. Es sind Mittelwerte: Ein DJ kostet je
              nach Region 900–2.200 €, wir rechnen mit 1.400 €.
            </p>
            <p>
              <strong>Darum fragt der Rechner vorab, was ihr plant:</strong> Pauschale
              "Pro-Kopf-Preise" führen in die Irre. Eine selbst organisierte Feier mit Playlist,
              Fotobox und Kuchenbuffet kostet mit 100 Gästen real unter 10.000 € – eine klassische
              Hochzeit mit Menü, Profi-Foto und freier Trauung liegt bei gleicher Gästezahl beim
              Drei- bis Vierfachen. Beides sind großartige Hochzeiten. Der Unterschied ist nicht
              die Gästezahl, sondern eure Entscheidungen – genau die fragt der Rechner ab.
            </p>
            <p>
              <strong>Was der Rechner nicht weiß:</strong> Regionale Ausreißer (Münchner Locations,
              Zürcher Caterer), Hochsaison-Aufschläge und eure Verhandlungskünste. Nutzt den
              Richtwert als Startpunkt fürs Gespräch, nicht als Festpreis.
            </p>
          </div>
        </Explain>

        <ShareBox>
          <p>
            <strong>Ihr schreibt über Hochzeitsplanung?</strong> Dieser Rechner darf gerne verlinkt
            oder Paaren empfohlen werden – dauerhaft kostenlos, ohne Anmeldung.
          </p>
          <CopyBtn onClick={copyLink}>{copied ? '✓ Link kopiert' : 'Link zum Tool kopieren'}</CopyBtn>
        </ShareBox>

        <CTA>
          <h2>Der kleinste Posten spart die meiste Zeit.</h2>
          <p>
            Papeterie &amp; Website machen kaum 2 % eures Budgets aus – nehmen euch aber RSVP,
            Erinnerungen, Gäste-Fragen und Foto-Sammlung komplett ab. Egal ob Schloss oder Gartenparty.
          </p>
          <a href="/#contact">Unverbindlich anfragen</a>
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
