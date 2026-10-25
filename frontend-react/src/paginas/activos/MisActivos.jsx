import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import EstadoVacio from '../../componentes/EstadoVacio.jsx'
import { categoriaActivo, desactivarActivo, listarActivos, valorTotalActivos } from '../../datos/activos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoPesos } from '../../utilidades/moneda.js'
import ModalDesactivarActivo from './ModalDesactivarActivo.jsx'

function TarjetaActivo({ activo, onVer, onEditar, onDesactivar }) {
  const categoria = categoriaActivo(activo.categoria)
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <article className={`tarjeta-bien ${activo.activo ? categoria.color : 'bien-inactivo inactivo'}`}>
        <header className="encabezado-bien">
          <span className="icono"><i className={`ph ${categoria.icono}`}></i></span>
          <span className={activo.activo ? 'estado-bien activo' : 'estado-bien'}>
            <span className="punto"></span>{activo.activo ? 'Activo' : 'Inactivo'}
          </span>
        </header>
        <div className="cuerpo-bien">
          <h3>{activo.nombre}</h3>
          {/* "ACTIVO" es el tipo (activo vs pasivo), no el estado. */}
          <p>{activo.categoria.toUpperCase()} · ACTIVO</p>
        </div>
        <div className="fila-valor">
          <div className="info-valor">
            <span className="etiqueta-valor">Valor actual</span>
            <strong className="monto-bien">{formatoPesos(activo.valor)}</strong>
          </div>
          <div className="acciones-bien">
            <button type="button" title="Ver detalle" onClick={onVer}><i className="ph ph-eye"></i></button>
            <button type="button" title="Editar" onClick={onEditar}><i className="ph ph-pencil-simple"></i></button>
            <button type="button" title="Desactivar" onClick={onDesactivar}><i className="ph ph-warning"></i></button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default function MisActivos() {
  const navigate = useNavigate()
  const [activos, setActivos] = useState(listarActivos)
  const [busqueda, setBusqueda] = useState('')
  const [aDesactivar, setADesactivar] = useState(null)
  const vacio = activos.length === 0
  useClaseBody(vacio ? 'mod-activos-vacio' : aDesactivar ? 'mod-lista-activos mod-activo-desactivar' : 'mod-lista-activos')
  useTituloPagina('Mis Activos')

  function confirmarDesactivar() {
    desactivarActivo(aDesactivar.id)
    setActivos(listarActivos())
    setADesactivar(null)
  }

  const encabezado = <EncabezadoPagina titulo="Mis Activos" subtitulo="Controla todos tus bienes y patrimonio" />

  if (vacio) {
    return (
      <>
        {encabezado}
        <EstadoVacio
          sufijo="activos"
          claseBoton="btn-primer-activo"
          icono="ph-house"
          iconoEnCirculo
          titulo="No tienes activos registrados"
          texto="Agrega un bien para conocer el valor total de tu patrimonio"
          textoBoton={'+  Agregar Activo'}
          onAccion={() => navigate('/activos/nuevo')}
        />
      </>
    )
  }

  const vigentes = activos.filter((activo) => activo.activo).length
  const visibles = activos.filter((activo) => activo.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()))

  return (
    <>
      {encabezado}
      <section className="tarjeta-resumen resumen-activos">
        <div className="informacion-resumen">
          <p>VALOR TOTAL DE ACTIVOS</p>
          <h2>{formatoPesos(valorTotalActivos())}</h2>
          <span className="badge-resumen">{vigentes} {vigentes === 1 ? 'bien activo' : 'bienes activos'}</span>
        </div>
        <div className="estadisticas-resumen">
          <div className="estadistica positivo">
            <p>Activos</p>
            <strong>{vigentes}</strong>
          </div>
          <div className="estadistica">
            <p>Inactivos</p>
            <strong>{activos.length - vigentes}</strong>
          </div>
        </div>
        <div className="divisor-resumen"></div>
      </section>
      <section className="barra-herramientas barra-activos">
        <div className="busqueda">
          <i className="ph ph-magnifying-glass"></i>
          <input
            type="search"
            placeholder="Buscar activo por nombre..."
            aria-label="Buscar activo por nombre"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </div>
        {/* ponytail: filtro decorativo como en el prototipo; se conecta cuando haya un diseño del menú */}
        <button type="button" className="filtro-todos">Todos <i className="ph ph-caret-down"></i></button>
        <button type="button" className="boton-primario" onClick={() => navigate('/activos/nuevo')}>
          <i className="ph ph-plus"></i> Nuevo Activo
        </button>
      </section>
      <h3 className="lista-bienes-titulo">BIENES REGISTRADOS</h3>
      <section className="grid-bienes row">
        {visibles.map((activo) => (
          <TarjetaActivo
            key={activo.id}
            activo={activo}
            onVer={() => navigate(`/activos/${activo.id}`)}
            onEditar={() => navigate(`/activos/${activo.id}/editar`)}
            onDesactivar={() => setADesactivar(activo)}
          />
        ))}
      </section>
      {aDesactivar && (
        <ModalDesactivarActivo activo={aDesactivar} onCancelar={() => setADesactivar(null)} onConfirmar={confirmarDesactivar} />
      )}
    </>
  )
}
