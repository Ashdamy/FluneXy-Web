import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo-fluenxy.png'
import useTituloPagina from '../../hooks/useTituloPagina.js'

export default function IniciarSesion() {
  useTituloPagina('Iniciar sesión')
  const navigate = useNavigate()

  // onSubmit solo se ejecuta si el navegador ya valido los campos
  // (required, type="email"). Cuando exista la API, aqui se enviaran
  // los datos con new FormData(evento.target).
  function enviar(evento) {
    evento.preventDefault()
    navigate('/home')
  }

  return (
    <section className="tarjeta-formulario">
      <div className="logo">
        <p>Fluye con tus finanzas</p>
        <img src={logo} alt="Logo de FluneXy" />
      </div>
      <header className="encabezado-autenticacion">
        <h1>Bienvenido de vuelta</h1>
        <p>Ingresa tus datos para acceder a tu cuenta.</p>
      </header>
      <form className="formulario-inicio-sesion" onSubmit={enviar}>
        <div className="grupo-formulario">
          <label htmlFor="correo">Correo electrónico</label>
          <input type="email" id="correo" name="correo" placeholder="anamilena@ejemplo.com" required />
        </div>
        <div className="grupo-formulario">
          <label htmlFor="contrasena">Contraseña</label>
          <input type="password" id="contrasena" name="contrasena" required />
        </div>
        <div className="recuperar-contrasena">
          <Link to="/autenticacion/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
        </div>
        <button type="submit" className="boton-primario">Iniciar sesión</button>
        <p className="separador-social">o continúa con</p>
        <div className="inicio-sesion-redes">
          <button type="button" className="boton-social boton-google">Continuar con Google</button>
          <button type="button" className="boton-social boton-apple">Continuar con Apple</button>
        </div>
      </form>
      <div className="enlace-secundario">
        <Link to="/autenticacion/registro">¿No tienes cuenta? Regístrate</Link>
      </div>
    </section>
  )
}
