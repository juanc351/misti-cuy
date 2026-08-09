"use client";

import { useState } from "react";

import { CuyCategoryType as CategoryType } from "../types/cuy.types";

import type { UseCuyReturn } from "../types/cuy.hook.types";
import type { CuyServerData } from "../services/cuy.server";

interface UseCuyOptions {
  initialData: CuyServerData;
}

export function useCuy({
  initialData,
}: UseCuyOptions): UseCuyReturn {
  /* ======================================================
     DATOS
     ======================================================

     Los datos llegan desde el Server Component.

     Flujo actual:

     Mock
       ↓
     cuy.server.ts
       ↓
     Vercel Cache
       ↓
     MisCuyesClient
       ↓
     useCuy

     Futuro:

     Firebase
       ↓
     cuy.server.ts
       ↓
     Vercel Cache
       ↓
     MisCuyesClient
       ↓
     useCuy
     ====================================================== */

  const {
    products,
    categories,
    variants,
    cities,
    inventory,
  } = initialData;

  /* ======================================================
     ESTADO DE CARGA
     ====================================================== */

  const loading = false;

  const error: string | null = null;

  /* ======================================================
     FILTROS
     ====================================================== */

  const [selectedCategory, setCategory] =
    useState<string | null>(
      CategoryType.REPRODUCTOR
    );

  const [selectedCity, setCity] =
    useState<string | null>(
      "city-arequipa"
    );

  /**
   * Solo reproductores.
   */
  const [selectedVariant, setVariant] =
    useState<string | null>(null);

  /**
   * Solo consumo.
   */
  const [selectedPresentation, setPresentation] =
    useState<string | null>(null);

  const [search, setSearch] = useState("");

  /* ======================================================
     LIMPIAR FILTROS
     ====================================================== */

  const clearFilters = () => {
    setCategory(
      CategoryType.REPRODUCTOR
    );

    setCity("city-arequipa");

    setVariant(null);

    setPresentation(null);

    setSearch("");
  };

  /* ======================================================
     RETURN
     ====================================================== */

  return {
    data: {
      products,
      categories,
      variants,
      cities,
      inventory,
    },

    loading,

    error,

    filters: {
      selectedCategory,
      selectedCity,
      selectedVariant,
      selectedPresentation,
      search,
    },

    actions: {
      setCategory,
      setCity,
      setVariant,
      setPresentation,
      setSearch,
      clearFilters,
    },
  };
}