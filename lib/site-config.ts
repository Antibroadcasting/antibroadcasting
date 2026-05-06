// Developer / infrastructure config only.
// Editorial content (company info, contact, social, business rules, form options)
// lives in content/site-info.json and is accessed via lib/get-site-info.ts.

export const siteConfig = {
  // Website Configuration
  site: {
    url: "https://antibroadcasting.com",
    baseUrl: "https://antibroadcasting.com",
    domain: "antibroadcasting.com",
    title: {
      default: "Antibroadcasting Inc. — Minneapolis Screen Printing",
      template: "%s | Antibroadcasting Inc.",
    },
    description:
      "Artist-run screen printing shop in Minneapolis. Quality prints for bands, artists, and events. 50pc minimums, 7–10 day turnaround.",
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

  // SEO & Metadata
  seo: {
    keywords: [
      "screen printing",
      "minneapolis screen printing",
      "custom t-shirts",
      "band merch",
      "artist prints",
      "event merchandise",
      "custom apparel",
      "minnesota screen printing",
      "antibroadcasting",
    ],
    author: "Antibroadcasting Inc.",
    robots: "index, follow",
    googleVerification: "",
    bingVerification: "",
  },

  // Open Graph / Social Sharing
  openGraph: {
    type: "website",
    siteName: "Antibroadcasting Inc.",
    title: "Antibroadcasting Inc. — Minneapolis Screen Printing",
    description:
      "Artist-run screen printing shop in Minneapolis. Quality prints for bands, artists, and events. 50pc minimums, 7–10 day turnaround.",
    url: "https://antibroadcasting.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Antibroadcasting Inc. Screen Printing",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@antibroadcasting_inc",
    creator: "@antibroadcasting_inc",
  },

  // Content Categories (used for gallery/FAQ filter UI)
  categories: {
    gallery: [
      { label: "Band Merch", value: "band-merch" },
      { label: "Local Artist", value: "local-artist" },
      { label: "Event", value: "event" },
      { label: "Business", value: "business" },
    ],
    faq: [
      { label: "Pricing", value: "pricing" },
      { label: "Ordering", value: "ordering" },
      { label: "Art & Files", value: "art" },
      { label: "Turnaround", value: "turnaround" },
      { label: "Products & Inks", value: "products" },
      { label: "Payment", value: "payment" },
    ],
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
