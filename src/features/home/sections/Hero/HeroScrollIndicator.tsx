import { ChevronDown } from "lucide-react";

export default function HeroScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-6 z-10 flex items-center gap-3 opacity-80 sm:left-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 text-white/90">
        <ChevronDown size={20} />
      </div>

      <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80 sm:text-base">
        Sigue bajando para conocer mi historia
      </span>
    </div>
  );
}
