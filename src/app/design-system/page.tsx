"use client";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import Radio, { RadioGroup } from "@/components/ui/Radio";
import Switch from "@/components/ui/Switch";

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-12 p-10">
      <h1 className="text-4xl font-bold">Misti Cuy Design System</h1>

      {/* INPUT */}

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Input</h2>

        <Input label="Default" placeholder="Escribe aquí..." />

        <Input label="Disabled" placeholder="Deshabilitado" disabled />

        <Input
          label="Error"
          placeholder="Campo obligatorio"
          invalid
          errorMessage="Este campo es obligatorio."
        />

        <Input label="Success" placeholder="Correcto" success />
      </section>

      {/* TEXTAREA */}

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Textarea</h2>

        <Textarea label="Comentario" placeholder="Escribe un comentario..." />

        <Textarea
          label="Error"
          invalid
          errorMessage="Este campo es obligatorio."
        />
      </section>

      {/* SELECT */}

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Select</h2>

        <Select label="Categoría" defaultValue="">
          <option value="" disabled>
            Seleccione...
          </option>

          <option value="peru">Cuy Perú</option>

          <option value="andina">Cuy Andina</option>

          <option value="inti">Cuy Inti</option>
        </Select>
      </section>

      {/* CHECKBOX */}

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Checkbox</h2>

        <Checkbox label="Acepto los términos y condiciones" />

        <Checkbox label="Seleccionado" checked readOnly />

        <Checkbox label="Deshabilitado" disabled />
      </section>

      {/* RADIO */}

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Radio</h2>

        <RadioGroup name="sexo" defaultValue="m">
          <Radio value="m" label="Macho" />

          <Radio value="h" label="Hembra" />
        </RadioGroup>
      </section>

      {/* SWITCH */}

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Switch</h2>

        <Switch label="Disponible" />

        <Switch label="Activado" checked readOnly />

        <Switch label="Deshabilitado" disabled />
      </section>
    </main>
  );
}
