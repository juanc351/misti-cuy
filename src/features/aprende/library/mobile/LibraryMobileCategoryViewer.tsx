"use client";

import { motion } from "framer-motion";

import { getCategoryIcon } from "../library-icons";

import type {
  LearnArticle,
  LearnCategory,
} from "../../types/learn.types";

import LibraryArticles from "../LibraryArticles";

interface Props {
  category: LearnCategory;

  articles: LearnArticle[];

  onSelectArticle: (
    id: string,
    source?: "articles" | "library"
  ) => void;
}

export default function LibraryMobileCategoryViewer({
  category,
  articles,
  onSelectArticle,
}: Props) {

  return (

    <motion.section

      initial={{
        opacity: 0,
        y: 16,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      exit={{
        opacity: 0,
        y: -16,
      }}

      transition={{
        duration: 0.25,
      }}

      className="
        px-6
        pt-24
        pb-28
      "

    >

      {/* =====================================
          TODO (Layout)

          Este padding superior es temporal.

          Cuando el Header flotante tenga una
          altura definida mediante una constante
          compartida, reemplazar el valor fijo
          (pt-24) por dicha constante.

      ====================================== */}

      {/* =====================================
          CABECERA DE CATEGORÍA
      ====================================== */}

      <div className="mb-8">

        <div
          className="
            flex
            items-start
            gap-4
          "
        >

          {/* ICONO */}

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              text-[#7CB342]
            "
          >

            {getCategoryIcon(
              category.icon,
              40
            )}

          </div>

          {/* INFORMACIÓN */}

          <div
            className="
              min-w-0
              flex-1
            "
          >

            <h1
              className="
                text-3xl
                font-bold
                leading-none
                text-white
              "
            >
              {category.name}
            </h1>

            <span
              className="
                mt-2
                block
                text-sm
                text-gray-400
              "
            >

              {/* =====================================
                  TODO (Backend)

                  Reemplazar por el total real de
                  artículos enviado por la API.

                  Ejemplo:

                  {category.articleCount}

              ====================================== */}

              {articles.length} artículos

            </span>

          </div>

        </div>

      </div>

      {/* =====================================
          LISTA DE ARTÍCULOS
      ====================================== */}

      <LibraryArticles
        articles={articles}
        onSelectArticle={(id) =>
          onSelectArticle(
            id,
            "library"
          )
        }
      />

    </motion.section>

  );

}