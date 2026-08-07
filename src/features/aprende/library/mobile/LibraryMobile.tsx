"use client";

import { useMemo } from "react";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
} from "framer-motion";

import { useLearnContext } from "../../LearnProvider";

import type {
  LearnArticle,
  LearnCategory,
} from "../../types/learn.types";

import LibrarySearch from "../LibrarySearch";
import LibraryMobileCategories from "./LibraryMobileCategories";
import LibraryMobileCategoryViewer from "./LibraryMobileCategoryViewer";

interface LibraryMobileProps {
  categories: LearnCategory[];

  articles: LearnArticle[];

  onSelectCategory: (
    id: string
  ) => void;

  onSelectArticle: (
    id: string
  ) => void;
}

export default function LibraryMobile({
  categories,
  articles,
  onSelectCategory,
  onSelectArticle,
}: LibraryMobileProps) {

  const {
    selectedCategory,
  } = useLearnContext();

  const filteredArticles = useMemo(() => {

    if (!selectedCategory) {
      return [];
    }

    return articles.filter(
      (article) =>
        article.categoryId ===
        selectedCategory.id
    );

  }, [
    articles,
    selectedCategory,
  ]);

  return (

    <section
      className="
        flex
        flex-col
        bg-[#050505]
      "
    >

      {/* ==========================
          BUSCADOR
      ========================== */}

      {!selectedCategory && (

        <header
          className="
            border-b
            border-white/10
            px-6
            pt-24
            pb-5
          "
        >

          <LibrarySearch />

        </header>

      )}

      {/* ==========================
          CONTENIDO
      ========================== */}

      <LayoutGroup id="learn-mobile">

        <motion.div
          layout
          className="
            px-6
            py-6
          "
        >

          <AnimatePresence
            mode="wait"
          >

            {!selectedCategory ? (

              <motion.div
                key="categories"
                layout
              >

                <LibraryMobileCategories
                  categories={categories}
                  onSelectCategory={
                    onSelectCategory
                  }
                />

              </motion.div>

            ) : (

              <LibraryMobileCategoryViewer
                key={selectedCategory.id}
                category={selectedCategory}
                articles={filteredArticles}
                onSelectArticle={
                  onSelectArticle
                }
              />

            )}

          </AnimatePresence>

        </motion.div>

      </LayoutGroup>

    </section>

  );

}