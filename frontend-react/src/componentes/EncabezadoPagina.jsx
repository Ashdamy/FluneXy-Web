import { useNavigate } from 'react-router-dom'

// Encabezado de las paginas internas: titulo, subtitulo y los botones de
// notificaciones y perfil. Se mantienen como <button> (y no como enlaces)
// porque el CSS de acciones-usuario.css esta escrito para botones.
//
// "extra" es lo que algunas paginas ponen a la izquierda de esos botones
// (el selector de fecha del Balance, por ejemplo). En el prototipo esas
// paginas envuelven todo en <div class="acciones-derecha-pagina">.
export default function EncabezadoPagina({ titulo, subtitulo, extra }) {
  const navigate = useNavigate()

  const acciones = (
    <div className="acciones-usuario">
      <button type="button" className="boton-notificacion" aria-label="Notificaciones" onClick={() => navigate('/alertas')}>
        <i className="ph ph-bell"></i>
      </button>
      <button type="button" className="boton-perfil" aria-label="Perfil" onClick={() => navigate('/usuario')}>A</button>
    </div>
  )

  return (
    <header className="encabezado-pagina">
      <div className="titulo-pagina">
        <h1>{titulo}</h1>
        {subtitulo && <p>{subtitulo}</p>}
      </div>
      {extra ? (
        <div className="acciones-derecha-pagina">
          {extra}
          {acciones}
        </div>
      ) : (
        acciones
      )}
    </header>
  )
}
