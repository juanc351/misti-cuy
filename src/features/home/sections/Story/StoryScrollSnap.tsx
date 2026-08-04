interface StoryScrollSnapProps {
  children: React.ReactNode;
}

export default function StoryScrollSnap({
  children,
}: StoryScrollSnapProps) {
  return (
    <div
      className="
        h-screen
        overflow-y-auto
        snap-y
        snap-mandatory
        scroll-smooth
      "
    >
      {children}
    </div>
  );
}