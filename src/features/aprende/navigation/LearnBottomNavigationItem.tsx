import type { LearnBottomNavigationItemProps } from "./learn-navigation.types";

export default function LearnBottomNavigationItem({
  active,
  label,
  onClick,
  children,
}: LearnBottomNavigationItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        flex-1
        flex-col
        items-center
        justify-center
        gap-2
        py-4
        transition-colors
      "
    >
      <div
        className={
          active
            ? "text-lime-400"
            : "text-white"
        }
      >
        {children}
      </div>

      <span
        className={
          active
            ? "text-lg font-medium text-lime-400"
            : "text-lg font-medium text-white"
        }
      >
        {label}
      </span>
    </button>
  );
}