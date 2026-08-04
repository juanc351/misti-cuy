import StoryGrid from "./StoryGrid";

export default function Story() {
  return (
    <section
      id="story"
      className="
        snap-y
        snap-mandatory
      "
    >
      <StoryGrid />
    </section>
  );
}