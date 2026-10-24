// Pantalla de "todavia no tienes ..." de Fondos, Activos, Metas, Pasivos y
// Plantillas. Comparten el mismo HTML y solo cambia el final de las clases
// (estado-vacio-fondos, halo-fondos...), que se arma con "sufijo".
// En Plantillas el icono va dentro del circulo: iconoEnCirculo.
export default function EstadoVacio({ sufijo, claseBoton, icono, iconoEnCirculo = false, titulo, texto, textoBoton, onAccion }) {
  const iconoElemento = <i className={`ph ${icono}`}></i>
  return (
    <section className={`estado-vacio-${sufijo}`}>
      <div className={`halo-${sufijo}`}></div>
      <div className={`circulo-${sufijo}`}>{iconoEnCirculo && iconoElemento}</div>
      {!iconoEnCirculo && iconoElemento}
      <h2>{titulo}</h2>
      <p>{texto}</p>
      <button type="button" className={claseBoton} onClick={onAccion}>{textoBoton}</button>
    </section>
  )
}
