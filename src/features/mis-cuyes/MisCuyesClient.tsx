"use client";

import Footer from "@/components/footer/Footer";

import { useCuy } from "./hooks/useCuy";

import CuyCategorySelector from "./components/controls/CuyCategorySelector";
import CuyCitySelector from "./components/controls/CuyCitySelector";

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

  return (
    <div>
      {/* ======================================================
          RESUMEN
      ====================================================== */}

      <CuyAvailabilitySummary
        catalog={catalog}
      />

      {/* ======================================================
          SELECTORES
      ====================================================== */}

      <section className="grid gap-0 border-0 lg:grid-cols-2">
        <CuyCategorySelector
          catalog={catalog}
        />

        <CuyCitySelector
          catalog={catalog}
        />
      </section>

      {/* ======================================================
          TABLA
      ====================================================== */}

      <section className="border-0">
        <CuyAvailabilityTable
          catalog={catalog}
        />
      </section>

      {/* ======================================================
          CAMPAÑA
      ====================================================== */}

      <CuyCampaign />

      {/* ======================================================
          INFORMACIÓN + PRODUCTOS
      ====================================================== */}

      <section className="grid gap-0 border-0 lg:grid-cols-[1fr_420px]">
        <CuyVarietyInfo
          catalog={catalog}
        />

        <CuyProductGrid
          catalog={catalog}
        />
      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer />
    </div>
  );
}