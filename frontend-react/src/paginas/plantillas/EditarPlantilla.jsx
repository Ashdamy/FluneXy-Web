import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { iconoCategoria } from '../../datos/movimientos.js'
import { actualizarPlantilla, obtenerPlantilla, tituloPlantilla } from '../../datos/plantillas.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoPesos, leerPesos, PATRON_PESOS } from '../../utilidades/moneda.js'
import { ChipsCategoria, DiaEjecucion, SelectorRecurrencia, Vigencia } from './CamposPlantilla.jsx'

export default function EditarPlantilla() {
  useClaseBody('mod-plantilla-form mod-plantilla-editar')
  useTituloPagina('Editar Plantilla')
  const navigate = useNavigate()
  const { id } = useParams()
  const plantilla = obtenerPlantilla(id)
  // Cada estado arranca con el valor actual de la plantilla.
  const [categoria, setCategoria] = useState(plantilla?.categoria)
  const [recurrencia, setRecurrencia] = useState(plantilla?.recurrencia)
  const [dia, setDia] = useState(plantilla?.dia)
  const [inicio, setInicio] = useState(plantilla?.inicio)
  const [fin, setFin] = useState(plantilla?.fin)

  if (!plantilla) return <Navigate to="/plantillas" replace />
  const esIngreso = plantilla.tipo === 'ingreso'

  function enviar(evento) {
    evento.preventDefault()
    const campoMonto = evento.target.elements.monto
    campoMonto.setCustomValidity(leerPesos(campoMonto.value) > 0 ? '' : 'El monto debe ser mayor a cero')
    if (!evento.target.reportValidity()) return
    actualizarPlantilla(plantilla.id, { categoria, recurrencia, dia, inicio, fin, monto: leerPesos(campoMonto.value) })
    navigate('/plantillas')
  }

  return (
    <>
      <EncabezadoPagina titulo="Editar Plantilla" subtitulo="Ajusta la configuración del movimiento automático" />
      <section className="edit-banner-plantilla">
        <div className="icono-franja"><i className={`ph ${iconoCategoria(plantilla.tipo, plantilla.categoria)}`}></i></div>
        <div className="info-franja">
          <span className="etiqueta-franja">EDITANDO</span>
          <strong className="nombre-franja">{tituloPlantilla(plantilla)}</strong>
        </div>
        <div className="saldo-franja">
          <span className="label-saldo-franja">Monto actual</span>
          <strong className="monto-saldo-franja">{esIngreso ? '+' : '-'}{formatoPesos(plantilla.monto)}</strong>
        </div>
      </section>
      <form onSubmit={enviar}>
        <div className="grid-plantilla-form">
          <div className="col-izq-form">
            <p className="seccion-label">MONTO</p>
            <section className="campo-monto">
              <span className="prefijo-monto">$</span>
              <input
                type="text"
                id="monto"
                name="monto"
                aria-label="Monto"
                defaultValue={plantilla.monto.toLocaleString('es-CO')}
                inputMode="numeric"
                pattern={PATRON_PESOS}
                title="Solo números, por ejemplo 95000 o 95.000"
                required
                onInput={(evento) => evento.target.setCustomValidity('')}
              />
              <span className={`badge-tipo-monto ${plantilla.tipo}`}>{plantilla.tipo.toUpperCase()}</span>
            </section>
            <p className="seccion-label">CATEGORÍA</p>
            <ChipsCategoria tipo={plantilla.tipo} valor={categoria} onCambiar={setCategoria} />
            <p className="seccion-label">RECURRENCIA</p>
            <SelectorRecurrencia valor={recurrencia} onCambiar={setRecurrencia} />
          </div>
          <div className="col-der-form">
            <p className="seccion-label">DÍA DE EJECUCIÓN</p>
            <DiaEjecucion valor={dia} onCambiar={setDia} />
            <p className="seccion-label">PERIODO DE VIGENCIA</p>
            <Vigencia inicio={inicio} fin={fin} onInicio={setInicio} onFin={setFin} />
          </div>
        </div>
        <section className="acciones-formulario">
          <button type="button" className="btn-cancelar" onClick={() => navigate(`/plantillas/${plantilla.id}`)}>Cancelar</button>
          <button type="submit" className="btn-guardar"><i className="ph ph-floppy-disk"></i>Guardar Cambios</button>
        </section>
      </form>
    </>
  )
}
