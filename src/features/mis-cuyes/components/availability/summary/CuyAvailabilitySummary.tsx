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
    <section
      className="
        w-full
        rounded-2xl
        border
        border-[#292929]
        bg-[#11110F]
        px-4
        py-4
        text-[#F5F5F5]
      "
    >
      {isConsumption ? (
        <SummaryConsumptionCarousel catalog={catalog} />
      ) : (
        <SummaryReproductiveCarousel catalog={catalog} />
      )}
    </section>
  );
}