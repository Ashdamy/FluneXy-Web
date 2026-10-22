import { Link, useNavigate } from 'react-router-dom'
import useTituloPagina from '../../hooks/useTituloPagina.js'

// Al escribir un digito el foco pasa a la siguiente casilla; con
// Backspace en una casilla vacia vuelve a la anterior. Los eventos se
// escuchan en el contenedor (llegan ahi desde cada input).
function avanzar(evento) {
  if (evento.target.value) evento.target.nextElementSibling?.focus()
}

function retroceder(evento) {
  if (evento.key === 'Backspace' && !evento.target.value) evento.target.previousElementSibling?.focus()
}

export default function VerificacionContrasena() {
  useTituloPagina('Verificar contraseña')
  const navigate = useNavigate()

  function enviar(evento) {
    evento.preventDefault()
    navigate('/autenticacion/nueva-contrasena')
  }

  return (
    <>
      <div className="volver">
        <Link to="/autenticacion/iniciar-sesion"><i className="ph ph-arrow-left"></i> Volver</Link>
      </div>
      <section className="tarjeta-formulario">
        <div className="icono-formulario icono-verificacion">
          <i className="ph ph-lock"></i>
        </div>
        <header className="encabezado-autenticacion">
          <h1>Verifica tu correo</h1>
          <p>Enviamos un código de 6 dígitos a a***@ejemplo.com</p>
        </header>
        <form className="formulario-verificacion-correo" onSubmit={enviar}>
          <div className="grupo-codigo" onInput={avanzar} onKeyDown={retroceder}>
            {/* Array.from crea las 6 casillas sin repetir el mismo <input> 6 veces. */}
            {Array.from({ length: 6 }, (_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                inputMode="numeric"
                pattern="[0-9]"
                aria-label={`Dígito ${i + 1}`}
                required
              />
            ))}
          </div>
          <p className="mensaje-renvio">
            ¿No recibiste el código?{' '}
            {/* ponytail: reenvio y contador fijos hasta que exista la API */}
            <a href="#" onClick={(evento) => evento.preventDefault()}>Reenviar (00:42)</a>
          </p>
          <button type="submit" className="boton-primario">Verificar código</button>
        </form>
        <button type="button" className="boton-secundario" onClick={() => navigate('/autenticacion/recuperar-contrasena')}>
          Cambiar correo
        </button>
      </section>
    </>
  )
}
