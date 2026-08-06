import { articles } from "../data/articles";
import { categories } from "../data/categories";
import { tags } from "../data/tags";

import type {
  LearnArticle,
  LearnCategory,
  LearnTag,
} from "../types/learn.types";

class LearnService {
  getLatestArticle(): LearnArticle | undefined {
    return (
      articles.find(
        (article) => article.featured
      ) ?? articles[0]
    );
  }

  getArticles(): LearnArticle[] {
    return articles;
  }

  getArticle(
    id: string
  ): LearnArticle | undefined {
    return articles.find(
      (article) => article.id === id
    );
  }

  getCategories(): LearnCategory[] {
    return categories;
  }

  getCategory(
    id: string
  ): LearnCategory | undefined {
    return categories.find(
      (category) => category.id === id
    );
  }

  getArticlesByCategory(
    categoryId: string
  ): LearnArticle[] {
    return articles.filter(
      (article) =>
        article.categoryId === categoryId
    );
  }

  getCategoryCount(
    categoryId: string
  ): number {
    return this.getArticlesByCategory(
      categoryId
    ).length;
  }

  getTags(): LearnTag[] {
    return tags;
  }

  searchArticles(
    query: string
  ): LearnArticle[] {
    const value =
      query.toLowerCase();

    return articles.filter(
      (article) =>
        article.title
          .toLowerCase()
          .includes(value) ||
        article.summary
          .toLowerCase()
          .includes(value)
    );
  }
}

export const learnService =
  new LearnService();