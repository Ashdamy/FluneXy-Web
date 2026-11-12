import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { actualizarFondo, listarFondos, obtenerFondo, TIPOS_FONDO } from '../../datos/fondos.js'
import { registrarMovimientoDeFondo } from '../../datos/movimientos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoPesos, leerPesos, PATRON_PESOS, redondear } from '../../utilidades/moneda.js'
import { nombreRepetido } from '../../utilidades/validacion.js'
import SelectorTipoFondo from './SelectorTipoFondo.jsx'

export default function EditarFondo() {
  useClaseBody('mod-fondo-form mod-fondo-editar')
  useTituloPagina('Editar Fondo')
  const navigate = useNavigate()
  const { id } = useParams()
  const fondo = obtenerFondo(id)
  // El valor inicial del estado sale del fondo que se esta editando.
  const [tipo, setTipo] = useState(fondo?.tipo)

  // Un fondo inactivo tambien se puede editar (HU04.3 no pide que este activo).
  if (!fondo) return <Navigate to="/fondos" replace />

  function enviar(evento) {
    evento.preventDefault()
    const campoNombre = evento.target.elements.nombre
    campoNombre.setCustomValidity(nombreRepetido(listarFondos(), campoNombre.value, fondo.id) ? 'Ya tienes un fondo con este nombre' : '')
    if (!evento.target.reportValidity()) return
    const datos = new FormData(evento.target)
    const saldo = leerPesos(datos.get('saldo'))
    actualizarFondo(fondo.id, {
      nombre: datos.get('nombre').trim(),
      tipo,
      saldo,
    })
    registrarMovimientoDeFondo(fondo.id, redondear(saldo - fondo.saldo), 'Ajuste de saldo')
    navigate('/fondos')
  }

  return (
    <>
      <EncabezadoPagina titulo="Editar Fondo" subtitulo="Actualiza la información de tu cuenta" />
      <section className="franja-edicion">
        <div className="icono-franja"><i className={`ph ${TIPOS_FONDO[fondo.tipo].icono}`}></i></div>
        <div className="info-franja">
          <span className="etiqueta-franja">EDITANDO</span>
          <strong className="nombre-franja">{fondo.nombre}</strong>
        </div>
        <div className="saldo-franja">
          <span className="label-saldo-franja">Saldo actual</span>
          <strong className="monto-saldo-franja">{formatoPesos(fondo.saldo)}</strong>
        </div>
      </section>
      {/* defaultValue: el campo arranca con el dato actual y el usuario lo cambia libremente.
          noValidate: la validacion se hace solo en enviar(). */}
      <form noValidate onSubmit={enviar}>
        <p className="seccion-label">INFORMACIÓN DEL FONDO</p>
        <section className="fila-campos">
          <div className="grupo-campo">
            <label htmlFor="nombre-fondo">Nombre del Fondo</label>
            <input type="text" id="nombre-fondo" name="nombre" defaultValue={fondo.nombre} required />
          </div>
          <div className="grupo-campo">
            <label>Tipo de Fondo</label>
            <SelectorTipoFondo valor={tipo} onCambiar={setTipo} />
          </div>
        </section>
        <section className="grupo-campo campo-saldo">
          <label htmlFor="saldo">Saldo Actualizado</label>
          <div className="campo-monto">
            <span className="prefijo-monto">$</span>
            <input
              type="text"
              id="saldo"
              name="saldo"
              defaultValue={fondo.saldo.toLocaleString('es-CO')}
              inputMode="numeric"
              pattern={PATRON_PESOS}
              title="Solo números, por ejemplo 150000 o 150.000"
              required
            />
          </div>
        </section>
        <section className="acciones-formulario">
          <button type="button" className="btn-cancelar" onClick={() => navigate('/fondos')}>Cancelar</button>
          <button type="submit" className="btn-guardar"><i className="ph ph-floppy-disk"></i>Guardar Cambios</button>
        </section>
      </form>
    </>
  )
}
