import type { Metadata } from "next";

import { appConfig } from "./app";

/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Metadata oficial de la aplicación.
 * ============================================================================
 */

export const metadataConfig: Metadata = {
  title: appConfig.name,

  description: appConfig.description,
};