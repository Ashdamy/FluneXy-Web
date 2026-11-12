import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { AYUDA_CONTRASENA, PATRON_CONTRASENA } from '../../utilidades/validacion.js'

// Campo de contrasena con el icono del candado, como el prototipo. La
// etiqueta es un <p> como en el HTML viejo; aria-label le da el nombre al campo.
function CampoClave({ id, etiqueta, ...props }) {
  return (
    <>
      <p className="ep-etiqueta-campo">{etiqueta}</p>
      <div className="ep-campo">
        <span className="ep-icono"><i className="ph ph-lock"></i></span>
        <input type="password" id={id} name={id} aria-label={etiqueta} required {...props} />
      </div>
    </>
  )
}

export default function CambiarContrasena() {
  useClaseBody('mod-usuario')
  useTituloPagina('Cambiar Contraseña')
  const navigate = useNavigate()

  function enviar(evento) {
    evento.preventDefault()
    const { actual, nueva, confirmar } = evento.target.elements
    // RN02.6.4: la nueva no puede ser igual a la actual. RN02.6.3: se confirma.
    nueva.setCustomValidity(nueva.value && nueva.value === actual.value ? 'La nueva contraseña no puede ser igual a la actual' : '')
    confirmar.setCustomValidity(confirmar.value && confirmar.value !== nueva.value ? 'Las contraseñas no coinciden' : '')
    // RN02.6.2: reglas de HU02.3 (pattern). RN02.6.1 (que la actual coincida) la revisara el backend.
    if (!evento.target.reportValidity()) return
    navigate('/usuario')
  }

  const limpiar = (evento) => evento.target.setCustomValidity('')

  return (
    <>
      <EncabezadoPagina titulo="Cambiar Contraseña" subtitulo="Protege el acceso a tu cuenta" />
      <form noValidate onSubmit={enviar}>
        <div className="ep-contenido">
          <div className="ep-columna-form">
            <section className="ep-seccion">
              <p className="ep-seccion-titulo">SEGURIDAD DE LA CUENTA</p>
              <div className="ep-form">
                <CampoClave id="actual" etiqueta="CONTRASEÑA ACTUAL" autoComplete="current-password" onInput={limpiar} />
                <CampoClave id="nueva" etiqueta="NUEVA CONTRASEÑA" autoComplete="new-password" pattern={PATRON_CONTRASENA} title={AYUDA_CONTRASENA} onInput={limpiar} />
                {/* Barra y texto fijos como en el prototipo (igual que Registro y Nueva Contraseña). */}
                <div className="cp-fortaleza">
                  <span className="cp-barra"></span><span className="cp-barra"></span><span className="cp-barra"></span>
                  <p>Fortaleza excelente</p>
                </div>
                {/* Texto del prototipo; se valida la regla completa de RN02.3 (conflicto 06). */}
                <p className="cp-req"><i className="ph ph-check"></i> Mínimo 8 caracteres, una mayúscula y un número</p>
                <CampoClave id="confirmar" etiqueta="CONFIRMAR NUEVA CONTRASEÑA" autoComplete="new-password" onInput={limpiar} />
              </div>
            </section>
          </div>
          <aside className="ep-columna-vista">
            <section className="cp-seguridad">
              <span className="cp-seguridad-icono"><i className="ph ph-shield-check"></i></span>
              <h3>Buenas prácticas de seguridad</h3>
              <ul className="cp-tips">
                <li><span className="cp-dot"></span><p>Usa una combinación única que no compartas con otras cuentas.</p></li>
                <li><span className="cp-dot"></span><p>Evita datos personales fáciles de adivinar, como fechas de nacimiento.</p></li>
                <li><span className="cp-dot"></span><p>La nueva contraseña no puede ser igual a la actual. Se cerrarán todas tus otras sesiones activas.</p></li>
              </ul>
            </section>
          </aside>
        </div>
        <div className="ep-acciones">
          <button type="button" className="ep-boton ep-boton-cancelar" onClick={() => navigate('/usuario')}>Cancelar</button>
          <button type="submit" className="ep-boton ep-boton-guardar">Actualizar Contraseña</button>
        </div>
      </form>
    </>
  )
}
