import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { obtenerFondo } from '../../datos/fondos.js'
import { iconoCategoria } from '../../datos/movimientos.js'
import { desactivarPlantilla, obtenerPlantilla, RECURRENCIAS, resumenPlantilla, tituloPlantilla } from '../../datos/plantillas.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoFecha, formatoFechaLarga } from '../../utilidades/fecha.js'
import { formatoPesos } from '../../utilidades/moneda.js'
import ModalDesactivarPlantilla from './ModalDesactivarPlantilla.jsx'

export default function DetallePlantilla() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [confirmando, setConfirmando] = useState(false)
  // El CSS del modal cuelga de mod-plantillas, asi que se suma mientras esta abierto.
  useClaseBody(confirmando ? 'mod-plantillas mod-plantilla-detalle' : 'mod-plantilla-detalle')
  useTituloPagina('Detalle de Plantilla')

  const plantilla = obtenerPlantilla(id)
  if (!plantilla) return <Navigate to="/plantillas" replace />

  const resumen = resumenPlantilla(plantilla)
  const recurrencia = RECURRENCIAS[plantilla.recurrencia]
  const esIngreso = plantilla.tipo === 'ingreso'
  const estado = resumen.vencida ? 'Vencida' : plantilla.activo ? 'Activa' : 'Inactiva'

  function confirmarDesactivar() {
    desactivarPlantilla(plantilla.id)
    navigate('/plantillas')
  }

  return (
    <>
      <EncabezadoPagina titulo={tituloPlantilla(plantilla)} subtitulo={`Detalle de la plantilla · ${plantilla.categoria.toUpperCase()}`} />
      <section className="hero-card-plantilla">
        <div className="bloque-izquierdo-hero">
          <div className="icono-hero"><i className={`ph ${iconoCategoria(plantilla.tipo, plantilla.categoria)}`}></i></div>
          <div className="info-nombre-hero">
            <h2 className="nombre-hero">{tituloPlantilla(plantilla)}</h2>
            <span className="badge-tipo-plantilla">
              <i className={`ph ${esIngreso ? 'ph-trend-up' : 'ph-trend-down'}`}></i>{esIngreso ? 'Ingreso' : 'Gasto'} Recurrente
            </span>
          </div>
        </div>
        <div className="contenedor-monto-hero">
          <span className="label-hero">MONTO POR EJECUCIÓN</span>
          <strong className="monto-hero-plantilla">{esIngreso ? '+' : '-'}{formatoPesos(plantilla.monto)}</strong>
        </div>
        <span className="chip-estado">
          <span className="punto"></span>
          {estado}
        </span>
      </section>
      {/* Solo si queda una ejecucion pendiente (no vencida ni desactivada). */}
      {resumen.proxima && (
        <section className="next-exec-banner">
          <div className="bloque-ejec">
            <div className="info-ejec">
              <span className="label-ejec">Próxima ejecución</span>
              <strong>{formatoFechaLarga(resumen.proxima)}</strong>
            </div>
          </div>
          <div className="cuenta-ejec">
            <strong>{resumen.diasParaProxima}</strong>
            <span>{resumen.diasParaProxima === 1 ? 'día' : 'días'}</span>
          </div>
        </section>
      )}
      {plantilla.ultimaFalla && resumen.ultima && (
        <section className="fail-exec-banner">
          <i className="ph ph-warning"></i>
          <div className="info-fail">
            <span className="label-fail">ÚLTIMA EJECUCIÓN FALLIDA</span>
            <strong>{plantilla.ultimaFalla} en {obtenerFondo(plantilla.fondoId).nombre} · {formatoFecha(resumen.ultima)}</strong>
          </div>
        </section>
      )}
      <section className="informacion-plantilla">
        <span className="seccion-label">INFORMACIÓN</span>
        <div className="grid-info-plantilla row">
          {[
            ['CATEGORÍA', plantilla.categoria],
            ['RECURRENCIA', recurrencia.etiqueta],
            ['DÍA EJECUCIÓN', `Día ${plantilla.dia} · ${recurrencia.frecuencia}`],
            ['EJECUCIONES', `${resumen.completadas} / ${resumen.total} completadas`],
            ['FECHA INICIO', formatoFecha(plantilla.inicio)],
            ['FECHA FIN', formatoFecha(plantilla.fin)],
          ].map(([etiqueta, valor]) => (
            <div key={etiqueta} className="col-12 col-md-6 col-lg-4">
              <div className="tile-info-plantilla">
                <span className="tile-label">{etiqueta}</span>
                <strong>{valor}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="tile-total-plantilla">
        <div className="bloque-total">
          <span className="label-total">TOTAL AUTOMATIZADO EN EL PERIODO</span>
          <strong>{formatoPesos(resumen.total * plantilla.monto)}</strong>
        </div>
        <small>{resumen.total} ejecuciones × {formatoPesos(plantilla.monto)}</small>
      </section>
      {/* RN06.2.2 y RN06.3.2: una plantilla inactiva no se edita ni se vuelve a desactivar. */}
      {plantilla.activo && (
        <div className="acciones-detalle">
          <button type="button" className="btn-editar-plantilla" onClick={() => navigate(`/plantillas/${plantilla.id}/editar`)}>
            <i className="ph ph-pencil-simple"></i>Editar Plantilla
          </button>
          <button type="button" className="btn-desactivar-plantilla" onClick={() => setConfirmando(true)}>
            <i className="ph ph-warning"></i>Desactivar Plantilla
          </button>
        </div>
      )}
      {confirmando && (
        <ModalDesactivarPlantilla plantilla={plantilla} onCancelar={() => setConfirmando(false)} onConfirmar={confirmarDesactivar} />
      )}
    </>
  )
}
