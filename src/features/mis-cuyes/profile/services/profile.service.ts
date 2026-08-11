import {
  getAdminProfile,
  saveAdminProfile,
} from "../repositories/profile.repository";

import type {
  AdminProfile,
  AdminProfileInput,
} from "../types/profile.types";

/* ================================================================
   OBTENER PERFIL ADMINISTRADOR
   ================================================================ */

export async function getAdminProfileData(): Promise<AdminProfile | null> {
  return getAdminProfile();
}

/* ================================================================
   GUARDAR PERFIL ADMINISTRADOR
   ================================================================ */

export async function saveAdminProfileData(
  data: AdminProfileInput,
): Promise<AdminProfile> {
  const cleanData: AdminProfileInput = {
    name: data.name.trim(),

    farmName: data.farmName?.trim() ?? "",

    phone: data.phone.trim(),

    department: data.department.trim(),

    location: data.location.trim(),

    description: data.description?.trim() ?? "",
  };

  /* ==============================================================
     VALIDACIONES
     ============================================================== */

  if (!cleanData.name) {
    throw new Error(
      "El nombre es obligatorio.",
    );
  }

  if (!cleanData.phone) {
    throw new Error(
      "El teléfono es obligatorio.",
    );
  }

  if (!cleanData.department) {
    throw new Error(
      "El departamento es obligatorio.",
    );
  }

  if (!cleanData.location) {
    throw new Error(
      "El lugar es obligatorio.",
    );
  }

  return saveAdminProfile(cleanData);
}