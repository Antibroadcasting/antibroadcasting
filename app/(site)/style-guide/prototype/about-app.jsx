const { useState, useEffect, useRef } = React;

function RegMark({ size = 28, color, style, className }) {
  return (
    <svg className={className} width={size} height={size} style={{ color, ...(style || {}) }}>
      <use href="#regmark" />
    </svg>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────
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
            <a href="Portfolio.html">Portfolio</a>
            <a href="#process">How It Works</a>
            <a href="About.html" className="is-active">About</a>
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

// ─── Hero ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero">
      <RegMark size={32} className="reg" />
      <div className="wrap">
        <div className="badge">
          <RegMark size={11} color="var(--ink)" /> About Us · Volume 2026-A
        </div>
        <h1>
          Experience<br />That Matters<span className="dot">.</span>
        </h1>
        <div className="runline">
          <div className="cell">
            <span className="k">Established</span>
            <div className="v">2014<span className="acc">.</span></div>
          </div>
          <div className="cell">
            <span className="k">Incorporated</span>
            <div className="v">2005<span className="acc">.</span></div>
          </div>
          <div className="cell">
            <span className="k">Press Experience</span>
            <div className="v">20<span className="acc">+</span></div>
          </div>
          <div className="cell">
            <span className="k">Owner-Operated</span>
            <div className="v">Always<span className="acc">.</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Photo Placeholder ────────────────────────────────────────────────────
function PhotoSlot({ treatment, stamp, file, label, tall }) {
  const overlayClass = {
    'stripes': 'stripe-overlay',
    'gold': 'gold-overlay',
    'coal': 'coal-overlay',
  }[treatment] || 'stripe-overlay';
  return (
    <div className={`photo ${tall ? 'tall' : ''} ${treatment === 'gold' ? 'gold' : ''}`}>
      <div className={overlayClass}></div>
      <div className="corner tl"></div>
      <div className="corner tr"></div>
      <div className="corner bl"></div>
      <div className="corner br"></div>
      <div className="stamp">{stamp}</div>
      <div className="file">{file}</div>
      <div className="center">
        <RegMark size={48} color={treatment === 'gold' ? 'var(--ink)' : 'var(--paper-3)'} />
        <div className="lbl">{label}</div>
      </div>
    </div>
  );
}

// ─── Section: Philosophy ──────────────────────────────────────────────────
function Section01({ photoTreatment, layout }) {
  return (
    <section className={`story ${layout === 'mirror' ? 'reverse' : ''}`}>
      <div className="wrap">
        <div className="story-grid">
          <div className="text">
            <div className="section-id">
              <RegMark size={18} className="mark" />
              <span><span className="n">01</span> &nbsp;/&nbsp; What Sets Us Apart</span>
            </div>
            <h2>Quality Over<br />Volume<span className="dot">.</span></h2>
            <div className="body">
              <p>
                We're a shop that cares about consistency and quality — not just spitting
                out volume. We take extra care with your files so the final print is
                something we're proud of too.
              </p>
              <p>
                Our entire staff is made up of artists and musicians who understand the
                need for top-notch merch. Whether you're doing full-color artwork or a
                single-color strike, the same attention and care goes into everything we
                produce.
              </p>
            </div>
            <div className="callout">
              <h3 className="lead">
                Every job is personally<br />overseen by our owner<span className="acc">.</span>
              </h3>
              <p className="sub">Not a production line — a print shop with standards.</p>
            </div>
          </div>
          <div className="image">
            <PhotoSlot
              treatment={photoTreatment}
              stamp="PHOTO · 01.TIF"
              file="ON-FLOOR / PRESS_02"
              label="On the press floor"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Founder Story ───────────────────────────────────────────────
function Section02({ photoTreatment }) {
  return (
    <section className="story">
      <div className="wrap">
        <div className="story-grid">
          <div className="image">
            <PhotoSlot
              treatment={photoTreatment === 'stripes' ? 'coal' : 'gold'}
              stamp="PHOTO · 02.TIF"
              file="ARCHIVE / MINOT_1991"
              label="Chris at the press"
            />
          </div>
          <div className="text">
            <div className="section-id">
              <RegMark size={18} className="mark" />
              <span><span className="n">02</span> &nbsp;/&nbsp; The Story</span>
            </div>
            <h2>Built From the<br />Ground Up<span className="dot">.</span></h2>
            <div className="body">
              <p>
                Antibroadcasting was incorporated in 2005. Our owner, Chris, grew up
                working alongside his uncle and father at their shop in Minot, North
                Dakota — back when rubylith, hand-cut stencils, and hand-stretched 2×2"
                screens were still standard.
              </p>
              <p>
                Over time, he began slowly acquiring his own equipment and building his
                own practice. Today he brings over 20 years of hands-on screen printing
                experience to every job that comes through the shop.
              </p>
            </div>
            <div className="founder-stats">
              <div className="item">
                <div className="v">2005</div>
                <div className="k">Year Founded</div>
              </div>
              <div className="item">
                <div className="v">20<span className="acc">+</span></div>
                <div className="k">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Who We Work With ────────────────────────────────────────────
const AUDIENCES = [
  { n: '01', title: 'Bands & Musicians',     body: "Merch that holds up on the road and looks good doing it. We know what the scene needs." },
  { n: '02', title: 'Local Artists',          body: "Limited runs, specialty inks, and the care your work deserves. Artist-to-artist." },
  { n: '03', title: 'Events & Organizations', body: "Staff shirts, event tees, and promo apparel — on time and on spec." },
  { n: '04', title: 'Businesses',             body: "From single-color workwear to full-color branded pieces. We work with all types." },
];

function Section03() {
  return (
    <section className="audience">
      <div className="wrap">
        <div className="audience-grid">
          <div>
            <div className="section-id">
              <RegMark size={18} className="mark" />
              <span><span className="n">03</span> &nbsp;/&nbsp; Who We Work With</span>
            </div>
            <h2>Anyone Who<br />Needs Great<br />Prints<span className="dot">.</span></h2>
            <p className="quip">
              Bands, artists, organizers, and shops across the Twin Cities. If you're
              independent, you're our people.
            </p>
          </div>
          <div className="a-grid">
            {AUDIENCES.map((a) => (
              <article className="a-card" key={a.title}>
                <div className="n">No. {a.n}</div>
                <h3 className="ttl">{a.title}</h3>
                <p className="body">{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Broadside CTA ────────────────────────────────────────────────────────
function Broadside() {
  return (
    <section className="broadside">
      <div className="top-rule">
        <span>★ Broadside No. 011</span>
        <span className="line"></span>
        <span>Printed in Minneapolis · MMXXVI</span>
      </div>
      <div className="wrap">
        <div className="inner">
          <h2>Ready to<br />Get Started<span style={{ color: 'var(--ink)' }}>?</span></h2>
          <div>
            <p className="lede">
              Reach out and we'll get back to you within 1–2 business days with a
              custom quote — and a real conversation about your project.
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

// ─── Footer ───────────────────────────────────────────────────────────────
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
  "photoTreatment": "stripes",
  "layout": "standard"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  return (
    <>
      <SiteHeader />
      <Hero />
      <Section01 photoTreatment={t.photoTreatment} layout={t.layout} />
      <Section02 photoTreatment={t.photoTreatment} />
      <Section03 />
      <Broadside />
      <SiteFooter />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Layout">
          <window.TweakRadio
            label="Photo position"
            value={t.layout}
            options={[
              { value: 'standard', label: 'Standard' },
              { value: 'mirror',   label: 'Mirrored' },
            ]}
            onChange={(v) => setTweak('layout', v)} />
        </window.TweakSection>
        <window.TweakSection label="Photography">
          <window.TweakRadio
            label="Placeholder"
            value={t.photoTreatment}
            options={[
              { value: 'stripes', label: 'Stripes' },
              { value: 'coal',    label: 'Halftone' },
              { value: 'gold',    label: 'Gold' },
            ]}
            onChange={(v) => setTweak('photoTreatment', v)} />
        </window.TweakSection>
      </window.TweaksPanel>
      <TweaksLauncher />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
