import Image from "next/image";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src="/assets/images/hero/hero-home.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />

      {/* Oscurece ligeramente toda la imagen */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Fundido horizontal */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-background
          via-background/85
          via-[45%]
          to-transparent
        "
      />

      {/* Unión con la siguiente sección */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}