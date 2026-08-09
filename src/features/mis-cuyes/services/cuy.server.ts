import "server-only";

import { unstable_cache } from "next/cache";

import type {
  CuyCategory,
  CuyCity,
  CuyProduct,
  CuyVariant,
} from "../types/cuy.types";

import type { CuyInventoryItem } from "../data/cuy.inventory";

import {
  getCategories,
  getCities,
  getInventory,
  getProducts,
  getVariants,
} from "../repositories/cuy.repository";

/**
 * ============================================================================
 * MISTI CUY
 *
 * Módulo:
 * Mis Cuyes
 *
 * Archivo:
 * cuy.server.ts
 *
 * Responsabilidad:
 *
 * Obtener los datos de Mis Cuyes desde el repository y aplicar
 * la estrategia de caché del servidor.
 *
 * Arquitectura:
 *
 * Firestore
 *    ↓
 * cuy.repository.ts
 *    ↓
 * unstable_cache
 *    ↓
 * cuy.server.ts
 *    ↓
 * MisCuyesPage
 *    ↓
 * Client
 *
 * IMPORTANTE:
 *
 * Este archivo NO accede directamente a Firestore.
 *
 * Tampoco contiene filtros ni estado de React.
 * ============================================================================
 */

/* ============================================================================
   TIEMPOS DE REVALIDACIÓN
   ============================================================================ */

/**
 * Catálogos:
 *
 * - categorías
 * - variedades
 * - ciudades
 * - productos
 *
 * Cambian con poca frecuencia.
 *
 * Se mantienen en caché durante 1 hora.
 */
const CATALOG_REVALIDATE = 3600;

/**
 * Inventario:
 *
 * - cantidades
 * - machos
 * - hembras
 * - disponibilidad
 * - peso
 * - updatedAt
 *
 * Cambia con mayor frecuencia.
 *
 * Se mantiene en caché durante 5 minutos.
 */
const INVENTORY_REVALIDATE = 300;

/* ============================================================================
   CATEGORÍAS
   ============================================================================ */

/**
 * Obtiene las categorías desde Firestore mediante el repository.
 *
 * CACHE:
 * 1 hora.
 */
export const getCuyCategories = unstable_cache(
  async (): Promise<CuyCategory[]> => {
    return getCategories();
  },
  ["mis-cuyes-categories"],
  {
    revalidate: CATALOG_REVALIDATE,
    tags: ["mis-cuyes-categories"],
  }
);

/* ============================================================================
   VARIEDADES
   ============================================================================ */

/**
 * Obtiene las variedades desde Firestore mediante el repository.
 *
 * CACHE:
 * 1 hora.
 */
export const getCuyVariants = unstable_cache(
  async (): Promise<CuyVariant[]> => {
    return getVariants();
  },
  ["mis-cuyes-variants"],
  {
    revalidate: CATALOG_REVALIDATE,
    tags: ["mis-cuyes-variants"],
  }
);

/* ============================================================================
   CIUDADES
   ============================================================================ */

/**
 * Obtiene las ciudades desde Firestore mediante el repository.
 *
 * CACHE:
 * 1 hora.
 */
export const getCuyCities = unstable_cache(
  async (): Promise<CuyCity[]> => {
    return getCities();
  },
  ["mis-cuyes-cities"],
  {
    revalidate: CATALOG_REVALIDATE,
    tags: ["mis-cuyes-cities"],
  }
);

/* ============================================================================
   PRODUCTOS
   ============================================================================ */

/**
 * Obtiene los productos desde Firestore mediante el repository.
 *
 * CACHE:
 * 1 hora.
 *
 * Actualmente Firestore no tiene productos porque cuyProducts
 * estaba vacío durante la migración.
 */
export const getCuyProducts = unstable_cache(
  async (): Promise<CuyProduct[]> => {
    return getProducts();
  },
  ["mis-cuyes-products"],
  {
    revalidate: CATALOG_REVALIDATE,
    tags: ["mis-cuyes-products"],
  }
);

/* ============================================================================
   INVENTARIO
   ============================================================================ */

/**
 * Obtiene el inventario central desde Firestore mediante el repository.
 *
 * IMPORTANTE:
 *
 * inventory continúa siendo la fuente central de verdad
 * para la disponibilidad.
 *
 * CACHE:
 * 5 minutos.
 */
export const getCuyInventory = unstable_cache(
  async (): Promise<CuyInventoryItem[]> => {
    return getInventory();
  },
  ["mis-cuyes-inventory"],
  {
    revalidate: INVENTORY_REVALIDATE,
    tags: ["mis-cuyes-inventory"],
  }
);

/* ============================================================================
   DATOS COMPLETOS
   ============================================================================ */

/**
 * Contrato de datos que necesita Mis Cuyes.
 */
export interface CuyServerData {
  products: CuyProduct[];

  categories: CuyCategory[];

  variants: CuyVariant[];

  cities: CuyCity[];

  inventory: CuyInventoryItem[];
}

/**
 * Obtiene todos los datos necesarios para Mis Cuyes.
 *
 * Las consultas se ejecutan en paralelo.
 *
 * Cada grupo mantiene su propia estrategia de caché.
 */
export async function getMisCuyesData(): Promise<CuyServerData> {
  const [
    products,
    categories,
    variants,
    cities,
    inventory,
  ] = await Promise.all([
    getCuyProducts(),
    getCuyCategories(),
    getCuyVariants(),
    getCuyCities(),
    getCuyInventory(),
  ]);

  return {
    products,
    categories,
    variants,
    cities,
    inventory,
  };
}