import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionProvider } from "@/components/layout/PageTransitionProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const figtreeSans = Figtree({
  variable: "--font-figtree-sans",
  subsets: ["latin"],
  display: "block",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "block",
  preload: true,
});

const dominique = localFont({
  src: "../public/fonts/Dominique-VF.woff2",
  variable: "--font-dominique",
  display: "block",
  preload: true,
});

export const metadata: Metadata = {
  title: siteConfig.site.title,
  description: siteConfig.site.description,
  metadataBase: new URL(siteConfig.site.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  var dark = t === 'dark' || (t !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (dark) document.documentElement.classList.add('dark');
                  document.documentElement.dataset.theme = t || 'system';
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${figtreeSans.variable} ${geistMono.variable} ${dominique.variable} antialiased`}
      >
        <PageTransitionProvider>
          <Header />
          <main
            id="main-content"
            className="flex flex-col min-h-screen md:min-h-[calc(100vh-8rem)] mt-24 md:mt-32 p-6 md:p-8 lg:p-10 xl:p-12 bg-bg-base relative z-10 border-b border-border-default"
          >
            {children}
          </main>
          <Footer />
          <ThemeToggle className="fixed bottom-4 right-4 z-50" />
        </PageTransitionProvider>
      </body>
    </html>
  );
}
