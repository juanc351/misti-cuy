import Navigation from "@/components/navigation/Navigation";
import MisCuyesModule from "@/features/mis-cuyes/MisCuyesPage";

export default async function MisCuyesPage() {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-[#0A0A0A] pt-[126px] text-white">
        <MisCuyesModule />
      </main>
    </>
  );
}