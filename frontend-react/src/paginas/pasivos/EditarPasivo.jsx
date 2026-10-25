import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import CampoFecha from '../../componentes/CampoFecha.jsx'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import {
  actualizarPasivo,
  AMORTIZACIONES,
  categoriaPasivo,
  leerTasa,
  obtenerPasivo,
  PATRON_PLAZO,
  PATRON_TASA,
  progresoPago,
} from '../../datos/pasivos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoFecha } from '../../utilidades/fecha.js'
import { formatoPesos, leerPesos, PATRON_PESOS } from '../../utilidades/moneda.js'
import { SelectorAmortizacion } from './CamposPasivo.jsx'

export default function EditarPasivo() {
  useClaseBody('mod-pasivo-form mod-pasivo-editar')
  useTituloPagina('Editar Pasivo')
  const navigate = useNavigate()
  const { id } = useParams()
  const pasivo = obtenerPasivo(id)
  const [amortizacion, setAmortizacion] = useState(pasivo?.amortizacion)
  const [fecha, setFecha] = useState(pasivo?.fechaInicio)

  if (!pasivo) return <Navigate to="/pasivos" replace />
  const categoria = categoriaPasivo(pasivo.categoria)

  function enviar(evento) {
    evento.preventDefault()
    const campos = evento.target.elements
    const saldo = leerPesos(campos.saldo.value)
    campos.saldo.setCustomValidity(saldo <= pasivo.valorInicial ? '' : `El saldo no puede ser mayor al valor inicial (${formatoPesos(pasivo.valorInicial)})`)
    if (!evento.target.reportValidity()) return
    const plazoMeses = Number(campos.plazo.value)
    actualizarPasivo(pasivo.id, {
      nombre: campos.nombre.value.trim(),
      saldoActual: saldo,
      tasaMensual: leerTasa(campos.tasa.value),
      plazoMeses,
      amortizacion,
      fechaInicio: fecha,
      // Si se acorta el plazo, no puede haber mas cuotas pagadas que cuotas.
      cuotasPagadas: Math.min(pasivo.cuotasPagadas, plazoMeses),
    })
    navigate('/pasivos')
  }

  return (
    <>
      <EncabezadoPagina titulo="Editar Pasivo" subtitulo="Actualiza los datos de la deuda" />
      <form onSubmit={enviar}>
        <section className="pasivo-form-layout">
          <div className="pasivo-form-col">
            <section className="franja-edicion">
              <div className="icono-franja"><i className={`ph ${categoria.icono}`}></i></div>
              <div className="info-franja">
                <span className="etiqueta-franja">Editando</span>
                <strong className="nombre-franja">{pasivo.nombre}</strong>
              </div>
              <div className="saldo-franja">
                <span className="label-saldo-franja">Saldo actual</span>
                <strong className="monto-saldo-franja">{formatoPesos(pasivo.saldoActual)}</strong>
              </div>
            </section>
            <section className="grupo-campo campo-nombre">
              <label htmlFor="nombre">NOMBRE DEL PASIVO</label>
              <input type="text" id="nombre" name="nombre" defaultValue={pasivo.nombre} maxLength={100} required />
            </section>
            <section className="grupo-campo campo-saldo">
              <label htmlFor="saldo">SALDO ACTUAL</label>
              <div className="campo-monto">
                <span className="prefijo-monto">$</span>
                <input
                  type="text"
                  id="saldo"
                  name="saldo"
                  defaultValue={pasivo.saldoActual.toLocaleString('es-CO')}
                  inputMode="numeric"
                  pattern={PATRON_PESOS}
                  title="Solo números, por ejemplo 8200000 o 8.200.000"
                  required
                  onInput={(evento) => evento.target.setCustomValidity('')}
                />
                <span className="badge-campo">SALDO</span>
              </div>
              <small>Actualiza si realizaste un abono extraordinario</small>
            </section>
            <section className="fila-campos">
              <section className="grupo-campo campo-tasa">
                <label htmlFor="tasa">TASA MENSUAL</label>
                <div className="campo-monto">
                  <input type="text" id="tasa" name="tasa" defaultValue={pasivo.tasaMensual} inputMode="decimal" pattern={PATRON_TASA} title="Por ejemplo 1.8 (hasta 2 decimales)" required />
                  <span className="sufijo-campo">% MV</span>
                </div>
              </section>
              <section className="grupo-campo campo-plazo">
                <label htmlFor="plazo">PLAZO</label>
                <div className="campo-monto">
                  <input type="text" id="plazo" name="plazo" defaultValue={pasivo.plazoMeses} inputMode="numeric" pattern={PATRON_PLAZO} title="Número de meses mayor a cero" required />
                  <span className="sufijo-campo">meses</span>
                </div>
              </section>
            </section>
            <section className="grupo-campo campo-amortizacion">
              <label>TIPO DE AMORTIZACIÓN</label>
              <SelectorAmortizacion valor={amortizacion} onCambiar={setAmortizacion} />
            </section>
            <section className="grupo-campo campo-fecha-pasivo">
              <label htmlFor="fecha">FECHA DE INICIO</label>
              <CampoFecha clase="campo-fecha-pasivo-input" valor={fecha} onCambiar={setFecha} />
            </section>
          </div>
          <aside className="pasivo-panel-previa">
            <div className="pasivo-previa-header">
              <h2>ESTADO ACTUAL</h2>
            </div>
            <div className="pasivo-previa-contenido">
              <div className="pasivo-previa-fila-icono">
                <span className="pasivo-previa-icono"><i className={`ph ${categoria.icono}`}></i></span>
                <div className="pasivo-previa-titular">
                  <h3>{pasivo.nombre}</h3>
                  <span className="pasivo-previa-subtipo">{pasivo.categoria} · {AMORTIZACIONES[pasivo.amortizacion].etiqueta}</span>
                </div>
              </div>
              <hr className="pasivo-previa-divider" />
              <span className="pasivo-previa-label">Progreso de pago</span>
              <strong className="pasivo-previa-monto">{progresoPago(pasivo)}% pagado</strong>
              <span className="pasivo-previa-label">Fecha de inicio</span>
              <strong className="pasivo-previa-fecha">{formatoFecha(pasivo.fechaInicio)}</strong>
            </div>
          </aside>
        </section>
        <section className="acciones-formulario">
          <button type="button" className="btn-cancelar" onClick={() => navigate('/pasivos')}>Cancelar</button>
          <button type="submit" className="btn-guardar"><i className="ph ph-floppy-disk"></i>Guardar Cambios</button>
        </section>
      </form>
    </>
  )
}
