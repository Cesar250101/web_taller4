/* App.jsx — composition + tweaks panel */

const { useState: useS, useEffect: useE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#C8714A",
  "newsletterBg": "terracota",
  "heroAutoplay": true,
  "brandsLayout": "grid4",
  "density": "regular",
  "showInstagram": true
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  '#C8714A', // terracota (default — brief)
  '#E63946', // red (design-system original)
  '#C8954A', // mustard
  '#6B7A4F', // moss
  '#2B6FAD', // sky blue
];

function darken(hex, pct) {
  // Simple darken: mix with black by pct (0..1)
  const h = hex.replace('#','');
  const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
  const m = 1 - pct;
  return '#' + [r,g,b].map(c => Math.round(c*m).toString(16).padStart(2,'0')).join('');
}

const NEWSLETTER_BG_MAP = {
  terracota: (accent) => ({ '--newsletter-bg': accent, '--newsletter-fg': '#fff', '--newsletter-input-btn': '#1F2024' }),
  cream:     (accent) => ({ '--newsletter-bg': '#F2EDE4', '--newsletter-fg': '#1F2024', '--newsletter-input-btn': accent }),
  paper:     (accent) => ({ '--newsletter-bg': '#FFFFFF', '--newsletter-fg': '#1F2024', '--newsletter-input-btn': accent }),
  ink:       (accent) => ({ '--newsletter-bg': '#1F2024', '--newsletter-fg': '#fff', '--newsletter-input-btn': accent }),
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cart, setCart] = useS([]);
  const [toast, setToast] = useS(null);

  // Apply accent + newsletter style as CSS variables on root
  useE(() => {
    const r = document.documentElement;
    r.style.setProperty('--t4-amor-500', t.accent);
    r.style.setProperty('--t4-amor-600', darken(t.accent, 0.18));
    r.style.setProperty('--t4-accent', t.accent);
    r.style.setProperty('--t4-accent-strong', darken(t.accent, 0.18));
    const bg = (NEWSLETTER_BG_MAP[t.newsletterBg] || NEWSLETTER_BG_MAP.terracota)(t.accent);
    Object.entries(bg).forEach(([k, v]) => r.style.setProperty(k, v));
    r.style.setProperty('--page-pad', t.density === 'compact' ? '24px' : (t.density === 'comfy' ? '56px' : '40px'));
  }, [t.accent, t.newsletterBg, t.density]);

  // Brand grid columns
  useE(() => {
    const el = document.querySelector('.t4-brand-grid');
    if (!el) return;
    el.style.gridTemplateColumns = (t.brandsLayout === 'grid2' ? 'repeat(2, 1fr)' :
                                    t.brandsLayout === 'grid8' ? 'repeat(8, 1fr)' :
                                    'repeat(4, 1fr)');
  }, [t.brandsLayout]);

  useE(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  const onAdd = (p) => {
    setCart(c => [...c, p]);
    setToast(`Agregado · ${p.name}`);
  };

  return (
    <>
      <HeartStrip />
      <Header cartCount={cart.length} />
      <AnnounceBar />
      <Hero autoplay={t.heroAutoplay} />
      <Categories />
      <TopSellers onAdd={onAdd} />
      <Value />
      <MidBanner />
      <BrandsSection />
      <Spotlight />
      {t.showInstagram && <InstaFeed />}
      <Newsletter />
      <Footer />

      {toast && (
        <div className="t4-toast">
          <span className="dot"></span>
          {toast}
        </div>
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color" />
        <TweakColor
          label="Acento"
          value={t.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakSelect
          label="Fondo newsletter"
          value={t.newsletterBg}
          options={[
            { value: 'terracota', label: 'Acento (terracota)' },
            { value: 'cream',     label: 'Crema / beige' },
            { value: 'paper',     label: 'Blanco (minimal)' },
            { value: 'ink',       label: 'Negro' },
          ]}
          onChange={(v) => setTweak('newsletterBg', v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Densidad"
          value={t.density}
          options={['compact', 'regular', 'comfy']}
          onChange={(v) => setTweak('density', v)}
        />
        <TweakSelect
          label="Grid marcas"
          value={t.brandsLayout}
          options={[
            { value: 'grid2', label: '2 columnas' },
            { value: 'grid4', label: '4 columnas (recomendado)' },
            { value: 'grid8', label: '8 columnas (1 fila)' },
          ]}
          onChange={(v) => setTweak('brandsLayout', v)}
        />

        <TweakSection label="Comportamiento" />
        <TweakToggle
          label="Autoplay hero"
          value={t.heroAutoplay}
          onChange={(v) => setTweak('heroAutoplay', v)}
        />
        <TweakToggle
          label="Mostrar Instagram"
          value={t.showInstagram}
          onChange={(v) => setTweak('showInstagram', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
