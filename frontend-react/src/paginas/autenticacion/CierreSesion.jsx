import { useNavigate } from 'react-router-dom'
import useTituloPagina from '../../hooks/useTituloPagina.js'

export default function CierreSesion() {
  useTituloPagina('Sesión Cerrada')
  const navigate = useNavigate()

  return (
    <section className="tarjeta-formulario">
      <div className="icono-formulario icono-cierre">
        <i className="ph ph-check"></i>
      </div>
      <header className="encabezado-autenticacion">
        <h1>Sesión cerrada</h1>
        <p>Tu sesión se cerró correctamente.</p>
        <p>Tu información financiera está protegida.</p>
      </header>
      <div className="mensaje-verificacion">
        <i className="ph ph-lock"></i>
        <p>Ningún dato quedó expuesto. Siempre iniciamos sesión con verificación segura.</p>
      </div>
      <button type="button" className="boton-primario" onClick={() => navigate('/autenticacion/iniciar-sesion')}>
        Iniciar sesión de nuevo
      </button>
    </section>
  )
}
