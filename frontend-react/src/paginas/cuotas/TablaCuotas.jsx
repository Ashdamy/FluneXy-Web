import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { AMORTIZACIONES, obtenerPasivo, tablaAmortizacion } from '../../datos/pasivos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoFecha } from '../../utilidades/fecha.js'
import { formatoPesos } from '../../utilidades/moneda.js'

const FILTROS = {
  todas: { etiqueta: 'Todas', cumple: () => true },
  pendientes: { etiqueta: 'Pendientes', cumple: (cuota) => !cuota.pagada },
  pagadas: { etiqueta: 'Pagadas', cumple: (cuota) => cuota.pagada },
}

export default function TablaCuotas() {
  useClaseBody('mod-cuotas')
  useTituloPagina('Cuotas')
  const navigate = useNavigate()
  const { pasivoId } = useParams()
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('todas')

  const pasivo = obtenerPasivo(pasivoId)
  if (!pasivo) return <Navigate to="/cuotas" replace />

  // Las cuotas no se guardan: se generan desde los terminos del pasivo.
  const cuotas = tablaAmortizacion(pasivo)
  const encabezado = (
    <EncabezadoPagina titulo="Tabla de Cuotas" subtitulo={`${pasivo.nombre} · Amortización ${AMORTIZACIONES[pasivo.amortizacion].etiqueta}`} />
  )

  // ponytail: hoy no ocurre porque ck_plazo exige plazo > 0; queda para cuando las cuotas vengan de la API
  if (cuotas.length === 0) {
    return (
      <>
        {encabezado}
        <section className="estado-vacio">
          <div className="ilustracion-estado-vacio">
            <div className="circulo-estado-vacio"></div>
            <div className="icono-estado-vacio"><i className="ph ph-clipboard-text"></i></div>
          </div>
          <h2>No hay cuotas registradas</h2>
          <p>Aún no existen cuotas disponibles para consultar en este elemento</p>
        </section>
      </>
    )
  }

  const total = cuotas.length
  const pagadas = cuotas.filter((cuota) => cuota.pagada).length
  const visibles = cuotas.filter((cuota) => FILTROS[filtro].cumple(cuota) && String(cuota.numero).includes(busqueda.trim()))
  const abrir = (cuota) => navigate(`/cuotas/${pasivo.id}/${cuota.numero}`)

  return (
    <>
      {encabezado}
      <section className="hero-summary">
        <div className="resumen-pagadas">
          <span className="etiqueta-resumen">CUOTAS PAGADAS</span>
          <strong className="valor-resumen">{pagadas} de {total}</strong>
          <span className="pill-progreso">{Math.round((pagadas / total) * 100)}% completado</span>
        </div>
        <div className="resumen-mini">
          <span className="etiqueta-mini">Cuotas Restantes</span>
          <strong className="valor-mini1">{total - pagadas}</strong>
        </div>
        <div className="resumen-mini">
          <span className="etiqueta-mini">Total de Cuotas</span>
          <strong className="valor-mini2">{total}</strong>
        </div>
      </section>
      <section className="busqueda-filtro">
        <div className="busqueda-cuota">
          <input
            type="search"
            placeholder="Buscar cuota por número..."
            aria-label="Buscar cuota por número"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </div>
        <select className="filtro-estado" aria-label="Filtrar por estado" value={filtro} onChange={(evento) => setFiltro(evento.target.value)}>
          {Object.entries(FILTROS).map(([clave, opcion]) => (
            <option key={clave} value={clave}>{opcion.etiqueta}</option>
          ))}
        </select>
      </section>
      <span className="etiqueta-orden">ORDENADAS POR VENCIMIENTO</span>
      <section className="tabla-cuotas">
        <table>
          <thead>
            <tr>
              <th>CUOTA</th>
              <th>VENCIMIENTO</th>
              <th>CAPITAL</th>
              <th>INTERESES</th>
              <th>SALDO RESTANTE</th>
              <th>VALOR CUOTA</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((cuota) => (
              <tr
                key={cuota.numero}
                tabIndex={0}
                onClick={() => abrir(cuota)}
                onKeyDown={(evento) => evento.key === 'Enter' && abrir(cuota)}
              >
                <td className="celda-cuota">
                  <span className={`numero-cuota ${cuota.pagada ? 'pagada' : 'pendiente'}`}>{cuota.numero}</span>
                  <strong>Cuota {cuota.numero} de {total}</strong>
                </td>
                <td>{formatoFecha(cuota.fechaVencimiento)}</td>
                <td>{formatoPesos(cuota.abonoCapital)}</td>
                <td>{formatoPesos(cuota.interes)}</td>
                <td>{formatoPesos(cuota.saldoRestante)}</td>
                <td>{formatoPesos(cuota.valorCuota)}</td>
                <td><span className={`badge ${cuota.pagada ? 'pagada' : 'pendiente'}`}>{cuota.pagada ? 'Pagada' : 'Pendiente'}</span></td>
              </tr>
            ))}
            {visibles.length === 0 && (
              <tr><td colSpan={7}>Ninguna cuota coincide con la búsqueda</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  )
}
