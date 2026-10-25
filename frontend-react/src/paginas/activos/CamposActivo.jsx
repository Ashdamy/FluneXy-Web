import { CATEGORIAS_ACTIVO } from '../../datos/activos.js'

// Partes que comparten los formularios de registrar y editar activo.

// Las 6 categorias de activo de la BD como botones (controlado: valor + onCambiar).
export function SelectorCategoriaActivo({ valor, onCambiar }) {
  return (
    <div className="opciones-tipo" role="group" aria-label="Categoría">
      {CATEGORIAS_ACTIVO.map((categoria) => (
        <button
          key={categoria.nombre}
          type="button"
          className={categoria.nombre === valor ? 'opcion-tipo activa' : 'opcion-tipo'}
          aria-pressed={categoria.nombre === valor}
          onClick={() => onCambiar(categoria.nombre)}
        >
          <i className={`ph ${categoria.icono}`}></i>
          <span className="texto-tipo"><strong>{categoria.nombre}</strong><small>Activo</small></span>
        </button>
      ))}
    </div>
  )
}

// Fecha de actualizacion. Al hacer clic en el campo se abre el calendario nativo.
export function CampoFechaActivo({ valor, onCambiar }) {
  return (
    <div className="campo-fecha-activo-input">
      <i className="ph ph-calendar"></i>
      <input
        type="date"
        id="fecha"
        name="fecha"
        required
        value={valor}
        onChange={(evento) => onCambiar(evento.target.value)}
        onClick={(evento) => evento.target.showPicker?.()}
      />
    </div>
  )
}
