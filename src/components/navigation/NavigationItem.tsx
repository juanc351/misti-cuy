"use client";

import Link from "next/link";

import type { NavigationItem as NavigationItemType } from "./navigation.types";

interface NavigationItemProps {
  item: NavigationItemType;
  active: boolean;
  onClick?: () => void;
  className?: string;
}

export default function NavigationItem({
  item,
  active,
  onClick,
  className = "",
}: NavigationItemProps) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`
        relative flex items-center
        px-1 py-2
        text-[17px] font-semibold
        transition-all duration-300

        ${
          active
            ? "text-[#7CB342]"
            : "text-white hover:text-[#A5D66A]"
        }

        ${className}
      `}
    >
      {item.label}

      <span
        className={`
          absolute -bottom-[10px] left-0 h-[2px]
          bg-[#7CB342]
          transition-all duration-300

          ${
            active
              ? "w-full opacity-100"
              : "w-0 opacity-0 group-hover:w-full"
          }
        `}
      />
    </Link>
  );
}