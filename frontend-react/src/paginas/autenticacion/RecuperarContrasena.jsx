import { Link, useNavigate } from 'react-router-dom'
import useTituloPagina from '../../hooks/useTituloPagina.js'

export default function RecuperarContrasena() {
  useTituloPagina('Recuperar Contraseña')
  const navigate = useNavigate()

  function enviar(evento) {
    evento.preventDefault()
    navigate('/autenticacion/verificacion-contrasena')
  }

  return (
    <>
      <div className="volver">
        <Link to="/autenticacion/iniciar-sesion"><i className="ph ph-arrow-left"></i> Iniciar sesión</Link>
      </div>
      <section className="tarjeta-formulario">
        <div className="icono-formulario icono-recuperar">
          <i className="ph ph-envelope"></i>
        </div>
        <header className="encabezado-autenticacion">
          <h1>Recupera tu acceso</h1>
          <p>Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.</p>
        </header>
        <form className="formulario-recuperacion-contrasena" onSubmit={enviar}>
          <div className="grupo-formulario">
            <label htmlFor="correo">Correo electrónico</label>
            <input type="email" id="correo" name="correo" placeholder="anamilena@ejemplo.com" required />
          </div>
          <button type="submit" className="boton-primario">Enviar enlace de recuperación</button>
          <button type="button" className="boton-secundario" onClick={() => navigate('/autenticacion/iniciar-sesion')}>
            Volver al inicio de sesión
          </button>
        </form>
      </section>
    </>
  )
}
