// src/styles/marketingThemes.js

export const marketingThemes = {
  // ═══════════════════════════════════════════════════════════
  // EDITORIAL (Default) - Schwarz/Weiß - Minimalistisch modern
  // ═══════════════════════════════════════════════════════════
  editorial: {
    id: "editorial",
    name: "Editorial",
    description: "Minimalistisch modern",
    colors: {
      primary: "#000000",
      secondary: "#333333",
      accent: "#000000",
      background: "#FFFFFF",
      backgroundAlt: "#FAFAFA",
      surface: "#FFFFFF",
      text: "#000000",
      textSecondary: "#666666",
      textMuted: "#999999",
      border: "#E5E5E5",
      borderHover: "#000000",
    },
    fonts: {
      heading: "'Instrument Serif', serif",
      body: "'Inter', sans-serif",
    },
    // Editorial Style: Clean, minimal, modern
    style: {
      headingWeight: "400",
      headingLetterSpacing: "0",
      headingTextTransform: "none",
      bodyLetterSpacing: "0",
      borderRadius: "0",
      borderWidth: "1px",
      dividerStyle: "solid",
      dividerWidth: "1px",
      buttonStyle: "solid", // solid, outline, gradient
      decorativeElements: false,
      ornaments: false,
      shadowStyle: "subtle", // none, subtle, dramatic
      animationStyle: "smooth", // smooth, elegant, dramatic
      sectionSpacing: "8rem",
      cardStyle: "flat", // flat, elevated, bordered
    },
  },

  // ═══════════════════════════════════════════════════════════
  // GOLD - Schwarz/Gold - Klassisch luxuriös
  // ═══════════════════════════════════════════════════════════
  gold: {
    id: "gold",
    name: "Gold",
    description: "Klassisch luxuriös",
    colors: {
      primary: "#D4AF37",
      secondary: "#B8960C",
      accent: "#F5E6C8",
      background: "#0A0A0A",
      backgroundAlt: "#111111",
      surface: "#1A1A1A",
      text: "#FFFFFF",
      textSecondary: "rgba(255, 255, 255, 0.7)",
      textMuted: "rgba(255, 255, 255, 0.5)",
      border: "rgba(212, 175, 55, 0.3)",
      borderHover: "#D4AF37",
      gradient:
        "linear-gradient(135deg, #D4AF37 0%, #F5E6C8 50%, #D4AF37 100%)",
      shimmer:
        "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)",
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Inter', sans-serif",
    },
    // Gold Style: Opulent, luxurious, dramatic
    style: {
      headingWeight: "400",
      headingLetterSpacing: "0.05em",
      headingTextTransform: "none",
      bodyLetterSpacing: "0.02em",
      borderRadius: "0",
      borderWidth: "1px",
      dividerStyle: "double", // double lines for elegance
      dividerWidth: "3px",
      buttonStyle: "gradient",
      decorativeElements: true,
      ornaments: true, // ✦ ◆ ❖ decorative symbols
      shadowStyle: "dramatic",
      animationStyle: "elegant",
      sectionSpacing: "10rem",
      cardStyle: "elevated",
    },
  },

  // ═══════════════════════════════════════════════════════════
  // TIMELESS - Beige/Gold/Braun - Elegant traditionell
  // ═══════════════════════════════════════════════════════════
  timeless: {
    id: "timeless",
    name: "Timeless",
    description: "Elegant traditionell",
    colors: {
      primary: "#8B7355",
      secondary: "#A67C52",
      accent: "#C9A86C",
      background: "#FAF7F2",
      backgroundAlt: "#F5F0E8",
      surface: "#FFFFFF",
      text: "#3D3D3D",
      textSecondary: "#6B6B6B",
      textMuted: "#999999",
      border: "#E5DED3",
      borderHover: "#8B7355",
    },
    fonts: {
      heading: "'Cormorant Garamond', serif",
      body: "'Inter', sans-serif",
    },
    style: {
      headingWeight: "500",
      headingLetterSpacing: "0.02em",
      headingTextTransform: "none",
      bodyLetterSpacing: "0",
      borderRadius: "0",
      borderWidth: "1px",
      dividerStyle: "solid",
      dividerWidth: "1px",
      buttonStyle: "solid",
      decorativeElements: true,
      ornaments: false,
      shadowStyle: "subtle",
      animationStyle: "smooth",
      sectionSpacing: "8rem",
      cardStyle: "bordered",
    },
  },

  // ═══════════════════════════════════════════════════════════
  // BOTANICAL - Grün/Creme - Natürlich organisch
  // ═══════════════════════════════════════════════════════════
  botanical: {
    id: "botanical",
    name: "Botanical",
    description: "Natürlich organisch",
    colors: {
      primary: "#7D9D7C",
      secondary: "#5C7C5B",
      accent: "#9DB99C",
      background: "#FEFDF8",
      backgroundAlt: "#F7F5EE",
      surface: "#FFFFFF",
      text: "#2D3B2D",
      textSecondary: "#5A6B5A",
      textMuted: "#8A9B8A",
      border: "#D4E0D4",
      borderHover: "#7D9D7C",
    },
    fonts: {
      heading: "'Cormorant Garamond', serif",
      body: "'Inter', sans-serif",
    },
    style: {
      headingWeight: "400",
      headingLetterSpacing: "0.02em",
      headingTextTransform: "none",
      bodyLetterSpacing: "0",
      borderRadius: "8px",
      borderWidth: "1px",
      dividerStyle: "solid",
      dividerWidth: "1px",
      buttonStyle: "solid",
      decorativeElements: true,
      ornaments: false,
      shadowStyle: "subtle",
      animationStyle: "smooth",
      sectionSpacing: "8rem",
      cardStyle: "flat",
    },
  },

  // ═══════════════════════════════════════════════════════════
  // LUXE - Schwarz/Gold - Dramatisch glamourös
  // ═══════════════════════════════════════════════════════════
  luxe: {
    id: "luxe",
    name: "Luxe",
    description: "Dramatisch glamourös",
    colors: {
      primary: "#C9A86C",
      secondary: "#E8D5B5",
      accent: "#F5E6C8",
      background: "#0D0D0D",
      backgroundAlt: "#1A1A1A",
      surface: "#141414",
      text: "#FFFFFF",
      textSecondary: "rgba(255, 255, 255, 0.75)",
      textMuted: "rgba(255, 255, 255, 0.5)",
      border: "rgba(201, 168, 108, 0.25)",
      borderHover: "#C9A86C",
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Inter', sans-serif",
    },
    style: {
      headingWeight: "400",
      headingLetterSpacing: "0.1em",
      headingTextTransform: "uppercase",
      bodyLetterSpacing: "0.02em",
      borderRadius: "0",
      borderWidth: "1px",
      dividerStyle: "solid",
      dividerWidth: "1px",
      buttonStyle: "outline",
      decorativeElements: true,
      ornaments: true,
      shadowStyle: "dramatic",
      animationStyle: "dramatic",
      sectionSpacing: "10rem",
      cardStyle: "elevated",
    },
  },

  // ═══════════════════════════════════════════════════════════
  // INTIMATE - Rosa/Creme - Warm persönlich
  // ═══════════════════════════════════════════════════════════
  intimate: {
    id: "intimate",
    name: "Intimate",
    description: "Warm persönlich",
    colors: {
      primary: "#C4A484",
      secondary: "#D4B896",
      accent: "#E8C8A8",
      background: "#FDF9F6",
      backgroundAlt: "#F9F3EE",
      surface: "#FFFFFF",
      text: "#4A3F35",
      textSecondary: "#7A6B5D",
      textMuted: "#A89B8B",
      border: "#EDE5DC",
      borderHover: "#C4A484",
    },
    fonts: {
      heading: "'Cormorant Garamond', serif",
      body: "'Inter', sans-serif",
    },
    style: {
      headingWeight: "400",
      headingLetterSpacing: "0.02em",
      headingTextTransform: "none",
      bodyLetterSpacing: "0",
      borderRadius: "4px",
      borderWidth: "1px",
      dividerStyle: "solid",
      dividerWidth: "1px",
      buttonStyle: "solid",
      decorativeElements: false,
      ornaments: false,
      shadowStyle: "subtle",
      animationStyle: "smooth",
      sectionSpacing: "8rem",
      cardStyle: "flat",
    },
  },

  // ═══════════════════════════════════════════════════════════
  // CONTEMPORARY - Grau/Rot - Kreativ künstlerisch
  // ═══════════════════════════════════════════════════════════
  contemporary: {
    id: "contemporary",
    name: "Contemporary",
    description: "Kreativ künstlerisch",
    colors: {
      primary: "#C45C4B",
      secondary: "#A84B3C",
      accent: "#D97B6B",
      background: "#F5F5F5",
      backgroundAlt: "#EDEDED",
      surface: "#FFFFFF",
      text: "#2D2D2D",
      textSecondary: "#5C5C5C",
      textMuted: "#8C8C8C",
      border: "#DDDDDD",
      borderHover: "#C45C4B",
    },
    fonts: {
      heading: "'Instrument Serif', serif",
      body: "'Inter', sans-serif",
    },
    style: {
      headingWeight: "400",
      headingLetterSpacing: "-0.02em",
      headingTextTransform: "none",
      bodyLetterSpacing: "0",
      borderRadius: "0",
      borderWidth: "2px",
      dividerStyle: "solid",
      dividerWidth: "2px",
      buttonStyle: "solid",
      decorativeElements: false,
      ornaments: false,
      shadowStyle: "none",
      animationStyle: "smooth",
      sectionSpacing: "8rem",
      cardStyle: "bordered",
    },
  },
}

// Theme order for switcher
export const themeOrder = [
  "editorial",
  "gold",
  "timeless",
  "botanical",
  "luxe",
  "intimate",
  "contemporary",
]

// Get theme by id
export const getTheme = (themeId) => {
  return marketingThemes[themeId] || marketingThemes.editorial
}

// Helper: Check if theme is dark
export const isDarkTheme = (themeId) => {
  const darkThemes = ["gold", "luxe"]
  return darkThemes.includes(themeId)
}

export default marketingThemes
