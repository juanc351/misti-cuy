"use client";

import { ChevronRight } from "lucide-react";

import { motion } from "framer-motion";

import { getCategoryIcon } from "../library-icons";

import type {
  LearnCategory,
} from "../../types/learn.types";

interface Props {
  categories: LearnCategory[];

  onSelectCategory: (
    id: string
  ) => void;
}

export default function LibraryDesktopCategories({
  categories,
  onSelectCategory,
}: Props) {

  return (

    <>

      <motion.h2
        layout
        className="mb-8 text-2xl font-bold"
      >
        Explora por categorías
      </motion.h2>

      <div className="space-y-4">

        {categories.map((category, index) => (

          <motion.button

            key={category.id}

            layoutId={`category-${category.id}`}

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: index * 0.05,
            }}

            whileHover={{
              scale: 1.01,
            }}

            whileTap={{
              scale: 0.98,
            }}

            onClick={() =>
              onSelectCategory(category.id)
            }

            className="
              group
              flex
              w-full
              items-center
              rounded-3xl
              border
              border-lime-700
              bg-[#0B0B0B]
              px-6
              py-7
              transition-all
              duration-300
              hover:bg-[#121212]
            "

          >

            <motion.div

              layoutId={`icon-${category.id}`}

              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                text-[#7CB342]
              "

            >

              {getCategoryIcon(
                category.icon,
                42
              )}

            </motion.div>

            <div
              className="
                ml-5
                flex-1
                text-left
              "
            >

              <motion.h3
                layout
                className="
                  text-2xl
                  font-semibold
                "
              >
                {category.name}
              </motion.h3>

              <motion.div
                layout
                className="
                  mt-2
                  inline-flex
                  rounded-lg
                  bg-zinc-800
                  px-3
                  py-1
                  text-base
                  text-gray-300
                "
              >
                18 artículos
              </motion.div>

            </div>

            <div
              className="
                ml-6
                flex
                items-center
                pr-2
                text-[#7CB342]
              "
            >

              <ChevronRight
                size={30}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </div>

          </motion.button>

        ))}

      </div>

    </>

  );

}