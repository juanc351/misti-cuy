"use client";

import { useCatalog } from "./hooks/useCatalog";

import CatalogHero from "./components/layout/CatalogHero";
import CatalogBenefits from "./components/layout/CatalogBenefits";

import CatalogCategorySelector from "./components/controls/CatalogCategorySelector";
import CatalogCitySelector from "./components/controls/CatalogCitySelector";

import CatalogAvailabilitySummary from "./components/availability/summary/CatalogAvailabilitySummary";

import CatalogAvailabilityTable from "./components/availability/CatalogAvailabilityTable";
import CatalogAvailabilityCards from "./components/availability/CatalogAvailabilityCards";

import CatalogCampaign from "./components/campaign/CatalogCampaign";

import CatalogVarietyInfo from "./components/variety/CatalogVarietyInfo";

import CatalogProductGrid from "./components/product/CatalogProductGrid";

export default function CatalogPage() {
  const catalog = useCatalog();

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8">
      {/* Hero */}
      <CatalogHero />

      {/* Resumen de disponibilidad */}
      <CatalogAvailabilitySummary catalog={catalog} />

      {/* Selectores */}
      <section className="grid gap-4 lg:grid-cols-2">
        <CatalogCategorySelector catalog={catalog} />
        <CatalogCitySelector catalog={catalog} />
      </section>

      {/* Disponibilidad detallada (temporal) */}
      <section className="hidden lg:block">
        <CatalogAvailabilityTable catalog={catalog} />
      </section>

      <section className="lg:hidden">
        <CatalogAvailabilityCards catalog={catalog} />
      </section>

      {/* Campaña */}
      <CatalogCampaign />

      {/* Información + Ejemplares */}
      <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <CatalogVarietyInfo catalog={catalog} />
        <CatalogProductGrid catalog={catalog} />
      </section>

      {/* Beneficios */}
      <CatalogBenefits />
    </main>
  );
}
