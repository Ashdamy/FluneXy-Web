import { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo-fluenxy.png'

// Mismo menu y mismas clases que la barra lateral de los HTML originales.
const SECCIONES = [
  {
    titulo: 'PRINCIPAL',
    enlaces: [
      { ruta: '/home', icono: 'ph-house', texto: 'Inicio' },
      { ruta: '/movimientos', icono: 'ph-arrows-left-right', texto: 'Movimientos' },
      { ruta: '/fondos', icono: 'ph-wallet', texto: 'Fondos' },
    ],
  },
  {
    titulo: 'GESTIÓN',
    enlaces: [
      { ruta: '/activos', icono: 'ph-file-text', texto: 'Activos' },
      { ruta: '/pasivos', icono: 'ph-credit-card', texto: 'Pasivos' },
      { ruta: '/metas', icono: 'ph-target', texto: 'Metas' },
      { ruta: '/plantillas', icono: 'ph-arrows-clockwise', texto: 'Plantillas' },
      { ruta: '/cuotas', icono: 'ph-receipt', texto: 'Cuotas' },
      { ruta: '/pagos', icono: 'ph-money', texto: 'Pagos' },
    ],
  },
  {
    titulo: 'ANÁLISIS',
    enlaces: [
      { ruta: '/balance-financiero', icono: 'ph-chart-bar', texto: 'Balance financiero' },
      { ruta: '/indicadores', icono: 'ph-chart-line-up', texto: 'Indicadores' },
      { ruta: '/flujo-caja', icono: 'ph-currency-circle-dollar', texto: 'Flujo de caja' },
      // ponytail: contador fijo como en el prototipo, vendra de la API de alertas
      { ruta: '/alertas', icono: 'ph-bell', texto: 'Alertas', contador: 3 },
      { ruta: '/reportes', icono: 'ph-clipboard-text', texto: 'Reportes' },
    ],
  },
  {
    titulo: 'SOPORTE',
    enlaces: [
      { ruta: '/asistente', icono: 'ph-robot', texto: 'Asistente inteligente' },
      { ruta: '/usuario', icono: 'ph-user', texto: 'Mi perfil' },
    ],
  },
]

// NavLink marca el enlace cuando la ruta actual empieza por su "to"
// (por ejemplo /movimientos/5/editar marca Movimientos). El CSS espera
// la clase "activo", no la "active" que NavLink pone por defecto.
const claseEnlace = ({ isActive }) => (isActive ? 'activo' : undefined)

export default function BarraLateral() {
  return (
    <aside className="barra-lateral">
      <div className="logo-barra">
        <Link to="/" className="logo-enlace"><img src={logo} alt="FluneXy" /></Link>
      </div>
      {SECCIONES.map((seccion) => (
        // Fragment con key: no agrega ningun elemento extra al HTML,
        // asi el aside queda con los mismos hijos que el original.
        <Fragment key={seccion.titulo}>
          <span className="etiqueta-seccion">{seccion.titulo}</span>
          <nav className="navegacion-barra">
            {seccion.enlaces.map((enlace) => (
              <NavLink key={enlace.ruta} to={enlace.ruta} className={claseEnlace}>
                <span className="icono-nav"><i className={`ph ${enlace.icono}`}></i></span> {enlace.texto}
                {enlace.contador && <span className="contador-notificacion">{enlace.contador}</span>}
              </NavLink>
            ))}
          </nav>
        </Fragment>
      ))}
      <hr className="divisor-barra" />
      <Link to="/autenticacion/cierre-sesion" className="cerrar-sesion">
        <span className="icono-nav"><i className="ph ph-sign-out"></i></span> Cerrar sesión
      </Link>
    </aside>
  )
}
