"use client";

import { useLearn } from "../hooks/useLearn";

export default function LearnDeveloperPanel() {
  const {
    view,

    latestArticle,

    selectedArticle,

    selectedCategory,

    selectedSubcategory,

    articles,

    categories,

    subcategories,

    openViewer,

    openLibrary,

    selectCategory,

    selectSubcategory,

    selectArticle,
  } = useLearn();

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white p-8">

      <h1 className="mb-8 text-4xl font-bold">
        Aprende · Developer Panel
      </h1>

      <div className="space-y-6">

        <section className="rounded-xl border border-white/10 p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Estado
          </h2>

          <p>
            <strong>Vista:</strong> {view}
          </p>

          <p>
            <strong>Último artículo:</strong>{" "}
            {latestArticle?.title}
          </p>

          <p>
            <strong>Artículo seleccionado:</strong>{" "}
            {selectedArticle?.title}
          </p>

          <p>
            <strong>Categoría:</strong>{" "}
            {selectedCategory?.name ?? "-"}
          </p>

          <p>
            <strong>Subcategoría:</strong>{" "}
            {selectedSubcategory?.name ?? "-"}
          </p>
        </section>

        <section className="rounded-xl border border-white/10 p-6">

          <h2 className="mb-4 text-2xl font-semibold">
            Datos
          </h2>

          <p>Artículos: {articles.length}</p>

          <p>Categorías: {categories.length}</p>

          <p>Subcategorías: {subcategories.length}</p>

        </section>

        <section className="rounded-xl border border-white/10 p-6">

          <h2 className="mb-4 text-2xl font-semibold">
            Navegación
          </h2>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={openViewer}
              className="rounded bg-green-700 px-4 py-2"
            >
              Viewer
            </button>

            <button
              onClick={openLibrary}
              className="rounded bg-blue-700 px-4 py-2"
            >
              Biblioteca
            </button>

          </div>

        </section>

        <section className="rounded-xl border border-white/10 p-6">

          <h2 className="mb-4 text-2xl font-semibold">
            Categorías
          </h2>

          <div className="flex flex-wrap gap-3">

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  selectCategory(category.id)
                }
                className="rounded border border-white/20 px-4 py-2"
              >
                {category.name}
              </button>
            ))}

          </div>

        </section>

        <section className="rounded-xl border border-white/10 p-6">

          <h2 className="mb-4 text-2xl font-semibold">
            Subcategorías
          </h2>

          <div className="flex flex-wrap gap-3">

            {subcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                onClick={() =>
                  selectSubcategory(
                    subcategory.id
                  )
                }
                className="rounded border border-white/20 px-4 py-2"
              >
                {subcategory.name}
              </button>
            ))}

          </div>

        </section>

        <section className="rounded-xl border border-white/10 p-6">

          <h2 className="mb-4 text-2xl font-semibold">
            Artículos
          </h2>

          <div className="space-y-3">

            {articles.map((article) => (
              <button
                key={article.id}
                onClick={() =>
                  selectArticle(article.id)
                }
                className="block w-full rounded border border-white/20 p-3 text-left"
              >
                {article.title}
              </button>
            ))}

          </div>

        </section>

      </div>

    </main>
  );
}