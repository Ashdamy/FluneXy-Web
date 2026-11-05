import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { obtenerFondo, TIPOS_FONDO } from '../../datos/fondos.js'
import { desactivarMovimiento, iconoCategoria, listarMovimientos, tituloMovimiento } from '../../datos/movimientos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { etiquetaDia, formatoHora } from '../../utilidades/fecha.js'
import { formatoPesos } from '../../utilidades/moneda.js'
import ModalDesactivarMovimiento from './ModalDesactivarMovimiento.jsx'

function FilaMovimiento({ movimiento, onVer, onEditar, onDesactivar }) {
  const fondo = obtenerFondo(movimiento.fondoId)
  const esIngreso = movimiento.tipo === 'ingreso'

  return (
    <div className={`fila-movimiento ${movimiento.tipo}`}>
      <div className="celda-movimiento">
        <span className="icono-movimiento"><i className={`ph ${iconoCategoria(movimiento.tipo, movimiento.categoria)}`}></i></span>
        <div className="info-movimiento">
          <span className="nombre-movimiento">{tituloMovimiento(movimiento)}</span>
          <span className="tipo-movimiento">{esIngreso ? 'Ingreso' : 'Gasto'}</span>
        </div>
      </div>
      <span className="celda-categoria">{movimiento.categoria}</span>
      <span className="celda-fondo"><i className={`ph ${TIPOS_FONDO[fondo.tipo].icono}`}></i>{fondo.nombre}</span>
      <span className="celda-fecha">{formatoHora(movimiento.fecha)}</span>
      <span className={`celda-monto ${esIngreso ? 'positivo' : 'negativo'}`}>
        {esIngreso ? '+' : '-'}{formatoPesos(movimiento.monto)}
      </span>
      <span className="celda-estado">{movimiento.activo ? 'Activo' : 'Inactivo'}</span>
      <div className="celda-acciones">
        <button type="button" title="Ver detalle" onClick={onVer}><i className="ph ph-eye"></i></button>
        <button type="button" title="Editar" onClick={onEditar}><i className="ph ph-pencil-simple"></i></button>
        <button type="button" className="peligro" title="Desactivar" onClick={onDesactivar}><i className="ph ph-warning"></i></button>
      </div>
    </div>
  )
}

export default function MisMovimientos() {
  const navigate = useNavigate()
  const [movimientos, setMovimientos] = useState(listarMovimientos)
  const [busqueda, setBusqueda] = useState('')
  const [aDesactivar, setADesactivar] = useState(null)

  // RN05.5.4: los inactivos no aparecen en el listado.
  const activos = movimientos.filter((m) => m.activo)
  const vacio = activos.length === 0
  // Cada estado de la pantalla tenia su propia clase en el <body> del prototipo.
  useClaseBody(
    vacio ? 'mod-vacio-movimientos' : aDesactivar ? 'mod-modal-movimiento mod-lista-movimientos' : 'mod-lista-movimientos',
  )
  useTituloPagina('Mis Movimientos')

  function confirmarDesactivar() {
    desactivarMovimiento(aDesactivar.id)
    setMovimientos(listarMovimientos())
    setADesactivar(null)
  }

  const encabezado = <EncabezadoPagina titulo="Mis Movimientos" subtitulo="Consulta todos tus ingresos y gastos" />

  if (vacio) {
    return (
      <>
        {encabezado}
        <section className="estado-vacio">
          <div className="iconos-vacio">
            <div className="circulo-exterior"></div>
            <div className="circulo-interior">
              <i className="ph ph-chart-bar"></i>
            </div>
          </div>
          <h2>No hay movimientos registrados</h2>
          <p>Registra tu primer ingreso o gasto para ver tu actividad aquí</p>
          <button type="button" className="boton-vacio" onClick={() => navigate('/movimientos/nuevo?tipo=ingreso')}>
            +  Nuevo Movimiento
          </button>
        </section>
      </>
    )
  }

  const sumar =(tipo) => activos.filter((m) => m.tipo === tipo).reduce((total, m) => total + m.monto, 0)
  const ingresos = sumar('ingreso')
  const gastos = sumar('gasto')

  // Filtra por el buscador y agrupa por dia: [{ dia: 'HOY · 3 Jun 2025', items: [...] }, ...]
  const texto = busqueda.trim().toLowerCase()
  const grupos = []
  for (const movimiento of activos) {
    if (!`${tituloMovimiento(movimiento)} ${movimiento.categoria}`.toLowerCase().includes(texto)) continue
    const dia = etiquetaDia(movimiento.fecha)
    if (grupos.at(-1)?.dia !== dia) grupos.push({ dia, items: [] })
    grupos.at(-1).items.push(movimiento)
  }

  return (
    <>
      {encabezado}
      <section className="grid-resumen-movimientos row">
        <div className="col-12 col-md-4">
          <article className="tile-movimiento ingreso">
            <p>INGRESOS</p>
            <strong>+{formatoPesos(ingresos)}</strong>
          </article>
        </div>
        <div className="col-12 col-md-4">
          <article className="tile-movimiento gasto">
            <p>GASTOS</p>
            <strong>-{formatoPesos(gastos)}</strong>
          </article>
        </div>
        <div className="col-12 col-md-4">
          <article className="tile-movimiento balance">
            <p>BALANCE</p>
            <strong>{formatoPesos(ingresos - gastos)}</strong>
          </article>
        </div>
      </section>
      <section className="barra-movimientos">
        <div className="busqueda">
          <i className="ph ph-magnifying-glass"></i>
          <input
            type="search"
            placeholder="Buscar movimiento por nombre..."
            aria-label="Buscar movimiento por nombre"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </div>
        {/* ponytail: filtro decorativo como en el prototipo; RN05.5.3 se conecta cuando haya un diseño del menú */}
        <button type="button" className="filtro-todos">Todos <i className="ph ph-caret-down"></i></button>
        <button type="button" className="boton-nuevo-movimiento" onClick={() => navigate('/movimientos/nuevo?tipo=ingreso')}>
          <i className="ph ph-plus"></i> Nuevo Movimiento
        </button>
      </section>
      <h3 className="tabla-movimientos-titulo">TODOS LOS MOVIMIENTOS</h3>
      <section className="tabla-movimientos">
        <div className="tabla-movimientos-cabecera">
          <span>MOVIMIENTO</span>
          <span>CATEGORÍA</span>
          <span>FONDO</span>
          <span>FECHA</span>
          <span>MONTO</span>
          <span>ESTADO</span>
          <span>ACCIONES</span>
          <span className="divisor-cabecera"></span>
        </div>
        {grupos.map((grupo) => (
          // Fragment con key: los grupos no agregan ningun elemento extra al HTML.
          <Fragment key={grupo.dia}>
            <span className="agrupacion-fecha">{grupo.dia}</span>
            {grupo.items.map((movimiento) => (
              <FilaMovimiento
                key={movimiento.id}
                movimiento={movimiento}
                onVer={() => navigate(`/movimientos/${movimiento.id}`)}
                onEditar={() => navigate(`/movimientos/${movimiento.id}/editar`)}
                onDesactivar={() => setADesactivar(movimiento)}
              />
            ))}
          </Fragment>
        ))}
      </section>
      {aDesactivar && (
        <ModalDesactivarMovimiento
          movimiento={aDesactivar}
          onCancelar={() => setADesactivar(null)}
          onConfirmar={confirmarDesactivar}
        />
      )}
    </>
  )
}
