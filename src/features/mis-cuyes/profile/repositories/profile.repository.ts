import { db } from "@/lib/firebase-admin";

import type {
  AdminProfile,
  AdminProfileInput,
} from "../types/profile.types";

/* ================================================================
   CONFIGURACIÓN
   ================================================================ */

const COLLECTION = "admin_profiles";

const DOCUMENT_ID = "main";

/* ================================================================
   REFERENCIA
   ================================================================ */

const profileRef = db
  .collection(COLLECTION)
  .doc(DOCUMENT_ID);

/* ================================================================
   OBTENER PERFIL
   ================================================================ */

export async function getAdminProfile(): Promise<AdminProfile | null> {
  const snapshot = await profileRef.get();

  if (!snapshot.exists) {
    return null;
  }

  const data = snapshot.data();

  if (!data) {
    return null;
  }

  return {
    id: snapshot.id,

    name: String(data.name ?? ""),

    farmName: String(data.farmName ?? ""),

    phone: String(data.phone ?? ""),

    department: String(data.department ?? ""),

    location: String(data.location ?? ""),

    description: String(data.description ?? ""),

    createdAt: convertDateToString(data.createdAt),

    updatedAt: convertDateToString(data.updatedAt),
  };
}

/* ================================================================
   GUARDAR PERFIL
   ================================================================ */

export async function saveAdminProfile(
  data: AdminProfileInput,
): Promise<AdminProfile> {
  const now = new Date();

  const snapshot = await profileRef.get();

  const profileData = {
    name: data.name,

    farmName: data.farmName,

    phone: data.phone,

    department: data.department,

    location: data.location,

    description: data.description,

    updatedAt: now,

    ...(snapshot.exists
      ? {}
      : {
          createdAt: now,
        }),
  };

  await profileRef.set(profileData, {
    merge: true,
  });

  return {
    id: DOCUMENT_ID,

    name: data.name,

    farmName: data.farmName,

    phone: data.phone,

    department: data.department,

    location: data.location,

    description: data.description,

    createdAt: snapshot.exists
      ? convertDateToString(
          snapshot.data()?.createdAt,
        )
      : now.toISOString(),

    updatedAt: now.toISOString(),
  };
}

/* ================================================================
   CONVERTIR FECHAS DE FIREBASE
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
    return value.toDate().toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "string") {
    return value;
  }

  return undefined;
}