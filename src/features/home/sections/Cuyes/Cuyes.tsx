import { cuyes } from "../../data/cuyes";
import CuyCard from "./CuyCard";

export default function Cuyes() {
  return (
    <section className="w-full bg-background py-[clamp(5rem,10vh,8rem)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-[clamp(1.5rem,4vw,3rem)]">
        <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Continúa el recorrido
          </span>

          <h2 className="mt-4 text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-none text-foreground">
            ¿Qué sigue en este camino?
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Descubre los cuyes de nuestra granja y acompaña todo el proceso de
            aprendizaje que documentamos durante este proyecto.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {cuyes.map((card) => (
            <CuyCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
