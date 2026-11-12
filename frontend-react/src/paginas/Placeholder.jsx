import { useParams, useSearchParams } from 'react-router-dom'
import EncabezadoPagina from '../componentes/EncabezadoPagina.jsx'
import useClaseBody from '../hooks/useClaseBody.js'
import useTituloPagina from '../hooks/useTituloPagina.js'

// Pagina temporal de la Fase 1. Ya solo la usa la ruta "*" (pagina no
// encontrada), que no tiene diseño en el prototipo.

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

