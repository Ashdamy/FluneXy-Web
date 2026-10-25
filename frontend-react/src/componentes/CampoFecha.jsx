// Campo de fecha con icono a la izquierda, como en los formularios de
// Activos y Pasivos. "clase" es la del contenedor en el prototipo
// (campo-fecha-activo-input, campo-fecha-pasivo-input...). El input es
// type="date" y al hacer clic abre el calendario nativo; su aspecto se
// iguala al prototipo en ajustes-react.css.
export default function CampoFecha({ clase, valor, onCambiar, id = 'fecha', name = 'fecha' }) {
  return (
    <div className={clase}>
      <i className="ph ph-calendar"></i>
      <input
        type="date"
        id={id}
        name={name}
        required
        value={valor}
        onChange={(evento) => onCambiar(evento.target.value)}
        onClick={(evento) => evento.target.showPicker?.()}
      />
    </div>
  )
}
