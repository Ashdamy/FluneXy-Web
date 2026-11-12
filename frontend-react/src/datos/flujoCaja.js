// Flujo de caja de un mes (MOD12). No es una tabla de la BD: se calcula con
// movimientos, plantillas, cuotas y metas cada vez que se consulta (RN12.1.2,
// RN12.1.4). Que cuenta como "estimado" o "programado" no esta definido en la
// documentacion: ver conflicto 25.

import { ahorroMensual, metasEnProgreso } from './metas.js'
import { listarMovimientos } from './movimientos.js'
import { listarPasivos, tablaAmortizacion } from './pasivos.js'
import { fechasEjecucion, listarPlantillas } from './plantillas.js'
import { diaISO } from '../utilidades/fecha.js'

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

// "Junio 2025" a partir de "2025-06".
export function nombreMes(mes) {
  const [anio, numero] = mes.split('-').map(Number)
  return `${MESES[numero - 1]} ${anio}`
}

export const mesActual = () => diaISO().slice(0, 7)

export function flujoDelMes(mes = mesActual()) {
  const hoy = diaISO()
  const delMes = (dia) => dia.slice(0, 7) === mes

  // RN12.2 y RN12.3: movimientos activos del mes (RN05.4.5) mas las ejecuciones
  // que aun no ocurren de las plantillas activas.
  const movimientos = listarMovimientos().filter((m) => m.activo && delMes(m.fecha))
  const ejecuciones = listarPlantillas()
    .filter((p) => p.activo)
    .flatMap((p) => fechasEjecucion(p).filter((dia) => delMes(dia) && dia > hoy).map(() => p))
  const suma = (tipo) =>
    movimientos.filter((m) => m.tipo === tipo).reduce((t, m) => t + m.monto, 0) +
    ejecuciones.filter((p) => p.tipo === tipo).reduce((t, p) => t + p.monto, 0)

  // RN12.4.1 y RN12.4.3: cada cuota de un pasivo activo que vence en el mes, una sola vez.
  const cuotas = listarPasivos()
    .filter((p) => p.activo)
    .flatMap((p) => tablaAmortizacion(p).filter((c) => delMes(c.fechaVencimiento)))
  const cuotasDeuda = cuotas.reduce((t, c) => t + c.valorCuota, 0)

  // RN12.5.1: metas activas sin cumplir, con su ahorro mensual requerido.
  const metas = metasEnProgreso()
  const ahorroMetas = metas.reduce((t, meta) => t + ahorroMensual(meta), 0)

  const ingresos = suma('ingreso')
  const gastos = suma('gasto')
  // RN12.1.3 y RN12.6.1-2: primero ingresos y egresos, despues el saldo.
  const saldo = ingresos - gastos - cuotasDeuda - ahorroMetas
  // RN12.6.5: sin ningun registro del periodo no se calcula.
  const sinInformacion = movimientos.length === 0 && ejecuciones.length === 0 && cuotas.length === 0 && metas.length === 0

  return { mes, ingresos, gastos, cuotasDeuda, ahorroMetas, saldo, sinInformacion }
}
