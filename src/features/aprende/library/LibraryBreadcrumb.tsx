"use client";

import { ChevronLeft } from "lucide-react";

import { useLearnContext } from "../LearnProvider";

export default function LibraryBreadcrumb() {

  const {
    selectedCategory,
    clearCategory,
  } = useLearnContext();

  if (!selectedCategory) {
    return null;
  }

  function handleClick() {
    clearCategory();
  }

  return (

    <button
      type="button"
      onClick={handleClick}
      className="
        mb-6
        flex
        items-center
        gap-2
        text-sm
        font-medium
        text-[#7CB342]
        transition-colors
        hover:text-white
      "
    >

      <ChevronLeft size={18} />

      <span>Biblioteca</span>

    </button>

  );

}