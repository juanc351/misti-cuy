import Link from "next/link";
import { SITE } from "@/config/site";

export default function Hero() {
  const whatsappUrl = `https://wa.me/${SITE.contact.whatsapp}?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20cuyes`;

  return (
    <section
      aria-labelledby="hero-heading"
      className="min-h-[calc(100vh-72px)] flex items-center bg-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Columna izquierda: contenido */}
          <div className="flex flex-col items-start gap-6 text-left">
            {/* Badge */}
            <span className="inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 shadow-sm transition-all duration-300 hover:shadow-md">
              Producción Tecnificada
            </span>

            {/* Título principal */}
            <h1
              id="hero-heading"
              className="max-w-xl text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl"
            >
              Cuyes saludables, criados con calidad y confianza.
            </h1>

            {/* Texto descriptivo */}
            <p className="max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg">
              En {SITE.name} ofrecemos reproductores y cuyes para engorde,
              criados con alimentación de calidad y manejo tecnificado.
            </p>

            {/* Botones */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 active:scale-95"
              >
                Ver catálogo
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 active:scale-95"
                aria-label="Cotizar por WhatsApp"
              >
                Cotizar por WhatsApp
              </a>
            </div>

            {/* Indicadores */}
            <ul className="mt-2 flex flex-col gap-2 text-sm text-gray-700 sm:text-base">
              <li className="flex items-center gap-2">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                  aria-hidden="true"
                >
                  ✓
                </span>
                Alimentación de calidad
              </li>

              <li className="flex items-center gap-2">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                  aria-hidden="true"
                >
                  ✓
                </span>
                Disponibilidad permanente
              </li>

              <li className="flex items-center gap-2">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                  aria-hidden="true"
                >
                  ✓
                </span>
                Atención personalizada
              </li>
            </ul>
          </div>

          {/* Columna derecha: Imagen */}
          <div className="hidden lg:flex lg:justify-center">
            <div className="flex aspect-square w-full max-w-md items-center justify-center rounded-3xl bg-gray-100 shadow-inner transition-all duration-300 hover:shadow-md">
              <span className="text-center text-sm font-medium text-gray-400">
                Imagen Principal
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
