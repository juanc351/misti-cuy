import StoryScene from "./StoryScene";

import { stories } from "../../data/stories";

export default function StoryGrid() {
  return (
    <>
      {stories
        .filter((story) => story.status === "published")
        .map((story, index) => (
          <StoryScene
            key={story.id}
            story={story}
            isReversed={index % 2 === 1}
          />
        ))}
    </>
  );
}