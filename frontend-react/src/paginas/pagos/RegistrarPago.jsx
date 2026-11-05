import { useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { listarFondos } from '../../datos/fondos.js'
import { registrarPago } from '../../datos/pagos.js'
import { categoriaPasivo, obtenerPasivo, proximaCuota, saldoTrasPago } from '../../datos/pasivos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoFecha } from '../../utilidades/fecha.js'
import { formatoPesos, leerPesos, pesosValidos } from '../../utilidades/moneda.js'
import { CampoMonto, ListaFondosPago } from './CamposPago.jsx'

export default function RegistrarPago() {
  useClaseBody('mod-pagos')
  useTituloPagina('Registrar Pago')
  // La cuota llega en la URL desde Detalle de Cuota: ?pasivo=2&cuota=7.
  const [parametros] = useSearchParams()
  const pasivo = obtenerPasivo(parametros.get('pasivo'))
  const cuota = pasivo && proximaCuota(pasivo)
  const fondos = listarFondos().filter((fondo) => fondo.activo)

  if (!pasivo || !pasivo.activo) return <Navigate to="/cuotas" replace />
  // Solo se paga la proxima cuota. Tambien cubre volver atras despues de pagar.
  if (!cuota || cuota.numero !== Number(parametros.get('cuota'))) return <Navigate to={`/cuotas/${pasivo.id}`} replace />
  // Sin fondos activos no hay con que pagar: primero hay que crear uno.
  if (fondos.length === 0) return <Navigate to="/fondos/nuevo" replace />

  // key: si la URL cambia a otra cuota, React crea un formulario nuevo. Sin esto
  // conservaria el monto escrito para la cuota anterior.
  return <FormularioPago key={`${pasivo.id}-${cuota.numero}`} pasivo={pasivo} cuota={cuota} fondos={fondos} />
}

function FormularioPago({ pasivo, cuota, fondos }) {
  const navigate = useNavigate()
  const [fondoId, setFondoId] = useState(fondos[0].id)
  const [anticipado, setAnticipado] = useState(false)
  // Trae el valor exacto de la cuota para que el saldo coincida con la tabla.
  const [monto, setMonto] = useState(cuota.valorCuota.toLocaleString('es-CO'))

  const textoCuota = `Cuota ${cuota.numero} de ${pasivo.plazoMeses}`
  const vencimiento = formatoFecha(cuota.fechaVencimiento)

  function enviar(evento) {
    evento.preventDefault()
    // noValidate en el form: la validacion se hace solo aqui, al enviar.
    evento.target.elements.monto.setCustomValidity(leerPesos(monto) > 0 ? '' : 'El monto debe ser mayor a cero')
    if (!evento.target.reportValidity()) return
    registrarPago({ pasivoId: pasivo.id, fondoId, monto: pesosValidos(monto), esAnticipado: anticipado })
    navigate('/pagos/historial')
  }

  return (
    <>
      <EncabezadoPagina titulo="Registrar Pago" subtitulo={`${textoCuota} · ${pasivo.nombre}`} />
      <section className="pago-form-layout">
        <form className="pago-form-col" noValidate onSubmit={enviar}>
          <section className="snap-cuota">
            <span className="icono-snap-cuota"><i className="ph ph-receipt"></i></span>
            <div className="info-snap-cuota">
              <strong>Vence: {vencimiento}</strong>
              <span>Valor de la cuota</span>
            </div>
            <strong className="valor-snap-cuota">{formatoPesos(cuota.valorCuota)}</strong>
          </section>
          <section className="form-card">
            <CampoMonto etiqueta="MONTO DEL PAGO" valor={monto} onCambiar={setMonto} />
            <span className="etiqueta-campo">TIPO DE PAGO</span>
            <div className="type-toggle">
              <button type="button" className={anticipado ? 'tog-normal' : 'tog-normal activo'} aria-pressed={!anticipado} onClick={() => setAnticipado(false)}>Abono Capital</button>
              <button type="button" className={anticipado ? 'tog-anticipado activo' : 'tog-anticipado'} aria-pressed={anticipado} onClick={() => setAnticipado(true)}>Anticipado</button>
            </div>
            <span className="etiqueta-campo">FONDO DE PAGO</span>
            <ListaFondosPago fondos={fondos} elegido={fondoId} onElegir={setFondoId} />
          </section>
          <section className="acciones-formulario">
            <button type="button" className="btn-cancelar" onClick={() => navigate(`/cuotas/${pasivo.id}/${cuota.numero}`)}>Cancelar</button>
            <button type="submit" className="btn-guardar">Registrar Pago</button>
          </section>
        </form>
        <aside className="panel-resumen-pago">
          <span className="resumen-titulo">RESUMEN DEL PAGO</span>
          <div className="resumen-icono"><i className={`ph ${categoriaPasivo(pasivo.categoria).icono}`}></i></div>
          <h3>{pasivo.nombre}</h3>
          <p className="resumen-sub">{textoCuota} · Vence {vencimiento}</p>
          <hr />
          <div className="resumen-fila">
            <span>Valor de la cuota</span>
            <strong className="amarillo">{formatoPesos(cuota.valorCuota)}</strong>
          </div>
          <div className="resumen-fila">
            <span>Saldo pendiente actual</span>
            <strong>{formatoPesos(pasivo.saldoActual)}</strong>
          </div>
          <div className="resumen-fila">
            <span>Saldo después de este pago</span>
            <strong className="verde">{formatoPesos(saldoTrasPago(pasivo, pesosValidos(monto)))}</strong>
          </div>
          <p className="resumen-nota">Al confirmar, se actualizará el saldo de tu pasivo y el progreso de tus cuotas.</p>
        </aside>
      </section>
    </>
  )
}
