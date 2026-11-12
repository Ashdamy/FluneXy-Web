import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { mesActual, nombreMes } from '../../datos/flujoCaja.js'
import { generarReporte, TIPOS_REPORTE } from '../../datos/reportes.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { diaISO, formatoFecha } from '../../utilidades/fecha.js'

export default function GenerarReporte() {
  useClaseBody('mod-reportes')
  useTituloPagina('Generar Reporte')
  const navigate = useNavigate()
  // "Generar este reporte de nuevo" llega con ?tipo=BALANCE&formato=PDF.
  const [parametros] = useSearchParams()
  const [tipo, setTipo] = useState(TIPOS_REPORTE[parametros.get('tipo')] ? parametros.get('tipo') : 'BALANCE')
  const [formato, setFormato] = useState(parametros.get('formato') === 'EXCEL' ? 'EXCEL' : 'PDF')
  const elegido = TIPOS_REPORTE[tipo]

  function generar() {
    // RN16.2.4 y RN16.3.3: con el tipo y el periodo elegidos. ponytail: el periodo es el mes actual.
    const reporte = generarReporte({ tipo, formato })
    navigate(`/reportes/vista-previa?id=${reporte.id}`)
  }

  return (
    <>
      <EncabezadoPagina titulo="Generar Reporte" subtitulo="Selecciona el tipo y periodo del reporte" />
      <div className="rep-dashboard">
        <div className="rep-columna-form">
          <p className="rep-etiqueta">Tipo de Reporte</p>
          {/* ponytail: muestra el tipo elegido abajo; el desplegable del prototipo no tiene diseño de menu */}
          <button type="button" className="rep-selector rep-selector-activo">
            <span className="rep-selector-icono"><i className={`ph ${elegido.icono}`}></i></span>
            {elegido.nombre}
            <span className="rep-selector-flecha"><i className="ph ph-caret-down"></i></span>
          </button>
          <p className="rep-ayuda">Elige qué información quieres analizar</p>
          <p className="rep-etiqueta">Periodo del Reporte</p>
          {/* ponytail: periodo decorativo como en el prototipo; siempre el mes actual */}
          <button type="button" className="rep-periodo">
            <span className="rep-periodo-icono"><i className="ph ph-calendar-blank"></i></span>
            <span className="rep-periodo-valor">{nombreMes(mesActual())}</span>
            <span className="rep-badge">META</span>
          </button>
          <p className="rep-ayuda">Selecciona el rango de tiempo a revisar</p>
          <p className="rep-etiqueta">Formato de Exportación</p>
          {/* rep-chip-pdf es el estilo de "elegido" del prototipo; se le pone al formato seleccionado. */}
          <div className="rep-formato">
            <button type="button" className={formato === 'PDF' ? 'rep-chip rep-chip-pdf' : 'rep-chip'} aria-pressed={formato === 'PDF'} onClick={() => setFormato('PDF')}>
              <i className="ph ph-file-pdf"></i> PDF
            </button>
            <button type="button" className={formato === 'EXCEL' ? 'rep-chip rep-chip-pdf' : 'rep-chip'} aria-pressed={formato === 'EXCEL'} onClick={() => setFormato('EXCEL')}>
              <i className="ph ph-microsoft-excel-logo"></i> Excel
            </button>
          </div>
          <p className="rep-ayuda">Elige PDF o Excel para exportar</p>
          <p className="rep-etiqueta">Otros Tipos Disponibles</p>
          {/* RN16.2.2: solo los tipos definidos. */}
          <div className="rep-otros">
            {Object.entries(TIPOS_REPORTE).map(([clave, t]) => (
              <button
                key={clave}
                type="button"
                className={clave === tipo ? 'rep-fila rep-fila-seleccionada' : 'rep-fila'}
                aria-pressed={clave === tipo}
                onClick={() => setTipo(clave)}
              >
                <span className="rep-fila-icono"><i className={`ph ${t.icono}`}></i></span>
                <span className="rep-fila-texto">
                  <strong>{t.nombre}</strong>
                  <small>{clave === tipo ? 'Seleccionado' : 'Disponible'}</small>
                </span>
                {clave === tipo && <span className="rep-check"><i className="ph ph-check"></i></span>}
              </button>
            ))}
          </div>
        </div>
        <aside className="rep-columna-vista">
          <p className="rep-vista-titulo">Vista Previa Rápida</p>
          <div className="rep-vista-tarjeta">
            <span className="rep-vista-icono"><i className="ph ph-file-text"></i></span>
            <p className="rep-vista-etiqueta">Fecha de Generación</p>
            <strong className="rep-vista-fecha">{formatoFecha(diaISO())}</strong>
            <small className="rep-vista-nota">La información se actualizará al generar el reporte</small>
          </div>
        </aside>
      </div>
      <section className="rep-acciones">
        <button type="button" className="rep-boton-generar" onClick={generar}>
          <i className="ph ph-download"></i> Generar Reporte
        </button>
      </section>
    </>
  )
}
