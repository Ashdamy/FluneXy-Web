import { useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { listarFondos, obtenerFondo } from '../../datos/fondos.js'
import { CATEGORIAS_MOVIMIENTO, crearMovimiento, errorSaldo } from '../../datos/movimientos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { diaISO } from '../../utilidades/fecha.js'
import { formatoPesos, leerPesos, PATRON_PESOS } from '../../utilidades/moneda.js'
import { BotonCategoria, BotonFondo } from './OpcionesMovimiento.jsx'

// Hora actual "HH:MM", para guardar la fecha completa del movimiento.
const horaActual = () => new Date().toTimeString().slice(0, 5)

export default function NuevoMovimiento() {
  const navigate = useNavigate()
  // El tipo vive en la URL (?tipo=gasto): asi el boton "Nuevo Movimiento"
  // y el alternador comparten la misma fuente, y se puede enlazar directo.
  const [parametros, setParametros] = useSearchParams()
  const tipo = parametros.get('tipo') === 'gasto' ? 'gasto' : 'ingreso'
  const etiquetaTipo = tipo === 'gasto' ? 'Gasto' : 'Ingreso'

  const fondos = listarFondos().filter((fondo) => fondo.activo)
  const [categoriaElegida, setCategoria] = useState(null)
  const [fondoId, setFondoId] = useState(fondos[0]?.id)
  // Si la categoria elegida no es del tipo actual (por ejemplo, despues de
  // cambiar de Gasto a Ingreso), se usa la primera del tipo.
  const categorias = CATEGORIAS_MOVIMIENTO[tipo]
  const categoria = categorias.some((c) => c.nombre === categoriaElegida) ? categoriaElegida : categorias[0].nombre
  const [monto, setMonto] = useState('')

  // El aviso no es un estado aparte: se calcula en cada render con lo que
  // hay escrito. Solo importa cuando el monto ya es un numero valido.
  const montoValido = new RegExp(`^(${PATRON_PESOS})$`).test(monto)
  const insuficiente = montoValido && fondoId && errorSaldo({ fondoId, tipo, monto: leerPesos(monto) }) !== ''

  useClaseBody(insuficiente ? 'mod-form-movimiento mod-form-saldo' : 'mod-form-movimiento')
  useTituloPagina(`Nuevo Movimiento | ${etiquetaTipo}`)

  function cambiarTipo(nuevoTipo) {
    setParametros({ tipo: nuevoTipo }, { replace: true })
  }

  function enviar(evento) {
    evento.preventDefault()
    const campoMonto = evento.target.elements.monto
    campoMonto.setCustomValidity(leerPesos(monto) > 0 ? '' : 'El monto debe ser mayor a cero')
    if (!evento.target.reportValidity() || insuficiente) return
    const datos = new FormData(evento.target)
    crearMovimiento({
      tipo,
      categoria,
      fondoId,
      monto: leerPesos(monto),
      fecha: `${datos.get('fecha')}T${horaActual()}`,
      descripcion: datos.get('descripcion').trim(),
    })
    navigate('/movimientos')
  }

  // Sin fondos activos no hay donde registrar el movimiento: primero hay que crear uno.
  if (fondos.length === 0) return <Navigate to="/fondos/nuevo" replace />

  return (
    <>
      <EncabezadoPagina titulo="Nuevo Movimiento" subtitulo="Registra un ingreso o gasto" />
      <form className="formulario-movimiento" onSubmit={enviar}>
        <div className="grupo-formulario gap-tipo">
          <label>TIPO DE MOVIMIENTO</label>
          <div className="alternador-tipo">
            <button
              type="button"
              className={tipo === 'ingreso' ? 'opcion-alternador activo-ingreso' : 'opcion-alternador'}
              aria-pressed={tipo === 'ingreso'}
              onClick={() => cambiarTipo('ingreso')}
            >
              <i className="ph ph-arrow-up-right"></i> Ingreso
            </button>
            <button
              type="button"
              className={tipo === 'gasto' ? 'opcion-alternador activo-gasto' : 'opcion-alternador'}
              aria-pressed={tipo === 'gasto'}
              onClick={() => cambiarTipo('gasto')}
            >
              <i className="ph ph-arrow-down-left"></i> Gasto
            </button>
          </div>
        </div>
        <div className="fila-monto-fecha">
          <div className="grupo-formulario">
            <label htmlFor="monto">MONTO</label>
            <div className="campo-monto">
              <span className="prefijo-monto">$</span>
              <input
                type="text"
                id="monto"
                name="monto"
                placeholder="45.000"
                inputMode="numeric"
                pattern={PATRON_PESOS}
                title="Solo números, por ejemplo 45000 o 45.000"
                required
                value={monto}
                onChange={(evento) => {
                  evento.target.setCustomValidity('')
                  setMonto(evento.target.value)
                }}
              />
              <span className={`badge-tipo badge-${tipo}`}>{etiquetaTipo}</span>
            </div>
          </div>
          <div className="grupo-formulario">
            <label htmlFor="fecha">FECHA</label>
            <div className="campo-fecha">
              <input type="date" id="fecha" name="fecha" defaultValue={diaISO()} required />
              {/* El icono abre el calendario nativo del navegador. */}
              <span className="icono-calendario" onClick={(evento) => evento.currentTarget.previousElementSibling.showPicker()}>
                <i className="ph ph-calendar"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="grupo-formulario gap-categorias">
          <label>CATEGORÍA</label>
          <div className="grid-categorias row">
            {categorias.map((opcion) => (
              <div key={opcion.nombre} className="col-12 col-md-6 col-lg-4">
                <BotonCategoria categoria={opcion} elegida={opcion.nombre === categoria} onElegir={setCategoria} />
              </div>
            ))}
          </div>
        </div>
        <div className="grupo-formulario gap-fondo">
          <label>FONDO ASOCIADO</label>
          <div className="grid-fondos row">
            {fondos.map((fondo) => (
              <div key={fondo.id} className="col-12 col-md-6 col-lg-4">
                <BotonFondo fondo={fondo} elegido={fondo.id === fondoId} onElegir={setFondoId} />
              </div>
            ))}
          </div>
        </div>
        {insuficiente && (
          <div className="aviso-saldo" role="alert">
            <i className="ph ph-warning"></i>
            <span>
              Saldo insuficiente en {obtenerFondo(fondoId).nombre}. Disponible: {formatoPesos(obtenerFondo(fondoId).saldo)}, monto requerido: {formatoPesos(leerPesos(monto))}.
            </span>
          </div>
        )}
        <div className="grupo-formulario gap-descripcion">
          <label htmlFor="descripcion">DESCRIPCIÓN (opcional)</label>
          <textarea id="descripcion" name="descripcion" placeholder="Suscripción mensual Netflix plan Premium"></textarea>
        </div>
        <div className="acciones-movimiento">
          <button type="button" className="boton-secundario" onClick={() => navigate('/movimientos')}>Cancelar</button>
          <button type="submit" className="boton-primario"><i className="ph ph-check"></i> Guardar Movimiento</button>
        </div>
      </form>
    </>
  )
}
