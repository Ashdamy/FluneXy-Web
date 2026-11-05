import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { actualizarActivo, categoriaActivo, listarActivos, obtenerActivo, participacionActivo } from '../../datos/activos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { diaISO, formatoFecha } from '../../utilidades/fecha.js'
import { formatoPesos, leerPesos, PATRON_PESOS } from '../../utilidades/moneda.js'
import { nombreRepetido } from '../../utilidades/validacion.js'
import CampoFecha from '../../componentes/CampoFecha.jsx'
import { SelectorCategoriaActivo } from './CamposActivo.jsx'

export default function EditarActivo() {
  useClaseBody('mod-activo-form mod-activo-editar')
  useTituloPagina('Editar Activo')
  const navigate = useNavigate()
  const { id } = useParams()
  const activo = obtenerActivo(id)
  const [categoria, setCategoria] = useState(activo?.categoria)
  const [fecha, setFecha] = useState(activo?.fechaActualizacion)

  if (!activo) return <Navigate to="/activos" replace />
  if (!activo.activo) return <Navigate to={`/activos/${activo.id}`} replace />
  const icono = categoriaActivo(activo.categoria).icono

  function enviar(evento) {
    evento.preventDefault()
    const formulario = evento.target
    const campoValor = formulario.elements.valor
    const campoNombre = formulario.elements.nombre
    campoValor.setCustomValidity(leerPesos(campoValor.value) > 0 ? '' : 'El valor debe ser mayor a cero')
    campoNombre.setCustomValidity(nombreRepetido(listarActivos(), campoNombre.value, activo.id) ? 'Ya tienes un activo con este nombre' : '')
    if (!formulario.reportValidity()) return
    actualizarActivo(activo.id, {
      nombre: formulario.elements.nombre.value.trim(),
      categoria,
      valor: leerPesos(campoValor.value),
      fechaActualizacion: fecha,
    })
    navigate('/activos')
  }

  return (
    <>
      <EncabezadoPagina titulo="Editar Activo" subtitulo="Actualiza la información de tu bien" />
      {/* noValidate: la validacion se hace solo en enviar(). */}
      <form noValidate onSubmit={enviar}>
        <section className="activo-form-layout">
          <div className="activo-form-col">
            <section className="franja-edicion">
              <div className="icono-franja"><i className={`ph ${icono}`}></i></div>
              <div className="info-franja">
                <span className="etiqueta-franja">Editando</span>
                <strong className="nombre-franja">{activo.nombre}</strong>
              </div>
              <div className="saldo-franja">
                <span className="label-saldo-franja">Valor actual</span>
                <strong className="monto-saldo-franja">{formatoPesos(activo.valor)}</strong>
              </div>
            </section>
            <section className="grupo-campo campo-nombre">
              <label htmlFor="nombre">NOMBRE DEL ACTIVO</label>
              <input type="text" id="nombre" name="nombre" defaultValue={activo.nombre} maxLength={100} required />
            </section>
            <section className="grupo-campo campo-categoria">
              <label>CATEGORÍA</label>
              <SelectorCategoriaActivo valor={categoria} onCambiar={setCategoria} />
            </section>
            <section className="grupo-campo campo-valor">
              <label htmlFor="valor">VALOR DEL ACTIVO</label>
              <div className="campo-monto">
                <span className="prefijo-monto">$</span>
                <input
                  type="text"
                  id="valor"
                  name="valor"
                  defaultValue={activo.valor.toLocaleString('es-CO')}
                  inputMode="numeric"
                  pattern={PATRON_PESOS}
                  title="Solo números, por ejemplo 180000000 o 180.000.000"
                  required
                  onInput={(evento) => evento.target.setCustomValidity('')}
                />
                <span className="badge-campo">ACTIVO</span>
              </div>
            </section>
            <section className="grupo-campo campo-fecha-activo">
              <label htmlFor="fecha">FECHA DE ACTUALIZACIÓN</label>
              <CampoFecha clase="campo-fecha-activo-input" valor={fecha} onCambiar={setFecha} max={diaISO()} />
            </section>
          </div>
          <aside className="activo-panel-previa">
            <div className="activo-previa-header">
              <h2>ESTADO ACTUAL</h2>
            </div>
            <div className="activo-previa-contenido">
              <div className="activo-previa-fila-icono">
                <span className="activo-previa-icono"><i className={`ph ${icono}`}></i></span>
                <div className="activo-previa-titular">
                  <h3>{activo.nombre}</h3>
                  <span className="activo-previa-subtipo">{activo.categoria} · Activo</span>
                </div>
              </div>
              <hr className="activo-previa-divider" />
              <span className="activo-previa-label">Registrado</span>
              <strong className="activo-previa-fecha">{formatoFecha(activo.fechaRegistro)}</strong>
              <span className="activo-previa-label">Participación en patrimonio</span>
              <strong className="activo-previa-monto">{participacionActivo(activo).porcentaje}% del total</strong>
            </div>
          </aside>
        </section>
        <section className="acciones-formulario">
          <button type="button" className="btn-cancelar" onClick={() => navigate('/activos')}>Cancelar</button>
          <button type="submit" className="btn-guardar"><i className="ph ph-floppy-disk"></i>Guardar Cambios</button>
        </section>
      </form>
    </>
  )
}
