import { Outlet } from 'react-router-dom'
import useClaseBody from '../hooks/useClaseBody.js'

// Estructura comun de las paginas de autenticacion (sin barra lateral).
// Las 6 paginas originales tienen <body class="mod-auth"> y envuelven su
// contenido en este mismo <main>, asi que ambas cosas viven aqui.
export default function LayoutPublico() {
  useClaseBody('mod-auth')
  return (
    <main className="contenedor-autenticacion">
      <Outlet />
    </main>
  )
}
