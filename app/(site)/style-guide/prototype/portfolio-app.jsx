const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ─── Placeholder Data ──────────────────────────────────────────────────────
// Same shape as Travis's GalleryItem in components/ui/GalleryGrid.tsx:
// { slug, title, client, category, image, description, featured, colors, year }

const ITEMS = [
  { slug: 'loose-knots-tour-tee', title: 'Tour Tee Run',           client: 'Loose Knots',        category: 'band-merch',           description: 'Three-color tour merch run for a 12-date Midwest tour. Heavy black tee, gold ink front, registration-perfect halftone on the back.', featured: true,  colors: 4, year: 2026, size: 'wide', ph: 'gold',      garment: 'Tour Tee · 200 pc' },
  { slug: 'powderhorn-fest',     title: 'Park Poster',             client: 'Powderhorn Fest',    category: 'event',                description: 'Six-color silkscreened gig poster for the 2025 Powderhorn music festival. Printed on heavy cover stock with metallic overlay.', featured: true,  colors: 6, year: 2025, size: 'tall', ph: 'stripes-1', garment: 'Poster · 400 pc' },
  { slug: 'wax-library-tote',    title: 'Library Totes',           client: 'Wax Library',        category: 'community-organization', description: 'Heavy canvas tote with a single-pull discharge print. Designed for a record library subscription program.',                       featured: false, colors: 3, year: 2025, size: 'std',  ph: 'dots',      garment: 'Tote · 150 pc' },
  { slug: 'oregon-ave-hoodie',   title: 'Shop Hoodies',            client: 'In-House',           category: 'band-merch',           description: 'In-house run of midweight hoodies featuring the shop wordmark and registration crosshair motif. White and gold inks on coal.', featured: false, colors: 2, year: 2025, size: 'std',  ph: 'stripes-2', garment: 'Hoodie · 80 pc' },
  { slug: 'lake-st-mural-tee',   title: 'Lake St Tees',            client: 'Lake St. Council',   category: 'community-organization', description: 'Benefit tee printed for the rebuild of Lake Street businesses. All proceeds directly to participating shops.',                  featured: false, colors: 2, year: 2024, size: 'std',  ph: 'paper',     garment: 'Tee · 300 pc',
    bigType: 'Lake\nStreet' },
  { slug: 'half-priced-hits-lp', title: 'Album Sleeves',           client: 'Half-Priced Hits',   category: 'band-merch',           description: 'Reverse-printed jacket sleeves for a 7-inch limited edition. Hand-pulled on uncoated card stock — every sleeve is unique.', featured: false, colors: 3, year: 2024, size: 'std',  ph: 'stripes-1', garment: 'LP Sleeve · 100 pc' },
  { slug: 'mn-roller-derby',     title: 'Bout Posters',            client: 'MN Roller Derby',    category: 'event',                description: 'High-contrast 2-up bout posters in eyeball-melting safety yellow and black. Hand-pulled run of 250.',                    featured: true,  colors: 2, year: 2025, size: 'wide', ph: 'coal',      garment: 'Poster · 250 pc' },
  { slug: 'commongood-windbreaker', title: 'Org Windbreakers',     client: 'CommonGood Co-op',   category: 'community-organization', description: 'Lightweight nylon windbreakers for the co-op staff. Discharge-printed wordmark with low-impact water-based inks.',     featured: false, colors: 1, year: 2024, size: 'std',  ph: 'dots',      garment: 'Windbreaker · 60 pc' },
  { slug: 'bastardsamurai-merch', title: 'Battle Merch',           client: 'Bastard Samurai',    category: 'band-merch',           description: 'A four-piece merch run for a local hardcore band. Includes tee, longsleeve, patch, and zine.',                          featured: false, colors: 5, year: 2026, size: 'std',  ph: 'stripes-2', garment: 'Tee + Patch · 220 pc' },
  { slug: 'minnehaha-fest',      title: 'Park Festival',           client: 'Minnehaha Fest',     category: 'event',                description: 'Festival poster + run-of-show tees for a Minnehaha Falls one-day festival. Printed in a single afternoon.',           featured: false, colors: 3, year: 2024, size: 'std',  ph: 'stripes-1', garment: 'Poster + Tee · 350 pc' },
  { slug: 'twin-cities-zine',    title: 'Zine Covers',             client: 'Twin Cities Zine',   category: 'community-organization', description: 'Quarterly zine covers, hand-pulled on French Speckletone for the local zine collective. Sixteen-page interior.',     featured: false, colors: 2, year: 2025, size: 'std',  ph: 'paper',     garment: 'Zine Cover · 500 pc',
    bigType: 'Issue\n07' },
  { slug: 'el-camino-tees',      title: 'Cafe Tees',               client: 'El Camino Cafe',     category: 'community-organization', description: 'Staff tees for an east side cafe and bike repair co-op. Eight colors max, six used. Discharge base layer.',         featured: false, colors: 6, year: 2026, size: 'std',  ph: 'gold',      garment: 'Tee · 90 pc',
    bigType: 'El\nCamino' },
];

// ─── Helpers ───────────────────────────────────────────────────────────────
function categoryLabel(value) {
  return value
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
function formatColors(n) { return n === 1 ? '1 Color' : `${n} Colors`; }

function RegMark({ size = 28, color, style, className }) {
  return (
    <svg className={className} width={size} height={size} style={{ color, ...(style || {}) }}>
      <use href="#regmark" />
    </svg>
  );
}

// ─── Header ────────────────────────────────────────────────────────────────
function SiteHeader() {
  return (
    <header className="site">
      <div className="wrap">
        <div className="row">
          <a href="Homepage.html" className="wordmark">
            <RegMark size={20} color="var(--accent)" />
            <span>Antibroadcasting</span>
          </a>
          <nav className="main">
            <a href="Portfolio.html" className="is-active">Portfolio</a>
            <a href="#process">How It Works</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="header-right">
            <a href="tel:+16125551234" className="phone">612 · 555 · 1234</a>
            <a href="#quote" className="btn btn-primary" style={{ padding: '14px 20px', fontSize: 12 }}>
              Get a Quote <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero({ totalCount, categoryCount }) {
  return (
    <section className="hero wrap">
      <RegMark size={32} className="reg-tl" />
      <a href="#" className="badge">
        <RegMark size={11} color="var(--ink)" /> Catalog · Volume 2026-A
      </a>
      <h1>Our<br />Work<span className="dot">.</span></h1>
      <div className="meta">
        <p>
          Tour tees, festival posters, neighborhood totes, and one-off broadsides.
          A working selection from the press floor — hand-pulled in Minneapolis
          since 2014.
        </p>
        <div className="stat">
          <div className="k">Total Pieces</div>
          <div className="v">{totalCount}<span className="accent">.</span></div>
        </div>
        <div className="stat">
          <div className="k">Categories</div>
          <div className="v">0{categoryCount}<span className="accent">.</span></div>
        </div>
        <div className="stat">
          <div className="k">Years Pressing</div>
          <div className="v">12<span className="accent">.</span></div>
        </div>
      </div>
    </section>
  );
}

// ─── Filter Bar ────────────────────────────────────────────────────────────
function FilterBar({ categories, active, onChange, total, shown }) {
  return (
    <div className="filter-bar">
      <div className="wrap">
        <div className="row">
          <div className="filter-chips" role="tablist" aria-label="Filter by category">
            {categories.map((c) => (
              <button
                key={c.value}
                role="tab"
                aria-selected={active === c.value}
                className={`chip ${active === c.value ? 'is-active' : ''}`}
                onClick={() => onChange(c.value)}>
                {c.label} <span className="count">{c.count.toString().padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <div className="count-line">
            Showing <b>{shown}</b> of <b>{total}</b>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Placeholder Frame ─────────────────────────────────────────────────────
function PlaceholderFrame({ item, index }) {
  const isBigType = item.ph === 'paper' || item.ph === 'gold';
  return (
    <div className={`frame ph-${item.ph}`}>
      <div className="img"></div>
      <div className="corner tl"></div>
      <div className="corner tr"></div>
      <div className="corner bl"></div>
      <div className="corner br"></div>
      <div className="stamp">{String(index + 1).padStart(3, '0')} · {item.year}</div>
      {isBigType && item.bigType ? (
        <div className="ph-display">
          {item.bigType.split('\n').map((line, i) => (
            <span key={i} style={{ display: 'block' }}>{line}</span>
          ))}
        </div>
      ) : (
        <div className="ph-center">
          <RegMark size={32} />
          <div className="lbl">{item.garment}</div>
        </div>
      )}
    </div>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────
function Card({ item, index, layoutMode, onOpen }) {
  // span class derived from item.size + layoutMode
  let span = '';
  let aspect = 'aspect-square';
  if (layoutMode === 'magazine') {
    if (item.size === 'wide')      { span = 'span-wide';  aspect = 'aspect-landscape'; }
    else if (item.size === 'tall') { span = 'span-tall';  aspect = 'aspect-portrait';  }
    else                            { span = '';           aspect = 'aspect-square';   }
  }

  return (
    <button
      className={`card ${span} ${aspect} treat-${item.ph}`}
      aria-label={`View ${item.client}`}
      onClick={(e) => onOpen(index, e.currentTarget)}>
      <PlaceholderFrame item={item} index={index} />
      <div className="overlay">
        <div className="pill" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="9,7 17,7 17,15" />
          </svg>
        </div>
        <h3 className="name">{item.client}</h3>
        <div className="row">
          <span>{item.year}</span>
          <span className="acc">{formatColors(item.colors)}</span>
          <span>{categoryLabel(item.category)}</span>
        </div>
      </div>
      <div className="below">
        <div className="nm">{item.client}</div>
        <div className="spec">
          {item.year}<br />
          <span className="acc">{formatColors(item.colors)}</span>
        </div>
      </div>
    </button>
  );
}

// ─── Lightbox ──────────────────────────────────────────────────────────────
function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const item = items[index];
  const total = items.length;
  const hasPrev = index > 0;
  const hasNext = index < total - 1;

  // Focus close button on mount, scroll lock, keyboard handling
  useEffect(() => {
    document.body.classList.add('lb-open');
    const t = setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.body.classList.remove('lb-open');
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowLeft' && hasPrev) { onPrev(); return; }
      if (e.key === 'ArrowRight' && hasNext) { onNext(); return; }
      if (e.key === 'Tab') {
        // simple focus trap among visible buttons
        const focusables = dialogRef.current?.querySelectorAll('button:not([disabled])') || [];
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hasPrev, hasNext, onClose, onPrev, onNext]);

  return (
    <div
      ref={dialogRef}
      className="lightbox is-open"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.client} — Project detail`}>

      <RegMark size={22} className="corner-mark tl" />
      <RegMark size={22} className="corner-mark tr" />
      <RegMark size={22} className="corner-mark bl" />
      <RegMark size={22} className="corner-mark br" />

      <button ref={closeRef} className="lb-close" aria-label="Close" onClick={(e) => { e.stopPropagation(); onClose(); }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      <button className="lb-prev" aria-label="Previous"
              disabled={!hasPrev}
              onClick={(e) => { e.stopPropagation(); onPrev(); }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15,18 9,12 15,6" />
        </svg>
      </button>

      <button className="lb-next" aria-label="Next"
              disabled={!hasNext}
              onClick={(e) => { e.stopPropagation(); onNext(); }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9,6 15,12 9,18" />
        </svg>
      </button>

      <div className="lb-content" onClick={(e) => e.stopPropagation()}>
        <div className="lb-image">
          <PlaceholderFrame item={item} index={index} />
        </div>
        <div className="lb-meta">
          <div className="badge">{categoryLabel(item.category)}</div>
          <h2>{item.client}</h2>
          <div className="client">{item.title}</div>
          <p className="desc">{item.description}</p>
          <div className="specs">
            <div className="row"><span className="k">Year</span><span className="v">{item.year}</span></div>
            <div className="row"><span className="k">Colors</span><span className="v"><span className="acc">{item.colors}</span></span></div>
            <div className="row" style={{ gridColumn: '1 / -1' }}>
              <span className="k">Garment</span>
              <span className="v" style={{ fontSize: 18 }}>{item.garment}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lb-counter">
        <span><b>{String(index + 1).padStart(2, '0')}</b> / {String(total).padStart(2, '0')}</span>
        <span className="dot"></span>
        <span>Use ← →</span>
      </div>
    </div>
  );
}

// ─── Gallery ───────────────────────────────────────────────────────────────
function Gallery({ items, layoutMode, onOpen }) {
  if (!items.length) {
    return (
      <div className="empty">
        <div className="ttl">No Work Yet</div>
        <p>No projects in this category. Try another filter.</p>
      </div>
    );
  }
  return (
    <div className="grid">
      {items.map((it, i) => (
        <Card key={it.slug} item={it} index={i} layoutMode={layoutMode} onOpen={onOpen} />
      ))}
    </div>
  );
}

// ─── CTA + Footer ──────────────────────────────────────────────────────────
function Broadside() {
  return (
    <section className="broadside">
      <div className="top-rule">
        <span>★ Broadside No. 023</span>
        <span className="line"></span>
        <span>End of Catalog · MMXXVI</span>
      </div>
      <div className="wrap">
        <div className="inner">
          <h2>Like What<br />You See<span style={{ color: 'var(--ink)' }}>?</span></h2>
          <div>
            <p className="lede">
              We print for bands, artists, events, and community organizations
              across Minneapolis. Send a file, a sketch, or a half-formed idea.
            </p>
            <div className="ctas">
              <a href="#quote" className="btn btn-primary">Get a Quote <span className="arrow">→</span></a>
              <a href="#process" className="btn btn-outline">How It Works</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div className="footer-wordmark">Antibroad-<br />casting<span style={{ color: 'var(--accent)' }}>.</span></div>
            <div className="footer-tagline">
              <RegMark size={14} color="var(--accent)" style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Artist-Run · Independent · Minneapolis
            </div>
          </div>
          <div className="footer-col">
            <h4>Visit</h4>
            <p>3715 Oregon Ave S #5</p>
            <p>Minneapolis, MN 55426</p>
            <p style={{ marginTop: 14, color: 'var(--paper-3)', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.16em' }}>MON–FRI · 10–6</p>
          </div>
          <div className="footer-col">
            <h4>Get in Touch</h4>
            <a href="tel:+16125551234">612 · 555 · 1234</a>
            <a href="mailto:hello@antibroadcasting.com">hello@antibroadcasting.com</a>
            <a href="#quote" style={{ color: 'var(--accent)', marginTop: 10 }}>Request a Quote →</a>
          </div>
          <div className="footer-col">
            <h4>Elsewhere</h4>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">X / Twitter</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Antibroadcasting Inc. — All Rights Reserved.</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
            <RegMark size={14} color="var(--paper-3)" /> Pressed by Hand
            <RegMark size={14} color="var(--paper-3)" />
          </span>
          <span>Catalog · 2026-A</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Tweaks Launcher ───────────────────────────────────────────────────────
function TweaksLauncher() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onMsg = (e) => {
      const ty = e?.data?.type;
      if (ty === '__activate_edit_mode') setOpen(true);
      else if (ty === '__deactivate_edit_mode' || ty === '__edit_mode_dismissed') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);
  if (open) return null;
  return (
    <button className="tweaks-launcher"
            onClick={() => window.postMessage({ type: '__activate_edit_mode' }, '*')}>
      Tweaks
    </button>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "magazine",
  "showOverlay": true,
  "showBelow": true
}/*EDITMODE-END*/;

// ─── App ───────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [activeCat, setActiveCat] = useState('all');
  const [lbIndex, setLbIndex] = useState(null);
  const triggerRef = useRef(null);

  // Apply tweak side-effects
  useEffect(() => {
    document.documentElement.style.setProperty('--show-overlay', t.showOverlay ? '1' : '0');
    document.documentElement.style.setProperty('--show-below', t.showBelow ? '1' : '0');
  }, [t]);

  // Build category list dynamically
  const categories = useMemo(() => {
    const counts = ITEMS.reduce((acc, it) => {
      acc[it.category] = (acc[it.category] || 0) + 1; return acc;
    }, {});
    const cats = Object.entries(counts).map(([value, count]) => ({
      value, label: categoryLabel(value), count
    })).sort((a, b) => a.label.localeCompare(b.label));
    return [{ value: 'all', label: 'All Work', count: ITEMS.length }, ...cats];
  }, []);

  const filtered = useMemo(() =>
    activeCat === 'all' ? ITEMS : ITEMS.filter((i) => i.category === activeCat),
    [activeCat]);

  // Hide overlay/below per tweak via CSS
  useEffect(() => {
    let styleEl = document.getElementById('tweak-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'tweak-style';
      document.head.appendChild(styleEl);
    }
    const rules = [];
    if (!t.showOverlay) rules.push('.card .overlay { display: none !important; }');
    if (!t.showBelow)   rules.push('.card .below { display: none !important; }');
    styleEl.textContent = rules.join('\n');
  }, [t.showOverlay, t.showBelow]);

  const openLb = useCallback((index, trigger) => {
    triggerRef.current = trigger;
    setLbIndex(index);
  }, []);
  const closeLb = useCallback(() => {
    setLbIndex(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);
  const prevLb = useCallback(() => setLbIndex((i) => (i > 0 ? i - 1 : i)), []);
  const nextLb = useCallback(() => setLbIndex((i) => (i < filtered.length - 1 ? i + 1 : i)), [filtered.length]);

  return (
    <>
      <SiteHeader />
      <Hero totalCount={ITEMS.length} categoryCount={categories.length - 1} />
      <FilterBar
        categories={categories}
        active={activeCat}
        onChange={(v) => setActiveCat(v)}
        total={ITEMS.length}
        shown={filtered.length} />
      <section className="gallery">
        <div className="wrap">
          <Gallery items={filtered} layoutMode={t.layout} onOpen={openLb} />
        </div>
      </section>
      <Broadside />
      <SiteFooter />

      {lbIndex !== null && (
        <Lightbox
          items={filtered}
          index={lbIndex}
          onClose={closeLb}
          onPrev={prevLb}
          onNext={nextLb} />
      )}

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Gallery Layout">
          <window.TweakRadio
            label="Grid"
            value={t.layout}
            options={[
              { value: 'magazine', label: 'Magazine' },
              { value: 'uniform',  label: 'Uniform' },
            ]}
            onChange={(v) => setTweak('layout', v)} />
          <window.TweakToggle
            label="Hover overlay"
            value={t.showOverlay}
            onChange={(v) => setTweak('showOverlay', v)} />
          <window.TweakToggle
            label="Metadata under card"
            value={t.showBelow}
            onChange={(v) => setTweak('showBelow', v)} />
        </window.TweakSection>
      </window.TweaksPanel>
      <TweaksLauncher />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
