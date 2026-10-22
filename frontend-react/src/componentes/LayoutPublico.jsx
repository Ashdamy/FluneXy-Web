import { Outlet } from 'react-router-dom'

// Estructura comun de las paginas de autenticacion (sin barra lateral).
// Las 6 paginas originales envuelven su contenido en este mismo <main>.
export default function LayoutPublico() {
  return (
    <main className="contenedor-autenticacion">
      <Outlet />
    </main>
  )
}
