import ModalConfirmar from '../../componentes/ModalConfirmar.jsx'
import { categoriaActivo } from '../../datos/activos.js'
import { formatoPesos } from '../../utilidades/moneda.js'

// Textos del modal de Activos (mismo HTML que Fondos: ModalConfirmar con sufijo "activo").
// Su CSS cuelga de body.mod-activo-desactivar, que pone la pagina que lo abre.
export default function ModalDesactivarActivo({ activo, onCancelar, onConfirmar }) {
  const valor = formatoPesos(activo.valor)
  return (
    <ModalConfirmar
      sufijo="activo"
      icono={categoriaActivo(activo.categoria).icono}
      nombre={activo.nombre}
      detalle={`${activo.categoria} · Activo`}
      monto={valor}
      titulo="¿Desactivar activo?"
      descripcion={`El activo ${activo.nombre} dejará de considerarse en los cálculos del Balance y Patrimonio Neto, pero conservará su historial completo.`}
      nota={`El valor total de activos disminuirá en ${valor} y el Patrimonio Neto será recalculado automáticamente.`}
      textoConfirmar="Desactivar"
      onCancelar={onCancelar}
      onConfirmar={onConfirmar}
    />
  )
}
