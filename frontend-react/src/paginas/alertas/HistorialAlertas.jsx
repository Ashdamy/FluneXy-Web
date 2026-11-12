import { Link } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { delMesActual, listarHistorial, obtenerAlerta, tipoDe } from '../../datos/alertas.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoFecha, formatoHora } from '../../utilidades/fecha.js'

export default function HistorialAlertas() {
  useClaseBody('mod-alertas mod-alertas-historial')
  useTituloPagina('Historial de Alertas')
  // RN15.7.1: de la mas reciente a la mas antigua. RN15.7.3 (filtro por fechas) no tiene diseño.
  const historial = listarHistorial()

  return (
    <>
      <EncabezadoPagina titulo="Historial de Alertas" subtitulo="Consulta las notificaciones generadas" />
      <section className="alerta-suma alerta-suma-historial">
        <span className="alerta-suma-orb"></span>
        <div className="alerta-suma-izq">
          <span className="alerta-suma-etiqueta">Este mes</span>
          <strong className="alerta-suma-numero">{delMesActual(historial).length}</strong>
          <span className="alerta-suma-pill">Últimos 30 días</span>
        </div>
        <div className="alerta-suma-der">
          <span className="alerta-suma-total-etiqueta">Total</span>
          <strong className="alerta-suma-total">{historial.length}</strong>
        </div>
        <span className="alerta-suma-divider"></span>
      </section>
      <div className="alerta-fila-titulo">
        <h3>Alertas Generadas</h3>
      </div>
      <section className="alerta-grid row">
        {historial.map((item) => {
          const tipo = tipoDe(obtenerAlerta(item.alertaId))
          return (
            <div key={item.id} className="col-12 col-lg-6">
              <article className={`alerta-tarjeta ${tipo.acento}`}>
                <span className="alerta-acento"></span>
                <span className="alerta-icono"><i className={`ph ${tipo.icono}`}></i></span>
                {/* RN15.8.2: motivo, fecha y valor detectado */}
                <div className="alerta-info">
                  <h4>{item.motivo}</h4>
                  <span>{formatoFecha(item.fecha)} · {formatoHora(item.fecha)}</span>
                </div>
                <div className="alerta-medida">
                  <span className="alerta-etiqueta-medida">Valor</span>
                  <strong>{tipo.formato(item.valor)}</strong>
                </div>
                {item.notificado ? (
                  <span className="alerta-estado"><i className="alerta-punto"></i>Notificado</span>
                ) : (
                  <span className="alerta-estado alerta-estado-inactiva">Sin notificar</span>
                )}
              </article>
            </div>
          )
        })}
      </section>
      <Link to="/alertas" className="alerta-boton-historial">
        <i className="ph ph-bell"></i> Ver Alertas Activas
      </Link>
    </>
  )
}
