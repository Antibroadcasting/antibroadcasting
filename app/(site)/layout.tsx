import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionProvider } from "@/components/layout/PageTransitionProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransitionProvider>
      <Header />
      <main
        id="main-content"
        className="flex flex-col min-h-screen md:min-h-[calc(100vh-4.5rem)] mt-18 p-4 md:p-6 lg:p-8 xl:p-12 bg-bg-base relative z-10"
      >
        {children}
      </main>
      <Footer />
      <ThemeToggle className="fixed bottom-4 right-4 z-50" />
    </PageTransitionProvider>
  );
}
