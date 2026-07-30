import Link from 'next/link';

const WHATSAPP_NUMBER = '51999999999';

export default function CTA() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20solicitar%20informaci%C3%B3n%20sobre%20los%20cuyes`;

  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-emerald-700 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="cta-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          ¿Listo para comenzar tu proyecto de crianza?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-emerald-100 sm:text-lg">
          Contáctanos hoy mismo y recibe asesoría para elegir los cuyes ideales
          según tus objetivos.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-emerald-700 shadow-lg transition-all duration-300 hover:bg-emerald-50 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-700 active:scale-95 sm:w-auto"
            aria-label="Solicitar información por WhatsApp"
          >
            Solicitar información
          </a>
          <Link
            href="/catalogo"
            className="inline-flex w-full items-center justify-center rounded-full border-2 border-white px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-700 active:scale-95 sm:w-auto"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}