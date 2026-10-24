import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import EstadoVacio from '../../componentes/EstadoVacio.jsx'
import { iconoCategoria } from '../../datos/movimientos.js'
import { desactivarPlantilla, listarPlantillas, RECURRENCIAS, resumenPlantilla, tituloPlantilla } from '../../datos/plantillas.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoPesos } from '../../utilidades/moneda.js'
import ModalDesactivarPlantilla from './ModalDesactivarPlantilla.jsx'

// Estado que se muestra en la tarjeta: desactivada, vencida o activa.
function estadoPlantilla(plantilla, resumen) {
  if (!plantilla.activo) return { texto: 'Inactiva', clase: '', barra: 'vencida-color', subtitulo: 'DESACTIVADA', tag: 'Desactivada' }
  if (resumen.vencida) return { texto: 'Vencida', clase: 'vencida', barra: 'vencida-color', subtitulo: 'VIGENCIA VENCIDA', tag: 'Vigencia vencida' }
  return { texto: 'Activa', clase: 'activa', barra: `${plantilla.tipo}-color`, subtitulo: null, tag: null }
}

function TarjetaPlantilla({ plantilla, onVer, onEditar, onDesactivar }) {
  const resumen = resumenPlantilla(plantilla)
  const estado = estadoPlantilla(plantilla, resumen)
  const esIngreso = plantilla.tipo === 'ingreso'
  const tipoTexto = esIngreso ? 'Ingreso' : 'Gasto'
  const dias = resumen.diasParaProxima

  return (
    <article className="card-plantilla">
      <div className={`barra-accent-plantilla ${estado.barra}`}></div>
      <div className="header-card-plantilla">
        <div className="icono-card-plantilla"><i className={`ph ${iconoCategoria(plantilla.tipo, plantilla.categoria)}`}></i></div>
        <div className="info-card-plantilla">
          <h3>{tituloPlantilla(plantilla)}</h3>
          <span className="subtipo-plantilla">{plantilla.categoria.toUpperCase()} · {estado.subtitulo ?? tipoTexto.toUpperCase()}</span>
        </div>
        <span className={`badge-tipo-movimiento ${plantilla.tipo}`}>{tipoTexto}</span>
      </div>
      <strong className={esIngreso ? 'monto-card-plantilla positivo' : 'monto-card-plantilla'}>
        {esIngreso ? '+' : '-'}{formatoPesos(plantilla.monto)}
      </strong>
      <div className="footer-card-plantilla">
        <div className="capsulas-tags">
          <span className="tag-plantilla">{RECURRENCIAS[plantilla.recurrencia].etiqueta}</span>
          {estado.tag ? (
            <span className="tag-plantilla">{estado.tag}</span>
          ) : (
            <>
              <span className="tag-plantilla">Día {plantilla.dia}</span>
              {dias !== null && <span className="tag-plantilla">{dias === 0 ? 'Hoy' : `${dias} ${dias === 1 ? 'día' : 'días'}`}</span>}
            </>
          )}
        </div>
        <div className="acciones-card-plantilla">
          <button type="button" title="Ver detalle" onClick={onVer}><i className="ph ph-eye"></i></button>
          <button type="button" title="Editar" onClick={onEditar}><i className="ph ph-pencil-simple"></i></button>
          <button type="button" title="Desactivar" onClick={onDesactivar}><i className="ph ph-warning"></i></button>
        </div>
        <span className={`status-plantilla ${estado.clase}`.trim()}>{estado.texto}</span>
      </div>
    </article>
  )
}

export default function MisPlantillas() {
  const navigate = useNavigate()
  const [plantillas, setPlantillas] = useState(listarPlantillas)
  const [aDesactivar, setADesactivar] = useState(null)
  const vacio = plantillas.length === 0
  useClaseBody(vacio ? 'mod-plantilla-vacio' : 'mod-plantillas')
  useTituloPagina('Mis Plantillas')

  function confirmarDesactivar() {
    desactivarPlantilla(aDesactivar.id)
    setPlantillas(listarPlantillas())
    setADesactivar(null)
  }

  const encabezado = <EncabezadoPagina titulo="Mis Plantillas" subtitulo="Automatiza tus movimientos recurrentes" />

  if (vacio) {
    return (
      <>
        {encabezado}
        <EstadoVacio
          sufijo="plantillas"
          claseBoton="btn-primer-plantilla"
          icono="ph-arrows-clockwise"
          iconoEnCirculo
          titulo="No tienes plantillas configuradas"
          texto="Crea una plantilla para automatizar tus registros repetitivos"
          textoBoton={'+  Nueva Plantilla'}
          onAccion={() => navigate('/plantillas/nueva?tipo=ingreso')}
        />
      </>
    )
  }

  // "Activas" = no desactivadas y con vigencia. El gasto mensual pasa cada
  // plantilla a su equivalente por mes (quincenal x2, semanal x4).
  const vigentes = plantillas.filter((plantilla) => plantilla.activo && !resumenPlantilla(plantilla).vencida)
  const gastoMensual = vigentes
    .filter((plantilla) => plantilla.tipo === 'gasto')
    .reduce((total, plantilla) => total + plantilla.monto * RECURRENCIAS[plantilla.recurrencia].vecesPorMes, 0)

  return (
    <>
      {encabezado}
      <section className="hero-total-plantillas">
        <div className="tarjeta-resumen-bloque">
          <span className="etiqueta-hero">ACTIVAS</span>
          <strong className="valor-hero">{vigentes.length} {vigentes.length === 1 ? 'plantilla' : 'plantillas'}</strong>
        </div>
        <div className="tarjeta-resumen-bloque">
          <span className="etiqueta-hero-gasto">GASTO MENSUAL AUTOMÁTICO</span>
          <strong className="valor-hero-gasto">-{formatoPesos(gastoMensual)}</strong>
        </div>
        <span></span>
        <Link className="btn-nueva-plantilla" to="/plantillas/nueva?tipo=ingreso"><i className="ph ph-plus"></i>Nueva Plantilla</Link>
      </section>
      <section className="seccion-lista-plantillas">
        <span className="etiqueta-lista">PLANTILLAS CONFIGURADAS</span>
        <div className="grid-plantillas">
          {plantillas.map((plantilla) => (
            <TarjetaPlantilla
              key={plantilla.id}
              plantilla={plantilla}
              onVer={() => navigate(`/plantillas/${plantilla.id}`)}
              onEditar={() => navigate(`/plantillas/${plantilla.id}/editar`)}
              onDesactivar={() => setADesactivar(plantilla)}
            />
          ))}
        </div>
      </section>
      {aDesactivar && (
        <ModalDesactivarPlantilla plantilla={aDesactivar} onCancelar={() => setADesactivar(null)} onConfirmar={confirmarDesactivar} />
      )}
    </>
  )
}
