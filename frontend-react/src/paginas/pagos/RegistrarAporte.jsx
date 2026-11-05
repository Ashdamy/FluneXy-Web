import { useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { listarFondos, obtenerFondo } from '../../datos/fondos.js'
import { obtenerMeta, progresoMeta } from '../../datos/metas.js'
import { registrarAporte } from '../../datos/pagos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoPesos, leerPesos, pesosValidos } from '../../utilidades/moneda.js'
import { CampoMonto, ListaFondosPago } from './CamposPago.jsx'

export default function RegistrarAporte() {
  useClaseBody('mod-pagos')
  useTituloPagina('Registrar Aporte')
  // La meta llega en la URL: ?meta=1.
  const [parametros] = useSearchParams()
  const meta = obtenerMeta(parametros.get('meta'))
  const fondos = listarFondos().filter((fondo) => fondo.activo)

  if (!meta || !meta.activo) return <Navigate to="/metas" replace />
  // Sin fondos activos no hay de donde aportar: primero hay que crear uno.
  if (fondos.length === 0) return <Navigate to="/fondos/nuevo" replace />

  // key: si la URL cambia a otra meta, React crea un formulario nuevo.
  return <FormularioAporte key={meta.id} meta={meta} fondos={fondos} />
}

function FormularioAporte({ meta, fondos }) {
  const navigate = useNavigate()
  // Empieza en el fondo de la meta (metas.id_fondo en la BD), si sigue activo.
  const [fondoId, setFondoId] = useState(fondos.some((fondo) => fondo.id === meta.fondoId) ? meta.fondoId : fondos[0].id)
  const [monto, setMonto] = useState('')

  const fondo = obtenerFondo(fondoId)
  const valor = pesosValidos(monto)
  const ahorrado = `${formatoPesos(meta.montoAhorrado)} de ${formatoPesos(meta.montoObjetivo)}`

  function enviar(evento) {
    evento.preventDefault()
    // ck_saldo_no_negativo de la BD: un fondo no puede quedar en negativo.
    const error = leerPesos(monto) <= 0 ? 'El monto debe ser mayor a cero'
      : valor > fondo.saldo ? `Saldo insuficiente en ${fondo.nombre}. Disponible: ${formatoPesos(fondo.saldo)}`
        : ''
    // noValidate en el form: la validacion se hace solo aqui, al enviar.
    evento.target.elements.monto.setCustomValidity(error)
    if (!evento.target.reportValidity()) return
    registrarAporte({ metaId: meta.id, fondoId, monto: valor })
    navigate('/pagos/historial')
  }

  return (
    <>
      <EncabezadoPagina titulo="Registrar Aporte" subtitulo={`${meta.nombre} · Meta Financiera`} />
      <section className="pago-form-layout">
        <form className="pago-form-col" noValidate onSubmit={enviar}>
          <section className="snap-meta">
            <span className="icono-snap-meta"><i className="ph ph-target"></i></span>
            <div className="info-snap-meta">
              <strong>Progreso: {progresoMeta(meta)}%</strong>
              <span>Ahorrado de la meta</span>
            </div>
            <strong className="valor-snap-meta">{ahorrado}</strong>
          </section>
          <section className="form-card">
            <CampoMonto etiqueta="MONTO DEL APORTE" valor={monto} onCambiar={setMonto} placeholder="500.000" />
            <span className="etiqueta-campo">FONDO ASOCIADO</span>
            <ListaFondosPago fondos={fondos} elegido={fondoId} onElegir={setFondoId} />
          </section>
          <section className="acciones-formulario">
            <button type="button" className="btn-cancelar" onClick={() => navigate(`/metas/${meta.id}`)}>Cancelar</button>
            <button type="submit" className="btn-guardar">Registrar Aporte</button>
          </section>
        </form>
        <aside className="panel-resumen-pago">
          <span className="resumen-titulo">RESUMEN DEL APORTE</span>
          <div className="resumen-icono"><i className="ph ph-target"></i></div>
          <h3>{meta.nombre}</h3>
          <p className="resumen-sub">Meta Financiera</p>
          <hr />
          <div className="resumen-fila">
            <span>Progreso actual</span>
            <strong>{progresoMeta(meta)}% · {ahorrado}</strong>
          </div>
          <div className="resumen-fila">
            <span>Progreso después de este aporte</span>
            <strong className="verde">{progresoMeta(meta, valor)}% · {formatoPesos(meta.montoAhorrado + valor)} de {formatoPesos(meta.montoObjetivo)}</strong>
          </div>
          <p className="resumen-nota">Al confirmar, se descontará de {fondo.nombre} y se sumará al progreso de tu meta.</p>
        </aside>
      </section>
    </>
  )
}
