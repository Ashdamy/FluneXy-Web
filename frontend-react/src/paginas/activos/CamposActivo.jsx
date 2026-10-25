import { CATEGORIAS_ACTIVO } from '../../datos/activos.js'

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