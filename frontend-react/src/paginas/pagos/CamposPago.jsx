import { TIPOS_FONDO } from '../../datos/fondos.js'
import { formatoPesos, PATRON_PESOS } from '../../utilidades/moneda.js'

// Campos que comparten Registrar Pago y Registrar Aporte.

export function CampoMonto({ etiqueta, valor, onCambiar, placeholder }) {
  return (
    <>
      <span className="etiqueta-campo">{etiqueta}</span>
      <div className="input-monto">
        <span className="prefijo-monto">$</span>
        <input
          type="text"
          name="monto"
          className="valor-monto"
          aria-label={etiqueta}
          placeholder={placeholder}
          inputMode="decimal"
          pattern={PATRON_PESOS}
          title="Solo números, por ejemplo 45000 o 45.000"
          required
          value={valor}
          onChange={(evento) => onCambiar(evento.target.value)}
        />
      </div>
    </>
  )
}

export function ListaFondosPago({ fondos, elegido, onElegir }) {
  return (
    <div className="lista-fondos-pago">
      {fondos.map((fondo) => (
        <button
          key={fondo.id}
          type="button"
          className={fondo.id === elegido ? 'fondo-pago-item activo' : 'fondo-pago-item'}
          aria-pressed={fondo.id === elegido}
          onClick={() => onElegir(fondo.id)}
        >
          <i className={`ph ${TIPOS_FONDO[fondo.tipo].icono}`}></i>
          <span className="info-fondo-pago"><strong>{fondo.nombre}</strong><span>{formatoPesos(fondo.saldo)}</span></span>
          {fondo.id === elegido && <span className="check-fondo-pago"><i className="ph ph-check"></i></span>}
        </button>
      ))}
    </div>
  )
}
