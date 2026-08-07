import Navigation from "@/components/navigation/Navigation";
import { LearnProvider } from "@/features/aprende/LearnProvider";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <LearnProvider>
      <Navigation />

      <main className="min-h-screen bg-[#0A0A0A] text-white">
        {children}
      </main>
    </LearnProvider>
  );
}