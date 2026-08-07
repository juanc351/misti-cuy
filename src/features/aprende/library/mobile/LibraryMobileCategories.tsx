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

/* =====================================
   ANIMACIONES
===================================== */

const containerVariants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
    },
  },
};

export default function LibraryMobileCategories({
  categories,
  onSelectCategory,
}: Props) {

  return (

    <>

      <motion.h2
        layout
        className="
          mb-6
          text-xl
          font-bold
          text-white
        "
      >
        Explora por categorías
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >

        {categories.map((category) => (

          <motion.button

            key={category.id}

            layout

            layoutId={`category-${category.id}`}

            variants={itemVariants}

            whileTap={{
              scale: 0.98,
            }}

            onClick={() =>
              onSelectCategory(category.id)
            }

            className="
              flex
              w-full
              items-center
              rounded-3xl
              border
              border-lime-700
              bg-[#0B0B0B]
              px-5
              py-5
              transition-colors
              active:bg-[#161616]
            "

          >

            {/* ==========================
                ICONO
            ========================== */}

            <motion.div

              layout

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
                40
              )}

            </motion.div>

            {/* ==========================
                TEXTO
            ========================== */}

            <div
              className="
                ml-4
                flex-1
                text-left
              "
            >

              <motion.h3

                layout

                layoutId={`title-${category.id}`}

                className="
                  text-xl
                  font-semibold
                  text-white
                "

              >

                {category.name}

              </motion.h3>

              <motion.span

                layout

                className="
                  mt-1
                  block
                  text-sm
                  text-gray-400
                "

              >

                {/* =====================================
                    TODO (Backend)

                    Reemplazar este valor por el total
                    de artículos enviado por la API.

                    Ejemplo:

                    {category.articleCount}

                ====================================== */}

                18 artículos

              </motion.span>

            </div>

            {/* ==========================
                FLECHA
            ========================== */}

            <ChevronRight

              size={24}

              className="
                shrink-0
                text-[#7CB342]
                transition-transform
                duration-300
                group-hover:translate-x-1
              "

            />

          </motion.button>

        ))}

      </motion.div>

    </>

  );

}