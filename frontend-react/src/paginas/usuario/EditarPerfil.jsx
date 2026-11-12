import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { actualizarUsuario, obtenerUsuario } from '../../datos/usuario.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'

export default function EditarPerfil() {
  useClaseBody('mod-usuario')
  useTituloPagina('Editar Perfil')
  const navigate = useNavigate()
  const usuario = obtenerUsuario()
  // Campos controlados: la vista previa cambia mientras se escribe.
  const [nombre, setNombre] = useState(usuario.nombre)
  const [apellido, setApellido] = useState(usuario.apellido)
  const [correo, setCorreo] = useState(usuario.correo)

  function enviar(evento) {
    evento.preventDefault()
    // RN02.5.3: obligatorios (required); el correo con formato valido (type="email").
    // RN02.5.2 / RN02.2.1: la unicidad del correo la revisara el backend.
    if (!evento.target.reportValidity()) return
    actualizarUsuario({ nombre: nombre.trim(), apellido: apellido.trim(), correo: correo.trim() })
    navigate('/usuario')
  }

  const campo = (id, etiqueta, valor, setValor, tipo, autocompletar, maximo) => (
    <>
      <label className="ep-etiqueta-campo d-block" htmlFor={id}>{etiqueta}</label>
      <div className="ep-campo">
        <span className="ep-icono"><i className={`ph ${tipo === 'email' ? 'ph-envelope' : 'ph-user'}`}></i></span>
        <input
          type={tipo}
          id={id}
          name={id.replace('ep-', '')}
          value={valor}
          autoComplete={autocompletar}
          maxLength={maximo}
          required
          onChange={(evento) => setValor(evento.target.value)}
        />
      </div>
    </>
  )

  return (
    <>
      <EncabezadoPagina titulo="Editar Perfil" subtitulo="Actualiza tu información personal" />
      <form noValidate onSubmit={enviar}>
        <div className="ep-contenido">
          <div className="ep-columna-form">
            <section className="ep-seccion">
              <p className="ep-seccion-titulo">INFORMACIÓN PERSONAL</p>
              <div className="ep-form">
                <div className="row gx-3 ep-campos-nombre">
                  {/* Largos de la tabla usuarios: nombre y apellido VARCHAR(75), correo VARCHAR(150). */}
                  <div className="col-6">{campo('ep-nombre', 'NOMBRE', nombre, setNombre, 'text', 'given-name', 75)}</div>
                  <div className="col-6">{campo('ep-apellido', 'APELLIDO', apellido, setApellido, 'text', 'family-name', 75)}</div>
                </div>
                {campo('ep-correo', 'CORREO ELECTRÓNICO', correo, setCorreo, 'email', 'email', 150)}
                <p className="ep-ayuda">Si lo cambias, verificaremos que no esté registrado</p>
                <div className="ep-divisor"></div>
                <p className="ep-requerido">* Todos los campos son obligatorios</p>
              </div>
            </section>
          </div>
          <aside className="ep-columna-vista">
            <section className="ep-preview">
              <p className="ep-seccion-titulo">VISTA PREVIA</p>
              <div className="ep-avatar"><span>{nombre.trim()[0] ?? ''}</span></div>
              <strong>{nombre.trim()} {apellido.trim()}</strong>
              <p className="ep-preview-email">{correo.trim()}</p>
              <span className="ep-activa"><i className="ph ph-circle-fill"></i> Activa</span>
              <p className="ep-preview-nota">Así se verá tu perfil en toda la plataforma.</p>
            </section>
          </aside>
        </div>
        <div className="ep-acciones">
          <button type="button" className="ep-boton ep-boton-cancelar" onClick={() => navigate('/usuario')}>Cancelar</button>
          <button type="submit" className="ep-boton ep-boton-guardar">Guardar Cambios</button>
        </div>
      </form>
    </>
  )
}
