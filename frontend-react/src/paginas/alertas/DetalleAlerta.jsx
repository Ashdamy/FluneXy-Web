import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { delMesActual, desactivarAlerta, listarHistorial, obtenerAlerta, tipoDe, umbralTexto, valorActual } from '../../datos/alertas.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoFecha } from '../../utilidades/fecha.js'
import { formatoPesos } from '../../utilidades/moneda.js'
import ModalDesactivarAlerta from './ModalDesactivarAlerta.jsx'

// "Faltan 29.1 pts para el umbral" (o cuanto falta en veces o pesos).
function distancia(alerta, actual) {
  const tipo = tipoDe(alerta)
  const falta = tipo.simbolo === '≥' ? alerta.umbral - actual : actual - alerta.umbral
  if (falta <= 0) return 'Umbral alcanzado'
  if (tipo.unidad === '%') return `Faltan ${falta.toFixed(1)} pts para el umbral`
  if (tipo.unidad === 'x') return `Faltan ${falta.toFixed(1)}x para el umbral`
  return `Faltan ${formatoPesos(falta)} para el umbral`
}

export default function DetalleAlerta() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [confirmando, setConfirmando] = useState(false)
  useClaseBody(confirmando ? 'mod-alertas mod-alertas-detalle mod-alertas-desactivar' : 'mod-alertas mod-alertas-detalle')
  useTituloPagina('Detalle de Alerta')

  const alerta = obtenerAlerta(id)
  if (!alerta) return <Navigate to="/alertas" replace />
  const tipo = tipoDe(alerta)
  const actual = valorActual(alerta)
  // RN15.8.2: valor detectado y fecha de cada alerta generada.
  const generadas = listarHistorial(alerta.id)
  const [ultima] = generadas
  const esteMes = delMesActual(generadas).length

  function confirmarDesactivar() {
    desactivarAlerta(alerta.id)
    navigate('/alertas')
  }

  // La BD no guarda fecha de creacion de la alerta: ese recuadro del prototipo no se muestra.
  const tiles = [
    ['', 'UMBRAL', umbralTexto(alerta)],
    ['tile-verde', 'VALOR ACTUAL', tipo.formato(actual)],
    ['', 'TIPO', tipo.nombre],
    ['', 'ORIGEN', tipo.origen],
    ['tile-indigo', 'ESTADO', alerta.activo ? 'ACTIVA' : 'INACTIVA'],
  ]

  return (
    <>
      {/* ponytail: "Meta Financiera" y "En Progreso" son textos del prototipo (copiados de Metas) */}
      <EncabezadoPagina titulo="Detalle de Alerta" subtitulo={`${tipo.nombre} · Meta Financiera`} />
      <section className="hero-card">
        <div className="hero-icono"><i className={`ph ${tipo.icono}`}></i></div>
        <span className="badge-tipo">Meta Financiera</span>
        <span className="chip-estado">En Progreso</span>
        <h2 className="hero-titulo">{tipo.nombre}</h2>
        <span className="hero-label">Estado Actual</span>
        <strong className="hero-valor">{tipo.formato(actual)}</strong>
        <span className="hero-umbral">Umbral configurado: {umbralTexto(alerta)}</span>
        <span className="hero-faltan">{distancia(alerta, actual)}</span>
      </section>
      <section className="calc-card">
        <div className="c-icono"><i className="ph ph-bell"></i></div>
        <div className="c-info">
          <span className="c-label">Último Valor Detectado</span>
          <strong className="c-valor">{ultima ? tipo.formato(ultima.valor) : '—'}</strong>
          <span className="c-fecha">{ultima ? `Detectado el ${formatoFecha(ultima.fecha)}` : 'Sin alertas generadas'}</span>
        </div>
        <div className="c-der">
          <strong>{esteMes}</strong>
          <span>veces este mes</span>
        </div>
      </section>
      <h3 className="info-titulo">INFORMACIÓN</h3>
      <section className="tiles">
        {tiles.map(([clase, etiqueta, valor]) => (
          <div key={etiqueta} className={clase ? `tile ${clase}` : 'tile'}>
            <span>{etiqueta}</span>
            <strong>{valor}</strong>
          </div>
        ))}
      </section>
      <Link className="aporte-banner" to="/alertas/historial">
        <span className="a-icono"><i className="ph ph-clock-counter-clockwise"></i></span>
        <div className="a-info">
          <strong>Ver Historial de Alertas</strong>
          <span>{delMesActual(listarHistorial()).length} alertas generadas este mes</span>
        </div>
        <span className="a-arr"><i className="ph ph-arrow-right"></i></span>
      </Link>
      <div className="detalle-divider"></div>
      {/* Conflicto 26 (decidido): Editar tambien en una inactiva, para reactivarla (HU15.4).
          RN15.5.3: solo se desactiva una activa. */}
      <section className="acciones-alerta">
        <button type="button" className="btn-editar" onClick={() => navigate(`/alertas/${alerta.id}/editar`)}>Editar Alerta</button>
        {alerta.activo && (
          <button type="button" className="btn-desactivar" onClick={() => setConfirmando(true)}>Desactivar Alerta</button>
        )}
      </section>
      {confirmando && <ModalDesactivarAlerta alerta={alerta} onCancelar={() => setConfirmando(false)} onConfirmar={confirmarDesactivar} />}
    </>
  )
}
