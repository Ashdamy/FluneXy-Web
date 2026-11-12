import { Link } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { obtenerUsuario } from '../../datos/usuario.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoFecha } from '../../utilidades/fecha.js'

const ACCIONES = [
  ['/usuario/editar', 'mp-accion-indigo', 'ph-pencil-simple', 'Editar Perfil', 'Actualiza tu nombre y correo electrónico'],
  ['/usuario/cambiar-contrasena', 'mp-accion-borde', 'ph-lock', 'Cambiar Contraseña', 'Protege el acceso a tu cuenta'],
  ['/usuario/desactivar-cuenta', 'mp-accion-peligro', 'ph-warning', 'Desactivar Cuenta', 'Suspende temporalmente el acceso'],
]

export default function MiPerfil() {
  useClaseBody('mod-usuario')
  useTituloPagina('Mi Perfil')
  // RN02.4.1-2 y RN02.4.4: los datos del usuario de la sesion, como estan en la BD.
  const usuario = obtenerUsuario()
  const desde = formatoFecha(usuario.fechaRegistro)

  return (
    <>
      <EncabezadoPagina titulo="Mi Perfil" subtitulo="Consulta y administra tu información" />
      <div className="mp-contenido">
        <div className="mp-columna-izq">
          <section className="mp-hero">
            <div className="mp-avatar">
              <span>{usuario.nombre[0]}</span>
            </div>
            <div className="mp-hero-info">
              <h2>{usuario.nombre} {usuario.apellido}</h2>
              <p>{usuario.correo}</p>
              <div className="mp-hero-badges">
                <span className="mp-pill-activa"><i className="ph ph-circle-fill"></i> {usuario.activo ? 'Activa' : 'Inactiva'}</span>
                <span className="mp-pill-miembro">Miembro desde {desde}</span>
              </div>
            </div>
          </section>
          <section className="mp-seccion-datos">
            <p className="mp-seccion-titulo">DATOS DE LA CUENTA</p>
            <div className="mp-datos-tarjeta">
              <div className="mp-fila">
                <span className="mp-fila-icono"><i className="ph ph-user"></i></span>
                <div className="mp-fila-info flex-grow-1">
                  <div className="row gx-4">
                    <div className="col-6">
                      <small>Nombre</small>
                      <strong>{usuario.nombre}</strong>
                    </div>
                    <div className="col-6">
                      <small>Apellido</small>
                      <strong>{usuario.apellido}</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mp-divisor"></div>
              <div className="mp-fila">
                <span className="mp-fila-icono"><i className="ph ph-envelope"></i></span>
                <div className="mp-fila-info">
                  <small>Correo electrónico</small>
                  <strong>{usuario.correo}</strong>
                </div>
              </div>
              <div className="mp-divisor"></div>
              <div className="mp-fila">
                <span className="mp-fila-icono"><i className="ph ph-calendar-blank"></i></span>
                <div className="mp-fila-info">
                  <small>Miembro desde</small>
                  <strong>{desde}</strong>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="mp-columna-der">
          <p className="mp-seccion-titulo">ACCIONES DE CUENTA</p>
          {ACCIONES.map(([ruta, clase, icono, titulo, texto]) => (
            <Link key={ruta} to={ruta} className={`mp-accion ${clase}`}>
              <span className="mp-accion-icono"><i className={`ph ${icono}`}></i></span>
              <div>
                <strong>{titulo}</strong>
                <p>{texto}</p>
              </div>
              <i className="ph ph-caret-right mp-chevron"></i>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
