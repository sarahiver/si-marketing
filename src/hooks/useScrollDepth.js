// src/hooks/useScrollDepth.js
// Misst Scroll-Tiefe und feuert GA4-Events bei Meilensteinen (25%, 50%, 75%, 90%).
// Event-Name bleibt 'scroll_depth' wie bisher, damit Berichte weiter passen.
// Der Parameter ab_variant ist entfallen — der A/B-Test (Theme-Modal) ist beendet.

import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { trackEvent } from '../utils/analytics';

const MILESTONES = [25, 50, 75, 90];

const useScrollDepth = () => {
  const { currentTheme } = useTheme();
  const reached = useRef(new Set());
  const themeRef = useRef(currentTheme);

  // Theme-Ref aktuell halten
  useEffect(() => { themeRef.current = currentTheme; }, [currentTheme]);

  // Bei Theme-Wechsel: Meilensteine zurücksetzen
  useEffect(() => { reached.current = new Set(); }, [currentTheme]);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / docHeight) * 100);

      for (const milestone of MILESTONES) {
        if (scrollPercent >= milestone && !reached.current.has(milestone)) {
          reached.current.add(milestone);
          trackEvent('scroll_depth', {
            event_category: 'engagement',
            percent_scrolled: milestone,
            theme: themeRef.current,
          });
        }
      }
    };

    // Throttle: max einmal pro Frame
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);
};

export default useScrollDepth;
