/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Tipos relacionados con cuyes.
 * ============================================================================
 */

import type { BaseEntity } from "./common";

export interface Cuy extends BaseEntity {
  code: string;

  weight: number;
}