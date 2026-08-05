"use client";

import Footer from "@/components/footer/Footer";

import { useCuy } from "./hooks/useCuy";

import CuyHero from "./components/hero/CuyHero";

import CuyCategorySelector from "./components/controls/CuyCategorySelector";
import CuyCitySelector from "./components/controls/CuyCitySelector";

import CuyAvailabilitySummary from "./components/availability/summary/CuyAvailabilitySummary";

import CuyAvailabilityTable from "./components/availability/CuyAvailabilityTable";

import CuyCampaign from "./components/campaign/CuyCampaign";

import CuyVarietyInfo from "./components/variety/CuyVarietyInfo";

import CuyProductGrid from "./components/product/CuyProductGrid";

export default function MisCuyesPage() {
  const catalog = useCuy();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8">
      {/* Hero */}
      <CuyHero />

      {/* Resumen */}
      <CuyAvailabilitySummary catalog={catalog} />

      {/* Selectores */}
      <section className="grid gap-4 lg:grid-cols-2">
        <CuyCategorySelector catalog={catalog} />
        <CuyCitySelector catalog={catalog} />
      </section>

      {/* Tabla */}
      <section>
        <CuyAvailabilityTable catalog={catalog} />
      </section>

      {/* Campaña */}
      <CuyCampaign />

      {/* Información + Productos */}
      <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <CuyVarietyInfo catalog={catalog} />
        <CuyProductGrid catalog={catalog} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}