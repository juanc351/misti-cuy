import { BRAND } from "@/constants/brand";

import type { BrandTextProps } from "./brand.types";

export default function BrandText({
  first = BRAND.name.first,
  second = BRAND.name.second,
  className = "",
}: BrandTextProps) {
  return (
    <h1
        className={`select-none text-center font-bold ${className}`}
    >
      <span
        style={{
          color: BRAND.colors.first,
        }}
      >
        {first}
      </span>

      <span> </span>

      <span
        style={{
          color: BRAND.colors.second,
        }}
      >
        {second}
      </span>
    </h1>
  );
}