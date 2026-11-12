import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { desactivarAlerta, listarAlertas, tipoDe, umbralTexto, valorActual } from '../../datos/alertas.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import ModalDesactivarAlerta from './ModalDesactivarAlerta.jsx'

function TarjetaAlerta({ alerta, onVer, onEditar, onDesactivar }) {
  const tipo = tipoDe(alerta)
  const accion = (fn) => (evento) => {
    evento.stopPropagation()
    fn()
  }
  return (
    <div className="col-12 col-lg-6">
      <article className={`alerta-tarjeta ${tipo.acento}`} onClick={onVer}>
        <span className="alerta-acento"></span>
        <span className="alerta-icono"><i className={`ph ${tipo.icono}`}></i></span>
        <div className="alerta-info">
          <h4>{tipo.nombre}</h4>
          <span>UMBRAL: {umbralTexto(alerta)}{alerta.tipo === 'gasto' && '/mes'}</span>
        </div>
        <div className="alerta-medida">
          <span className="alerta-etiqueta-medida">Actual</span>
          {/* Como el prototipo: una alerta inactiva no muestra el valor actual. */}
          <strong>{alerta.activo ? tipo.formato(valorActual(alerta)) : '—'}</strong>
        </div>
        <div className="alerta-acciones">
          <button type="button" className="alerta-accion" title="Ver detalle" onClick={accion(onVer)}><i className="ph ph-eye"></i></button>
          {/* Como en los demas modulos, una inactiva no muestra Editar ni Desactivar (conflicto 26). */}
          {alerta.activo && (
            <>
              <button type="button" className="alerta-accion" title="Editar" onClick={accion(onEditar)}><i className="ph ph-pencil-simple"></i></button>
              <button type="button" className="alerta-accion alerta-accion-peligro" title="Desactivar" onClick={accion(onDesactivar)}><i className="ph ph-warning"></i></button>
            </>
          )}
        </div>
        <span className={alerta.activo ? 'alerta-estado' : 'alerta-estado alerta-estado-inactiva'}>
          <i className="alerta-punto"></i>{alerta.activo ? 'Activa' : 'Inactiva'}
        </span>
      </article>
    </div>
  )
}

export default function MisAlertas() {
  const navigate = useNavigate()
  const [alertas, setAlertas] = useState(listarAlertas)
  const [aDesactivar, setADesactivar] = useState(null)
  const vacio = alertas.length === 0
  useClaseBody(vacio ? 'mod-alertas mod-alertas-vacio' : aDesactivar ? 'mod-alertas mod-alertas-desactivar' : 'mod-alertas mod-alertas-lista')
  useTituloPagina('Mis Alertas')

  function confirmarDesactivar() {
    desactivarAlerta(aDesactivar.id)
    setAlertas(listarAlertas())
    setADesactivar(null)
  }

  const encabezado = <EncabezadoPagina titulo="Mis Alertas" subtitulo="Configura avisos para riesgos financieros" />

  // alertas-vacio.html no tiene el HTML de EstadoVacio (sin halo ni circulo), por eso va aqui.
  if (vacio) {
    return (
      <>
        {encabezado}
        <section className="estado-vacio">
          <div className="vacio-orb">
            <i className="ph ph-bell"></i>
          </div>
          <h2>No tienes alertas configuradas</h2>
          <p>Configura una alerta para recibir avisos de riesgo financiero</p>
          <button type="button" onClick={() => navigate('/alertas/nueva')}>+ Nueva Alerta</button>
        </section>
      </>
    )
  }

  const activas = alertas.filter((alerta) => alerta.activo).length
  return (
    <>
      {encabezado}
      <section className="alerta-suma">
        <span className="alerta-suma-orb"></span>
        <div className="alerta-suma-izq">
          <span className="alerta-suma-etiqueta">Alertas Activas</span>
          <strong className="alerta-suma-numero">{activas}</strong>
          <span className="alerta-suma-pill">{activas} {activas === 1 ? 'activa' : 'activas'} de {alertas.length}</span>
        </div>
        <div className="alerta-suma-der">
          <span className="alerta-suma-total-etiqueta">Total</span>
          <strong className="alerta-suma-total">{alertas.length}</strong>
        </div>
        <span className="alerta-suma-divider"></span>
      </section>
      <div className="alerta-fila-titulo">
        <h3>Alertas Configuradas</h3>
        <Link to="/alertas/nueva" className="alerta-boton-nueva">
          <i className="ph ph-plus"></i> Agregar Nueva Alerta
        </Link>
      </div>
      <section className="alerta-grid row">
        {alertas.map((alerta) => (
          <TarjetaAlerta
            key={alerta.id}
            alerta={alerta}
            onVer={() => navigate(`/alertas/${alerta.id}`)}
            onEditar={() => navigate(`/alertas/${alerta.id}/editar`)}
            onDesactivar={() => setADesactivar(alerta)}
          />
        ))}
      </section>
      {aDesactivar && <ModalDesactivarAlerta alerta={aDesactivar} onCancelar={() => setADesactivar(null)} onConfirmar={confirmarDesactivar} />}
    </>
  )
}
