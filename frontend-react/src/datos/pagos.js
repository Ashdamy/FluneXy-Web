// Historial de pagos y aportes ("API falsa" en memoria), con la forma de las
// tablas pagos y aportes de bd/01_create_tables.sql. En la BD un pago apunta a
// id_cuota; aqui las cuotas no se guardan, asi que va (pasivoId, numeroCuota).

import { actualizarFondo, obtenerFondo } from './fondos.js'
import { obtenerMeta, sumarAporteMeta } from './metas.js'
import { obtenerPasivo, pagarProximaCuota, proximaCuota, tablaAmortizacion } from './pasivos.js'
import { diaISO, haceDias } from '../utilidades/fecha.js'
import { redondear } from '../utilidades/moneda.js'

const hace = (dias) => haceDias(dias, '12:00').slice(0, 10)
const valorDeCuota = (pasivoId, numero) => tablaAmortizacion(obtenerPasivo(pasivoId))[numero - 1].valorCuota

let pagos = [
  { id: 1, pasivoId: 2, numeroCuota: 6, fondoId: 1, monto: valorDeCuota(2, 6), esAnticipado: false, fecha: hace(3) },
  { id: 2, pasivoId: 1, numeroCuota: 9, fondoId: 1, monto: valorDeCuota(1, 9), esAnticipado: false, fecha: hace(12) },
  { id: 3, pasivoId: 3, numeroCuota: 9, fondoId: 2, monto: valorDeCuota(3, 9), esAnticipado: true, fecha: hace(20) },
]

let aportes = [{ id: 1, metaId: 1, fondoId: 2, monto: 300000, fecha: hace(8) }]

// Solo cambia el pasivo: el pago queda registrado con su fondo, pero el saldo del fondo no se toca.
export function registrarPago({ pasivoId, fondoId, monto, esAnticipado }) {
  const { numero } = proximaCuota(obtenerPasivo(pasivoId))
  pagarProximaCuota(pasivoId, monto)
  pagos = [{ id: Math.max(0, ...pagos.map((p) => p.id)) + 1, pasivoId, numeroCuota: numero, fondoId, monto, esAnticipado, fecha: diaISO() }, ...pagos]
}

// Como dice el prototipo: se descuenta del fondo y se suma al progreso de la meta.
export function registrarAporte({ metaId, fondoId, monto }) {
  sumarAporteMeta(metaId, monto)
  actualizarFondo(fondoId, { saldo: redondear(obtenerFondo(fondoId).saldo - monto) })
  aportes = [{ id: Math.max(0, ...aportes.map((a) => a.id)) + 1, metaId, fondoId, monto, fecha: diaISO() }, ...aportes]
}

// Pagos y aportes juntos, del mas reciente al mas antiguo.
export function listarHistorial() {
  const filas = [
    ...pagos.map((pago) => ({
      clave: `pago-${pago.id}`,
      icono: 'ph-money',
      titulo: `Pago Cuota ${pago.numeroCuota}`,
      detalle: obtenerPasivo(pago.pasivoId).nombre,
      monto: pago.monto,
      tipo: pago.esAnticipado ? 'anticipado' : 'normal',
      etiqueta: pago.esAnticipado ? 'Anticipado' : 'Normal',
      fecha: pago.fecha,
    })),
    ...aportes.map((aporte) => {
      const { nombre } = obtenerMeta(aporte.metaId)
      return {
        clave: `aporte-${aporte.id}`,
        icono: 'ph-target',
        titulo: `Aporte ${nombre}`,
        detalle: `Meta: ${nombre}`,
        monto: aporte.monto,
        tipo: 'aporte',
        etiqueta: 'Aporte',
        fecha: aporte.fecha,
      }
    }),
  ]
  return filas.sort((a, b) => b.fecha.localeCompare(a.fecha))
}
