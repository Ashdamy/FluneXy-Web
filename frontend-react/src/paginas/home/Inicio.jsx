import { Link, useNavigate } from 'react-router-dom'
import { valorTotalActivos } from '../../datos/activos.js'
import { listarAlertas } from '../../datos/alertas.js'
import { mesActual } from '../../datos/flujoCaja.js'
import { iconoCategoria, listarMovimientos, tituloMovimiento } from '../../datos/movimientos.js'
import { indiceEndeudamiento, totalPasivos } from '../../datos/pasivos.js'
import { obtenerUsuario } from '../../datos/usuario.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { diaISO, formatoFecha, formatoHora } from '../../utilidades/fecha.js'
import { formatoCorto, formatoPesos } from '../../utilidades/moneda.js'

const ACCESOS = [
  ['/flujo-caja', 'icono-flujo', 'ph-currency-circle-dollar', 'Flujo de caja', 'Ingresos y egresos'],
  ['/balance-financiero', 'icono-balance', 'ph-chart-bar', 'Balance', 'Ver resumen'],
  ['/metas', 'icono-metas', 'ph-target', 'Metas', 'Tus objetivos'],
  ['/reportes/generar', 'icono-reportes', 'ph-clipboard-text', 'Reportes', 'Historial'],
]

// "Hoy, 10:30 am" o "7 May 2025" como en la lista del prototipo.
const cuando = (fecha) => (fecha.slice(0, 10) === diaISO() ? `Hoy, ${formatoHora(fecha)}` : formatoFecha(fecha))

export default function Inicio() {
  useClaseBody('mod-home')
  useTituloPagina('Inicio')
  const navigate = useNavigate()
  const usuario = obtenerUsuario()

  // Patrimonio = activos - pasivos, igual que el Balance (RN13.4.1).
  const patrimonio = valorTotalActivos() - totalPasivos()
  // Movimientos activos registrados este mes (RN05.4.5).
  const movimientos = listarMovimientos().filter((m) => m.activo)
  const delMes = movimientos.filter((m) => m.fecha.slice(0, 7) === mesActual())
  const ingresos = delMes.filter((m) => m.tipo === 'ingreso').reduce((t, m) => t + m.monto, 0)
  const gastos = delMes.filter((m) => m.tipo === 'gasto').reduce((t, m) => t + m.monto, 0)
  const ahorro = ingresos - gastos
  const endeudamiento = indiceEndeudamiento().porcentaje
  const alertaDeuda = listarAlertas().find((a) => a.tipo === 'endeudamiento' && a.activo)

  return (
    <>
      {/* Inicio tiene su propio encabezado (saludo y punto de notificacion), distinto de EncabezadoPagina. */}
      <div className="encabezado-contenido">
        <div className="saludo">
          <h1>Hola, {usuario.nombre}</h1>
          <p>Así van tus finanzas hoy</p>
        </div>
        <div className="acciones-usuario">
          <button type="button" className="boton-notificacion" aria-label="Notificaciones" onClick={() => navigate('/alertas')}>
            <i className="ph ph-bell"></i>
            <span className="punto-notificacion"></span>
          </button>
          <button type="button" className="boton-perfil" aria-label="Perfil" onClick={() => navigate('/usuario')}>A</button>
        </div>
      </div>
      <section className="tarjeta-patrimonio">
        <div className="patrimonio-header">
          <span className="etiqueta-patrimonio">PATRIMONIO TOTAL</span>
          <div className="valor-patrimonio">
            <h2>{formatoPesos(patrimonio)}</h2>
            <span className="moneda">COP</span>
          </div>
          {/* ponytail: variacion y grafico fijos del prototipo; la BD no guarda historial del patrimonio */}
          <span className="badge-positivo">▲ +2.4% hoy</span>
        </div>
        <div className="grafico-barras">
          <span className="barra"></span>
          <span className="barra"></span>
          <span className="barra activa"></span>
          <span className="barra"></span>
          <span className="barra alta"></span>
          <span className="barra"></span>
          <span className="barra alta"></span>
        </div>
        <hr className="divisor-patrimonio" />
        <div className="estadisticas-patrimonio">
          <div className="estadistica">
            <span className="etiqueta">Ingresos</span>
            <strong className="positivo">+{formatoCorto(ingresos)}</strong>
          </div>
          <div className="estadistica">
            <span className="etiqueta">Gastos</span>
            <strong className="negativo">-{formatoCorto(gastos)}</strong>
          </div>
          <div className="estadistica">
            <span className="etiqueta">Ahorro</span>
            <strong className="info">{formatoCorto(ahorro)}</strong>
          </div>
        </div>
      </section>
      <section className="seccion-accesos">
        <h3>Accesos rápidos</h3>
        <div className="grid-accesos row">
          {ACCESOS.map(([ruta, clase, icono, titulo, texto]) => (
            <div key={ruta} className="col-12 col-sm-6 col-lg-3">
              <Link to={ruta} className="tarjeta-acceso h-100">
                <div className={`icono-acceso ${clase}`}><span><i className={`ph ${icono}`}></i></span></div>
                <h4>{titulo}</h4>
                <p>{texto}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="seccion-resumen">
        <h3>Resumen financiero</h3>
        {/* ponytail: las variaciones (+12%...) y el largo de las barras son fijos del prototipo; no hay historial para compararlas */}
        <div className="grid-resumen row">
          {[
            ['Ingresos del mes', ingresos, 'badge-positivo', '+12%', 'ingresos', 90],
            ['Gastos del mes', gastos, 'badge-negativo', '+5%', 'gastos', 58],
            ['Deuda activa', totalPasivos(), 'badge-advertencia', `${Math.round(endeudamiento)}%`, 'deuda', 40],
            ['Ahorro neto', ahorro, 'badge-info', '+8%', 'ahorro', 70],
          ].map(([etiqueta, valor, badge, texto, relleno, ancho]) => (
            <div key={etiqueta} className="col-12 col-sm-6 col-lg-3">
              <div className="tarjeta-resumen-home h-100">
                <span className="etiqueta">{etiqueta}</span>
                <div className="valor-resumen-home">
                  <strong>{formatoPesos(valor)}</strong>
                  <span className={badge}>{texto}</span>
                </div>
                <div className="barra-progreso">
                  <span className={`relleno ${relleno}`} style={{ width: `${ancho}px` }}></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="seccion-movimientos">
        <h3>Movimientos recientes</h3>
        {movimientos.slice(0, 3).map((m) => (
          <article key={m.id} className="item-movimiento-home">
            <div className={`icono-movimiento icono-${m.tipo}`}><span><i className={`ph ${iconoCategoria(m.tipo, m.categoria)}`}></i></span></div>
            <div className="detalle-movimiento">
              <h4>{tituloMovimiento(m)}</h4>
              <p>{cuando(m.fecha)}</p>
            </div>
            <div className="valor-movimiento">
              <strong className={m.tipo === 'ingreso' ? 'positivo' : 'negativo'}>{m.tipo === 'ingreso' ? '+' : '-'}{formatoPesos(m.monto)}</strong>
              <p>{m.categoria}</p>
            </div>
          </article>
        ))}
      </section>
      {/* Aviso de la alerta de endeudamiento activa (MOD15), con el valor actual. */}
      {alertaDeuda && (
        <aside className="alerta-endeudamiento">
          <div className="icono-alerta"><span><i className="ph ph-warning"></i></span></div>
          <div className="contenido-alerta">
            <h4>Alerta de endeudamiento</h4>
            <p>Tu índice es {endeudamiento.toFixed(1)}%, cerca del umbral de riesgo ({alertaDeuda.umbral}%).</p>
            {/* ponytail: sin accion, como en el prototipo */}
            <button type="button" className="boton-texto">Ver análisis completo</button>
          </div>
        </aside>
      )}
      <button type="button" className="fab-asistente" aria-label="Asistente" onClick={() => navigate('/asistente')}><i className="ph ph-chat-circle"></i></button>
    </>
  )
}
