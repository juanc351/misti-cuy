"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import type { LearnArticle, LearnCategory } from "../types/learn.types";

import LibrarySearch from "./LibrarySearch";
import LibraryCategories from "./LibraryCategories";
import LibraryCategoryViewer from "./LibraryCategoryViewer";

interface LibraryProps {
  categories: LearnCategory[];
  articles: LearnArticle[];

  onSelectCategory: (id: string) => void;

  onSelectArticle: (id: string) => void;
}

export default function Library({
  categories,
  articles,
  onSelectCategory,
  onSelectArticle,
}: LibraryProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  const selectedCategory = useMemo(
    () =>
      categories.find((category) => category.id === selectedCategoryId) ?? null,
    [categories, selectedCategoryId],
  );

  const filteredArticles = useMemo(() => {
    if (!selectedCategoryId) {
      return [];
    }

    return articles.filter(
      (article) => article.categoryId === selectedCategoryId,
    );
  }, [articles, selectedCategoryId]);

  function handleCategory(id: string) {
    setSelectedCategoryId(id);

    onSelectCategory(id);
  }

  function handleBack() {
    setSelectedCategoryId(null);
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <section
        className="
          mx-auto
          max-w-7xl
          px-6
          pt-8
          pb-40
        "
      >
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
                onSelectCategory={handleCategory}
              />
            </motion.div>
          ) : (
            <LibraryCategoryViewer
              key={selectedCategory.id}
              category={selectedCategory}
              articles={filteredArticles}
              onBack={handleBack}
              onSelectArticle={onSelectArticle}
            />
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
