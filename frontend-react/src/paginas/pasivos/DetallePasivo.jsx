import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { AMORTIZACIONES, categoriaPasivo, desactivarPasivo, obtenerPasivo, progresoPago, tablaAmortizacion } from '../../datos/pasivos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoFecha, formatoMesAnio } from '../../utilidades/fecha.js'
import { formatoPesos } from '../../utilidades/moneda.js'
import ModalDesactivarPasivo from './ModalDesactivarPasivo.jsx'

export default function DetallePasivo() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [confirmando, setConfirmando] = useState(false)
  useClaseBody(confirmando ? 'mod-pasivo-detalle mod-pasivo-desactivar' : 'mod-pasivo-detalle')
  useTituloPagina('Detalle del Pasivo')

  const pasivo = obtenerPasivo(id)
  if (!pasivo) return <Navigate to="/pasivos" replace />

  const categoria = categoriaPasivo(pasivo.categoria)
  const progreso = progresoPago(pasivo)
  // Las mismas cuotas que mostrara el modulo Cuotas.
  const cuotas = tablaAmortizacion(pasivo)
  const proxima = cuotas.find((cuota) => !cuota.pagada)
  const restantes = cuotas.length - pasivo.cuotasPagadas

  function confirmarDesactivar() {
    desactivarPasivo(pasivo.id)
    navigate('/pasivos')
  }

  return (
    <>
      <EncabezadoPagina titulo="Detalle del Pasivo" subtitulo="Información completa del pasivo" />
      <section className="hero-card">
        <div className="hero-icono"><i className={`ph ${categoria.icono}`}></i></div>
        <h2 className="hero-titulo">{pasivo.nombre}</h2>
        <span className="badge-tipo">{pasivo.categoria} · Amort. {AMORTIZACIONES[pasivo.amortizacion].etiqueta}</span>
        <span className="chip-estado">{pasivo.activo ? 'Activo' : 'Inactivo'}</span>
        <span className="hero-label">SALDO PENDIENTE</span>
        <strong className="hero-valor">{formatoPesos(pasivo.saldoActual)}</strong>
      </section>
      <section className="progreso-card">
        <span className="label-progreso">PROGRESO DE PAGO</span>
        <div className="barra-progreso">
          <span className="relleno" style={{ width: `${progreso}%` }}></span>
        </div>
        <div className="info-progreso">
          <span className="porcentaje">{progreso}% pagado</span>
          <span className="detalle">
            Inicial {formatoPesos(pasivo.valorInicial)} · Pagado {formatoPesos(pasivo.valorInicial - pasivo.saldoActual)} · Pendiente {formatoPesos(pasivo.saldoActual)}
          </span>
        </div>
      </section>
      <section className="impacto-card">
        <span className="label-impacto">IMPACTO EN BALANCE FINANCIERO</span>
        <strong>{pasivo.activo ? 'Resta al Patrimonio Neto' : 'No afecta el Patrimonio Neto'}</strong>
      </section>
      <section className="tiles">
        <div className="tile">
          <div className="fila-tile">
            <i className="ph ph-percent"></i>
            <span className="tile-label">TASA MENSUAL</span>
          </div>
          <strong>{pasivo.tasaMensual}% MV</strong>
        </div>
        <div className="tile">
          <div className="fila-tile">
            <i className="ph ph-calendar-blank"></i>
            <span className="tile-label">PLAZO</span>
          </div>
          <strong>{pasivo.plazoMeses} meses</strong>
          <small>{restantes} {restantes === 1 ? 'restante' : 'restantes'}</small>
        </div>
        <div className="tile">
          <div className="fila-tile">
            <i className="ph ph-calendar"></i>
            <span className="tile-label">FECHA INICIO</span>
          </div>
          <strong>{formatoFecha(pasivo.fechaInicio)}</strong>
        </div>
        <div className="tile">
          <div className="fila-tile">
            <i className="ph ph-calendar-x"></i>
            <span className="tile-label">FECHA FIN</span>
          </div>
          <strong>{formatoMesAnio(cuotas.at(-1).fechaVencimiento)}</strong>
        </div>
      </section>
      <Link className="cuota-banner" to={`/cuotas/${pasivo.id}`}>
        <span className="c-icono"><i className="ph ph-table"></i></span>
        <div className="c-info">
          <strong>Ver Tabla de Amortización</strong>
          <span>{cuotas.length} cuotas · {proxima ? `Próxima: ${formatoPesos(proxima.valorCuota)}` : 'Pagado por completo'}</span>
        </div>
        <span className="c-arr"><i className="ph ph-arrow-right"></i></span>
      </Link>
      <div className="acciones-detalle">
        <button type="button" className="btn-editar" onClick={() => navigate(`/pasivos/${pasivo.id}/editar`)}>
          <i className="ph ph-pencil-simple"></i> Editar Pasivo
        </button>
        <button type="button" className="btn-desactivar" onClick={() => setConfirmando(true)}>
          <i className="ph ph-warning"></i> Desactivar Pasivo
        </button>
      </div>
      {confirmando && (
        <ModalDesactivarPasivo pasivo={pasivo} onCancelar={() => setConfirmando(false)} onConfirmar={confirmarDesactivar} />
      )}
    </>
  )
}
