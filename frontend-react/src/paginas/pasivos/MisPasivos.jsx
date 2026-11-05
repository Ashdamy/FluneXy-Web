import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import EstadoVacio from '../../componentes/EstadoVacio.jsx'
import {
  AMORTIZACIONES,
  categoriaPasivo,
  desactivarPasivo,
  indiceEndeudamiento,
  listarPasivos,
  progresoPago,
  totalPasivos,
} from '../../datos/pasivos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoPesos } from '../../utilidades/moneda.js'
import ModalDesactivarPasivo from './ModalDesactivarPasivo.jsx'

function TarjetaPasivo({ pasivo, onVer, onEditar, onDesactivar }) {
  const categoria = categoriaPasivo(pasivo.categoria)
  const progreso = progresoPago(pasivo)
  // Los botones estan dentro de la tarjeta, que tambien abre el detalle:
  // stopPropagation evita que el clic "suba" hasta la tarjeta.
  const accion = (fn) => (evento) => {
    evento.stopPropagation()
    fn()
  }

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <article className={`tarjeta-deuda ${pasivo.activo ? categoria.color : 'deuda-inactiva inactiva'} h-100`} onClick={onVer}>
        <span className="icono-deuda"><i className={`ph ${categoria.icono}`}></i></span>
        <h4 className="nombre-deuda">{pasivo.nombre}</h4>
        <p className="subtipo-deuda">{pasivo.categoria.toUpperCase()} · {AMORTIZACIONES[pasivo.amortizacion].etiqueta.toUpperCase()}</p>
        <div className="fila-saldo-deuda">
          <div className="info-saldo-deuda">
            <span className="etiqueta-saldo">Saldo pendiente</span>
            <strong className="monto-deuda">{formatoPesos(pasivo.saldoActual)}</strong>
          </div>
          <div className="acciones-deuda">
            <button type="button" title="Ver detalle" onClick={accion(onVer)}><i className="ph ph-eye"></i></button>
            {pasivo.activo && (
              <>
                <button type="button" title="Editar" onClick={accion(onEditar)}><i className="ph ph-pencil-simple"></i></button>
                <button type="button" title="Desactivar" onClick={accion(onDesactivar)}><i className="ph ph-warning"></i></button>
              </>
            )}
          </div>
        </div>
        {/* En el prototipo la tarjeta inactiva no muestra el progreso. */}
        {pasivo.activo ? (
          <>
            <div className="progreso-deuda">
              <div className="fila-progreso">
                <span className="label-progreso">Progreso de pago</span>
                <strong className="valor-progreso">{progreso}%</strong>
              </div>
              <div className="barra-progreso-deuda"><span className="relleno-deuda" style={{ width: `${progreso}%` }}></span></div>
            </div>
            <span className="estado-deuda"><span className="punto"></span>Activo</span>
          </>
        ) : (
          <span className="estado-deuda inactivo">Inactivo</span>
        )}
      </article>
    </div>
  )
}

export default function MisPasivos() {
  const navigate = useNavigate()
  const [pasivos, setPasivos] = useState(listarPasivos)
  const [busqueda, setBusqueda] = useState('')
  const [aDesactivar, setADesactivar] = useState(null)
  const vacio = pasivos.length === 0
  useClaseBody(vacio ? 'mod-pasivo-vacio' : aDesactivar ? 'mod-lista-pasivos mod-pasivo-desactivar' : 'mod-lista-pasivos')
  useTituloPagina('Mis Pasivos')

  function confirmarDesactivar() {
    desactivarPasivo(aDesactivar.id)
    setPasivos(listarPasivos())
    setADesactivar(null)
  }

  const encabezado = <EncabezadoPagina titulo="Mis Pasivos" subtitulo="Controla todas tus obligaciones financieras" />

  if (vacio) {
    return (
      <>
        {encabezado}
        <EstadoVacio
          sufijo="pasivos"
          claseBoton="btn-primer-pasivo"
          icono="ph-credit-card"
          iconoEnCirculo
          titulo="No tienes pasivos registrados"
          texto="Agrega una deuda para conocer tu Índice de Endeudamiento"
          textoBoton={'+  Agregar Pasivo'}
          onAccion={() => navigate('/pasivos/nuevo')}
        />
      </>
    )
  }

  const indice = indiceEndeudamiento()
  const indiceTexto = `${indice.porcentaje.toLocaleString('es-CO', { maximumFractionDigits: 1 })}%`
  const visibles = pasivos.filter((pasivo) => pasivo.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()))

  return (
    <>
      {encabezado}
      <section className="hero-pasivos">
        <div className="card-total-pasivos">
          <span className="etiqueta-hero-pasivo">TOTAL PASIVOS</span>
          <strong className="monto-hero-pasivo">{formatoPesos(totalPasivos())}</strong>
        </div>
        <div className="card-indice-endeudamiento">
          <span className="etiqueta-indice">ÍNDICE DE ENDEUDAMIENTO</span>
          <div className="barra-progreso-indice">
            <span className="relleno-indice" style={{ width: `${Math.min(indice.porcentaje, 100)}%` }}></span>
          </div>
          <strong className="valor-indice">{indiceTexto}</strong>
          <small className="ayuda-indice">
            {indice.sinActivos ? 'Registra tus activos para calcular el índice' : `Nivel ${indice.nivel} · Alerta si supera 40%`}
          </small>
        </div>
      </section>
      <section className="barra-herramientas barra-pasivos">
        <div className="busqueda">
          <i className="ph ph-magnifying-glass"></i>
          <input
            type="search"
            placeholder="Buscar pasivo por nombre..."
            aria-label="Buscar pasivo por nombre"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </div>
        {/* ponytail: filtro decorativo como en el prototipo; se conecta cuando haya un diseño del menú */}
        <button type="button" className="filtro-todos">Todos <i className="ph ph-caret-down"></i></button>
        <button type="button" className="boton-primario" onClick={() => navigate('/pasivos/nuevo')}>
          <i className="ph ph-plus"></i> Nuevo Pasivo
        </button>
      </section>
      <h3 className="lista-deudas-titulo">DEUDAS REGISTRADAS</h3>
      <section className="grid-deudas row">
        {visibles.map((pasivo) => (
          <TarjetaPasivo
            key={pasivo.id}
            pasivo={pasivo}
            onVer={() => navigate(`/pasivos/${pasivo.id}`)}
            onEditar={() => navigate(`/pasivos/${pasivo.id}/editar`)}
            onDesactivar={() => setADesactivar(pasivo)}
          />
        ))}
      </section>
      {aDesactivar && (
        <ModalDesactivarPasivo pasivo={aDesactivar} onCancelar={() => setADesactivar(null)} onConfirmar={confirmarDesactivar} />
      )}
    </>
  )
}
