/**
 * ============================================================================
 * MISTI CUY
 *
 * ---
 * Módulo:
 * Mis Cuyes
 *
 * Archivo:
 * cuy.types.ts
 *
 * Contratos oficiales del dominio.
 * ============================================================================
 */

/* ============================================================================
ENUMS
============================================================================ */

export enum CuyCategoryType {
  REPRODUCTOR = "REPRODUCTOR",
  CONSUMO = "CONSUMO",
}

export enum CuyVariantType {
  RAZA = "RAZA",
  LINEA = "LINEA",
  HIBRIDO = "HIBRIDO",
}

export enum CuyAvailabilityStatus {
  DISPONIBLE = "DISPONIBLE",
  AGOTADO = "AGOTADO",
  PROXIMAMENTE = "PROXIMAMENTE",
}

export enum CuySex {
  MACHO = "MACHO",
  HEMBRA = "HEMBRA",
}

/* ============================================================================
ENTIDADES
============================================================================ */

export interface CuyCategory {
  id: string;
  name: string;
  type: CuyCategoryType;
  description?: string;
  image?: string;
  isActive: boolean;
  order: number;
}

export interface CuyVariant {
  id: string;
  name: string;
  type: CuyVariantType;
  description?: string;
  image?: string;
  isActive: boolean;
  order: number;
}

export interface CuyCity {
  id: string;
  name: string;
  district: string;
  department: string;
  whatsapp: string;
  address?: string;
  isActive: boolean;
  order: number;
}

export interface CuyImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface CuyContact {
  city: CuyCity;
  whatsapp: string;
  message: string;
}

/* ============================================================================
PRODUCTOS
============================================================================ */

/**
 * Producto comercial.
 *
 * La disponibilidad NO pertenece al producto.
 *
 * La disponibilidad central se encuentra en:
 *
 * data/cuy.inventory.ts
 *
 * Esto evita duplicar cantidades, pesos, machos, hembras,
 * estados y fechas de actualización.
 */
export interface CuyProduct {
  id: string;

  name: string;

  categoryId: string;

  variantId?: string;

  description: string;

  images: CuyImage[];

  contact: CuyContact;

  isPublished: boolean;

  createdAt: Date;

  updatedAt: Date;
}