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

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-x-0 bottom-0 h-72 bg-linear-to-t from-black to-transparent" />
    </div>
  );
}
