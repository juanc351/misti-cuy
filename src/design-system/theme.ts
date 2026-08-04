/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Design System
 *
 * Tema oficial de la aplicación.
 *
 * Punto único de acceso a todos los Design Tokens.
 * ============================================================================
 */

import { colors } from "./tokens/colors";
import { spacing } from "./tokens/spacing";
import { radius } from "./tokens/radius";
import { shadows } from "./tokens/shadows";
import { typography } from "./tokens/typography";
import { blur } from "./tokens/blur";
import { opacity } from "./tokens/opacity";
import { zIndex } from "./tokens/zIndex";

export const theme = {
  colors,
  spacing,
  radius,
  shadows,
  typography,
  blur,
  opacity,
  zIndex,
} as const;