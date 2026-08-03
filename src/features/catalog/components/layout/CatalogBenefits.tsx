const benefits = [
  {
    title: "Genética Seleccionada",
    description:
      "Trabajamos con líneas y razas seleccionadas para garantizar animales de excelente calidad.",
    icon: "🧬",
  },
  {
    title: "Alimentación Balanceada",
    description:
      "Nuestros cuyes reciben alimentación controlada para lograr un desarrollo uniforme.",
    icon: "🌿",
  },
  {
    title: "Disponibilidad Actualizada",
    description:
      "La información del catálogo se mantiene actualizada para facilitar tu compra.",
    icon: "📋",
  },
  {
    title: "Atención Personalizada",
    description:
      "Te asesoramos para elegir los ejemplares que mejor se adapten a tu proyecto.",
    icon: "🤝",
  },
];

export default function CatalogBenefits() {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          ¿Por qué elegir Misti Cuy?
        </h2>

        <p className="mt-3 text-slate-600 max-w-3xl mx-auto">
          Nuestro compromiso es ofrecer animales de calidad, información clara
          y una experiencia de compra sencilla para productores y clientes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {benefits.map((benefit) => (
          <article
            key={benefit.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="text-4xl">
              {benefit.icon}
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              {benefit.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {benefit.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}