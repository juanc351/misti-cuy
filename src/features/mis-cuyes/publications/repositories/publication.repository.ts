import { db } from "@/lib/firebase-admin";

import type {
  Publication,
  CreatePublicationInput,
  PublicationStatus,
} from "../types/publication.types";

/* ================================================================
   CONFIGURACIÓN
================================================================ */

const COLLECTION = "cuy_publications";

/* ================================================================
   FILTROS DE PUBLICACIONES
================================================================ */

export interface PublicationFilters {
  department?: string;
  status?: PublicationStatus;
}

/* ================================================================
   CREAR PUBLICACIÓN
================================================================ */

export async function createPublication(
  data: CreatePublicationInput,
): Promise<Publication> {
  const now = new Date();

  const publicationRef = db
    .collection(COLLECTION)
    .doc();

  const publicationData = {
    ...data,

    status: "DISPONIBLE" as PublicationStatus,

    publishedAt: now,

    updatedAt: now,
  };

  await publicationRef.set(publicationData);

  return {
    id: publicationRef.id,

    ...data,

    status: "DISPONIBLE",

    publishedAt: now.toISOString(),

    updatedAt: now.toISOString(),
  } as Publication;
}

/* ================================================================
   OBTENER UNA PUBLICACIÓN
================================================================ */

export async function getPublication(
  id: string,
): Promise<Publication | null> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la publicación es obligatorio.",
    );
  }

  const publicationRef = db
    .collection(COLLECTION)
    .doc(id);

  const snapshot =
    await publicationRef.get();

  if (!snapshot.exists) {
    return null;
  }

  const data = snapshot.data();

  if (!data) {
    return null;
  }

  return normalizePublication(
    snapshot.id,
    data,
  );
}

/* ================================================================
   OBTENER PUBLICACIONES
================================================================ */

/*
 * Permite consultar publicaciones utilizando:
 *
 * - department
 * - status
 *
 * Ambos filtros son opcionales.
 *
 * Ejemplo:
 *
 * getPublications({
 *   department: "Arequipa",
 *   status: "DISPONIBLE",
 * });
 *
 * Firestore devolverá únicamente
 * las publicaciones que cumplan
 * esas condiciones.
 */

export async function getPublications(
  filters: PublicationFilters = {},
): Promise<Publication[]> {
  let query: FirebaseFirestore.Query =
    db.collection(COLLECTION);

  /* ==============================================================
     FILTRO POR DEPARTAMENTO
  ============================================================== */

  if (filters.department?.trim()) {
    query = query.where(
      "department",
      "==",
      filters.department.trim(),
    );
  }

  /* ==============================================================
     FILTRO POR ESTADO
  ============================================================== */

  if (filters.status) {
    query = query.where(
      "status",
      "==",
      filters.status,
    );
  }

  /* ==============================================================
     ORDENAR POR FECHA
  ============================================================== */

  query = query.orderBy(
    "publishedAt",
    "desc",
  );

  /* ==============================================================
     CONSULTAR FIRESTORE
  ============================================================== */

  const snapshot =
    await query.get();

  /* ==============================================================
     NORMALIZAR RESULTADOS
  ============================================================== */

  return snapshot.docs.map(
    (document) =>
      normalizePublication(
        document.id,
        document.data(),
      ),
  );
}

/* ================================================================
   ACTUALIZAR CANTIDAD Y PRECIO
================================================================ */

/*
 * REGLAS:
 *
 * - Solo DISPONIBLE puede editarse.
 * - La cantidad puede mantenerse.
 * - La cantidad puede disminuir.
 * - La cantidad puede llegar a 0.
 * - La cantidad NO puede aumentar.
 * - El precio debe ser mayor que 0.
 *
 * Si quantity === 0:
 *
 * status = NO_DISPONIBLE
 *
 * Una publicación NO_DISPONIBLE
 * no puede volver a editarse.
 */

export async function updatePublication(
  id: string,
  quantity: number,
  price: number,
): Promise<Publication | null> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la publicación es obligatorio.",
    );
  }

  const publicationRef =
    db
      .collection(COLLECTION)
      .doc(id);

  const snapshot =
    await publicationRef.get();

  if (!snapshot.exists) {
    return null;
  }

  const currentData =
    snapshot.data();

  if (!currentData) {
    return null;
  }

  const currentStatus =
    currentData.status as PublicationStatus;

  /* ==============================================================
     BLOQUEAR PUBLICACIONES NO DISPONIBLES
  ============================================================== */

  if (currentStatus !== "DISPONIBLE") {
    throw new Error(
      "Esta publicación no está disponible y no puede ser editada.",
    );
  }

  const currentQuantity =
    Number(
      currentData.quantity ?? 0,
    );

  /* ==============================================================
     VALIDAR CANTIDAD
  ============================================================== */

  if (!Number.isInteger(quantity)) {
    throw new Error(
      "La cantidad debe ser un número entero.",
    );
  }

  if (quantity < 0) {
    throw new Error(
      "La cantidad no puede ser negativa.",
    );
  }

  /* ==============================================================
     NO PERMITIR AUMENTAR
  ============================================================== */

  if (quantity > currentQuantity) {
    throw new Error(
      `La cantidad no puede aumentar. Actualmente hay ${currentQuantity} unidades disponibles.`,
    );
  }

  /* ==============================================================
     VALIDAR PRECIO
  ============================================================== */

  if (
    !Number.isFinite(price) ||
    price <= 0
  ) {
    throw new Error(
      "El precio debe ser mayor que cero.",
    );
  }

  /* ==============================================================
     NUEVO ESTADO
  ============================================================== */

  const newStatus: PublicationStatus =
    quantity === 0
      ? "NO_DISPONIBLE"
      : "DISPONIBLE";

  /* ==============================================================
     ACTUALIZAR FIRESTORE
  ============================================================== */

  const now = new Date();

  await publicationRef.update({
    quantity,
    price,
    status: newStatus,
    updatedAt: now,
  });

  /* ==============================================================
     DEVOLVER PUBLICACIÓN ACTUALIZADA
  ============================================================== */

  const updatedSnapshot =
    await publicationRef.get();

  const updatedData =
    updatedSnapshot.data();

  if (!updatedData) {
    return null;
  }

  return normalizePublication(
    updatedSnapshot.id,
    updatedData,
  );
}

/* ================================================================
   ACTUALIZAR SOLAMENTE CANTIDAD
================================================================ */

export async function updatePublicationQuantity(
  id: string,
  quantity: number,
): Promise<Publication | null> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la publicación es obligatorio.",
    );
  }

  const publicationRef =
    db
      .collection(COLLECTION)
      .doc(id);

  const snapshot =
    await publicationRef.get();

  if (!snapshot.exists) {
    return null;
  }

  const currentData =
    snapshot.data();

  if (!currentData) {
    return null;
  }

  const currentStatus =
    currentData.status as PublicationStatus;

  /* ==============================================================
     BLOQUEAR PUBLICACIONES NO DISPONIBLES
  ============================================================== */

  if (currentStatus !== "DISPONIBLE") {
    throw new Error(
      "Esta publicación no está disponible y no puede ser editada.",
    );
  }

  const currentQuantity =
    Number(
      currentData.quantity ?? 0,
    );

  /* ==============================================================
     VALIDAR CANTIDAD
  ============================================================== */

  if (!Number.isInteger(quantity)) {
    throw new Error(
      "La cantidad debe ser un número entero.",
    );
  }

  if (quantity < 0) {
    throw new Error(
      "La cantidad no puede ser negativa.",
    );
  }

  /* ==============================================================
     NO PERMITIR AUMENTAR
  ============================================================== */

  if (quantity > currentQuantity) {
    throw new Error(
      `La cantidad no puede aumentar. Actualmente hay ${currentQuantity} unidades disponibles.`,
    );
  }

  /* ==============================================================
     NUEVO ESTADO
  ============================================================== */

  const newStatus: PublicationStatus =
    quantity === 0
      ? "NO_DISPONIBLE"
      : "DISPONIBLE";

  /* ==============================================================
     ACTUALIZAR FIRESTORE
  ============================================================== */

  const now = new Date();

  await publicationRef.update({
    quantity,
    status: newStatus,
    updatedAt: now,
  });

  /* ==============================================================
     DEVOLVER PUBLICACIÓN ACTUALIZADA
  ============================================================== */

  const updatedSnapshot =
    await publicationRef.get();

  const updatedData =
    updatedSnapshot.data();

  if (!updatedData) {
    return null;
  }

  return normalizePublication(
    updatedSnapshot.id,
    updatedData,
  );
}

/* ================================================================
   CAMBIAR ESTADO
================================================================ */

export async function updatePublicationStatus(
  id: string,
  status: PublicationStatus,
): Promise<Publication | null> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la publicación es obligatorio.",
    );
  }

  const publicationRef =
    db
      .collection(COLLECTION)
      .doc(id);

  const snapshot =
    await publicationRef.get();

  if (!snapshot.exists) {
    return null;
  }

  const currentData =
    snapshot.data();

  if (!currentData) {
    return null;
  }

  const currentQuantity =
    Number(
      currentData.quantity ?? 0,
    );

  /* ==============================================================
     NO REACTIVAR SIN STOCK
  ============================================================== */

  if (
    status === "DISPONIBLE" &&
    currentQuantity <= 0
  ) {
    throw new Error(
      "No se puede marcar como disponible una publicación sin unidades.",
    );
  }

  /* ==============================================================
     ACTUALIZAR ESTADO
  ============================================================== */

  const now = new Date();

  await publicationRef.update({
    status,
    updatedAt: now,
  });

  /* ==============================================================
     DEVOLVER PUBLICACIÓN ACTUALIZADA
  ============================================================== */

  const updatedSnapshot =
    await publicationRef.get();

  const updatedData =
    updatedSnapshot.data();

  if (!updatedData) {
    return null;
  }

  return normalizePublication(
    updatedSnapshot.id,
    updatedData,
  );
}

/* ================================================================
   NORMALIZAR PUBLICACIÓN
================================================================ */

function normalizePublication(
  id: string,
  data: FirebaseFirestore.DocumentData,
): Publication {
  const base = {
    id,

    type: data.type,

    quantity: Number(
      data.quantity ?? 0,
    ),

    price: Number(
      data.price ?? 0,
    ),

    /*
     * Departamento de la publicación.
     *
     * Se utiliza para el filtrado
     * y para mostrar la ubicación
     * general en la página pública.
     */
    department: String(
      data.department ?? "",
    ),

    observations: String(
      data.observations ?? "",
    ),

    status:
      data.status as PublicationStatus,

    publishedAt:
      convertDateToString(
        data.publishedAt,
      ),

    updatedAt:
      convertDateToString(
        data.updatedAt,
      ),
  };

  /* ==============================================================
     REPRODUCTOR
  ============================================================== */

  if (
    data.type === "REPRODUCTOR"
  ) {
    return {
      ...base,

      type: "REPRODUCTOR",

      breed: String(
        data.breed ?? "",
      ),

      ...(data.line
        ? {
            line: String(
              data.line,
            ),
          }
        : {}),

      ...(data.predominantColor
        ? {
            predominantColor:
              String(
                data.predominantColor,
              ),
          }
        : {}),

      sex: data.sex,
    } as Publication;
  }

  /* ==============================================================
     CONSUMO
  ============================================================== */

  return {
    ...base,

    type: "CONSUMO",

    weight: Number(
      data.weight ?? 0,
    ),
  } as Publication;
}

/* ================================================================
   CONVERTIR FECHAS
================================================================ */

function convertDateToString(
  value: unknown,
): string | undefined {
  if (!value) {
    return undefined;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return value
      .toDate()
      .toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "string") {
    return value;
  }

  return undefined;
}