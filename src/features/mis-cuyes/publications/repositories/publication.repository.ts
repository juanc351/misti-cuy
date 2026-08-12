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
   ELIMINAR PUBLICACIÓN
================================================================ */

export async function deletePublication(
  id: string,
): Promise<boolean> {
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
    return false;
  }

  await publicationRef.delete();

  return true;
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

  if (currentStatus !== "DISPONIBLE") {
    throw new Error(
      "Esta publicación no está disponible y no puede ser editada.",
    );
  }

  const currentQuantity =
    Number(
      currentData.quantity ?? 0,
    );

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

  if (quantity > currentQuantity) {
    throw new Error(
      `La cantidad no puede aumentar. Actualmente hay ${currentQuantity} unidades disponibles.`,
    );
  }

  if (
    !Number.isFinite(price) ||
    price <= 0
  ) {
    throw new Error(
      "El precio debe ser mayor que cero.",
    );
  }

  const newStatus: PublicationStatus =
    quantity === 0
      ? "NO_DISPONIBLE"
      : "DISPONIBLE";

  const now = new Date();

  await publicationRef.update({
    quantity,
    price,
    status: newStatus,
    updatedAt: now,
  });

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

  if (currentStatus !== "DISPONIBLE") {
    throw new Error(
      "Esta publicación no está disponible y no puede ser editada.",
    );
  }

  const currentQuantity =
    Number(
      currentData.quantity ?? 0,
    );

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

  if (quantity > currentQuantity) {
    throw new Error(
      `La cantidad no puede aumentar. Actualmente hay ${currentQuantity} unidades disponibles.`,
    );
  }

  const newStatus: PublicationStatus =
    quantity === 0
      ? "NO_DISPONIBLE"
      : "DISPONIBLE";

  const now = new Date();

  await publicationRef.update({
    quantity,
    status: newStatus,
    updatedAt: now,
  });

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

  if (
    status === "DISPONIBLE" &&
    currentQuantity <= 0
  ) {
    throw new Error(
      "No se puede marcar como disponible una publicación sin unidades.",
    );
  }

  const now = new Date();

  await publicationRef.update({
    status,
    updatedAt: now,
  });

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