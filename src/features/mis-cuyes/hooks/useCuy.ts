"use client";

import { useState } from "react";

import {
  CuyCategoryType as CategoryType,
} from "../types/cuy.types";

import type {
  UseCuyReturn,
} from "../types/cuy.hook.types";

import type {
  CuyServerData,
} from "../services/cuy.server";

interface UseCuyOptions {
  initialData: CuyServerData;
}

export function useCuy({
  initialData,
}: UseCuyOptions): UseCuyReturn {
  const {
    products,
    categories,
    variants,
    cities,
    inventory,
    publications,
    profile,
  } = initialData;

  const loading = false;

  const error: string | null = null;

  /* ================================================================
     FILTROS
  ================================================================= */

  const [
    selectedCategory,
    setCategory,
  ] = useState<string | null>(
    CategoryType.REPRODUCTOR,
  );

  const [
    selectedDepartment,
    setDepartment,
  ] = useState<string | null>(null);

  const [
    selectedStatus,
    setStatus,
  ] = useState<
    | "ALL"
    | "DISPONIBLE"
    | "NO_DISPONIBLE"
  >("ALL");

  const [
    selectedVariant,
    setVariant,
  ] = useState<string | null>(null);

  const [
    selectedPresentation,
    setPresentation,
  ] = useState<string | null>(null);

  const [
    search,
    setSearch,
  ] = useState("");

  /* ================================================================
     PUBLICACIÓN SELECCIONADA
  ================================================================= */

  const [
    selectedPublicationId,
    setSelectedPublicationId,
  ] = useState<string | null>(null);

  /* ================================================================
     SELECCIONAR PUBLICACIÓN
  ================================================================= */

  const selectPublication = (
    id: string,
  ) => {
    setSelectedPublicationId(id);
  };

  /* ================================================================
     LIMPIAR FILTROS
  ================================================================= */

  const clearFilters = () => {
    setCategory(
      CategoryType.REPRODUCTOR,
    );

    setDepartment(null);

    setStatus("ALL");

    setVariant(null);

    setPresentation(null);

    setSearch("");

    setSelectedPublicationId(null);
  };

  /* ================================================================
     RETURN
  ================================================================= */

  return {
    data: {
      products,
      categories,
      variants,
      cities,
      inventory,
      publications,
      profile,
    },

    loading,

    error,

    filters: {
      selectedCategory,
      selectedDepartment,
      selectedStatus,
      selectedVariant,
      selectedPresentation,
      search,
    },

    selection: {
      selectedPublicationId,
    },

    actions: {
      setCategory,
      setDepartment,
      setStatus,
      setVariant,
      setPresentation,
      setSearch,
      selectPublication,
      clearFilters,
    },
  };
}