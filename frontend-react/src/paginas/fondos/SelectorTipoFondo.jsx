import { TIPOS_FONDO } from '../../datos/fondos.js'

// Los tres botones de "Tipo de Fondo" (Banco / Billetera / Efectivo).
// Es un componente "controlado": no guarda nada, el formulario le dice
// cual esta elegido (valor) y le pasa la funcion para cambiarlo (onCambiar).
export default function SelectorTipoFondo({ valor, onCambiar }) {
  return (
    <div className="opciones-tipo" role="group" aria-label="Tipo de Fondo">
      {Object.entries(TIPOS_FONDO).map(([clave, tipo]) => (
        <button
          key={clave}
          type="button"
          className={clave === valor ? 'opcion-tipo activa' : 'opcion-tipo'}
          aria-pressed={clave === valor}
          onClick={() => onCambiar(clave)}
        >
          <i className={`ph ${tipo.icono}`}></i><span>{tipo.etiqueta}</span>
        </button>
      ))}
    </div>
  )
}
