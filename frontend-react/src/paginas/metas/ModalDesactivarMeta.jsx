import ModalConfirmar from '../../componentes/ModalConfirmar.jsx'
import { obtenerFondo } from '../../datos/fondos.js'
import { progresoMeta } from '../../datos/metas.js'
import { formatoPesos } from '../../utilidades/moneda.js'

// Textos del modal de Metas (mismo HTML que Fondos: ModalConfirmar con sufijo "meta").
// Su CSS cuelga de body.mod-meta-desactivar, que pone la pagina que lo abre.
// La nota se deja como el prototipo (conflicto 18), con el fondo de la meta.
export default function ModalDesactivarMeta({ meta, onCancelar, onConfirmar }) {
  const ahorrado = formatoPesos(meta.montoAhorrado)
  return (
    <ModalConfirmar
      sufijo="meta"
      icono="ph-target"
      nombre={meta.nombre}
      detalle={`${progresoMeta(meta)}% completada · ${ahorrado} ahorrados`}
      monto={formatoPesos(meta.montoObjetivo)}
      titulo="¿Desactivar meta?"
      descripcion={`La meta ${meta.nombre} dejará de participar en las proyecciones financieras del Flujo de Caja, pero conservará su historial de aportes completo.`}
      nota={`Los ${ahorrado} ya ahorrados permanecen en el fondo ${obtenerFondo(meta.fondoId).nombre}. Solo se desactiva el seguimiento de la meta.`}
      textoConfirmar="Desactivar"
      claseConfirmar="btn-eliminar-meta"
      onCancelar={onCancelar}
      onConfirmar={onConfirmar}
    />
  )
}
