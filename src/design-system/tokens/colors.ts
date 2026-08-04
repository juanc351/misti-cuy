/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Design System
 *
 * Color Tokens
 * ============================================================================
 */

export const colors = {
  /**
   * Marca
   */
  primary: {
    DEFAULT: "#7CB342",
    hover: "#8BC34A",
    active: "#689F38",
    foreground: "#FFFFFF",
  },

  /**
   * Fondo
   */
  background: {
    primary: "#000000",
    secondary: "#0F0F0F",
    tertiary: "#181818",
  },

  /**
   * Superficies
   */
  surface: {
    primary: "rgba(0,0,0,0.75)",
    secondary: "rgba(255,255,255,0.05)",
    hover: "rgba(255,255,255,0.08)",
  },

  /**
   * Bordes
   */
  border: {
    DEFAULT: "rgba(255,255,255,0.10)",
    subtle: "rgba(255,255,255,0.05)",
    strong: "rgba(124,179,66,0.30)",
  },

  /**
   * Texto
   */
  text: {
    primary: "#FFFFFF",
    secondary: "#CBD5E1",
    muted: "#94A3B8",
    disabled: "#64748B",
  },

  /**
   * Estados
   */
  success: "#22C55E",

  warning: "#F59E0B",

  danger: "#EF4444",

  info: "#38BDF8",
} as const;