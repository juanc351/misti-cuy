import type { UseCatalogReturn } from "../../types/catalog.hook.types";
import { CatalogCategoryType } from "../../types/catalog.types";

interface CatalogAvailabilityCardsProps {
  catalog: UseCatalogReturn;
}

export default function CatalogAvailabilityCards({
  catalog,
}: CatalogAvailabilityCardsProps) {
  const { filters } = catalog;

  if (filters.selectedCategory === CatalogCategoryType.CONSUMO) {
    return (
      <section className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Disponibilidad para Consumo
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Las tarjetas de consumo se implementarán en el siguiente bloque.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">
          Disponibilidad de Reproductores
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Las tarjetas de reproductores se implementarán en el siguiente bloque.
        </p>
      </div>
    </section>
  );
}