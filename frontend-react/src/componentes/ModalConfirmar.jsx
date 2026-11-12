import { createPortal } from 'react-dom'

// Modal de "¿Desactivar ...?" de los modulos de Fondos, Activos, Metas y
// Pasivos. Los cuatro usan el mismo HTML y solo cambia el final de las
// clases (overlay-fondo-modal, overlay-activo-modal...), por eso se pasa
// el "sufijo" y las clases se arman con el.
//
// createPortal dibuja el modal directamente dentro de <body>, fuera del
// <main>, que es donde estaba en los HTML originales.
export default function ModalConfirmar({
  sufijo,
  icono,
  nombre,
  detalle,
  monto,
  titulo,
  descripcion,
  nota,
  textoConfirmar,
  // Pasivos y Metas usan btn-eliminar-...; Fondos y Activos, btn-desactivar-...
  claseConfirmar = `btn-desactivar-${sufijo}`,
  // Alertas cambia tres clases de la vista previa (preview-icono-alerta,
  // preview-info-alerta y preview-estado-alerta); los demas usan estas.
  clasePreviewIcono = 'preview-icono',
  clasePreviewInfo = 'preview-info',
  clasePreviewMonto = 'preview-saldo',
  onCancelar,
  onConfirmar,
}) {
  return createPortal(
    <div
      className={`overlay-${sufijo}-modal`}
      aria-hidden="false"
      onKeyDown={(evento) => evento.key === 'Escape' && onCancelar()}
    >
      <article className={`modal-desactivar-${sufijo}`} role="alertdialog" aria-modal="true" aria-label={titulo}>
        <div className={`preview-${sufijo}`}>
          <span className={clasePreviewIcono}><i className={`ph ${icono}`}></i></span>
          <div className={clasePreviewInfo}>
            <h3>{nombre}</h3>
            <p>{detalle}</p>
          </div>
          <span className={clasePreviewMonto}>{monto}</span>
        </div>
        <div className={`icono-advertencia-${sufijo}`}>
          <i className="ph ph-warning"></i>
        </div>
        <h2 className={`titulo-modal-${sufijo}`}>{titulo}</h2>
        <p className={`descripcion-modal-${sufijo}`}>{descripcion}</p>
        <div className={`nota-aviso-${sufijo}`}>
          <i className="ph ph-warning"></i>
          <span>{nota}</span>
        </div>
        <div className={`acciones-modal-${sufijo}`}>
          {/* autoFocus deja el foco en "Cancelar": Enter no desactiva por accidente y Escape cierra. */}
          <button type="button" className={`btn-cancelar-${sufijo}`} onClick={onCancelar} autoFocus>Cancelar</button>
          <button type="button" className={claseConfirmar} onClick={onConfirmar}>{textoConfirmar}</button>
        </div>
      </article>
    </div>,
    document.body,
  )
}
