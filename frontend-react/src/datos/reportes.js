// Historial de reportes ("API falsa" en memoria) con la forma de la tabla
// reportes_generados: tipo, periodo, formato y fecha de generacion. Como dice
// el prototipo, no se guarda el archivo; el contenido se calcula al verlo.

import { mesActual, nombreMes } from './flujoCaja.js'
import { haceDias } from '../utilidades/fecha.js'

// Tipos de bd/02_insert_data.sql (BALANCE, FLUJOCAJA, INDICADORES) con el icono y color del prototipo.
export const TIPOS_REPORTE = {
  BALANCE: { nombre: 'Balance Financiero', icono: 'ph-chart-bar', color: 'hist-icono-verde' },
  FLUJOCAJA: { nombre: 'Flujo de Caja', icono: 'ph-currency-circle-dollar', color: 'hist-icono-indigo' },
  INDICADORES: { nombre: 'Indicadores', icono: 'ph-chart-line-up', color: 'hist-icono-amber' },
}

// CHECK ck_formato de la BD.
export const FORMATOS = ['PDF', 'EXCEL']

// "2026-06" -> "Junio 2026"; "2026-Q2" -> "2do trimestre 2026" (la BD usa los dos).
export function textoPeriodo(periodo) {
  const trimestre = periodo.match(/^(\d{4})-Q([1-4])$/)
  if (trimestre) return `${['1er', '2do', '3er', '4to'][trimestre[2] - 1]} trimestre ${trimestre[1]}`
  return nombreMes(periodo)
}

// Mes "YYYY-MM" de hace n meses.
const mesAtras = (n) => {
  const d = new Date()
  d.setDate(1)
  d.setMonth(d.getMonth() - n)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

let reportes = [
  { id: 1, tipo: 'BALANCE', periodo: mesAtras(4), formato: 'PDF', fechaGeneracion: haceDias(100, '09:00') },
  { id: 2, tipo: 'INDICADORES', periodo: mesAtras(3), formato: 'EXCEL', fechaGeneracion: haceDias(70, '10:30') },
  { id: 3, tipo: 'FLUJOCAJA', periodo: mesAtras(2), formato: 'EXCEL', fechaGeneracion: haceDias(40, '14:05') },
  { id: 4, tipo: 'BALANCE', periodo: mesAtras(1), formato: 'PDF', fechaGeneracion: haceDias(10, '14:00') },
]

// Del mas reciente al mas antiguo.
export function listarReportes() {
  return [...reportes].sort((a, b) => b.fechaGeneracion.localeCompare(a.fechaGeneracion))
}

export function obtenerReporte(id) {
  return reportes.find((reporte) => reporte.id === Number(id))
}

// RN16.1.3 y RN16.6.1-2: se guarda la fecha y hora del momento en que se genera.
export function generarReporte({ tipo, formato, periodo = mesActual() }) {
  const ahora = new Date()
  const fechaGeneracion = `${haceDias(0, '00:00').slice(0, 10)}T${ahora.toTimeString().slice(0, 5)}`
  const nuevo = { id: Math.max(0, ...reportes.map((r) => r.id)) + 1, tipo, periodo, formato, fechaGeneracion }
  reportes = [...reportes, nuevo]
  return nuevo
}
