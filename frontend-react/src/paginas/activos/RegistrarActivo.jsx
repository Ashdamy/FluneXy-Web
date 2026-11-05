import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { categoriaActivo, crearActivo, listarActivos } from '../../datos/activos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { diaISO, formatoFecha } from '../../utilidades/fecha.js'
import { formatoPesos, leerPesos, PATRON_PESOS } from '../../utilidades/moneda.js'
import { nombreRepetido } from '../../utilidades/validacion.js'
import CampoFecha from '../../componentes/CampoFecha.jsx'
import { SelectorCategoriaActivo } from './CamposActivo.jsx'

export default function RegistrarActivo() {
  useClaseBody('mod-activo-form mod-activo-crear')
  useTituloPagina('Registrar Activo')
  const navigate = useNavigate()
  // Campos controlados: la vista previa de la derecha se actualiza mientras se escribe.
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('Inversión')
  const [valor, setValor] = useState('')
  const [fecha, setFecha] = useState(() => diaISO())

  function enviar(evento) {
    evento.preventDefault()
    const campoValor = evento.target.elements.valor
    // La BD exige valor > 0 (ck_valor_activo).
    campoValor.setCustomValidity(leerPesos(valor) > 0 ? '' : 'El valor debe ser mayor a cero')
    evento.target.elements.nombre.setCustomValidity(nombreRepetido(listarActivos(), nombre) ? 'Ya tienes un activo con este nombre' : '')
    if (!evento.target.reportValidity()) return
    crearActivo({
      nombre: nombre.trim(),
      categoria,
      valor: leerPesos(valor),
      fechaRegistro: diaISO(),
      fechaActualizacion: fecha,
    })
    navigate('/activos')
  }

  return (
    <>
      <EncabezadoPagina titulo="Registrar Activo" subtitulo="Agrega un bien a tu patrimonio personal" />
      {/* noValidate: la validacion se hace solo en enviar(). */}
      <form noValidate onSubmit={enviar}>
        <section className="activo-form-layout">
          <div className="activo-form-col">
            <section className="grupo-campo campo-nombre">
              <label htmlFor="nombre">Nombre del Activo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Portafolio de Inversiones"
                maxLength={100}
                required
                value={nombre}
                onChange={(evento) => setNombre(evento.target.value)}
              />
              <small>Escoge un nombre que identifique claramente este bien</small>
            </section>
            <section className="grupo-campo campo-categoria">
              <label>Categoría</label>
              <SelectorCategoriaActivo valor={categoria} onCambiar={setCategoria} />
            </section>
            <section className="grupo-campo campo-valor">
              <label htmlFor="valor">Valor del Activo</label>
              <div className="campo-monto">
                <span className="prefijo-monto">$</span>
                <input
                  type="text"
                  id="valor"
                  name="valor"
                  placeholder="180.000.000"
                  inputMode="numeric"
                  pattern={PATRON_PESOS}
                  title="Solo números, por ejemplo 180000000 o 180.000.000"
                  required
                  value={valor}
                  onChange={(evento) => {
                    evento.target.setCustomValidity('')
                    setValor(evento.target.value)
                  }}
                />
                <span className="badge-campo">ACTIVO</span>
              </div>
              <small>Ingresa el valor estimado actual en pesos colombianos (COP)</small>
            </section>
            <section className="grupo-campo campo-fecha-activo">
              <label htmlFor="fecha">Fecha de Actualización</label>
              <CampoFecha clase="campo-fecha-activo-input" valor={fecha} onCambiar={setFecha} max={diaISO()} />
              <small>Fecha en la que se verificó o estimó este valor</small>
            </section>
          </div>
          <aside className="activo-panel-previa">
            <div className="activo-previa-header">
              <h2>VISTA PREVIA</h2>
            </div>
            <div className="activo-previa-contenido">
              <span className="activo-previa-icono"><i className={`ph ${categoriaActivo(categoria).icono}`}></i></span>
              <h3>{nombre.trim() || 'Nombre del activo'}</h3>
              <span className="activo-previa-subtipo">{categoria.toUpperCase()} · ACTIVO</span>
              <hr className="activo-previa-divider" />
              <span className="activo-previa-label">Valor actual</span>
              <strong className="activo-previa-monto">{formatoPesos(leerPesos(valor))}</strong>
              <span className="activo-previa-label">Fecha de actualización</span>
              <span className="activo-previa-fecha">{fecha ? formatoFecha(fecha) : '—'}</span>
              <span className="activo-previa-badge">Activo</span>
            </div>
            <div className="activo-previa-pie">
              <p>Este bien se sumará al Valor Total de Activos y al Patrimonio Neto.</p>
            </div>
          </aside>
        </section>
        <section className="acciones-formulario">
          <button type="button" className="btn-cancelar" onClick={() => navigate('/activos')}>Cancelar</button>
          <button type="submit" className="btn-guardar"><i className="ph ph-diamond"></i>Guardar Activo</button>
        </section>
      </form>
    </>
  )
}
