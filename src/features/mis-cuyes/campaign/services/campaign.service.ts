import {
  createCampaign,
  deleteCampaign,
  getActiveCampaign,
  getCampaign,
  getCampaigns,
  updateCampaign,
  updateCampaignStatus,
} from "../repositories/campaign.repository";

import type {
  Campaign,
  CampaignButtonAction,
  CampaignType,
  CreateCampaignInput,
} from "../types/campaign.types";

/* ================================================================
   OBTENER CAMPAÑA ACTIVA
================================================================ */

export async function getActiveCampaignData(): Promise<Campaign | null> {
  return getActiveCampaign();
}

/* ================================================================
   OBTENER TODAS
================================================================ */

export async function getCampaignsData(): Promise<Campaign[]> {
  return getCampaigns();
}

/* ================================================================
   OBTENER UNA
================================================================ */

export async function getCampaignData(
  id: string,
): Promise<Campaign | null> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la campaña es obligatorio.",
    );
  }

  return getCampaign(id);
}

/* ================================================================
   CREAR
================================================================ */

export async function createCampaignData(
  data: CreateCampaignInput,
): Promise<Campaign> {
  validateCampaign(data);

  const cleanData =
    cleanCampaignData(data);

  return createCampaign(cleanData);
}

/* ================================================================
   ACTUALIZAR
================================================================ */

export async function updateCampaignData(
  id: string,
  data: CreateCampaignInput,
): Promise<Campaign | null> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la campaña es obligatorio.",
    );
  }

  validateCampaign(data);

  const cleanData =
    cleanCampaignData(data);

  return updateCampaign(
    id,
    cleanData,
  );
}

/* ================================================================
   ACTIVAR / DESACTIVAR
================================================================ */

export async function updateCampaignStatusData(
  id: string,
  active: boolean,
): Promise<Campaign | null> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la campaña es obligatorio.",
    );
  }

  if (typeof active !== "boolean") {
    throw new Error(
      "El estado de la campaña no es válido.",
    );
  }

  return updateCampaignStatus(
    id,
    active,
  );
}

/* ================================================================
   ELIMINAR
================================================================ */

export async function deleteCampaignData(
  id: string,
): Promise<boolean> {
  if (!id.trim()) {
    throw new Error(
      "El ID de la campaña es obligatorio.",
    );
  }

  return deleteCampaign(id);
}

/* ================================================================
   VALIDAR CAMPAÑA
================================================================ */

function validateCampaign(
  data: CreateCampaignInput,
): void {
  /* ==============================================================
     TIPO
  ============================================================== */

  const validTypes: CampaignType[] = [
    "PRODUCTO",
    "EVENTO",
    "CAMPAÑA",
    "AVISO",
  ];

  if (!validTypes.includes(data.type)) {
    throw new Error(
      "El tipo de campaña no es válido.",
    );
  }

  /* ==============================================================
     TÍTULO
  ============================================================== */

  if (!data.title?.trim()) {
    throw new Error(
      "El título de la campaña es obligatorio.",
    );
  }

  /* ==============================================================
     DESCRIPCIÓN
  ============================================================== */

  if (
    data.description !== undefined &&
    data.description.length > 1000
  ) {
    throw new Error(
      "La descripción no puede superar los 1000 caracteres.",
    );
  }

  /* ==============================================================
     BOTÓN
  ============================================================== */

  const validButtonActions: CampaignButtonAction[] = [
    "WHATSAPP",
    "LINK",
    "NONE",
  ];

  if (
    !validButtonActions.includes(
      data.buttonAction,
    )
  ) {
    throw new Error(
      "La acción del botón no es válida.",
    );
  }

  /* ==============================================================
     BOTÓN CON WHATSAPP
  ============================================================== */

  if (
    data.buttonAction === "WHATSAPP" &&
    !data.buttonUrl?.trim()
  ) {
    throw new Error(
      "La URL de WhatsApp es obligatoria para este botón.",
    );
  }

  /* ==============================================================
     BOTÓN CON LINK
  ============================================================== */

  if (
    data.buttonAction === "LINK" &&
    !data.buttonUrl?.trim()
  ) {
    throw new Error(
      "La URL del botón es obligatoria.",
    );
  }

  /* ==============================================================
     SIN BOTÓN
  ============================================================== */

  if (
    data.buttonAction === "NONE"
  ) {
    return;
  }

  /* ==============================================================
     URL
  ============================================================== */

  if (data.buttonUrl) {
    validateUrl(
      data.buttonUrl,
    );
  }

  /* ==============================================================
     PRIORIDAD
  ============================================================== */

  if (
    !Number.isInteger(data.priority) ||
    data.priority < 0
  ) {
    throw new Error(
      "La prioridad debe ser un número entero igual o mayor que cero.",
    );
  }

  /* ==============================================================
     FECHAS
  ============================================================== */

  validateDates(
    data.startDate,
    data.endDate,
  );

  /* ==============================================================
     PRODUCTO
  ============================================================== */

  if (
    data.type === "PRODUCTO" &&
    !data.productId?.trim()
  ) {
    throw new Error(
      "Una campaña de producto debe tener un producto asociado.",
    );
  }
}

/* ================================================================
   LIMPIAR DATOS
================================================================ */

function cleanCampaignData(
  data: CreateCampaignInput,
): CreateCampaignInput {
  return {
    type: data.type,

    title: data.title.trim(),

    ...(data.subtitle?.trim()
      ? {
          subtitle:
            data.subtitle.trim(),
        }
      : {}),

    ...(data.description?.trim()
      ? {
          description:
            data.description.trim(),
        }
      : {}),

    ...(data.imageUrl?.trim()
      ? {
          imageUrl:
            data.imageUrl.trim(),
        }
      : {}),

    ...(data.imageAlt?.trim()
      ? {
          imageAlt:
            data.imageAlt.trim(),
        }
      : {}),

    ...(data.buttonText?.trim()
      ? {
          buttonText:
            data.buttonText.trim(),
        }
      : {}),

    buttonAction:
      data.buttonAction,

    ...(data.buttonUrl?.trim()
      ? {
          buttonUrl:
            data.buttonUrl.trim(),
        }
      : {}),

    productId:
      data.productId?.trim() || null,

    active:
      Boolean(data.active),

    startDate:
      data.startDate || undefined,

    endDate:
      data.endDate || undefined,

    priority:
      data.priority,
  };
}

/* ================================================================
   VALIDAR FECHAS
================================================================ */

function validateDates(
  startDate?: string,
  endDate?: string,
): void {
  let start: Date | undefined;
  let end: Date | undefined;

  if (startDate) {
    start = new Date(startDate);

    if (Number.isNaN(start.getTime())) {
      throw new Error(
        "La fecha de inicio no es válida.",
      );
    }
  }

  if (endDate) {
    end = new Date(endDate);

    if (Number.isNaN(end.getTime())) {
      throw new Error(
        "La fecha de finalización no es válida.",
      );
    }
  }

  if (
    start &&
    end &&
    end < start
  ) {
    throw new Error(
      "La fecha de finalización no puede ser anterior a la fecha de inicio.",
    );
  }
}

/* ================================================================
   VALIDAR URL
================================================================ */

function validateUrl(
  value: string,
): void {
  try {
    const url = new URL(value);

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      throw new Error();
    }
  } catch {
    throw new Error(
      "La URL de la campaña no es válida.",
    );
  }
}