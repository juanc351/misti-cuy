import { BrandText } from "@/components/brand";

import LoaderAnimation from "./LoaderAnimation";
import LoaderContainer from "./LoaderContainer";
import LoaderTransition from "./LoaderTransition";

export default function AppLoader() {
  return (
    <LoaderContainer>
      <LoaderTransition>
        <div
          className="
            flex
            flex-col
            items-center
            gap-6
          "
        >
          <LoaderAnimation />

          <BrandText className="text-4xl" />
        </div>
      </LoaderTransition>
    </LoaderContainer>
  );
}