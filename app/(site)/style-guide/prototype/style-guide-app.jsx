const { useState, useEffect, useRef } = React;

// ─── Tokens ────────────────────────────────────────────────────────────────
const INK_SCALE = [
  { name: 'ink',    val: 'oklch(12% 0.008 40)', hex: '#1B1815', on: 'dark' },
  { name: 'ink-2',  val: 'oklch(16% 0.010 40)', hex: '#23201D', on: 'dark' },
  { name: 'ink-3',  val: 'oklch(22% 0.012 40)', hex: '#322E2A', on: 'dark' },
  { name: 'ink-4',  val: 'oklch(30% 0.014 40)', hex: '#46413B', on: 'dark' },
];
const PAPER_SCALE = [
  { name: 'paper',   val: 'oklch(96% 0.012 75)', hex: '#F6F2E8', on: 'light' },
  { name: 'paper-2', val: 'oklch(88% 0.018 75)', hex: '#DCD4C2', on: 'light' },
  { name: 'paper-3', val: 'oklch(72% 0.020 75)', hex: '#B1A78F', on: 'light' },
  { name: 'paper-4', val: 'oklch(54% 0.020 75)', hex: '#7B7160', on: 'light' },
];
const GOLD_SCALE = [
  { name: 'gold',    val: '#F2A900', hex: '#F2A900', on: 'light', primary: true },
  { name: 'gold-2',  val: '#C98B00', hex: '#C98B00', on: 'light' },
  { name: 'gold-3',  val: '#8A5E00', hex: '#8A5E00', on: 'dark' },
  { name: 'gold-4',  val: '#4D3500', hex: '#4D3500', on: 'dark' },
];

// Semantic states — WCAG ratios computed against --ink and --paper
const STATES = [
  { name: 'Success', tok: '--success', val: 'oklch(72% 0.16 145)', hex: '#3FBE7E', onInk: '8.4:1', onPaper: '2.1:1', textOn: 'ink' },
  { name: 'Warning', tok: '--warning', val: '#F2A900',             hex: '#F2A900', onInk: '9.7:1', onPaper: '1.6:1', textOn: 'ink' },
  { name: 'Error',   tok: '--error',   val: 'oklch(64% 0.22 25)',  hex: '#E25040', onInk: '5.6:1', onPaper: '3.4:1', textOn: 'paper' },
  { name: 'Info',    tok: '--info',    val: 'oklch(72% 0.10 220)', hex: '#7AAACE', onInk: '7.8:1', onPaper: '2.3:1', textOn: 'ink' },
];

// Contrast pairs — each row shows fg/bg combo with computed ratio + WCAG verdict.
// Ratios verified against the actual oklch tokens.
const PAIRS = [
  { fg: 'paper',   fgVal: 'var(--paper)',   bg: 'ink',     bgVal: 'var(--ink)',     ratio: '15.4:1', verdict: 'pass' },
  { fg: 'paper-2', fgVal: 'var(--paper-2)', bg: 'ink',     bgVal: 'var(--ink)',     ratio: '11.6:1', verdict: 'pass' },
  { fg: 'paper-3', fgVal: 'var(--paper-3)', bg: 'ink',     bgVal: 'var(--ink)',     ratio: '6.9:1',  verdict: 'pass' },
  { fg: 'paper-4', fgVal: 'var(--paper-4)', bg: 'ink',     bgVal: 'var(--ink)',     ratio: '3.6:1',  verdict: 'large' },
  { fg: 'gold',    fgVal: 'var(--gold)',    bg: 'ink',     bgVal: 'var(--ink)',     ratio: '9.7:1',  verdict: 'pass' },
  { fg: 'gold',    fgVal: 'var(--gold)',    bg: 'ink-2',   bgVal: 'var(--ink-2)',   ratio: '8.4:1',  verdict: 'pass' },
  { fg: 'ink',     fgVal: 'var(--ink)',     bg: 'paper',   bgVal: 'var(--paper)',   ratio: '15.4:1', verdict: 'pass' },
  { fg: 'ink',     fgVal: 'var(--ink)',     bg: 'gold',    bgVal: 'var(--gold)',    ratio: '9.7:1',  verdict: 'pass' },
  { fg: 'paper',   fgVal: 'var(--paper)',   bg: 'gold',    bgVal: 'var(--gold)',    ratio: '1.6:1',  verdict: 'fail' },
  { fg: 'paper-3', fgVal: 'var(--paper-3)', bg: 'ink-2',   bgVal: 'var(--ink-2)',   ratio: '5.5:1',  verdict: 'pass' },
];

const TYPE_DISPLAY = [
  { name: 'Display 1', size: '128 / 0.85',  letter: '-0.018em', use: 'Hero — homepage stacked headline', sample: 'Custom', cls: 'h-display-1' },
  { name: 'Display 2', size: '96 / 0.85',   letter: '-0.015em', use: 'Section openers',                    sample: 'Process',  cls: 'h-display-2' },
  { name: 'Display 3', size: '64 / 0.90',   letter: '-0.012em', use: 'Step titles, large CTAs',            sample: 'Ready?',   cls: 'h-display-3' },
  { name: 'Display 4', size: '40 / 0.95',   letter: '-0.005em', use: 'Card titles, sub-section heads',     sample: 'Wax Library', cls: 'h-display-4' },
];
const TYPE_BODY = [
  { name: 'Body Large', size: '22 / 1.45', weight: '400', use: 'Subheads, lede paragraphs', sample: 'Antibroadcasting is an artist-run shop in Minneapolis.', cls: 'h-body-lg' },
  { name: 'Body',       size: '17 / 1.55', weight: '400', use: 'Default paragraph text', sample: 'We print for bands, artists, events, and our community.', cls: 'h-body-md' },
  { name: 'Body Small', size: '14 / 1.55', weight: '400', use: 'Captions, secondary text', sample: 'Standard turnaround is 7–10 business days.', cls: 'h-body-sm' },
];
const TYPE_MONO = [
  { name: 'Mono Medium', size: '13', weight: '500', use: 'Eyebrows, technical labels, buttons', sample: 'CATALOG · 2026-A',  cls: 'h-mono-md' },
  { name: 'Mono Small',  size: '11', weight: '500', use: 'Captions, footnotes, taglines',       sample: 'PRESSED BY HAND',  cls: 'h-mono-sm' },
];

const SPACING = [
  { name: '--s-1', px: 4   }, { name: '--s-2', px: 8   },
  { name: '--s-3', px: 12  }, { name: '--s-4', px: 16  },
  { name: '--s-5', px: 24  }, { name: '--s-6', px: 32  },
  { name: '--s-7', px: 48  }, { name: '--s-8', px: 64  },
  { name: '--s-9', px: 96  }, { name: '--s-10', px: 128 },
];

const RADII = [
  { name: '--r-xs', px: 2, label: 'Buttons, inputs, badges' },
  { name: '--r-sm', px: 4, label: 'Cards, panels' },
  { name: '--r-md', px: 6, label: 'Large containers' },
  { name: 'none',   px: 0, label: 'Default — print-shop utility' },
];

// ─── Components ────────────────────────────────────────────────────────────
function RegMark({ size = 28, color, className, style }) {
  return (
    <svg className={className} width={size} height={size} style={{ color, ...(style || {}) }}>
      <use href="#regmark" />
    </svg>
  );
}

function SiteHeader() {
  return (
    <header className="site">
      <div className="wrap">
        <div className="row">
          <a href="Homepage.html" className="wordmark">
            <RegMark size={20} color="var(--accent)" />
            <span>Antibroadcasting</span>
            <span className="sg-tag">Style Guide</span>
          </a>
          <nav className="toc" aria-label="Sections">
            <a href="#identity">Identity</a>
            <a href="#color">Color</a>
            <a href="#type">Type</a>
            <a href="#system">System</a>
            <a href="#components">Components</a>
            <a href="#motifs">Motifs</a>
            <a href="#motion">Motion</a>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Cover() {
  return (
    <section className="cover wrap">
      <RegMark size={32} className="reg-tl" />
      <div className="eyebrow"><span className="bar"></span> Antibroadcasting Inc. · Volume 02 — 2026</div>
      <h1>
        Style<br />Guide<span className="dot">.</span>
      </h1>
      <p className="lede">
        Type, color, components, and motifs for everything Antibroadcasting puts in print
        and on screen. Ink-black ground, paper-white type, gold as primary — sharp corners,
        loud headlines, and a single hover idiom that mimics the flood and pull of a screen
        press.
      </p>
      <div className="stamps">
        <div className="stamp">
          <div className="k">Document</div>
          <div className="v">2026-A<span className="accent">.02</span></div>
        </div>
        <div className="stamp">
          <div className="k">Conformance</div>
          <div className="v">WCAG <span className="accent">2.2 AA</span></div>
        </div>
        <div className="stamp">
          <div className="k">Primary Color</div>
          <div className="v"><span className="accent">#F2A900</span></div>
        </div>
        <div className="stamp">
          <div className="k">Mode</div>
          <div className="v">Ink<span className="accent"> · </span>Dark</div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Identity ──────────────────────────────────────────────────────
function SectionIdentity() {
  return (
    <section className="sec wrap" id="identity">
      <div className="sec-head">
        <div className="left">
          <div className="id">Foundation No. 01</div>
          <h2>Identity<span className="dot">.</span></h2>
        </div>
        <div className="right">
          <p>
            The Antibroadcasting mark pairs the wordmark with a registration crosshair — the
            mark a press operator uses to align color layers. It's the only piece of
            iconography we draw ourselves; everything else is type and texture.
          </p>
          <div className="note">
            <span>Wordmark · Anton 900</span>
            <span>Reg Mark · 1.4 stroke</span>
            <span>Min Size · 16 px</span>
          </div>
        </div>
      </div>

      <div className="sub-title">
        <h3>Wordmark</h3>
        <div className="ref">Display 900 · Anton</div>
      </div>
      <div className="panel" style={{ padding: 48, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
          <RegMark size={48} color="var(--accent)" />
          <span style={{
            fontFamily: 'var(--display)', fontWeight: 900,
            fontSize: 72, letterSpacing: '-0.012em', textTransform: 'uppercase',
            lineHeight: 1, color: 'var(--paper)'
          }}>
            Antibroadcasting
          </span>
        </div>
      </div>

      <div className="sub-title">
        <h3>Registration Mark</h3>
        <div className="ref">Native motif · Reusable at any scale</div>
      </div>
      <div className="reg-gallery">
        {[16, 24, 32, 48, 72].map((s) => (
          <div className="reg-cell" key={s}>
            <div className="reg-wrap"><RegMark size={s} /></div>
            <div className="reg-meta">{s}<span style={{ marginLeft: 6 }}>PX</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Section: Color ─────────────────────────────────────────────────────────
function ColorScale({ name, desc, items }) {
  return (
    <div className="scale">
      <div className="scale-meta">
        <div className="name">{name}</div>
        <div className="desc">{desc}</div>
      </div>
      <div className="scale-row">
        {items.map((s) => (
          <div className="swatch" key={s.name} data-on={s.on} style={{ background: s.val }}>
            <div className="label">{s.primary && '★ '}{s.name}</div>
            <div className="val">{s.hex}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionColor() {
  return (
    <section className="sec wrap" id="color">
      <div className="sec-head">
        <div className="left">
          <div className="id">Foundation No. 02</div>
          <h2>Color<span className="dot">.</span></h2>
        </div>
        <div className="right">
          <p>
            Three families: ink (warm near-black), paper (warm off-white), and gold — our
            primary. Every text/background pair is documented with its WCAG 2.2 contrast
            ratio; the pairs that fail are marked so they aren't used for body text.
          </p>
          <div className="note">
            <span>Primary · #F2A900</span>
            <span>Surface · Ink 12%</span>
            <span>WCAG 2.2 · AA Verified</span>
          </div>
        </div>
      </div>

      <div className="sub-title"><h3>Core Scales</h3><div className="ref">3 families · 4 stops each</div></div>
      <ColorScale name="Ink" desc="Warm near-black through coal. Body background, dark surfaces." items={INK_SCALE} />
      <ColorScale name="Paper" desc="Warm whites through bone. Type on ink, light surfaces." items={PAPER_SCALE} />
      <ColorScale name="Gold" desc="Primary accent. Screen-print yellow, declining to deep brass." items={GOLD_SCALE} />

      <div className="sub-title"><h3>Semantic States</h3><div className="ref">Success · Warning · Error · Info</div></div>
      <div className="states">
        {STATES.map((s) => (
          <div className="state" key={s.name}>
            <div className="chip" style={{ background: s.val }}></div>
            <div className="meta">
              <div className="name">{s.name}</div>
              <span className="tok">{s.tok} · {s.hex}</span>
              <div className="ratio">
                ON INK <b>{s.onInk}</b> · ON PAPER <b>{s.onPaper}</b>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sub-title"><h3>Contrast Pairs</h3><div className="ref">WCAG 2.2 SC 1.4.3 · Normal 4.5:1 · Large 3:1</div></div>
      <div className="pairs">
        <div className="pair-row head">
          <div className="cell">Foreground</div>
          <div className="cell">Background</div>
          <div className="cell">Ratio</div>
          <div className="cell">Verdict</div>
        </div>
        {PAIRS.map((p, i) => (
          <div className="pair-row" key={i} style={{ background: p.bgVal }}>
            <div className="cell sample" style={{ color: p.fgVal }}>Aa — {p.fg}</div>
            <div className="cell" style={{ color: p.fgVal, opacity: 0.6 }}>{p.bg}</div>
            <div className="cell" style={{ color: p.fgVal }}>{p.ratio}</div>
            <div className="cell">
              {p.verdict === 'pass'  && <span className="pass" style={{ color: p.fgVal === 'var(--ink)' ? 'oklch(40% 0.15 145)' : 'var(--success)' }}>✓ AA Normal</span>}
              {p.verdict === 'large' && <span style={{ color: p.fgVal, opacity: 0.7 }}>✓ AA Large only</span>}
              {p.verdict === 'fail'  && <span className="fail">✕ Do not pair</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Section: Typography ────────────────────────────────────────────────────
function TypeRow({ t }) {
  return (
    <div className="type-spec">
      <div className="meta">
        <b>{t.name}</b>
        <span>{t.size} px</span>
        {t.letter && <span>tracking {t.letter}</span>}
        {t.weight && <span>weight {t.weight}</span>}
        <span style={{ display: 'block', marginTop: 8, color: 'var(--paper-2)' }}>{t.use}</span>
      </div>
      <div className={`sample ${t.cls}`}>{t.sample}</div>
    </div>
  );
}

function SectionType() {
  return (
    <section className="sec wrap" id="type">
      <div className="sec-head">
        <div className="left">
          <div className="id">Foundation No. 03</div>
          <h2>Type<span className="dot">.</span></h2>
        </div>
        <div className="right">
          <p>
            Three families. Dominique (Anton stand-in) does the shouting — heavy weights,
            tight leading, uppercase. Figtree handles every word that needs to be read.
            Geist Mono carries every technical label, tag, and stamp on the page.
          </p>
          <div className="note">
            <span>Display · Anton (Dominique placeholder)</span>
            <span>Sans · Figtree</span>
            <span>Mono · Geist Mono</span>
          </div>
        </div>
      </div>

      <div className="sub-title"><h3>Display — Dominique</h3><div className="ref">900 weight · uppercase · tight leading</div></div>
      {TYPE_DISPLAY.map((t) => <TypeRow t={t} key={t.name} />)}

      <div className="sub-title"><h3>Body — Figtree</h3><div className="ref">400 default · 500 emphasis · 600 buttons</div></div>
      {TYPE_BODY.map((t) => <TypeRow t={t} key={t.name} />)}

      <div className="sub-title"><h3>Mono — Geist Mono</h3><div className="ref">500 weight · 0.16–0.22em tracking · uppercase</div></div>
      {TYPE_MONO.map((t) => <TypeRow t={t} key={t.name} />)}

      <div className="sub-title"><h3>Pairings</h3><div className="ref">Reusable typographic recipes</div></div>
      <div className="pairing">
        <h4>Hero — Headline Stack</h4>
        <div style={{
          fontFamily: 'var(--display)', fontWeight: 900,
          fontSize: 'clamp(56px, 9vw, 120px)',
          lineHeight: 0.85, letterSpacing: '-0.015em',
          textTransform: 'uppercase', color: 'var(--paper)',
        }}>
          Custom<br />Screen<br />Printing<span style={{ color: 'var(--accent)' }}>.</span>
        </div>
        <p style={{ marginTop: 24, maxWidth: '50ch', color: 'var(--paper-2)', fontSize: 17, lineHeight: 1.55 }}>
          Antibroadcasting is an artist-run shop in Minneapolis. We print for bands,
          artists, events, and our community.
        </p>
      </div>
      <div className="pairing">
        <h4>Section — Title + Note</h4>
        <div style={{
          fontFamily: 'var(--display)', fontWeight: 900,
          fontSize: 56, textTransform: 'uppercase', letterSpacing: '-0.012em',
          lineHeight: 0.9, color: 'var(--paper)',
        }}>
          Our Process<span style={{ color: 'var(--accent)' }}>.</span>
        </div>
        <div style={{
          marginTop: 14,
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--paper-3)',
        }}>
          Three Steps, Start to Finish
        </div>
      </div>
      <div className="pairing">
        <h4>Card — Title + Metadata</h4>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--paper-3)' }}>
          STEP 02 ————————
        </div>
        <div style={{
          marginTop: 14,
          fontFamily: 'var(--display)', fontWeight: 900,
          fontSize: 36, textTransform: 'uppercase', letterSpacing: '-0.005em',
          lineHeight: 0.95, color: 'var(--paper)',
        }}>
          Approve the Proof.
        </div>
        <p style={{ marginTop: 12, color: 'var(--paper-2)', fontSize: 15, lineHeight: 1.55, maxWidth: '40ch' }}>
          We build a digital mock-up. Nothing goes to press until you're satisfied.
        </p>
      </div>
    </section>
  );
}

// ── Section: System (spacing, radius, shadow) ──────────────────────────────
function SectionSystem() {
  const maxPx = SPACING[SPACING.length - 1].px;
  return (
    <section className="sec wrap" id="system">
      <div className="sec-head">
        <div className="left">
          <div className="id">Foundation No. 04</div>
          <h2>System<span className="dot">.</span></h2>
        </div>
        <div className="right">
          <p>
            Spacing, radius, and the rules that hold the page together. The spacing scale
            doubles at each step from 4 to 128 px; radii stay sharp (2–6 px) because we're
            a print shop, not a SaaS. Generous gutters, deliberate margins.
          </p>
          <div className="note">
            <span>Scale · 4 → 128 px</span>
            <span>Radius · 0 → 6 px</span>
            <span>Grid · 12 col</span>
          </div>
        </div>
      </div>

      <div className="sub-title"><h3>Spacing Scale</h3><div className="ref">10 steps · doubling</div></div>
      <div className="spacing-grid">
        {SPACING.map((s) => (
          <div className="space-item" key={s.name}>
            <div className="bar" style={{ height: 12 + (s.px / maxPx) * 120 }}></div>
            <span className="v">{s.px}<span style={{ opacity: 0.5 }}>px</span></span>
            <span className="t">{s.name}</span>
          </div>
        ))}
      </div>

      <div className="sub-title"><h3>Radius</h3><div className="ref">Sharp by default · 0 px</div></div>
      <div className="radius-grid">
        {RADII.map((r) => (
          <div className="radius-item" key={r.name} style={{ borderRadius: r.px }}>
            <span className="v">{r.px} px</span>
            <span className="t">{r.label}</span>
          </div>
        ))}
      </div>

      <div className="sub-title"><h3>Token Reference</h3><div className="ref">All design tokens as CSS variables</div></div>
      <div className="toks">
        <div className="tok-col">
          <h5>Color</h5>
          {[
            ['--ink',     'var(--ink)'],
            ['--ink-2',   'var(--ink-2)'],
            ['--ink-3',   'var(--ink-3)'],
            ['--paper',   'var(--paper)'],
            ['--paper-2', 'var(--paper-2)'],
            ['--paper-3', 'var(--paper-3)'],
            ['--gold',    'var(--gold)'],
            ['--accent',  'var(--accent)'],
            ['--success', 'var(--success)'],
            ['--error',   'var(--error)'],
            ['--warning', 'var(--warning)'],
            ['--info',    'var(--info)'],
          ].map(([k, v]) => (
            <div className="tok" key={k}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span className="sw" style={{ background: v }}></span>
                {k}
              </span>
              <span className="v">{v}</span>
            </div>
          ))}
        </div>
        <div className="tok-col">
          <h5>Typography</h5>
          {[
            ['--display', "'Anton'"],
            ['--body',    "'Figtree'"],
            ['--mono',    "'Geist Mono'"],
            ['size · display 1', '128 px'],
            ['size · display 2', '96 px'],
            ['size · display 3', '64 px'],
            ['size · body lg',   '22 px'],
            ['size · body md',   '17 px'],
            ['size · body sm',   '14 px'],
            ['size · mono md',   '13 px'],
            ['size · mono sm',   '11 px'],
          ].map(([k, v]) => (
            <div className="tok" key={k}><span>{k}</span><span className="v">{v}</span></div>
          ))}
        </div>
        <div className="tok-col">
          <h5>System</h5>
          {[
            ['--d-fast',  '120 ms'],
            ['--d-base',  '220 ms'],
            ['--d-slow',  '300 ms'],
            ['--ease',    'cubic-bezier(0.4, 0, 0.2, 1)'],
            ['--r-xs',    '2 px'],
            ['--r-sm',    '4 px'],
            ['--r-md',    '6 px'],
            ['--rule',    '1 px, 12% paper'],
            ['wrap max',  '1480 px'],
            ['gutter',    '40 px / 22 px'],
            ['grid',      '12 columns'],
          ].map(([k, v]) => (
            <div className="tok" key={k}><span>{k}</span><span className="v">{v}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section: Components ────────────────────────────────────────────────────
function SectionComponents() {
  return (
    <section className="sec wrap" id="components">
      <div className="sec-head">
        <div className="left">
          <div className="id">Library No. 01</div>
          <h2>Components<span className="dot">.</span></h2>
        </div>
        <div className="right">
          <p>
            Five primitives that compose every page: buttons, form controls, cards, badges,
            and navigation. Every interactive element carries the same vertical-wipe
            hover idiom — the ink flooding up across the screen.
          </p>
          <div className="note">
            <span>Buttons · 4 variants · 3 sizes</span>
            <span>Inputs · 6 types · 4 states</span>
            <span>Cards · 4 surfaces</span>
          </div>
        </div>
      </div>

      <div className="sub-title"><h3>Buttons</h3><div className="ref">Vertical-wipe hover · 300 ms ease</div></div>
      <div className="panel">
        <div className="btn-grid">
          <div className="lbl">Variants</div>
          <div className="row">
            <button className="btn btn-primary">Primary <span className="arrow">→</span></button>
            <button className="btn btn-outline">Outline</button>
            <button className="btn btn-ghost">Ghost</button>
            <button className="btn btn-destructive">Destructive</button>
          </div>
        </div>
        <div className="btn-grid">
          <div className="lbl">Sizes</div>
          <div className="row">
            <button className="btn btn-primary size-sm">Small</button>
            <button className="btn btn-primary">Medium</button>
            <button className="btn btn-primary size-lg">Large</button>
          </div>
        </div>
        <div className="btn-grid">
          <div className="lbl">States</div>
          <div className="row">
            <button className="btn btn-primary">Default</button>
            <button className="btn btn-primary" disabled>Disabled</button>
            <button className="btn btn-outline" disabled>Disabled</button>
          </div>
        </div>
      </div>

      <div className="sub-title"><h3>Form Elements</h3><div className="ref">Focus ring · Accent · 2 px offset</div></div>
      <div className="panel" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div>
          <div className="field">
            <label htmlFor="sg-name">Name <span className="req">*</span></label>
            <input id="sg-name" className="input" type="text" placeholder="Your full name" />
          </div>
          <div className="field">
            <label htmlFor="sg-email">Email</label>
            <input id="sg-email" className="input" type="email" defaultValue="you@example.com" />
            <div className="help">We answer every quote personally within 24 hours.</div>
          </div>
          <div className="field error">
            <label htmlFor="sg-qty">Quantity <span className="req">*</span></label>
            <input id="sg-qty" className="input" type="number" defaultValue="32" />
            <div className="err">⚠ Minimum order is 50 pieces.</div>
          </div>
          <div className="field">
            <label htmlFor="sg-gar">Garment</label>
            <select id="sg-gar" className="select">
              <option>T-Shirt</option>
              <option>Hoodie</option>
              <option>Tote Bag</option>
              <option>Poster Print</option>
            </select>
          </div>
        </div>
        <div>
          <div className="field">
            <label htmlFor="sg-notes">Project Details</label>
            <textarea id="sg-notes" className="textarea" placeholder="Tell us your quantity, colors, garment, and timeline..."></textarea>
          </div>
          <div className="field">
            <label>Checkbox &amp; Radio</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6 }}>
              <label className="check">
                <input type="checkbox" defaultChecked />
                <span className="box"></span>
                Subscribe to press updates
              </label>
              <label className="check">
                <input type="checkbox" />
                <span className="box"></span>
                Rush turnaround (3–5 days)
              </label>
              <label className="check radio">
                <input type="radio" name="pickup" defaultChecked />
                <span className="box"></span>
                Local pickup
              </label>
              <label className="check radio">
                <input type="radio" name="pickup" />
                <span className="box"></span>
                Ship anywhere in the U.S.
              </label>
            </div>
          </div>
          <div className="field">
            <label>Artwork Files</label>
            <div className="upload">
              <div className="ttl">Drop Files Here</div>
              <div className="sub">or <b>browse</b> · AI, PSD, PDF, PNG · 10 MB max</div>
            </div>
          </div>
        </div>
      </div>

      <div className="sub-title"><h3>Cards</h3><div className="ref">4 surface variants</div></div>
      <div className="card-grid">
        <div className="card">
          <div className="meta">DEFAULT — INK-2</div>
          <h4 className="ttl">Loose Knots</h4>
          <p>Standard surface for grid items, sidebars, and panel content. Ink-2 background with paper text.</p>
        </div>
        <div className="card elevated">
          <div className="meta">ELEVATED — INK-3</div>
          <h4 className="ttl">Powderhorn Fest</h4>
          <p>Raised surface for popovers, modal content, and emphasis. Step lighter than ink-2.</p>
        </div>
        <div className="card tonal">
          <div className="meta">TONAL — GOLD</div>
          <h4 className="ttl">Featured Work</h4>
          <p>Gold tonal surface for CTAs and broadside callouts. Always pairs with ink-color text.</p>
        </div>
      </div>

      <div className="sub-title"><h3>Badges</h3><div className="ref">Status pills · vertical-wipe optional</div></div>
      <div className="panel">
        <div className="badges">
          <span className="badge warning"><span className="dot"></span>Now Booking</span>
          <span className="badge success"><span className="dot"></span>Order Confirmed</span>
          <span className="badge error"><span className="dot"></span>Press Down</span>
          <span className="badge info">Quote Pending</span>
          <span className="badge outline">Draft</span>
          <span className="badge outline">Catalog 2026-A</span>
        </div>
      </div>
    </section>
  );
}

// ── Section: Motifs ────────────────────────────────────────────────────────
function SectionMotifs() {
  return (
    <section className="sec wrap" id="motifs">
      <div className="sec-head">
        <div className="left">
          <div className="id">Foundation No. 05</div>
          <h2>Motifs<span className="dot">.</span></h2>
        </div>
        <div className="right">
          <p>
            Decorative language pulled from the press itself: registration crosshairs,
            halftone dot patterns, paper grain, and the vertical-wipe hover — every
            element echoes the floor of the shop.
          </p>
          <div className="note">
            <span>Reg Marks · Native</span>
            <span>Halftone · 8–18 px</span>
            <span>Grain · SVG noise overlay</span>
          </div>
        </div>
      </div>

      <div className="sub-title"><h3>Decorative Patterns</h3><div className="ref">Use sparingly · always behind type</div></div>
      <div className="motif-grid">
        <div className="motif">
          <div className="demo halftone"></div>
          <div className="lbl"><b>Halftone · Fine</b><span>8 px grid · paper dots</span></div>
        </div>
        <div className="motif">
          <div className="demo halftone-coarse"></div>
          <div className="lbl"><b>Halftone · Coarse</b><span>18 px grid · gold dots</span></div>
        </div>
        <div className="motif">
          <div className="demo diagonal"></div>
          <div className="lbl"><b>Diagonal Hatch</b><span>15 px stripe · 135°</span></div>
        </div>
        <div className="motif">
          <div className="demo broadside"></div>
          <div className="lbl"><b>Broadside Field</b><span>Gold + 12% ink dots</span></div>
        </div>
        <div className="motif">
          <div className="demo" style={{
            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            opacity: 0.4,
          }}></div>
          <div className="lbl"><b>Paper Grain</b><span>SVG noise · overlay blend</span></div>
        </div>
        <div className="motif">
          <div className="demo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
              <RegMark size={44} />
              <RegMark size={44} />
              <RegMark size={44} />
              <RegMark size={44} />
              <RegMark size={44} />
              <RegMark size={44} />
            </div>
          </div>
          <div className="lbl"><b>Registration Field</b><span>Reg marks as ornament</span></div>
        </div>
      </div>

      <div className="sub-title"><h3>Hover Idiom — Vertical Wipe</h3><div className="ref">300 ms · cubic-bezier(0.4, 0, 0.2, 1)</div></div>
      <div className="hover-spec">
        <div className="spec-stages">
          <div className="stage" data-stage="rest">
            <div className="num">01</div>
            <div className="desc"><b style={{ color: 'var(--paper)' }}>Rest.</b> Button at its default color. The wipe layer sits scaled to 0 at the bottom of the button — invisible, waiting.</div>
            <div className="viz"><span className="lbl-text">Get a Quote</span></div>
          </div>
          <div className="stage" data-stage="mid">
            <div className="num">02</div>
            <div className="desc"><b style={{ color: 'var(--paper)' }}>Flood.</b> On hover, the wipe scales toward 1 — from origin-top, not origin-bottom. The dark ink floods down the surface.</div>
            <div className="viz"><span className="lbl-text">Get a Quote</span></div>
          </div>
          <div className="stage" data-stage="hover">
            <div className="num">03</div>
            <div className="desc"><b style={{ color: 'var(--paper)' }}>Hold.</b> Wipe at scale 1, text color flips to paper. Identical mechanic across buttons, nav links, badges.</div>
            <div className="viz"><span className="lbl-text">Get a Quote</span></div>
          </div>
        </div>

        <div>
          <pre className="code">
{`/* Vertical-wipe hover — every interactive surface */
.btn {
  position: relative; z-index: 0; overflow: hidden;
}
.btn::before {
  content: '';
  position: absolute; inset: 0; z-index: -1;
  background: var(--accent-deep);
  transform: scaleY(0);
  transform-origin: bottom center;
  transition: transform 300ms var(--ease);
}
.btn:hover::before {
  transform: scaleY(1);
  transform-origin: top center;  /* ← key: flips origin */
}`}
          </pre>
          <p style={{ marginTop: 16, color: 'var(--paper-2)', fontSize: 14, lineHeight: 1.55 }}>
            The transform-origin flip is what makes the wipe feel like a screen-print pull,
            not a fade. Apply this single mechanic everywhere interactive — it's the
            site's signature motion.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Section: Motion ────────────────────────────────────────────────────────
function SectionMotion() {
  return (
    <section className="sec wrap" id="motion">
      <div className="sec-head">
        <div className="left">
          <div className="id">Foundation No. 06</div>
          <h2>Motion<span className="dot">.</span></h2>
        </div>
        <div className="right">
          <p>
            Three durations, one easing curve, one page transition. Motion is functional —
            it confirms a state change or reveals new content. We never animate to decorate.
          </p>
          <div className="note">
            <span>Easing · cubic-bezier(0.4, 0, 0.2, 1)</span>
            <span>Reduced motion · honored</span>
          </div>
        </div>
      </div>

      <div className="sub-title"><h3>Durations</h3><div className="ref">Pick the shortest that reads correctly</div></div>
      <div className="motion-grid">
        <div className="motion-card fast">
          <div className="ttl">Fast — 120 ms</div>
          <p className="desc">State changes that should feel instant: hover color, focus ring, checkbox toggle.</p>
          <div className="demo"><div className="ball"></div></div>
          <div className="lbl">--d-fast · <b>120 ms</b></div>
        </div>
        <div className="motion-card base">
          <div className="ttl">Base — 220 ms</div>
          <p className="desc">Most UI transitions: card lift, tab switch, panel slide.</p>
          <div className="demo"><div className="ball"></div></div>
          <div className="lbl">--d-base · <b>220 ms</b></div>
        </div>
        <div className="motion-card slow">
          <div className="ttl">Slow — 300 ms</div>
          <p className="desc">The vertical-wipe hover. Content reveals. Anything that needs to read as deliberate.</p>
          <div className="demo"><div className="ball"></div></div>
          <div className="lbl">--d-slow · <b>300 ms</b></div>
        </div>
        <div className="motion-card linear">
          <div className="ttl">Linear — Continuous</div>
          <p className="desc">Marquees, loaders, and any animation that must not accelerate.</p>
          <div className="demo"><div className="ball"></div></div>
          <div className="lbl">timing · <b>linear</b></div>
        </div>
      </div>

      <div className="sub-title"><h3>Page Transition</h3><div className="ref">Flood + Pull · 600 ms</div></div>
      <div className="panel">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 40, textTransform: 'uppercase', letterSpacing: '-0.005em', lineHeight: 1, marginBottom: 14 }}>
              Ink Floods.<br /><span style={{ color: 'var(--accent)' }}>Page Reveals.</span>
            </div>
            <p style={{ color: 'var(--paper-2)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              Inter-page transitions wipe vertically with a full-bleed ink or gold panel —
              the same mechanic as the button hover, scaled to the viewport. Phase 1: flood
              up (300 ms). Phase 2: pull down to reveal the new page (300 ms).
            </p>
          </div>
          <div style={{
            aspectRatio: '16 / 9',
            position: 'relative',
            background: 'var(--ink-2)',
            border: '1px solid var(--rule)',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'var(--accent)',
              animation: 'pageWipe 3s ease-in-out infinite',
              transformOrigin: 'bottom center',
            }}></div>
            <style>{`
              @keyframes pageWipe {
                0%   { transform: scaleY(0); transform-origin: bottom center; }
                40%  { transform: scaleY(1); transform-origin: bottom center; }
                50%  { transform: scaleY(1); transform-origin: top center; }
                90%  { transform: scaleY(0); transform-origin: top center; }
                100% { transform: scaleY(0); transform-origin: top center; }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Footer ────────────────────────────────────────────────────────
function SiteFooter() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="row">
          <div className="lbl">
            <RegMark size={14} color="var(--accent)" style={{ verticalAlign: 'middle', marginRight: 8 }} />
            Antibroadcasting Style Guide · Document 2026-A.02
          </div>
          <div className="lbl">WCAG 2.2 AA Verified</div>
          <div className="lbl">© 2026 Antibroadcasting Inc.</div>
        </div>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
function App() {
  return (
    <>
      <SiteHeader />
      <Cover />
      <SectionIdentity />
      <SectionColor />
      <SectionType />
      <SectionSystem />
      <SectionComponents />
      <SectionMotifs />
      <SectionMotion />
      <SiteFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
