const WHATSAPP_NUMBER = "51999999999";

const availabilityItems = [
  {
    label: "Cuyes para Engorde",
    description: "Disponibles durante gran parte del año.",
  },
  {
    label: "Reproductores",
    description: "Disponibilidad según programación de selección.",
  },
  {
    label: "Pie de Cría",
    description: "Consulta la disponibilidad actual con nuestro equipo.",
  },
];

export default function Availability() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20consultar%20la%20disponibilidad%20de%20cuyes`;

  return (
    <section
      aria-labelledby="availability-heading"
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la sección */}
        <div className="mb-12 text-center">
          <h2
            id="availability-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Disponibilidad
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Consulta la disponibilidad actual de nuestras principales categorías
            de cuyes.
          </p>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {availabilityItems.map((item) => (
            <article
              key={item.label}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Indicador visual verde */}
              <span
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                aria-hidden="true"
              >
                <span className="text-xl leading-none">🟢</span>
              </span>

              <h3 className="text-lg font-semibold text-gray-900">
                {item.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* Botón de acción */}
        <div className="mt-12 flex justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 active:scale-95"
            aria-label="Consultar disponibilidad por WhatsApp"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
