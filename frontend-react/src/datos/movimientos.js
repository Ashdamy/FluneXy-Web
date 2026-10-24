// Datos de prueba de Movimientos ("API falsa" en memoria, igual que fondos.js).
// La forma sigue la tabla movimientos de bd/01_create_tables.sql: no hay
// "nombre", el texto que se muestra es la descripcion (opcional).
// Crear, editar y desactivar mueven el saldo del fondo usando datos/fondos.js.

import { actualizarFondo, obtenerFondo } from './fondos.js'
import { haceDias } from '../utilidades/fecha.js'
import { formatoPesos } from '../utilidades/moneda.js'

// Categorias de bd/02_insert_data.sql, en el orden del prototipo.
export const CATEGORIAS_MOVIMIENTO = {
  ingreso: [
    { nombre: 'Salario', icono: 'ph-briefcase' },
    { nombre: 'Inversión', icono: 'ph-trend-up' },
    { nombre: 'Ventas', icono: 'ph-storefront' },
    { nombre: 'Bonificaciones', icono: 'ph-gift' },
    { nombre: 'Otros ingresos', icono: 'ph-dots-three-circle' },
  ],
  gasto: [
    { nombre: 'Entretenimiento', icono: 'ph-film-slate' },
    { nombre: 'Alimentación', icono: 'ph-bowl-food' },
    { nombre: 'Transporte', icono: 'ph-bus' },
    { nombre: 'Servicios', icono: 'ph-wrench' },
    { nombre: 'Otros gastos', icono: 'ph-dots-three-circle' },
  ],
}

export function iconoCategoria(tipo, nombre) {
  return CATEGORIAS_MOVIMIENTO[tipo].find((categoria) => categoria.nombre === nombre)?.icono ?? 'ph-dots-three-circle'
}

// Texto principal de un movimiento en listas y titulos.
export function tituloMovimiento(movimiento) {
  return movimiento.descripcion || movimiento.categoria
}

// Fechas relativas a hoy para que el listado muestre "HOY" y "AYER" como el prototipo.
let movimientos = [
  { id: 1, tipo: 'ingreso', categoria: 'Salario', fondoId: 1, monto: 2500000, fecha: haceDias(0, '09:12'), descripcion: 'Salario Junio', activo: true },
  { id: 2, tipo: 'gasto', categoria: 'Entretenimiento', fondoId: 2, monto: 45000, fecha: haceDias(0, '08:30'), descripcion: 'Netflix', activo: true },
  { id: 3, tipo: 'gasto', categoria: 'Alimentación', fondoId: 3, monto: 180000, fecha: haceDias(1, '15:45'), descripcion: 'Mercado Éxito', activo: true },
  { id: 4, tipo: 'gasto', categoria: 'Transporte', fondoId: 2, monto: 8400, fecha: haceDias(1, '07:20'), descripcion: 'Transporte', activo: true },
  { id: 5, tipo: 'ingreso', categoria: 'Otros ingresos', fondoId: 1, monto: 2000000, fecha: haceDias(1, '12:00'), descripcion: 'Freelance App', activo: true },
]

// Cuanto suma (ingreso) o resta (gasto) un movimiento al saldo de su fondo.
const efecto = (movimiento) => (movimiento.tipo === 'ingreso' ? movimiento.monto : -movimiento.monto)

function moverSaldo(fondoId, cantidad) {
  const fondo = obtenerFondo(fondoId)
  actualizarFondo(fondoId, { saldo: fondo.saldo + cantidad })
}

// Revisa si un cambio dejaria algun fondo en negativo y devuelve el motivo
// ('' si todo esta bien). Sirve para los tres casos:
//   crear:      errorSaldo(nuevo)
//   editar:     errorSaldo(nuevo, anterior)  (deshace el anterior y aplica el nuevo,
//               aunque cambie de fondo)
//   desactivar: errorSaldo(null, anterior)   (solo deshace el anterior)
export function errorSaldo(nuevo, anterior) {
  const saldos = new Map()
  const mover = (fondoId, cantidad) => saldos.set(fondoId, (saldos.get(fondoId) ?? obtenerFondo(fondoId).saldo) + cantidad)
  if (anterior?.activo) mover(anterior.fondoId, -efecto(anterior))
  if (nuevo) mover(nuevo.fondoId, efecto(nuevo))
  for (const [fondoId, saldo] of saldos) {
    if (saldo < 0) return `${obtenerFondo(fondoId).nombre} quedaría con saldo negativo (${formatoPesos(saldo)})`
  }
  return ''
}

// Mas recientes primero.
export function listarMovimientos() {
  return [...movimientos].sort((a, b) => b.fecha.localeCompare(a.fecha))
}

export function obtenerMovimiento(id) {
  return movimientos.find((movimiento) => movimiento.id === Number(id))
}

export function crearMovimiento(datos) {
  const nuevo = { ...datos, id: Math.max(0, ...movimientos.map((m) => m.id)) + 1, activo: true }
  movimientos = [...movimientos, nuevo]
  moverSaldo(nuevo.fondoId, efecto(nuevo))
  return nuevo
}

export function actualizarMovimiento(id, cambios) {
  const anterior = obtenerMovimiento(id)
  const actualizado = { ...anterior, ...cambios }
  movimientos = movimientos.map((m) => (m.id === anterior.id ? actualizado : m))
  if (anterior.activo) {
    moverSaldo(anterior.fondoId, -efecto(anterior))
    moverSaldo(actualizado.fondoId, efecto(actualizado))
  }
}

// "Los saldos de los fondos asociados serán recalculados automáticamente."
export function desactivarMovimiento(id) {
  const movimiento = obtenerMovimiento(id)
  if (!movimiento.activo) return
  movimientos = movimientos.map((m) => (m.id === movimiento.id ? { ...m, activo: false } : m))
  moverSaldo(movimiento.fondoId, -efecto(movimiento))
}
