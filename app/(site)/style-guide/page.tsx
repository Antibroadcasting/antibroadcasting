import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { FileUpload } from "@/components/ui/FileUpload";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
import {
  PhoneOutlined,
  MailOutlined,
  InstagramOutlined,
  FacebookOutlined,
  XOutlined,
} from "@ant-design/icons";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PALETTE_SCALES = [
  { name: "Primary — --color-primary", prefix: "--color-primary", shades: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: "Secondary — --color-secondary", prefix: "--color-secondary", shades: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: "Neutral — --color-neutral", prefix: "--color-neutral", shades: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
] as const;

const STATE_COLORS = ["accent", "muted", "success", "error", "warning", "destructive"] as const;
type StateColor = (typeof STATE_COLORS)[number];

const MOTION_DURATIONS = [
  { label: "Fast", class: "duration-150", ms: "150ms", use: "Micro-interactions, icon swaps" },
  { label: "Base", class: "duration-300", ms: "300ms", use: "Buttons, hover transitions" },
  { label: "Slow", class: "duration-500", ms: "500ms", use: "Page reveals, modals" },
  { label: "X-Slow", class: "duration-700", ms: "700ms", use: "Page transitions, hero sequences" },
];

const MOTION_EASINGS = [
  { label: "ease-in-out", class: "ease-in-out", value: "cubic-bezier(0.4, 0, 0.2, 1)", use: "Default — buttons, fills" },
  { label: "ease-out", class: "ease-out", value: "cubic-bezier(0, 0, 0.2, 1)", use: "Decelerate — elements entering" },
  { label: "ease-in", class: "ease-in", value: "cubic-bezier(0.4, 0, 1, 1)", use: "Accelerate — elements exiting" },
];

const SPACING_SCALE = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];

const SECTIONS = [
  { id: "typography", label: "01 · Typography" },
  { id: "colors", label: "02 · Colors" },
  { id: "motifs", label: "03 · Motifs" },
  { id: "motion", label: "04 · Motion" },
  { id: "components", label: "05 · Components" },
  { id: "tokens", label: "06 · Tokens" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-xs text-text-accent uppercase tracking-widest shrink-0">Index {n}</span>
        <span className="flex-1 h-px bg-foreground/10" />
        <RegistrationMark className="w-4 h-4 text-foreground/20 shrink-0" />
      </div>
      <h2 className="font-display font-black uppercase text-[clamp(2.5rem,6vw,5rem)] leading-[0.9]">
        {title}<span className="text-gold">.</span>
      </h2>
    </div>
  );
}

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-xs uppercase tracking-widest text-text-tertiary mb-4 pt-8 pb-2 border-b border-foreground/10">
      {children}
    </h3>
  );
}

function stateTokens(name: StateColor) {
  return {
    base: `--color-${name}`,
    text: `--color-${name}-text`,
    surface: `--color-${name}-surface`,
    border: `--color-${name}-border`,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StyleGuide() {
  return (
    <div className="w-full max-w-300 xl:max-w-360 2xl:max-w-400 mx-auto">

      {/* ── Cover ───────────────────────────────────────────────────────────── */}
      <header className="py-20 border-b border-foreground/10">
        <div className="flex items-center gap-3 mb-6">
          <RegistrationMark className="w-4 h-4 text-text-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
            Antibroadcasting Inc. · Design System · Catalog No. 2026-A
          </span>
        </div>
        <h1 className="font-display font-black uppercase leading-[0.85] text-[clamp(4rem,12vw,9rem)]">
          Style Guide<span className="text-gold">.</span>
        </h1>
        <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary mt-6">
          Internal Reference · Not User Facing
        </p>
      </header>

      {/* ── Anchor Nav ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-bg-base/95 backdrop-blur-sm border-b border-foreground/10 py-3 -mx-4 px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8 xl:-mx-12 xl:px-12">
        <div className="flex gap-6 overflow-x-auto scrollbar-none">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="font-mono text-xs uppercase tracking-widest text-text-tertiary hover:text-text-accent transition-colors whitespace-nowrap"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── 01 · Typography ─────────────────────────────────────────────────── */}
      <section id="typography" className="py-16 border-b border-foreground/10 scroll-mt-12">
        <SectionHead n="01" title="Typography" />

        <SubHead>Display — Dominique (font-display)</SubHead>
        <div className="space-y-2 font-display mb-8">
          {[
            { w: 900, label: "900 Black", size: "text-5xl" },
            { w: 700, label: "700 Bold", size: "text-4xl" },
            { w: 500, label: "500 Medium", size: "text-3xl" },
            { w: 400, label: "400 Regular", size: "text-2xl" },
          ].map(({ w, label, size }) => (
            <div key={w} className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-text-tertiary w-24 shrink-0">{label}</span>
              <p className={`${size} text-text-primary uppercase`} style={{ fontWeight: w }}>
                Custom Screen Printing
              </p>
            </div>
          ))}
        </div>

        <SubHead>Body — Figtree Sans (font-sans)</SubHead>
        <div className="space-y-3 mb-8">
          {[
            { label: "text-xl", size: "text-xl", w: 700, sample: "Large lead copy and subheadings" },
            { label: "text-lg", size: "text-lg", w: 400, sample: "Body copy — comfortable reading size" },
            { label: "text-base", size: "text-base", w: 400, sample: "Default UI text for labels and metadata" },
            { label: "text-sm", size: "text-sm", w: 400, sample: "Small print, captions, secondary info" },
          ].map(({ label, size, w, sample }) => (
            <div key={label} className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-text-tertiary w-24 shrink-0">{label}</span>
              <p className={`${size} text-text-secondary`} style={{ fontWeight: w }}>{sample}</p>
            </div>
          ))}
        </div>

        <SubHead>Mono — Geist Mono (font-mono)</SubHead>
        <div className="space-y-3 mb-8 font-mono">
          <div className="flex items-baseline gap-4">
            <span className="text-xs text-text-tertiary w-24 shrink-0">Eyebrow</span>
            <p className="text-xs uppercase tracking-widest text-text-tertiary">Est. Minneapolis · Artist-Run</p>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs text-text-tertiary w-24 shrink-0">Label</span>
            <p className="text-xs uppercase tracking-widest text-text-accent">Step 01 · Press Running</p>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs text-text-tertiary w-24 shrink-0">Code</span>
            <code className="text-sm text-text-primary px-2 py-1 bg-bg-elevated border border-border-subtle rounded">
              const turnaround = &apos;7-10 days&apos;;
            </code>
          </div>
        </div>

        <SubHead>Background Variance</SubHead>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { cls: "bg-bg-base", label: "bg-base", desc: "Page background" },
            { cls: "bg-bg-subtle", label: "bg-subtle", desc: "Subtle sections" },
            { cls: "bg-bg-elevated", label: "bg-elevated", desc: "Cards, popovers" },
            { cls: "bg-bg-inset", label: "bg-inset", desc: "Inset areas" },
            { cls: "bg-bg-inverse", label: "bg-inverse", desc: "Banners, footer" },
          ].map(({ cls, label, desc }) => (
            <div key={label} className={`${cls} rounded-card p-4 border border-border-subtle`}>
              <p className="text-sm font-mono font-medium text-text-primary">{label}</p>
              <p className="text-xs text-text-tertiary mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 02 · Colors ─────────────────────────────────────────────────────── */}
      <section id="colors" className="py-16 border-b border-foreground/10 scroll-mt-12">
        <SectionHead n="02" title="Colors" />

        {/* Palette scales */}
        {PALETTE_SCALES.map((scale) => (
          <div key={scale.name} className="mb-8">
            <SubHead>{scale.name}</SubHead>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {scale.shades.map((shade) => {
                const token = `${scale.prefix}-${shade}`;
                return (
                  <div key={shade}>
                    <div
                      className="h-12 rounded border border-border-subtle"
                      style={{ backgroundColor: `var(${token})` }}
                      title={token}
                    />
                    <p className="text-xs text-text-tertiary mt-1 text-center font-mono">{shade}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Fixed palette — ink / paper / gold */}
        <SubHead>Fixed Palette — Ink · Paper · Gold</SubHead>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "ink", token: "--color-ink", cls: "bg-ink" },
            { label: "paper", token: "--color-paper", cls: "bg-paper" },
            { label: "gold", token: "--color-gold", cls: "bg-gold" },
          ].map(({ label, token, cls }) => (
            <div key={label}>
              <div className={`${cls} h-16 rounded border border-border-subtle`} />
              <p className="font-mono text-xs text-text-secondary mt-1">{label}</p>
              <p className="font-mono text-xs text-text-tertiary">{token}</p>
            </div>
          ))}
        </div>

        {/* State colors */}
        <SubHead>State Colors</SubHead>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {STATE_COLORS.map((name) => {
            const t = stateTokens(name);
            return (
              <div key={name}>
                <div
                  className="h-12 rounded border border-border-subtle"
                  style={{ backgroundColor: `var(${t.base})` }}
                  title={t.base}
                />
                <p className="font-mono text-xs text-text-secondary mt-1 capitalize">{name}</p>
              </div>
            );
          })}
        </div>

        {/* Badges */}
        <SubHead>Badges — Semantic State</SubHead>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "Success", surface: "--color-success-surface", text: "--color-success-text", border: "--color-success-border" },
            { name: "Warning", surface: "--color-warning-surface", text: "--color-warning-text", border: "--color-warning-border" },
            { name: "Error", surface: "--color-error-surface", text: "--color-error-text", border: "--color-error-border" },
            { name: "Info", surface: "--color-accent-surface", text: "--color-accent-text", border: "--color-accent-border" },
            { name: "Muted", surface: "--color-muted-surface", text: "--color-muted-text", border: "--color-muted-border" },
            { name: "Destructive", surface: "--color-destructive-surface", text: "--color-destructive-text", border: "--color-destructive-border" },
          ].map(({ name, surface, text, border }) => (
            <span
              key={name}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase tracking-widest border rounded-button"
              style={{
                backgroundColor: `var(${surface})`,
                color: `var(${text})`,
                borderColor: `var(${border})`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `var(${text})` }} />
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ── 03 · Visual Motifs ──────────────────────────────────────────────── */}
      <section id="motifs" className="py-16 border-b border-foreground/10 scroll-mt-12">
        <SectionHead n="03" title="Visual Motifs" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Diagonal stripe */}
          <div>
            <SubHead>Diagonal Stripe</SubHead>
            <div className="relative h-32 bg-bg-elevated border border-border-subtle overflow-hidden rounded-card">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 8px, oklch(0% 0 0 / 0.15) 8px, oklch(0% 0 0 / 0.15) 9px)",
                }}
              />
            </div>
            <p className="font-mono text-xs text-text-tertiary mt-3">Used on: featured work cards, hero image overlay, CtaBand</p>
            <code className="block font-mono text-xs text-text-secondary mt-1 bg-bg-elevated border border-border-subtle p-2 rounded">
              repeating-linear-gradient(45deg, transparent 8px, oklch(0% 0 0 / .15) 9px)
            </code>
          </div>

          {/* Broadside dot (on gold) */}
          <div>
            <SubHead>Broadside Dot</SubHead>
            <div className="relative h-32 bg-gold overflow-hidden rounded-card">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(oklch(12% 0.008 40) 1px, transparent 1.4px)",
                  backgroundSize: "9px 9px",
                  opacity: 0.12,
                }}
              />
            </div>
            <p className="font-mono text-xs text-text-tertiary mt-3">Used on: CtaBand (gold surface)</p>
            <code className="block font-mono text-xs text-text-secondary mt-1 bg-bg-elevated border border-border-subtle p-2 rounded">
              radial-gradient(oklch(12% 0.008 40) 1px, transparent 1.4px) / 9px 9px · opacity 12%
            </code>
          </div>

          {/* Registration mark */}
          <div>
            <SubHead>Registration Mark</SubHead>
            <div className="flex items-center justify-around h-32 bg-bg-elevated border border-border-subtle rounded-card px-6">
              <div className="flex flex-col items-center gap-2">
                <RegistrationMark className="w-5 h-5 text-text-accent" />
                <span className="font-mono text-xs text-text-tertiary">gold · sm</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RegistrationMark className="w-8 h-8 text-foreground/30" />
                <span className="font-mono text-xs text-text-tertiary">muted · md</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RegistrationMark className="w-12 h-12 text-foreground/15" />
                <span className="font-mono text-xs text-text-tertiary">faint · lg</span>
              </div>
            </div>
            <p className="font-mono text-xs text-text-tertiary mt-3">Used on: step headers, footer bottom bar, hero image center, process section</p>
          </div>

          {/* Corner brackets */}
          <div>
            <SubHead>Corner Brackets</SubHead>
            <div className="relative h-32 bg-bg-elevated border border-border-subtle overflow-hidden rounded-card">
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-foreground/40" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-foreground/40" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-foreground/40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-foreground/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-xs text-text-tertiary uppercase tracking-widest">Framed Content</span>
              </div>
            </div>
            <p className="font-mono text-xs text-text-tertiary mt-3">Used on: hero image editorial overlay — 2px border, w-8/h-8</p>
          </div>

        </div>
      </section>

      {/* ── 04 · Motion ─────────────────────────────────────────────────────── */}
      <section id="motion" className="py-16 border-b border-foreground/10 scroll-mt-12">
        <SectionHead n="04" title="Motion" />

        <SubHead>Duration Scale</SubHead>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {MOTION_DURATIONS.map(({ label, class: cls, ms, use }) => (
            <div key={label} className="bg-bg-elevated border border-border-subtle rounded-card p-4">
              <p className="font-display font-black uppercase text-2xl text-text-primary">{ms}</p>
              <p className="font-mono text-xs text-text-accent uppercase tracking-widest mt-1">{cls}</p>
              <p className="text-xs text-text-tertiary mt-2 leading-relaxed">{use}</p>
            </div>
          ))}
        </div>

        <SubHead>Easing Functions</SubHead>
        <div className="space-y-3 mb-8">
          {MOTION_EASINGS.map(({ label, class: cls, value, use }) => (
            <div key={label} className="flex items-center gap-4 py-3 border-b border-foreground/10 last:border-0">
              <span className="font-mono text-xs text-text-accent uppercase tracking-widest w-32 shrink-0">{cls}</span>
              <span className="font-mono text-xs text-text-secondary flex-1 truncate">{value}</span>
              <span className="text-xs text-text-tertiary shrink-0 hidden sm:block">{use}</span>
            </div>
          ))}
        </div>

        <SubHead>Button Animation — Hover to preview</SubHead>
        <p className="text-sm text-text-tertiary mb-4">All button variants use <code className="font-mono text-xs bg-bg-elevated px-1 py-0.5 border border-border-subtle rounded">before:scale-y-0 → hover:before:scale-y-100</code> with 300ms ease-in-out.</p>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Wipe</Button>
          <Button variant="outline">Outline Fill</Button>
          <Button variant="ghost">Ghost Fill</Button>
        </div>
      </section>

      {/* ── 05 · Components ─────────────────────────────────────────────────── */}
      <section id="components" className="py-16 border-b border-foreground/10 scroll-mt-12">
        <SectionHead n="05" title="Components" />

        {/* Buttons */}
        <SubHead>Button — Variants</SubHead>
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="neutral">Neutral</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>

        <SubHead>Button — Sizes</SubHead>
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>

        {/* Forms */}
        <SubHead>Form Elements</SubHead>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mb-8">
          <Input label="Text Input" placeholder="Enter text..." />
          <Input label="Email" type="email" placeholder="email@example.com" required />
          <Input label="Error State" placeholder="Invalid" error="This field has an error" />
          <Select
            label="Select"
            placeholder="Choose..."
            options={[
              { value: "t-shirt", label: "T-Shirt" },
              { value: "hoodie", label: "Hoodie" },
              { value: "tank", label: "Tank Top" },
            ]}
          />
          <div className="sm:col-span-2">
            <Textarea label="Message" placeholder="Tell us about your project..." rows={3} />
          </div>
          <div className="sm:col-span-2">
            <FileUpload label="Artwork Files" accept=".ai,.psd,.pdf,.png,.jpg" multiple maxSize={10 * 1024 * 1024} />
          </div>
        </div>

        {/* Cards */}
        <SubHead>Cards</SubHead>
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-card-surface rounded-card p-6 border border-card-border">
            <h4 className="font-display font-black uppercase text-card-text text-lg mb-2">Standard</h4>
            <p className="text-card-text text-sm leading-relaxed opacity-70">
              card-surface + card-border + card-text tokens.
            </p>
          </div>
          <div className="bg-card-surface-inverse rounded-card p-6">
            <h4 className="font-display font-black uppercase text-card-text-inverse text-lg mb-2">Inverse</h4>
            <p className="text-card-text-inverse-muted text-sm leading-relaxed">
              card-surface-inverse + card-text-inverse tokens.
            </p>
          </div>
          <div className="bg-card-surface-tonal rounded-card p-6 border border-card-border-tonal">
            <h4 className="font-display font-black uppercase text-card-text-tonal text-lg mb-2">Tonal</h4>
            <p className="text-card-text-tonal-muted text-sm leading-relaxed">
              card-surface-tonal + card-border-tonal tokens.
            </p>
          </div>
        </div>

        {/* Icons */}
        <SubHead>Icons — Ant Design</SubHead>
        <div className="flex flex-wrap gap-6">
          {[
            { icon: <PhoneOutlined />, name: "PhoneOutlined" },
            { icon: <MailOutlined />, name: "MailOutlined" },
            { icon: <InstagramOutlined />, name: "InstagramOutlined" },
            { icon: <FacebookOutlined />, name: "FacebookOutlined" },
            { icon: <XOutlined />, name: "XOutlined" },
          ].map(({ icon, name }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className="text-xl text-text-secondary">{icon}</div>
              <span className="font-mono text-xs text-text-tertiary">{name}</span>
            </div>
          ))}
        </div>

        {/* Spacing */}
        <SubHead>Spacing Scale</SubHead>
        <div className="flex flex-wrap items-end gap-2">
          {SPACING_SCALE.map((n) => (
            <div key={n} className="flex flex-col items-center gap-1">
              <div className="bg-gold/60" style={{ width: `${n * 4}px`, height: `${n * 4}px`, minWidth: "4px" }} />
              <span className="font-mono text-xs text-text-tertiary">{n}</span>
            </div>
          ))}
        </div>

        {/* Radius */}
        <SubHead>Border Radius</SubHead>
        <div className="flex flex-wrap gap-6 items-end">
          {[
            { label: "rounded-button", cls: "rounded-button" },
            { label: "rounded-card", cls: "rounded-card" },
            { label: "rounded-input", cls: "rounded-input" },
            { label: "rounded-full", cls: "rounded-full" },
          ].map(({ label, cls }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className={`w-16 h-16 bg-bg-elevated border-2 border-gold/40 ${cls}`} />
              <span className="font-mono text-xs text-text-tertiary text-center">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 06 · Tokens ─────────────────────────────────────────────────────── */}
      <section id="tokens" className="py-16 scroll-mt-12">
        <SectionHead n="06" title="Design Tokens" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
          {[
            {
              title: "Typography",
              items: ["--font-sans (Figtree)", "--font-display (Dominique)", "--font-mono (Geist Mono)"],
            },
            {
              title: "Button",
              items: [
                "--button-primary-surface / -hover / -active",
                "--button-primary-text / -hover",
                "--button-outline-surface / -hover / -active",
                "--button-outline-text / -hover",
                "--button-outline-border / -hover",
                "--button-secondary / neutral / destructive",
              ],
            },
            {
              title: "Form",
              items: [
                "--input-surface",
                "--input-border / -hover / -focus",
                "--input-text / -placeholder",
                "--input-ring-focus / -error",
                "--label-text",
              ],
            },
            {
              title: "Card",
              items: [
                "--card-surface / -inverse / -tonal",
                "--card-border / -tonal",
                "--card-text / -inverse / -tonal",
                "--card-text-inverse-muted",
                "--card-text-tonal-muted",
              ],
            },
            {
              title: "Background",
              items: ["--bg-subtle", "--bg-elevated", "--bg-inset", "--bg-inverse"],
            },
            {
              title: "Text",
              items: ["--text-secondary", "--text-tertiary", "--text-inverse", "--text-on-inverse-muted"],
            },
            {
              title: "Border",
              items: ["--border-default", "--border-subtle", "--border-strong", "--border-inverse"],
            },
            {
              title: "Radius",
              items: ["--radius-button", "--radius-card", "--radius-input"],
            },
            {
              title: "State Colors",
              items: [
                "--color-{state} (base)",
                "--color-{state}-text",
                "--color-{state}-surface",
                "--color-{state}-border",
                "States: success · warning · error · accent · muted · destructive",
              ],
            },
          ].map(({ title, items }) => (
            <div key={title}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-text-accent mb-3">{title}</h3>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item} className="font-mono text-xs text-text-secondary">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
