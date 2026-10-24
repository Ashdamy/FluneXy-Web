import { CATEGORIAS_MOVIMIENTO } from '../../datos/movimientos.js'
import { RECURRENCIAS } from '../../datos/plantillas.js'

// Partes que comparten los formularios de nueva y editar plantilla.
// Todas son "controladas": reciben el valor y la funcion para cambiarlo.

export function ChipsCategoria({ tipo, valor, onCambiar }) {
  return (
    <section className="opciones-categoria row">
      {CATEGORIAS_MOVIMIENTO[tipo].map((categoria) => (
        <div key={categoria.nombre} className="col-12 col-md-6">
          <button
            type="button"
            className={categoria.nombre === valor ? 'cat-chip activa' : 'cat-chip'}
            aria-pressed={categoria.nombre === valor}
            onClick={() => onCambiar(categoria.nombre)}
          >
            <i className={`ph ${categoria.icono}`}></i>
            <span className="texto-chip"><strong>{categoria.nombre}</strong><small>{tipo === 'gasto' ? 'Gasto' : 'Ingreso'}</small></span>
          </button>
        </div>
      ))}
    </section>
  )
}

export function SelectorRecurrencia({ valor, onCambiar }) {
  return (
    <section className="rec-row" role="group" aria-label="Recurrencia">
      {Object.entries(RECURRENCIAS).map(([clave, recurrencia]) => (
        <button
          key={clave}
          type="button"
          className={clave === valor ? 'rec-opcion activo' : 'rec-opcion'}
          aria-pressed={clave === valor}
          onClick={() => onCambiar(clave)}
        >
          <i className={`ph ${recurrencia.icono}`}></i>{recurrencia.etiqueta}
        </button>
      ))}
    </section>
  )
}

// Botones − / + del dia de ejecucion. La BD exige un dia entre 1 y 31.
export function DiaEjecucion({ valor, onCambiar }) {
  return (
    <section className="day-box">
      <span className="day-texto">Ejecutar el día</span>
      <button type="button" className="stepper-btn" aria-label="Restar un día" disabled={valor <= 1} onClick={() => onCambiar(valor - 1)}>−</button>
      <strong className="day-valor" aria-live="polite">{valor}</strong>
      <button type="button" className="stepper-btn" aria-label="Sumar un día" disabled={valor >= 31} onClick={() => onCambiar(valor + 1)}>+</button>
    </section>
  )
}

// Fechas de inicio y fin. Al hacer clic en el campo se abre el calendario nativo.
export function Vigencia({ inicio, fin, onInicio, onFin }) {
  const abrirCalendario = (evento) => evento.target.showPicker?.()
  return (
    <section className="fila-fechas">
      <div className="grupo-fecha">
        <span className="label-fecha">FECHA INICIO</span>
        <div className="date-box">
          <i className="ph ph-calendar"></i>
          <input
            type="date"
            id="fecha-inicio"
            name="inicio"
            aria-label="Fecha inicio"
            required
            value={inicio}
            onChange={(evento) => onInicio(evento.target.value)}
            onClick={abrirCalendario}
          />
        </div>
      </div>
      <div className="grupo-fecha">
        <span className="label-fecha">FECHA FIN</span>
        <div className="date-box">
          <i className="ph ph-calendar"></i>
          <input
            type="date"
            id="fecha-fin"
            name="fin"
            aria-label="Fecha fin"
            required
            min={inicio}
            value={fin}
            onChange={(evento) => onFin(evento.target.value)}
            onClick={abrirCalendario}
          />
        </div>
      </div>
    </section>
  )
}
