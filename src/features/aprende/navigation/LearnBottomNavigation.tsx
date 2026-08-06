import {
  BookOpen,
  FileText,
} from "lucide-react";

import LearnBottomNavigationItem from "./LearnBottomNavigationItem";

import type {
  LearnBottomNavigationProps,
} from "./learn-navigation.types";

export default function LearnBottomNavigation({
  view,
  onOpenViewer,
  onOpenLibrary,
}: LearnBottomNavigationProps) {
  return (
    <nav
      className="
        sticky
        bottom-0
        z-40
        bg-[#0A0A0A]
        border
        border-lime-700
        rounded-t-3xl
        px-4
        py-2
      "
    >
      <div className="flex items-center">

        <LearnBottomNavigationItem
          active={view === "viewer"}
          label="Artículos"
          onClick={onOpenViewer}
        >
          <FileText size={34} />
        </LearnBottomNavigationItem>

        <div className="w-px h-12 bg-zinc-700" />

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