/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Módulo:
 * Catálogo Público (Mis Cuyes)
 *
 * Archivo:
 * catalog.types.ts
 *
 * Descripción:
 * Contratos oficiales del dominio del catálogo.
 *
 * Este archivo es compartido por:
 *
 * • Frontend
 * • Backend
 * • Panel Administrativo
 * • Base de Datos
 *
 * Las entidades aquí definidas representan el modelo de negocio aprobado
 * en Proyecto Maestro.
 * ============================================================================
 */

/* ============================================================================
   ENUMS
============================================================================ */

/**
 * Categorías principales del catálogo.
 */
export enum CatalogCategoryType {
  REPRODUCTOR = "REPRODUCTOR",
  CONSUMO = "CONSUMO",
}

/**
 * Tipo de variedad genética.
 */
export enum CatalogVariantType {
  RAZA = "RAZA",
  LINEA = "LINEA",
  HIBRIDO = "HIBRIDO",
}

/**
 * Estado de disponibilidad.
 */
export enum CatalogAvailabilityStatus {
  DISPONIBLE = "DISPONIBLE",
  AGOTADO = "AGOTADO",
  PROXIMAMENTE = "PROXIMAMENTE",
}

/**
 * Sexo del reproductor.
 */
export enum CatalogSex {
  MACHO = "MACHO",
  HEMBRA = "HEMBRA",
}

/* ============================================================================
   ENTIDADES
============================================================================ */

/**
 * Categoría principal del catálogo.
 *
 * Ejemplos:
 * • Reproductores
 * • Consumo
 */
export interface CatalogCategory {
  /**
   * Identificador único.
   */
  id: string;

  /**
   * Nombre visible.
   */
  name: string;

  /**
   * Tipo de categoría.
   */
  type: CatalogCategoryType;

  /**
   * Descripción corta.
   */
  description?: string;

  /**
   * Imagen representativa.
   */
  image?: string;

  /**
   * Estado.
   */
  isActive: boolean;

  /**
   * Orden de visualización.
   */
  order: number;
}

/**
 * Representa una variedad genética.
 *
 * Una variedad puede ser:
 *
 * • Raza
 * • Línea
 *
 * Ejemplos:
 *
 * • Perú
 * • Andina
 * • Inti
 * • Mantaro
 */
export interface CatalogVariant {
  /**
   * Identificador.
   */
  id: string;

  /**
   * Nombre.
   */
  name: string;

  /**
   * Tipo de variedad.
   */
  type: CatalogVariantType;

  /**
   * Descripción.
   */
  description?: string;

  /**
   * Imagen representativa.
   */
  image?: string;

  /**
   * Estado.
   */
  isActive: boolean;

  /**
   * Orden.
   */
  order: number;
}

/**
 * Ciudad donde existe disponibilidad.
 *
 * Cada ciudad posee su propio canal
 * de atención por WhatsApp.
 */
export interface CatalogCity {
  /**
   * Identificador.
   */
  id: string;

  /**
   * Ciudad.
   */
  name: string;

  /**
   * Distrito.
   */
  district: string;

  /**
   * Departamento o región.
   */
  department: string;

  /**
   * WhatsApp asignado.
   */
  whatsapp: string;

  /**
   * Dirección física.
   */
  address?: string;

  /**
   * Estado.
   */
  isActive: boolean;

  /**
   * Orden.
   */
  order: number;
}
/**
 * Imagen perteneciente a un producto.
 */
export interface CatalogImage {
  /**
   * Identificador.
   */
  id: string;

  /**
   * URL de la imagen.
   */
  url: string;

  /**
   * Texto alternativo.
   */
  alt: string;

  /**
   * Indica si es la imagen principal.
   */
  isPrimary: boolean;

  /**
   * Orden dentro de la galería.
   */
  order: number;
}

/**
 * Información de contacto utilizada por el catálogo.
 *
 * Actualmente solamente se utiliza WhatsApp,
 * pero esta entidad permitirá incorporar otros
 * canales en el futuro.
 */
export interface CatalogContact {
  /**
   * Ciudad relacionada.
   */
  city: CatalogCity;

  /**
   * Número de WhatsApp.
   */
  whatsapp: string;

  /**
   * Mensaje sugerido para iniciar la conversación.
   */
  message: string;
}

/**
 * Disponibilidad publicada para un producto.
 *
 * Dependiendo de la categoría del producto,
 * algunos campos serán utilizados y otros no.
 *
 * Reproductores
 * - Edad
 * - Machos
 * - Hembras
 *
 * Consumo
 * - Peso
 * - Cantidad
 */
/**
 * Disponibilidad publicada para un producto.
 *
 * Dependiendo de la categoría del producto,
 * algunos campos serán utilizados y otros no.
 */
export interface CatalogAvailability {
  /**
   * Identificador único.
   */
  id: string;

  /**
   * Ciudad donde existe disponibilidad.
   */
  cityId: string;

  /**
   * Estado de disponibilidad.
   */
  status: CatalogAvailabilityStatus;

  /**
   * Rango de edad.
   *
   * Solo reproductores.
   */
  ageRange?: string;

  /**
   * Peso en gramos.
   *
   * Solo consumo.
   */
  weightGrams?: number;

  /**
   * Machos disponibles.
   */
  availableMales?: number;

  /**
   * Hembras disponibles.
   */
  availableFemales?: number;

  /**
   * Cantidad disponible.
   *
   * Solo consumo.
   */
  availableQuantity?: number;

  /**
   * Última actualización.
   */
  updatedAt: Date;
}
export interface CatalogProduct {
  /**
   * Identificador único.
   */
  id: string;

  /**
   * Nombre comercial.
   *
   * Ejemplo:
   * Perú
   * Andina
   * Mantaro
   * Híbrido Misti
   */
  name: string;

  /**
   * Categoría principal.
   */
/**
 * Identificador de la categoría.
 */
categoryId: string;

/**
 * Identificador de la variedad.
 */
variantId?: string;

  /**
   * Descripción pública.
   */
  description: string;

  /**
   * Galería de imágenes.
   */
  images: CatalogImage[];

  /**
   * Disponibilidades publicadas.
   */
  availability: CatalogAvailability[];

  /**
   * Canal de contacto.
   */
  contact: CatalogContact;

  /**
   * Indica si el producto está publicado.
   */
  isPublished: boolean;

  /**
   * Fecha de creación.
   */
  createdAt: Date;

  /**
   * Fecha de actualización.
   */
  updatedAt: Date;
}
