import type { CuyInventoryItem } from "../data/cuy.inventory";

import type {
  CuyCategory,
  CuyCity,
  CuyProduct,
  CuyVariant,
} from "./cuy.types";

import type { Publication } from "@/features/mis-cuyes/publications/types/publication.types";

import type { AdminProfile } from "@/features/mis-cuyes/profile/types/profile.types";

/* ================================================================
   FILTROS
================================================================ */

/**
 * Filtros utilizados por la página pública
 * de Mis Cuyes.
 */
export interface CuyFilters {
  /**
   * Categoría:
   *
   * REPRODUCTOR
   * CONSUMO
   */
  selectedCategory: string | null;

  /**
   * Departamento.
   *
   * Las publicaciones se filtran
   * mediante publication.department.
   */
  selectedDepartment: string | null;

  /**
   * Estado de la publicación.
   *
   * ALL:
   * muestra disponibles y no disponibles.
   *
   * DISPONIBLE:
   * muestra publicaciones disponibles.
   *
   * NO_DISPONIBLE:
   * muestra publicaciones agotadas/vendidas.
   */
  selectedStatus:
    | "ALL"
    | "DISPONIBLE"
    | "NO_DISPONIBLE";

  /**
   * Solo reproductores.
   */
  selectedVariant: string | null;

  /**
   * Solo consumo.
   */
  selectedPresentation: string | null;

  /**
   * Búsqueda.
   */
  search: string;
}

/* ================================================================
   SELECCIÓN
================================================================ */

/**
 * Estado de la publicación seleccionada
 * por el usuario en las tablas públicas.
 *
 * IMPORTANTE:
 *
 * Aquí solamente guardamos el ID.
 *
 * Los datos comerciales NO se almacenan
 * en el estado del frontend.
 *
 * La publicación real continúa viniendo
 * desde Firestore → servidor → initialData.
 */
export interface CuySelection {
  selectedPublicationId: string | null;
}

/* ================================================================
   ACCIONES
================================================================ */

export interface CuyActions {
  setCategory: (
    id: string | null,
  ) => void;

  /**
   * Seleccionar departamento.
   */
  setDepartment: (
    department: string | null,
  ) => void;

  /**
   * Seleccionar estado.
   */
  setStatus: (
    status:
      | "ALL"
      | "DISPONIBLE"
      | "NO_DISPONIBLE",
  ) => void;

  /**
   * Solo reproductores.
   */
  setVariant: (
    id: string | null,
  ) => void;

  /**
   * Solo consumo.
   */
  setPresentation: (
    value: string | null,
  ) => void;

  /**
   * Búsqueda.
   */
  setSearch: (
    value: string,
  ) => void;

  /**
   * Seleccionar una publicación
   * desde una tabla.
   */
  selectPublication: (
    id: string,
  ) => void;

  /**
   * Limpiar filtros y selección.
   */
  clearFilters: () => void;
}

/* ================================================================
   DATOS
================================================================ */

export interface CuyData {
  products: CuyProduct[];

  categories: CuyCategory[];

  variants: CuyVariant[];

  /**
   * Catálogo antiguo de ciudades.
   *
   * Se mantiene temporalmente durante
   * la migración.
   */
  cities: CuyCity[];

  /**
   * Fuente antigua de disponibilidad.
   *
   * Se mantiene temporalmente durante
   * la migración hacia publicaciones.
   */
  inventory: CuyInventoryItem[];

  /**
   * Publicaciones comerciales.
   *
   * Fuente actual para mostrar:
   *
   * - reproductores
   * - cuyes de consumo
   * - departamento
   * - estado
   * - precio
   * - cantidad
   * - sexo
   * - color
   * - observaciones
   * - fecha de actualización
   */
  publications: Publication[];

  /**
   * Perfil del administrador.
   *
   * Fuente central para:
   *
   * - teléfono / WhatsApp
   * - departamento
   * - ubicación
   */
  profile: AdminProfile | null;
}

/* ================================================================
   RETORNO DEL HOOK
================================================================ */

export interface UseCuyReturn {
  data: CuyData;

  loading: boolean;

  error: string | null;

  filters: CuyFilters;

  /**
   * Publicación actualmente seleccionada
   * por el usuario.
   *
   * Solo contiene el ID.
   */
  selection: CuySelection;

  actions: CuyActions;
}