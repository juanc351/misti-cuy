import type { LearnArticle } from "../types/learn.types";

interface ArticleViewerProps {
  article: LearnArticle;
}

export default function ArticleViewer({
  article,
}: ArticleViewerProps) {
  return (
    <main>
      <section className="mx-auto max-w-5xl p-6">

        <h1 className="mb-4 text-5xl font-bold">
          {article.title}
        </h1>


        <p className="mb-10 text-xl text-gray-400">
          {article.summary}
        </p>


        <div
          className="
            mb-10
            aspect-video
            w-full
            rounded-3xl
            bg-neutral-800
          "
        />


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
                    className="
                      text-lg
                      leading-8
                      text-gray-300
                    "
                  >
                    {block.content as string}
                  </p>
                );


              case "image":
                return (
                  <div
                    key={block.id}
                    className="
                      aspect-video
                      w-full
                      rounded-2xl
                      bg-neutral-800
                    "
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