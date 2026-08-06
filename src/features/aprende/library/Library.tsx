import type {
  LearnArticle,
  LearnCategory,
  LearnSubcategory,
} from "../types/learn.types";

import LibrarySearch from "./LibrarySearch";
import LibraryCategories from "./LibraryCategories";
import LibrarySubcategories from "./LibrarySubcategories";
import LibraryArticles from "./LibraryArticles";

interface LibraryProps {
  categories: LearnCategory[];
  subcategories: LearnSubcategory[];
  articles: LearnArticle[];

  onSelectCategory: (
    id: string
  ) => void;

  onSelectSubcategory: (
    id: string
  ) => void;

  onSelectArticle: (
    id: string
  ) => void;
}

export default function Library({
  categories,
  subcategories,
  articles,
  onSelectCategory,
  onSelectSubcategory,
  onSelectArticle,
}: LibraryProps) {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">

      <LibrarySearch />

      <LibraryCategories
        categories={categories}
        onSelectCategory={onSelectCategory}
      />

      <LibrarySubcategories
        subcategories={subcategories}
        onSelectSubcategory={onSelectSubcategory}
      />

      <LibraryArticles
        articles={articles}
        onSelectArticle={onSelectArticle}
      />

    </main>
  );
}