import { TIPOS_FONDO } from '../../datos/fondos.js'
import { formatoPesos } from '../../utilidades/moneda.js'

// Botones de "Categoría" y "Fondo" que comparten los formularios de nuevo y
// editar. Cada formulario los acomoda en su propia grilla.

export function BotonCategoria({ categoria, elegida, onElegir }) {
  return (
    <button
      type="button"
      className={elegida ? 'item-categoria activo' : 'item-categoria'}
      aria-pressed={elegida}
      onClick={() => onElegir(categoria.nombre)}
    >
      <i className={`ph ${categoria.icono}`}></i> {categoria.nombre}
    </button>
  )
}

export function BotonFondo({ fondo, elegido, onElegir }) {
  return (
    <button
      type="button"
      className={elegido ? 'item-fondo activo' : 'item-fondo'}
      aria-pressed={elegido}
      onClick={() => onElegir(fondo.id)}
    >
      <i className={`ph ${TIPOS_FONDO[fondo.tipo].icono}`}></i>
      <span className="info-fondo"><strong>{fondo.nombre}</strong><span>{formatoPesos(fondo.saldo)}</span></span>
      <span className="check-fondo"><i className="ph ph-check"></i></span>
    </button>
  )
}
