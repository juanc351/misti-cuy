import type { UseCatalogReturn } from "../../types/catalog.hook.types";
import { CatalogCategoryType } from "../../types/catalog.types";

import ReproductiveTable from "./tables/ReproductiveTable";
import ConsumptionTable from "./tables/ConsumptionTable";

interface CatalogAvailabilityTableProps {
  catalog: UseCatalogReturn;
}

export default function CatalogAvailabilityTable({
  catalog,
}: CatalogAvailabilityTableProps) {
  const { filters } = catalog;

  return filters.selectedCategory === CatalogCategoryType.CONSUMO ? (
    <ConsumptionTable catalog={catalog} />
  ) : (
    <ReproductiveTable catalog={catalog} />
  );
}