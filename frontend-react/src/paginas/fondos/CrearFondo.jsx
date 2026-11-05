import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { crearFondo, listarFondos } from '../../datos/fondos.js'
import { registrarMovimientoDeFondo } from '../../datos/movimientos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { leerPesos, PATRON_PESOS } from '../../utilidades/moneda.js'
import { nombreRepetido } from '../../utilidades/validacion.js'
import SelectorTipoFondo from './SelectorTipoFondo.jsx'

export default function CrearFondo() {
  useClaseBody('mod-fondo-form mod-fondo-crear')
  useTituloPagina('Crear Fondo')
  const navigate = useNavigate()
  // El tipo no es un <input>, asi que su valor vive en el estado.
  const [tipo, setTipo] = useState('banco')

  function enviar(evento) {
    evento.preventDefault()
    const campoNombre = evento.target.elements.nombre
    campoNombre.setCustomValidity(nombreRepetido(listarFondos(), campoNombre.value) ? 'Ya tienes un fondo con este nombre' : '')
    if (!evento.target.reportValidity()) return
    const datos = new FormData(evento.target)
    const fondo = crearFondo({
      nombre: datos.get('nombre').trim(),
      tipo,
      saldo: leerPesos(datos.get('saldo')),
    })
    registrarMovimientoDeFondo(fondo.id, fondo.saldo, 'Saldo inicial')
    navigate('/fondos')
  }

  return (
    <>
      <EncabezadoPagina titulo="Nuevo Fondo" subtitulo="Registra una nueva cuenta o billetera" />
      {/* El prototipo no tenia <form>; se agrega para tener validacion nativa y Enter para enviar.
          noValidate: la validacion se hace solo en enviar(). */}
      <form noValidate onSubmit={enviar}>
        <p className="seccion-label">INFORMACIÓN BÁSICA</p>
        <section className="fila-campos">
          <div className="grupo-campo col-nombre">
            <label htmlFor="nombre-fondo">Nombre del Fondo</label>
            <input type="text" id="nombre-fondo" name="nombre" placeholder="Nequi Personal" required />
            <small>Escoge un nombre que identifique este fondo</small>
          </div>
          <div className="grupo-campo">
            <label>Tipo de Fondo</label>
            <SelectorTipoFondo valor={tipo} onCambiar={setTipo} />
          </div>
        </section>
        <section className="grupo-campo col-nombre campo-saldo">
          <label htmlFor="saldo-inicial">Saldo Inicial</label>
          <div className="campo-monto">
            <span className="prefijo-monto">$</span>
            <input
              type="text"
              id="saldo-inicial"
              name="saldo"
              placeholder="0"
              inputMode="numeric"
              pattern={PATRON_PESOS}
              title="Solo números, por ejemplo 150000 o 150.000"
            />
          </div>
          <small>Se registrará como tu movimiento inicial "Saldo inicial"</small>
        </section>
        <section className="acciones-formulario">
          <button type="button" className="btn-cancelar" onClick={() => navigate('/fondos')}>Cancelar</button>
          <button type="submit" className="btn-guardar"><i className="ph ph-floppy-disk"></i>Crear Fondo</button>
        </section>
      </form>
    </>
  )
}
