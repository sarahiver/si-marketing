// src/components/marketing/ModernSections.js
// Alle Marketing-Sections im Modern/Parallax-Stil
// DM Sans, schwarz/weiß, bold, minimalistisch
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// ============================================
// SHARED STYLES
// ============================================
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const font = "'DM Sans', sans-serif";

const Section = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: ${p => p.$alt ? '#F8F8F8' : '#FFFFFF'};
`;

const Container = styled.div`
  max-width: ${p => p.$wide ? '1200px' : '900px'};
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  font-family: ${font};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.25);
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-family: ${font};
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 0.95;
  color: #000;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.p`
  font-family: ${font};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.7;
  color: rgba(0,0,0,0.5);
  max-width: 600px;
  margin-bottom: 3rem;
`;

const Divider = styled.div`
  width: 40px;
  height: 2px;
  background: #000;
  margin: 3rem 0;
`;

// ============================================
// USP SECTION
// ============================================
const USPS = [
  { num: '01', title: 'Kein Paar ist wie das andere', desc: 'Jede Website ein Unikat — handgemacht, nicht von der Stange.' },
  { num: '02', title: 'eurenamen.de', desc: 'Eure eigene Domain. Kein Baukasten-Link.' },
  { num: '03', title: 'Designwelten', desc: 'Ob elegant, modern oder verspielt — angepasst an euren Stil.' },
  { num: '04', title: 'Direkter Kontakt', desc: 'Ihr sprecht mit Sarah & Iver. Keine Hotline, kein Bot.' },
  { num: '05', title: 'So wenig Aufwand wie möglich', desc: 'Ihr liefert Inhalte, wir kümmern uns um den Rest.' },
  { num: '06', title: 'In 7 Tagen live', desc: 'Die meisten Websites gehen innerhalb einer Woche online.' },
];

const USPGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
`;

const USPCard = styled.div`
  padding: 2rem 0;
  border-top: 1px solid rgba(0,0,0,0.06);
`;

const USPNum = styled.span`
  font-family: ${font};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(0,0,0,0.2);
  display: block;
  margin-bottom: 0.75rem;
`;

const USPTitle = styled.h3`
  font-family: ${font};
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #000;
  margin-bottom: 0.5rem;
`;

const USPDesc = styled.p`
  font-family: ${font};
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(0,0,0,0.5);
`;

export function ModernUSP() {
  return (
    <Section id="features">
      <Container>
        <Eyebrow>Warum S&I.</Eyebrow>
        <SectionTitle>Was uns<br />besonders macht</SectionTitle>
        <SectionSubtitle>
          Premium Hochzeitswebsites — handgemacht, persönlich, in 7 Tagen live.
        </SectionSubtitle>
        <USPGrid>
          {USPS.map(u => (
            <USPCard key={u.num}>
              <USPNum>{u.num}</USPNum>
              <USPTitle>{u.title}</USPTitle>
              <USPDesc>{u.desc}</USPDesc>
            </USPCard>
          ))}
        </USPGrid>
      </Container>
    </Section>
  );
}

// ============================================
// HOW IT WORKS
// ============================================
const STEPS = [
  { num: '01', title: 'Ihr entdeckt uns', desc: 'Schreibt uns — unverbindlich, ohne Haken. Wir freuen uns auf jede Nachricht.' },
  { num: '02', title: 'Wir lernen euch kennen', desc: 'In einem persönlichen Gespräch erfahren wir, wer ihr seid und wie eure Hochzeit sich anfühlen soll.' },
  { num: '03', title: 'Ihr erzählt eure Geschichte', desc: 'Über ein einfaches Dashboard tragt ihr Texte ein, ladet Fotos hoch. Kein technisches Wissen nötig.' },
  { num: '04', title: 'Eure Website geht live', desc: 'Wir bauen, optimieren und schicken euch die fertige Seite zur Freigabe. In der Regel in 7 Tagen.' },
];

const StepsList = styled.div`
  display: grid;
  gap: 0;
`;

const StepItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 2rem;
  padding: 2.5rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  align-items: start;

  @media (max-width: 600px) {
    grid-template-columns: 50px 1fr;
    gap: 1rem;
  }
`;

const StepNum = styled.span`
  font-family: ${font};
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: rgba(0,0,0,0.08);
  line-height: 1;
`;

const StepTitle = styled.h3`
  font-family: ${font};
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #000;
  margin-bottom: 0.5rem;
`;

const StepDesc = styled.p`
  font-family: ${font};
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(0,0,0,0.5);
`;

export function ModernHowItWorks() {
  return (
    <Section $alt id="how-it-works">
      <Container>
        <Eyebrow>Euer Weg zur Website</Eyebrow>
        <SectionTitle>In 4 einfachen<br />Schritten</SectionTitle>
        <StepsList>
          {STEPS.map(s => (
            <StepItem key={s.num}>
              <StepNum>{s.num}</StepNum>
              <div>
                <StepTitle>{s.title}</StepTitle>
                <StepDesc>{s.desc}</StepDesc>
              </div>
            </StepItem>
          ))}
        </StepsList>
      </Container>
    </Section>
  );
}

// ============================================
// COMPONENTS SHOWCASE
// ============================================
const COMPONENTS = [
  { icon: '🏠', name: 'Hero', desc: 'Der erste Moment', included: true },
  { icon: '💕', name: 'Love Story', desc: 'Wie aus Fremden ein Wir wurde', included: true },
  { icon: '💌', name: 'RSVP', desc: 'Zu- und Absagen digital', included: true },
  { icon: '🔔', name: 'Countdown', desc: 'Die Vorfreude wächst', included: true },
  { icon: '📅', name: 'Ablauf', desc: 'Wann, wo, was' },
  { icon: '📍', name: 'Location', desc: 'Mit Karte' },
  { icon: '🏨', name: 'Hotels', desc: 'Die besten Betten' },
  { icon: '👗', name: 'Dresscode', desc: 'Wie schick es wird' },
  { icon: '🎁', name: 'Wunschliste', desc: 'Von Herzen' },
  { icon: '📸', name: 'Galerie', desc: 'Gänsehaut-Bilder' },
  { icon: '🤳', name: 'Gäste-Fotos', desc: 'Gäste als Fotografen' },
  { icon: '❓', name: 'FAQ', desc: 'Keine Fragen offen' },
  { icon: '🎵', name: 'Musikwünsche', desc: 'Die Playlist' },
  { icon: '👥', name: 'Trauzeugen', desc: 'Die Wichtigsten' },
  { icon: '💍', name: 'Footer', desc: 'Schöner Abschluss' },
  { icon: '📄', name: 'Impressum', desc: 'Muss sein' },
];

const CompGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1px;
  background: rgba(0,0,0,0.06);
  border: 1px solid rgba(0,0,0,0.06);
`;

const CompItem = styled.div`
  background: #fff;
  padding: 1.5rem;
  text-align: center;
  transition: background 0.2s;

  &:hover {
    background: #F8F8F8;
  }
`;

const CompIcon = styled.span`
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.5rem;
`;

const CompName = styled.p`
  font-family: ${font};
  font-size: 0.8rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 0.25rem;
`;

const CompDesc = styled.p`
  font-family: ${font};
  font-size: 0.7rem;
  font-weight: 400;
  color: rgba(0,0,0,0.35);
`;

const CompBadge = styled.span`
  display: inline-block;
  font-family: ${font};
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.3);
  background: rgba(0,0,0,0.04);
  padding: 0.2rem 0.5rem;
  margin-top: 0.5rem;
`;

export function ModernComponents() {
  return (
    <Section>
      <Container $wide>
        <Eyebrow>18 Komponenten</Eyebrow>
        <SectionTitle>Alles was<br />ihr braucht</SectionTitle>
        <SectionSubtitle>
          Jede Website besteht aus Bausteinen. Wählt, was zu eurer Hochzeit passt.
        </SectionSubtitle>
        <CompGrid>
          {COMPONENTS.map(c => (
            <CompItem key={c.name}>
              <CompIcon>{c.icon}</CompIcon>
              <CompName>{c.name}</CompName>
              <CompDesc>{c.desc}</CompDesc>
              {c.included && <CompBadge>Basis</CompBadge>}
            </CompItem>
          ))}
        </CompGrid>
      </Container>
    </Section>
  );
}

// ============================================
// PROMO BANNER
// ============================================
const PromoBannerWrapper = styled.div`
  background: #000;
  padding: clamp(2rem, 4vh, 3rem) clamp(1.5rem, 5vw, 4rem);
  text-align: center;
`;

const PromoTitle = styled.p`
  font-family: ${font};
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #fff;

  span {
    color: rgba(255,255,255,0.3);
    font-weight: 400;
    font-size: 0.7em;
    margin-left: 0.5rem;
  }
`;

export function ModernPromoBanner() {
  return (
    <PromoBannerWrapper>
      <PromoTitle>
        Einführungspreis — noch bis März 2026 <span>Danach wird's teurer.</span>
      </PromoTitle>
    </PromoBannerWrapper>
  );
}

// ============================================
// PRICING
// ============================================
const PACKAGES = [
  {
    name: 'Starter', price: '1.290', duration: '6 Monate',
    tagline: 'Alles für den Start',
    features: ['Eigene Domain', 'RSVP mit Download', '6 Monate Hosting', '4 Basis-Komponenten', 'Dateneingabe durch Kunde', '1 Revision vorher / 1 nachher'],
  },
  {
    name: 'Standard', price: '1.490', duration: '8 Monate', popular: true,
    tagline: 'Für Paare, die es richtig machen wollen',
    features: ['Eigene Domain', 'RSVP mit Download', '8 Monate Hosting', '4 Basis + 3 Extra-Komponenten', 'Dateneingabe durch Kunde', '2 Revisionen vorher / 2 nachher'],
  },
  {
    name: 'Premium', price: '1.990', duration: '12 Monate',
    tagline: 'Rundum-Sorglos. Lehnt euch zurück.',
    features: ['Eigene Domain', 'RSVP mit Download', '12 Monate Hosting', '4 Basis + 6 Extra-Komponenten', 'Save the Date + Archiv-Seite', 'Dateneingabe durch S&I.', 'QR-Code Erstellung', 'Unbegrenzte Revisionen'],
  },
];

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1px;
  background: rgba(0,0,0,0.06);
  border: 1px solid rgba(0,0,0,0.06);
`;

const PricingCard = styled.div`
  background: ${p => p.$popular ? '#000' : '#fff'};
  color: ${p => p.$popular ? '#fff' : '#000'};
  padding: clamp(2rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
`;

const PkgPopular = styled.span`
  font-family: ${font};
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${p => p.$inv ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.25)'};
  margin-bottom: 0.5rem;
`;

const PkgName = styled.h3`
  font-family: ${font};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
`;

const PkgTagline = styled.p`
  font-family: ${font};
  font-size: 0.8rem;
  font-weight: 400;
  color: ${p => p.$inv ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
  margin-bottom: 1.5rem;
`;

const PkgPrice = styled.div`
  font-family: ${font};
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 0.25rem;

  span {
    font-size: 0.5em;
    font-weight: 400;
    opacity: 0.4;
    margin-right: 0.1em;
  }
`;

const PkgDuration = styled.p`
  font-family: ${font};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => p.$inv ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'};
  margin-bottom: 2rem;
`;

const PkgFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  flex: 1;
`;

const PkgFeature = styled.li`
  font-family: ${font};
  font-size: 0.85rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${p => p.$inv ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'};
  padding: 0.5rem 0;
  border-bottom: 1px solid ${p => p.$inv ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'};
`;

const PkgCTA = styled.a`
  display: block;
  text-align: center;
  font-family: ${font};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 1rem;
  text-decoration: none;
  transition: all 0.2s;
  background: ${p => p.$inv ? '#fff' : '#000'};
  color: ${p => p.$inv ? '#000' : '#fff'};

  &:hover { opacity: 0.8; }
`;

export function ModernPricing() {
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Section $alt id="pricing">
      <Container $wide>
        <Eyebrow>Preise</Eyebrow>
        <SectionTitle>Findet euer<br />Paket</SectionTitle>
        <SectionSubtitle>
          Alle Pakete beinhalten eine handgemachte Website mit eigenem Design.
        </SectionSubtitle>
        <PricingGrid>
          {PACKAGES.map(pkg => (
            <PricingCard key={pkg.name} $popular={pkg.popular}>
              {pkg.popular && <PkgPopular $inv>Beliebteste Wahl</PkgPopular>}
              <PkgName>{pkg.name}</PkgName>
              <PkgTagline $inv={pkg.popular}>{pkg.tagline}</PkgTagline>
              <PkgPrice><span>€</span>{pkg.price}</PkgPrice>
              <PkgDuration $inv={pkg.popular}>{pkg.duration}</PkgDuration>
              <PkgFeatures>
                {pkg.features.map((f, i) => (
                  <PkgFeature key={i} $inv={pkg.popular}>{f}</PkgFeature>
                ))}
              </PkgFeatures>
              <PkgCTA href="#contact" $inv={pkg.popular} onClick={e => { e.preventDefault(); scrollToContact(); }}>
                {pkg.popular ? 'Beliebteste Wahl' : `${pkg.name} wählen`}
              </PkgCTA>
            </PricingCard>
          ))}
        </PricingGrid>
      </Container>
    </Section>
  );
}

// ============================================
// ABOUT
// ============================================
const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 3rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutCard = styled.div`
  padding: 2rem 0;
  border-top: 1px solid rgba(0,0,0,0.06);
`;

const AboutEmoji = styled.span`
  font-size: 2rem;
  display: block;
  margin-bottom: 1rem;
`;

const AboutName = styled.h3`
  font-family: ${font};
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #000;
  margin-bottom: 0.25rem;
`;

const AboutRole = styled.p`
  font-family: ${font};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.3);
  margin-bottom: 1rem;
`;

const AboutDesc = styled.p`
  font-family: ${font};
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.7;
  color: rgba(0,0,0,0.5);
`;

export function ModernAbout() {
  return (
    <Section id="about">
      <Container>
        <Eyebrow>Über uns</Eyebrow>
        <SectionTitle>Sarah &amp; Iver</SectionTitle>
        <SectionSubtitle>
          Wir sind kein Startup, keine Agentur. Wir sind ein Paar, das Hochzeitswebsites baut — weil wir wissen, wie es sich anfühlt.
        </SectionSubtitle>
        <AboutGrid>
          <AboutCard>
            <AboutEmoji>🎨</AboutEmoji>
            <AboutName>Sarah</AboutName>
            <AboutRole>Herz, Design &amp; Gefühl</AboutRole>
            <AboutDesc>Sarah sorgt dafür, dass jede Website nicht nur schön aussieht, sondern sich richtig anfühlt. Farben, Typografie, Bildsprache — alles wird mit Liebe zum Detail gestaltet.</AboutDesc>
          </AboutCard>
          <AboutCard>
            <AboutEmoji>🧑‍💻</AboutEmoji>
            <AboutName>Iver</AboutName>
            <AboutRole>Technik &amp; persönliche Begleitung</AboutRole>
            <AboutDesc>Iver kümmert sich um Technik, Umsetzung und Betreuung. Vom ersten Gespräch bis zur fertigen Website — ein echter Ansprechpartner, keine Massenabfertigung.</AboutDesc>
          </AboutCard>
        </AboutGrid>
      </Container>
    </Section>
  );
}

// ============================================
// WHY US
// ============================================
const CARDS = [
  { icon: '💼', label: 'Statt Agentur', problem: 'Oft teuer, langsam und anonym.', solution: 'Boutique statt Massenbetrieb. Persönlich und schnell.' },
  { icon: '🤖', label: 'Statt KI-Tools', problem: 'Schnell — aber ohne Herz.', solution: 'Menschen, Geschmack & Feingefühl.' },
  { icon: '🛠️', label: 'Statt selber machen', problem: 'Günstig — aber auf Kosten eurer Zeit.', solution: 'Ihr gebt Inhalte — wir den Rest.' },
];

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1px;
  background: rgba(0,0,0,0.06);
  border: 1px solid rgba(0,0,0,0.06);
  margin-bottom: 4rem;
`;

const WhyCard = styled.div`
  background: #fff;
  padding: 2.5rem 2rem;
`;

const WhyIcon = styled.span`
  font-size: 1.5rem;
  display: block;
  margin-bottom: 1rem;
`;

const WhyLabel = styled.h3`
  font-family: ${font};
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #000;
  margin-bottom: 1rem;
`;

const WhyProblem = styled.p`
  font-family: ${font};
  font-size: 0.85rem;
  font-weight: 400;
  color: rgba(0,0,0,0.35);
  margin-bottom: 0.75rem;
  text-decoration: line-through;
  text-decoration-color: rgba(0,0,0,0.15);
`;

const WhySolution = styled.p`
  font-family: ${font};
  font-size: 0.9rem;
  font-weight: 700;
  color: #000;
`;

const ClosingBlock = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const ClosingTitle = styled.h3`
  font-family: ${font};
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #000;
  margin-bottom: 1rem;
`;

const ClosingText = styled.p`
  font-family: ${font};
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.7;
  color: rgba(0,0,0,0.5);
`;

export function ModernWhyUs() {
  return (
    <Section $alt>
      <Container $wide>
        <Eyebrow>Warum S&I.</Eyebrow>
        <SectionTitle>Weil eure Hochzeit<br />zu wichtig ist.</SectionTitle>
        <SectionSubtitle>
          Ihr könnt eine Agentur beauftragen, KI nutzen, oder einen Baukasten verwenden. Oder ihr entscheidet euch für etwas, das sich richtig anfühlt.
        </SectionSubtitle>
        <WhyGrid>
          {CARDS.map(c => (
            <WhyCard key={c.label}>
              <WhyIcon>{c.icon}</WhyIcon>
              <WhyLabel>{c.label}</WhyLabel>
              <WhyProblem>{c.problem}</WhyProblem>
              <WhySolution>{c.solution}</WhySolution>
            </WhyCard>
          ))}
        </WhyGrid>
        <ClosingBlock>
          <ClosingTitle>Ihr plant einen der wichtigsten Tage eures Lebens.</ClosingTitle>
          <ClosingText>Warum solltet ihr euch mit „okay" zufriedengeben?</ClosingText>
        </ClosingBlock>
      </Container>
    </Section>
  );
}

// ============================================
// CONTACT
// ============================================
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactInput = styled.input`
  font-family: ${font};
  font-size: 0.9rem;
  font-weight: 400;
  padding: 1rem;
  border: 1px solid rgba(0,0,0,0.08);
  background: #fff;
  color: #000;
  outline: none;
  transition: border-color 0.2s;

  &:focus { border-color: #000; }
  &::placeholder { color: rgba(0,0,0,0.25); }
`;

const ContactTextarea = styled.textarea`
  font-family: ${font};
  font-size: 0.9rem;
  font-weight: 400;
  padding: 1rem;
  border: 1px solid rgba(0,0,0,0.08);
  background: #fff;
  color: #000;
  outline: none;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus { border-color: #000; }
  &::placeholder { color: rgba(0,0,0,0.25); }
`;

const ContactSubmit = styled.button`
  font-family: ${font};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 1rem 2rem;
  background: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  align-self: flex-start;

  &:hover { opacity: 0.8; }
`;

const ContactInfo = styled.div`
  padding-top: 1rem;
`;

const ContactInfoItem = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.06);
`;

const ContactInfoLabel = styled.p`
  font-family: ${font};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.25);
  margin-bottom: 0.5rem;
`;

const ContactInfoValue = styled.p`
  font-family: ${font};
  font-size: 1rem;
  font-weight: 400;
  color: #000;

  a { color: #000; text-decoration: none; &:hover { text-decoration: underline; } }
`;

export function ModernContact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Anfrage von ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nE-Mail: ${formState.email}\n\n${formState.message}`);
    window.location.href = `mailto:wedding@sarahiver.de?subject=${subject}&body=${body}`;
  };

  return (
    <Section $alt id="contact">
      <Container $wide>
        <Eyebrow>Der erste Schritt</Eyebrow>
        <SectionTitle>Erzählt uns<br />von euch</SectionTitle>
        <SectionSubtitle>
          Unverbindlich, ohne Haken. Wir freuen uns auf eure Geschichte.
        </SectionSubtitle>
        <ContactGrid>
          <ContactForm onSubmit={handleSubmit}>
            <ContactInput
              type="text"
              placeholder="Eure Namen"
              value={formState.name}
              onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
              required
            />
            <ContactInput
              type="email"
              placeholder="E-Mail"
              value={formState.email}
              onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
              required
            />
            <ContactTextarea
              placeholder="Erzählt uns von eurer Hochzeit..."
              value={formState.message}
              onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
            />
            <ContactSubmit type="submit">Nachricht senden</ContactSubmit>
          </ContactForm>
          <ContactInfo>
            <ContactInfoItem>
              <ContactInfoLabel>E-Mail</ContactInfoLabel>
              <ContactInfoValue><a href="mailto:wedding@sarahiver.de">wedding@sarahiver.de</a></ContactInfoValue>
            </ContactInfoItem>
            <ContactInfoItem>
              <ContactInfoLabel>Standort</ContactInfoLabel>
              <ContactInfoValue>Hamburg, Deutschland</ContactInfoValue>
            </ContactInfoItem>
            <ContactInfoItem>
              <ContactInfoLabel>Antwortzeit</ContactInfoLabel>
              <ContactInfoValue>Meistens noch am selben Tag</ContactInfoValue>
            </ContactInfoItem>
          </ContactInfo>
        </ContactGrid>
      </Container>
    </Section>
  );
}

// ============================================
// COOPERATION
// ============================================
export function ModernCooperation() {
  return (
    <Section>
      <Container>
        <Eyebrow>Zusammenarbeit</Eyebrow>
        <SectionTitle>Kooperationen</SectionTitle>
        <SectionSubtitle>
          Ob Hochzeitsplaner, Fotografen, Locations oder andere Dienstleister — wir freuen uns über Kooperationsanfragen.
        </SectionSubtitle>
        <PkgCTA
          href="#contact"
          onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          style={{ display: 'inline-block' }}
        >
          Kontakt aufnehmen
        </PkgCTA>
      </Container>
    </Section>
  );
}

// ============================================
// FOOTER
// ============================================
const FooterWrapper = styled.footer`
  background: #000;
  color: #fff;
  padding: clamp(3rem, 8vh, 5rem) clamp(1.5rem, 5vw, 4rem) clamp(1.5rem, 3vh, 2rem);
`;

const FooterGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterLogo = styled.a`
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  letter-spacing: -0.06em;
  display: block;
  margin-bottom: 0.75rem;
`;

const FooterTagline = styled.p`
  font-family: ${font};
  font-size: 0.85rem;
  font-weight: 400;
  color: rgba(255,255,255,0.4);
  line-height: 1.6;
`;

const FooterColTitle = styled.p`
  font-family: ${font};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  font-family: ${font};
  font-size: 0.85rem;
  font-weight: 400;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.2s;

  &:hover { color: #fff; }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FooterCopy = styled.p`
  font-family: ${font};
  font-size: 0.7rem;
  font-weight: 400;
  color: rgba(255,255,255,0.25);
`;

const FooterLegal = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    font-family: ${font};
    font-size: 0.7rem;
    font-weight: 400;
    color: rgba(255,255,255,0.25);
    text-decoration: none;
    &:hover { color: rgba(255,255,255,0.5); }
  }
`;

export function ModernFooter() {
  const year = new Date().getFullYear();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <FooterWrapper>
      <FooterGrid>
        <div>
          <FooterLogo href="/">S&I.</FooterLogo>
          <FooterTagline>Premium Hochzeitswebsites für unvergessliche Momente.</FooterTagline>
        </div>
        <div>
          <FooterColTitle>Navigation</FooterColTitle>
          <FooterLink href="#features" onClick={e => { e.preventDefault(); scrollTo('features'); }}>Features</FooterLink>
          <FooterLink href="#themes" onClick={e => { e.preventDefault(); scrollTo('themes'); }}>Designs</FooterLink>
          <FooterLink href="#pricing" onClick={e => { e.preventDefault(); scrollTo('pricing'); }}>Preise</FooterLink>
          <FooterLink href="#contact" onClick={e => { e.preventDefault(); scrollTo('contact'); }}>Kontakt</FooterLink>
        </div>
        <div>
          <FooterColTitle>Kontakt</FooterColTitle>
          <FooterLink href="mailto:wedding@sarahiver.de">wedding@sarahiver.de</FooterLink>
          <FooterLink as="span">Hamburg, Deutschland</FooterLink>
        </div>
      </FooterGrid>
      <FooterBottom>
        <FooterCopy>&copy; {year} S&I Wedding. Alle Rechte vorbehalten.</FooterCopy>
        <FooterLegal>
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
        </FooterLegal>
      </FooterBottom>
    </FooterWrapper>
  );
}
