"use client";

import type { UseCatalogReturn } from "../../types/catalog.hook.types";
import { CatalogCategoryType } from "../../types/catalog.types";

interface CatalogVarietyInfoProps {
  catalog: UseCatalogReturn;
}

export default function CatalogVarietyInfo({
  catalog,
}: CatalogVarietyInfoProps) {
  const {
    data: { variants, inventory, cities },
    filters,
  } = catalog;

  const isConsumption =
    filters.selectedCategory === CatalogCategoryType.CONSUMO;

  const variant =
    variants.find(
      (item) => item.id === filters.selectedVariant
    ) ?? variants[0];

  const consumptionItem = inventory.find(
    (item) =>
      item.category === CatalogCategoryType.CONSUMO &&
      item.cityId === filters.selectedCity &&
      item.presentation === filters.selectedPresentation
  );

  const city = cities.find(
    (item) => item.id === filters.selectedCity
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-900">
          {isConsumption
            ? "Información de la Presentación"
            : "Información de la Línea"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          La información se actualiza automáticamente según la selección realizada.
        </p>
      </div>

      <div className="grid gap-5 p-6 md:grid-cols-2">
        {isConsumption ? (
          <>
            <InfoItem
              title="Presentación"
              value={
                consumptionItem?.presentation ?? "-"
              }
            />

            <InfoItem
              title="Peso Promedio"
              value={`${
                consumptionItem?.averageWeight ?? "-"
              } g`}
            />

            <InfoItem
              title="Disponibles"
              value={`${
                consumptionItem?.quantity ?? 0
              } ejemplares`}
            />

            <InfoItem
              title="Ciudad"
              value={city?.name ?? "-"}
            />

            <InfoItem
              title="Distrito"
              value={city?.district ?? "-"}
            />

            <InfoItem
              title="Estado"
              value={
                consumptionItem?.status ?? "-"
              }
            />

            <InfoItem
              title="Recomendado para"
              value="Restaurantes y consumo familiar"
            />

            <InfoItem
              title="Observaciones"
              value="Peso promedio referencial. Puede variar ligeramente."
            />
          </>
        ) : (
          <>
            <InfoItem
              title="Variedad"
              value={variant?.name ?? "-"}
            />

            <InfoItem
              title="Categoría"
              value="Reproductores"
            />

            <InfoItem
              title="Tipo"
              value={variant?.type ?? "-"}
            />

            <InfoItem
              title="Origen"
              value="Programa Nacional de Cuyes"
            />

            <InfoItem
              title="Objetivo"
              value="Producción tecnificada"
            />

            <InfoItem
              title="Color predominante"
              value="Variable"
            />

            <InfoItem
              title="Peso adulto"
              value="900 g - 1.2 kg"
            />

            <InfoItem
              title="Rusticidad"
              value="Alta"
            />

            <InfoItem
              title="Observaciones"
              value={
                variant?.description ??
                "Información referencial de la línea genética."
              }
            />
          </>
        )}
      </div>
    </section>
  );
}

interface InfoItemProps {
  title: string;
  value: string;
}

function InfoItem({
  title,
  value,
}: InfoItemProps) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-base font-medium text-slate-900">
        {value}
      </p>
    </div>
  );
}