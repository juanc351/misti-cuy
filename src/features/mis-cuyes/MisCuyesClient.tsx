"use client";

import { useEffect } from "react";

import Footer from "@/components/footer/Footer";

import { useCuy } from "./hooks/useCuy";

import CuyCategorySelector from "./components/controls/CuyCategorySelector";

import CuyDepartmentSelector from "./components/availability/filters/CuyDepartmentSelector";

import CuyStatusSelector from "./components/availability/filters/CuyStatusSelector";

import CuyAvailabilitySummary from "./components/availability/summary/CuyAvailabilitySummary";

import CuyAvailabilityTable from "./components/availability/CuyAvailabilityTable";

import CuyCampaign from "./components/campaign/CuyCampaign";

import CuyVarietyInfo from "./components/variety/CuyVarietyInfo";

import CuyProductGrid from "./components/product/CuyProductGrid";

import type { CuyServerData } from "./services/cuy.server";

interface MisCuyesClientProps {
  initialData: CuyServerData;
}

export default function MisCuyesClient({
  initialData,
}: MisCuyesClientProps) {
  const catalog = useCuy({
    initialData,
  });

  /* ============================================================
     SCROLL AUTOMÁTICO AL SELECCIONAR UNA PUBLICACIÓN
  ============================================================ */

  useEffect(() => {
    if (
      !catalog.selection.selectedPublicationId
    ) {
      return;
    }

    const element =
      document.getElementById(
        "cuy-selection-details",
      );

    if (!element) {
      return;
    }

    requestAnimationFrame(() => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [
    catalog.selection.selectedPublicationId,
  ]);

  return (
    <>
      {/* ============================================================
          RESUMEN
      ============================================================ */}

      <CuyAvailabilitySummary
        catalog={catalog}
      />

      {/* ============================================================
          FILTROS
      ============================================================ */}

      <section
        className="
          grid
          gap-4
          border-0
          lg:grid-cols-3
        "
      >
        {/* ==========================================================
            CATEGORÍA
        ========================================================== */}

        <CuyCategorySelector
          catalog={catalog}
        />

        {/* ==========================================================
            UBICACIÓN
        ========================================================== */}

        <CuyDepartmentSelector
          catalog={catalog}
        />

        {/* ==========================================================
            ESTADO
        ========================================================== */}

        <CuyStatusSelector
          catalog={catalog}
        />
      </section>

      {/* ============================================================
          TABLA
      ============================================================ */}

      <section className="border-0">
        <CuyAvailabilityTable
          catalog={catalog}
        />
      </section>

      {/* ============================================================
          CAMPAÑA
      ============================================================ */}

      <CuyCampaign />

      {/* ============================================================
          INFORMACIÓN + PRODUCTOS

          Este ID es el destino del scroll automático.
      ============================================================ */}

      <section
        id="cuy-selection-details"
        className="
          scroll-mt-24
          grid
          gap-0
          border-0
          lg:grid-cols-[1fr_420px]
        "
      >
        <CuyVarietyInfo
          catalog={catalog}
        />

        <CuyProductGrid
          catalog={catalog}
        />
      </section>

      {/* ============================================================
          FOOTER
      ============================================================ */}

      <Footer />
    </>
  );
}