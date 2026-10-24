import { createPortal } from 'react-dom'
import { iconoCategoria } from '../../datos/movimientos.js'
import { tituloPlantilla } from '../../datos/plantillas.js'
import { formatoPesos } from '../../utilidades/moneda.js'

// Modal propio de Plantillas: su HTML (overlay-modal, sheet-modal,
// preview-card...) no coincide con ModalConfirmar ni con el de Movimientos.
// Su CSS cuelga de body.mod-plantillas, que pone la pagina que lo abre.
export default function ModalDesactivarPlantilla({ plantilla, onCancelar, onConfirmar }) {
  const titulo = tituloPlantilla(plantilla)
  const esIngreso = plantilla.tipo === 'ingreso'

  return createPortal(
    <div className="overlay-modal" onKeyDown={(evento) => evento.key === 'Escape' && onCancelar()}>
      <div className="sheet-modal" role="alertdialog" aria-modal="true" aria-label="¿Desactivar plantilla?">
        <div className="preview-card">
          <div className="bloque-izq-preview">
            <div className="icono-preview"><i className={`ph ${iconoCategoria(plantilla.tipo, plantilla.categoria)}`}></i></div>
            <div className="info-preview">
              <h3>{titulo}</h3>
              <span>{plantilla.categoria} · {esIngreso ? 'Ingreso' : 'Gasto'}</span>
            </div>
          </div>
          <strong className="monto-preview" style={{ color: esIngreso ? 'var(--green)' : 'var(--red)' }}>
            {esIngreso ? '+' : '-'}{formatoPesos(plantilla.monto)}
          </strong>
        </div>
        <div className="contenido-desactivar">
          <div className="icono-warning"><i className="ph ph-warning"></i></div>
          <h2>¿Desactivar plantilla?</h2>
          <p className="descripcion-desactivar">
            La plantilla {titulo} dejará de generar movimientos automáticos, pero conservará su historial de ejecuciones completo.
          </p>
        </div>
        <div className="caja-advertencia">
          <span className="icono-alerta"><i className="ph ph-warning"></i></span>
          <span className="texto-alerta">La próxima ejecución programada será cancelada. Podrás reactivar la plantilla en cualquier momento.</span>
        </div>
        <div className="acciones-modal">
          <button type="button" className="btn-cancelar" onClick={onCancelar} autoFocus>Cancelar</button>
          <button type="button" className="btn-desactivar" onClick={onConfirmar}>Desactivar</button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
