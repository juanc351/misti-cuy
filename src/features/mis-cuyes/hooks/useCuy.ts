import { useEffect, useState } from "react";

import { cuyService } from "../services/cuy.service";

import type {
  CuyCategory,
  CuyCity,
  CuyProduct,
  CuyVariant,
  CuyCategoryType,
} from "../types/cuy.types";

import type { CuyInventoryItem } from "../data/cuy.inventory";

import { CuyCategoryType as CategoryType } from "../types/cuy.types";

import type { UseCuyReturn } from "../types/cuy.hook.types";

export function useCuy(): UseCuyReturn {
  const [products, setProducts] = useState<CuyProduct[]>([]);
  const [categories, setCategories] = useState<CuyCategory[]>([]);
  const [variants, setVariants] = useState<CuyVariant[]>([]);
  const [cities, setCities] = useState<CuyCity[]>([]);
  const [inventory, setInventory] = useState<CuyInventoryItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  const [selectedCategory, setCategory] = useState<string | null>(
    CategoryType.REPRODUCTOR
  );

  const [selectedCity, setCity] = useState<string | null>(
    "city-arequipa"
  );

  /**
   * Solo reproductores.
   */
  const [selectedVariant, setVariant] = useState<string | null>(
    null
  );

  /**
   * Solo consumo.
   */
  const [selectedPresentation, setPresentation] =
    useState<string | null>(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    setProducts(cuyService.getCuyProducts());
    setCategories(cuyService.getCuyCategories());
    setVariants(cuyService.getCuyVariants());
    setCities(cuyService.getCuyCities());
    setInventory(cuyService.getCuyInventory());

    setLoading(false);
  }, []);

  const clearFilters = () => {
    setCategory(CategoryType.REPRODUCTOR);

    setCity("city-arequipa");

    setVariant(null);

    setPresentation(null);

    setSearch("");
  };

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