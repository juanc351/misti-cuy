import { useEffect, useState } from "react";

import { catalogService } from "../services/catalog.service";

import type {
  CatalogCategory,
  CatalogCity,
  CatalogProduct,
  CatalogVariant,
} from "../types/catalog.types";

import type { CatalogInventoryItem } from "../data/catalog.inventory.mock";

import { CatalogCategoryType } from "../types/catalog.types";

import type { UseCatalogReturn } from "../types/catalog.hook.types";

export function useCatalog(): UseCatalogReturn {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [variants, setVariants] = useState<CatalogVariant[]>([]);
  const [cities, setCities] = useState<CatalogCity[]>([]);
  const [inventory, setInventory] = useState<CatalogInventoryItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  const [selectedCategory, setCategory] = useState<string | null>(
    CatalogCategoryType.REPRODUCTOR
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
    setProducts(catalogService.getCatalogProducts());
    setCategories(catalogService.getCatalogCategories());
    setVariants(catalogService.getCatalogVariants());
    setCities(catalogService.getCatalogCities());
    setInventory(catalogService.getCatalogInventory());

    setLoading(false);
  }, []);

  const clearFilters = () => {
    setCategory(CatalogCategoryType.REPRODUCTOR);

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