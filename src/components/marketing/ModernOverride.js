// src/components/marketing/ModernOverride.js
// Globale CSS-Override für das Modern Theme
// Wandelt Classic-Sections in den Modern/Parallax-Stil um
// WICHTIG: Nur Font- und Farb-Overrides, keine Layout-Änderungen!
import { createGlobalStyle } from 'styled-components';

const ModernOverride = createGlobalStyle`
  /* ── FONT OVERRIDES: DM Sans überall ── */
  * {
    font-family: 'DM Sans', sans-serif;
  }

  /* ── BACKGROUND: Pure White statt Cream ── */
  body {
    background: #FFFFFF;
  }

  /* ── SELECTION COLOR ── */
  ::selection {
    background: #000;
    color: #fff;
  }
`;

export default ModernOverride;
