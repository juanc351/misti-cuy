import "./loader.css";

import { BrandSegment } from "@/components/brand";
import { LOADER } from "@/constants/loading";

export default function LoaderAnimation() {
  return (
    <div
      className="loader-animation"
      style={{
        animationDuration: `${LOADER.rotationDuration}ms`,
      }}
    >
      <BrandSegment
        className="
          w-20 h-20
          sm:w-24 sm:h-24
          md:w-28 md:h-28
          lg:w-32 lg:h-32
        "
      />
    </div>
  );
}