/* ================================================================
   TIPOS DE CARTILLA / CAMPAÑA
================================================================ */

export type CampaignType =
  | "PRODUCTO"
  | "EVENTO"
  | "CAMPAÑA"
  | "AVISO";

/* ================================================================
   ACCIÓN DEL BOTÓN
================================================================ */

export type CampaignButtonAction =
  | "WHATSAPP"
  | "LINK"
  | "NONE";

/* ================================================================
   CAMPAÑA
================================================================ */

export interface Campaign {
  id: string;

  type: CampaignType;

  title: string;

  subtitle?: string;

  description?: string;

  imageUrl?: string;

  imageAlt?: string;

  buttonText?: string;

  buttonAction: CampaignButtonAction;

  buttonUrl?: string;

  /**
   * Producto relacionado.
   *
   * Se utilizará cuando type === "PRODUCTO".
   */
  productId?: string | null;

  /**
   * Determina si la campaña está
   * habilitada desde el panel.
   */
  active: boolean;

  /**
   * Fecha desde la que puede mostrarse.
   */
  startDate?: string;

  /**
   * Fecha hasta la que puede mostrarse.
   */
  endDate?: string;

  /**
   * Menor número = mayor prioridad.
   */
  priority: number;

  createdAt?: string;

  updatedAt?: string;
}

/* ================================================================
   DATOS PARA CREAR / ACTUALIZAR
================================================================ */

export type CreateCampaignInput = Omit<
  Campaign,
  "id" | "createdAt" | "updatedAt"
>;