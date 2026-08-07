"use client";

import { useMemo } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useLearnContext } from "../LearnProvider";

import type {
  LearnArticle,
  LearnCategory,
} from "../types/learn.types";

import LibrarySearch from "./LibrarySearch";
import LibraryCategories from "./LibraryCategories";
import LibraryCategoryViewer from "./LibraryCategoryViewer";

interface LibraryProps {
  categories: LearnCategory[];

  articles: LearnArticle[];

  onSelectCategory: (
    id: string
  ) => void;

  onSelectArticle: (
    id: string
  ) => void;
}

export default function Library({
  categories,
  articles,
  onSelectCategory,
  onSelectArticle,
}: LibraryProps) {
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
    <main>
      <section className="mx-auto max-w-7xl p-6">

        <LibrarySearch />

        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div
              key="grid"
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
              <LibraryCategories
                categories={categories}
                onSelectCategory={
                  onSelectCategory
                }
              />
            </motion.div>
          ) : (
            <LibraryCategoryViewer
              key={selectedCategory.id}
              category={selectedCategory}
              articles={filteredArticles}
              onSelectArticle={
                onSelectArticle
              }
            />
          )}
        </AnimatePresence>

      </section>
    </main>
  );
}