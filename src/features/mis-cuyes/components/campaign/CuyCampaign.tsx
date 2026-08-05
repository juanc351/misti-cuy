import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/51999999999?text=Hola,%20quiero%20consultar%20la%20promoción%20de%20cuyes.";

export default function CuyCampaign() {
  return (
    <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-green-700 text-white shadow-lg">
      <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
        <div>
          <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Promoción
          </span>

          <h2 className="mt-3 text-2xl font-bold">
            Lleva 5 cuyes y obtén un precio especial
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50">
            Consulta nuestras promociones vigentes para reproductores y cuyes
            de consumo. Las campañas cambian según la temporada y la
            disponibilidad de la granja.
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-emerald-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Consultar promoción
          </Link>
        </div>
      </div>
    </section>
  );
}