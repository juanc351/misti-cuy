import "server-only";

import {
  unstable_cache,
  revalidatePath,
  revalidateTag,
} from "next/cache";

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

import {
  getPublications,
} from "@/features/mis-cuyes/publications/repositories/publication.repository";

import type {
  Publication,
} from "@/features/mis-cuyes/publications/types/publication.types";

import {
  getAdminProfile,
} from "@/features/mis-cuyes/profile/repositories/profile.repository";

import type {
  AdminProfile,
} from "@/features/mis-cuyes/profile/types/profile.types";

/* ================================================================
   TIEMPOS DE REVALIDACIÓN
================================================================ */

const CATALOG_REVALIDATE = 3600;

const INVENTORY_REVALIDATE = 300;

const PUBLICATIONS_REVALIDATE = 300;

const PROFILE_REVALIDATE = 300;

/* ================================================================
   TAGS DE CACHÉ
================================================================ */

export const CUY_CACHE_TAGS = {
  categories: "mis-cuyes-categories",
  variants: "mis-cuyes-variants",
  cities: "mis-cuyes-cities",
  products: "mis-cuyes-products",
  inventory: "mis-cuyes-inventory",
  publications: "mis-cuyes-publications",
  profile: "mis-cuyes-admin-profile",
} as const;

/* ================================================================
   CATEGORÍAS
================================================================ */

export const getCuyCategories = unstable_cache(
  async (): Promise<CuyCategory[]> => {
    return getCategories();
  },
  [CUY_CACHE_TAGS.categories],
  {
    revalidate: CATALOG_REVALIDATE,
    tags: [CUY_CACHE_TAGS.categories],
  },
);

/* ================================================================
   VARIEDADES
================================================================ */

export const getCuyVariants = unstable_cache(
  async (): Promise<CuyVariant[]> => {
    return getVariants();
  },
  [CUY_CACHE_TAGS.variants],
  {
    revalidate: CATALOG_REVALIDATE,
    tags: [CUY_CACHE_TAGS.variants],
  },
);

/* ================================================================
   CIUDADES
================================================================ */

export const getCuyCities = unstable_cache(
  async (): Promise<CuyCity[]> => {
    return getCities();
  },
  [CUY_CACHE_TAGS.cities],
  {
    revalidate: CATALOG_REVALIDATE,
    tags: [CUY_CACHE_TAGS.cities],
  },
);

/* ================================================================
   PRODUCTOS
================================================================ */

export const getCuyProducts = unstable_cache(
  async (): Promise<CuyProduct[]> => {
    return getProducts();
  },
  [CUY_CACHE_TAGS.products],
  {
    revalidate: CATALOG_REVALIDATE,
    tags: [CUY_CACHE_TAGS.products],
  },
);

/* ================================================================
   INVENTARIO ANTIGUO
================================================================ */

export const getCuyInventory = unstable_cache(
  async (): Promise<CuyInventoryItem[]> => {
    return getInventory();
  },
  [CUY_CACHE_TAGS.inventory],
  {
    revalidate: INVENTORY_REVALIDATE,
    tags: [CUY_CACHE_TAGS.inventory],
  },
);

/* ================================================================
   PUBLICACIONES
================================================================ */

export const getCuyPublications = unstable_cache(
  async (): Promise<Publication[]> => {
    return getPublications();
  },
  [CUY_CACHE_TAGS.publications],
  {
    revalidate: PUBLICATIONS_REVALIDATE,
    tags: [CUY_CACHE_TAGS.publications],
  },
);

/* ================================================================
   PERFIL DEL ADMINISTRADOR
================================================================ */

/*
 * Fuente central para:
 *
 * - teléfono / WhatsApp
 * - departamento
 * - ubicación
 */

export const getCuyAdminProfile = unstable_cache(
  async (): Promise<AdminProfile | null> => {
    return getAdminProfile();
  },
  [CUY_CACHE_TAGS.profile],
  {
    revalidate: PROFILE_REVALIDATE,
    tags: [CUY_CACHE_TAGS.profile],
  },
);

/* ================================================================
   INVALIDAR DATOS PÚBLICOS DE MIS CUYES
================================================================ */

/*
 * Se ejecuta después de una modificación realizada
 * desde el panel administrativo.
 *
 * No elimina la caché permanentemente.
 *
 * Simplemente marca los datos como obsoletos para que
 * la siguiente lectura vuelva a obtener información fresca.
 */

export async function revalidateMisCuyesPublicData(): Promise<void> {
  revalidateTag(
    CUY_CACHE_TAGS.publications,
    "max",
  );

  revalidateTag(
    CUY_CACHE_TAGS.profile,
    "max",
  );

  revalidateTag(
    CUY_CACHE_TAGS.inventory,
    "max",
  );

  revalidatePath(
    "/mis-cuyes",
    "page",
  );
}

/* ================================================================
   DATOS COMPLETOS
================================================================ */

export interface CuyServerData {
  products: CuyProduct[];

  categories: CuyCategory[];

  variants: CuyVariant[];

  cities: CuyCity[];

  inventory: CuyInventoryItem[];

  publications: Publication[];

  profile: AdminProfile | null;
}

/* ================================================================
   OBTENER TODOS LOS DATOS
================================================================ */

export async function getMisCuyesData(): Promise<CuyServerData> {
  const [
    products,
    categories,
    variants,
    cities,
    inventory,
    publications,
    profile,
  ] = await Promise.all([
    getCuyProducts(),
    getCuyCategories(),
    getCuyVariants(),
    getCuyCities(),
    getCuyInventory(),
    getCuyPublications(),
    getCuyAdminProfile(),
  ]);

  return {
    products,
    categories,
    variants,
    cities,
    inventory,
    publications,
    profile,
  };
}