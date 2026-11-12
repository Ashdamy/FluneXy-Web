import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import CampoFecha from '../../componentes/CampoFecha.jsx'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { listarFondos } from '../../datos/fondos.js'
import { ahorroMensual, crearMeta, mesesRestantes, metasActivas } from '../../datos/metas.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { diaISO, formatoMesAnio } from '../../utilidades/fecha.js'
import { formatoPesos, leerPesos, PATRON_PESOS, pesosValidos } from '../../utilidades/moneda.js'
import { nombreRepetido } from '../../utilidades/validacion.js'
import { ListaFondosMeta } from './CamposMeta.jsx'

export default function NuevaMeta() {
  useClaseBody('mod-meta-form mod-meta-crear')
  useTituloPagina('Nueva Meta')
  // RN09.1.1 y precondicion de HU09.1: la meta va en un fondo activo del usuario.
  const fondos = listarFondos().filter((fondo) => fondo.activo)
  if (fondos.length === 0) return <Navigate to="/fondos/nuevo" replace />
  return <FormularioMeta fondos={fondos} />
}

function FormularioMeta({ fondos }) {
  const navigate = useNavigate()
  // Campos controlados: la vista previa se recalcula mientras se escribe (HU09.1 paso 4).
  const [nombre, setNombre] = useState('')
  const [monto, setMonto] = useState('')
  const [fecha, setFecha] = useState('')
  const [fondoId, setFondoId] = useState(fondos[0].id)

  const valor = pesosValidos(monto)
  const meses = fecha ? mesesRestantes(fecha) : 0
  const mensual = valor > 0 && fecha ? ahorroMensual({ montoObjetivo: valor, fechaObjetivo: fecha }) : 0

  function enviar(evento) {
    evento.preventDefault()
    const { elements } = evento.target
    // RN09.1.2: el nombre no se repite entre las metas activas del usuario.
    elements.nombre.setCustomValidity(nombreRepetido(metasActivas(), nombre) ? 'Ya tienes una meta activa con este nombre' : '')
    // RN09.1.3: monto objetivo mayor que cero (y ck_monto_objetivo en la BD).
    elements.monto.setCustomValidity(!monto || leerPesos(monto) > 0 ? '' : 'El monto debe ser mayor a cero')
    // RN09.1.4: la fecha objetivo es hoy o posterior; lo revisa el atributo min.
    if (!evento.target.reportValidity()) return
    crearMeta({ nombre: nombre.trim(), montoObjetivo: valor, fechaObjetivo: fecha, fondoId })
    navigate('/metas')
  }

  return (
    <>
      <EncabezadoPagina titulo="Nueva Meta" subtitulo="Define un nuevo objetivo financiero" />
      {/* noValidate: la validacion se hace solo en enviar(). */}
      <form noValidate onSubmit={enviar}>
        <section className="meta-form-layout">
          <div className="meta-form-col">
            <section className="grupo-campo campo-nombre">
              <label htmlFor="nombre-meta">Nombre de la meta</label>
              <input
                type="text"
                id="nombre-meta"
                name="nombre"
                placeholder="Moto Nueva"
                maxLength={100}
                required
                value={nombre}
                onChange={(evento) => {
                  evento.target.setCustomValidity('')
                  setNombre(evento.target.value)
                }}
              />
              <small>Dale un nombre claro que te motive a cumplirla</small>
            </section>
            <section className="grupo-campo campo-valor">
              <label htmlFor="monto-meta">Monto objetivo</label>
              <div className="campo-monto">
                <span className="prefijo-monto">$</span>
                <input
                  type="text"
                  id="monto-meta"
                  name="monto"
                  placeholder="12.000.000"
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
              <small>¿Cuánto dinero necesitas para cumplir esta meta?</small>
            </section>
            <section className="grupo-campo campo-fecha-meta">
              <label htmlFor="fecha-meta">Fecha objetivo</label>
              <CampoFecha clase="campo-fecha-meta-input" id="fecha-meta" valor={fecha} onCambiar={setFecha} min={diaISO()} />
              <small>¿Cuándo quieres tener el dinero completo?</small>
            </section>
            <section className="grupo-campo campo-fondos">
              <label>Fondo de ahorro</label>
              <ListaFondosMeta fondos={fondos} elegido={fondoId} onElegir={setFondoId} />
            </section>
          </div>
          <aside className="meta-panel-previa">
            <div className="meta-previa-header">
              <h2>VISTA PREVIA</h2>
            </div>
            <div className="meta-previa-contenido">
              <span className="meta-previa-icono"><i className="ph ph-target"></i></span>
              <h3>{nombre.trim() || 'Nombre de la meta'}</h3>
              <span className="meta-previa-subtipo">META FINANCIERA</span>
              <hr className="meta-previa-divider" />
              <span className="meta-previa-label">Monto objetivo</span>
              <strong className="meta-previa-monto">{formatoPesos(valor)}</strong>
              <span className="meta-previa-label">Ahorro mensual requerido</span>
              <span className="meta-previa-aporte">{formatoPesos(mensual)}</span>
              <div className="meta-previa-chips">
                <span className="chip chip-meses">{meses} {meses === 1 ? 'mes' : 'meses'}</span>
                {/* ponytail: "Alcanzable" fijo como en el prototipo; la documentacion no define el criterio */}
                <span className="chip chip-alcanzable">Alcanzable</span>
                <span className="chip chip-fecha">{fecha ? formatoMesAnio(fecha) : '—'}</span>
              </div>
            </div>
            <div className="meta-previa-pie">
              <p>Esta meta se sumará a tus Objetivos Activos y aportará a tu Total Ahorrado.</p>
            </div>
          </aside>
        </section>
        <section className="acciones-formulario">
          <button type="button" className="btn-cancelar" onClick={() => navigate('/metas')}>Cancelar</button>
          <button type="submit" className="btn-guardar"><i className="ph ph-check"></i>Guardar Meta</button>
        </section>
      </form>
    </>
  )
}
