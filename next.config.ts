import type { NextConfig } from "next";

// Keystatic's admin UI (/keystatic) loads Google Fonts at runtime and
// previews newly-selected images via blob: URLs before upload — both need
// explicit CSP allowances, separate from the public site's own asset usage.
const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // 'unsafe-eval' is dev-only: React's dev-mode debugging tools (and
      // Turbopack's HMR) use eval(), but React never uses it in production.
      `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://avatars.githubusercontent.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://challenges.cloudflare.com https://api.github.com https://raw.githubusercontent.com",
      "frame-src https://challenges.cloudflare.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self' https://github.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Keystatic force-redirects localhost -> 127.0.0.1 for github/cloud
  // storage modes (keystatic-core-ui.js's RedirectToLoopback). Without this,
  // Next 16's dev server treats 127.0.0.1 as an untrusted origin and 403s
  // its own dev-tool endpoints (font proxy, HMR websocket) on every request
  // from it — breaks GitHub-mode local testing, not a production concern.
  allowedDevOrigins: ["127.0.0.1"],

  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },

  images: {
    remotePatterns: [
      // Instagram CDN — for when we pull in IG images
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.instagram.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      // Redirect old WordPress URLs to new structure
      { source: "/faq", destination: "/how-it-works", permanent: true },
      { source: "/faq/", destination: "/how-it-works", permanent: true },
      { source: "/art-requirements", destination: "/how-it-works", permanent: true },
      { source: "/art-requirements/", destination: "/how-it-works", permanent: true },
      { source: "/promos", destination: "/how-it-works", permanent: true },
      { source: "/promos/", destination: "/how-it-works", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/portfolio/", destination: "/portfolio", permanent: true },
    ];
  },
};

export default nextConfig;
