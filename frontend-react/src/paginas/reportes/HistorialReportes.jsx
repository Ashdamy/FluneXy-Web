import { Link } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { listarReportes, textoPeriodo, TIPOS_REPORTE } from '../../datos/reportes.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoFecha } from '../../utilidades/fecha.js'

export default function HistorialReportes() {
  useClaseBody('mod-reportes')
  useTituloPagina('Historial de Reportes')
  const reportes = listarReportes()
  const [reciente] = reportes

  return (
    <>
      <EncabezadoPagina titulo="Historial de Reportes" subtitulo="Consulta los reportes generados anteriormente" />
      <div className="rep-dashboard">
        <div className="rep-columna-form">
          <div className="hist-barra-seccion">
            <p className="hist-etiqueta">REPORTES GENERADOS</p>
            <Link to="/reportes/generar" className="hist-boton-nuevo"><i className="ph ph-plus"></i> Generar nuevo reporte</Link>
          </div>
          <ul className="hist-lista">
            {reportes.map((reporte) => {
              const tipo = TIPOS_REPORTE[reporte.tipo]
              return (
                <li key={reporte.id} className="hist-fila">
                  <span className={`hist-fila-icono ${tipo.color}`}><i className={`ph ${tipo.icono}`}></i></span>
                  <div className="hist-fila-texto">
                    <strong>{tipo.nombre}</strong>
                    {/* RN16.6: periodo y fecha de generacion guardados. */}
                    <span>Periodo: {textoPeriodo(reporte.periodo)} &nbsp;·&nbsp; Generado el {formatoFecha(reporte.fechaGeneracion)}</span>
                  </div>
                  <Link to={`/reportes/${reporte.id}`} className="hist-fila-enlace">Ver detalle <i className="ph ph-caret-right"></i></Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="rep-columna-vista">
          <p className="hist-etiqueta">REPORTE MÁS RECIENTE</p>
          {reciente && (
            <article className="hist-destacado">
              <span className="hist-destacado-icono"><i className={`ph ${TIPOS_REPORTE[reciente.tipo].icono}`}></i></span>
              <strong className="hist-destacado-titulo">{TIPOS_REPORTE[reciente.tipo].nombre}</strong>
              <span className="hist-destacado-dato">Generado el {formatoFecha(reciente.fechaGeneracion)}</span>
              <span className="hist-destacado-dato">Periodo: {textoPeriodo(reciente.periodo)}</span>
              <Link to={`/reportes/${reciente.id}`} className="hist-destacado-enlace">Ver detalle <i className="ph ph-caret-right"></i></Link>
            </article>
          )}
          <aside className="hist-nota">
            <span className="hist-nota-titulo">SOBRE EL HISTORIAL</span>
            <p>El sistema guarda el tipo, el periodo y la fecha de cada reporte generado, pero no conserva el archivo. Para volver a obtener el PDF o el Excel de un reporte anterior, debe generarse de nuevo con el mismo tipo y periodo.</p>
          </aside>
        </div>
      </div>
    </>
  )
}
