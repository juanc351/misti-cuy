import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/51999999999?text=Hola,%20quiero%20consultar%20la%20promoción%20de%20cuyes";

export default function CuyCampaign() {
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
        {/* =====================================
            INFORMACIÓN
        ====================================== */}

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
            Promoción
          </span>

          <h2 className="mt-3 text-2xl font-bold text-[#F5F5F5]">
            Lleva 5 cuyes y obtén un precio especial
          </h2>

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-7
              text-[#B8B8B8]
            "
          >
            Consulta nuestras promociones vigentes para
            reproductores y cuyes de consumo. Las campañas
            cambian según la temporada y la disponibilidad
            de la granja.
          </p>
        </div>

        {/* =====================================
            BOTÓN
        ====================================== */}

        <div className="flex-shrink-0">
          <Link
            href={WHATSAPP_URL}
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
              hover:bg-[#4D9F25]
              hover:-translate-y-0.5
              hover:shadow-lg
              md:w-auto
            "
          >
            Consultar promoción
          </Link>
        </div>
      </div>
    </section>
  );
}