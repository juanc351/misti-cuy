"use client";

import type { UseCatalogReturn } from "../../../types/catalog.hook.types";
import { CatalogCategoryType } from "../../../types/catalog.types";

import SummaryReproductiveCarousel from "./SummaryReproductiveCarousel";
import SummaryConsumptionCarousel from "./SummaryConsumptionCarousel";

interface CatalogAvailabilitySummaryProps {
  catalog: UseCatalogReturn;
}

export default function CatalogAvailabilitySummary({
  catalog,
}: CatalogAvailabilitySummaryProps) {
  const { filters } = catalog;

  const isConsumption =
    filters.selectedCategory === CatalogCategoryType.CONSUMO;

  return (
    <section>
      {isConsumption ? (
        <SummaryConsumptionCarousel catalog={catalog} />
      ) : (
        <SummaryReproductiveCarousel catalog={catalog} />
      )}
    </section>
  );
}