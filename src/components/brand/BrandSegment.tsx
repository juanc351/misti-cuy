import type { BrandSegmentProps } from "./brand.types";

export default function BrandSegment({
  className = "",
}: BrandSegmentProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="arcGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="#8DFF00"
          />

          <stop
            offset="100%"
            stopColor="#66FF00"
          />
        </linearGradient>
      </defs>

      <circle
        cx="150"
        cy="150"
        r="70"
        fill="none"
        stroke="url(#arcGradient)"
        strokeWidth="18"
        strokeLinecap="round"
        strokeDasharray="95 345"
      />
    </svg>
  );
}