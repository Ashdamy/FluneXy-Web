import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { listarHistorial } from '../../datos/pagos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { diaISO, diasHasta, formatoFecha } from '../../utilidades/fecha.js'
import { formatoPesos } from '../../utilidades/moneda.js'

// HU11.5: el usuario elige el periodo a consultar.
const PERIODOS = {
  dias30: { etiqueta: 'Últimos 30 días', incluye: (fecha) => diasHasta(fecha) >= -30 },
  dias90: { etiqueta: 'Últimos 90 días', incluye: (fecha) => diasHasta(fecha) >= -90 },
  anio: { etiqueta: 'Este año', incluye: (fecha) => fecha.slice(0, 4) === diaISO().slice(0, 4) },
  todo: { etiqueta: 'Todo', incluye: () => true },
}

export default function HistorialPagos() {
  useClaseBody('mod-pagos')
  useTituloPagina('Historial de Pagos')
  const navigate = useNavigate()
  // Confirmacion que deja el formulario al registrar (navigate con state).
  const aviso = useLocation().state?.aviso
  const [periodo, setPeriodo] = useState('dias30')
  const filas = listarHistorial().filter((fila) => PERIODOS[periodo].incluye(fila.fecha))

  // Tambien en el estado vacio, porque HU11.5 permite elegir otro periodo.
  const selectorPeriodo = (
    <section className={filas.length === 0 ? 'filter-periodo simple' : 'filter-periodo'}>
      <span className="icono-periodo"><i className="ph ph-calendar"></i></span>
      <select className="texto-periodo" aria-label="Período a consultar" value={periodo} onChange={(evento) => setPeriodo(evento.target.value)}>
        {Object.entries(PERIODOS).map(([clave, opcion]) => (
          <option key={clave} value={clave}>{opcion.etiqueta}</option>
        ))}
      </select>
      <span className="flecha-periodo">▾</span>
    </section>
  )

  return (
    <>
      <EncabezadoPagina titulo="Historial de Pagos" subtitulo="Pagos y aportes registrados" />
      {aviso && (
        <section className="aviso-pasivos-cuotas" role="status">
          <span className="punto-aviso"></span>
          <span>{aviso}</span>
        </section>
      )}
      {selectorPeriodo}
      {filas.length === 0 ? (
        <>
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
      ) : (
        <>
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
      )}
    </>
  )
}
