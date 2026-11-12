// Datos de prueba de Metas ("API falsa" en memoria, como fondos.js).
// La forma sigue la tabla metas de bd/01_create_tables.sql: nombre, fondo
// asociado, monto objetivo, monto ahorrado, fecha objetivo y estado. La BD
// no tiene descripcion (conflicto 11), categoria (conflicto 17) ni fecha de
// creacion.
// Las metas del prototipo vencian en 2025; aqui la fecha se calcula desde
// hoy para conservar los "6 meses", "36 meses" y "3 meses" del prototipo.

import { diaISO, diasHasta, formatoMesAnio, sumarMeses } from '../utilidades/fecha.js'

const hoy = diaISO()

let metas = [
  { id: 1, fondoId: 2, nombre: 'Moto Nueva', montoObjetivo: 12000000, montoAhorrado: 6000000, fechaObjetivo: sumarMeses(hoy, 6), activo: true },
  { id: 2, fondoId: 1, nombre: 'Vivienda', montoObjetivo: 80000000, montoAhorrado: 15000000, fechaObjetivo: sumarMeses(hoy, 36), activo: true },
  { id: 3, fondoId: 1, nombre: 'Viaje a México', montoObjetivo: 5000000, montoAhorrado: 2500000, fechaObjetivo: sumarMeses(hoy, 3), activo: true },
  { id: 4, fondoId: 1, nombre: 'Fondo Estudios', montoObjetivo: 8000000, montoAhorrado: 8000000, fechaObjetivo: sumarMeses(hoy, -10), activo: true },
  // Como la meta 10 de bd/02_insert_data.sql. El listado del prototipo solo muestra activas.
  { id: 5, fondoId: 3, nombre: 'Vacaciones Familiares', montoObjetivo: 6000000, montoAhorrado: 0, fechaObjetivo: sumarMeses(hoy, 8), activo: false },
]

export function listarMetas() {
  return metas
}

export function obtenerMeta(id) {
  return metas.find((meta) => meta.id === Number(id))
}

// Metas activas (RN09.2.4 y RN09.4.4: una inactiva sale del seguimiento).
export function metasActivas() {
  return metas.filter((meta) => meta.activo)
}

// "Completada" se deriva del monto: ahorrado >= objetivo.
export const metaCompletada = (meta) => meta.montoAhorrado >= meta.montoObjetivo

// Las que siguen vigentes y aun no llegan al objetivo. Son las "metas activas"
// del resumen del prototipo: la completada no cuenta.
export function metasEnProgreso() {
  return metasActivas().filter((meta) => !metaCompletada(meta))
}

// RN09.2.3: porcentaje de progreso. Hacia abajo, como el prototipo (15 de 80 = 18%),
// para que una meta no muestre 100% antes de cumplirse.
export function progresoMeta(meta, aporte = 0) {
  return Math.min(100, Math.floor(((meta.montoAhorrado + aporte) / meta.montoObjetivo) * 100))
}

// Meses completos que faltan desde hoy hasta la fecha objetivo (RN09.1.5).
// 0 si es este mismo mes, si falta menos de un mes o si la fecha ya paso.
export function mesesRestantes(fechaObjetivo) {
  const [a1, m1, d1] = hoy.split('-').map(Number)
  const [a2, m2, d2] = fechaObjetivo.split('-').map(Number)
  return Math.max(0, (a2 - a1) * 12 + (m2 - m1) - (d2 < d1 ? 1 : 0))
}

// Ahorro mensual requerido: lo que falta dividido entre los meses restantes
// (conflicto 15, decidido asi). Con 0 meses es todo lo que falta (RN09.1.6).
// Se redondea hacia arriba al peso para que la suma alcance el objetivo.
export function ahorroMensual({ montoObjetivo, montoAhorrado = 0, fechaObjetivo }) {
  const falta = Math.max(0, montoObjetivo - montoAhorrado)
  return Math.ceil(falta / Math.max(1, mesesRestantes(fechaObjetivo)))
}

// RN09.2.4: estado calculado con el progreso y el tiempo restante. La
// documentacion no da los limites; estos reproducen los cuatro ejemplos del
// prototipo y estan anotados en docs/pendientes.md.
export const ESTADOS_META = {
  progreso: { etiqueta: 'En progreso', codigo: 'EN_PROCESO' },
  esfuerzo: { etiqueta: 'Requiere esfuerzo', codigo: 'REQUIERE_ESFUERZO' },
  'casi-lista': { etiqueta: '¡Casi lista!', codigo: 'CASI_LISTA' },
  completada: { etiqueta: 'Completada', codigo: 'COMPLETADA' },
  inactiva: { etiqueta: 'Inactiva', codigo: 'INACTIVA' },
}

export function estadoMeta(meta) {
  let clave = 'progreso'
  const progreso = progresoMeta(meta)
  if (!meta.activo) clave = 'inactiva'
  else if (metaCompletada(meta)) clave = 'completada'
  // RN09.1.7: sin aportes la meta sigue "En progreso".
  else if (meta.montoAhorrado > 0 && progreso < 25) clave = 'esfuerzo'
  else if (progreso >= 50 && mesesRestantes(meta.fechaObjetivo) <= 3) clave = 'casi-lista'
  return { clave, ...ESTADOS_META[clave] }
}

// "Dic 2025 • 6 meses" del listado.
export function textoPlazo(fechaObjetivo) {
  const meses = mesesRestantes(fechaObjetivo)
  return `${formatoMesAnio(fechaObjetivo)} • ${meses} ${meses === 1 ? 'mes' : 'meses'}`
}

export const diasRestantes = (fechaObjetivo) => Math.max(0, diasHasta(fechaObjetivo))

// RN09.1.7: empieza sin ahorro y activa. RN09.1.8: no toca el saldo del fondo.
export function crearMeta(datos) {
  const nueva = { ...datos, id: Math.max(0, ...metas.map((m) => m.id)) + 1, montoAhorrado: 0, activo: true }
  metas = [...metas, nueva]
  return nueva
}

// RN09.3.8: editar no cambia el monto ahorrado (solo los aportes lo cambian).
export function actualizarMeta(id, { nombre, montoObjetivo, fechaObjetivo }) {
  metas = metas.map((meta) => (meta.id === Number(id) ? { ...meta, nombre, montoObjetivo, fechaObjetivo } : meta))
}

// RN09.4.3 y RN09.4.6: solo cambia el estado; se conserva todo lo demas.
export function desactivarMeta(id) {
  metas = metas.map((meta) => (meta.id === Number(id) ? { ...meta, activo: false } : meta))
}

export function sumarAporteMeta(id, monto) {
  metas = metas.map((meta) => (meta.id === Number(id) ? { ...meta, montoAhorrado: meta.montoAhorrado + monto } : meta))
}
