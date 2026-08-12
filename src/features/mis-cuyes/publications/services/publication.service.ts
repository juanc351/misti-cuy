import "server-only";

import {
  createPublication,
  deletePublication,
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

  await revalidateMisCuyesPublicData();

  return publication;
}

/* ================================================================
   ELIMINAR PUBLICACIÓN
================================================================ */

export async function deletePublicationData(
  id: string,
): Promise<boolean> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la publicación es obligatorio.",
    );
  }

  const deleted =
    await deletePublication(id);

  /*
   * Si realmente se eliminó,
   * invalidamos la caché pública
   * para que desaparezca del sitio.
   */
  if (deleted) {
    await revalidateMisCuyesPublicData();
  }

  return deleted;
}

/* ================================================================
   ACTUALIZAR CANTIDAD Y PRECIO
================================================================ */

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
  if (!data.type) {
    throw new Error(
      "El tipo de publicación es obligatorio.",
    );
  }

  if (!data.department?.trim()) {
    throw new Error(
      "El departamento es obligatorio.",
    );
  }

  validateQuantity(
    data.quantity,
  );

  if (
    !Number.isFinite(data.price) ||
    data.price <= 0
  ) {
    throw new Error(
      "El precio debe ser mayor que cero.",
    );
  }

  if (
    data.type ===
    "REPRODUCTOR"
  ) {
    validateReproductor(data);
  }

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

      ...(data.line?.trim()
        ? {
            line:
              data.line.trim(),
          }
        : {}),

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