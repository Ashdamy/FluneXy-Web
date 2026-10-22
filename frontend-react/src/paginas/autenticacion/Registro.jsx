import { Link, useNavigate } from 'react-router-dom'
import useTituloPagina from '../../hooks/useTituloPagina.js'

export default function Registro() {
  useTituloPagina('Registro')
  const navigate = useNavigate()

  function enviar(evento) {
    evento.preventDefault()
    const formulario = evento.target
    const confirmar = formulario.elements['confirmar-contrasena']
    // setCustomValidity marca el campo como invalido y reportValidity
    // muestra el aviso nativo del navegador, igual que con "required".
    confirmar.setCustomValidity(
      confirmar.value === formulario.elements.contrasena.value ? '' : 'Las contraseñas no coinciden',
    )
    if (!formulario.reportValidity()) return
    navigate('/autenticacion/verificacion-contrasena')
  }

  return (
    <>
      <div className="volver">
        <Link to="/autenticacion/iniciar-sesion"><i className="ph ph-arrow-left"></i> Volver</Link>
      </div>
      <section className="tarjeta-formulario">
        <header className="encabezado-autenticacion">
          <h1>Crea tu cuenta</h1>
          <p>Empieza gratis. Sin tarjeta de crédito.</p>
        </header>
        <form className="formulario-registro" onSubmit={enviar}>
          <div className="row gx-3">
            <div className="col-6 grupo-formulario">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" placeholder="Ana Milena" autoComplete="given-name" required />
            </div>
            <div className="col-6 grupo-formulario">
              <label htmlFor="apellido">Apellido</label>
              <input type="text" id="apellido" name="apellido" placeholder="Sierra" autoComplete="family-name" required />
            </div>
          </div>
          <div className="grupo-formulario">
            <label htmlFor="correo">Correo electrónico</label>
            <input type="email" id="correo" name="correo" placeholder="anamilena@ejemplo.com" required />
            <p className="mensaje-ayuda">Usaremos este correo para verificar tu cuenta.</p>
          </div>
          <div className="grupo-formulario">
            <label htmlFor="contrasena">Contraseña</label>
            <input type="password" id="contrasena" name="contrasena" required />
            {/* ponytail: barra fija como en el prototipo; el CSS colorea por posicion, no por nivel */}
            <div className="barra-fortaleza">
              <div className="nivel-fortaleza"></div>
              <div className="nivel-fortaleza"></div>
              <div className="nivel-fortaleza"></div>
              <div className="nivel-fortaleza"></div>
            </div>
            <p className="mensaje-fortaleza">Fortaleza: media — añade símbolos para mejorarla.</p>
          </div>
          <div className="grupo-formulario">
            <label htmlFor="confirmar-contrasena">Confirmar contraseña</label>
            {/* Al escribir se limpia el error de "no coinciden" para volver a validar al enviar. */}
            <input
              type="password"
              id="confirmar-contrasena"
              name="confirmar-contrasena"
              required
              onInput={(evento) => evento.target.setCustomValidity('')}
            />
          </div>
          <button type="submit" className="boton-primario">Crear cuenta gratis</button>
          <div className="enlace-secundario">
            <Link to="/autenticacion/iniciar-sesion">¿Ya tienes cuenta? Inicia sesión</Link>
          </div>
        </form>
      </section>
    </>
  )
}
