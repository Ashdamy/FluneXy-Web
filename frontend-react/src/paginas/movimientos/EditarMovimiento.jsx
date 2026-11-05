import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { listarFondos } from '../../datos/fondos.js'
import {
  actualizarMovimiento,
  CATEGORIAS_MOVIMIENTO,
  errorSaldo,
  iconoCategoria,
  obtenerMovimiento,
  tituloMovimiento,
} from '../../datos/movimientos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoPesos, leerPesos, PATRON_PESOS } from '../../utilidades/moneda.js'
import { BotonCategoria, BotonFondo } from './OpcionesMovimiento.jsx'

export default function EditarMovimiento() {
  useClaseBody('mod-editar-movimiento')
  useTituloPagina('Editar Movimiento')
  const navigate = useNavigate()
  const { id } = useParams()
  const movimiento = obtenerMovimiento(id)
  const [categoria, setCategoria] = useState(movimiento?.categoria)
  const [fondoId, setFondoId] = useState(movimiento?.fondoId)

  if (!movimiento) return <Navigate to="/movimientos" replace />
  if (!movimiento.activo) return <Navigate to={`/movimientos/${movimiento.id}`} replace />

  const esIngreso = movimiento.tipo === 'ingreso'
  const signo = esIngreso ? '+' : '-'
  // Fondos activos, mas el del movimiento aunque ya este inactivo.
  const fondos = listarFondos().filter((fondo) => fondo.activo || fondo.id === movimiento.fondoId)
  const volverAlDetalle = () => navigate(`/movimientos/${movimiento.id}`)

  function enviar(evento) {
    evento.preventDefault()
    const formulario = evento.target
    const campoMonto = formulario.elements.monto
    const monto = leerPesos(campoMonto.value)
    // Sin aviso-saldo en el diseño de editar: se usa el aviso nativo del campo.
    // Cubre gastos que no alcanzan e ingresos que al bajar (o cambiar de
    // fondo) dejarian un fondo en negativo.
    const error = monto > 0 ? errorSaldo({ fondoId, tipo: movimiento.tipo, monto }, movimiento) : ''
    campoMonto.setCustomValidity(
      monto <= 0 ? 'El monto debe ser mayor a cero' : error ? `No se puede guardar: ${error}.` : '',
    )
    if (!formulario.reportValidity()) return
    const datos = new FormData(formulario)
    actualizarMovimiento(movimiento.id, {
      categoria,
      fondoId,
      monto,
      // Se cambia el dia y se conserva la hora original.
      fecha: `${datos.get('fecha')}${movimiento.fecha.slice(10)}`,
      descripcion: datos.get('descripcion').trim(),
    })
    volverAlDetalle()
  }

  return (
    <>
      <EncabezadoPagina titulo="Editar Movimiento" subtitulo="Actualiza los datos del movimiento" />
      <section className="banner-editar">
        <i className={`ph ${iconoCategoria(movimiento.tipo, movimiento.categoria)}`}></i>
        <div className="info-banner">
          <span>EDITANDO</span>
          <strong>{tituloMovimiento(movimiento)}</strong>
        </div>
        <div className="monto-banner">
          <span>Monto actual</span>
          <strong>{signo}{formatoPesos(movimiento.monto)}</strong>
        </div>
      </section>
      <form className="formulario-editar" onSubmit={enviar}>
        <div className="fila-monto-fecha">
          <div className="grupo-formulario">
            <label htmlFor="monto">MONTO</label>
            <div className="campo-monto">
              <span className="prefijo-monto">$</span>
              <input
                type="text"
                id="monto"
                name="monto"
                defaultValue={movimiento.monto.toLocaleString('es-CO')}
                inputMode="numeric"
                pattern={PATRON_PESOS}
                title="Solo números, por ejemplo 45000 o 45.000"
                required
                onInput={(evento) => evento.target.setCustomValidity('')}
              />
              <span className={`badge-tipo badge-${movimiento.tipo}`}>{esIngreso ? 'INGRESO' : 'GASTO'}</span>
            </div>
          </div>
          <div className="grupo-formulario">
            <label htmlFor="fecha">FECHA</label>
            <div className="campo-fecha">
              <input type="date" id="fecha" name="fecha" defaultValue={movimiento.fecha.slice(0, 10)} required />
              <span className="icono-calendario" onClick={(evento) => evento.currentTarget.previousElementSibling.showPicker()}>
                <i className="ph ph-calendar"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="fila-cat-fondo">
          <div className="grupo-formulario grupo-categorias">
            <label>CATEGORÍA</label>
            <div className="grid-categorias row">
              {CATEGORIAS_MOVIMIENTO[movimiento.tipo].map((opcion) => (
                <div key={opcion.nombre} className="col-12 col-md-6">
                  <BotonCategoria categoria={opcion} elegida={opcion.nombre === categoria} onElegir={setCategoria} />
                </div>
              ))}
            </div>
          </div>
          <div className="grupo-formulario grupo-fondos">
            <label>FONDO</label>
            <div className="lista-fondos">
              {fondos.map((fondo) => (
                <BotonFondo key={fondo.id} fondo={fondo} elegido={fondo.id === fondoId} onElegir={setFondoId} />
              ))}
            </div>
          </div>
        </div>
        <div className="grupo-formulario grupo-descripcion">
          <label htmlFor="descripcion">DESCRIPCIÓN</label>
          <textarea id="descripcion" name="descripcion" defaultValue={movimiento.descripcion}></textarea>
        </div>
        <div className="acciones-editar">
          <button type="button" className="boton-cancelar" onClick={volverAlDetalle}>Cancelar</button>
          <button type="submit" className="boton-guardar"><i className="ph ph-floppy-disk"></i> Guardar Cambios</button>
        </div>
      </form>
    </>
  )
}
