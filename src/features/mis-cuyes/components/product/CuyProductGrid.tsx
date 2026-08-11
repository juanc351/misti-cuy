"use client";

import type { UseCuyReturn } from "../../types/cuy.hook.types";
import { CuyCategoryType } from "../../types/cuy.types";

interface CuyProductGridProps {
  catalog: UseCuyReturn;
}

export default function CuyProductGrid({
  catalog,
}: CuyProductGridProps) {
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
     PUBLICACIONES COMPATIBLES
  ========================================================== */

  const compatiblePublications =
    publications.filter(
      (publication) => {
        /* ------------------------------------------------------
           CATEGORÍA
        ------------------------------------------------------ */

        if (
          isConsumption &&
          publication.type !== "CONSUMO"
        ) {
          return false;
        }

        if (
          !isConsumption &&
          publication.type !== "REPRODUCTOR"
        ) {
          return false;
        }

        /* ------------------------------------------------------
           DEPARTAMENTO
        ------------------------------------------------------ */

        if (
          filters.selectedDepartment &&
          publication.department
            .trim()
            .toLowerCase() !==
            filters.selectedDepartment
              .trim()
              .toLowerCase()
        ) {
          return false;
        }

        /* ------------------------------------------------------
           ESTADO
        ------------------------------------------------------ */

        if (
          filters.selectedStatus !== "ALL" &&
          publication.status !==
            filters.selectedStatus
        ) {
          return false;
        }

        return true;
      },
    );

  /* ==========================================================
     PUBLICACIÓN ACTUAL
  ========================================================== */

  const currentPublication =
    selectedPublication &&
    compatiblePublications.some(
      (publication) =>
        publication.id ===
        selectedPublication.id,
    )
      ? selectedPublication
      : compatiblePublications[0] ?? null;

  /* ==========================================================
     WHATSAPP
  ========================================================== */

  const getWhatsappUrl = (
    phone: string,
  ) => {
    const cleanPhone =
      phone.replace(/\D/g, "");

    if (!cleanPhone) {
      return null;
    }

    return `https://wa.me/${cleanPhone}`;
  };

  const whatsappUrl =
    getWhatsappUrl(
      profile?.phone ?? "",
    );

  /* ==========================================================
     SIN PUBLICACIONES
  ========================================================== */

  if (!currentPublication) {
    return (
      <section className="w-full">
        <div className="px-4 py-5 md:px-6">
          <h2 className="text-lg font-bold text-white">
            Ejemplares disponibles
          </h2>

          <p className="mt-1 text-sm text-[#A1A1AA]">
            No existen publicaciones para la
            selección actual.
          </p>
        </div>
      </section>
    );
  }

  /* ==========================================================
     REPRODUCTORES
  ========================================================== */

  if (
    currentPublication.type ===
    "REPRODUCTOR"
  ) {
    const title =
      currentPublication.sex === "MACHO"
        ? "Macho reproductor"
        : "Hembra reproductora";

    const variety =
      currentPublication.line?.trim()
        ? `Línea - ${currentPublication.line}`
        : currentPublication.breed;

    return (
      <section className="w-full">
        {/* ====================================================
            ENCABEZADO
        ==================================================== */}

        <div className="px-4 py-5 md:px-6">
          <h2 className="text-lg font-bold text-white">
            Ejemplares disponibles
          </h2>

          <p className="mt-1 text-sm text-[#A1A1AA]">
            Disponibilidad actual según la selección
            realizada.
          </p>
        </div>

        {/* ====================================================
            PRESENTACIÓN ANTERIOR
        ==================================================== */}

        <div className="space-y-3 p-4 md:space-y-4 md:p-6">
          <ProductCard
            title={title}
            quantity={`${currentPublication.quantity} disponibles`}
            detail1={`Raza / Línea: ${variety || "-"}`}
            detail2={`Precio: S/ ${currentPublication.price}`}
            detail3={`Ubicación: ${
              currentPublication.department?.trim() ||
              profile?.department?.trim() ||
              "-"
            }`}
            whatsappUrl={whatsappUrl}
          />
        </div>
      </section>
    );
  }

  /* ==========================================================
     CONSUMO
  ========================================================== */

  return (
    <section className="w-full">
      {/* ====================================================
          ENCABEZADO
      ==================================================== */}

      <div className="px-4 py-5 md:px-6">
        <h2 className="text-lg font-bold text-white">
          Ejemplares disponibles
        </h2>

        <p className="mt-1 text-sm text-[#A1A1AA]">
          Disponibilidad actual según la selección
          realizada.
        </p>
      </div>

      {/* ====================================================
          PRESENTACIÓN ANTERIOR
      ==================================================== */}

      <div className="space-y-3 p-4 md:space-y-4">
        <ProductCard
          title={`${currentPublication.weight} g`}
          quantity={`${currentPublication.quantity} disponibles`}
          detail1={`Peso: ${currentPublication.weight} g`}
          detail2={`Precio: S/ ${currentPublication.price}`}
          detail3={`Ubicación: ${
            currentPublication.department?.trim() ||
            profile?.department?.trim() ||
            "-"
          }`}
          whatsappUrl={whatsappUrl}
        />
      </div>
    </section>
  );
}

/* ================================================================
   TARJETA DE PRODUCTO
================================================================ */

interface ProductCardProps {
  title: string;
  quantity: string;
  detail1: string;
  detail2: string;
  detail3: string;
  whatsappUrl: string | null;
}

function ProductCard({
  title,
  quantity,
  detail1,
  detail2,
  detail3,
  whatsappUrl,
}: ProductCardProps) {
  return (
    <article
      className="
        rounded-2xl
        border
        border-[#292929]
        bg-[#11110F]
        p-5
        md:p-6
      "
    >
      {/* ==================================================
          TÍTULO
      ================================================== */}

      <h3 className="text-base font-semibold text-white">
        {title}
      </h3>

      {/* ==================================================
          CANTIDAD
      ================================================== */}

      <p
        className="
          mt-2
          text-2xl
          font-bold
          text-[#5FAF32]
        "
      >
        {quantity}
      </p>

      {/* ==================================================
          DETALLES
      ================================================== */}

      <div
        className="
          mt-4
          space-y-1
          text-sm
          text-[#A1A1AA]
        "
      >
        <p>{detail1}</p>
        <p>{detail2}</p>
        <p>{detail3}</p>
      </div>

      {/* ==================================================
          WHATSAPP
      ================================================== */}

      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-5
            flex
            w-full
            items-center
            justify-center
            rounded-xl
            bg-[#00BC7D]
            px-4
            py-3
            text-sm
            font-semibold
            text-black
            transition-colors
            duration-200
            hover:bg-[#00A86F]
          "
        >
          Consultar por WhatsApp
        </a>
      )}
    </article>
  );
}