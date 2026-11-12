import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { desactivarCuenta } from '../../datos/usuario.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'

// En el prototipo es una pagina propia (no un modal sobre otra), con su
// propio HTML (dc-*), asi que no usa ModalConfirmar.
export default function DesactivarCuenta() {
  useClaseBody('mod-usuario')
  useTituloPagina('Desactivar Cuenta')
  const navigate = useNavigate()

  function enviar(evento) {
    evento.preventDefault()
    // RN02.7.1-2: confirmacion explicita con la contrasena. Que coincida lo revisara el backend.
    if (!evento.target.reportValidity()) return
    // RN02.7.3-4: solo cambia el estado; no se borra nada. RN02.7.5: se cierra la sesion.
    desactivarCuenta()
    navigate('/autenticacion/cierre-sesion')
  }

  return (
    <>
      <EncabezadoPagina titulo="Desactivar Cuenta" subtitulo="Desactiva tu cuenta temporalmente" />
      <div className="dc-contenedor">
        <form className="dc-modal" noValidate onSubmit={enviar}>
          <div className="dc-titulo">
            <span className="dc-icono-advertencia"><i className="ph ph-warning"></i></span>
            <h3>¿Desactivar tu cuenta?</h3>
            <p>Esta acción requiere confirmación. Podrás reactivar tu cuenta cuando quieras iniciando sesión de nuevo.</p>
          </div>
          <div className="dc-que-sucede">
            <h4>¿Qué sucede al desactivar tu cuenta?</h4>
            <ul className="dc-lista">
              <li><i className="ph ph-check"></i> Tu cuenta pasará a estado Inactiva</li>
              <li><i className="ph ph-check"></i> Tu historial y registros financieros se conservan</li>
              <li><i className="ph ph-check"></i> Se cerrará tu sesión automáticamente</li>
              <li className="dc-negativo"><i className="ph ph-x"></i> No se elimina ninguna información</li>
            </ul>
          </div>
          <div className="dc-confirmar">
            <label htmlFor="confirmar-contrasena">CONFIRMA TU CONTRASEÑA</label>
            <div className="ep-campo">
              <span className="ep-icono"><i className="ph ph-lock"></i></span>
              <input type="password" id="confirmar-contrasena" name="contrasena" placeholder="••••••••" autoComplete="current-password" required />
            </div>
            <p className="ep-ayuda">Necesario para confirmar que eres tú</p>
          </div>
          <div className="dc-nota">
            <i className="ph ph-warning"></i>
            <p>Podrás reactivar tu cuenta iniciando sesión de nuevo</p>
          </div>
          <footer className="dc-acciones">
            <button type="button" className="ep-boton ep-boton-cancelar" onClick={() => navigate('/usuario')}>Cancelar</button>
            <button type="submit" className="dc-boton-desactivar">Desactivar mi Cuenta</button>
          </footer>
        </form>
      </div>
    </>
  )
}
