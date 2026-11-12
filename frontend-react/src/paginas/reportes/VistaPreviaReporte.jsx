import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { valorTotalActivos } from '../../datos/activos.js'
import { flujoDelMes } from '../../datos/flujoCaja.js'
import { indiceEndeudamiento, totalPasivos } from '../../datos/pasivos.js'
import { obtenerReporte, textoPeriodo, TIPOS_REPORTE } from '../../datos/reportes.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoFecha } from '../../utilidades/fecha.js'
import { formatoPesos } from '../../utilidades/moneda.js'

// Una seccion con titulo y lineas "nombre · valor" (vp-doc-fila del prototipo).
function Fila({ titulo, lineas }) {
  return (
    <section className="vp-doc-fila">
      <span className="vp-doc-label">{titulo}</span>
      {lineas.map(([nombre, valor, color]) => (
        <div key={nombre} className="vp-doc-linea"><span>{nombre}</span><strong className={color}>{valor}</strong></div>
      ))}
    </section>
  )
}

// Contenido de cada tipo. Solo el Balance esta diseñado en el prototipo; Flujo
// e Indicadores usan las mismas piezas (pendiente de diseño). Los valores salen
// de los mismos calculos de sus pantallas (RN16.7.1 y RN16.7.4).
function contenido(tipo) {
  const endeudamiento = `${indiceEndeudamiento().porcentaje.toFixed(1)}%`
  if (tipo === 'FLUJOCAJA') {
    const f = flujoDelMes()
    return {
      resumen: ['Saldo Proyectado', formatoPesos(f.saldo)],
      filas: [
        ['INGRESOS', [['Ingresos Estimados', formatoPesos(f.ingresos), 'verde']]],
        ['EGRESOS', [['Gastos Estimados', formatoPesos(f.gastos), 'rojo'], ['Cuotas de Deuda', formatoPesos(f.cuotasDeuda), 'rojo'], ['Ahorro de Metas', formatoPesos(f.ahorroMetas), 'rojo']]],
      ],
    }
  }
  if (tipo === 'INDICADORES') {
    // ponytail: valores fijos del prototipo salvo el endeudamiento (conflictos 21 y 24)
    return {
      resumen: ['Índice de Salud Financiera', '82 / 100'],
      filas: [['INDICADORES', [['Liquidez', '1.6x'], ['Endeudamiento', endeudamiento], ['Ahorro Mensual', '33%'], ['Cobertura de Deuda', 'N/A']]]],
    }
  }
  const activos = valorTotalActivos()
  const pasivos = totalPasivos()
  return {
    resumen: ['Patrimonio Neto', formatoPesos(activos - pasivos)],
    filas: [
      ['ACTIVOS', [['Total Activos', formatoPesos(activos), 'verde']]],
      ['PASIVOS', [['Total Pasivos', formatoPesos(pasivos), 'rojo']]],
      ['INDICADORES', [['Liquidez', '1.6x'], ['Endeudamiento', endeudamiento]]],
    ],
  }
}

export default function VistaPreviaReporte() {
  useClaseBody('mod-reportes')
  useTituloPagina('Vista Previa del Reporte')
  const [parametros] = useSearchParams()
  const reporte = obtenerReporte(parametros.get('id'))
  if (!reporte) return <Navigate to="/reportes/generar" replace />

  const tipo = TIPOS_REPORTE[reporte.tipo]
  const periodo = textoPeriodo(reporte.periodo)
  const { resumen, filas } = contenido(reporte.tipo)
  return (
    <>
      {/* Esta pagina no usa EncabezadoPagina: en el prototipo su encabezado
          cambia los botones de notificaciones y perfil por los de exportar. */}
      <header className="encabezado-pagina vp-encabezado">
        <div className="titulo-pagina">
          <h1>Vista Previa del Reporte</h1>
          <p>
            <Link to="/reportes/generar" className="vp-volver"><i className="ph ph-arrow-left"></i> Volver a Generar Reporte</Link>
            <span className="vp-meta-periodo">{tipo.nombre} · {periodo}</span>
          </p>
        </div>
        {/* ponytail: exportar a Excel y PDF (RN16.4, RN16.5) queda para el backend; botones decorativos como en el prototipo */}
        <div className="vp-acciones-header">
          <button type="button" className="vp-boton-excel"><i className="ph ph-microsoft-excel-logo"></i> Exportar Excel</button>
          <button type="button" className="vp-boton-pdf"><i className="ph ph-download-simple"></i> Descargar PDF</button>
        </div>
      </header>
      <div className="vp-documento-wrap">
        <article className="vp-documento">
          <header className="vp-doc-header">
            <strong className="vp-doc-marca">FluneXy</strong>
            <span className="vp-doc-fecha">Generado el {formatoFecha(reporte.fechaGeneracion)}</span>
          </header>
          <h2 className="vp-doc-titulo">{tipo.nombre}</h2>
          <p className="vp-doc-periodo">Periodo: {periodo}</p>
          <hr className="vp-doc-divider" />
          <section className="vp-doc-seccion">
            <span className="vp-doc-label">RESUMEN</span>
            <p className="vp-doc-sublabel">{resumen[0]}</p>
            <strong className="vp-doc-valor-grande">{resumen[1]}</strong>
          </section>
          {filas.map(([titulo, lineas]) => <Fila key={titulo} titulo={titulo} lineas={lineas} />)}
          <footer className="vp-doc-footer">
            <span>Generado por FluneXy</span>
            <span>Página 1 de 1</span>
          </footer>
        </article>
      </div>
    </>
  )
}
