import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { actualizarAlerta, crearAlerta, errorUmbral, obtenerAlerta, TIPOS_ALERTA } from '../../datos/alertas.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'

const leerNumero = (texto) => Number(String(texto).replace(/\./g, '').replace(',', '.'))

// /alertas/nueva (configurar-alerta.html) y /alertas/:id/editar (editar-alerta.html):
// el mismo formulario; cambian el titulo y los botones de abajo.
export function NuevaAlerta() {
  useClaseBody('mod-alertas mod-alertas-configurar')
  useTituloPagina('Configurar Alerta')
  return <Formulario />
}

export function EditarAlerta() {
  useClaseBody('mod-alertas mod-alertas-configurar')
  useTituloPagina('Editar Alerta')
  const alerta = obtenerAlerta(useParams().id)
  if (!alerta) return <Navigate to="/alertas" replace />
  // Como en los demas modulos, una inactiva no se edita (conflicto 26).
  if (!alerta.activo) return <Navigate to={`/alertas/${alerta.id}`} replace />
  return <Formulario alerta={alerta} />
}

function Formulario({ alerta }) {
  const navigate = useNavigate()
  const [tipo, setTipo] = useState(alerta?.tipo ?? 'endeudamiento')
  const [umbral, setUmbral] = useState(alerta ? String(alerta.umbral) : '35')
  const [activa, setActiva] = useState(alerta?.activo ?? true)
  const info = TIPOS_ALERTA[tipo]
  const valor = leerNumero(umbral)
  const unidadEtiqueta = info.unidad === '%' ? '(%)' : info.unidad === 'x' ? '(veces)' : '($)'

  function enviar(evento) {
    evento.preventDefault()
    const campo = evento.target.elements.umbral
    // RN15.2.1: tipo de los definidos. RN15.3.1-2: umbral numerico valido.
    campo.setCustomValidity(errorUmbral(tipo, valor))
    if (!evento.target.reportValidity()) return
    const datos = { tipo, umbral: valor, activo: activa }
    if (alerta) {
      actualizarAlerta(alerta.id, datos)
      navigate(`/alertas/${alerta.id}`)
    } else {
      crearAlerta(datos)
      navigate('/alertas')
    }
  }

  return (
    <>
      <EncabezadoPagina
        titulo={alerta ? 'Editar Alerta' : 'Nueva Alerta'}
        subtitulo={alerta ? 'Actualiza la configuración de esta alerta' : 'Define cuándo quieres recibir un aviso'}
      />
      <form noValidate onSubmit={enviar}>
        <div className="alerta-config-layout">
          <div className="alerta-config-form">
            <p className="campo-label">TIPO DE ALERTA</p>
            {/* ponytail: muestra el tipo elegido abajo; el desplegable del prototipo no tiene diseño de menu */}
            <div className="alerta-input">
              <span><i className={`ph ${info.icono}`}></i></span>
              {info.nombre}
              <i className="ph ph-caret-down" style={{ marginLeft: 'auto' }}></i>
            </div>
            <p className="campo-ayuda">Elige qué aspecto financiero quieres monitorear</p>
            <p className="campo-label">UMBRAL DE ALERTA {unidadEtiqueta}</p>
            <div className="alerta-input alerta-input-monto">
              <span className="simbolo">{info.simbolo}</span>
              <span className="valor">
                <input
                  type="text"
                  name="umbral"
                  aria-label="Umbral de alerta"
                  inputMode="decimal"
                  required
                  value={umbral}
                  onChange={(evento) => {
                    evento.target.setCustomValidity('')
                    setUmbral(evento.target.value)
                  }}
                />
              </span>
              <span className="badge-meta">META</span>
            </div>
            <p className="campo-ayuda">El sistema notificará al superar este umbral</p>
            <p className="campo-label">ESTADO DE LA ALERTA</p>
            {/* RN15.4.3: activa o inactiva. ponytail: el prototipo solo diseña el estado ON */}
            <div
              className="alerta-input alerta-input-toggle"
              role="switch"
              aria-checked={activa}
              tabIndex={0}
              onClick={() => setActiva(!activa)}
              onKeyDown={(evento) => (evento.key === ' ' || evento.key === 'Enter') && (evento.preventDefault(), setActiva(!activa))}
            >
              <span className="punto-on"></span>
              {activa ? 'ON · Notificaciones Activas' : 'OFF · Notificaciones Inactivas'}
            </div>
            <p className="campo-ayuda">Actívala para empezar a recibir notificaciones</p>
            <p className="campo-label">TIPO DE INDICADOR A MONITOREAR</p>
            <div className="fund-row row">
              {Object.entries(TIPOS_ALERTA).map(([clave, t]) => (
                <div key={clave} className="col-12 col-md-4">
                  <div
                    className={clave === tipo ? 'fund-card seleccionada' : 'fund-card'}
                    role="button"
                    tabIndex={0}
                    aria-pressed={clave === tipo}
                    onClick={() => setTipo(clave)}
                    onKeyDown={(evento) => (evento.key === ' ' || evento.key === 'Enter') && (evento.preventDefault(), setTipo(clave))}
                  >
                    <strong>{t.nombre}</strong>
                    <span>{clave === tipo ? 'Seleccionado' : 'Monitorear'}</span>
                    {clave === tipo && <span className="check"><i className="ph ph-check"></i></span>}
                  </div>
                </div>
              ))}
            </div>
            <p className="campo-ayuda">Selecciona el aspecto financiero a monitorear</p>
          </div>
          <div className="alerta-config-extra">
            <div className="calc-card">
              <div className="calc-icono"><i className="ph ph-bell"></i></div>
              <span className="calc-vista">VISTA PREVIA</span>
              <span className="calc-ayuda">Se activará cuando</span>
              <strong className="calc-monto">{info.nombre} {info.simbolo} {valor > 0 ? info.formato(valor) : '—'}</strong>
              <span className="calc-texto">Recibirás una notificación push al superar el umbral</span>
            </div>
            <div className="info-chips">
              <span className="info-chip indigo">{activa ? 'Activa' : 'Inactiva'}</span>
              {/* ponytail: chips fijos del prototipo */}
              <span className="info-chip rojo">Riesgo alto</span>
              <span className="info-chip violeta">Tiempo real</span>
            </div>
          </div>
        </div>
        {alerta ? (
          <div className="acciones-formulario">
            <button type="button" className="btn-cancelar" onClick={() => navigate(`/alertas/${alerta.id}`)}>Cancelar</button>
            <button type="submit" className="btn-guardar-alerta">Guardar Alerta</button>
          </div>
        ) : (
          <button type="submit" className="btn-guardar-alerta">Guardar Alerta</button>
        )}
      </form>
    </>
  )
}
