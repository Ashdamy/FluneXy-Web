import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { listarHistorial } from '../../datos/pagos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { diaISO, diasHasta, formatoFecha, haceDias } from '../../utilidades/fecha.js'
import { formatoPesos } from '../../utilidades/moneda.js'

const DIAS_PERIODO = 30

export default function HistorialPagos() {
  useClaseBody('mod-pagos')
  useTituloPagina('Historial de Pagos')
  const navigate = useNavigate()
  const filas = listarHistorial().filter((fila) => diasHasta(fila.fecha) >= -DIAS_PERIODO)
  const encabezado = <EncabezadoPagina titulo="Historial de Pagos" subtitulo="Pagos y aportes registrados" />

  if (filas.length === 0) {
    return (
      <>
        {encabezado}
        <section className="filter-periodo simple">
          <span className="icono-periodo"><i className="ph ph-calendar"></i></span>
          <span className="texto-periodo">{formatoFecha(haceDias(DIAS_PERIODO, '12:00'))} – {formatoFecha(diaISO())}</span>
        </section>
        <section className="estado-vacio">
          <div className="ilustracion-estado-vacio">
            <div className="circulo-estado-vacio"></div>
            <span className="icono-estado-vacio"><i className="ph ph-clipboard-text"></i></span>
          </div>
          <h2>Sin transacciones</h2>
          <p>No hay pagos ni aportes registrados en el período seleccionado</p>
        </section>
        <section className="fab-group">
          <button type="button" className="boton-registrar-pago" onClick={() => navigate('/cuotas')}>Registrar Pago</button>
        </section>
      </>
    )
  }

  return (
    <>
      {encabezado}
      {/* ponytail: selector decorativo como en el prototipo, siempre 30 dias; se conecta cuando haya un diseño del menu */}
      <section className="filter-periodo">
        <span className="icono-periodo"><i className="ph ph-calendar"></i></span>
        <span className="texto-periodo">Últimos {DIAS_PERIODO} días</span>
        <span className="flecha-periodo">▾</span>
      </section>
      <span className="etiqueta-orden">ORDENADO POR FECHA</span>
      <section className="tabla-historial-pagos">
        <div className="lista-pagos">
          {filas.map((fila) => (
            <article key={fila.clave} className="item-pago">
              <div className="icono-pago"><i className={`ph ${fila.icono}`}></i></div>
              <div className="informacion-pago">
                <h4>{fila.titulo}</h4>
                <p>{fila.detalle} · {formatoFecha(fila.fecha)}</p>
              </div>
              <div className="valor-pago">
                <strong>{formatoPesos(fila.monto)}</strong>
                <span className={`tipo-pago ${fila.tipo}`}>{fila.etiqueta}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
