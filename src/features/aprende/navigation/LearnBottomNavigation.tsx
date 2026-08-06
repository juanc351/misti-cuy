import {
  BookOpen,
  FileText,
} from "lucide-react";

import LearnBottomNavigationItem from "./LearnBottomNavigationItem";

import type {
  LearnBottomNavigationProps,
} from "./learn-navigation.types";

export const LEARN_BOTTOM_NAV_HEIGHT = 96;

export default function LearnBottomNavigation({
  view,
  onOpenViewer,
  onOpenLibrary,
}: LearnBottomNavigationProps) {
  return (
    <nav
      className="
        fixed
        inset-x-0
        bottom-0
        z-50
        h-24
        bg-[#0A0A0A]
        border
        border-lime-700
        rounded-t-3xl
        px-4
        py-2
      "
    >
      <div className="flex h-full items-center">

        <LearnBottomNavigationItem
          active={view === "viewer"}
          label="Artículos"
          onClick={onOpenViewer}
        >
          <FileText size={34} />
        </LearnBottomNavigationItem>

        <div className="h-12 w-px bg-zinc-700" />

        <LearnBottomNavigationItem
          active={view === "library"}
          label="Biblioteca"
          onClick={onOpenLibrary}
        >
          <BookOpen size={34} />
        </LearnBottomNavigationItem>

      </div>
    </nav>
  );
}