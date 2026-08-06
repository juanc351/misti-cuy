import type { LearnArticle } from "../types/learn.types";

import LibraryArticleCard from "./LibraryArticleCard";

interface Props {
  articles: LearnArticle[];
  onSelectArticle: (id: string) => void;
}

export default function LibraryArticles({
  articles,
  onSelectArticle,
}: Props) {
  return (
    <section className="mt-10">

      <h2 className="mb-6 text-2xl font-bold">
        Artículos
      </h2>

      <div className="space-y-4">

        {articles.map((article) => (
          <LibraryArticleCard
            key={article.id}
            article={article}
            onClick={() =>
              onSelectArticle(article.id)
            }
          />
        ))}

      </div>

    </section>
  );
}