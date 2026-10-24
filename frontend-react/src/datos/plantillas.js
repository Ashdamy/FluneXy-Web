// Datos de prueba de Plantillas ("API falsa" en memoria, como fondos.js).
// La forma sigue la tabla plantillas de bd/01_create_tables.sql: tampoco
// tiene "nombre"; el texto que se muestra es la descripcion o la categoria.
// Las categorias son las mismas de movimientos (misma tabla en la BD).

import { diaISO } from '../utilidades/fecha.js'

// "frecuencia" completa la frase "Día 5 · de cada mes".
export const RECURRENCIAS = {
  MENSUAL: { etiqueta: 'Mensual', icono: 'ph-calendar', cadaDias: null, vecesPorMes: 1, frecuencia: 'de cada mes' },
  QUINCENAL: { etiqueta: 'Quincenal', icono: 'ph-calendar-blank', cadaDias: 15, vecesPorMes: 2, frecuencia: 'y cada 15 días' },
  SEMANAL: { etiqueta: 'Semanal', icono: 'ph-calendar-blank', cadaDias: 7, vecesPorMes: 4, frecuencia: 'y cada 7 días' },
}

const anio = new Date().getFullYear()

let plantillas = [
  {
    id: 1, tipo: 'gasto', categoria: 'Otros gastos', descripcion: 'Arriendo', monto: 1200000, fondoId: 1,
    recurrencia: 'MENSUAL', dia: 5, inicio: `${anio}-06-01`, fin: `${anio}-12-31`, activo: true,
    // ponytail: el motivo de la falla lo registrara el backend al ejecutar; aqui es fijo
    ultimaFalla: 'Saldo insuficiente',
  },
  {
    id: 2, tipo: 'gasto', categoria: 'Servicios', descripcion: 'Internet ETB', monto: 95000, fondoId: 2,
    recurrencia: 'MENSUAL', dia: 10, inicio: `${anio}-01-10`, fin: `${anio}-12-10`, activo: true, ultimaFalla: null,
  },
  {
    id: 3, tipo: 'ingreso', categoria: 'Salario', descripcion: 'Salario', monto: 2500000, fondoId: 1,
    recurrencia: 'MENSUAL', dia: 30, inicio: `${anio}-01-30`, fin: `${anio}-12-30`, activo: true, ultimaFalla: null,
  },
  {
    id: 4, tipo: 'gasto', categoria: 'Entretenimiento', descripcion: 'Netflix', monto: 45000, fondoId: 2,
    recurrencia: 'MENSUAL', dia: 5, inicio: `${anio - 1}-01-05`, fin: `${anio - 1}-12-05`, activo: true, ultimaFalla: null,
  },
]

// Dias de ejecucion ("YYYY-MM-DD") entre inicio y fin.
//   MENSUAL: el "dia" de cada mes (o el ultimo dia si el mes es mas corto).
//   QUINCENAL / SEMANAL: la primera vez en el "dia" y luego cada 15 / 7 dias.
export function fechasEjecucion({ recurrencia, dia, inicio, fin }) {
  if (!inicio || !fin || fin < inicio) return []
  const enMes = (anioMes, mes) => new Date(anioMes, mes, Math.min(dia, new Date(anioMes, mes + 1, 0).getDate()))
  const desde = new Date(`${inicio}T00:00`)
  let fecha = enMes(desde.getFullYear(), desde.getMonth())
  if (fecha < desde) fecha = enMes(desde.getFullYear(), desde.getMonth() + 1)

  const fechas = []
  const { cadaDias } = RECURRENCIAS[recurrencia]
  while (diaISO(fecha) <= fin) {
    fechas.push(diaISO(fecha))
    fecha = cadaDias
      ? new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + cadaDias)
      : enMes(fecha.getFullYear(), fecha.getMonth() + 1)
  }
  return fechas
}

// Todo lo que se calcula de una plantilla para mostrarla.
export function resumenPlantilla(plantilla) {
  const hoy = diaISO()
  const fechas = fechasEjecucion(plantilla)
  const proxima = plantilla.activo ? fechas.find((fecha) => fecha >= hoy) : undefined
  const [anioInicio, mesInicio] = plantilla.inicio.split('-').map(Number)
  const [anioFin, mesFin] = plantilla.fin.split('-').map(Number)
  return {
    total: fechas.length,
    completadas: fechas.filter((fecha) => fecha < hoy).length,
    ultima: fechas.findLast((fecha) => fecha < hoy),
    proxima,
    diasParaProxima: proxima ? Math.round((new Date(`${proxima}T00:00`) - new Date(`${hoy}T00:00`)) / 86400000) : null,
    vencida: plantilla.fin < hoy,
    meses: (anioFin - anioInicio) * 12 + mesFin - mesInicio + 1,
  }
}

export function tituloPlantilla(plantilla) {
  return plantilla.descripcion || plantilla.categoria
}

export function listarPlantillas() {
  return plantillas
}

export function obtenerPlantilla(id) {
  return plantillas.find((plantilla) => plantilla.id === Number(id))
}

export function crearPlantilla(datos) {
  const nueva = { ...datos, id: Math.max(0, ...plantillas.map((p) => p.id)) + 1, activo: true, ultimaFalla: null }
  plantillas = [...plantillas, nueva]
  return nueva
}

export function actualizarPlantilla(id, cambios) {
  plantillas = plantillas.map((plantilla) => (plantilla.id === Number(id) ? { ...plantilla, ...cambios } : plantilla))
}

export function desactivarPlantilla(id) {
  actualizarPlantilla(id, { activo: false })
}
