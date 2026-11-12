import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { obtenerFondo } from '../../datos/fondos.js'
import { ahorroMensual, desactivarMeta, diasRestantes, estadoMeta, obtenerMeta, progresoMeta } from '../../datos/metas.js'
import { aportesDeMeta } from '../../datos/pagos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { diasHasta, formatoMesAnio } from '../../utilidades/fecha.js'
import { formatoPesos } from '../../utilidades/moneda.js'
import ModalDesactivarMeta from './ModalDesactivarMeta.jsx'

// "hace 12 días", "hoy" o "ayer" para el ultimo aporte.
function haceCuanto(dia) {
  const dias = -diasHasta(dia)
  if (dias <= 0) return 'hoy'
  if (dias === 1) return 'ayer'
  return `hace ${dias} días`
}

export default function DetalleMeta() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [confirmando, setConfirmando] = useState(false)
  useClaseBody(confirmando ? 'mod-meta-detalle mod-meta-desactivar' : 'mod-meta-detalle')
  useTituloPagina('Detalle de Meta')

  // HU09.2, flujo 4.2: si la meta no existe se vuelve al listado.
  const meta = obtenerMeta(id)
  if (!meta) return <Navigate to="/metas" replace />

  const progreso = progresoMeta(meta)
  const estado = estadoMeta(meta)
  const fondo = obtenerFondo(meta.fondoId)
  const [ultimo] = aportesDeMeta(meta.id)
  const mesAnio = formatoMesAnio(meta.fechaObjetivo)

  function confirmarDesactivar() {
    desactivarMeta(meta.id)
    navigate('/metas')
  }

  // RN09.2.2: nombre, montos, progreso, ahorro mensual, fondo, fecha objetivo y estado.
  // La BD no guarda fecha de creacion, asi que ese recuadro del prototipo no se muestra.
  const tiles = [
    ['ph-target', 'MONTO OBJETIVO', formatoPesos(meta.montoObjetivo)],
    ['ph-piggy-bank', 'MONTO AHORRADO', formatoPesos(meta.montoAhorrado)],
    ['ph-wallet', 'FONDO ASOCIADO', fondo.nombre],
    ['ph-calendar-blank', 'FECHA OBJETIVO', mesAnio],
  ]

  return (
    <>
      <EncabezadoPagina titulo="Detalle de Meta" subtitulo="Información completa del objetivo" />
      <section className="hero-card">
        <div className="hero-icono"><i className="ph ph-target"></i></div>
        <h2 className="hero-titulo">{meta.nombre}</h2>
        <span className="badge-tipo">Meta Financiera</span>
        <span className="chip-estado">{estado.etiqueta}</span>
        <span className="hero-label">PROGRESO DE AHORRO</span>
        <strong className="hero-valor">{progreso}%</strong>
        <span className="hero-detalle">{formatoPesos(meta.montoAhorrado)} de {formatoPesos(meta.montoObjetivo)}</span>
        <span className="hero-faltan">Faltan {formatoPesos(Math.max(0, meta.montoObjetivo - meta.montoAhorrado))}</span>
      </section>
      <section className="calc-card">
        <div className="c-icono"><i className="ph ph-coins"></i></div>
        <div className="c-info">
          <span className="c-label">Ahorro Mensual Requerido</span>
          <strong className="c-valor">{formatoPesos(ahorroMensual(meta))}</strong>
          <span className="c-fecha">Para cumplir en {mesAnio}</span>
        </div>
        <div className="c-der">
          <strong>{diasRestantes(meta.fechaObjetivo)}</strong>
          <span>días restantes</span>
        </div>
      </section>
      <h3 className="info-titulo">INFORMACIÓN</h3>
      <section className="tiles">
        {tiles.map(([icono, etiqueta, valor]) => (
          <div key={etiqueta} className="tile">
            <div className="fila-tile">
              <i className={`ph ${icono}`}></i>
              <span className="tile-label">{etiqueta}</span>
            </div>
            <strong>{valor}</strong>
          </div>
        ))}
        <div className="tile tile-indigo">
          <div className="fila-tile">
            <i className="ph ph-check-circle"></i>
            <span className="tile-label">ESTADO</span>
          </div>
          <strong>{estado.codigo}</strong>
        </div>
      </section>
      {/* RN09.2.5: Registrar Aporte lleva al modulo Pagos. RN09.4.4: una meta
          inactiva no recibe aportes, y (como en los demas modulos) tampoco
          muestra Editar ni Desactivar (RN09.3.2 y RN09.4.2). */}
      {meta.activo && (
        <>
          <Link className="aporte-banner" to={`/pagos/registrar-aporte?meta=${meta.id}`}>
            <span className="a-icono"><i className="ph ph-plus"></i></span>
            <div className="a-info">
              <strong>Registrar Aporte</strong>
              <span>{ultimo ? `Último aporte: ${formatoPesos(ultimo.monto)} ${haceCuanto(ultimo.fecha)}` : 'Aún no hay aportes registrados'}</span>
            </div>
            <span className="a-arr"><i className="ph ph-arrow-right"></i></span>
          </Link>
          <div className="acciones-detalle">
            <button type="button" className="btn-editar" onClick={() => navigate(`/metas/${meta.id}/editar`)}>
              <i className="ph ph-pencil-simple"></i> Editar Meta
            </button>
            <button type="button" className="btn-desactivar" onClick={() => setConfirmando(true)}>
              <i className="ph ph-warning"></i> Desactivar Meta
            </button>
          </div>
        </>
      )}
      {confirmando && (
        <ModalDesactivarMeta meta={meta} onCancelar={() => setConfirmando(false)} onConfirmar={confirmarDesactivar} />
      )}
    </>
  )
}
