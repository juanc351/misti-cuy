export default function HeroContent() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-start px-6 text-left sm:px-8 lg:px-0">
      <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
        FUNDANDO UNA
      </span>

      <h1 className="mt-6 max-w-160 text-5xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl">
         GRANJA
      </h1>

      <p className="mt-6 max-w-prose text-base leading-8 text-slate-200 sm:text-lg">
        Estoy construyendo una granja de cuyes desde cero y esta es su historia 
      </p>
    </div>
  );
}
