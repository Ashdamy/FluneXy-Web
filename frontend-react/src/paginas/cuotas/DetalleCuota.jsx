import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { abonadoACuota } from '../../datos/pagos.js'
import { obtenerPasivo, tablaAmortizacion } from '../../datos/pasivos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { diasHasta, formatoFecha } from '../../utilidades/fecha.js'
import { formatoPesos } from '../../utilidades/moneda.js'

// "Vence en 12 días", "Vence hoy", "Venció hace 3 días" o "Pagada".
function textoVencimiento(cuota) {
  if (cuota.pagada) return 'Pagada'
  const dias = diasHasta(cuota.fechaVencimiento)
  if (dias === 0) return 'Vence hoy'
  const cantidad = `${Math.abs(dias)} ${Math.abs(dias) === 1 ? 'día' : 'días'}`
  return dias > 0 ? `Vence en ${cantidad}` : `Venció hace ${cantidad}`
}

export default function DetalleCuota() {
  useClaseBody('mod-cuotas')
  useTituloPagina('Detalle de Cuota')
  const navigate = useNavigate()
  const { pasivoId, cuotaId } = useParams()

  const pasivo = obtenerPasivo(pasivoId)
  if (!pasivo) return <Navigate to="/cuotas" replace />

  // La BD identifica la cuota por (id_pasivo, numero_cuota): cuotaId es ese numero.
  const cuotas = tablaAmortizacion(pasivo)
  const cuota = cuotas.find((item) => item.numero === Number(cuotaId))
  if (!cuota) return <Navigate to={`/cuotas/${pasivo.id}`} replace />

  const estado = cuota.pagada ? 'PAGADA' : 'PENDIENTE'

  return (
    <>
      <EncabezadoPagina titulo="Detalle de Cuota" subtitulo="Información completa de la cuota" />
      <section className="hero-cuota">
        <span className="etiqueta-cuota">CUOTA #{cuota.numero} DE {cuotas.length}</span>
        <strong className="monto-cuota">{formatoPesos(cuota.valorCuota)}</strong>
        <span className="nombre-pasivo">{pasivo.nombre}</span>
        <span className="vencimiento-cuota">{formatoFecha(cuota.fechaVencimiento)} · {textoVencimiento(cuota)}</span>
        <span className={`badge ${cuota.pagada ? 'pagada' : 'pendiente'}`}>{estado}</span>
      </section>
      <span className="etiqueta-seccion-contenido">DESGLOSE DE LA CUOTA</span>
      <section className="desglose-card">
        <div className="fila-desglose">
          <span className="punto-desglose"></span>
          <span className="etiqueta-desglose">Saldo Inicial</span>
          <strong className="valor-desglose saldo-inicial">{formatoPesos(cuota.saldoRestante + cuota.abonoCapital)}</strong>
        </div>
        <div className="fila-desglose">
          <span className="punto-desglose"></span>
          <span className="etiqueta-desglose">Interés ({pasivo.tasaMensual}% MV)</span>
          <strong className="valor-desglose interes">{formatoPesos(cuota.interes)}</strong>
        </div>
        <div className="fila-desglose">
          <span className="punto-desglose"></span>
          <span className="etiqueta-desglose">Abono a Capital</span>
          <strong className="valor-desglose abono">{formatoPesos(cuota.abonoCapital)}</strong>
        </div>
        <div className="fila-desglose">
          <span className="punto-desglose"></span>
          <span className="etiqueta-desglose">Saldo Final</span>
          <strong className="valor-desglose saldo-final">{formatoPesos(cuota.saldoRestante)}</strong>
        </div>
      </section>
      <section className="total-card">
        <span className="etiqueta-total">Total a Pagar</span>
        {/* Una cuota puede tener abonos parciales: a pagar queda lo que falta. */}
        <strong className="valor-total">{formatoPesos(cuota.pagada ? cuota.valorCuota : cuota.valorCuota - abonadoACuota(pasivo.id, cuota.numero))}</strong>
      </section>
      <span className="etiqueta-seccion-contenido">INFORMACIÓN DE LA CUOTA</span>
      <section className="tiles-info-cuota row">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="tile-info h-100">
            <span className="etiqueta-tile">ESTADO</span>
            <strong className={cuota.pagada ? 'valor-tile' : 'valor-tile pendiente'}>{estado}</strong>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="tile-info h-100">
            <span className="etiqueta-tile">NÚMERO DE CUOTA</span>
            <strong className="valor-tile">#{cuota.numero} de {cuotas.length}</strong>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="tile-info h-100">
            <span className="etiqueta-tile">PASIVO</span>
            <strong className="valor-tile">{pasivo.nombre}</strong>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="tile-info h-100">
            <span className="etiqueta-tile">ENVÍA DATOS A</span>
            <strong className="valor-tile enlace">Pagos</strong>
          </div>
        </div>
      </section>
      <section className="acciones-cuota">
        {/* Las cuotas se pagan en orden (cuotasPagadas es un contador): solo la proxima
            de un pasivo vigente. La URL le dice a Pagos que cuota es. */}
        {cuota.numero === pasivo.cuotasPagadas + 1 && pasivo.activo && (
          <button
            type="button"
            className="boton-registrar-pago"
            onClick={() => navigate(`/pagos/registrar-pago?pasivo=${pasivo.id}&cuota=${cuota.numero}`)}
          >
            Registrar Pago
          </button>
        )}
        <Link to={`/cuotas/${pasivo.id}`} className="boton-volver"><i className="ph ph-arrow-left"></i> Ver todas las cuotas</Link>
      </section>
    </>
  )
}
