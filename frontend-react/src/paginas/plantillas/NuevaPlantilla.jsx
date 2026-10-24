import { useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { listarFondos, TIPOS_FONDO } from '../../datos/fondos.js'
import { CATEGORIAS_MOVIMIENTO } from '../../datos/movimientos.js'
import { crearPlantilla, fechasEjecucion, RECURRENCIAS, resumenPlantilla } from '../../datos/plantillas.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { diaISO } from '../../utilidades/fecha.js'
import { formatoPesos, leerPesos, PATRON_PESOS } from '../../utilidades/moneda.js'
import { ChipsCategoria, DiaEjecucion, SelectorRecurrencia, Vigencia } from './CamposPlantilla.jsx'

const plural = (cantidad, singular, varios) => `${cantidad} ${cantidad === 1 ? singular : varios}`

export default function NuevaPlantilla() {
  useClaseBody('mod-plantilla-form mod-plantilla-crear')
  useTituloPagina('Nueva Plantilla')
  const navigate = useNavigate()
  // Mismo patron que Nuevo Movimiento: el tipo vive en la URL (?tipo=gasto).
  const [parametros, setParametros] = useSearchParams()
  const tipo = parametros.get('tipo') === 'gasto' ? 'gasto' : 'ingreso'

  const fondos = listarFondos().filter((fondo) => fondo.activo)
  const [categoriaElegida, setCategoria] = useState(null)
  const [recurrencia, setRecurrencia] = useState('MENSUAL')
  const [dia, setDia] = useState(5)
  // Pasar una funcion a useState hace que solo se ejecute en el primer render.
  const [inicio, setInicio] = useState(() => diaISO())
  const [fin, setFin] = useState(() => `${new Date().getFullYear()}-12-31`)
  const [fondoId, setFondoId] = useState(fondos[0]?.id)

  const categorias = CATEGORIAS_MOVIMIENTO[tipo]
  const categoria = categorias.some((c) => c.nombre === categoriaElegida) ? categoriaElegida : categorias[0].nombre

  // Pistas que se recalculan mientras se llena el formulario.
  const borrador = { recurrencia, dia, inicio, fin, activo: true }
  const pistaVigencia =
    inicio && fin && fin >= inicio
      ? `${plural(resumenPlantilla(borrador).meses, 'mes', 'meses')} de vigencia · ${plural(fechasEjecucion(borrador).length, 'ejecución programada', 'ejecuciones programadas')}`
      : 'La fecha fin debe ser igual o posterior a la fecha de inicio'

  function enviar(evento) {
    evento.preventDefault()
    const campoMonto = evento.target.elements.monto
    campoMonto.setCustomValidity(leerPesos(campoMonto.value) > 0 ? '' : 'El monto debe ser mayor a cero')
    if (!evento.target.reportValidity()) return
    crearPlantilla({
      tipo,
      categoria,
      // ponytail: el diseño no trae campo de descripcion; la plantilla se muestra con su categoria
      descripcion: '',
      monto: leerPesos(campoMonto.value),
      fondoId,
      recurrencia,
      dia,
      inicio,
      fin,
    })
    navigate('/plantillas')
  }

  // Sin fondos activos no hay de donde ejecutar la plantilla.
  if (fondos.length === 0) return <Navigate to="/fondos/nuevo" replace />

  return (
    <>
      <EncabezadoPagina titulo="Nueva Plantilla" subtitulo="Configura un movimiento automático recurrente" />
      <form onSubmit={enviar}>
        <div className="grid-plantilla-form">
          <div className="col-izq-form">
            <p className="seccion-label">TIPO Y MONTO</p>
            <section className="type-toggle">
              {[
                ['ingreso', 'ph-trend-up', 'Ingreso'],
                ['gasto', 'ph-trend-down', 'Gasto'],
              ].map(([clave, icono, texto]) => (
                <button
                  key={clave}
                  type="button"
                  // El CSS colorea el boton activo segun este atributo.
                  data-tipo={clave}
                  className={clave === tipo ? 'toggle-tipo activo' : 'toggle-tipo'}
                  aria-pressed={clave === tipo}
                  onClick={() => setParametros({ tipo: clave }, { replace: true })}
                >
                  <i className={`ph ${icono}`}></i>{texto}
                </button>
              ))}
            </section>
            <section className="campo-monto">
              <span className="prefijo-monto">$</span>
              <input
                type="text"
                id="monto"
                name="monto"
                placeholder="0"
                aria-label="Monto"
                inputMode="numeric"
                pattern={PATRON_PESOS}
                title="Solo números, por ejemplo 95000 o 95.000"
                required
                onInput={(evento) => evento.target.setCustomValidity('')}
              />
              <span className={`badge-tipo-monto ${tipo}`}>{tipo.toUpperCase()}</span>
            </section>
            <p className="seccion-label">CATEGORÍA</p>
            <ChipsCategoria tipo={tipo} valor={categoria} onCambiar={setCategoria} />
            <p className="seccion-label">RECURRENCIA</p>
            <SelectorRecurrencia valor={recurrencia} onCambiar={setRecurrencia} />
          </div>
          <div className="col-der-form">
            <p className="seccion-label">DÍA DE EJECUCIÓN</p>
            <DiaEjecucion valor={dia} onCambiar={setDia} />
            <small className="hint-plantilla">{RECURRENCIAS[recurrencia].frecuencia} · La ejecución se programa automáticamente</small>
            <p className="seccion-label">PERIODO DE VIGENCIA</p>
            <Vigencia inicio={inicio} fin={fin} onInicio={setInicio} onFin={setFin} />
            <small className="hint-plantilla">{pistaVigencia}</small>
            <p className="seccion-label">FONDO ASOCIADO</p>
            <section className="lista-fondos-asociados">
              {fondos.map((fondo) => (
                <button
                  key={fondo.id}
                  type="button"
                  className={fondo.id === fondoId ? 'fund-row activo' : 'fund-row'}
                  aria-pressed={fondo.id === fondoId}
                  onClick={() => setFondoId(fondo.id)}
                >
                  <i className={`ph ${TIPOS_FONDO[fondo.tipo].icono}`}></i>
                  <span className="info-fund"><strong>{fondo.nombre}</strong><small>{formatoPesos(fondo.saldo)}</small></span>
                  <i className="ph ph-check check-fund"></i>
                </button>
              ))}
            </section>
          </div>
        </div>
        <section className="acciones-formulario">
          <button type="button" className="btn-cancelar" onClick={() => navigate('/plantillas')}>Cancelar</button>
          <button type="submit" className="btn-guardar"><i className="ph ph-floppy-disk"></i>Guardar Plantilla</button>
        </section>
      </form>
    </>
  )
}
