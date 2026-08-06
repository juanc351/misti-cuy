import type { LearnSubcategory } from "../types/learn.types";

interface Props {
  subcategories: LearnSubcategory[];
  onSelectSubcategory: (id: string) => void;
}

export default function LibrarySubcategories({
  subcategories,
  onSelectSubcategory,
}: Props) {
  return (
    <section className="p-6">
      <h2 className="mb-4 text-xl font-bold">
        Subcategorías
      </h2>

      <div className="space-y-2">
        {subcategories.map((subcategory) => (
          <button
            key={subcategory.id}
            onClick={() =>
              onSelectSubcategory(
                subcategory.id
              )
            }
            className="block w-full rounded-lg border border-white/10 p-3 text-left hover:border-[#7CB342]"
          >
            {subcategory.name}
          </button>
        ))}
      </div>
    </section>
  );
}