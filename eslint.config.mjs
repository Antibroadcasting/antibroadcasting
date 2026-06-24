import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // eslint-plugin-react's React-version auto-detection crashes under
    // ESLint 10 flat config (`contextOrFilename.getFilename is not a
    // function`, eslint-plugin-react@7.37.5). Setting the version
    // explicitly skips the broken auto-detect code path entirely.
    settings: { react: { version: "19.2.7" } },
  },
  {
    // Standalone CLI script, run directly with `node` (not bundled by
    // Next.js) — CommonJS `require()` is the correct module system here.
    files: ["scripts/**/*.js"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Static design-exploration mockups, never wired into app routing
    // (no page.tsx imports them) — not maintained as production code.
    "app/(site)/style-guide/prototype/**",
  ]),
]);

export default eslintConfig;
