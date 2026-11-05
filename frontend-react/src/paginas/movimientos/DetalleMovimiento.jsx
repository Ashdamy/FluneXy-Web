import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { obtenerFondo, TIPOS_FONDO } from '../../datos/fondos.js'
import { desactivarMovimiento, iconoCategoria, obtenerMovimiento, tituloMovimiento } from '../../datos/movimientos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoFecha, formatoHora } from '../../utilidades/fecha.js'
import { formatoPesos } from '../../utilidades/moneda.js'
import ModalDesactivarMovimiento from './ModalDesactivarMovimiento.jsx'

export default function DetalleMovimiento() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [confirmando, setConfirmando] = useState(false)
  useClaseBody(confirmando ? 'mod-modal-movimiento mod-detalle-movimiento' : 'mod-detalle-movimiento')
  useTituloPagina('Detalle del Movimiento')

  const movimiento = obtenerMovimiento(id)
  if (!movimiento) return <Navigate to="/movimientos" replace />

  const fondo = obtenerFondo(movimiento.fondoId)
  const esIngreso = movimiento.tipo === 'ingreso'
  const icono = iconoCategoria(movimiento.tipo, movimiento.categoria)

  function confirmarDesactivar() {
    desactivarMovimiento(movimiento.id)
    navigate('/movimientos')
  }

  return (
    <>
      <EncabezadoPagina titulo="Detalle del Movimiento" subtitulo="Información completa del movimiento" />
      <section className="hero-movimiento">
        <span className="icono-hero"><i className={`ph ${icono}`}></i></span>
        <div className="info-hero">
          <h2>{tituloMovimiento(movimiento)}</h2>
          <span className="badge-tipo">
            <i className={`ph ${esIngreso ? 'ph-arrow-up-right' : 'ph-arrow-down-left'}`}></i> {esIngreso ? 'Ingreso' : 'Gasto'}
          </span>
        </div>
        <div className="monto-hero">
          <span className="etiqueta-monto">MONTO</span>
          <strong>{esIngreso ? '+' : '-'}{formatoPesos(movimiento.monto)}</strong>
        </div>
        <span className="chip-estado">{movimiento.activo ? 'Activo' : 'Inactivo'}</span>
      </section>
      <section className="grid-detalle row">
        {[
          { icono, etiqueta: 'CATEGORÍA', valor: movimiento.categoria },
          { icono: TIPOS_FONDO[fondo.tipo].icono, etiqueta: 'FONDO', valor: fondo.nombre },
          { icono: 'ph-calendar', etiqueta: 'FECHA', valor: formatoFecha(movimiento.fecha) },
          { icono: 'ph-clock', etiqueta: 'HORA', valor: formatoHora(movimiento.fecha) },
        ].map((tile) => (
          <div key={tile.etiqueta} className="col-12 col-sm-6 col-lg-3">
            <article className="tile-detalle">
              <div className="encabezado-tile">
                <i className={`ph ${tile.icono}`}></i>
                <span>{tile.etiqueta}</span>
              </div>
              <strong>{tile.valor}</strong>
            </article>
          </div>
        ))}
      </section>
      <section className="desc-movimiento">
        <span>DESCRIPCIÓN</span>
        <p>{movimiento.descripcion || 'Sin descripción'}</p>
      </section>
      {/* RN05.3.1 y RN05.4.6: un movimiento inactivo no se edita ni se vuelve a desactivar. */}
      {movimiento.activo && (
        <section className="acciones-detalle">
          <button type="button" className="boton-editar" onClick={() => navigate(`/movimientos/${movimiento.id}/editar`)}>
            <i className="ph ph-pencil-simple"></i> Editar Movimiento
          </button>
          <button type="button" className="boton-desactivar" onClick={() => setConfirmando(true)}>
            <i className="ph ph-warning"></i> Desactivar
          </button>
        </section>
      )}
      {confirmando && (
        <ModalDesactivarMovimiento movimiento={movimiento} onCancelar={() => setConfirmando(false)} onConfirmar={confirmarDesactivar} />
      )}
    </>
  )
}
