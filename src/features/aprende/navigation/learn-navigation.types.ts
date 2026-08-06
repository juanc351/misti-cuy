export type LearnView =
  | "viewer"
  | "library";

export interface LearnBottomNavigationProps {
  view: LearnView;
  onOpenViewer: () => void;
  onOpenLibrary: () => void;
}

export interface LearnBottomNavigationItemProps {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}