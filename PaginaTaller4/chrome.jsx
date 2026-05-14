/* Chrome.jsx — header (heart strip, sticky nav, mega menu, search) + footer */

const HeartStrip = () => (
  <div className="t4-heart-strip">
    Desde Chile con Amor <span className="heart">❤</span>
    <span className="sep">·</span>
    Despacho a todo Chile
    <span className="sep">·</span>
    3 cuotas sin interés
  </div>
);

const IcSearch = () => <svg viewBox="0 0 24 24" className="t4-ic" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
const IcUser = () => <svg viewBox="0 0 24 24" className="t4-ic" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
const IcBag = () => <svg viewBox="0 0 24 24" className="t4-ic" aria-hidden="true"><path d="M6 7h12l-1 13H7zM9 7V5a3 3 0 0 1 6 0v2" /></svg>;
const IcChev = () => <svg viewBox="0 0 24 24" className="t4-nav-chev" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>;
const IcArrowRight = () => <svg viewBox="0 0 24 12" className="t4-hero-cta-arrow" aria-hidden="true"><path d="M1 6h21M17 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const IcFacebook = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></svg>;
const IcInstagram = () => <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg>;
const IcTikTok = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 4v2.5a4.5 4.5 0 0 0 4.5 4.5M16 4v12a4 4 0 1 1-4-4" /></svg>;

/* Mega-menu structure */
const MEGA = {
  categorias: {
    cols: [
      { h: 'Mujer', items: ['Vestidos','Blusas y Tops','Pantalones','Pijamas y Lounge','Trajes de Baño','Accesorios'] },
      { h: 'Hombre', items: ['Polerones','Camisas','Pantalones','Calcetines','Billeteras y Cuero','Accesorios'] },
      { h: 'Casa', items: ['Aromas y Difusores','Textiles','Cerámica','Vajilla','Iluminación','Decoración'] },
      { h: 'Otros', items: ['Joyas','Infantil','Manualidades','Belleza','Papelería','Lo nuevo'] },
    ],
    feature: { img: 'assets/hero-mujer-park.png', cap: 'Edición Otoño', sub: 'Las nuevas llegadas de las marcas' },
  },
  nosotros: {
    cols: [
      { h: 'Sobre Taller4', items: ['Quiénes somos','Nuestra Tienda','Visítanos','Blog'] },
      { h: 'Ayuda', items: ['Contacto','Cambios y Devoluciones','Despachos','Preguntas frecuentes'] },
      { h: 'Marcas', items: ['Todas las marcas','Súmate al marketplace','Para Wholesale','Prensa'] },
    ],
    feature: { img: 'assets/storefront.png', cap: 'Visítanos en Vitacura', sub: 'Luis Pasteur 6677, Local 4' },
  },
};

const Header = ({ cartCount, onAdd, onSearch }) => {
  const [open, setOpen] = React.useState(null);
  const closeTimer = React.useRef(null);
  const onEnter = (id) => { clearTimeout(closeTimer.current); setOpen(id); };
  const onLeave = () => { closeTimer.current = setTimeout(() => setOpen(null), 120); };

  const navItems = [
    { id: 'categorias', label: 'Categorías', mega: true },
    { id: 'ofertas',    label: 'Ofertas' },
    { id: 'marcas',     label: 'Marcas' },
    { id: 'mas',        label: 'Más Vendidos' },
    { id: 'nosotros',   label: 'Nosotros', mega: true },
  ];

  return (
    <header className="t4-header" onMouseLeave={onLeave}>
      <div className="t4-header-row">
        <a className="t4-logo" href="#" aria-label="Taller4">
          <img src="assets/logo-taller4-black.avif" alt="TALLER·4" />
        </a>
        <nav className="t4-nav">
          {navItems.map(item => (
            <div key={item.id} className="t4-nav-item" onMouseEnter={() => onEnter(item.mega ? item.id : null)}>
              <button className="t4-nav-link">
                {item.label}
                {item.mega && <IcChev />}
              </button>
            </div>
          ))}
        </nav>
        <div className="t4-header-icons">
          <button className="t4-icon-btn" aria-label="Buscar" onClick={onSearch}><IcSearch /></button>
          <button className="t4-icon-btn" aria-label="Cuenta"><IcUser /></button>
          <button className="t4-icon-btn" aria-label="Bolsa">
            <IcBag />
            {cartCount > 0 && <span className="t4-bag-count">{cartCount}</span>}
          </button>
        </div>
      </div>

      {open && MEGA[open] && (
        <div className="t4-mega" onMouseEnter={() => clearTimeout(closeTimer.current)}>
          <div className="t4-mega-inner">
            {MEGA[open].cols.map((c) => (
              <div key={c.h} className="t4-mega-col">
                <h4>{c.h}</h4>
                <ul>
                  {c.items.map(i => <li key={i}><a href="#">{i}</a></li>)}
                </ul>
              </div>
            ))}
            <div className="t4-mega-feature" style={{ backgroundImage: `url(${MEGA[open].feature.img})` }}>
              <div>
                <div className="t4-mega-feature-cap">{MEGA[open].feature.cap}</div>
                <div className="t4-mega-feature-sub">{MEGA[open].feature.sub}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const AnnounceBar = () => (
  <div className="t4-announce">
    <span className="t4-announce-item">
      <svg viewBox="0 0 24 24"><path d="M3 7h13v9H3zM16 10h4l2 3v3h-6M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
      Despacho gratis sobre <em>$45.000</em>
    </span>
    <span className="t4-announce-item">
      <svg viewBox="0 0 24 24"><path d="M4 10h16M4 14h16M4 6h16M4 18h16"/></svg>
      Hasta <em>3 cuotas sin interés</em>
    </span>
    <span className="t4-announce-item">
      <svg viewBox="0 0 24 24"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/><circle cx="12" cy="12" r="6"/></svg>
      30 días para <em>cambios</em>
    </span>
  </div>
);

/* Payment chips — drawn as flat wordmark badges (not external logos) */
const PayChip = ({ kind }) => {
  if (kind === 'visa') return <span className="pay-chip visa">VISA</span>;
  if (kind === 'mc') return <span className="pay-chip mc">●<span>●</span></span>;
  if (kind === 'webpay') return <span className="pay-chip webpay">WEBPAY</span>;
  if (kind === 'amex') return <span className="pay-chip amex">AMEX</span>;
  if (kind === 'mach') return <span className="pay-chip">mach</span>;
  return null;
};

const Footer = () => (
  <footer className="t4-footer">
    <div className="t4-footer-inner">
      <div className="t4-footer-top">
        <div className="t4-footer-brand">
          <img className="logo" src="assets/logo-taller4-black.avif" alt="TALLER·4" />
          <p>Tienda colectiva de diseño y moda chilena. Reunimos marcas locales emergentes en un solo lugar — con cariño, buen gusto y un solo despacho. <span className="heart">❤</span></p>
          <div className="t4-footer-addr">
            <b>Nuestra Tienda</b>
            Luis Pasteur 6677, Local 4<br />
            Vitacura, Santiago<br /><br />
            <b>Horarios</b>
            Lunes a Viernes: 10 a 19hrs.<br />
            Sábados: 11 a 14:30hrs.
          </div>
        </div>

        <div>
          <h4>Comprar</h4>
          <ul>
            <li><a href="#">Lo nuevo</a></li>
            <li><a href="#">Mujer</a></li>
            <li><a href="#">Hombre</a></li>
            <li><a href="#">Casa</a></li>
            <li><a href="#">Joyas</a></li>
            <li><a href="#">Infantil</a></li>
            <li><a href="#">Manualidades</a></li>
            <li><a href="#">Ofertas</a></li>
          </ul>
        </div>

        <div>
          <h4>Información</h4>
          <ul>
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">Despachos y entrega</a></li>
            <li><a href="#">Cambios y devoluciones</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Términos y condiciones</a></li>
          </ul>
        </div>

        <div>
          <h4>Para Marcas</h4>
          <ul>
            <li><a href="#">Súmate al marketplace</a></li>
            <li><a href="#">Wholesale</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Prensa</a></li>
          </ul>
          <h4 style={{ marginTop: 28 }}>Contacto</h4>
          <ul>
            <li>contacto@taller4.cl</li>
            <li>+56 2 2123 4567</li>
          </ul>
        </div>
      </div>

      <div className="t4-footer-bottom">
        <div className="copy">© 2026 Taller4 · Todos los derechos reservados</div>
        <div className="t4-pay">
          <PayChip kind="webpay" />
          <PayChip kind="visa" />
          <PayChip kind="mc" />
          <PayChip kind="amex" />
          <PayChip kind="mach" />
        </div>
        <div className="t4-footer-social">
          <a href="#" aria-label="Instagram"><IcInstagram /></a>
          <a href="#" aria-label="Facebook"><IcFacebook /></a>
          <a href="#" aria-label="TikTok"><IcTikTok /></a>
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, {
  HeartStrip, Header, AnnounceBar, Footer,
  IcSearch, IcUser, IcBag, IcChev, IcArrowRight, IcFacebook, IcInstagram, IcTikTok,
});
