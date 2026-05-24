// Developer / infrastructure config only.
// Editorial content (company info, contact, social, SEO, business rules, form options)
// lives in content/site-info.json and is accessed via lib/get-site-info.ts.

export const siteConfig = {
  // Website Configuration
  site: {
    url: "https://antibroadcasting.com",
    baseUrl: "https://antibroadcasting.com",
    domain: "antibroadcasting.com",
    titleTemplate: "%s | Antibroadcasting Inc.",
    language: "en",
    locale: "en_US",
  },

  // Navigation — route definitions belong in code
  navigation: [
    { label: "Portfolio", href: "/portfolio" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  // Form server-side config (recipient address used by /api/send)
  forms: {
    quote: {
      recipientEmail: "info@antibroadcasting.com",
    },
  },

  // SEO — crawler directives and verification codes only; keywords/description live in Keystatic
  seo: {
    robots: "index, follow",
    googleVerification: "",
    bingVerification: "",
  },

  // Open Graph — structural config only; title/description/siteName live in Keystatic
  openGraph: {
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Antibroadcasting Inc. Screen Printing",
      },
    ],
  },

  // Twitter Card — structural config only; handle lives in Keystatic social fields
  twitter: {
    card: "summary_large_image",
  },

  // Typography
  fonts: {
    primary: "Figtree",
    mono: "Geist Mono",
    display: "Dominique",
  },

  // Analytics
  analytics: {
    googleAnalyticsId: "",
    googleTagManagerId: "",
    facebookPixelId: "",
  },

  // Legal
  legal: {
    privacyPolicyUrl: "/privacy",
    termsOfServiceUrl: "/terms",
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type NavigationItem = (typeof siteConfig.navigation)[0];
