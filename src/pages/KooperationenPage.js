// src/pages/KooperationenPage.js
// Kooperationen als eigene Seite statt als Section auf der Homepage.
//
// Grund: Der Abschnitt stand zwischen Anfrageformular und Final CTA — also
// genau an der Stelle, an der ein Paar kurz vor der Anfrage steht. Ein
// Angebot für Agenturen und Dienstleister lenkt dort ab und richtet sich
// an eine ganz andere Zielgruppe. Erreichbar bleibt es über den Footer.
import React, { useEffect } from 'react';
import MarketingNav from '../components/marketing/MarketingNav';
import MarketingFooter from '../components/marketing/MarketingFooter';
import CooperationSection from '../components/marketing/CooperationSection';
import ContactSection from '../components/marketing/ContactSection';
import SEOHead from '../components/shared/SEOHead';

const KooperationenPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Kooperationen & Partner | S&I."
        description="Ihr seid Hochzeitsdienstleister, Fotografin, Location oder Planerin? Lasst uns über eine Zusammenarbeit mit S&I. sprechen."
        canonical="https://www.sarahiver.com/kooperationen"
        noIndex={false}
      />
      <MarketingNav />
      <CooperationSection />
      {/* Das Formular bleibt: der CTA der Section scrollt zu #contact */}
      <ContactSection />
      <MarketingFooter />
    </>
  );
};

export default KooperationenPage;
