import { articles } from "../data/articles";
import { categories } from "../data/categories";
import { subcategories } from "../data/subcategories";
import { tags } from "../data/tags";

import type {
  LearnArticle,
  LearnCategory,
  LearnSubcategory,
  LearnTag,
} from "../types/learn.types";

class LearnService {
  getLatestArticle(): LearnArticle | undefined {
    return articles.find((article) => article.featured) ?? articles[0];
  }

  getArticles(): LearnArticle[] {
    return articles;
  }

  getArticle(id: string): LearnArticle | undefined {
    return articles.find((article) => article.id === id);
  }

  getCategories(): LearnCategory[] {
    return categories;
  }

  getCategory(id: string): LearnCategory | undefined {
    return categories.find((category) => category.id === id);
  }

  getSubcategories(): LearnSubcategory[] {
    return subcategories;
  }

  getSubcategoriesByCategory(
    categoryId: string
  ): LearnSubcategory[] {
    return subcategories.filter(
      (subcategory) =>
        subcategory.categoryId === categoryId
    );
  }

  getTags(): LearnTag[] {
    return tags;
  }

  searchArticles(query: string): LearnArticle[] {
    const value = query.toLowerCase();

    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(value) ||
        article.summary.toLowerCase().includes(value)
    );
  }
}

export const learnService = new LearnService();