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
    data: {
      publications,
      profile,
    },
    filters,
    selection,
  } = catalog;

  const isConsumption =
    filters.selectedCategory ===
    CuyCategoryType.CONSUMO;

  /* ==========================================================
     PUBLICACIÓN SELECCIONADA
  ========================================================== */

  const selectedPublication =
    selection.selectedPublicationId
      ? publications.find(
          (publication) =>
            publication.id ===
            selection.selectedPublicationId,
        ) ?? null
      : null;

  /* ==========================================================
     PUBLICACIONES SEGÚN CATEGORÍA
  ========================================================== */

  const categoryPublications =
    publications.filter(
      (publication) =>
        publication.type ===
        (isConsumption
          ? "CONSUMO"
          : "REPRODUCTOR"),
    );

  /* ==========================================================
     PUBLICACIÓN ACTUAL
  ========================================================== */

  const currentPublication =
    selectedPublication?.type ===
      (isConsumption
        ? "CONSUMO"
        : "REPRODUCTOR")
      ? selectedPublication
      : categoryPublications[0] ?? null;

  /* ==========================================================
     UBICACIÓN
  ========================================================== */

  const department =
    currentPublication?.department?.trim() ||
    profile?.department?.trim() ||
    "-";

  const location =
    profile?.location?.trim() ||
    "-";

  /* ==========================================================
     INFORMACIÓN DE CONSUMO
  ========================================================== */

  if (
    isConsumption &&
    currentPublication?.type ===
      "CONSUMO"
  ) {
    return (
      <section className="w-full">
        <div className="px-4 py-5 md:px-6">
          <h2 className="text-lg font-bold text-[#F5F5F5]">
            Información de la Presentación
          </h2>

          <p className="mt-1 text-sm text-[#B8B8B8]">
            Información actual de la publicación
            seleccionada.
          </p>
        </div>

        <div
          className="
            grid
            gap-3
            p-4
            md:grid-cols-2
            md:gap-5
            md:p-6
          "
        >
          <InfoItem
            title="Presentación"
            value={`${currentPublication.weight} g`}
          />

          <InfoItem
            title="Peso"
            value={`${currentPublication.weight} g`}
          />

          <InfoItem
            title="Disponibles"
            value={`${currentPublication.quantity} ejemplares`}
          />

          <InfoItem
            title="Precio"
            value={`S/ ${currentPublication.price}`}
          />

          <InfoItem
            title="Departamento"
            value={department}
          />

          <InfoItem
            title="Ubicación"
            value={location}
          />

          <InfoItem
            title="Objetivo"
            value="Consumo"
          />

          <InfoItem
            title="Recomendado para"
            value="Restaurantes y consumo familiar"
          />

          <InfoItem
            title="Observaciones"
            value={
              currentPublication.observations?.trim() ||
              "-"
            }
          />
        </div>
      </section>
    );
  }

  /* ==========================================================
     SIN PUBLICACIÓN DE CONSUMO
  ========================================================== */

  if (isConsumption) {
    return (
      <section className="w-full">
        <div className="px-4 py-5 md:px-6">
          <h2 className="text-lg font-bold text-[#F5F5F5]">
            Información de la Presentación
          </h2>

          <p className="mt-1 text-sm text-[#B8B8B8]">
            No hay una publicación de consumo seleccionada.
          </p>
        </div>
      </section>
    );
  }

  /* ==========================================================
     REPRODUCTOR
  ========================================================== */

  const reproductivePublication =
    currentPublication?.type ===
    "REPRODUCTOR"
      ? currentPublication
      : null;

  /* ==========================================================
     RAZA / LÍNEA
  ========================================================== */

  const breed =
    reproductivePublication?.breed
      ?.trim() || "";

  const line =
    reproductivePublication?.line
      ?.trim() || "";

  const normalizedBreed =
    breed.toLowerCase();

  /* ==========================================================
     RAZAS CONOCIDAS
  ========================================================== */

  const isKnownBreed =
    normalizedBreed === "perú" ||
    normalizedBreed === "peru" ||
    normalizedBreed === "kuri" ||
    normalizedBreed === "andina" ||
    normalizedBreed === "inti";

  /* ==========================================================
     NATIVO / LÍNEA
  ========================================================== */

  const isNativo =
    normalizedBreed === "nativo";

  const isLine =
    isNativo ||
    !isKnownBreed;

  /* ==========================================================
     NOMBRE DE VARIEDAD
  ========================================================== */

  const varietyName =
    isLine
      ? `Línea - ${line || "Nativo"}`
      : breed || "-";

  /* ==========================================================
     TIPO GENÉTICO
  ========================================================== */

  const geneticType =
    isKnownBreed
      ? "Raza"
      : "Línea";

  /* ==========================================================
     LÍNEA GENÉTICA
  ========================================================== */

  const geneticLine =
    isKnownBreed
      ? breed || "-"
      : line || "Línea";

  /* ==========================================================
     COLOR PREDOMINANTE
  ========================================================== */

  const getPredominantColor =
    (): string => {
      if (isLine) {
        return (
          reproductivePublication
            ?.predominantColor
            ?.trim() || "-"
        );
      }

      switch (normalizedBreed) {
        case "perú":
        case "peru":
        case "kuri":
          return "Alazán con blanco";

        case "andina":
          return "Blanco";

        case "inti":
          return "Bayo";

        default:
          return (
            reproductivePublication
              ?.predominantColor
              ?.trim() || "-"
          );
      }
    };

  /* ==========================================================
     RUSTICIDAD
  ========================================================== */

  const getRusticity =
    (): string => {
      if (isLine) {
        return "Alta en su región";
      }

      switch (normalizedBreed) {
        case "perú":
        case "peru":
        case "andina":
          return "Media";

        case "kuri":
        case "inti":
          return "Alta";

        default:
          return "-";
      }
    };

  /* ==========================================================
     OBSERVACIONES
  ========================================================== */

  const observations =
    reproductivePublication
      ?.observations
      ?.trim() || "-";

  /* ==========================================================
     INFORMACIÓN REPRODUCTOR
  ========================================================== */

  return (
    <section className="w-full">
      <div className="px-4 py-5 md:px-6">
        <h2 className="text-lg font-bold text-[#F5F5F5]">
          Información de la{" "}
          {geneticType === "Raza"
            ? "Raza"
            : "Línea"}
        </h2>

        <p className="mt-1 text-sm text-[#B8B8B8]">
          Información actual según la publicación
          seleccionada.
        </p>
      </div>

      <div
        className="
          grid
          gap-3
          p-4
          md:grid-cols-2
          md:gap-5
          md:p-6
        "
      >
        <InfoItem
          title="Variedad"
          value={varietyName}
        />

        <InfoItem
          title="Tipo"
          value={geneticType}
        />

        <InfoItem
          title="Línea genética"
          value={geneticLine}
        />

        <InfoItem
          title="Sexo"
          value={
            reproductivePublication?.sex ===
            "MACHO"
              ? "Macho"
              : reproductivePublication?.sex ===
                "HEMBRA"
              ? "Hembra"
              : "-"
          }
        />

        <InfoItem
          title="Color predominante"
          value={getPredominantColor()}
        />

        <InfoItem
          title="Rusticidad"
          value={getRusticity()}
        />

        <InfoItem
          title="Departamento"
          value={department}
        />

        <InfoItem
          title="Ubicación"
          value={location}
        />

        <InfoItem
          title="Disponibles"
          value={
            reproductivePublication
              ? `${reproductivePublication.quantity} ejemplares`
              : "0 ejemplares"
          }
        />

        <InfoItem
          title="Precio"
          value={
            reproductivePublication
              ? `S/ ${reproductivePublication.price}`
              : "-"
          }
        />

        <InfoItem
          title="Objetivo"
          value="Producción tecnificada"
        />

        <InfoItem
          title="Observaciones"
          value={observations}
        />
      </div>
    </section>
  );
}

/* ================================================================
   COMPONENTE PARA CADA DATO
================================================================ */

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
      "
    >
      <p
        className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-[#B8B8B8]
        "
      >
        {title}
      </p>

      <p
        className="
          mt-2
          text-base
          font-medium
          text-[#F5F5F5]
        "
      >
        {value}
      </p>
    </div>
  );
}