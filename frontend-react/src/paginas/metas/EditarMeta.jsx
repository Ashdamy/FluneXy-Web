import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import CampoFecha from '../../componentes/CampoFecha.jsx'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { actualizarMeta, ahorroMensual, mesesRestantes, metasActivas, obtenerMeta, progresoMeta } from '../../datos/metas.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { diaISO, formatoMesAnio } from '../../utilidades/fecha.js'
import { formatoCorto, formatoPesos, leerPesos, PATRON_PESOS, pesosValidos } from '../../utilidades/moneda.js'
import { nombreRepetido } from '../../utilidades/validacion.js'

export default function EditarMeta() {
  useClaseBody('mod-meta-form mod-meta-editar')
  useTituloPagina('Editar Meta')
  const { id } = useParams()
  const meta = obtenerMeta(id)
  if (!meta) return <Navigate to="/metas" replace />
  // RN09.3.2: solo se editan metas activas.
  if (!meta.activo) return <Navigate to={`/metas/${meta.id}`} replace />
  return <FormularioEditar meta={meta} />
}

function FormularioEditar({ meta }) {
  const navigate = useNavigate()
  const [monto, setMonto] = useState(meta.montoObjetivo.toLocaleString('es-CO'))
  const [fecha, setFecha] = useState(meta.fechaObjetivo)
  const progreso = progresoMeta(meta)
  const actual = ahorroMensual(meta)

  // RN09.3.6: el ahorro mensual se recalcula con el monto y la fecha que se escriben.
  const valor = pesosValidos(monto)
  const nuevo = valor > 0 && fecha ? ahorroMensual({ ...meta, montoObjetivo: valor, fechaObjetivo: fecha }) : actual
  const meses = fecha ? mesesRestantes(fecha) : 0

  function enviar(evento) {
    evento.preventDefault()
    const { elements } = evento.target
    // RN09.3.3: nombre obligatorio y sin repetir entre las metas activas.
    elements.nombre.setCustomValidity(nombreRepetido(metasActivas(), elements.nombre.value, meta.id) ? 'Ya tienes una meta activa con este nombre' : '')
    // RN09.3.4: monto objetivo mayor que cero.
    elements.monto.setCustomValidity(!monto || leerPesos(monto) > 0 ? '' : 'El monto debe ser mayor a cero')
    // RN09.3.5: fecha objetivo hoy o posterior (atributo min).
    if (!evento.target.reportValidity()) return
    // RN09.3.8: no cambia el monto ahorrado. El fondo no se edita (conflicto 16, como el prototipo).
    actualizarMeta(meta.id, { nombre: elements.nombre.value.trim(), montoObjetivo: valor, fechaObjetivo: fecha })
    navigate('/metas')
  }

  return (
    <>
      <EncabezadoPagina titulo="Editar Meta" subtitulo="Actualiza los datos de tu objetivo" />
      {/* noValidate: la validacion se hace solo en enviar(). */}
      <form noValidate onSubmit={enviar}>
        <section className="meta-form-layout">
          <div className="meta-form-col">
            <section className="franja-edicion">
              <div className="icono-franja"><i className="ph ph-target"></i></div>
              <div className="info-franja">
                <span className="etiqueta-franja">Editando</span>
                <strong className="nombre-franja">{meta.nombre}</strong>
              </div>
              <div className="saldo-franja">
                <span className="label-saldo-franja">Progreso actual</span>
                <strong className="monto-saldo-franja">{progreso}% · {formatoCorto(meta.montoAhorrado)}/{formatoCorto(meta.montoObjetivo)}</strong>
              </div>
            </section>
            <section className="grupo-campo campo-nombre">
              <label htmlFor="nombre-meta">NOMBRE DE LA META</label>
              <input
                type="text"
                id="nombre-meta"
                name="nombre"
                defaultValue={meta.nombre}
                maxLength={100}
                required
                onInput={(evento) => evento.target.setCustomValidity('')}
              />
            </section>
            <section className="grupo-campo campo-valor">
              <label htmlFor="monto-meta">MONTO OBJETIVO</label>
              <div className="campo-monto">
                <span className="prefijo-monto">$</span>
                <input
                  type="text"
                  id="monto-meta"
                  name="monto"
                  inputMode="numeric"
                  pattern={PATRON_PESOS}
                  title="Solo números, por ejemplo 12000000 o 12.000.000"
                  required
                  value={monto}
                  onChange={(evento) => {
                    evento.target.setCustomValidity('')
                    setMonto(evento.target.value)
                  }}
                />
                <span className="badge-campo">META</span>
              </div>
              <small>Cambiar el monto recalculará el ahorro mensual requerido</small>
            </section>
            <section className="grupo-campo campo-fecha-meta">
              <label htmlFor="fecha-meta">FECHA OBJETIVO</label>
              <CampoFecha clase="campo-fecha-meta-input" id="fecha-meta" valor={fecha} onCambiar={setFecha} min={diaISO()} />
              <small>Cambiar la fecha recalculará el ahorro mensual requerido</small>
            </section>
            <div className="chips-meta">
              <span className="chip chip-meses">{meses} {meses === 1 ? 'mes restante' : 'meses restantes'}</span>
              {/* ponytail: "Alcanzable" fijo como en el prototipo; la documentacion no define el criterio */}
              <span className="chip chip-alcanzable"><i className="ph ph-check"></i>Alcanzable</span>
            </div>
          </div>
          <div className="meta-panel-col">
            <aside className="meta-panel-previa">
              <div className="meta-previa-header">
                <h2>ESTADO ACTUAL</h2>
              </div>
              <div className="meta-previa-contenido">
                <div className="meta-previa-fila-icono">
                  <span className="meta-previa-icono"><i className="ph ph-target"></i></span>
                  <div className="meta-previa-titular">
                    <h3>{meta.nombre}</h3>
                    <span className="meta-previa-subtipo">Meta Financiera</span>
                  </div>
                </div>
                <hr className="meta-previa-divider" />
                <span className="meta-previa-label">Progreso</span>
                <strong className="meta-previa-fecha">{progreso}% · {formatoPesos(meta.montoAhorrado)}</strong>
                <span className="meta-previa-label">Ahorro mensual actual</span>
                <strong className="meta-previa-monto">{formatoPesos(actual)}/mes</strong>
              </div>
            </aside>
            <div className="meta-calc-card">
              <div className="c-icono"><i className="ph ph-arrows-clockwise"></i></div>
              <span className="c-titulo">NUEVO CÁLCULO AUTOMÁTICO</span>
              <strong className="c-monto">{formatoPesos(nuevo)}</strong>
              <p className="c-texto">
                Con los datos actuales sigues necesitando {formatoPesos(nuevo)}/mes para cumplir tu meta en {formatoMesAnio(fecha || meta.fechaObjetivo)}
              </p>
            </div>
          </div>
        </section>
        <section className="acciones-formulario">
          <button type="button" className="btn-cancelar" onClick={() => navigate('/metas')}>Cancelar</button>
          <button type="submit" className="btn-guardar"><i className="ph ph-floppy-disk"></i>Guardar Cambios</button>
        </section>
      </form>
    </>
  )
}
