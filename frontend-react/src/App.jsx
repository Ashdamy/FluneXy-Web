import { Route, Routes } from 'react-router-dom'
import LayoutApp from './componentes/LayoutApp.jsx'
import LayoutPublico from './componentes/LayoutPublico.jsx'
import Placeholder, { PlaceholderPublico } from './paginas/Placeholder.jsx'
import CierreSesion from './paginas/autenticacion/CierreSesion.jsx'
import IniciarSesion from './paginas/autenticacion/IniciarSesion.jsx'
import NuevaContrasena from './paginas/autenticacion/NuevaContrasena.jsx'
import RecuperarContrasena from './paginas/autenticacion/RecuperarContrasena.jsx'
import Registro from './paginas/autenticacion/Registro.jsx'
import VerificacionContrasena from './paginas/autenticacion/VerificacionContrasena.jsx'

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

      <Route path="/autenticacion" element={<LayoutPublico />}>
        <Route path="iniciar-sesion" element={<IniciarSesion />} />
        <Route path="registro" element={<Registro />} />
        <Route path="recuperar-contrasena" element={<RecuperarContrasena />} />
        <Route path="verificacion-contrasena" element={<VerificacionContrasena />} />
        <Route path="nueva-contrasena" element={<NuevaContrasena />} />
        <Route path="cierre-sesion" element={<CierreSesion />} />
      </Route>

      <Route element={<LayoutApp />}>
        <Route path="/home" element={<Placeholder titulo="Inicio" claseBody="mod-home" />} />

        <Route path="/usuario" element={<Placeholder titulo="Mi Perfil" subtitulo="Consulta y administra tu información" claseBody="mod-usuario" />} />
        <Route path="/usuario/editar" element={<Placeholder titulo="Editar Perfil" subtitulo="Actualiza tu información personal" claseBody="mod-usuario" />} />
        <Route path="/usuario/cambiar-contrasena" element={<Placeholder titulo="Cambiar Contraseña" subtitulo="Protege el acceso a tu cuenta" claseBody="mod-usuario" />} />

        <Route path="/fondos" element={<Placeholder titulo="Mis Fondos" subtitulo="Administra tus cuentas y saldos disponibles" claseBody="mod-fondos" />} />
        <Route path="/fondos/nuevo" element={<Placeholder titulo="Nuevo Fondo" subtitulo="Registra una nueva cuenta o billetera" claseBody="mod-fondo-form mod-fondo-crear" />} />
        <Route path="/fondos/:id" element={<Placeholder titulo="Detalle del Fondo" subtitulo="Detalle del fondo" claseBody="mod-fondos" />} />
        <Route path="/fondos/:id/editar" element={<Placeholder titulo="Editar Fondo" subtitulo="Actualiza la información de tu cuenta" claseBody="mod-fondo-form mod-fondo-editar" />} />

        <Route path="/movimientos" element={<Placeholder titulo="Mis Movimientos" subtitulo="Consulta todos tus ingresos y gastos" claseBody="mod-lista-movimientos" />} />
        <Route path="/movimientos/nuevo" element={<Placeholder titulo="Nuevo Movimiento" subtitulo="Registra un ingreso o gasto" claseBody="mod-form-movimiento" />} />
        <Route path="/movimientos/:id" element={<Placeholder titulo="Detalle del Movimiento" subtitulo="Información completa del movimiento" claseBody="mod-detalle-movimiento" />} />
        <Route path="/movimientos/:id/editar" element={<Placeholder titulo="Editar Movimiento" subtitulo="Actualiza los datos del movimiento" claseBody="mod-editar-movimiento" />} />

        <Route path="/plantillas" element={<Placeholder titulo="Mis Plantillas" subtitulo="Automatiza tus movimientos recurrentes" claseBody="mod-plantillas" />} />
        <Route path="/plantillas/nueva" element={<Placeholder titulo="Nueva Plantilla" subtitulo="Configura un movimiento automático recurrente" claseBody="mod-plantilla-form mod-plantilla-crear" />} />
        <Route path="/plantillas/:id" element={<Placeholder titulo="Detalle de Plantilla" subtitulo="Detalle de la plantilla" claseBody="mod-plantilla-detalle" />} />
        <Route path="/plantillas/:id/editar" element={<Placeholder titulo="Editar Plantilla" subtitulo="Ajusta la configuración del movimiento automático" claseBody="mod-plantilla-form mod-plantilla-editar" />} />

        <Route path="/activos" element={<Placeholder titulo="Mis Activos" subtitulo="Controla todos tus bienes y patrimonio" claseBody="mod-lista-activos" />} />
        <Route path="/activos/nuevo" element={<Placeholder titulo="Registrar Activo" subtitulo="Agrega un bien a tu patrimonio personal" claseBody="mod-activo-form mod-activo-crear" />} />
        <Route path="/activos/:id" element={<Placeholder titulo="Detalle del Activo" subtitulo="Detalle del activo" claseBody="mod-activo-detalle" />} />
        <Route path="/activos/:id/editar" element={<Placeholder titulo="Editar Activo" subtitulo="Actualiza la información de tu bien" claseBody="mod-activo-form mod-activo-editar" />} />

        <Route path="/pasivos" element={<Placeholder titulo="Mis Pasivos" subtitulo="Controla todas tus obligaciones financieras" claseBody="mod-lista-pasivos" />} />
        <Route path="/pasivos/nuevo" element={<Placeholder titulo="Registrar Pasivo" subtitulo="Agrega una deuda u obligación financiera" claseBody="mod-pasivo-form mod-pasivo-crear" />} />
        <Route path="/pasivos/:id" element={<Placeholder titulo="Detalle del Pasivo" subtitulo="Información completa del pasivo" claseBody="mod-pasivo-detalle" />} />
        <Route path="/pasivos/:id/editar" element={<Placeholder titulo="Editar Pasivo" subtitulo="Actualiza los datos de la deuda" claseBody="mod-pasivo-form mod-pasivo-editar" />} />

        <Route path="/cuotas" element={<Placeholder titulo="Pasivos con Cuotas Disponibles" subtitulo="Consulta la tabla de amortización de tus pasivos activos" claseBody="mod-lista-pasivos mod-pasivos-cuotas" />} />
        <Route path="/cuotas/:pasivoId" element={<Placeholder titulo="Tabla de Cuotas" subtitulo="Amortización del pasivo" claseBody="mod-cuotas" />} />
        <Route path="/cuotas/:pasivoId/:cuotaId" element={<Placeholder titulo="Detalle de Cuota" subtitulo="Información completa de la cuota" claseBody="mod-cuotas" />} />

        <Route path="/pagos" element={<Placeholder titulo="Registrar Pago o Aporte" subtitulo="Elige qué deseas registrar" claseBody="mod-pago-selector" />} />
        <Route path="/pagos/registrar-pago" element={<Placeholder titulo="Registrar Pago" subtitulo="Pago de una cuota" claseBody="mod-pagos" />} />
        <Route path="/pagos/registrar-aporte" element={<Placeholder titulo="Registrar Aporte" subtitulo="Aporte a una meta" claseBody="mod-pagos" />} />
        <Route path="/pagos/historial" element={<Placeholder titulo="Historial de Pagos" subtitulo="Pagos y aportes registrados" claseBody="mod-pagos" />} />

        <Route path="/metas" element={<Placeholder titulo="Mis Metas" subtitulo="Construye tus objetivos financieros" claseBody="mod-lista-metas" />} />
        <Route path="/metas/nueva" element={<Placeholder titulo="Nueva Meta" subtitulo="Define un nuevo objetivo financiero" claseBody="mod-meta-form mod-meta-crear" />} />
        <Route path="/metas/:id" element={<Placeholder titulo="Detalle de Meta" subtitulo="Información completa del objetivo" claseBody="mod-meta-detalle" />} />
        <Route path="/metas/:id/editar" element={<Placeholder titulo="Editar Meta" subtitulo="Actualiza los datos de tu objetivo" claseBody="mod-meta-form mod-meta-editar" />} />

        <Route path="/balance-financiero" element={<Placeholder titulo="Balance Financiero" subtitulo="Patrimonio Neto" claseBody="mod-balance" />} />
        <Route path="/indicadores" element={<Placeholder titulo="Indicadores Financieros" subtitulo="Evalúa tu salud financiera de un vistazo" claseBody="mod-indicadores" />} />
        <Route path="/flujo-caja" element={<Placeholder titulo="Flujo de Caja" subtitulo="Proyección de ingresos y egresos" claseBody="mod-flujo-caja" />} />

        <Route path="/alertas" element={<Placeholder titulo="Mis Alertas" subtitulo="Configura avisos para riesgos financieros" claseBody="mod-alertas mod-alertas-lista" />} />
        <Route path="/alertas/nueva" element={<Placeholder titulo="Nueva Alerta" subtitulo="Define cuándo quieres recibir un aviso" claseBody="mod-alertas mod-alertas-configurar" />} />
        <Route path="/alertas/historial" element={<Placeholder titulo="Historial de Alertas" subtitulo="Consulta las notificaciones generadas" claseBody="mod-alertas mod-alertas-historial" />} />
        <Route path="/alertas/:id" element={<Placeholder titulo="Detalle de Alerta" subtitulo="Información de la alerta" claseBody="mod-alertas mod-alertas-detalle" />} />
        <Route path="/alertas/:id/editar" element={<Placeholder titulo="Editar Alerta" subtitulo="Actualiza la configuración de esta alerta" claseBody="mod-alertas mod-alertas-configurar" />} />

        <Route path="/reportes" element={<Placeholder titulo="Historial de Reportes" subtitulo="Consulta los reportes generados anteriormente" claseBody="mod-reportes" />} />
        <Route path="/reportes/generar" element={<Placeholder titulo="Generar Reporte" subtitulo="Selecciona el tipo y periodo del reporte" claseBody="mod-reportes" />} />
        <Route path="/reportes/vista-previa" element={<Placeholder titulo="Vista Previa del Reporte" subtitulo="Revisa el reporte antes de descargarlo" claseBody="mod-reportes" />} />
        <Route path="/reportes/:id" element={<Placeholder titulo="Detalle de Reporte" subtitulo="Consulta la información de un reporte generado anteriormente" claseBody="mod-reportes" />} />

        <Route path="/asistente" element={<Placeholder titulo="Asistente Inteligente" subtitulo="Pregunta lo que necesites sobre FluneXy" claseBody="mod-asistente" />} />

        <Route path="*" element={<Placeholder titulo="Página no encontrada" subtitulo="La dirección no existe" claseBody="" />} />
      </Route>
    </Routes>
  )
}
