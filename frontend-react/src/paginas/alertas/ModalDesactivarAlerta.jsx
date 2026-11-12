import ModalConfirmar from '../../componentes/ModalConfirmar.jsx'
import { tipoDe, umbralTexto, valorActual } from '../../datos/alertas.js'

// Modal de Alertas: mismo esqueleto que los demas (ModalConfirmar con sufijo
// "alerta"), con las tres clases propias de la vista previa del prototipo.
// Su CSS cuelga de body.mod-alertas-desactivar, que pone la pagina que lo abre.
export default function ModalDesactivarAlerta({ alerta, onCancelar, onConfirmar }) {
  const tipo = tipoDe(alerta)
  const actual = tipo.formato(valorActual(alerta))
  const umbral = umbralTexto(alerta)
  const verbo = tipo.simbolo === '≥' ? 'supera' : 'baja de'
  return (
    <ModalConfirmar
      sufijo="alerta"
      icono={tipo.icono}
      nombre={tipo.nombre}
      detalle={`Umbral: ${umbral} · Actual: ${actual}`}
      monto="Activa"
      titulo="¿Desactivar alerta?"
      descripcion={`La alerta ${tipo.nombre} dejará de generar notificaciones cuando tu índice ${verbo === 'supera' ? 'supere' : 'baje de'} el umbral, pero conservará su historial para consulta.`}
      nota={`No recibirás avisos si tu ${tipo.nombre.toLowerCase()} (actualmente ${actual}) ${verbo} el umbral configurado de ${umbral}. Puedes reactivarla en cualquier momento.`}
      textoConfirmar="Desactivar"
      clasePreviewIcono="preview-icono-alerta"
      clasePreviewInfo="preview-info-alerta"
      clasePreviewMonto="preview-estado-alerta"
      onCancelar={onCancelar}
      onConfirmar={onConfirmar}
    />
  )
}
