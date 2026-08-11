import "server-only";

import {
  createPublication,
  getPublication,
  getPublications,
  updatePublication,
  updatePublicationQuantity,
  updatePublicationStatus,
} from "../repositories/publication.repository";

import type {
  CreatePublicationInput,
  Publication,
  PublicationStatus,
} from "../types/publication.types";

import type {
  PublicationFilters,
} from "../repositories/publication.repository";

import {
  revalidateMisCuyesPublicData,
} from "../../services/cuy.server";

/* ================================================================
   OBTENER PUBLICACIONES
================================================================ */

/**
 * Obtiene las publicaciones comerciales.
 *
 * Los filtros son opcionales.
 *
 * Ejemplo:
 *
 * getPublicationsData({
 *   department: "Arequipa",
 *   status: "DISPONIBLE",
 * });
 *
 * Esto permite que Firestore filtre
 * antes de enviar los datos al frontend.
 */
export async function getPublicationsData(
  filters: PublicationFilters = {},
): Promise<Publication[]> {
  return getPublications(filters);
}

/* ================================================================
   OBTENER UNA PUBLICACIÓN
================================================================ */

export async function getPublicationData(
  id: string,
): Promise<Publication | null> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la publicación es obligatorio.",
    );
  }

  return getPublication(id);
}

/* ================================================================
   CREAR PUBLICACIÓN
================================================================ */

export async function createPublicationData(
  data: CreatePublicationInput,
): Promise<Publication> {
  validatePublication(data);

  const cleanData =
    cleanPublicationData(data);

  const publication =
    await createPublication(
      cleanData,
    );

  /*
   * La publicación ya fue guardada
   * correctamente en Firestore.
   *
   * Ahora invalidamos la caché
   * pública de Mis Cuyes.
   */
  await revalidateMisCuyesPublicData();

  return publication;
}

/* ================================================================
   ACTUALIZAR CANTIDAD Y PRECIO
================================================================ */

/**
 * Reglas:
 *
 * - La cantidad puede mantenerse.
 * - La cantidad puede disminuir.
 * - La cantidad puede llegar a 0.
 * - La cantidad NO puede aumentar.
 * - Si la cantidad llega a 0,
 *   el repository cambia automáticamente
 *   el estado a NO_DISPONIBLE.
 * - El precio debe ser mayor que 0.
 */
export async function updatePublicationData(
  id: string,
  quantity: number,
  price: number,
): Promise<Publication | null> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la publicación es obligatorio.",
    );
  }

  validateUpdateQuantity(
    quantity,
  );

  if (
    !Number.isFinite(price) ||
    price <= 0
  ) {
    throw new Error(
      "El precio debe ser mayor que cero.",
    );
  }

  const publication =
    await updatePublication(
      id,
      quantity,
      price,
    );

  /*
   * Solo invalidamos la caché
   * si realmente se actualizó
   * una publicación.
   */
  if (publication) {
    await revalidateMisCuyesPublicData();
  }

  return publication;
}

/* ================================================================
   ACTUALIZAR SOLAMENTE CANTIDAD
================================================================ */

export async function updatePublicationQuantityData(
  id: string,
  quantity: number,
): Promise<Publication | null> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la publicación es obligatorio.",
    );
  }

  validateUpdateQuantity(
    quantity,
  );

  const publication =
    await updatePublicationQuantity(
      id,
      quantity,
    );

  /*
   * Invalidar solamente si
   * la actualización fue exitosa.
   */
  if (publication) {
    await revalidateMisCuyesPublicData();
  }

  return publication;
}

/* ================================================================
   CAMBIAR ESTADO
================================================================ */

export async function updatePublicationStatusData(
  id: string,
  status: PublicationStatus,
): Promise<Publication | null> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la publicación es obligatorio.",
    );
  }

  validateStatus(status);

  const publication =
    await updatePublicationStatus(
      id,
      status,
    );

  /*
   * Invalidar solamente si
   * la actualización fue exitosa.
   */
  if (publication) {
    await revalidateMisCuyesPublicData();
  }

  return publication;
}

/* ================================================================
   VALIDAR PUBLICACIÓN
================================================================ */

function validatePublication(
  data: CreatePublicationInput,
): void {
  /* ==============================================================
     TIPO
  ============================================================== */

  if (!data.type) {
    throw new Error(
      "El tipo de publicación es obligatorio.",
    );
  }

  /* ==============================================================
     DEPARTAMENTO
  ============================================================== */

  if (!data.department?.trim()) {
    throw new Error(
      "El departamento es obligatorio.",
    );
  }

  /* ==============================================================
     CANTIDAD
  ============================================================== */

  validateQuantity(
    data.quantity,
  );

  /* ==============================================================
     PRECIO
  ============================================================== */

  if (
    !Number.isFinite(data.price) ||
    data.price <= 0
  ) {
    throw new Error(
      "El precio debe ser mayor que cero.",
    );
  }

  /* ==============================================================
     REPRODUCTOR
  ============================================================== */

  if (
    data.type ===
    "REPRODUCTOR"
  ) {
    validateReproductor(data);
  }

  /* ==============================================================
     CONSUMO
  ============================================================== */

  if (
    data.type ===
    "CONSUMO"
  ) {
    validateConsumo(data);
  }
}

/* ================================================================
   VALIDAR REPRODUCTOR
================================================================ */

function validateReproductor(
  data: Extract<
    CreatePublicationInput,
    {
      type: "REPRODUCTOR";
    }
  >,
): void {
  if (!data.breed.trim()) {
    throw new Error(
      "La raza es obligatoria.",
    );
  }

  if (!data.sex) {
    throw new Error(
      "El sexo es obligatorio.",
    );
  }

  /*
   * line y predominantColor
   * son opcionales.
   */
}

/* ================================================================
   VALIDAR CONSUMO
================================================================ */

function validateConsumo(
  data: Extract<
    CreatePublicationInput,
    {
      type: "CONSUMO";
    }
  >,
): void {
  if (
    !Number.isFinite(data.weight) ||
    data.weight < 500 ||
    data.weight > 1200
  ) {
    throw new Error(
      "El peso debe estar entre 500 g y 1200 g.",
    );
  }
}

/* ================================================================
   VALIDAR CANTIDAD DE NUEVA PUBLICACIÓN
================================================================ */

/**
 * Para crear:
 *
 * - 0 = no permitido.
 * - Debe existir al menos
 *   una unidad disponible.
 */
function validateQuantity(
  quantity: number,
): void {
  if (
    !Number.isInteger(quantity) ||
    quantity <= 0
  ) {
    throw new Error(
      "La cantidad debe ser un número entero mayor que cero.",
    );
  }
}

/* ================================================================
   VALIDAR CANTIDAD EN ACTUALIZACIÓN
================================================================ */

/**
 * Para actualizar:
 *
 * - 0 = permitido.
 * - Esto significa que se agotaron
 *   todas las unidades.
 *
 * La regla de que NO pueda aumentar
 * se comprueba contra Firestore
 * en el repository.
 */
function validateUpdateQuantity(
  quantity: number,
): void {
  if (
    !Number.isInteger(quantity) ||
    quantity < 0
  ) {
    throw new Error(
      "La cantidad debe ser un número entero igual o mayor que cero.",
    );
  }
}

/* ================================================================
   VALIDAR ESTADO
================================================================ */

function validateStatus(
  status: PublicationStatus,
): void {
  const validStatuses: PublicationStatus[] =
    [
      "DISPONIBLE",
      "NO_DISPONIBLE",
    ];

  if (
    !validStatuses.includes(
      status,
    )
  ) {
    throw new Error(
      "Estado de publicación no válido.",
    );
  }
}

/* ================================================================
   LIMPIAR DATOS
================================================================ */

function cleanPublicationData(
  data: CreatePublicationInput,
): CreatePublicationInput {
  const base = {
    /*
     * Departamento:
     *
     * Se guarda directamente en cada publicación
     * para poder filtrar en Firestore.
     */
    department:
      data.department.trim(),

    quantity:
      data.quantity,

    price:
      data.price,

    observations:
      data.observations?.trim() ??
      "",
  };

  /* ==============================================================
     REPRODUCTOR
  ============================================================== */

  if (
    data.type ===
    "REPRODUCTOR"
  ) {
    return {
      ...base,

      type: "REPRODUCTOR",

      breed:
        data.breed.trim(),

      sex:
        data.sex,

      /*
       * Solo guardamos line
       * si tiene contenido.
       */
      ...(data.line?.trim()
        ? {
            line:
              data.line.trim(),
          }
        : {}),

      /*
       * Solo guardamos color
       * si tiene contenido.
       */
      ...(data.predominantColor?.trim()
        ? {
            predominantColor:
              data.predominantColor.trim(),
          }
        : {}),
    };
  }

  /* ==============================================================
     CONSUMO
  ============================================================== */

  return {
    ...base,

    type: "CONSUMO",

    weight:
      data.weight,
  };
}