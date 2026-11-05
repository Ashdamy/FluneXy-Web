import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { categoriaActivo, desactivarActivo, obtenerActivo, participacionActivo } from '../../datos/activos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoFecha } from '../../utilidades/fecha.js'
import { formatoCorto, formatoPesos } from '../../utilidades/moneda.js'
import ModalDesactivarActivo from './ModalDesactivarActivo.jsx'

export default function DetalleActivo() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [confirmando, setConfirmando] = useState(false)
  useClaseBody(confirmando ? 'mod-activo-detalle mod-activo-desactivar' : 'mod-activo-detalle')
  useTituloPagina('Detalle del Activo')

  const activo = obtenerActivo(id)
  if (!activo) return <Navigate to="/activos" replace />

  const categoria = categoriaActivo(activo.categoria)
  const { porcentaje, total } = participacionActivo(activo)

  function confirmarDesactivar() {
    desactivarActivo(activo.id)
    navigate('/activos')
  }

  return (
    <>
      <EncabezadoPagina titulo={activo.nombre} subtitulo={`Detalle del activo · ${activo.categoria.toUpperCase()}`} />
      <section className="hero-card">
        <div className="bloque-izquierdo-hero">
          <div className="icono-hero"><i className={`ph ${categoria.icono}`}></i></div>
          <div className="info-nombre-hero">
            <h2 className="nombre-hero">{activo.nombre}</h2>
            <span className="badge-tipo">{activo.categoria} · Activo</span>
          </div>
        </div>
        <div className="contenedor-monto-hero">
          <span className="label-hero">Valor Actual</span>
          <strong className="monto-hero">{formatoPesos(activo.valor)}</strong>
        </div>
        <span className="chip-estado">
          <span className="punto"></span>
          {activo.activo ? 'Activo' : 'Inactivo'}
        </span>
      </section>
      <section className="contrib-card">
        <span className="label-participacion">PARTICIPACIÓN EN EL PATRIMONIO TOTAL</span>
        <div className="barra-progreso">
          {/* El ancho depende del dato, por eso va en style (como en el prototipo). */}
          <span className="relleno" style={{ width: `${porcentaje}%` }}></span>
        </div>
        <div className="info-participacion">
          <span className="porcentaje">{porcentaje}% del total</span>
          <span className="detalle">
            {activo.activo ? `${formatoCorto(activo.valor)} de ${formatoCorto(total)}` : 'Inactivo: no suma al patrimonio'}
          </span>
        </div>
      </section>
      <section className="informacion-activo">
        <span className="seccion-label">INFORMACIÓN</span>
        <div className="grid-info row">
          {[
            [categoria.icono, 'CATEGORÍA', activo.categoria],
            ['ph-calendar', 'ÚLT. ACTUALIZ.', formatoFecha(activo.fechaActualizacion)],
            ['ph-calendar-blank', 'FECHA REGISTRO', formatoFecha(activo.fechaRegistro)],
            ['ph-chart-bar', 'TIPO', 'Activo'],
          ].map(([icono, etiqueta, valor]) => (
            <div key={etiqueta} className="col-12 col-sm-6 col-xxl-3">
              <div className="tile-info h-100">
                <div className="fila-tile">
                  <i className={`ph ${icono}`}></i>
                  <span className="tile-label">{etiqueta}</span>
                </div>
                <strong>{valor}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="tile-impacto">
        <span className="label-impacto">IMPACTO EN BALANCE FINANCIERO</span>
        <strong>{activo.activo ? 'Suma al Patrimonio Neto' : 'No suma al Patrimonio Neto'}</strong>
      </section>
      {/* RN07.3.2 y RN07.4.2: un activo inactivo no se edita ni se vuelve a desactivar. */}
      {activo.activo && (
        <div className="acciones-detalle">
          <button type="button" className="btn-secundario" onClick={() => navigate(`/activos/${activo.id}/editar`)}>
            <i className="ph ph-pencil-simple"></i> Editar Activo
          </button>
          <button type="button" className="btn-peligro" onClick={() => setConfirmando(true)}>
            <i className="ph ph-warning"></i> Desactivar Activo
          </button>
        </div>
      )}
      {confirmando && (
        <ModalDesactivarActivo activo={activo} onCancelar={() => setConfirmando(false)} onConfirmar={confirmarDesactivar} />
      )}
    </>
  )
}
