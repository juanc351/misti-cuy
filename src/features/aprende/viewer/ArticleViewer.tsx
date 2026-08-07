"use client";

import type { LearnArticle } from "../types/learn.types";

interface ArticleViewerProps {
  article: LearnArticle;
}

export default function ArticleViewer({
  article,
}: ArticleViewerProps) {

  return (

    <section
      className="
        bg-[#050505]
      "
    >

      <div
        className="
          mx-auto
          w-full
          max-w-5xl
          px-6
          py-8
        "
      >

        {/* =====================================
            TÍTULO
        ====================================== */}

        <h1
          className="
            text-3xl
            font-bold
            leading-tight
            text-white
          "
        >
          {article.title}
        </h1>

        {/* =====================================
            RESUMEN
        ====================================== */}

        <p
          className="
            mt-5
            text-base
            leading-7
            text-gray-400
          "
        >
          {article.summary}
        </p>

        {/* =====================================
            IMAGEN PRINCIPAL
        ====================================== */}

        <div
          className="
            mt-8
            aspect-video
            w-full
            rounded-3xl
            bg-neutral-800
          "
        />

        {/* =====================================
            CONTENIDO
        ====================================== */}

        <article
          className="
            mt-10
            space-y-8
          "
        >

          {article.blocks.map((block) => {

            switch (block.type) {

              case "heading":

                return (

                  <h2
                    key={block.id}
                    className="
                      text-2xl
                      font-bold
                      leading-tight
                      text-white
                    "
                  >
                    {block.content as string}
                  </h2>

                );

              case "paragraph":

                return (

                  <p
                    key={block.id}
                    className="
                      text-base
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

      </div>

    </section>

  );

}