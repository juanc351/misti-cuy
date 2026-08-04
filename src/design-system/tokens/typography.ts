/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Design System
 *
 * Typography Tokens
 * ============================================================================
 */

export const typography = {
  fontFamily: {
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  },

  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
} as const;