import { Link, useParams, useSearchParams } from 'react-router-dom'
import EncabezadoPagina from '../componentes/EncabezadoPagina.jsx'
import useClaseBody from '../hooks/useClaseBody.js'
import useTituloPagina from '../hooks/useTituloPagina.js'

// Paginas temporales de la Fase 1. Cada una se reemplaza por la pagina real
// cuando se migre su modulo en la Fase 2.

// Muestra los datos de la URL (:id, ?tipo=...) para comprobar que la ruta los recibe.
function DatosRuta() {
  const params = useParams()
  const [query] = useSearchParams()
  const datos = { ...params, ...Object.fromEntries(query) }
  if (Object.keys(datos).length === 0) return null
  return <p><small>Datos de la ruta: {JSON.stringify(datos)}</small></p>
}

export default function Placeholder({ titulo, subtitulo, claseBody }) {
  useClaseBody(claseBody)
  useTituloPagina(titulo)
  return (
    <>
      <EncabezadoPagina titulo={titulo} subtitulo={subtitulo} />
      <section style={{ padding: '0 32px' }}>
        <p>Página en construcción: se migra en la Fase 2.</p>
        <DatosRuta />
      </section>
    </>
  )
}

export function PlaceholderPublico({ titulo, claseBody }) {
  useClaseBody(claseBody)
  useTituloPagina(titulo)
  return (
    <section style={{ padding: 32 }}>
      <h1>{titulo}</h1>
      <p>Página en construcción: se migra en la Fase 2.</p>
      <p><Link to="/home">Ir al inicio de la app</Link></p>
    </section>
  )
}
