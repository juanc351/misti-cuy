import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/51999999999?text=Hola,%20quiero%20consultar%20la%20disponibilidad%20de%20cuyes.";

export default function CuyHero() {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-800 text-white shadow-xl">
      <div className="grid items-center gap-10 px-6 py-10 md:px-10 lg:grid-cols-2 lg:px-14 lg:py-14">
        {/* Información */}
        <div>
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
            Granja Tecnificada · Arequipa
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">
            Mis Cuyes
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-50">
            Consulta la disponibilidad actual de reproductores y cuyes para
            consumo. Selecciona una categoría, una ciudad y encuentra los
            ejemplares disponibles de nuestra granja.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-semibold text-emerald-700 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Consultar por WhatsApp
            </Link>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center">
          <div className="flex aspect-[4/3] w-full max-w-md items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
            <span className="text-lg font-medium text-white/80">
              Imagen Hero
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}