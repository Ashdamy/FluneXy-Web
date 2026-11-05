import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import EstadoVacio from '../../componentes/EstadoVacio.jsx'
import { desactivarFondo, listarFondos, TIPOS_FONDO } from '../../datos/fondos.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'
import { formatoPesos } from '../../utilidades/moneda.js'
import ModalDesactivarFondo from './ModalDesactivarFondo.jsx'

// Una tarjeta del listado. Recibe el fondo y las acciones por props.
function TarjetaFondo({ fondo, onVer, onEditar, onDesactivar }) {
  const tipo = TIPOS_FONDO[fondo.tipo]
  const claseEstado = fondo.activo ? `fondo-${fondo.tipo}` : 'fondo-inactivo inactivo'

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <article className={`tarjeta-activo ${claseEstado} h-100`}>
        <header className="encabezado-activo">
          <span className="icono"><i className={`ph ${tipo.icono}`}></i></span>
          <span className={fondo.activo ? 'estado-fondo activo' : 'estado-fondo'}>
            <span className="punto"></span>{fondo.activo ? 'Activo' : 'Inactivo'}
          </span>
        </header>
        <div className="cuerpo-activo">
          <h3>{fondo.nombre}</h3>
          <p>{tipo.etiqueta.toUpperCase()}</p>
        </div>
        <div className="fila-saldo">
          <div className="info-saldo">
            <span className="etiqueta-saldo">Saldo disponible</span>
            <strong className="monto-fondo">{formatoPesos(fondo.saldo)}</strong>
          </div>
          <div className="acciones-tarjeta">
            <button type="button" title="Ver detalle" onClick={onVer}><i className="ph ph-eye"></i></button>
            {fondo.activo && (
              <>
                <button type="button" title="Editar" onClick={onEditar}><i className="ph ph-pencil-simple"></i></button>
                <button type="button" title="Desactivar" onClick={onDesactivar}><i className="ph ph-warning"></i></button>
              </>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default function MisFondos() {
  useClaseBody('mod-fondos')
  useTituloPagina('Mis Fondos')
  const navigate = useNavigate()

  // Estado de la pagina: la lista, lo que se escribe en el buscador y el
  // fondo que se va a desactivar (null = modal cerrado). Cada vez que uno
  // cambia con su "set...", React vuelve a dibujar la pagina.
  const [fondos, setFondos] = useState(listarFondos)
  const [busqueda, setBusqueda] = useState('')
  const [fondoADesactivar, setFondoADesactivar] = useState(null)

  function confirmarDesactivar() {
    desactivarFondo(fondoADesactivar.id)
    setFondos(listarFondos())
    setFondoADesactivar(null)
  }

  const encabezado = <EncabezadoPagina titulo="Mis Fondos" subtitulo="Administra tus cuentas y saldos disponibles" />

  if (fondos.length === 0) {
    return (
      <>
        {encabezado}
        <EstadoVacio
          sufijo="fondos"
          claseBoton="btn-primer-fondo"
          icono="ph-wallet"
          titulo="No tienes fondos registrados"
          texto="Agrega tu primer fondo para empezar a organizar tu dinero y llevar el control de tus finanzas."
          textoBoton={'+  Agregar Fondo'}
          onAccion={() => navigate('/fondos/nuevo')}
        />
      </>
    )
  }

  // Valores calculados en cada render a partir del estado (no se guardan aparte).
  const activos = fondos.filter((fondo) => fondo.activo)
  const balanceTotal = activos.reduce((total, fondo) => total + fondo.saldo, 0)
  const visibles = fondos.filter((fondo) => fondo.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()))

  return (
    <>
      {encabezado}
      <section className="tarjeta-resumen resumen-fondos">
        <div className="informacion-resumen">
          <p>BALANCE TOTAL</p>
          <h2>{formatoPesos(balanceTotal)}</h2>
          <span className="badge-fondos">{activos.length} fondos activos</span>
        </div>
        <div className="estadisticas-resumen">
          <div className="estadistica positivo">
            <p>Activos</p>
            <strong>{activos.length}</strong>
          </div>
          <div className="estadistica">
            <p>Inactivos</p>
            <strong>{fondos.length - activos.length}</strong>
          </div>
        </div>
        <div className="divisor-resumen"></div>
      </section>
      <section className="barra-herramientas barra-fondos">
        <div className="busqueda">
          <i className="ph ph-magnifying-glass"></i>
          <input
            type="search"
            placeholder="Buscar fondo por nombre..."
            aria-label="Buscar fondo por nombre"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </div>
        {/* ponytail: filtro decorativo como en el prototipo; se conecta cuando haya un diseño del menú */}
        <button type="button" className="filtro-todos">Todos <i className="ph ph-caret-down"></i></button>
        <button type="button" className="boton-primario" onClick={() => navigate('/fondos/nuevo')}>
          <i className="ph ph-plus"></i> Agregar Fondo
        </button>
      </section>
      <h3 className="lista-fondos-titulo">CUENTAS REGISTRADAS</h3>
      <section className="lista-activos lista-fondos row">
        {/* key ayuda a React a saber que tarjeta es cual cuando la lista cambia. */}
        {visibles.map((fondo) => (
          <TarjetaFondo
            key={fondo.id}
            fondo={fondo}
            onVer={() => navigate(`/fondos/${fondo.id}`)}
            onEditar={() => navigate(`/fondos/${fondo.id}/editar`)}
            onDesactivar={() => setFondoADesactivar(fondo)}
          />
        ))}
      </section>
      {fondoADesactivar && (
        <ModalDesactivarFondo
          fondo={fondoADesactivar}
          onCancelar={() => setFondoADesactivar(null)}
          onConfirmar={confirmarDesactivar}
        />
      )}
    </>
  )
}
