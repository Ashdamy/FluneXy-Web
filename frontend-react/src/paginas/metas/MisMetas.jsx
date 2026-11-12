import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import EstadoVacio from '../../componentes/EstadoVacio.jsx'
import {
  ahorroMensual,
  desactivarMeta,
  estadoMeta,
  metaCompletada,
  metasActivas,
  metasEnProgreso,
  progresoMeta,
  textoPlazo,
} from '../../datos/metas.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoMesAnio } from '../../utilidades/fecha.js'
import { formatoPesos } from '../../utilidades/moneda.js'
import ModalDesactivarMeta from './ModalDesactivarMeta.jsx'

function TarjetaMeta({ meta, onVer, onEditar, onDesactivar }) {
  const completada = metaCompletada(meta)
  const progreso = progresoMeta(meta)
  const estado = estadoMeta(meta)
  // La tarjeta entera abre el detalle (como desactivar-metas.html); los
  // botones usan stopPropagation para que su clic no "suba" a la tarjeta.
  const accion = (fn) => (evento) => {
    evento.stopPropagation()
    fn()
  }

  return (
    <div className="col-12 col-lg-6">
      <article className="tarjeta-meta h-100" onClick={onVer}>
        <div className="barra-accent"></div>
        <div className="contenido-meta">
          <div className="encabezado-meta">
            {/* Sin categoria en la BD: el mismo icono para todas (conflicto 17). */}
            <div className="icono-meta"><i className="ph ph-target"></i></div>
            <div>
              <h3>{meta.nombre}</h3>
              <span className="etiqueta-fecha">
                {completada ? `Meta: ${formatoMesAnio(meta.fechaObjetivo)} - Completada` : `Meta: ${textoPlazo(meta.fechaObjetivo)}`}
              </span>
            </div>
          </div>
          <div className="badge-porcentaje">
            <span className="porcentaje">{progreso}%</span>
            {completada ? <span className="label-final">final</span> : <span className="label-logrado">logrado</span>}
          </div>
          <div className="barra-progreso">
            {/* El ancho depende del dato, por eso va en style (como en el prototipo). */}
            <div className="barra-progreso-llenado" style={{ width: `${progreso}%` }}></div>
          </div>
          {completada ? (
            <div className="detalle-meta">
              <strong>{formatoPesos(meta.montoAhorrado)} de {formatoPesos(meta.montoObjetivo)}</strong>
            </div>
          ) : (
            <>
              <div className="detalle-meta">
                <strong>{formatoPesos(meta.montoAhorrado)}</strong>
                <span>/ {formatoPesos(meta.montoObjetivo)}</span>
              </div>
              <div className="aporte-mensual">
                <span>{formatoPesos(ahorroMensual(meta))}/mes</span>
              </div>
            </>
          )}
          <div className="estado-meta">
            <span className={`estado estado-${estado.clave}`}>{estado.etiqueta}</span>
            <div className="acciones-meta">
              <button type="button" title="Ver detalle" onClick={accion(onVer)}><i className="ph ph-eye"></i></button>
              <button type="button" title="Editar" onClick={accion(onEditar)}><i className="ph ph-pencil-simple"></i></button>
              <button type="button" title="Desactivar" onClick={accion(onDesactivar)}><i className="ph ph-warning"></i></button>
            </div>
            {completada ? (
              <span className="badge-estado badge-sin-seguimiento">Sin seguimiento</span>
            ) : (
              <span className="badge-estado badge-activa">Activa</span>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default function MisMetas() {
  const navigate = useNavigate()
  // El listado del prototipo ("Objetivos en progreso", "No tienes metas
  // activas") solo muestra metas activas; las inactivas no tienen diseño.
  const [metas, setMetas] = useState(metasActivas)
  const [busqueda, setBusqueda] = useState('')
  const [aDesactivar, setADesactivar] = useState(null)
  const vacio = metas.length === 0
  useClaseBody(vacio ? 'mod-meta-vacio' : aDesactivar ? 'mod-lista-metas mod-meta-desactivar' : 'mod-lista-metas')
  useTituloPagina('Mis Metas')

  function confirmarDesactivar() {
    desactivarMeta(aDesactivar.id)
    setMetas(metasActivas())
    setADesactivar(null)
  }

  const encabezado = <EncabezadoPagina titulo="Mis Metas" subtitulo="Construye tus objetivos financieros" />

  if (vacio) {
    return (
      <>
        {encabezado}
        <EstadoVacio
          sufijo="metas"
          claseBoton="btn-primer-meta"
          icono="ph-target"
          iconoEnCirculo
          titulo="No tienes metas activas"
          texto="Crea una meta de ahorro para empezar a planificar tu futuro"
          textoBoton="+ Nueva Meta"
          onAccion={() => navigate('/metas/nueva')}
        />
      </>
    )
  }

  // Como el prototipo, la meta completada no cuenta en el resumen.
  const enProgreso = metasEnProgreso()
  const totalAhorrado = enProgreso.reduce((total, meta) => total + meta.montoAhorrado, 0)
  const objetivoTotal = enProgreso.reduce((total, meta) => total + meta.montoObjetivo, 0)
  const visibles = metas.filter((meta) => meta.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()))

  return (
    <>
      {encabezado}
      <section className="tarjeta-resumen resumen-metas">
        <div className="informacion-resumen">
          <p>TOTAL AHORRADO</p>
          <h2>{formatoPesos(totalAhorrado)}</h2>
          <span className="badge-fondos">{enProgreso.length} {enProgreso.length === 1 ? 'meta activa' : 'metas activas'}</span>
        </div>
        <div className="estadisticas-resumen">
          <div className="estadistica">
            <p>Metas Activas</p>
            <strong>{enProgreso.length}</strong>
          </div>
          <div className="estadistica">
            <p>Objetivo Total</p>
            <strong>{formatoPesos(objetivoTotal)}</strong>
          </div>
        </div>
      </section>
      <section className="barra-herramientas barra-metas">
        <div className="busqueda">
          <i className="ph ph-magnifying-glass"></i>
          <input
            type="search"
            placeholder="Buscar meta por nombre..."
            aria-label="Buscar meta por nombre"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </div>
        {/* ponytail: filtro decorativo como en el prototipo; se conecta cuando haya un diseño del menú */}
        <button type="button" className="filtro-todos">Todas <i className="ph ph-caret-down"></i></button>
        <button type="button" className="boton-primario" onClick={() => navigate('/metas/nueva')}>
          <i className="ph ph-plus"></i> Nueva Meta
        </button>
      </section>
      <h3 className="lista-metas-titulo">OBJETIVOS EN PROGRESO</h3>
      <section className="lista-metas">
        <div className="grid-metas row">
          {visibles.map((meta) => (
            <TarjetaMeta
              key={meta.id}
              meta={meta}
              onVer={() => navigate(`/metas/${meta.id}`)}
              onEditar={() => navigate(`/metas/${meta.id}/editar`)}
              onDesactivar={() => setADesactivar(meta)}
            />
          ))}
        </div>
      </section>
      {aDesactivar && (
        <ModalDesactivarMeta meta={aDesactivar} onCancelar={() => setADesactivar(null)} onConfirmar={confirmarDesactivar} />
      )}
    </>
  )
}
