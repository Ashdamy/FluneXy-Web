import { Route, Routes } from 'react-router-dom'
import LayoutApp from './componentes/LayoutApp.jsx'
import LayoutPublico from './componentes/LayoutPublico.jsx'
import DetalleActivo from './paginas/activos/DetalleActivo.jsx'
import EditarActivo from './paginas/activos/EditarActivo.jsx'
import MisActivos from './paginas/activos/MisActivos.jsx'
import RegistrarActivo from './paginas/activos/RegistrarActivo.jsx'
import DetalleAlerta from './paginas/alertas/DetalleAlerta.jsx'
import { EditarAlerta, NuevaAlerta } from './paginas/alertas/FormularioAlerta.jsx'
import HistorialAlertas from './paginas/alertas/HistorialAlertas.jsx'
import MisAlertas from './paginas/alertas/MisAlertas.jsx'
import Asistente from './paginas/asistente/Asistente.jsx'
import CierreSesion from './paginas/autenticacion/CierreSesion.jsx'
import IniciarSesion from './paginas/autenticacion/IniciarSesion.jsx'
import NuevaContrasena from './paginas/autenticacion/NuevaContrasena.jsx'
import RecuperarContrasena from './paginas/autenticacion/RecuperarContrasena.jsx'
import Registro from './paginas/autenticacion/Registro.jsx'
import VerificacionContrasena from './paginas/autenticacion/VerificacionContrasena.jsx'
import BalanceFinanciero from './paginas/balance/BalanceFinanciero.jsx'
import DetalleCuota from './paginas/cuotas/DetalleCuota.jsx'
import PasivosConCuotas from './paginas/cuotas/PasivosConCuotas.jsx'
import TablaCuotas from './paginas/cuotas/TablaCuotas.jsx'
import FlujoCaja from './paginas/flujoCaja/FlujoCaja.jsx'
import CrearFondo from './paginas/fondos/CrearFondo.jsx'
import DetalleFondo from './paginas/fondos/DetalleFondo.jsx'
import EditarFondo from './paginas/fondos/EditarFondo.jsx'
import MisFondos from './paginas/fondos/MisFondos.jsx'
import Inicio from './paginas/home/Inicio.jsx'
import IndicadoresFinancieros from './paginas/indicadores/IndicadoresFinancieros.jsx'
import DetalleMeta from './paginas/metas/DetalleMeta.jsx'
import EditarMeta from './paginas/metas/EditarMeta.jsx'
import MisMetas from './paginas/metas/MisMetas.jsx'
import NuevaMeta from './paginas/metas/NuevaMeta.jsx'
import DetalleMovimiento from './paginas/movimientos/DetalleMovimiento.jsx'
import EditarMovimiento from './paginas/movimientos/EditarMovimiento.jsx'
import MisMovimientos from './paginas/movimientos/MisMovimientos.jsx'
import NuevoMovimiento from './paginas/movimientos/NuevoMovimiento.jsx'
import HistorialPagos from './paginas/pagos/HistorialPagos.jsx'
import RegistrarAporte from './paginas/pagos/RegistrarAporte.jsx'
import RegistrarPago from './paginas/pagos/RegistrarPago.jsx'
import RegistrarPagoOAporte from './paginas/pagos/RegistrarPagoOAporte.jsx'
import DetallePasivo from './paginas/pasivos/DetallePasivo.jsx'
import EditarPasivo from './paginas/pasivos/EditarPasivo.jsx'
import MisPasivos from './paginas/pasivos/MisPasivos.jsx'
import RegistrarPasivo from './paginas/pasivos/RegistrarPasivo.jsx'
import Placeholder, { PlaceholderPublico } from './paginas/Placeholder.jsx'
import DetallePlantilla from './paginas/plantillas/DetallePlantilla.jsx'
import EditarPlantilla from './paginas/plantillas/EditarPlantilla.jsx'
import MisPlantillas from './paginas/plantillas/MisPlantillas.jsx'
import NuevaPlantilla from './paginas/plantillas/NuevaPlantilla.jsx'
import DetalleReporte from './paginas/reportes/DetalleReporte.jsx'
import GenerarReporte from './paginas/reportes/GenerarReporte.jsx'
import HistorialReportes from './paginas/reportes/HistorialReportes.jsx'
import VistaPreviaReporte from './paginas/reportes/VistaPreviaReporte.jsx'

// Tabla de rutas. "claseBody" es la clase que tenia el <body> del HTML original.
// No son rutas (por decision del plan):
//   - *-vacio.html: seran el estado vacio de su listado.
//   - desactivar-*.html: seran un modal sobre el listado o el detalle.
//   - saldo-insuficiente.html: sera un aviso del formulario /movimientos/nuevo.
//   - nuevo-movimiento-gasto/-ingreso y nueva-plantilla-gasto/-ingreso: una
//     sola ruta cada par, el tipo va en la URL (?tipo=gasto).
//   - legal/ y soporte/: quedan como HTML estatico en public/ (Fase 2).
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PlaceholderPublico titulo="Landing FluneXy" claseBody="landing" />} />

      {/* LayoutPublico ya que es el inicio de seccion */}
      <Route path="/autenticacion" element={<LayoutPublico />}>
        <Route path="iniciar-sesion" element={<IniciarSesion />} />
        <Route path="registro" element={<Registro />} />
        <Route path="recuperar-contrasena" element={<RecuperarContrasena />} />
        <Route path="verificacion-contrasena" element={<VerificacionContrasena />} />
        <Route path="nueva-contrasena" element={<NuevaContrasena />} />
        <Route path="cierre-sesion" element={<CierreSesion />} />
      </Route>
      
      {/* LayoutApp ya que es la pagina una vez se inicia sesion con todas sun funcionalidades */}
      <Route element={<LayoutApp />}>
        <Route path="/home" element={<Inicio />} />

        <Route path="/usuario" element={<Placeholder titulo="Mi Perfil" subtitulo="Consulta y administra tu información" claseBody="mod-usuario" />} />
        <Route path="/usuario/editar" element={<Placeholder titulo="Editar Perfil" subtitulo="Actualiza tu información personal" claseBody="mod-usuario" />} />
        <Route path="/usuario/cambiar-contrasena" element={<Placeholder titulo="Cambiar Contraseña" subtitulo="Protege el acceso a tu cuenta" claseBody="mod-usuario" />} />

        <Route path="/fondos" element={<MisFondos />} />
        <Route path="/fondos/nuevo" element={<CrearFondo />} />
        <Route path="/fondos/:id" element={<DetalleFondo />} />
        <Route path="/fondos/:id/editar" element={<EditarFondo />} />

        <Route path="/movimientos" element={<MisMovimientos />} />
        <Route path="/movimientos/nuevo" element={<NuevoMovimiento />} />
        <Route path="/movimientos/:id" element={<DetalleMovimiento />} />
        <Route path="/movimientos/:id/editar" element={<EditarMovimiento />} />

        <Route path="/plantillas" element={<MisPlantillas />} />
        <Route path="/plantillas/nueva" element={<NuevaPlantilla />} />
        <Route path="/plantillas/:id" element={<DetallePlantilla />} />
        <Route path="/plantillas/:id/editar" element={<EditarPlantilla />} />

        <Route path="/activos" element={<MisActivos />} />
        <Route path="/activos/nuevo" element={<RegistrarActivo />} />
        <Route path="/activos/:id" element={<DetalleActivo />} />
        <Route path="/activos/:id/editar" element={<EditarActivo />} />

        <Route path="/pasivos" element={<MisPasivos />} />
        <Route path="/pasivos/nuevo" element={<RegistrarPasivo />} />
        <Route path="/pasivos/:id" element={<DetallePasivo />} />
        <Route path="/pasivos/:id/editar" element={<EditarPasivo />} />

        <Route path="/cuotas" element={<PasivosConCuotas />} />
        <Route path="/cuotas/:pasivoId" element={<TablaCuotas />} />
        <Route path="/cuotas/:pasivoId/:cuotaId" element={<DetalleCuota />} />

        <Route path="/pagos" element={<RegistrarPagoOAporte />} />
        <Route path="/pagos/registrar-pago" element={<RegistrarPago />} />
        <Route path="/pagos/registrar-aporte" element={<RegistrarAporte />} />
        <Route path="/pagos/historial" element={<HistorialPagos />} />

        <Route path="/metas" element={<MisMetas />} />
        <Route path="/metas/nueva" element={<NuevaMeta />} />
        <Route path="/metas/:id" element={<DetalleMeta />} />
        <Route path="/metas/:id/editar" element={<EditarMeta />} />

        <Route path="/balance-financiero" element={<BalanceFinanciero />} />
        <Route path="/indicadores" element={<IndicadoresFinancieros />} />
        <Route path="/flujo-caja" element={<FlujoCaja />} />

        <Route path="/alertas" element={<MisAlertas />} />
        <Route path="/alertas/nueva" element={<NuevaAlerta />} />
        <Route path="/alertas/historial" element={<HistorialAlertas />} />
        <Route path="/alertas/:id" element={<DetalleAlerta />} />
        <Route path="/alertas/:id/editar" element={<EditarAlerta />} />

        <Route path="/reportes" element={<HistorialReportes />} />
        <Route path="/reportes/generar" element={<GenerarReporte />} />
        <Route path="/reportes/vista-previa" element={<VistaPreviaReporte />} />
        <Route path="/reportes/:id" element={<DetalleReporte />} />

        <Route path="/asistente" element={<Asistente />} />

        <Route path="*" element={<Placeholder titulo="Página no encontrada" subtitulo="La dirección no existe" claseBody="" />} />
      </Route>
    </Routes>
  )
}
