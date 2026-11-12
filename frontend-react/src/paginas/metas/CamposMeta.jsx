import { TIPOS_FONDO } from '../../datos/fondos.js'
import { formatoPesos } from '../../utilidades/moneda.js'

// "Fondo de ahorro" de Nueva Meta: una fila por fondo activo (RN09.1.1).
// Controlado: el fondo elegido vive en la pagina (elegido + onElegir).
export function ListaFondosMeta({ fondos, elegido, onElegir }) {
  return (
    <div className="lista-fondos" role="group" aria-label="Fondo de ahorro">
      {fondos.map((fondo) => (
        <button
          key={fondo.id}
          type="button"
          className={fondo.id === elegido ? 'fila-fondo activa' : 'fila-fondo'}
          data-fondo={fondo.id}
          aria-pressed={fondo.id === elegido}
          onClick={() => onElegir(fondo.id)}
        >
          <i className={`ph ${TIPOS_FONDO[fondo.tipo].icono}`}></i>
          <span className="info-fondo">
            <strong className="nombre-fondo">{fondo.nombre}</strong>
            <small className="saldo-fondo">{formatoPesos(fondo.saldo)}</small>
          </span>
          <i className="ph ph-check-circle check-fondo"></i>
        </button>
      ))}
    </div>
  )
}
