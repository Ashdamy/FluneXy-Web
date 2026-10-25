import { AMORTIZACIONES } from '../../datos/pasivos.js'

// Los 3 tipos de amortizacion como botones (controlado: valor + onCambiar).
export function SelectorAmortizacion({ valor, onCambiar }) {
  return (
    <div className="opciones-tipo" role="group" aria-label="Tipo de amortización">
      {Object.entries(AMORTIZACIONES).map(([clave, amortizacion]) => (
        <button
          key={clave}
          type="button"
          className={clave === valor ? 'opcion-tipo activa' : 'opcion-tipo'}
          aria-pressed={clave === valor}
          onClick={() => onCambiar(clave)}
        >
          <i className={`ph ${amortizacion.icono}`}></i>
          <span className="texto-tipo"><strong>{amortizacion.etiqueta}</strong></span>
        </button>
      ))}
    </div>
  )
}
