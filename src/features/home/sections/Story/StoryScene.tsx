import Image from "next/image";

import type { Story } from "../../types/story.types";

interface StorySceneProps {
  story: Story;
}

export default function StoryScene({ story }: StorySceneProps) {
  const imageFirst = story.layout === "left";

  return (
    <section className="min-h-[100svh] snap-start bg-transparent">
      <div className="mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-[clamp(2rem,5vw,6rem)] px-6 py-[clamp(8rem,10svh,12rem)] sm:px-8 lg:grid-cols-[45%_55%] lg:px-12 xl:px-16">
        {imageFirst ? (
          <StoryImage image={story.image} title={story.title} />
        ) : null}

        <StoryContent story={story} />

        {!imageFirst ? (
          <StoryImage image={story.image} title={story.title} />
        ) : null}
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
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[clamp(1.5rem,3vw,2.25rem)] shadow-[0_24px_80px_rgba(0,0,0,0.24)] lg:aspect-[5/6]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 45vw, 100vw"
      />
    </div>
  );
}

interface StoryContentProps {
  story: Story;
}

function StoryContent({ story }: StoryContentProps) {
  return (
    <div className="mx-auto flex w-full max-w-[40rem] flex-col gap-[clamp(1.25rem,2.2vw,1.75rem)] text-left lg:mx-0">
      <span className="text-[0.8rem] font-semibold uppercase tracking-[0.35em] text-[#A5D66A]">
        Capítulo {story.chapter}
      </span>

      <h2 className="max-w-[clamp(18rem,40vw,32rem)] text-[clamp(2rem,4vw,3.25rem)] font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-[clamp(2.25rem,5vw,3.75rem)]">
        {story.title}
      </h2>

      <p className="max-w-[clamp(18rem,40vw,32rem)] text-[clamp(1rem,1.6vw,1.125rem)] leading-[1.8] text-slate-200">
        {story.description}
      </p>

      <p className="max-w-[clamp(18rem,40vw,32rem)] text-[clamp(1rem,1.6vw,1.125rem)] leading-[1.8] text-slate-300/90">
        {story.conclusion}
      </p>
    </div>
  );
}
