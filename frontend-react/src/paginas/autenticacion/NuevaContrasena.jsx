import { Link, useNavigate } from 'react-router-dom'
import useTituloPagina from '../../hooks/useTituloPagina.js'

export default function NuevaContrasena() {
  useTituloPagina('Nueva contraseña')
  const navigate = useNavigate()

  // Misma validacion que en Registro: las dos contrasenas deben coincidir.
  function enviar(evento) {
    evento.preventDefault()
    const formulario = evento.target
    const confirmar = formulario.elements['confirmar-contrasena']
    confirmar.setCustomValidity(
      confirmar.value === formulario.elements.contrasena.value ? '' : 'Las contraseñas no coinciden',
    )
    if (!formulario.reportValidity()) return
    navigate('/autenticacion/iniciar-sesion')
  }

  return (
    <>
      <div className="volver">
        <Link to="/autenticacion/recuperar-contrasena"><i className="ph ph-arrow-left"></i> Volver</Link>
      </div>
      <section className="tarjeta-formulario">
        <div className="icono-formulario icono-nueva">
          <i className="ph ph-key"></i>
        </div>
        <header className="encabezado-autenticacion">
          <h1>Nueva contraseña</h1>
          <p>Crea una contraseña segura para proteger tu cuenta.</p>
        </header>
        <form className="formulario-nueva-contrasena" onSubmit={enviar}>
          <div className="grupo-formulario">
            <label htmlFor="contrasena">Nueva contraseña</label>
            {/* Mismo requisito que muestra el aviso: 8+ caracteres, una mayuscula y un numero. */}
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              required
              minLength={8}
              pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}"
              title="Mínimo 8 caracteres, una mayúscula y un número."
            />
            {/* ponytail: barra fija como en el prototipo; el CSS colorea todo en verde */}
            <div className="barra-fortaleza">
              <div className="nivel-fortaleza"></div>
              <div className="nivel-fortaleza"></div>
              <div className="nivel-fortaleza"></div>
              <div className="nivel-fortaleza"></div>
            </div>
            <p className="mensaje-fortaleza">Fortaleza: excelente</p>
            <div className="requisito-contrasena">
              <i className="ph ph-check"></i>
              <p>Mínimo 8 caracteres, una mayúscula y un número.</p>
            </div>
          </div>
          <div className="grupo-formulario">
            <label htmlFor="confirmar-contrasena">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmar-contrasena"
              name="confirmar-contrasena"
              required
              onInput={(evento) => evento.target.setCustomValidity('')}
            />
          </div>
          <button type="submit" className="boton-primario">Guardar nueva contraseña</button>
        </form>
      </section>
    </>
  )
}
