"use client";

import type { UseCuyReturn } from "../../types/cuy.hook.types";
import { CuyCategoryType } from "../../types/cuy.types";

interface CuyVarietyInfoProps {
  catalog: UseCuyReturn;
}

export default function CuyVarietyInfo({
  catalog,
}: CuyVarietyInfoProps) {
  const {
    data: { variants, inventory, cities },
    filters,
  } = catalog;

  const isConsumption =
    filters.selectedCategory === CuyCategoryType.CONSUMO;

  // ======================================================
  // VARIANTE SELECCIONADA
  // ======================================================

  const variant =
    variants.find(
      (item) => item.id === filters.selectedVariant
    ) ?? variants[0];

  // ======================================================
  // PRESENTACIÓN DE CONSUMO SELECCIONADA
  // ======================================================

  const consumptionItem = inventory.find(
    (item) =>
      item.category === CuyCategoryType.CONSUMO &&
      item.cityId === filters.selectedCity &&
      item.presentation === filters.selectedPresentation
  );

  // ======================================================
  // CIUDAD SELECCIONADA
  // ======================================================

  const city = cities.find(
    (item) => item.id === filters.selectedCity
  );

  return (
    <section
      id="informacion-cuy"
      className="
        bg-[#0D0D0D]
        text-[#F5F5F5]
      "
    >
      {/* ======================================================
          ENCABEZADO
      ====================================================== */}

      <div className="px-4 py-5 md:px-6">
        <h2 className="text-lg font-bold text-[#F5F5F5]">
          {isConsumption
            ? "Información de la Presentación"
            : "Información de la Línea"}
        </h2>

        <p className="mt-1 text-sm text-[#B8B8B8]">
          La información se actualiza automáticamente según
          la selección realizada.
        </p>
      </div>

      {/* ======================================================
          INFORMACIÓN
      ====================================================== */}

      <div className="grid gap-3 p-4 md:grid-cols-2 md:gap-5 md:p-6">
        {isConsumption ? (
          <>
            {/* PRESENTACIÓN */}

            <InfoItem
              title="Presentación"
              value={
                consumptionItem?.presentation ?? "-"
              }
            />

            {/* PESO */}

            <InfoItem
              title="Peso Promedio"
              value={`${consumptionItem?.averageWeight ?? "-"} g`}
            />

            {/* DISPONIBLES */}

            <InfoItem
              title="Disponibles"
              value={`${consumptionItem?.quantity ?? 0} ejemplares`}
            />

            {/* CIUDAD */}

            <InfoItem
              title="Ciudad"
              value={city?.name ?? "-"}
            />

            {/* DISTRITO */}

            <InfoItem
              title="Distrito"
              value={city?.district ?? "-"}
            />

            {/* ESTADO */}

            <InfoItem
              title="Estado"
              value={consumptionItem?.status ?? "-"}
            />

            {/* RECOMENDADO PARA */}

            <InfoItem
              title="Recomendado para"
              value="Restaurantes y consumo familiar"
            />

            {/* OBSERVACIONES */}

            <InfoItem
              title="Observaciones"
              value="Peso promedio referencial. Puede variar ligeramente."
            />
          </>
        ) : (
          <>
            {/* VARIEDAD */}

            <InfoItem
              title="Variedad"
              value={variant?.name ?? "-"}
            />

            {/* CATEGORÍA */}

            <InfoItem
              title="Categoría"
              value="Reproductores"
            />

            {/* TIPO */}

            <InfoItem
              title="Tipo"
              value={variant?.type ?? "-"}
            />

            {/* ORIGEN */}

            <InfoItem
              title="Origen"
              value="Programa Nacional de Cuyes"
            />

            {/* OBJETIVO */}

            <InfoItem
              title="Objetivo"
              value="Producción tecnificada"
            />

            {/* COLOR */}

            <InfoItem
              title="Color predominante"
              value="Variable"
            />

            {/* PESO ADULTO */}

            <InfoItem
              title="Peso adulto"
              value="900 g - 1.2 kg"
            />

            {/* RUSTICIDAD */}

            <InfoItem
              title="Rusticidad"
              value="Alta"
            />

            {/* OBSERVACIONES */}

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

// ==========================================================
// COMPONENTE PARA CADA DATO
// ==========================================================

interface InfoItemProps {
  title: string;
  value: string;
}

function InfoItem({
  title,
  value,
}: InfoItemProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-[#292929]
        bg-[#11110F]
        p-4
        transition-colors
        duration-200
        hover:border-[#5FAF32]/50
      "
    >
      <h3 className="text-sm font-semibold text-[#B8B8B8]">
        {title}
      </h3>

      <p className="mt-2 text-base font-medium text-[#F5F5F5]">
        {value}
      </p>
    </div>
  );
}