import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CampoFecha from '../../componentes/CampoFecha.jsx'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import {
  AMORTIZACIONES,
  CATEGORIAS_PASIVO,
  categoriaPasivo,
  crearPasivo,
  leerTasa,
  PATRON_PLAZO,
  PATRON_TASA,
  tablaAmortizacion,
} from '../../datos/pasivos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { diaISO } from '../../utilidades/fecha.js'
import { formatoPesos, leerPesos, PATRON_PESOS } from '../../utilidades/moneda.js'
import { SelectorAmortizacion } from './CamposPasivo.jsx'

const valido = (patron, texto) => new RegExp(`^(${patron})$`).test(texto)

export default function RegistrarPasivo() {
  useClaseBody('mod-pasivo-form mod-pasivo-crear')
  useTituloPagina('Registrar Pasivo')
  const navigate = useNavigate()
  // Todo controlado: la vista previa recalcula la cuota mientras se escribe.
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('Crédito hipotecario')
  const [valorInicial, setValorInicial] = useState('')
  const [saldoActual, setSaldoActual] = useState('')
  const [tasa, setTasa] = useState('1.8')
  const [plazo, setPlazo] = useState('36')
  const [amortizacion, setAmortizacion] = useState('FRANCESA')
  const [fecha, setFecha] = useState(() => diaISO())

  // Cuota estimada: primera cuota de la tabla con los datos escritos.
  const datosCompletos =
    valido(PATRON_PESOS, valorInicial) && leerPesos(valorInicial) > 0 && valido(PATRON_TASA, tasa) && valido(PATRON_PLAZO, plazo) && fecha
  const cuotaEstimada = datosCompletos
    ? tablaAmortizacion({ valorInicial: leerPesos(valorInicial), tasaMensual: leerTasa(tasa), plazoMeses: Number(plazo), amortizacion, fechaInicio: fecha })[0].valorCuota
    : null
  const saldoPrevia = valido(PATRON_PESOS, saldoActual) ? leerPesos(saldoActual) : leerPesos(valorInicial)

  function enviar(evento) {
    evento.preventDefault()
    const campos = evento.target.elements
    campos['valor-inicial'].setCustomValidity(leerPesos(valorInicial) > 0 ? '' : 'El valor inicial debe ser mayor a cero')
    campos['saldo-actual'].setCustomValidity(
      leerPesos(saldoActual) <= leerPesos(valorInicial) ? '' : 'El saldo actual no puede ser mayor al valor inicial',
    )
    if (!evento.target.reportValidity()) return
    crearPasivo({
      nombre: nombre.trim(),
      categoria,
      valorInicial: leerPesos(valorInicial),
      saldoActual: leerPesos(saldoActual),
      tasaMensual: leerTasa(tasa),
      plazoMeses: Number(plazo),
      amortizacion,
      fechaInicio: fecha,
    })
    navigate('/pasivos')
  }

  // Al escribir se borra el aviso personalizado para volver a validar al enviar.
  const limpiar = (cambiar) => (evento) => {
    evento.target.setCustomValidity('')
    cambiar(evento.target.value)
  }

  return (
    <>
      <EncabezadoPagina titulo="Registrar Pasivo" subtitulo="Agrega una deuda u obligación financiera" />
      <form onSubmit={enviar}>
        <section className="pasivo-form-layout">
          <div className="pasivo-form-col">
            <p className="seccion-label">INFORMACIÓN GENERAL</p>
            <section className="grupo-campo campo-nombre">
              <label htmlFor="nombre">Nombre del pasivo</label>
              <input type="text" id="nombre" placeholder="Crédito Hipotecario Apto 402" maxLength={100} required value={nombre} onChange={(evento) => setNombre(evento.target.value)} />
              <small>Identifica esta deuda con un nombre claro y descriptivo</small>
            </section>
            <section className="grupo-campo campo-categoria">
              <label>Categoría</label>
              <div className="opciones-tipo" role="group" aria-label="Categoría">
                {CATEGORIAS_PASIVO.map((opcion) => (
                  <button
                    key={opcion.nombre}
                    type="button"
                    className={opcion.nombre === categoria ? 'opcion-tipo activa' : 'opcion-tipo'}
                    aria-pressed={opcion.nombre === categoria}
                    onClick={() => setCategoria(opcion.nombre)}
                  >
                    <i className={`ph ${opcion.icono}`}></i>
                    <span className="texto-tipo"><strong>{opcion.nombre}</strong><small>Pasivo</small></span>
                  </button>
                ))}
              </div>
            </section>
            <p className="seccion-label">VALORES</p>
            <section className="fila-campos">
              <div className="grupo-campo">
                <label htmlFor="valor-inicial">Valor inicial</label>
                <div className="campo-monto">
                  <span className="prefijo-monto">$</span>
                  <input type="text" id="valor-inicial" name="valor-inicial" placeholder="10.000.000" inputMode="numeric" pattern={PATRON_PESOS} title="Solo números, por ejemplo 10000000 o 10.000.000" required value={valorInicial} onChange={limpiar(setValorInicial)} />
                  <span className="badge-campo">DEUDA</span>
                </div>
              </div>
              <div className="grupo-campo">
                <label htmlFor="saldo-actual">Saldo actual</label>
                <div className="campo-monto">
                  <span className="prefijo-monto">$</span>
                  <input type="text" id="saldo-actual" name="saldo-actual" placeholder="8.200.000" inputMode="numeric" pattern={PATRON_PESOS} title="Solo números, por ejemplo 8200000 o 8.200.000" required value={saldoActual} onChange={limpiar(setSaldoActual)} />
                  <span className="badge-campo">SALDO</span>
                </div>
                <small>Monto que aún debes al día de hoy</small>
              </div>
            </section>
            <p className="seccion-label">TÉRMINOS DEL CRÉDITO</p>
            <section className="fila-campos">
              <div className="grupo-campo">
                <label htmlFor="tasa-mensual">Tasa mensual</label>
                <div className="campo-monto">
                  <input type="text" id="tasa-mensual" name="tasa" inputMode="decimal" pattern={PATRON_TASA} title="Por ejemplo 1.8 (hasta 2 decimales)" required value={tasa} onChange={(evento) => setTasa(evento.target.value)} />
                  <span className="sufijo-campo">% MV</span>
                </div>
              </div>
              <div className="grupo-campo">
                <label htmlFor="plazo">Plazo</label>
                <div className="campo-monto">
                  <input type="text" id="plazo" name="plazo" inputMode="numeric" pattern={PATRON_PLAZO} title="Número de meses mayor a cero" required value={plazo} onChange={(evento) => setPlazo(evento.target.value)} />
                  <span className="sufijo-campo">meses</span>
                </div>
              </div>
            </section>
            <section className="grupo-campo campo-amortizacion">
              <label>Tipo de amortización</label>
              <SelectorAmortizacion valor={amortizacion} onCambiar={setAmortizacion} />
              <small>{AMORTIZACIONES[amortizacion].ayuda}</small>
            </section>
            <section className="grupo-campo campo-fecha-pasivo">
              <label htmlFor="fecha">Fecha de inicio</label>
              <CampoFecha clase="campo-fecha-pasivo-input" valor={fecha} onCambiar={setFecha} />
            </section>
          </div>
          <aside className="pasivo-panel-previa">
            <div className="pasivo-previa-header">
              <h2>VISTA PREVIA</h2>
            </div>
            <div className="pasivo-previa-contenido">
              <span className="pasivo-previa-icono"><i className={`ph ${categoriaPasivo(categoria).icono}`}></i></span>
              <h3>{nombre.trim() || 'Nombre del pasivo'}</h3>
              <span className="pasivo-previa-subtipo">{categoria.toUpperCase()} · {AMORTIZACIONES[amortizacion].etiqueta}</span>
              <hr className="pasivo-previa-divider" />
              <span className="pasivo-previa-label">Saldo pendiente</span>
              <strong className="pasivo-previa-monto">{formatoPesos(saldoPrevia)}</strong>
              <span className="pasivo-previa-label">Cuota estimada ({valido(PATRON_PLAZO, plazo) ? plazo : '—'} meses)</span>
              <span className="pasivo-previa-cuota">{cuotaEstimada === null ? '—' : `${formatoPesos(Math.round(cuotaEstimada))} / mes`}</span>
            </div>
            <div className="pasivo-previa-pie">
              <p>Este pasivo se sumará al Total de Pasivos y afectará tu Índice de Endeudamiento.</p>
            </div>
          </aside>
        </section>
        <section className="acciones-formulario">
          <button type="button" className="btn-cancelar" onClick={() => navigate('/pasivos')}>Cancelar</button>
          <button type="submit" className="btn-guardar"><i className="ph ph-floppy-disk"></i>Guardar Pasivo</button>
        </section>
      </form>
    </>
  )
}
