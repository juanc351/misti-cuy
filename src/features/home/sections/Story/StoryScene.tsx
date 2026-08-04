import Image from "next/image";

import type { Story } from "../../types/story.types";

interface StorySceneProps {
  story: Story;
}

export default function StoryScene({ story }: StorySceneProps) {
  const imageFirst = story.layout === "left";

  return (
    <section className="min-h-screen snap-start bg-transparent">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-[clamp(2.5rem,4vw,4rem)] px-6 py-[clamp(4rem,8vh,6rem)] sm:px-8 lg:grid-cols-2 lg:gap-[clamp(3rem,5vw,4rem)] lg:px-12 xl:px-16">
        {imageFirst && <StoryImage image={story.image} title={story.title} />}

        <StoryContent story={story} />

        {!imageFirst && <StoryImage image={story.image} title={story.title} />}
      </div>
    </section>
  );
}

interface StoryImageProps {
  image: string;
  title: string;
}

function StoryImage({ image, title }: StoryImageProps) {
  return (
    <div className="relative aspect-4/5 w-full overflow-hidden rounded-[clamp(1.25rem,2.5vw,2rem)] shadow-2xl shadow-black/20 lg:aspect-5/6">
      <Image src={image} alt={title} fill className="object-cover" />
    </div>
  );
}

interface StoryContentProps {
  story: Story;
}

function StoryContent({ story }: StoryContentProps) {
  return (
    <div className="flex max-w-[min(100%,40rem)] flex-col gap-[clamp(1.5rem,2.5vw,2rem)] text-left">
      <span className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
        Capítulo {story.chapter}
      </span>

      <h2 className="max-w-[clamp(18rem,40vw,32rem)] text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-[clamp(2.5rem,5vw,4rem)] lg:text-[clamp(3rem,5vw,4.5rem)]">
        {story.title}
      </h2>

      <p className="max-w-[clamp(18rem,40vw,32rem)] text-[clamp(1rem,1.6vw,1.125rem)] leading-[1.8] text-slate-200 sm:text-[clamp(1.05rem,1.8vw,1.125rem)]">
        {story.description}
      </p>

      <p className="max-w-[clamp(18rem,40vw,32rem)] text-[clamp(1rem,1.6vw,1.125rem)] leading-[1.8] italic text-slate-300 sm:text-[clamp(1.05rem,1.8vw,1.125rem)]">
        {story.conclusion}
      </p>
    </div>
  );
}
