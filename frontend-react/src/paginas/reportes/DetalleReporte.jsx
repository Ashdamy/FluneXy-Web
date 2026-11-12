import { Link, Navigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { obtenerReporte, textoPeriodo, TIPOS_REPORTE } from '../../datos/reportes.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoFecha } from '../../utilidades/fecha.js'

export default function DetalleReporte() {
  useClaseBody('mod-reportes')
  useTituloPagina('Detalle de Reporte')
  const reporte = obtenerReporte(useParams().id)
  if (!reporte) return <Navigate to="/reportes" replace />
  const tipo = TIPOS_REPORTE[reporte.tipo]

  // RN16.6: tipo, periodo, formato y fecha guardados; el archivo no se conserva.
  const datos = [
    ['ph-calendar-blank', 'PERIODO DEL REPORTE', textoPeriodo(reporte.periodo), ''],
    ['ph-calendar-blank', 'FECHA DE GENERACIÓN', formatoFecha(reporte.fechaGeneracion), ''],
    ['ph-clipboard-text', 'FORMATO ORIGINAL', reporte.formato === 'PDF' ? 'PDF' : 'Excel', ''],
    ['ph-warning', 'ESTADO DEL ARCHIVO', 'No disponible', ' det-dato-alerta'],
  ]

  return (
    <>
      <EncabezadoPagina titulo="Detalle de Reporte" subtitulo="Consulta la información de un reporte generado anteriormente" />
      <div className="det-contenido">
        <Link to="/reportes" className="det-volver"><i className="ph ph-caret-left"></i> Volver al Historial de Reportes</Link>
        <section className="det-hero">
          <span className="det-hero-icono"><i className={`ph ${tipo.icono}`}></i></span>
          <div className="det-hero-texto">
            <h2>{tipo.nombre}</h2>
            <p>Reporte financiero</p>
            <span className="det-badge">{tipo.nombre}</span>
          </div>
        </section>
        <div className="det-datos">
          {datos.map(([icono, titulo, valor, extra]) => (
            <article key={titulo} className="det-dato">
              <span className="det-dato-titulo"><i className={`ph ${icono}`}></i> {titulo}</span>
              <strong className={`det-dato-valor${extra}`}>{valor}</strong>
            </article>
          ))}
        </div>
        <p className="det-aviso">FluneXy no almacena el archivo de los reportes generados anteriormente, solo su tipo, periodo y fecha de generación.</p>
        <div className="det-acciones">
          <Link to="/reportes" className="det-boton-volver"><i className="ph ph-caret-left"></i> Volver al Historial</Link>
          <Link to={`/reportes/generar?tipo=${reporte.tipo}&formato=${reporte.formato}`} className="det-boton-generar">
            <i className="ph ph-arrows-clockwise"></i> Generar este reporte de nuevo
          </Link>
        </div>
      </div>
    </>
  )
}
