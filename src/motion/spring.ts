/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Motion System
 *
 * Springs reutilizables para toda la aplicación.
 * ============================================================================
 */

export const SPRING = {
  gentle: {
    type: "spring",
    stiffness: 260,
    damping: 24,
    mass: 1,
  },

  smooth: {
    type: "spring",
    stiffness: 420,
    damping: 30,
    mass: 0.9,
  },

  snappy: {
    type: "spring",
    stiffness: 700,
    damping: 38,
    mass: 0.75,
  },
} as const;