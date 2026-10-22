import { useNavigate } from 'react-router-dom'

// Encabezado de las paginas internas: titulo, subtitulo y los botones de
// notificaciones y perfil. Se mantienen como <button> (y no como enlaces)
// porque el CSS de acciones-usuario.css esta escrito para botones.
export default function EncabezadoPagina({ titulo, subtitulo }) {
  const navigate = useNavigate()

  return (
    <header className="encabezado-pagina">
      <div className="titulo-pagina">
        <h1>{titulo}</h1>
        {subtitulo && <p>{subtitulo}</p>}
      </div>
      <div className="acciones-usuario">
        <button type="button" className="boton-notificacion" aria-label="Notificaciones" onClick={() => navigate('/alertas')}>
          <i className="ph ph-bell"></i>
        </button>
        <button type="button" className="boton-perfil" aria-label="Perfil" onClick={() => navigate('/usuario')}>A</button>
      </div>
    </header>
  )
}
