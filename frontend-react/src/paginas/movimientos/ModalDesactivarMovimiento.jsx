import { createPortal } from 'react-dom'
import { obtenerFondo } from '../../datos/fondos.js'
import { errorSaldo, iconoCategoria, tituloMovimiento } from '../../datos/movimientos.js'
import { formatoPesos } from '../../utilidades/moneda.js'

// Modal propio de Movimientos: su HTML no se parece al de ModalConfirmar
// (otras etiquetas y clases), y su CSS cuelga de la clase
// "mod-modal-movimiento" del <body>, que pone la pagina que lo abre.
export default function ModalDesactivarMovimiento({ movimiento, onCancelar, onConfirmar }) {
  const signo = movimiento.tipo === 'ingreso' ? '+' : '-'
  const titulo = tituloMovimiento(movimiento)
  // Si quitar este ingreso deja el fondo en negativo, no se puede desactivar.
  // El motivo va en la misma caja de advertencia del diseño.
  const bloqueo = errorSaldo(null, movimiento)

  return createPortal(
    <div className="modal-movimiento" onKeyDown={(evento) => evento.key === 'Escape' && onCancelar()}>
      <div className="contenedor-modal" role="alertdialog" aria-modal="true" aria-label="¿Desactivar movimiento?">
        <div className="tarjeta-preview">
          <i className={`ph ${iconoCategoria(movimiento.tipo, movimiento.categoria)}`}></i>
          <div className="info-preview">
            <strong>{titulo}</strong>
            <span>{movimiento.categoria} · {obtenerFondo(movimiento.fondoId).nombre}</span>
          </div>
          <span className="monto-preview">{signo}{formatoPesos(movimiento.monto)}</span>
        </div>
        <div className="icono-advertencia">
          <i className="ph ph-warning"></i>
        </div>
        <section className="contenido-modal">
          <h3>¿Desactivar movimiento?</h3>
          <p>Vas a desactivar {titulo}. Este movimiento dejará de mostrarse en las operaciones activas, pero conservará su historial financiero completo.</p>
        </section>
        <section className="mensaje-advertencia">
          <i className="ph ph-warning"></i>
          <p role={bloqueo ? 'alert' : undefined}>
            {bloqueo
              ? `No se puede desactivar: ${bloqueo}.`
              : 'Los saldos de los fondos asociados serán recalculados automáticamente.'}
          </p>
        </section>
        <footer className="acciones-modal">
          <button type="button" className="boton-secundario" onClick={onCancelar} autoFocus>Cancelar</button>
          <button type="button" className="boton-peligro" onClick={onConfirmar} disabled={Boolean(bloqueo)}>Desactivar</button>
        </footer>
      </div>
    </div>,
    document.body,
  )
}
