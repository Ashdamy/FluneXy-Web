import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { desactivarFondo, obtenerFondo, TIPOS_FONDO } from '../../datos/fondos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoPesos } from '../../utilidades/moneda.js'
import ModalDesactivarFondo from './ModalDesactivarFondo.jsx'

export default function DetalleFondo() {
  useClaseBody('mod-fondos')
  useTituloPagina('Detalle del Fondo')
  const navigate = useNavigate()
  // useParams lee la parte variable de la URL: en /fondos/2 da { id: '2' }.
  const { id } = useParams()
  const [confirmando, setConfirmando] = useState(false)

  const fondo = obtenerFondo(id)
  if (!fondo) return <Navigate to="/fondos" replace />
  const tipo = TIPOS_FONDO[fondo.tipo]

  function confirmarDesactivar() {
    desactivarFondo(fondo.id)
    navigate('/fondos')
  }

  return (
    <>
      <EncabezadoPagina titulo={fondo.nombre} subtitulo={`Detalle del fondo · ${tipo.etiqueta.toUpperCase()}`} />
      <section className="hero-card">
        <div className="bloque-izquierdo-hero">
          <div className="icono-hero"><i className={`ph ${tipo.icono}`}></i></div>
          <div className="info-nombre-hero">
            <h2 className="nombre-hero">{fondo.nombre}</h2>
            <span className="badge-tipo">{tipo.etiqueta}</span>
          </div>
        </div>
        <div className="contenedor-monto-hero">
          <span className="label-hero">Saldo Actual</span>
          <strong className="monto-hero">{formatoPesos(fondo.saldo)}</strong>
        </div>
        <span className="chip-estado">
          <span className="punto"></span>
          {fondo.activo ? 'Activo' : 'Inactivo'}
        </span>
      </section>
      <section className="informacion-activo">
        <div className="grid-info">
          <div className="tile-info">
            <div className="fila-tile">
              <i className="ph ph-calendar"></i>
              <span className="tile-label">CREADO</span>
            </div>
            <strong>{fondo.creado}</strong>
          </div>
          <div className="tile-info">
            <div className="fila-tile">
              <i className="ph ph-arrows-clockwise"></i>
              <span className="tile-label">ACTUALIZACIÓN</span>
            </div>
            <strong>{fondo.actualizacion}</strong>
          </div>
          <div className="tile-info">
            <div className="fila-tile">
              <i className="ph ph-chart-bar"></i>
              <span className="tile-label">TRANSACCIONES</span>
            </div>
            <strong>{fondo.transacciones}</strong>
          </div>
          <div className="tile-info">
            <div className="fila-tile">
              <i className="ph ph-tag"></i>
              <span className="tile-label">CATEGORÍA</span>
            </div>
            <strong>{tipo.etiqueta}</strong>
          </div>
        </div>
      </section>
      <section className="actividad-reciente">
        <span className="seccion-label">ACTIVIDAD RECIENTE</span>
        <div className="lista-transacciones">
          {fondo.actividad.map((item) => (
            <div key={item.id} className={`item-transaccion ${item.monto > 0 ? 'ingreso' : 'gasto'}`}>
              <span className="punto"></span>
              <p>{item.concepto}</p>
              <strong>{item.monto > 0 ? '+' : ''}{formatoPesos(item.monto)}</strong>
            </div>
          ))}
        </div>
      </section>
      {/* HU04.3 permite editar cualquier fondo del usuario, activo o no.
          RN04.4.2: solo un fondo activo se puede desactivar. */}
      <div className="acciones-detalle">
        <button type="button" className="btn-secundario" onClick={() => navigate(`/fondos/${fondo.id}/editar`)}>
          <i className="ph ph-pencil-simple"></i> Editar Fondo
        </button>
        {fondo.activo && (
          <button type="button" className="btn-peligro" onClick={() => setConfirmando(true)}>
            <i className="ph ph-warning"></i> Desactivar Fondo
          </button>
        )}
      </div>
      {confirmando && (
        <ModalDesactivarFondo fondo={fondo} onCancelar={() => setConfirmando(false)} onConfirmar={confirmarDesactivar} />
      )}
    </>
  )
}
