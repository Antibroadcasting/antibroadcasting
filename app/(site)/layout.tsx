import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionProvider } from "@/components/layout/PageTransitionProvider";
import { getSiteInfo } from "@/lib/get-site-info";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteInfo = await getSiteInfo();

  return (
    <PageTransitionProvider>
      {/* Grain overlay — SVG noise texture, fixed, site-wide */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.28]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        }}
      />
      <Header siteInfo={siteInfo} />
      <main
        id="main-content"
        className="flex flex-col min-h-screen md:min-h-[calc(100vh-4.5rem)] mt-24 lg:mt-32 px-4 md:px-6 lg:px-8 xl:px-12 pb-0 bg-bg-base relative z-10"
      >
        {children}
      </main>
      <Footer siteInfo={siteInfo} />
    </PageTransitionProvider>
  );
}
