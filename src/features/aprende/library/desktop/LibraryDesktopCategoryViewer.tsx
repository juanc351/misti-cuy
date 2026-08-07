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

export default function LibraryDesktopCategoryViewer({
  category,
  articles,
  onSelectArticle,
}: Props) {

  return (

    <motion.section

      initial={{
        opacity: 0,
      }}

      animate={{
        opacity: 1,
      }}

      exit={{
        opacity: 0,
      }}

      transition={{
        duration: 0.25,
      }}

      className="
        px-6
        pt-6
        pb-10
      "

    >

      {/* ==========================
          CABECERA
      ========================== */}

      <motion.div
        className="mb-8"
      >

        <div
          className="
            flex
            items-center
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
              rounded-2xl
              bg-[#7CB342]/10
              text-[#7CB342]
            "
          >

            {getCategoryIcon(
              category.icon,
              34
            )}

          </div>

          {/* TITULO */}

          <div className="min-w-0 flex-1">

            <h1
              className="
                text-3xl
                font-bold
                text-white
              "
            >
              {category.name}
            </h1>

            <span
              className="
                mt-1
                block
                text-base
                text-gray-400
              "
            >
              {articles.length} artículos
            </span>

          </div>

        </div>

        {/* DESCRIPCIÓN */}

        <p
          className="
            mt-5
            text-base
            leading-7
            text-gray-300
          "
        >
          {category.description}
        </p>

      </motion.div>

      {/* ==========================
          ARTÍCULOS
      ========================== */}

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