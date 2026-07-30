import Link from 'next/link';

const videos = [
  {
    id: 'alimentacion',
    title: 'Cómo alimentar correctamente a tus cuyes',
    description: 'Consejos prácticos para una alimentación balanceada.',
  },
  {
    id: 'reproductores',
    title: 'Preparando reproductores de calidad',
    description: 'Buenas prácticas para seleccionar reproductores.',
  },
  {
    id: 'recorrido',
    title: 'Recorrido por la granja Misti Cuy',
    description: 'Conoce nuestras instalaciones y nuestro proceso de crianza.',
  },
];

export default function Videos() {
  return (
    <section
      aria-labelledby="videos-heading"
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la sección */}
        <div className="mb-12 text-center">
          <h2
            id="videos-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Últimos Videos
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Aprende técnicas de crianza y conoce el día a día de nuestra granja.
          </p>
        </div>

        {/* Grid de videos */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <article
              key={video.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-within:ring-2 focus-within:ring-emerald-500"
            >
              {/* Placeholder de video con botón play */}
              <div className="relative aspect-video w-full bg-gray-200">
                {/* Fondo que simula un reproductor */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-400">
                    Vista previa del video
                  </span>
                </div>
                {/* Botón Play centrado */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white text-2xl transition-all duration-300 group-hover:bg-black/80 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    ▶
                  </span>
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {video.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {video.description}
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/videos/${video.id}`}
                    className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 active:scale-95"
                    aria-label={`Ver video: ${video.title}`}
                  >
                    Ver video
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