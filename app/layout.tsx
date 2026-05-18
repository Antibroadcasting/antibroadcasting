import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
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
  title: siteConfig.site.title, // already { default, template } from site-config
  description: siteConfig.site.description,
  metadataBase: new URL(siteConfig.site.url),
  keywords: [...siteConfig.seo.keywords],
  alternates: {
    canonical: siteConfig.site.url,
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.openGraph.siteName,
    title: siteConfig.openGraph.title,
    description: siteConfig.openGraph.description,
    url: siteConfig.openGraph.url,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitter.site,
    creator: siteConfig.twitter.creator,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Plain inline script — render-blocking by spec, so the correct theme
            class is always on <html> before the browser paints a single pixel.
            next/script "beforeInteractive" is NOT equivalent in the App Router. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var light=t==='light'||(t!=='dark'&&window.matchMedia('(prefers-color-scheme: light)').matches);if(light)document.documentElement.classList.add('light');document.documentElement.dataset.theme=t||'system';}catch(_){}})();`,
          }}
        />
      </head>
      <body
        className={`${figtreeSans.variable} ${geistMono.variable} ${dominique.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
