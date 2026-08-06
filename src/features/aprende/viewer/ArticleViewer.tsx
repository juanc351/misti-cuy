import type { LearnArticle } from "../types/learn.types";

interface ArticleViewerProps {
  article: LearnArticle;
  onOpenLibrary: () => void;
}

export default function ArticleViewer({
  article,
  onOpenLibrary,
}: ArticleViewerProps) {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">

      <button
        onClick={onOpenLibrary}
        className="m-6 rounded-lg border border-white/10 px-4 py-2 transition hover:border-[#7CB342]"
      >
        Biblioteca
      </button>

      <section className="mx-auto max-w-5xl p-6">

        <h1 className="mb-4 text-5xl font-bold">
          {article.title}
        </h1>

        <p className="mb-10 text-xl text-gray-400">
          {article.summary}
        </p>

        <div className="mb-10 aspect-video w-full rounded-3xl bg-neutral-800" />

        <article className="space-y-8">

          {article.blocks.map((block) => {

            switch (block.type) {

              case "heading":
                return (
                  <h2
                    key={block.id}
                    className="text-3xl font-bold"
                  >
                    {block.content as string}
                  </h2>
                );

              case "paragraph":
                return (
                  <p
                    key={block.id}
                    className="text-lg leading-8 text-gray-300"
                  >
                    {block.content as string}
                  </p>
                );

              case "image":
                return (
                  <div
                    key={block.id}
                    className="aspect-video w-full rounded-2xl bg-neutral-800"
                  />
                );

              default:
                return null;
            }

          })}

        </article>

      </section>

    </main>
  );
}