import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { flujoDelMes, nombreMes } from '../../datos/flujoCaja.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoPesos } from '../../utilidades/moneda.js'

// Selector del periodo. ponytail: decorativo como en el prototipo (muestra el mes actual).
function SelectorPeriodo({ mes, clase = 'selector-periodo' }) {
  return (
    <div className={clase}>
      <span className="icono-periodo"><i className="ph ph-calendar"></i></span>
      <span className="texto-periodo">{nombreMes(mes)}</span>
      <span className="flecha-periodo">▾</span>
    </div>
  )
}

function Componente({ clase, icono, nombre, sub, monto }) {
  return (
    <article className={`item-componente ${clase}`}>
      <div className="icono-componente"><i className={`ph ${icono}`}></i></div>
      <div className="info-componente">
        <span className="nombre-componente">{nombre}</span>
        <span className="sub-componente">{sub}</span>
      </div>
      <span className="monto-componente">{monto}</span>
    </article>
  )
}

export default function FlujoCaja() {
  useClaseBody('mod-flujo-caja')
  useTituloPagina('Flujo de Caja')
  const flujo = flujoDelMes()
  const encabezado = <EncabezadoPagina titulo="Flujo de Caja" subtitulo="Proyección de ingresos y egresos" />

  // RN12.6.5: sin informacion del periodo no se calcula y se explica por que.
  // El HTML de flujo-vacio.html no es el de EstadoVacio, por eso va aqui.
  if (flujo.sinInformacion) {
    return (
      <>
        {encabezado}
        <SelectorPeriodo mes={flujo.mes} clase="selector-periodo selector-vacio" />
        <section className="estado-vacio flujo-vacio">
          <div className="ilustracion-estado-vacio">
            <div className="circulo-estado-vacio"></div>
            <span className="icono-estado-vacio"><i className="ph ph-trend-down"></i></span>
          </div>
          <h2>Sin información financiera</h2>
          <p>No existen registros financieros para el período seleccionado</p>
        </section>
      </>
    )
  }

  const positivo = flujo.saldo >= 0
  return (
    <>
      {encabezado}
      <div className="fila-flujo">
        <section className="tarjeta-saldo-proyectado">
          <p className="etiqueta-saldo">SALDO PROYECTADO</p>
          <h2>{formatoPesos(flujo.saldo)}</h2>
          <div className="detalle-saldo">
            <span>Al finalizar {nombreMes(flujo.mes)}</span>
            <span className={`pill-saldo ${positivo ? 'positivo' : 'negativo'}`}>{positivo ? 'Positivo' : 'Negativo'}</span>
          </div>
        </section>
        <SelectorPeriodo mes={flujo.mes} />
      </div>
      <section className="componentes-flujo">
        <h3>COMPONENTES DEL FLUJO</h3>
        <div className="lista-componentes">
          <Componente clase="ingreso" icono="ph-currency-circle-dollar" nombre="Ingresos Estimados" sub="RN12.2 · proyección de movimientos" monto={`+${formatoPesos(flujo.ingresos)}`} />
          <Componente clase="gasto" icono="ph-shopping-cart" nombre="Gastos Estimados" sub="RN12.3 · proyección de movimientos" monto={`-${formatoPesos(flujo.gastos)}`} />
          <Componente clase="deuda" icono="ph-credit-card" nombre="Cuotas de Deuda" sub="RN12.4 · cuotas de pasivos activos" monto={`-${formatoPesos(flujo.cuotasDeuda)}`} />
          <Componente clase="ahorro" icono="ph-target" nombre="Ahorro de Metas" sub="RN12.5 · aportes programados" monto={`-${formatoPesos(flujo.ahorroMetas)}`} />
        </div>
      </section>
    </>
  )
}
