import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import EstadoVacio from '../../componentes/EstadoVacio.jsx'
import { AMORTIZACIONES, categoriaPasivo, listarPasivos, totalPasivos } from '../../datos/pasivos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoPesos } from '../../utilidades/moneda.js'

function TarjetaPasivoCuotas({ pasivo, onAbrir }) {
  const categoria = categoriaPasivo(pasivo.categoria)
  const progreso = Math.round((pasivo.cuotasPagadas / pasivo.plazoMeses) * 100)

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <article className={`tarjeta-deuda ${categoria.color} h-100`} onClick={onAbrir}>
        <span className="icono-deuda"><i className={`ph ${categoria.icono}`}></i></span>
        <h4 className="nombre-deuda">{pasivo.nombre}</h4>
        <p className="subtipo-deuda">{pasivo.categoria.toUpperCase()} · {AMORTIZACIONES[pasivo.amortizacion].etiqueta}</p>
        <div className="fila-saldo-deuda">
          <div className="info-saldo-deuda">
            <span className="etiqueta-saldo">Saldo pendiente</span>
            <strong className="monto-deuda">{formatoPesos(pasivo.saldoActual)}</strong>
          </div>
        </div>
        <div className="progreso-deuda">
          <div className="fila-progreso">
            <span className="label-progreso">Cuotas pagadas</span>
            <strong className="valor-progreso">{pasivo.cuotasPagadas} de {pasivo.plazoMeses}</strong>
          </div>
          <div className="barra-progreso-deuda"><span className="relleno-deuda" style={{ width: `${progreso}%` }}></span></div>
        </div>
        <div className="pie-pasivo-cuota">
          <span className="estado-deuda"><span className="punto"></span>Activo</span>
          {/* stopPropagation: sin esto el clic navegaria dos veces (enlace y tarjeta). */}
          <Link className="enlace-ver-cuotas" to={`/cuotas/${pasivo.id}`} onClick={(evento) => evento.stopPropagation()}>
            Ver cuotas <i className="ph ph-arrow-right"></i>
          </Link>
        </div>
      </article>
    </div>
  )
}

export default function PasivosConCuotas() {
  const navigate = useNavigate()
  const [busqueda, setBusqueda] = useState('')
  // Solo los pasivos vigentes tienen cuotas por consultar aqui. Los inactivos
  // conservan su tabla, a la que se llega desde el detalle del pasivo.
  const activos = listarPasivos().filter((pasivo) => pasivo.activo)
  const vacio = activos.length === 0
  useClaseBody(vacio ? 'mod-pasivo-vacio' : 'mod-lista-pasivos mod-pasivos-cuotas')
  useTituloPagina('Pasivos con Cuotas')

  if (vacio) {
    return (
      <>
        <EncabezadoPagina titulo="Pasivos con Cuotas Disponibles" />
        <EstadoVacio
          sufijo="pasivos"
          icono="ph-clipboard-text"
          iconoEnCirculo
          titulo="No hay pasivos con cuotas disponibles"
          texto="Aún no tienes pasivos activos con una tabla de amortización generada."
        />
      </>
    )
  }

  const visibles = activos.filter((pasivo) => pasivo.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()))

  return (
    <>
      <EncabezadoPagina titulo="Pasivos con Cuotas Disponibles" subtitulo="Consulta la tabla de amortización de tus pasivos activos" />
      <section className="aviso-pasivos-cuotas">
        <span className="punto-aviso"></span>
        <span>
          {activos.length} {activos.length === 1 ? 'pasivo activo' : 'pasivos activos'} con cuotas disponibles · {formatoPesos(totalPasivos())} en saldo pendiente total
        </span>
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
      </section>
      <h3 className="lista-deudas-titulo">PASIVOS CON CUOTAS DISPONIBLES</h3>
      <section className="grid-deudas row">
        {visibles.map((pasivo) => (
          <TarjetaPasivoCuotas key={pasivo.id} pasivo={pasivo} onAbrir={() => navigate(`/cuotas/${pasivo.id}`)} />
        ))}
      </section>
    </>
  )
}
