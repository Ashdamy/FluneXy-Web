import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { indiceEndeudamiento } from '../../datos/pasivos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'

const NIVELES = { bajo: 'Bajo', moderado: 'Moderado', alto: 'Alto' }

// Una tarjeta de indicador. "clase" es el color del prototipo
// (ind-activo-saludable, ind-activo-indigo...).
function TarjetaIndicador({ clase, icono, nombre, sub, valor, estado, claseEstado = 'ind-estado' }) {
  return (
    <article className={`ind-tarjeta ${clase}`}>
      <span className="ind-barra"></span>
      <span className="ind-icono"><i className={`ph ${icono}`}></i></span>
      <div className="ind-info">
        <h3 className="ind-nombre">{nombre}</h3>
        <span className="ind-sub">{sub}</span>
      </div>
      <div className="ind-lectura">
        <span className="ind-etiqueta">Valor</span>
        <strong className="ind-valor">{valor}</strong>
      </div>
      <span className={claseEstado}><span className="ind-punto"></span>{estado}</span>
    </article>
  )
}

export default function IndicadoresFinancieros() {
  useClaseBody('mod-indicadores')
  useTituloPagina('Indicadores Financieros')
  // RN13.6.1 y RN14.1.1: endeudamiento = pasivos / activos, calculado con lo registrado.
  const endeudamiento = indiceEndeudamiento()

  return (
    <>
      <EncabezadoPagina titulo="Indicadores Financieros" subtitulo="Evalúa tu salud financiera de un vistazo" />
      <div className="ind-dashboard">
        <div className="ind-columna-izq">
          <p className="ind-titulo-seccion">Indicadores · 4 activos</p>
          {/* ponytail: liquidez, ahorro mensual y cobertura quedan con los valores del prototipo (conflictos 21 y 24) */}
          <TarjetaIndicador clase="ind-activo-saludable" icono="ph-drop" nombre="Liquidez" sub="Capacidad de pago inmediato" valor="1.6x" estado="Saludable" />
          <TarjetaIndicador
            clase="ind-activo-indigo"
            icono="ph-scales"
            nombre="Endeudamiento"
            sub="Riesgo financiero"
            valor={`${endeudamiento.porcentaje.toFixed(1)}%`}
            estado={NIVELES[endeudamiento.nivel]}
          />
          <TarjetaIndicador clase="ind-activo-ambar" icono="ph-piggy-bank" nombre="Ahorro Mensual" sub="Capacidad de ahorro" valor="33%" estado="Saludable" />
          <TarjetaIndicador
            clase="ind-activo-gris"
            icono="ph-shield-warning"
            nombre="Cobertura de Deuda"
            sub="Meta vs. deuda"
            valor="N/A"
            estado="Sin datos"
            claseEstado="ind-estado ind-estado-sin"
          />
        </div>
        <aside className="ind-columna-der">
          <section className="ind-hero-total">
            <p className="ind-hero-titulo">Índice de Salud Financiera</p>
            {/* ponytail: indice fijo del prototipo; la documentacion no lo define (conflicto 24) */}
            <div className="ind-hero-numero"><strong>82</strong><small>/ 100</small></div>
            <div className="ind-barra-total">
              <span className="ind-barra-total-relleno" style={{ width: '82%' }}></span>
            </div>
          </section>
        </aside>
      </div>
    </>
  )
}
