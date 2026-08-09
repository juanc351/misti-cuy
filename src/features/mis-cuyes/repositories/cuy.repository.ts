import "server-only";

import { Timestamp } from "firebase-admin/firestore";

import { db } from "@/lib/firebase-admin";

import type {
  CuyCategory,
  CuyCity,
  CuyProduct,
  CuyVariant,
} from "../types/cuy.types";

import type { CuyInventoryItem } from "../data/cuy.inventory";

/**
 * ============================================================================
 * MISTI CUY
 *
 * Módulo:
 * Mis Cuyes
 *
 * Archivo:
 * cuy.repository.ts
 *
 * Responsabilidad:
 *
 * Acceder exclusivamente a Firestore mediante Firebase Admin SDK.
 *
 * Este archivo NO controla:
 *
 * - caché
 * - filtros
 * - estado de React
 * - componentes
 *
 * La caché continúa siendo responsabilidad de:
 *
 * cuy.server.ts
 *
 * Arquitectura:
 *
 * Firestore
 *    ↓
 * Repository
 *    ↓
 * cuy.server.ts
 *    ↓
 * Vercel Cache
 *    ↓
 * Client
 *
 * ============================================================================
 */

/* ============================================================================
   COLECCIONES
   ============================================================================ */

const COLLECTIONS = {
  categories: "cuyCategories",
  variants: "cuyVariants",
  cities: "cuyCities",
  inventory: "cuyInventory",
  products: "cuyProducts",
} as const;

/* ============================================================================
   FECHA DE INVENTARIO
   ============================================================================ */

/**
 * Convierte un Timestamp de Firestore en una fecha
 * que pueda consumir el frontend.
 *
 * La fecha se muestra según la zona horaria de Perú.
 *
 * Ejemplo:
 *
 * Firestore:
 * Timestamp
 *
 * Frontend:
 * "09/08/2026"
 *
 * La hora NO se muestra.
 */
function formatInventoryDate(
  value: unknown
): string {
  if (value instanceof Timestamp) {
    return new Intl.DateTimeFormat("es-PE", {
      timeZone: "America/Lima",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(value.toDate());
  }

  /**
   * Compatibilidad temporal.
   *
   * Si algún documento antiguo todavía tuviera
   * una fecha como string, no rompemos la aplicación.
   */
  if (typeof value === "string") {
    return value;
  }

  return "";
}

/* ============================================================================
   CATEGORÍAS
   ============================================================================ */

/**
 * Obtiene todas las categorías desde Firestore.
 */
export async function getCategories(): Promise<CuyCategory[]> {
  const snapshot = await db
    .collection(COLLECTIONS.categories)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CuyCategory[];
}

/* ============================================================================
   VARIEDADES
   ============================================================================ */

/**
 * Obtiene todas las variedades desde Firestore.
 */
export async function getVariants(): Promise<CuyVariant[]> {
  const snapshot = await db
    .collection(COLLECTIONS.variants)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CuyVariant[];
}

/* ============================================================================
   CIUDADES
   ============================================================================ */

/**
 * Obtiene todas las ciudades desde Firestore.
 */
export async function getCities(): Promise<CuyCity[]> {
  const snapshot = await db
    .collection(COLLECTIONS.cities)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CuyCity[];
}

/* ============================================================================
   INVENTARIO
   ============================================================================ */

/**
 * Obtiene todo el inventario desde Firestore.
 *
 * IMPORTANTE:
 *
 * Firestore almacena updatedAt como Timestamp.
 *
 * El repository lo transforma a:
 *
 * "09/08/2026"
 *
 * para mantener compatible el contrato actual:
 *
 * updatedAt: string
 */
export async function getInventory(): Promise<
  CuyInventoryItem[]
> {
  const snapshot = await db
    .collection(COLLECTIONS.inventory)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,

      category: data.category,

      variantId: data.variantId,

      cityId: data.cityId,

      status: data.status,

      ageRange: data.ageRange,

      averageWeight: data.averageWeight,

      presentation: data.presentation,

      males: data.males,

      females: data.females,

      quantity: data.quantity,

      updatedAt: formatInventoryDate(
        data.updatedAt
      ),
    };
  }) as CuyInventoryItem[];
}

/* ============================================================================
   PRODUCTOS
   ============================================================================ */

/**
 * Obtiene todos los productos desde Firestore.
 */
export async function getProducts(): Promise<CuyProduct[]> {
  const snapshot = await db
    .collection(COLLECTIONS.products)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CuyProduct[];
}