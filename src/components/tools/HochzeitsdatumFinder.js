// src/components/tools/HochzeitsdatumFinder.js
// Kostenloses Tool: Die besten Hochzeitstermine 2027 & 2028
// Schnapszahlen, Feiertage & Brückentage – berechnet, nicht hardcoded.
// Linkable Asset: ohne Anmeldung nutzbar, mit "Tool verlinken"-Block.
import React, { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import SEOHead from '../shared/SEOHead';

/* ============================================================
   DATUMS-LOGIK
   ============================================================ */

// Ostersonntag (Anonymous Gregorian / Gauß)
const easterSunday = (year) => {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
};

const addDays = (date, n) => new Date(date.getTime() + n * 86400000);
const d = (y, m, day) => new Date(Date.UTC(y, m - 1, day));
const WEEKDAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const fmt = (date) => `${String(date.getUTCDate()).padStart(2, '0')}.${String(date.getUTCMonth() + 1).padStart(2, '0')}.${date.getUTCFullYear()}`;
const fmtShort = (date) => `${String(date.getUTCDate()).padStart(2, '0')}.${String(date.getUTCMonth() + 1).padStart(2, '0')}.${String(date.getUTCFullYear()).slice(2)}`;
const weekday = (date) => WEEKDAYS[date.getUTCDay()];

// Buß- und Bettag: Mittwoch vor dem 23.11.
const bussUndBettag = (year) => {
  let date = d(year, 11, 22);
  while (date.getUTCDay() !== 3) date = addDays(date, -1);
  return date;
};

export const REGIONS = [
  { id: 'DE-BW', name: 'Baden-Württemberg' }, { id: 'DE-BY', name: 'Bayern' },
  { id: 'DE-BE', name: 'Berlin' }, { id: 'DE-BB', name: 'Brandenburg' },
  { id: 'DE-HB', name: 'Bremen' }, { id: 'DE-HH', name: 'Hamburg' },
  { id: 'DE-HE', name: 'Hessen' }, { id: 'DE-MV', name: 'Mecklenburg-Vorpommern' },
  { id: 'DE-NI', name: 'Niedersachsen' }, { id: 'DE-NW', name: 'Nordrhein-Westfalen' },
  { id: 'DE-RP', name: 'Rheinland-Pfalz' }, { id: 'DE-SL', name: 'Saarland' },
  { id: 'DE-SN', name: 'Sachsen' }, { id: 'DE-ST', name: 'Sachsen-Anhalt' },
  { id: 'DE-SH', name: 'Schleswig-Holstein' }, { id: 'DE-TH', name: 'Thüringen' },
  { id: 'AT', name: 'Österreich' }, { id: 'CH', name: 'Schweiz (national verbreitet)' },
];

const holidaysFor = (year, region) => {
  const E = easterSunday(year);
  const list = [];
  const add = (date, name, regions) => {
    if (regions === 'all' || regions.includes(region) || (regions === 'allDE' && region.startsWith('DE'))) {
      list.push({ date, name });
    }
  };

  if (region.startsWith('DE')) {
    add(d(year, 1, 1), 'Neujahr', 'all');
    add(d(year, 1, 6), 'Heilige Drei Könige', ['DE-BW', 'DE-BY', 'DE-ST']);
    add(d(year, 3, 8), 'Internationaler Frauentag', ['DE-BE', 'DE-MV']);
    add(addDays(E, -2), 'Karfreitag', 'allDE');
    add(addDays(E, 1), 'Ostermontag', 'allDE');
    add(d(year, 5, 1), 'Tag der Arbeit', 'allDE');
    add(addDays(E, 39), 'Christi Himmelfahrt', 'allDE');
    add(addDays(E, 50), 'Pfingstmontag', 'allDE');
    add(addDays(E, 60), 'Fronleichnam', ['DE-BW', 'DE-BY', 'DE-HE', 'DE-NW', 'DE-RP', 'DE-SL']);
    add(d(year, 8, 15), 'Mariä Himmelfahrt', ['DE-SL']);
    add(d(year, 9, 20), 'Weltkindertag', ['DE-TH']);
    add(d(year, 10, 3), 'Tag der Deutschen Einheit', 'allDE');
    add(d(year, 10, 31), 'Reformationstag', ['DE-BB', 'DE-HB', 'DE-HH', 'DE-MV', 'DE-NI', 'DE-SN', 'DE-ST', 'DE-SH', 'DE-TH']);
    add(d(year, 11, 1), 'Allerheiligen', ['DE-BW', 'DE-BY', 'DE-NW', 'DE-RP', 'DE-SL']);
    add(bussUndBettag(year), 'Buß- und Bettag', ['DE-SN']);
    add(d(year, 12, 25), '1. Weihnachtstag', 'allDE');
    add(d(year, 12, 26), '2. Weihnachtstag', 'allDE');
  } else if (region === 'AT') {
    [[1, 1, 'Neujahr'], [1, 6, 'Heilige Drei Könige'], [5, 1, 'Staatsfeiertag'], [8, 15, 'Mariä Himmelfahrt'],
     [10, 26, 'Nationalfeiertag'], [11, 1, 'Allerheiligen'], [12, 8, 'Mariä Empfängnis'],
     [12, 25, 'Christtag'], [12, 26, 'Stefanitag']].forEach(([m, day, name]) => add(d(year, m, day), name, 'all'));
    add(addDays(E, 1), 'Ostermontag', 'all');
    add(addDays(E, 39), 'Christi Himmelfahrt', 'all');
    add(addDays(E, 50), 'Pfingstmontag', 'all');
    add(addDays(E, 60), 'Fronleichnam', 'all');
  } else if (region === 'CH') {
    [[1, 1, 'Neujahr'], [8, 1, 'Bundesfeiertag'], [12, 25, 'Weihnachten']].forEach(([m, day, name]) => add(d(year, m, day), name, 'all'));
    add(addDays(E, -2), 'Karfreitag', 'all');
    add(addDays(E, 1), 'Ostermontag', 'all');
    add(addDays(E, 39), 'Auffahrt', 'all');
    add(addDays(E, 50), 'Pfingstmontag', 'all');
  }
  return list.sort((a, b) => a.date - b.date);
};

// Besondere Daten (Schnapszahlen & Symboldaten) – regelbasiert pro Jahr
const specialDates = (year) => {
  const yy = year % 100;
  const out = [];

  // Doppeldaten: Tag == Monat (09.09., 07.07. …)
  for (let m = 1; m <= 12; m++) {
    const date = d(year, m, m);
    let label = 'Doppeldatum';
    let why = `Tag und Monat sind gleich – ${fmtShort(date)} merkt sich jeder Gast.`;
    let top = false;
    if (m === 7) { label = 'Glückszahl-Datum'; why = `Die doppelte Glückssieben – ${fmtShort(date)} ist das symbolträchtigste Datum des Jahres.`; top = true; }
    if (m === 8 && yy === 28) { label = 'Glückszahl-Datum'; why = `Doppelte Acht – die 8 steht für Unendlichkeit und Glück: ${fmtShort(date)}.`; top = true; }
    if (m === 9) { why = `Die doppelte Neun steht traditionell für Beständigkeit – ${fmtShort(date)}.`; }
    out.push({ date, label, why, top });
  }

  // Jahreszahl-Daten: Tag == Jahreszahl (27.MM.27 / 28.MM.28)
  for (let m = 1; m <= 12; m++) {
    if (yy >= 1 && yy <= 28) {
      const date = d(year, m, yy);
      let top = false;
      let why = `Tag und Jahr spiegeln sich: ${fmtShort(date)}.`;
      if (m === yy - 20 && yy === 27) { /* 27.07.27 */ }
      if (yy === 27 && m === 7) { why = `${fmtShort(date)} – die perfekte Spiegelung aus Tag, Glückszahl-Monat und Jahr.`; top = true; }
      out.push({ date, label: 'Spiegeldatum', why, top });
    }
  }

  // Schalttag
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    out.push({
      date: d(year, 2, 29), label: 'Schalttag', top: true,
      why: 'Der 29. Februar existiert nur alle vier Jahre – euer Hochzeitstag wird ein echtes Ereignis.',
    });
  }

  // Deduplizieren (07.07. ist Doppel- UND ggf. anders erfasst)
  const seen = new Set();
  return out.filter((x) => {
    const k = x.date.getTime();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).sort((a, b) => (b.top - a.top) || (a.date - b.date));
};

// Lange Wochenenden aus Feiertagen ableiten
const longWeekends = (year, region) => {
  const hols = holidaysFor(year, region).filter((h) => {
    const m = h.date.getUTCMonth();
    return m >= 2 && m <= 10; // März–November: realistische Hochzeitsfenster
  });
  return hols.map((h) => {
    const wd = h.date.getUTCDay();
    let tip = null;
    if (wd === 4) tip = { days: 4, text: 'Brückentag Freitag: Feier von Donnerstag bis Sonntag möglich – ideal für Mehrtages-Konzepte.', dates: [h.date, addDays(h.date, 1), addDays(h.date, 2)] };
    if (wd === 5) tip = { days: 3, text: 'Feiertags-Freitag: Hochzeit am Freitag oder Samstag, alle haben ein langes Wochenende.', dates: [h.date, addDays(h.date, 1)] };
    if (wd === 1) tip = { days: 3, text: 'Feiertags-Montag: Sonntags-Hochzeit ohne schlechtes Gewissen – eure Gäste schlafen Montag aus.', dates: [addDays(h.date, -1), addDays(h.date, -2)] };
    if (wd === 2) tip = { days: 4, text: 'Brückentag Montag: Hochzeit am Samstag, entspannte Anreise & Abreise rundherum.', dates: [addDays(h.date, -2), addDays(h.date, -3)] };
    if (wd === 6) tip = { days: 2, text: 'Feiertag am Samstag: Niemand muss Urlaub nehmen – aber früh buchen, diese Termine sind begehrt.', dates: [h.date] };
    if (wd === 0) tip = { days: 2, text: 'Feiertag am Sonntag: Samstags heiraten – der Tag danach ist für alle frei.', dates: [addDays(h.date, -1)] };
    return tip ? { holiday: h, ...tip } : null;
  }).filter(Boolean);
};

// Alle Samstage Mai–Oktober, mit Langes-Wochenende-Badge
const saturdays = (year, region) => {
  const hols = new Set(holidaysFor(year, region).map((h) => h.date.getTime()));
  const out = [];
  let date = d(year, 5, 1);
  while (date.getUTCDay() !== 6) date = addDays(date, 1);
  while (date.getUTCMonth() <= 9) {
    const fri = addDays(date, -1), mon = addDays(date, 2);
    const long = hols.has(fri.getTime()) || hols.has(mon.getTime()) || hols.has(date.getTime());
    out.push({ date, long });
    date = addDays(date, 7);
  }
  return out;
};

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
  min-height: 100vh;
  background: ${paper};
  color: ${ink};
  font-family: 'Inter', sans-serif;
  padding: ${(p) => (p.$embed ? '20px 16px 16px' : '0 24px 96px')};
`;

const Shell = styled.div`max-width: 1040px; margin: 0 auto;`;

const TopBar = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 28px 0; border-bottom: 1px solid ${line};
  a { color: ${ink}; text-decoration: none; font-size: 14px; letter-spacing: 0.04em; }
  a:hover, a:focus-visible { color: ${accent}; }
`;

const Brand = styled(Link)`font-weight: 600;`;

const Kicker = styled.p`
  font-family: 'Space Grotesk', monospace; font-size: 12px; letter-spacing: 0.22em;
  text-transform: uppercase; color: ${accent}; margin: 64px 0 16px;
`;

const H1 = styled.h1`
  font-family: 'Instrument Serif', Georgia, serif; font-weight: 400;
  font-size: ${(p) => (p.$embed ? 'clamp(26px, 5vw, 34px)' : 'clamp(40px, 6vw, 72px)')};
  line-height: 1.02; margin: ${(p) => (p.$embed ? '4px 0 18px' : '0 0 20px')}; max-width: 17ch;
`;

const Sub = styled.p`font-size: 17px; line-height: 1.65; color: ${muted}; max-width: 62ch; margin: 0 0 48px;`;

const Controls = styled.div`
  display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 14px;
`;

const Seg = styled.div`
  display: inline-flex; border: 1px solid ${ink}; border-radius: 999px; overflow: hidden;
  button {
    font-family: 'Space Grotesk', monospace; font-size: 14px; padding: 10px 22px;
    background: transparent; border: 0; cursor: pointer; color: ${ink};
    &[aria-pressed='true'] { background: ${ink}; color: ${paper}; }
    &:focus-visible { outline: 2px solid ${accent}; outline-offset: -2px; }
  }
`;

const Select = styled.select`
  font-family: 'Inter', sans-serif; font-size: 14px; padding: 10px 16px;
  border: 1px solid ${ink}; border-radius: 999px; background: transparent; color: ${ink};
  cursor: pointer; max-width: 100%;
  &:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
`;

const Tabs = styled.div`
  display: flex; gap: 26px; border-bottom: 1px solid ${line}; margin: 26px 0 0;
  overflow-x: auto;
  button {
    font-family: 'Inter', sans-serif; font-size: 15px; padding: 14px 2px; white-space: nowrap;
    background: none; border: 0; border-bottom: 2px solid transparent; cursor: pointer; color: ${muted};
    &[aria-selected='true'] { color: ${ink}; border-bottom-color: ${accent}; font-weight: 600; }
    &:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
  }
`;

/* Signature: die Save-the-Date-Bühne */
const Stage = styled.section`
  margin: 40px 0; background: ${cardBg}; border: 1px solid ${line};
  padding: clamp(36px, 6vw, 72px) 24px; text-align: center; position: relative;
  &::before, &::after {
    content: ''; position: absolute; inset: 10px; pointer-events: none;
    border: 1px solid ${line};
  }
`;

const StageKicker = styled.p`
  font-family: 'Space Grotesk', monospace; font-size: 11px; letter-spacing: 0.3em;
  text-transform: uppercase; color: ${muted}; margin: 0 0 14px;
`;

const StageDate = styled.p`
  font-family: 'Instrument Serif', Georgia, serif; font-style: italic;
  font-size: clamp(56px, 11vw, 128px); line-height: 1; margin: 0 0 14px; color: ${ink};
  font-variant-numeric: lining-nums;
`;

const StageMeta = styled.p`
  font-size: 16px; color: ${ink}; margin: 0 0 6px; font-weight: 600;
`;

const StageWhy = styled.p`font-size: 15px; line-height: 1.6; color: ${muted}; max-width: 52ch; margin: 0 auto;`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(232px, 1fr)); gap: 14px; margin-top: 28px;
`;

const Card = styled.button`
  text-align: left; background: ${cardBg}; border: 1px solid ${(p) => (p.$active ? accent : line)};
  padding: 18px; cursor: pointer; font-family: 'Inter', sans-serif; color: ${ink};
  transition: border-color 0.15s ease, transform 0.15s ease;
  &:hover { border-color: ${accent}; }
  &:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
  @media (prefers-reduced-motion: no-preference) { &:hover { transform: translateY(-2px); } }
`;

const CardDate = styled.p`
  font-family: 'Instrument Serif', Georgia, serif; font-size: 30px; margin: 0 0 2px;
`;

const CardDay = styled.p`font-size: 13px; color: ${(p) => (p.$sat ? accent : muted)}; margin: 0 0 10px; font-weight: ${(p) => (p.$sat ? 600 : 400)};`;

const Badge = styled.span`
  display: inline-block; font-family: 'Space Grotesk', monospace; font-size: 10px;
  letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 9px;
  border: 1px solid ${(p) => (p.$top ? accent : line)}; color: ${(p) => (p.$top ? accent : muted)};
`;

const SectionTitle = styled.h2`
  font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; font-size: 28px; margin: 56px 0 6px;
`;

const SectionNote = styled.p`font-size: 14px; color: ${muted}; margin: 0;`;

const LWRow = styled.div`
  background: ${cardBg}; border: 1px solid ${line}; padding: 20px; margin-top: 14px;
  display: grid; grid-template-columns: 110px 1fr; gap: 18px; align-items: start;
  @media (max-width: 560px) { grid-template-columns: 1fr; gap: 8px; }
`;

const LWDate = styled.div`
  font-family: 'Instrument Serif', Georgia, serif; font-size: 26px; line-height: 1.15;
  span { display: block; font-family: 'Space Grotesk', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: ${accent}; margin-top: 6px; }
`;

const LWBody = styled.div`
  h3 { font-size: 16px; margin: 0 0 6px; font-weight: 600; }
  p { font-size: 14.5px; line-height: 1.6; color: ${muted}; margin: 0 0 8px; }
  em { font-style: normal; color: ${ink}; font-weight: 500; }
`;

const ShareBox = styled.aside`
  margin-top: 72px; border: 1px solid ${ink}; padding: 28px; background: ${cardBg};
  display: flex; flex-wrap: wrap; gap: 18px; align-items: center; justify-content: space-between;
  p { margin: 0; font-size: 14.5px; line-height: 1.6; color: ${muted}; max-width: 56ch; }
  strong { color: ${ink}; }
`;

const CopyBtn = styled.button`
  font-family: 'Space Grotesk', monospace; font-size: 13px; letter-spacing: 0.06em;
  padding: 12px 22px; background: ${ink}; color: ${paper}; border: 1px solid ${ink}; cursor: pointer;
  &:hover { background: ${accent}; border-color: ${accent}; }
  &:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
`;

const EmbedCode = styled.textarea`
  width: 100%; margin-top: 16px; padding: 14px; font-family: 'Space Grotesk', monospace;
  font-size: 12px; line-height: 1.6; color: ${ink}; background: ${paper};
  border: 1px solid ${line}; resize: vertical; min-height: 96px;
`;

const EmbedFooter = styled.p`
  margin: 20px 0 0; padding-top: 14px; border-top: 1px solid ${line};
  font-size: 12.5px; color: ${muted}; text-align: center;
  a { color: ${accent}; text-decoration: none; }
  a:hover, a:focus-visible { text-decoration: underline; }
`;

const CTA = styled.section`
  margin-top: 28px; padding: 40px 28px; background: ${ink}; color: ${paper}; text-align: center;
  h2 { font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; font-size: clamp(26px, 4vw, 36px); margin: 0 0 12px; }
  p { font-size: 15px; line-height: 1.65; color: #CFC6B8; max-width: 56ch; margin: 0 auto 24px; }
  a {
    display: inline-block; font-family: 'Space Grotesk', monospace; font-size: 14px; letter-spacing: 0.06em;
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

const CheckSection = styled.section`
  margin-top: 72px; background: ${cardBg}; border: 1px solid ${line}; padding: 28px;
`;

const CheckControls = styled.div`
  display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px;
`;

const CheckInput = styled.input`
  font-family: 'Inter', sans-serif; font-size: 14.5px; padding: 12px 16px;
  border: 1px solid ${ink}; background: ${paper}; color: ${ink}; min-width: 200px;
  &:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
`;

const CheckBtn = styled.button`
  font-family: 'Space Grotesk', monospace; font-size: 13px; letter-spacing: 0.05em;
  padding: 12px 22px; background: ${ink}; color: ${paper}; border: 1px solid ${ink}; cursor: pointer;
  &:hover:not(:disabled) { background: ${accent}; border-color: ${accent}; }
  &:disabled { opacity: 0.55; cursor: wait; }
  &:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
`;

const CheckBtnGhost = styled(CheckBtn)`
  background: transparent; color: ${ink};
  &:hover:not(:disabled) { background: transparent; color: ${accent}; }
`;

const CheckPending = styled.p`font-size: 14px; color: ${muted}; margin: 18px 0 0;`;

const CheckErrorMsg = styled.p`font-size: 14px; color: ${accent}; margin: 18px 0 0;`;

const riskColor = (r) => (r === 'hoch' ? accent : r === 'mittel' ? '#A8761F' : '#4F6B4A');

const ResultRow = styled(LWRow)`
  border-left: 3px solid ${(p) => riskColor(p.$risk)};
  span { color: ${(p) => riskColor(p.$risk)}; }
`;

const Empfehlung = styled.p`
  margin: 18px 0 0; padding: 16px 18px; background: ${paper}; border: 1px solid ${line};
  font-size: 14.5px; line-height: 1.6;
`;

const CheckDisclaimer = styled.p`font-size: 12px; color: ${muted}; margin: 14px 0 0; line-height: 1.6;`;

/* ============================================================
   KOMPONENTE
   ============================================================ */

const MODES = [
  { id: 'special', label: 'Besondere Daten' },
  { id: 'weekend', label: 'Lange Wochenenden' },
  { id: 'saturday', label: 'Alle Samstage (Mai–Okt)' },
];

const EMBED_SNIPPET = `<iframe src="https://www.sarahiver.com/embed/hochzeitsdatum-finder" width="100%" height="900" style="border:0;max-width:1040px;" title="Hochzeitsdatum-Finder" loading="lazy"></iframe>
<p style="font-size:14px;">Tool: <a href="https://www.sarahiver.com/hochzeitsdatum-finder">Hochzeitsdatum-Finder</a> von <a href="https://www.sarahiver.com/">S&I. – Premium Hochzeitswebsites</a></p>`;

const HochzeitsdatumFinder = ({ embed = false }) => {
  const [year, setYear] = useState(2027);
  const [region, setRegion] = useState('DE-HH');
  const [mode, setMode] = useState('special');
  const [copied, setCopied] = useState(false);

  const specials = useMemo(() => specialDates(year), [year]);
  const weekends = useMemo(() => longWeekends(year, region), [year, region]);
  const sats = useMemo(() => saturdays(year, region), [year, region]);

  const [selected, setSelected] = useState(null);
  const topPick = selected || specials.find((s) => s.top) || specials[0];

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

  const copyLink = useCallback(() => {
    const url = 'https://www.sarahiver.com/hochzeitsdatum-finder';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
  }, []);

  // --- Termin-Check (Claude + Web-Suche, serverseitig via /api/event-check) ---
  const iso = (date) => date.toISOString().slice(0, 10);
  const [city, setCity] = useState('');
  const [checkDate, setCheckDate] = useState('');
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState(null);
  const [checkError, setCheckError] = useState(null);

  const runCheck = useCallback(async (dates) => {
    if (city.trim().length < 2) { setCheckError('Bitte zuerst eure Stadt eingeben.'); return; }
    setChecking(true); setCheckError(null); setCheckResult(null);
    try {
      const res = await fetch('/api/event-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: city.trim(), dates }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Check fehlgeschlagen.');
      setCheckResult(data);
    } catch (e) {
      setCheckError(e.message);
    } finally {
      setChecking(false);
    }
  }, [city]);

  const checkSingle = () => runCheck([checkDate || iso(topPick.date)]);
  const checkTop = () => {
    const candidates = specials
      .filter((s) => s.top || s.date.getUTCDay() === 6)
      .slice(0, 4)
      .map((s) => iso(s.date));
    runCheck(candidates.length ? candidates : specials.slice(0, 3).map((s) => iso(s.date)));
  };

  const schema = {
    '@type': 'WebApplication',
    name: `Hochzeitsdatum-Finder ${year}`,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    publisher: { '@type': 'Organization', name: 'S&I. Wedding', url: 'https://www.sarahiver.com' },
  };

  return (
    <Page $embed={embed}>
      <ToolFonts />
      {!embed && <SEOHead
        title="Hochzeitsdatum-Finder 2027 & 2028: Schnapszahlen, Feiertage & Brückentage"
        description="Findet euer perfektes Hochzeitsdatum: Alle Schnapszahl-Termine, langen Wochenenden und Brückentage 2027 & 2028 – kostenlos, für jedes Bundesland, Österreich und die Schweiz."
        path="/hochzeitsdatum-finder"
        type="website"
        schema={schema}
        keywords={['hochzeitsdatum 2027', 'hochzeitsdatum 2028', 'hochzeitsdatum finder', 'schnapszahl hochzeit', 'beste hochzeitstermine', 'brückentage heiraten']}
      />}
      <Shell>
        {!embed && (
        <TopBar>
          <Brand to="/">S&amp;I.</Brand>
          <Link to="/blog">Zum Hochzeits-Blog →</Link>
        </TopBar>
        )}

        {!embed && <Kicker>Kostenloses Tool von S&amp;I.</Kicker>}
        <H1 $embed={embed}>Der Hochzeitsdatum-Finder</H1>
        {!embed && <Sub>
          Schnapszahlen, lange Wochenenden, Brückentage: Findet in einer Minute die besten
          Hochzeitstermine {year} – berechnet für euer Bundesland, Österreich oder die Schweiz.
          Kostenlos, ohne Anmeldung.
        </Sub>}

        <Controls>
          <Seg role="group" aria-label="Jahr wählen">
            {[2027, 2028].map((y) => (
              <button key={y} aria-pressed={year === y} onClick={() => { setYear(y); setSelected(null); }}>{y}</button>
            ))}
          </Seg>
          <Select aria-label="Region wählen" value={region} onChange={(e) => setRegion(e.target.value)}>
            {REGIONS.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </Select>
        </Controls>

        <Tabs role="tablist" aria-label="Ansicht wählen">
          {MODES.map((m) => (
            <button key={m.id} role="tab" aria-selected={mode === m.id} onClick={() => setMode(m.id)}>{m.label}</button>
          ))}
        </Tabs>

        {mode === 'special' && (
          <>
            <Stage aria-live="polite">
              <StageKicker>Save the Date</StageKicker>
              <StageDate>{fmtShort(topPick.date)}</StageDate>
              <StageMeta>{weekday(topPick.date)} · {topPick.label}</StageMeta>
              <StageWhy>{topPick.why}</StageWhy>
            </Stage>

            <SectionNote>Datum antippen, um es oben auf der Karte zu sehen. Samstage sind markiert – Wochentage sind oft 20–40&nbsp;% günstiger.</SectionNote>
            <Grid>
              {specials.map((s) => {
                const isSat = s.date.getUTCDay() === 6;
                return (
                  <Card key={s.date.getTime()} $active={topPick.date.getTime() === s.date.getTime()} onClick={() => setSelected(s)}>
                    <CardDate>{fmtShort(s.date)}</CardDate>
                    <CardDay $sat={isSat}>{weekday(s.date)}{!isSat && s.date.getUTCDay() !== 5 ? ' · Spartipp' : ''}</CardDay>
                    <Badge $top={s.top}>{s.top ? '★ Top-Datum' : s.label}</Badge>
                  </Card>
                );
              })}
            </Grid>
          </>
        )}

        {mode === 'weekend' && (
          <>
            <SectionTitle>Lange Wochenenden {year}</SectionTitle>
            <SectionNote>
              Feiertage in {REGIONS.find((r) => r.id === region).name} (März–November) – und wie ihr sie für eure Hochzeit nutzt.
            </SectionNote>
            {weekends.map((w) => (
              <LWRow key={w.holiday.date.getTime()}>
                <LWDate>
                  {fmtShort(w.holiday.date)}
                  <span>{w.days} Tage frei</span>
                </LWDate>
                <LWBody>
                  <h3>{w.holiday.name} ({weekday(w.holiday.date)})</h3>
                  <p>{w.text}</p>
                  <p><em>Empfohlene Hochzeitstermine:</em> {w.dates.map((x) => `${weekday(x).slice(0, 2)}, ${fmt(x)}`).join(' · ')}</p>
                </LWBody>
              </LWRow>
            ))}
          </>
        )}

        {mode === 'saturday' && (
          <>
            <SectionTitle>Alle Samstage der Hauptsaison {year}</SectionTitle>
            <SectionNote>Mai bis Oktober. Markiert: Samstage mit angrenzendem Feiertag – maximal gästefreundlich, aber früh ausgebucht.</SectionNote>
            <Grid>
              {sats.map((s) => (
                <Card as="div" key={s.date.getTime()} style={{ cursor: 'default' }}>
                  <CardDate>{fmtShort(s.date)}</CardDate>
                  <CardDay $sat>Samstag · {MONTHS[s.date.getUTCMonth()]}</CardDay>
                  {s.long && <Badge $top>★ Langes Wochenende</Badge>}
                </Card>
              ))}
            </Grid>
          </>
        )}

        <CheckSection aria-labelledby="check-title">
          <SectionTitle id="check-title" style={{ marginTop: 0 }}>Der Termin-Check für eure Stadt</SectionTitle>
          <SectionNote>
            Großkonzert, Marathon, Messe oder Fußball-Turnier am Wunschtermin? Das treibt Hotelpreise
            und blockiert Locations. Wir prüfen es live für euch – Stadt eingeben, Termin wählen, fertig.
          </SectionNote>
          <CheckControls>
            <CheckInput
              type="text" placeholder="Eure Stadt (z. B. Hamburg)" value={city} maxLength={40}
              onChange={(e) => setCity(e.target.value)} aria-label="Stadt für den Termin-Check"
            />
            <CheckInput
              as="input" type="date" value={checkDate || iso(topPick.date)}
              min={`${year}-01-01`} max={`${year + 1}-12-31`}
              onChange={(e) => setCheckDate(e.target.value)} aria-label="Wunschdatum für den Termin-Check"
            />
            <CheckBtn onClick={checkSingle} disabled={checking}>
              {checking ? 'Prüfe …' : 'Dieses Datum prüfen'}
            </CheckBtn>
            <CheckBtnGhost onClick={checkTop} disabled={checking}>
              Top-Termine {year} vergleichen
            </CheckBtnGhost>
          </CheckControls>

          {checkError && <CheckErrorMsg role="alert">{checkError}</CheckErrorMsg>}
          {checking && <CheckPending>Wir durchsuchen Veranstaltungskalender für {city.trim()} – das dauert einen Moment …</CheckPending>}

          {checkResult && (
            <div aria-live="polite">
              {checkResult.results.map((r) => (
                <ResultRow key={r.date} $risk={r.risk}>
                  <LWDate>
                    {r.date.split('-').reverse().join('.')}
                    <span>Risiko: {r.risk}</span>
                  </LWDate>
                  <LWBody>
                    {r.events.length > 0 ? (
                      r.events.map((e, i) => <p key={i}><em>{e.name}</em>{e.note ? ` – ${e.note}` : ''}</p>)
                    ) : (
                      <p>Keine relevanten Großereignisse gefunden.</p>
                    )}
                    {r.hinweis && <p>{r.hinweis}</p>}
                  </LWBody>
                </ResultRow>
              ))}
              {checkResult.empfehlung && <Empfehlung><strong>Unsere Einschätzung:</strong> {checkResult.empfehlung}</Empfehlung>}
              <CheckDisclaimer>
                Live-Recherche per KI (Stand: {checkResult.stand}). Ergebnisse sind Hinweise, keine Garantie –
                prüft große Termine zusätzlich beim Veranstaltungskalender eurer Stadt.
              </CheckDisclaimer>
            </div>
          )}
        </CheckSection>

        {!embed && (<>
        <ShareBox>
          <p>
            <strong>Ihr schreibt über Hochzeitsplanung?</strong> Dieses Tool darf gerne verlinkt,
            empfohlen – oder direkt auf eurer Seite eingebettet werden. Es bleibt dauerhaft kostenlos
            und wird jährlich aktualisiert.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <CopyBtn onClick={copyLink}>{copied ? '✓ Link kopiert' : 'Link zum Tool kopieren'}</CopyBtn>
            <CopyBtn onClick={copyEmbed}>{embedCopied ? '✓ Code kopiert' : 'Auf eurer Seite einbinden'}</CopyBtn>
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
          <h2>Datum gefunden? Dann fehlt nur noch eure Website.</h2>
          <p>
            Sobald euer Termin steht, haben eure Gäste Fragen. Eine Premium-Hochzeitswebsite von S&amp;I.
            beantwortet alle auf einmal – mit Countdown, RSVP, eigener Domain und einem Design, das zu euch passt.
          </p>
          <a href="/#contact">Unverbindlich anfragen</a>
        </CTA>

        <Related>
          <p>Weiterlesen im Hochzeits-Blog:</p>
          <Link to="/blog/hochzeitsdatum-2027">Hochzeitsdatum 2027: Die besten Termine im Detail</Link><br />
          <Link to="/blog/hochzeit-2027-planen-checkliste">Hochzeit 2027 planen: Die komplette Checkliste</Link><br />
          <Link to="/blog/hochzeitstrends-2027">Hochzeitstrends 2027</Link>
        </Related>
        </>)}

        {embed && (
          <EmbedFooter>
            Tool von{' '}
            <a href="https://www.sarahiver.com/hochzeitsdatum-finder" target="_blank" rel="noopener noreferrer">
              S&amp;I. – Premium Hochzeitswebsites
            </a>{' '}
            · jährlich aktualisiert
          </EmbedFooter>
        )}
      </Shell>
    </Page>
  );
};

export default HochzeitsdatumFinder;
