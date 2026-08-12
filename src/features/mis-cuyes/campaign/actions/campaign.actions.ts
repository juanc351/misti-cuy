"use server";

import {
  createCampaignData,
  deleteCampaignData,
  getActiveCampaignData,
  getCampaignData,
  getCampaignsData,
  updateCampaignData,
  updateCampaignStatusData,
} from "../services/campaign.service";

import type {
  Campaign,
  CreateCampaignInput,
} from "../types/campaign.types";

/* ================================================================
   OBTENER CAMPAÑA ACTIVA
================================================================ */

export async function getActiveCampaignAction(): Promise<
  Campaign | null
> {
  return getActiveCampaignData();
}

/* ================================================================
   OBTENER TODAS LAS CAMPAÑAS
================================================================ */

export async function getCampaignsAction(): Promise<
  Campaign[]
> {
  return getCampaignsData();
}

/* ================================================================
   OBTENER UNA CAMPAÑA
================================================================ */

export async function getCampaignAction(
  id: string,
): Promise<Campaign | null> {
  return getCampaignData(id);
}

/* ================================================================
   CREAR CAMPAÑA
================================================================ */

export async function createCampaignAction(
  data: CreateCampaignInput,
): Promise<Campaign> {
  return createCampaignData(data);
}

/* ================================================================
   ACTUALIZAR CAMPAÑA
================================================================ */

export async function updateCampaignAction(
  id: string,
  data: CreateCampaignInput,
): Promise<Campaign | null> {
  return updateCampaignData(
    id,
    data,
  );
}

/* ================================================================
   ACTIVAR / DESACTIVAR
================================================================ */

export async function updateCampaignStatusAction(
  id: string,
  active: boolean,
): Promise<Campaign | null> {
  return updateCampaignStatusData(
    id,
    active,
  );
}

/* ================================================================
   ELIMINAR CAMPAÑA
================================================================ */

export async function deleteCampaignAction(
  id: string,
): Promise<boolean> {
  return deleteCampaignData(id);
}