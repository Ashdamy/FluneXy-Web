import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo-fluenxy.png'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'

// Pagina publica de presentacion (frontend/index.html). Todo su contenido es
// fijo, asi que las tarjetas repetidas salen de estas listas.
const BENEFICIOS = [
  ['ph-robot', 'Organización inteligente', 'Categoriza y clasifica tus movimientos automáticamente.'],
  ['ph-arrows-clockwise', 'Automatización', 'Plantillas y flujos recurrentes sin esfuerzo manual.'],
  ['ph-clipboard-text', 'Reportes financieros', 'Visualiza tu balance con reportes claros y detallados.'],
  ['ph-target', 'Seguimiento de metas', 'Define metas de ahorro y monitorea tu progreso.'],
  ['ph-user', 'Control total', 'Administra fondos, activos y pasivos en un solo lugar.'],
]

const MODULOS = [
  ['ph-wallet', 'Fondos', 'Administra tus cuentas, billeteras y efectivo.'],
  ['ph-arrows-left-right', 'Movimientos', 'Registra tus ingresos y gastos al instante.'],
  ['ph-file-text', 'Activos', 'Lleva el control de lo que posees.'],
  ['ph-credit-card', 'Pasivos', 'Da seguimiento a tus deudas y obligaciones.'],
  ['ph-target', 'Metas', 'Define objetivos de ahorro claros.'],
  ['ph-arrows-clockwise', 'Plantillas', 'Automatiza movimientos recurrentes.'],
  ['ph-receipt', 'Cuotas', 'Organiza pagos fraccionados fácilmente.'],
  ['ph-money', 'Pagos', 'Controla vencimientos y pagos pendientes.'],
  ['ph-bank', 'Flujo de caja', 'Visualiza entradas y salidas de dinero.'],
]

const FILAS_MOVIMIENTOS = [
  ['Salario', 'Ingreso', 'Principal', '01 Jul', 'pos', '+$1,800,000'],
  ['Mercado', 'Alimentación', 'Efectivo', '02 Jul', 'neg', '-$320,000'],
  ['Transporte', 'Movilidad', 'Principal', '03 Jul', 'neg', '-$120,000'],
  ['Suscripciones', 'Servicios', 'Efectivo', '05 Jul', 'neg', '-$45,000'],
  ['Ahorro', 'Metas', 'Metas', '07 Jul', 'pos', '+$250,000'],
]

const RAZONES = [
  ['ph-gear', 'Seguridad integral', 'Tus datos financieros protegidos en cada módulo.'],
  ['ph-arrows-clockwise', 'Automatización real', 'Menos tareas manuales, más control automático.'],
  ['ph-chart-line', 'Métricas claras', 'Indicadores y balances entendibles al instante.'],
  ['ph-target', 'Crecimiento patrimonial', 'Metas y seguimiento para construir tu futuro.'],
]

export default function Landing() {
  useClaseBody('landing')
  useTituloPagina('Tu app financiera')
  const navigate = useNavigate()
  const registro = () => navigate('/autenticacion/registro')

  return (
    <>
      <header className="landing-header">
        <nav className="landing-nav">
          <img className="nav-logo" src={logo} alt="FluneXy" />
          <div className="nav-links">
            <a href="#producto">Producto</a>
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#beneficios">Beneficios</a>
          </div>
          <div className="nav-actions">
            <button type="button" className="btn btn-ghost btn-header" onClick={() => navigate('/autenticacion/iniciar-sesion')}>Iniciar sesión</button>
            <button type="button" className="btn btn-primary btn-header" onClick={registro}>Comenzar gratis</button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" id="producto">
          <div className="hero-orb orb-indigo"></div>
          <div className="hero-orb orb-violet"></div>
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span className="badge-label">PLATAFORMA FINANCIERA INTELIGENTE</span>
            </div>
            <h1 className="hero-title">Controla tus finanzas<br />con total claridad</h1>
            <p className="hero-description">FluneXy centraliza tus fondos, movimientos, metas y reportes en un solo lugar, para que tomes mejores decisiones financieras cada día.</p>
            <div className="hero-actions">
              <button type="button" className="btn btn-primary btn-lg" onClick={registro}>Comenzar gratis</button>
            </div>
            <div className="hero-checkpoints">
              {['Sin tarjeta de crédito', 'Configuración en minutos', 'Datos protegidos'].map((texto) => (
                <div key={texto} className="checkpoint"><span className="check-icon"><i className="ph ph-check"></i></span> {texto}</div>
              ))}
            </div>
          </div>
          {/* Maqueta decorativa de la aplicacion. La altura de cada barra va en la variable CSS --h. */}
          <div className="hero-mockup">
            <div className="mockup-sidebar">
              <span className="ms-logo">F</span>
              <span className="ms-item active"></span>
              <span className="ms-item"></span>
              <span className="ms-item"></span>
              <span className="ms-item"></span>
              <span className="ms-item"></span>
            </div>
            <div className="mockup-main">
              <div className="mockup-top">
                <span>Bienvenido de vuelta</span>
                <span className="m-avatar"></span>
              </div>
              <div className="mockup-balance">
                <div>
                  <span className="m-label">SALDO TOTAL</span>
                  <strong>$ 2,540,000</strong>
                </div>
                <span className="m-badge">+12.4%</span>
              </div>
              <div className="mockup-chart">
                {['55%', '80%', '45%', '95%', '70%', '100%', '60%'].map((alto, i) => (
                  <span key={i} style={{ '--h': alto }}></span>
                ))}
              </div>
              <div className="mockup-stats">
                <div className="m-stat">
                  <span className="m-dot" style={{ background: '#34D399' }}></span>
                  <div><span>Ingresos</span><strong>+$4.2M</strong></div>
                </div>
                <div className="m-stat">
                  <span className="m-dot" style={{ background: '#F87171' }}></span>
                  <div><span>Gastos</span><strong>-$1.7M</strong></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="beneficios" id="funcionalidades">
          <h2 className="section-title">Todo lo que necesitas para tu salud financiera</h2>
          <p className="section-subtitle">Beneficios diseñados para darte control real sobre tu dinero</p>
          <div className="beneficios-grid">
            {BENEFICIOS.map(([icono, titulo, texto]) => (
              <div key={titulo} className="beneficio-card">
                <div className="card-icon"><i className={`ph ${icono}`}></i></div>
                <h3 className="card-title">{titulo}</h3>
                <p className="card-text">{texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="modulos" id="beneficios">
          <h2 className="section-title">Un módulo para cada parte de tus finanzas</h2>
          <p className="section-subtitle">Explora las herramientas ya disponibles dentro de la plataforma</p>
          <div className="modulos-grid">
            {MODULOS.map(([icono, titulo, texto]) => (
              <div key={titulo} className="modulo-card">
                <div className="modulo-top">
                  <div className="card-icon"><i className={`ph ${icono}`}></i></div>
                  <h3 className="card-title">{titulo}</h3>
                </div>
                <p className="card-text">{texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="showcase">
          <h2 className="section-title">Diseñado para que veas todo con claridad</h2>
          <p className="section-subtitle">Una vista real de tu módulo de Movimientos, con la misma experiencia del Dashboard</p>
          <div className="showcase-frame">
            <div className="browser-bar">
              <span className="b-dot" style={{ background: '#F87171' }}></span>
              <span className="b-dot" style={{ background: '#FBBF24' }}></span>
              <span className="b-dot" style={{ background: '#34D399' }}></span>
              <span className="b-url">flunexy.com/movimientos</span>
            </div>
            <div className="mov-screen">
              <div className="mov-header">
                <h3>Mis Movimientos</h3>
                <button type="button" className="mov-btn">+ Nuevo movimiento</button>
              </div>
              <div className="mov-table">
                <div className="mov-row mov-head">
                  <span>Concepto</span>
                  <span>Categoría</span>
                  <span>Fondo</span>
                  <span>Fecha</span>
                  <span>Valor</span>
                </div>
                {FILAS_MOVIMIENTOS.map(([nombre, categoria, fondo, fecha, clase, valor]) => (
                  <div key={nombre} className="mov-row">
                    <span className="mov-name">{nombre}</span>
                    <span className="mov-cat">{categoria}</span>
                    <span>{fondo}</span>
                    <span>{fecha}</span>
                    <span className={clase}>{valor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="porque">
          <div className="porque-left">
            <h2 className="section-title">¿Por qué elegir FluneXy?</h2>
            <p className="section-subtitle">Seguridad, automatización y claridad en cada decisión financiera.</p>
            {RAZONES.map(([icono, titulo, texto]) => (
              <div key={titulo} className="feature-row">
                <div className="feature-icon"><i className={`ph ${icono}`}></i></div>
                <div className="feature-text">
                  <strong>{titulo}</strong>
                  <span>{texto}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="highlight-card">
            <div className="card-icon"><i className="ph ph-robot"></i></div>
            <h3>Todo en un solo lugar</h3>
            <p>Fondos, movimientos, metas, activos y pasivos conectados entre sí, para que veas el panorama completo de tu economía sin cambiar de app.</p>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-panel">
            <h2>Empieza a controlar tus finanzas hoy</h2>
            <p>Únete a FluneXy y organiza tus fondos, movimientos y metas en un solo lugar.</p>
            <button type="button" className="btn" onClick={registro}>Comenzar gratis</button>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">FluneXy</div>
            <p className="footer-tagline">Fluye con tus finanzas</p>
            <p className="footer-desc">Plataforma financiera personal para organizar fondos, movimientos, metas y reportes en un solo lugar.</p>
          </div>
          <div className="footer-cols">
            {/* Soporte y legal son HTML estatico en public/ (decision de Santiago): enlace normal, no de React Router. */}
            <div className="footer-col">
              <h4>¿TIENES ALGUNA PREGUNTA?</h4>
              <a href="/soporte/preguntas-frecuentes.html">Contactanos</a>
            </div>
            <div className="footer-col">
              <h4>IDENTIDAD DE MARCA</h4>
              <a href="https://manual-identidad-flunexy-wr23.vercel.app/index.html#portada">Manual de identidad</a>
            </div>
            <div className="footer-col">
              <h4>CONTACTO</h4>
              <p>soporte@flunexy.com</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 FluneXy. Todos los derechos reservados.</p>
          <div className="legal">
            <a href="/legal/politicas.html">Política de tratamiento de datos personales</a>
          </div>
        </div>
      </footer>
    </>
  )
}
