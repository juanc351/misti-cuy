const reasons = [
  {
    title: "Manejo Tecnificado",
    description:
      "Aplicamos buenas prácticas para garantizar un crecimiento saludable.",
  },
  {
    title: "Alimentación de Calidad",
    description:
      "Nuestros cuyes reciben una alimentación equilibrada para un mejor desarrollo.",
  },
  {
    title: "Asesoría Personalizada",
    description: "Te acompañamos antes y después de tu compra.",
  },
  {
    title: "Compromiso y Confianza",
    description:
      "Buscamos relaciones duraderas con nuestros clientes y productores.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la sección */}
        <div className="mb-12 text-center">
          <h2
            id="why-choose-us-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            ¿Por qué elegir Misti Cuy?
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Trabajamos con estándares de calidad para ofrecer cuyes sanos y un
            servicio de confianza.
          </p>
        </div>

        {/* Grid de motivos */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            const firstLetter = reason.title.charAt(0).toUpperCase();
            return (
              <article
                key={reason.title}
                className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Círculo con la primera letra */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-600">
                  {firstLetter}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {reason.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
