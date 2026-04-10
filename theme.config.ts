/**
 * ============================================================
 *  HAUMANSKLOOF — THEME CONFIG
 * ============================================================
 *  This is the single source of truth for the site's design.
 *  Change colours, fonts, or spacing here and it updates
 *  everywhere across the site automatically.
 * ============================================================
 */

export const theme = {

  /**
   * COLOURS
   * Primary palette for the site.
   * Swap any hex value to instantly retheme.
   */
  colors: {
    // Core brand colours
    primary:       '#8a7a52',   // Warm gold — buttons, accents
    primaryHover:  '#7a6a42',   // Darker gold — button hover state
    primaryLight:  '#f5f0e8',   // Cream — text on dark buttons

    // Background shades
    bgDark:        '#2d3a25',   // Deep forest — hero, CTA band
    bgMid:         '#3d4e30',   // Mid forest — image placeholders
    bgLight:       '#f8f6f1',   // Warm off-white — light sections

    // Text
    textDark:      '#1a1a1a',   // Near-black — headings
    textMid:       '#4a4a4a',   // Dark grey — body copy
    textLight:     '#f0ebe0',   // Cream — text on dark backgrounds
    textMuted:     '#888880',   // Muted — labels, captions

    // UI
    border:        '#e2ddd6',   // Warm border
    borderDark:    'rgba(240,235,224,0.3)', // Border on dark backgrounds
  },

  /**
   * TYPOGRAPHY
   * Change font names here — make sure to update the
   * Google Fonts import in app/layout.tsx to match.
   */
  fonts: {
    heading: '"Cormorant Garamond", Georgia, serif',  // Elegant serif for headings
    body:    '"Inter", system-ui, sans-serif',         // Clean sans for body text
  },

  /**
   * FONT SIZES
   * Responsive scale — adjust to taste.
   */
  fontSizes: {
    hero:    'clamp(28px, 5vw, 48px)',
    h1:      'clamp(24px, 4vw, 36px)',
    h2:      'clamp(20px, 3vw, 28px)',
    h3:      '18px',
    body:    '15px',
    small:   '13px',
    label:   '11px',
  },

  /**
   * SPACING
   * Section padding — adjust for more/less breathing room.
   */
  spacing: {
    sectionY:  '80px',   // Vertical padding for major sections
    sectionX:  '40px',   // Horizontal padding / gutter
    containerMax: '1100px', // Max page width
  },

  /**
   * BORDER RADIUS
   */
  radius: {
    sm:  '4px',
    md:  '8px',
    lg:  '12px',
  },

} as const

export type Theme = typeof theme
