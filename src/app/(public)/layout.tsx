import Navigation from "@/components/navigation/Navigation";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-[#0A0A0A] text-white">{children}</main>
    </>
  );
}
