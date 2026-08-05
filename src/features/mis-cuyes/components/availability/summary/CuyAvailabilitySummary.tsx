"use client";

import type { UseCuyReturn } from "../../../types/cuy.hook.types";
import { CuyCategoryType } from "../../../types/cuy.types";

import SummaryReproductiveCarousel from "./SummaryReproductiveCarousel";
import SummaryConsumptionCarousel from "./SummaryConsumptionCarousel";

interface CuyAvailabilitySummaryProps {
  catalog: UseCuyReturn;
}

export default function CuyAvailabilitySummary({
  catalog,
}: CuyAvailabilitySummaryProps) {
  const { filters } = catalog;

  const isConsumption =
    filters.selectedCategory === CuyCategoryType.CONSUMO;

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