// Historial de pagos y aportes ("API falsa" en memoria), con la forma de las
// tablas pagos y aportes de bd/01_create_tables.sql. En la BD un pago apunta a
// id_cuota; aqui las cuotas no se guardan, asi que va (pasivoId, numeroCuota).

import { actualizarFondo, obtenerFondo } from './fondos.js'
import { obtenerMeta, sumarAporteMeta } from './metas.js'
import { errorSaldo } from './movimientos.js'
import { maximoAPagar, obtenerPasivo, pagarProximaCuota, proximaCuota, tablaAmortizacion } from './pasivos.js'
import { diaISO, diasHasta, haceDias } from '../utilidades/fecha.js'
import { formatoPesos, redondear } from '../utilidades/moneda.js'

const hace = (dias) => haceDias(dias, '12:00').slice(0, 10)
const valorDeCuota = (pasivoId, numero) => tablaAmortizacion(obtenerPasivo(pasivoId))[numero - 1].valorCuota

let pagos = [
  { id: 1, pasivoId: 2, numeroCuota: 6, fondoId: 1, monto: valorDeCuota(2, 6), esAnticipado: false, fecha: hace(3) },
  { id: 2, pasivoId: 1, numeroCuota: 9, fondoId: 1, monto: valorDeCuota(1, 9), esAnticipado: false, fecha: hace(12) },
  { id: 3, pasivoId: 3, numeroCuota: 9, fondoId: 2, monto: valorDeCuota(3, 9), esAnticipado: true, fecha: hace(20) },
]

let aportes = [{ id: 1, metaId: 1, fondoId: 2, monto: 300000, fecha: hace(8) }]

const descontarDeFondo = (fondoId, monto) => actualizarFondo(fondoId, { saldo: redondear(obtenerFondo(fondoId).saldo - monto) })

// Lo que ya se pago de una cuota (una cuota puede tener varios pagos).
export function abonadoACuota(pasivoId, numeroCuota) {
  const pagosCuota = pagos.filter((pago) => pago.pasivoId === pasivoId && pago.numeroCuota === numeroCuota)
  return redondear(pagosCuota.reduce((total, pago) => total + pago.monto, 0))
}

// RN05.0.1: toda salida de dinero valida el saldo del fondo.
const errorFondo = (fondoId, monto) => errorSaldo({ fondoId, tipo: 'gasto', monto })

// Motivo por el que no se puede registrar el pago ('' si se puede).
export function errorPago({ pasivo, fondoId, monto, esAnticipado }) {
  const cuota = proximaCuota(pasivo)
  const abonado = abonadoACuota(pasivo.id, cuota.numero)
  if (esAnticipado) {
    // RN11.3.3: un pago anticipado se registra antes del vencimiento.
    if (diasHasta(cuota.fechaVencimiento) <= 0) return 'Este pago no puede registrarse como anticipado: la cuota ya llegó a su fecha de vencimiento'
    // "El tipo de pago anticipado solo paga la cuota del siguiente mes" (HU11.3).
    const pendiente = redondear(cuota.valorCuota - abonado)
    if (monto > pendiente) return `Un pago anticipado solo cubre esta cuota: máximo ${formatoPesos(pendiente)}`
  }
  const maximo = maximoAPagar(pasivo, abonado)
  if (monto > maximo) return `El monto supera lo que falta por pagar de la deuda: máximo ${formatoPesos(maximo)}`
  return errorFondo(fondoId, monto)
}

export function errorAporte({ fondoId, monto }) {
  return errorFondo(fondoId, monto)
}

export function registrarPago({ pasivoId, fondoId, monto, esAnticipado }) {
  const { numero } = proximaCuota(obtenerPasivo(pasivoId))
  pagarProximaCuota(pasivoId, monto, abonadoACuota(pasivoId, numero))
  descontarDeFondo(fondoId, monto)
  pagos = [{ id: Math.max(0, ...pagos.map((p) => p.id)) + 1, pasivoId, numeroCuota: numero, fondoId, monto, esAnticipado, fecha: diaISO() }, ...pagos]
}

// Se descuenta del fondo y se suma al progreso de la meta.
export function registrarAporte({ metaId, fondoId, monto }) {
  sumarAporteMeta(metaId, monto)
  descontarDeFondo(fondoId, monto)
  aportes = [{ id: Math.max(0, ...aportes.map((a) => a.id)) + 1, metaId, fondoId, monto, fecha: diaISO() }, ...aportes]
}

// Aportes de una meta, del mas reciente al mas antiguo (RN09.4.5: tambien los de antes de desactivarla).
export function aportesDeMeta(metaId) {
  return aportes.filter((aporte) => aporte.metaId === Number(metaId)).sort((a, b) => b.fecha.localeCompare(a.fecha))
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
