"use client";

import { useMemo } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useLearnContext } from "../../LearnProvider";

import type {
  LearnArticle,
  LearnCategory,
} from "../../types/learn.types";

import LibrarySearch from "../LibrarySearch";
import LibraryBreadcrumb from "../LibraryBreadcrumb";
import LibraryDesktopCategories from "./LibraryDesktopCategories";
import LibraryDesktopCategoryViewer from "./LibraryDesktopCategoryViewer";

interface LibraryDesktopProps {
  categories: LearnCategory[];

  articles: LearnArticle[];

  onSelectCategory: (
    id: string
  ) => void;

  onSelectArticle: (
    id: string
  ) => void;
}

export default function LibraryDesktop({
  categories,
  articles,
  onSelectCategory,
  onSelectArticle,
}: LibraryDesktopProps) {

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
        h-full
        flex-col
        bg-[#050505]
      "
    >

      <header
        className="
          shrink-0
          border-b
          border-white/10
          px-6
          pt-6
          pb-5
        "
      >

        {selectedCategory ? (
          <LibraryBreadcrumb />
        ) : (
          <LibrarySearch />
        )}

      </header>

      <div
        className="
          flex-1
          overflow-y-auto
          px-6
          py-6
        "
      >

        <AnimatePresence mode="wait">

          {!selectedCategory ? (

            <motion.div
              key="categories"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.35,
              }}
            >

              <LibraryDesktopCategories
                categories={categories}
                onSelectCategory={
                  onSelectCategory
                }
              />

            </motion.div>

          ) : (

            <LibraryDesktopCategoryViewer
              key={selectedCategory.id}
              category={selectedCategory}
              articles={filteredArticles}
              onSelectArticle={
                onSelectArticle
              }
            />

          )}

        </AnimatePresence>

      </div>

    </section>

  );

}