import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { valorTotalActivos } from '../../datos/activos.js'
import { indiceEndeudamiento, totalPasivos } from '../../datos/pasivos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoFecha, diaISO } from '../../utilidades/fecha.js'
import { formatoPesos } from '../../utilidades/moneda.js'

export default function BalanceFinanciero() {
  useClaseBody('mod-balance')
  useTituloPagina('Balance Financiero')
  const navigate = useNavigate()

  // RN13.2.1 y RN13.3.1-2: activos y pasivos vigentes. RN13.1.3 y RN13.4.1:
  // patrimonio = activos - pasivos. El balance se calcula, no se guarda.
  const activos = valorTotalActivos()
  const pasivos = totalPasivos()
  const patrimonio = activos - pasivos
  const enActivos = activos + pasivos > 0 ? Math.round((activos / (activos + pasivos)) * 100) : 0
  // RN13.6.1: pasivos / activos (el mismo indice que usa Mis Pasivos).
  const endeudamiento = indiceEndeudamiento()

  // ponytail: la fecha de corte (RN13.1.2) es decorativa como en el prototipo; muestra hoy (conflicto 22).
  const selector = (
    <div className="selector-periodo">
      <span className="icono-periodo"><i className="ph ph-calendar"></i></span>
      <span className="texto-periodo">{formatoFecha(diaISO())}</span>
      <span className="flecha-periodo">▾</span>
    </div>
  )

  return (
    <>
      <EncabezadoPagina titulo="Balance Financiero" subtitulo="Patrimonio Neto" extra={selector} />
      <div className="balance-dashboard">
        <div className="bal-columna-izq">
          <section className="bal-hero">
            <p className="bal-hero-etiqueta">Patrimonio Neto</p>
            <h2 className="bal-hero-valor">{formatoPesos(patrimonio)}</h2>
            <p className="bal-hero-sub">Valor Actual</p>
            <span className="bal-chip">Activo</span>
          </section>

          <section className="bal-progreso">
            <p className="bal-seccion-titulo">Activos vs. Pasivos</p>
            <p className="bal-progreso-texto">{enActivos}% en activos</p>
            <div className="bal-barra">
              <span className="bal-barra-relleno" style={{ width: `${enActivos}%` }}></span>
            </div>
            <div className="bal-datos">
              <div className="bal-dato">
                <span>Total Activos</span>
                <strong>{formatoPesos(activos)}</strong>
              </div>
              <div className="bal-dato">
                <span>Total Pasivos</span>
                <strong>{formatoPesos(pasivos)}</strong>
              </div>
              <div className="bal-dato bal-dato-destacado">
                <span>Patrimonio</span>
                <strong>{formatoPesos(patrimonio)}</strong>
              </div>
            </div>
          </section>

          <section className="bal-impacto">
            <p className="bal-seccion-titulo">Relación con Indicadores</p>
            <p className="bal-impacto-sub">Base para cálculo de indicadores</p>
          </section>

          {/* En el prototipo este banner no lleva a ningun lado; se deja igual. */}
          <section className="bal-banner">
            <span className="bal-banner-icono"><i className="ph ph-chart-line-up"></i></span>
            <div className="bal-banner-texto">
              <strong>Ver Indicadores Financieros</strong>
              <span>Liquidez, endeudamiento y más</span>
            </div>
            <span className="bal-banner-flecha"><i className="ph ph-arrow-right"></i></span>
          </section>

          <div className="bal-divisor"></div>

          <div className="bal-acciones">
            <button type="button" className="bal-boton bal-boton-primario" onClick={() => navigate('/reportes/generar')}>
              <i className="ph ph-clipboard-text"></i> Generar Reporte de Balance
            </button>
            <button type="button" className="bal-boton bal-boton-ghost" onClick={() => navigate('/flujo-caja')}>
              <i className="ph ph-money"></i> Ver Flujo de Caja
            </button>
          </div>
        </div>

        <aside className="bal-columna-der">
          <p className="bal-indicadores-titulo">Indicadores</p>
          <article className="bal-tile">
            <i className="ph ph-drop"></i>
            <span className="bal-tile-nombre">Liquidez</span>
            {/* ponytail: valor fijo del prototipo; la documentacion no da la formula (conflicto 21) */}
            <strong className="bal-tile-valor">1.6x</strong>
          </article>
          <article className="bal-tile">
            <i className="ph ph-scales"></i>
            <span className="bal-tile-nombre">Endeudamiento</span>
            <strong className="bal-tile-valor">{endeudamiento.porcentaje.toFixed(1)}%</strong>
            <small className="bal-tile-estado">Riesgo {endeudamiento.nivel}</small>
          </article>
          <article className="bal-tile">
            <i className="ph ph-buildings"></i>
            <span className="bal-tile-nombre">Activos</span>
            <strong className="bal-tile-valor">{formatoPesos(activos)}</strong>
          </article>
          <article className="bal-tile">
            <i className="ph ph-credit-card"></i>
            <span className="bal-tile-nombre">Pasivos</span>
            <strong className="bal-tile-valor">{formatoPesos(pasivos)}</strong>
          </article>
        </aside>
      </div>
    </>
  )
}
