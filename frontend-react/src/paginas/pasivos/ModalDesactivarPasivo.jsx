import ModalConfirmar from '../../componentes/ModalConfirmar.jsx'
import { categoriaPasivo } from '../../datos/pasivos.js'
import { formatoPesos } from '../../utilidades/moneda.js'

// Textos del modal de Pasivos: mismo HTML que Fondos y Activos, pero el
// boton de confirmar es btn-eliminar-pasivo. Su CSS cuelga de
// body.mod-pasivo-desactivar, que pone la pagina que lo abre.
export default function ModalDesactivarPasivo({ pasivo, onCancelar, onConfirmar }) {
  const saldo = formatoPesos(pasivo.saldoActual)
  return (
    <ModalConfirmar
      sufijo="pasivo"
      claseConfirmar="btn-eliminar-pasivo"
      icono={categoriaPasivo(pasivo.categoria).icono}
      nombre={pasivo.nombre}
      detalle={`${pasivo.categoria} · ${pasivo.activo ? 'Activo' : 'Inactivo'}`}
      monto={saldo}
      titulo="¿Desactivar pasivo?"
      descripcion={`El pasivo ${pasivo.nombre} dejará de participar en los cálculos financieros futuros, pero conservará su historial de cuotas y pagos para consulta.`}
      nota={`El total de pasivos disminuirá en ${saldo} y el Índice de Endeudamiento será recalculado automáticamente.`}
      textoConfirmar="Desactivar"
      onCancelar={onCancelar}
      onConfirmar={onConfirmar}
    />
  )
}
