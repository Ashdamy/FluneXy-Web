import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { metasEnProgreso } from '../../datos/metas.js'
import { listarPasivos, proximaCuota } from '../../datos/pasivos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'

function TarjetaOpcion({ clase, icono, titulo, texto, pasos, textoBoton, onAccion, nota }) {
  return (
    <article className={`card-selector-pago ${clase}`}>
      <div className="icono-selector-pago"><i className={`ph ${icono}`}></i></div>
      <h3>{titulo}</h3>
      <p>{texto}</p>
      <ol className="pasos-selector-pago">
        {pasos.map((paso, indice) => (
          <li key={paso}><span>{indice + 1}</span>{paso}</li>
        ))}
      </ol>
      <button type="button" className="boton-selector-pago" onClick={onAccion}>{textoBoton}</button>
      <hr className="divisor-selector-pago" />
      <p className="nota-selector-pago"><span className="punto-nota"></span>{nota}</p>
    </article>
  )
}

export default function RegistrarPagoOAporte() {
  useClaseBody('mod-pago-selector')
  useTituloPagina('Registrar Pago o Aporte')
  const navigate = useNavigate()
  const pasivos = listarPasivos().filter((pasivo) => pasivo.activo && proximaCuota(pasivo)).length
  const metas = metasEnProgreso().length

  return (
    <>
      <EncabezadoPagina titulo="Registrar Pago o Aporte" subtitulo="Elige qué deseas registrar" />
      <section className="grid-selector-pago">
        <TarjetaOpcion
          clase="pago-pasivo"
          icono="ph-credit-card"
          titulo="Pago de pasivo"
          texto="Registra el pago de una cuota de tus pasivos. Selecciona el pasivo, el monto y el tipo de pago."
          pasos={['Selecciona el pasivo y la cuota', 'Ingresa el monto del pago', 'Elige el tipo de pago y confirma']}
          textoBoton="Registrar pago"
          onAccion={() => navigate('/cuotas')}
          nota={`${pasivos} ${pasivos === 1 ? 'pasivo activo' : 'pasivos activos'} con cuotas disponibles para pagar`}
        />
        <TarjetaOpcion
          clase="aporte-meta"
          icono="ph-target"
          titulo="Aporte a meta"
          texto="Registra un aporte a una de tus metas de ahorro y acelera tu progreso."
          pasos={['Selecciona la meta de ahorro', 'Ingresa el monto del aporte', 'Confirma el aporte realizado']}
          textoBoton="Registrar aporte"
          onAccion={() => navigate('/metas')}
          nota={`${metas} ${metas === 1 ? 'meta activa esperando' : 'metas activas esperando'} tu próximo aporte`}
        />
      </section>
    </>
  )
}
