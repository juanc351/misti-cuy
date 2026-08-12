import Link from "next/link";

export interface CuyCampaignData {
  type: "PRODUCTO" | "EVENTO" | "CAMPAÑA" | "AVISO";
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonAction?: "WHATSAPP" | "LINK" | "NONE";
  buttonUrl?: string;
  active: boolean;
  startDate?: string;
  endDate?: string;
}

interface CuyCampaignProps {
  campaign?: CuyCampaignData | null;
}

export default function CuyCampaign({
  campaign,
}: CuyCampaignProps) {
  /* ============================================================
     SIN CARTILLA ACTIVA
  ============================================================ */

  if (!campaign || !campaign.active) {
    return null;
  }

  /* ============================================================
     BOTÓN
  ============================================================ */

  const showButton =
    campaign.buttonAction &&
    campaign.buttonAction !== "NONE" &&
    campaign.buttonText;

  return (
    <section className="bg-[#0D0D0D]">
      <div
        className="
          flex
          flex-col
          gap-5
          rounded-xl
          border
          border-[#292929]
          bg-[#11110F]
          p-5
          md:flex-row
          md:items-center
          md:justify-between
          md:p-6
        "
      >
        {/* =====================================================
            INFORMACIÓN
        ===================================================== */}

        <div>
          <span
            className="
              inline-flex
              rounded-full
              border
              border-[#5FAF32]/40
              bg-[#5FAF32]/10
              px-3
              py-1
              text-xs
              font-semibold
              text-[#5FAF32]
            "
          >
            {campaign.type}
          </span>

          {campaign.subtitle && (
            <p
              className="
                mt-3
                text-sm
                font-medium
                text-[#5FAF32]
              "
            >
              {campaign.subtitle}
            </p>
          )}

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              text-[#F5F5F5]
            "
          >
            {campaign.title}
          </h2>

          {campaign.description && (
            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-7
                text-[#B8B8B8]
              "
            >
              {campaign.description}
            </p>
          )}
        </div>

        {/* =====================================================
            BOTÓN
        ===================================================== */}

        {showButton && (
          <div className="shrink-0">
            {campaign.buttonAction === "LINK" &&
            campaign.buttonUrl ? (
              <Link
                href={campaign.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#5FAF32]
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#4D9F25]
                  hover:shadow-lg
                  md:w-auto
                "
              >
                {campaign.buttonText}
              </Link>
            ) : campaign.buttonAction === "WHATSAPP" &&
              campaign.buttonUrl ? (
              <Link
                href={campaign.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#5FAF32]
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#4D9F25]
                  hover:shadow-lg
                  md:w-auto
                "
              >
                {campaign.buttonText}
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}