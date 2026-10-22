import ModalConfirmar from '../../componentes/ModalConfirmar.jsx'
import { TIPOS_FONDO } from '../../datos/fondos.js'
import { formatoPesos } from '../../utilidades/moneda.js'

// Textos del modal de Fondos. Lo usan el listado y el detalle.
export default function ModalDesactivarFondo({ fondo, onCancelar, onConfirmar }) {
  const tipo = TIPOS_FONDO[fondo.tipo]
  return (
    <ModalConfirmar
      sufijo="fondo"
      icono={tipo.icono}
      nombre={fondo.nombre}
      detalle={tipo.etiqueta}
      monto={formatoPesos(fondo.saldo)}
      titulo="¿Desactivar fondo?"
      descripcion={`Vas a desactivar ${fondo.nombre}. Este fondo dejará de mostrarse en las operaciones activas, pero conservará su historial financiero completo.`}
      nota="Puedes volver a activar este fondo en cualquier momento desde la configuración de Fondos."
      textoConfirmar="Desactivar"
      onCancelar={onCancelar}
      onConfirmar={onConfirmar}
    />
  )
}
