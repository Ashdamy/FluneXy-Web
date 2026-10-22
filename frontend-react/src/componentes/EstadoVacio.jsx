// Pantalla de "todavia no tienes ..." de Fondos, Activos, Metas, Pasivos y
// Plantillas. Comparten el mismo HTML y solo cambia el final de las clases
// (estado-vacio-fondos, halo-fondos...), que se arma con "sufijo".
export default function EstadoVacio({ sufijo, claseBoton, icono, titulo, texto, textoBoton, onAccion }) {
  return (
    <section className={`estado-vacio-${sufijo}`}>
      <div className={`halo-${sufijo}`}></div>
      <div className={`circulo-${sufijo}`}></div>
      <i className={`ph ${icono}`}></i>
      <h2>{titulo}</h2>
      <p>{texto}</p>
      <button type="button" className={claseBoton} onClick={onAccion}>{textoBoton}</button>
    </section>
  )
}
