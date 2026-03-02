// src/context/ABTestContext.js
// A/B Test: Theme Onboarding Modal (Variante A) vs. Classic + besserer Switcher (Variante B)
//
// Variante A (50%): User sieht beim ersten Besuch ein Modal zur Theme-Auswahl
// Variante B (50%): User landet direkt auf Classic, Theme-Switcher ist prominenter
//
// Zuteilung: einmalig zufällig, per localStorage gespeichert → User bleibt immer in seiner Variante
// Tracking: GA4 Custom Events mit ab_variant als Dimension

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { trackEvent } from '../utils/analytics';

const ABTestContext = createContext();

// ============================================
// KONSTANTEN
// ============================================
const AB_STORAGE_KEY = 'si_ab_variant';        // 'A' | 'B'
const AB_MODAL_KEY   = 'si_ab_modal_shown';    // '1' wenn Modal bereits gezeigt

const VARIANTS = { A: 'A', B: 'B' };
const VARIANT_A_PROBABILITY = 0.5; // 50%

// ============================================
// HELPER
// ============================================
const assignVariant = () => {
  try {
    const saved = localStorage.getItem(AB_STORAGE_KEY);
    if (saved === 'A' || saved === 'B') return saved;

    const variant = Math.random() < VARIANT_A_PROBABILITY ? VARIANTS.A : VARIANTS.B;
    localStorage.setItem(AB_STORAGE_KEY, variant);
    return variant;
  } catch {
    return VARIANTS.B; // Fallback: Classic-Erlebnis
  }
};

const hasModalBeenShown = () => {
  try { return localStorage.getItem(AB_MODAL_KEY) === '1'; } catch { return true; }
};

const markModalShown = () => {
  try { localStorage.setItem(AB_MODAL_KEY, '1'); } catch {}
};

// ============================================
// PROVIDER
// ============================================
export const ABTestProvider = ({ children }) => {
  const [variant]      = useState(assignVariant);
  const [showModal, setShowModal]   = useState(false);
  const [modalReady, setModalReady] = useState(false); // Verzögertes Erscheinen

  // Variante A: Modal anzeigen wenn noch nicht gezeigt
  useEffect(() => {
    if (variant === VARIANTS.A && !hasModalBeenShown()) {
      // Kurz warten damit die Seite erst sichtbar ist
      const t = setTimeout(() => setModalReady(true), 800);
      return () => clearTimeout(t);
    }
  }, [variant]);

  useEffect(() => {
    if (modalReady) setShowModal(true);
  }, [modalReady]);

  // ============================================
  // TRACKING
  // ============================================

  // Einmalig: Variante in GA4 registrieren (bei erstem Load)
  useEffect(() => {
    const alreadyTracked = sessionStorage.getItem('si_ab_tracked');
    if (alreadyTracked) return;

    trackEvent('ab_variant_assigned', {
      event_category: 'ab_test',
      ab_variant: variant,
      is_new_assignment: !localStorage.getItem(AB_STORAGE_KEY + '_old'), // Nur bei Erstbesuch
    });
    sessionStorage.setItem('si_ab_tracked', '1');
  }, [variant]);

  // ============================================
  // MODAL ACTIONS
  // ============================================
  const closeModal = useCallback((selectedTheme) => {
    setShowModal(false);
    markModalShown();

    trackEvent('theme_modal_closed', {
      event_category: 'ab_test',
      ab_variant: variant,
      selected_theme: selectedTheme || 'none',
    });
  }, [variant]);

  const trackModalThemeSelect = useCallback((theme) => {
    trackEvent('theme_modal_selected', {
      event_category: 'ab_test',
      ab_variant: variant,
      theme_selected: theme,
    });
  }, [variant]);

  // ============================================
  // ENGAGEMENT EVENTS (für beide Varianten)
  // ============================================
  const trackCTAClick = useCallback((ctaLabel, currentTheme) => {
    trackEvent('cta_click', {
      event_category: 'engagement',
      ab_variant: variant,
      cta_label: ctaLabel,
      theme: currentTheme,
    });
  }, [variant]);

  const trackDemoOpen = useCallback((themeName) => {
    trackEvent('demo_opened', {
      event_category: 'engagement',
      ab_variant: variant,
      theme: themeName,
    });
  }, [variant]);

  const trackThemeSwitchAB = useCallback((fromTheme, toTheme) => {
    trackEvent('theme_switched', {
      event_category: 'engagement',
      ab_variant: variant,
      from_theme: fromTheme,
      to_theme: toTheme,
    });
  }, [variant]);

  const trackScrollDepth = useCallback((percent, currentTheme) => {
    trackEvent('scroll_depth', {
      event_category: 'engagement',
      ab_variant: variant,
      percent_scrolled: percent,
      theme: currentTheme,
    });
  }, [variant]);

  const trackConversion = useCallback((currentTheme, packageName) => {
    trackEvent('ab_conversion', {
      event_category: 'ab_test',
      ab_variant: variant,
      theme: currentTheme,
      package: packageName,
    });
  }, [variant]);

  // ============================================
  // VALUE
  // ============================================
  const value = {
    variant,               // 'A' | 'B'
    isVariantA: variant === VARIANTS.A,
    isVariantB: variant === VARIANTS.B,
    showModal,

    // Actions
    closeModal,
    trackModalThemeSelect,
    trackCTAClick,
    trackDemoOpen,
    trackThemeSwitchAB,
    trackScrollDepth,
    trackConversion,
  };

  return (
    <ABTestContext.Provider value={value}>
      {children}
    </ABTestContext.Provider>
  );
};

// ============================================
// HOOK
// ============================================
export const useABTest = () => {
  const ctx = useContext(ABTestContext);
  if (!ctx) throw new Error('useABTest must be used within ABTestProvider');
  return ctx;
};

export default ABTestContext;
