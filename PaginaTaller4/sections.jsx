/* Sections.jsx — Hero carousel, Categories, Products, Brand grid, Value, Banner, Spotlight, Instagram, Newsletter */

const { useState, useEffect, useRef } = React;

/* ============================================================
   HERO CAROUSEL — 3 slides, full-bleed, autoplay, arrows + dots
   ============================================================ */
const HERO_SLIDES = [
  {
    img: 'assets/hero-mujer-park.png',
    eyebrow: 'Edición Otoño',
    title: <>Creaciones <em>Chilenas</em> en un solo lugar</>,
    sub: 'Más de 20 marcas locales bajo un mismo techo. Ropa, joyas, accesorios y diseño para tu casa — con un solo despacho.',
    ctaLabel: 'Ver todo',
  },
  {
    img: 'assets/hero-tattoo-bracelet.png',
    eyebrow: 'Hecho a mano',
    title: <>Joyas que cuentan <em>una historia</em></>,
    sub: 'Plata, cuero y semillas trabajadas por orfebres chilenas. Una pieza, una historia, un cuidado especial.',
    ctaLabel: 'Ver joyas',
  },
  {
    img: 'assets/hero-diffuser.png',
    eyebrow: 'Para tu casa',
    title: <>Cariño y buen <em>gusto</em> en cada objeto</>,
    sub: 'Aromas, cerámicas y textiles seleccionados para acompañar tus rituales diarios.',
    ctaLabel: 'Ver casa',
  },
];

const Hero = ({ autoplay = true }) => {
  const [i, setI] = useState(0);
  const total = HERO_SLIDES.length;
  const advance = (dir) => setI(prev => (prev + dir + total) % total);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => setI(prev => (prev + 1) % total), 6000);
    return () => clearInterval(id);
  }, [autoplay, total]);

  return (
    <section className="t4-hero" aria-roledescription="carousel">
      {HERO_SLIDES.map((s, idx) => (
        <div key={idx} className={`t4-hero-slide ${idx === i ? 'active' : ''}`} style={{ backgroundImage: `url(${s.img})` }} aria-hidden={idx !== i} />
      ))}
      <div className="t4-hero-content">
        <div className="t4-hero-eyebrow">{HERO_SLIDES[i].eyebrow}</div>
        <h1 className="t4-hero-title">{HERO_SLIDES[i].title}</h1>
        <p className="t4-hero-sub">{HERO_SLIDES[i].sub}</p>
        <button className="t4-hero-cta">
          {HERO_SLIDES[i].ctaLabel}
          <IcArrowRight />
        </button>
      </div>
      <button className="t4-hero-arrow prev" onClick={() => advance(-1)} aria-label="Slide anterior">
        <svg viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>
      </button>
      <button className="t4-hero-arrow next" onClick={() => advance(1)} aria-label="Slide siguiente">
        <svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>
      </button>
      <div className="t4-hero-dots" role="tablist">
        {HERO_SLIDES.map((_, idx) => (
          <button key={idx} className={`t4-hero-dot ${idx === i ? 'active' : ''}`} onClick={() => setI(idx)} aria-label={`Slide ${idx+1}`} />
        ))}
      </div>
      <div className="t4-hero-slide-counter">
        <b>{String(i+1).padStart(2,'0')}</b><span>/</span>{String(total).padStart(2,'0')}
      </div>
    </section>
  );
};

/* ============================================================
   CATEGORIES — 6 tiles in 2 rows of 3, label below (editorial)
   ============================================================ */
const CATS = [
  { id: 'Mujer',        img: 'assets/cat-mujer.png',        count: '420 productos' },
  { id: 'Hombre',       img: 'assets/cat-hombre.png',       count: '184 productos' },
  { id: 'Casa',         img: 'assets/cat-casa.png',         count: '256 productos' },
  { id: 'Joyas',        img: 'assets/cat-joyas.png',        count: '312 productos' },
  { id: 'Infantil',     img: 'assets/cat-infantil.png',     count: '98 productos'  },
  { id: 'Manualidades', img: 'assets/cat-manualidades.png', count: '147 productos' },
];

const Categories = () => (
  <section className="t4-section">
    <div className="t4-section-head">
      <div>
        <div className="t4-section-eyebrow">Compra por categoría</div>
        <h2 className="t4-section-title">Encuentra lo que <em>buscas</em></h2>
      </div>
      <a className="t4-section-link" href="#">
        Ver todas
        <IcArrowRight />
      </a>
    </div>
    <div className="t4-cats">
      {CATS.map(c => (
        <button key={c.id} className="t4-cat">
          <div className="t4-cat-img">
            <img src={c.img} alt={c.id} loading="lazy" />
          </div>
          <div className="t4-cat-label">
            <div>
              <span>{c.id}</span>
              <div className="t4-cat-count">{c.count}</div>
            </div>
            <span className="t4-cat-arrow"><svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg></span>
          </div>
        </button>
      ))}
    </div>
  </section>
);

/* ============================================================
   PRODUCT GRID — Más Vendidos, 4 cards
   ============================================================ */
const PRODUCTS = [
  { id: 'p1', brand: 'PJMS',     name: 'Pijama largo Pavo Real verde',     price: 49990, was: null,  img: 'assets/hero-pyjama.png',         tag: 'Nuevo' },
  { id: 'p2', brand: 'Raiquen',  name: 'Brazalete de cuero trenzado',      price: 22990, was: null,  img: 'assets/hero-tattoo-bracelet.png', tag: null },
  { id: 'p3', brand: 'Provence', name: 'Difusor aromático Ámbar 250ml',    price: 19990, was: 24990, img: 'assets/hero-diffuser.png',       tag: '-20%', tagMuted: false },
  { id: 'p4', brand: 'Delfina',  name: 'Vestido lino bordado a mano',      price: 64990, was: null,  img: 'assets/cat-mujer.png',           tag: 'Top ventas', tagMuted: true },
];

const clp = (n) => '$' + n.toLocaleString('es-CL');

const ProductCard = ({ p, onAdd }) => (
  <article className="t4-product">
    <div className="t4-product-imgwrap">
      {p.tag && <span className={`t4-product-tag ${p.tagMuted ? 'muted' : ''}`}>{p.tag}</span>}
      <button className="t4-product-fav" aria-label="Favorito">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.4-9.5-9.1A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5.9C19 16.6 12 21 12 21z"/></svg>
      </button>
      <img src={p.img} alt={p.name} loading="lazy" />
      <button className="t4-product-add" onClick={() => onAdd(p)}>Agregar al carrito</button>
    </div>
    <div className="t4-product-brand">{p.brand}</div>
    <div className="t4-product-name">{p.name}</div>
    <div className="t4-product-price">
      {clp(p.price)}
      {p.was && <s>{clp(p.was)}</s>}
    </div>
  </article>
);

const TopSellers = ({ onAdd }) => (
  <section className="t4-section">
    <div className="t4-section-head">
      <div>
        <div className="t4-section-eyebrow">Lo que está volando</div>
        <h2 className="t4-section-title">Más vendidos</h2>
      </div>
      <a className="t4-section-link" href="#">
        Ver todos
        <IcArrowRight />
      </a>
    </div>
    <div className="t4-products">
      {PRODUCTS.map(p => <ProductCard key={p.id} p={p} onAdd={onAdd} />)}
    </div>
  </section>
);

/* ============================================================
   VALUE PROP — 3 columns
   ============================================================ */
const Value = () => (
  <section className="t4-value">
    <div className="t4-value-inner">
      <div className="t4-value-col">
        <span className="t4-value-icon">
          <svg viewBox="0 0 24 24"><path d="M3 7h13v9H3zM16 10h4l2 3v3h-6M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
        </span>
        <div className="t4-value-num">01</div>
        <p className="t4-value-text">Todo en un mismo lugar y pagas <em>un solo envío</em>.</p>
      </div>
      <div className="t4-value-col">
        <span className="t4-value-icon">
          <svg viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </span>
        <div className="t4-value-num">02</div>
        <p className="t4-value-text">Al mismo precio que venden las marcas <em>directo al público</em>.</p>
      </div>
      <div className="t4-value-col">
        <span className="t4-value-icon">
          <svg viewBox="0 0 24 24"><path d="M12 2 14.4 9.2 22 9.2l-6.2 4.5L18.2 21 12 16.5 5.8 21l2.4-7.3L2 9.2h7.6z"/></svg>
        </span>
        <div className="t4-value-num">03</div>
        <p className="t4-value-text">Seleccionamos los <em>mejores productos</em> con cariño, para ti.</p>
      </div>
    </div>
  </section>
);

/* ============================================================
   MID BANNER — photo + CTA
   ============================================================ */
const MidBanner = () => (
  <section className="t4-banner">
    <div className="t4-banner-inner">
      <div className="t4-banner-photo" style={{ backgroundImage: 'url(assets/hero-pyjama.png)' }} role="img" aria-label="Pijama tropical Pavo Real"></div>
      <div className="t4-banner-text">
        <div className="t4-banner-eyebrow">Colección Pavo Real</div>
        <h2 className="t4-banner-title">El nuevo verano,<br/>de la mano de PJMS.</h2>
        <p>Pijamas, kimonos y sets de algodón estampados a mano en Santiago. Una colección hecha para quedarse en casa con estilo.</p>
        <button className="t4-banner-cta">
          Ver colección
          <svg viewBox="0 0 24 12"><path d="M1 6h21M17 1l5 5-5 5" /></svg>
        </button>
      </div>
    </div>
  </section>
);

/* ============================================================
   BRANDS — 8 fictitious brand logos in a grid
   ============================================================ */
const BRAND_LIST = [
  { name: 'Delfina',     style: 'script' },
  { name: 'Raiquen',     style: 'condensed' },
  { name: 'Provence',    style: 'serif' },
  { name: 'Evolve',      style: 'thin' },
  { name: 'De Cleme',    style: 'handwritten' },
  { name: 'Other Owner', style: 'stack', extra: 'RESALE' },
  { name: 'PJMS',        style: 'boxed' },
  { name: 'Ana Paula',   style: 'bold' },
];

const BrandLogo = ({ b }) => {
  if (b.style === 'stack') {
    return (
      <div className={`t4-brand-logo stack`}>
        <span className="name">{b.name}<b>{b.extra}</b></span>
      </div>
    );
  }
  return (
    <div className={`t4-brand-logo ${b.style}`}>
      <span className="name">{b.name}</span>
      <span className="tagline">Marca chilena</span>
    </div>
  );
};

const BrandsSection = () => (
  <section className="t4-brands">
    <div className="t4-brands-inner">
      <div className="t4-section-head centered">
        <div className="t4-section-eyebrow">Nuestras Marcas</div>
        <h2 className="t4-section-title">Diseño chileno, en <em>buena compañía</em></h2>
      </div>
      <div className="t4-brand-grid">
        {BRAND_LIST.map(b => (
          <a key={b.name} className="t4-brand-cell" href="#" aria-label={b.name}>
            <BrandLogo b={b} />
          </a>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   BRAND SPOTLIGHT — "Conoce a las marcas"
   ============================================================ */
const Spotlight = () => (
  <section className="t4-spotlight">
    <div className="t4-spotlight-inner">
      <div className="t4-spotlight-photo" style={{ backgroundImage: 'url(assets/hero-mujer-park.png)' }}>
        <span className="badge">Marca del mes</span>
      </div>
      <div className="t4-spotlight-text">
        <div className="t4-spotlight-brand">Delfina · Diseño desde Ñuñoa</div>
        <h2 className="t4-spotlight-title">"Diseñamos para vestir el día a día con cariño."</h2>
        <p className="t4-spotlight-quote">Detrás de cada prenda hay un taller pequeño, telas naturales y manos chilenas. Delfina lleva ocho años haciendo ropa de mujer que dura, se hereda y se cuida.</p>
        <dl className="t4-spotlight-meta">
          <div>
            <dt>Fundado</dt>
            <dd>2018</dd>
          </div>
          <div>
            <dt>Origen</dt>
            <dd>Santiago, Chile</dd>
          </div>
          <div>
            <dt>Categoría</dt>
            <dd>Moda Mujer</dd>
          </div>
        </dl>
        <button className="t4-spotlight-cta">
          Conocer a Delfina
          <IcArrowRight />
        </button>
      </div>
    </div>
  </section>
);

/* ============================================================
   INSTAGRAM — 6-up grid
   ============================================================ */
const IG_IMAGES = [
  'assets/cat-mujer.png',
  'assets/cat-joyas.png',
  'assets/hero-diffuser.png',
  'assets/cat-casa.png',
  'assets/hero-tattoo-bracelet.png',
  'assets/cat-manualidades.png',
];

const InstaFeed = () => (
  <section className="t4-section">
    <div className="t4-section-head centered">
      <div className="t4-section-eyebrow">@taller4chile</div>
      <h2 className="t4-section-title">Síguenos en <em>Instagram</em></h2>
    </div>
    <div className="t4-ig-grid">
      {IG_IMAGES.map((src, i) => (
        <a key={i} href="#" className="t4-ig-cell" style={{ backgroundImage: `url(${src})` }} aria-label={`Foto ${i+1}`}></a>
      ))}
    </div>
  </section>
);

/* ============================================================
   NEWSLETTER — terracota background
   ============================================================ */
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const submit = (e) => { e.preventDefault(); if (email) { setDone(true); setTimeout(() => { setDone(false); setEmail(''); }, 2400); } };
  return (
    <section className="t4-newsletter">
      <div className="t4-newsletter-inner">
        <div>
          <div className="t4-newsletter-eyebrow">Inscríbete en nuestro newsletter</div>
          <h2 className="t4-newsletter-title">¡Sé el primero en enterarte!</h2>
          <p className="t4-newsletter-sub">Descuentos, beneficios, concursos y las novedades de las marcas — sin spam, con cariño. <span style={{ color: 'white' }}>❤</span></p>
        </div>
        <div>
          <form className="t4-newsletter-form" onSubmit={submit}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce la dirección de correo electrónico"
              aria-label="Correo electrónico"
            />
            <button type="submit">{done ? '¡Gracias!' : 'Suscribirme'}</button>
          </form>
          <div className="t4-newsletter-fine">Te enviaremos un mail a la semana, máximo. Puedes darte de baja cuando quieras.</div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, {
  Hero, Categories, TopSellers, Value, MidBanner, BrandsSection, Spotlight, InstaFeed, Newsletter,
});
