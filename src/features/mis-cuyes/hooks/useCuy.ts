"use client";

import { useState } from "react";

import { cuyService } from "../services/cuy.service";

import type {
  CuyCategory,
  CuyCity,
  CuyProduct,
  CuyVariant,
} from "../types/cuy.types";

import { CuyCategoryType as CategoryType } from "../types/cuy.types";

import type { CuyInventoryItem } from "../data/cuy.inventory";

import type { UseCuyReturn } from "../types/cuy.hook.types";

export function useCuy(): UseCuyReturn {
  /* =====================================
     DATOS
     
     El servicio ya devuelve los datos
     sincrónicamente, por lo que no
     necesitamos copiarlos a estados.
  ====================================== */

  const products: CuyProduct[] =
    cuyService.getCuyProducts();

  const categories: CuyCategory[] =
    cuyService.getCuyCategories();

  const variants: CuyVariant[] =
    cuyService.getCuyVariants();

  const cities: CuyCity[] =
    cuyService.getCuyCities();

  const inventory: CuyInventoryItem[] =
    cuyService.getCuyInventory();

  /* =====================================
     ESTADO DE CARGA

     Los datos son locales y sincrónicos.
     No existe una carga asíncrona.
  ====================================== */

  const loading = false;

  const error: string | null = null;

  /* =====================================
     FILTROS
  ====================================== */

  const [selectedCategory, setCategory] =
    useState<string | null>(
      CategoryType.REPRODUCTOR
    );

  const [selectedCity, setCity] =
    useState<string | null>(
      "city-arequipa"
    );

  /*
   * Solo reproductores.
   */
  const [selectedVariant, setVariant] =
    useState<string | null>(null);

  /*
   * Solo consumo.
   */
  const [selectedPresentation, setPresentation] =
    useState<string | null>(null);

  const [search, setSearch] = useState("");

  /* =====================================
     LIMPIAR FILTROS
  ====================================== */

  const clearFilters = () => {
    setCategory(
      CategoryType.REPRODUCTOR
    );

    setCity("city-arequipa");

    setVariant(null);

    setPresentation(null);

    setSearch("");
  };

  /* =====================================
     RETURN
  ====================================== */

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