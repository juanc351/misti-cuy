import type { UseCuyReturn } from "../../types/cuy.hook.types";
import { CuyCategoryType } from "../../types/cuy.types";

import ReproductiveTable from "./tables/ReproductiveTable";
import ConsumptionTable from "./tables/ConsumptionTable";

interface CuyAvailabilityTableProps {
  catalog: UseCuyReturn;
}

export default function CuyAvailabilityTable({
  catalog,
}: CuyAvailabilityTableProps) {
  const { filters } = catalog;

  return filters.selectedCategory === CuyCategoryType.CONSUMO ? (
    <ConsumptionTable catalog={catalog} />
  ) : (
    <ReproductiveTable catalog={catalog} />
  );
}