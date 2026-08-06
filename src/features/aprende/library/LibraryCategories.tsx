import type { LearnCategory } from "../types/learn.types";

interface Props {
  categories: LearnCategory[];
  onSelectCategory: (id: string) => void;
}

export default function LibraryCategories({
  categories,
  onSelectCategory,
}: Props) {
  return (
    <section className="p-6">
      <h2 className="mb-4 text-xl font-bold">
        Categorías
      </h2>

      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              onSelectCategory(category.id)
            }
            className="block w-full rounded-lg border border-white/10 p-3 text-left hover:border-[#7CB342]"
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}