import "server-only";

import { revalidateTag } from "next/cache";

/**
 * ============================================================================
 * MISTI CUY
 *
 * Módulo:
 * Mis Cuyes
 *
 * Archivo:
 * cuy.cache.ts
 *
 * Responsabilidad:
 *
 * Centralizar las etiquetas de caché utilizadas por Mis Cuyes.
 *
 * Este archivo NO consulta Firestore.
 * Este archivo NO contiene lógica de negocio.
 * Este archivo NO controla el estado de React.
 *
 * Su única responsabilidad es invalidar la caché correspondiente.
 * ============================================================================
 */

/* ============================================================================
   TAGS
   ============================================================================ */

export const CUY_CACHE_TAGS = {
  categories: "mis-cuyes-categories",
  variants: "mis-cuyes-variants",
  cities: "mis-cuyes-cities",
  products: "mis-cuyes-products",
  inventory: "mis-cuyes-inventory",
} as const;

/* ============================================================================
   INVALIDACIÓN INDIVIDUAL
   ============================================================================ */

/**
 * Invalida la caché de categorías.
 */
export function revalidateCuyCategories(): void {
  revalidateTag(CUY_CACHE_TAGS.categories, "max");
}

/**
 * Invalida la caché de variedades.
 */
export function revalidateCuyVariants(): void {
  revalidateTag(CUY_CACHE_TAGS.variants, "max");
}

/**
 * Invalida la caché de ciudades.
 */
export function revalidateCuyCities(): void {
  revalidateTag(CUY_CACHE_TAGS.cities, "max");
}

/**
 * Invalida la caché de productos.
 */
export function revalidateCuyProducts(): void {
  revalidateTag(CUY_CACHE_TAGS.products, "max");
}

/**
 * Invalida la caché del inventario.
 */
export function revalidateCuyInventory(): void {
  revalidateTag(CUY_CACHE_TAGS.inventory, "max");
}

/* ============================================================================
   INVALIDACIÓN COMPLETA
   ============================================================================ */

/**
 * Invalida toda la caché relacionada con Mis Cuyes.
 *
 * Útil para operaciones administrativas que modifican
 * varios grupos de datos al mismo tiempo.
 */
export function revalidateAllCuyData(): void {
  revalidateTag(CUY_CACHE_TAGS.categories, "max");
  revalidateTag(CUY_CACHE_TAGS.variants, "max");
  revalidateTag(CUY_CACHE_TAGS.cities, "max");
  revalidateTag(CUY_CACHE_TAGS.products, "max");
  revalidateTag(CUY_CACHE_TAGS.inventory, "max");
}