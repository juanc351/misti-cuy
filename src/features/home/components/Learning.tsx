import Link from 'next/link';

const learningTopics = [
  {
    id: 'alimentacion',
    title: 'Alimentación',
    description:
      'Aprende a alimentar correctamente a tus cuyes en cada etapa.',
  },
  {
    id: 'manejo',
    title: 'Manejo',
    description:
      'Conoce buenas prácticas para mejorar la salud y productividad.',
  },
  {
    id: 'reproduccion',
    title: 'Reproducción',
    description:
      'Descubre recomendaciones para obtener mejores resultados reproductivos.',
  },
];

export default function Learning() {
  return (
    <section
      aria-labelledby="learning-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la sección */}
        <div className="mb-12 text-center">
          <h2
            id="learning-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Aprende con Misti Cuy
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Descubre contenido educativo para mejorar tu crianza de cuyes.
          </p>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {learningTopics.map((topic) => (
            <article
              key={topic.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-within:ring-2 focus-within:ring-emerald-500"
            >
              {/* Placeholder de imagen */}
              <div className="aspect-[16/9] w-full bg-gray-100 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-400">
                  Imagen {topic.title}
                </span>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {topic.description}
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/aprende/${topic.id}`}
                    className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 active:scale-95"
                    aria-label={`Leer más sobre ${topic.title}`}
                  >
                    Leer más
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}