import { Outlet, useLocation } from 'react-router-dom'
import BarraLateral from './BarraLateral.jsx'

// Estructura comun de las paginas internas. <Outlet /> es el lugar donde
// React Router dibuja la pagina de la ruta actual.
//
// El menu movil es el mismo truco de CSS de antes: un checkbox oculto y dos
// <label> que lo marcan/desmarcan. El CSS usa "#menu-toggle:checked ~ ...",
// por eso el input, los label y el aside deben quedar como hermanos.
export default function LayoutApp() {
  const { pathname } = useLocation()

  return (
    <>
      {/* Antes cada clic recargaba la pagina y el checkbox volvia a estar
          desmarcado. En React no hay recarga: al cambiar "key" con la ruta,
          React crea un checkbox nuevo (desmarcado) y el menu se cierra. */}
      <input key={pathname} type="checkbox" id="menu-toggle" className="menu-toggle" aria-hidden="true" />
      <label htmlFor="menu-toggle" className="menu-hamburguesa" aria-label="Abrir menú">
        <span></span><span></span><span></span>
      </label>
      <label htmlFor="menu-toggle" className="menu-overlay" aria-hidden="true"></label>
      <BarraLateral />
      {/* En el prototipo solo Inicio tiene una clase extra en el <main> (pagina-home). */}
      <main className={pathname === '/home' ? 'contenido-principal pagina-home' : 'contenido-principal'}>
        <Outlet />
      </main>
    </>
  )
}
