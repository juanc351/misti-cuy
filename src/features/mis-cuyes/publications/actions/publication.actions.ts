"use server";

import {
  createPublicationData,
  deletePublicationData,
  getPublicationData,
  getPublicationsData,
  updatePublicationData,
  updatePublicationQuantityData,
  updatePublicationStatusData,
} from "../services/publication.service";

import type {
  CreatePublicationInput,
  Publication,
  PublicationStatus,
} from "../types/publication.types";

/* ================================================================
   CREAR PUBLICACIÓN
================================================================ */

export async function createPublicationAction(
  data: CreatePublicationInput,
): Promise<Publication> {
  return createPublicationData(data);
}

/* ================================================================
   OBTENER TODAS LAS PUBLICACIONES
================================================================ */

export async function getPublicationsAction(): Promise<
  Publication[]
> {
  return getPublicationsData();
}

/* ================================================================
   OBTENER UNA PUBLICACIÓN
================================================================ */

export async function getPublicationAction(
  id: string,
): Promise<Publication | null> {
  return getPublicationData(id);
}

/* ================================================================
   ELIMINAR PUBLICACIÓN
================================================================ */

export async function deletePublicationAction(
  id: string,
): Promise<boolean> {
  return deletePublicationData(id);
}

/* ================================================================
   ACTUALIZAR CANTIDAD Y PRECIO
================================================================ */

export async function updatePublicationAction(
  id: string,
  quantity: number,
  price: number,
): Promise<Publication | null> {
  return updatePublicationData(
    id,
    quantity,
    price,
  );
}

/* ================================================================
   ACTUALIZAR SOLAMENTE CANTIDAD
================================================================ */

export async function updatePublicationQuantityAction(
  id: string,
  quantity: number,
): Promise<Publication | null> {
  return updatePublicationQuantityData(
    id,
    quantity,
  );
}

/* ================================================================
   CAMBIAR ESTADO
================================================================ */

export async function updatePublicationStatusAction(
  id: string,
  status: PublicationStatus,
): Promise<Publication | null> {
  return updatePublicationStatusData(
    id,
    status,
  );
}