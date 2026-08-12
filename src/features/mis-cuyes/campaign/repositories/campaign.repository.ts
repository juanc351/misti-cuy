import { db } from "@/lib/firebase-admin";

import type {
  Campaign,
  CreateCampaignInput,
} from "../types/campaign.types";

/* ================================================================
   CONFIGURACIÓN
================================================================ */

const COLLECTION = "cuy_campaigns";

/* ================================================================
   OBTENER CAMPAÑA ACTIVA
================================================================ */

/**
 * Obtiene la campaña que debe mostrarse
 * actualmente en la página pública.
 *
 * Reglas:
 *
 * - active debe ser true.
 * - startDate, si existe, debe haber comenzado.
 * - endDate, si existe, no debe haber terminado.
 * - Se utiliza priority para elegir la principal.
 */

export async function getActiveCampaign(): Promise<Campaign | null> {
  const snapshot = await db
    .collection(COLLECTION)
    .where("active", "==", true)
    .orderBy("priority", "asc")
    .limit(20)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const now = new Date();

  for (const document of snapshot.docs) {
    const campaign = normalizeCampaign(
      document.id,
      document.data(),
    );

    if (!isCampaignActive(campaign, now)) {
      continue;
    }

    return campaign;
  }

  return null;
}

/* ================================================================
   OBTENER TODAS LAS CAMPAÑAS
================================================================ */

export async function getCampaigns(): Promise<Campaign[]> {
  const snapshot = await db
    .collection(COLLECTION)
    .orderBy("priority", "asc")
    .get();

  return snapshot.docs.map((document) =>
    normalizeCampaign(
      document.id,
      document.data(),
    ),
  );
}

/* ================================================================
   OBTENER UNA CAMPAÑA
================================================================ */

export async function getCampaign(
  id: string,
): Promise<Campaign | null> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la campaña es obligatorio.",
    );
  }

  const snapshot = await db
    .collection(COLLECTION)
    .doc(id)
    .get();

  if (!snapshot.exists) {
    return null;
  }

  const data = snapshot.data();

  if (!data) {
    return null;
  }

  return normalizeCampaign(
    snapshot.id,
    data,
  );
}

/* ================================================================
   CREAR CAMPAÑA
================================================================ */

export async function createCampaign(
  data: CreateCampaignInput,
): Promise<Campaign> {
  const now = new Date();

  const campaignRef = db
    .collection(COLLECTION)
    .doc();

  const campaignData = {
    ...data,

    active: data.active ?? false,

    priority:
      Number.isInteger(data.priority) &&
      data.priority >= 0
        ? data.priority
        : 0,

    createdAt: now,

    updatedAt: now,
  };

  await campaignRef.set(campaignData);

  return normalizeCampaign(
    campaignRef.id,
    campaignData,
  );
}

/* ================================================================
   ACTUALIZAR CAMPAÑA
================================================================ */

export async function updateCampaign(
  id: string,
  data: CreateCampaignInput,
): Promise<Campaign | null> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la campaña es obligatorio.",
    );
  }

  const campaignRef = db
    .collection(COLLECTION)
    .doc(id);

  const snapshot = await campaignRef.get();

  if (!snapshot.exists) {
    return null;
  }

  const now = new Date();

  const campaignData = {
    ...data,

    active: data.active ?? false,

    priority:
      Number.isInteger(data.priority) &&
      data.priority >= 0
        ? data.priority
        : 0,

    updatedAt: now,
  };

  await campaignRef.update(campaignData);

  const updatedSnapshot =
    await campaignRef.get();

  const updatedData =
    updatedSnapshot.data();

  if (!updatedData) {
    return null;
  }

  return normalizeCampaign(
    updatedSnapshot.id,
    updatedData,
  );
}

/* ================================================================
   ACTIVAR / DESACTIVAR
================================================================ */

export async function updateCampaignStatus(
  id: string,
  active: boolean,
): Promise<Campaign | null> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la campaña es obligatorio.",
    );
  }

  const campaignRef = db
    .collection(COLLECTION)
    .doc(id);

  const snapshot = await campaignRef.get();

  if (!snapshot.exists) {
    return null;
  }

  const now = new Date();

  await campaignRef.update({
    active,
    updatedAt: now,
  });

  const updatedSnapshot =
    await campaignRef.get();

  const updatedData =
    updatedSnapshot.data();

  if (!updatedData) {
    return null;
  }

  return normalizeCampaign(
    updatedSnapshot.id,
    updatedData,
  );
}

/* ================================================================
   ELIMINAR CAMPAÑA
================================================================ */

export async function deleteCampaign(
  id: string,
): Promise<boolean> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la campaña es obligatorio.",
    );
  }

  const campaignRef = db
    .collection(COLLECTION)
    .doc(id);

  const snapshot = await campaignRef.get();

  if (!snapshot.exists) {
    return false;
  }

  await campaignRef.delete();

  return true;
}

/* ================================================================
   COMPROBAR SI ESTÁ ACTIVA
================================================================ */

function isCampaignActive(
  campaign: Campaign,
  now: Date,
): boolean {
  if (!campaign.active) {
    return false;
  }

  if (campaign.startDate) {
    const startDate = new Date(
      campaign.startDate,
    );

    if (
      !Number.isNaN(startDate.getTime()) &&
      now < startDate
    ) {
      return false;
    }
  }

  if (campaign.endDate) {
    const endDate = new Date(
      campaign.endDate,
    );

    if (
      !Number.isNaN(endDate.getTime()) &&
      now > endDate
    ) {
      return false;
    }
  }

  return true;
}

/* ================================================================
   NORMALIZAR CAMPAÑA
================================================================ */

function normalizeCampaign(
  id: string,
  data: FirebaseFirestore.DocumentData,
): Campaign {
  return {
    id,

    type: data.type,

    title: String(
      data.title ?? "",
    ),

    ...(data.subtitle
      ? {
          subtitle: String(
            data.subtitle,
          ),
        }
      : {}),

    ...(data.description
      ? {
          description: String(
            data.description,
          ),
        }
      : {}),

    ...(data.imageUrl
      ? {
          imageUrl: String(
            data.imageUrl,
          ),
        }
      : {}),

    ...(data.imageAlt
      ? {
          imageAlt: String(
            data.imageAlt,
          ),
        }
      : {}),

    ...(data.buttonText
      ? {
          buttonText: String(
            data.buttonText,
          ),
        }
      : {}),

    buttonAction:
      data.buttonAction ?? "NONE",

    ...(data.buttonUrl
      ? {
          buttonUrl: String(
            data.buttonUrl,
          ),
        }
      : {}),

    productId:
      data.productId ?? null,

    active:
      Boolean(data.active),

    ...(data.startDate
      ? {
          startDate:
            convertDateToString(
              data.startDate,
            ),
        }
      : {}),

    ...(data.endDate
      ? {
          endDate:
            convertDateToString(
              data.endDate,
            ),
        }
      : {}),

    priority:
      Number(data.priority ?? 0),

    createdAt:
      convertDateToString(
        data.createdAt,
      ),

    updatedAt:
      convertDateToString(
        data.updatedAt,
      ),
  };
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