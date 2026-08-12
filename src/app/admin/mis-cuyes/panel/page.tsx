import CampaignPanel from "@/features/mis-cuyes/campaign/components/CampaignPanel";
import { getCampaignsData } from "@/features/mis-cuyes/campaign/services/campaign.service";

export default async function MisCuyesPanelPage() {
  const campaigns =
    await getCampaignsData();

  return (
    <div className="mx-auto w-full max-w-6xl">

      {/* ==========================================================
          CABECERA
      ========================================================== */}

      <section className="mb-8">
        <p className="mb-1 text-sm font-medium text-emerald-400">
          Mis Cuyes
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
          Panel
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
          Administra los elementos destacados
          que se muestran en la sección pública
          de Mis Cuyes.
        </p>
      </section>

      {/* ==========================================================
          CARTILLA DESTACADA
      ========================================================== */}

      <section>
        <CampaignPanel
          initialCampaigns={campaigns}
        />
      </section>

    </div>
  );
}