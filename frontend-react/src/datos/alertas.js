// Datos de prueba de Alertas ("API falsa" en memoria). La forma sigue las
// tablas alertas_configuracion (tipo, umbral, estado) y alertas_historial
// (valor detectado, fecha, motivo, notificado) de bd/01_create_tables.sql.
// Los tipos son los 3 del prototipo; la BD de ejemplo trae otros (conflicto 27).
// Generar alertas automaticamente (RN15.6) es trabajo del backend: el
// historial de aqui es fijo.

import { flujoDelMes } from './flujoCaja.js'
import { indiceEndeudamiento } from './pasivos.js'
import { haceDias } from '../utilidades/fecha.js'
import { formatoPesos } from '../utilidades/moneda.js'

const decimal = (valor) => (Number.isInteger(valor) ? String(valor) : valor.toFixed(1))

// "supera" (>=) o "baja de" (<=) el umbral; "origen" es el modulo de donde sale el valor.
export const TIPOS_ALERTA = {
  endeudamiento: {
    nombre: 'Endeudamiento', icono: 'ph-chart-line-down', acento: 'alerta-acento-indigo', simbolo: '≥', origen: 'Balance',
    unidad: '%', formato: (v) => `${decimal(v)}%`, valorActual: () => indiceEndeudamiento().porcentaje,
  },
  liquidez: {
    nombre: 'Liquidez', icono: 'ph-drop-half', acento: 'alerta-acento-violeta', simbolo: '≤', origen: 'Indicadores',
    // ponytail: liquidez fija del prototipo hasta que se defina su formula (conflicto 21)
    unidad: 'x', formato: (v) => `${v.toFixed(1)}x`, valorActual: () => 1.6,
  },
  gasto: {
    nombre: 'Gasto Mensual', icono: 'ph-shopping-cart', acento: 'alerta-acento-verde', simbolo: '≥', origen: 'Movimientos',
    unidad: '$', formato: (v) => formatoPesos(v), valorActual: () => flujoDelMes().gastos,
  },
}

let alertas = [
  { id: 1, tipo: 'endeudamiento', umbral: 35, activo: true },
  { id: 2, tipo: 'liquidez', umbral: 1, activo: true },
  { id: 3, tipo: 'gasto', umbral: 3000000, activo: false },
]

// Fechas relativas a hoy para que "este mes" tenga alertas, como el prototipo.
const historial = [
  { id: 1, alertaId: 1, valor: 35.2, fecha: haceDias(2, '09:14'), motivo: 'Endeudamiento superó 35%', notificado: true },
  { id: 2, alertaId: 1, valor: 35.8, fecha: haceDias(9, '08:02'), motivo: 'Endeudamiento superó 35%', notificado: true },
  { id: 3, alertaId: 2, valor: 0.9, fecha: haceDias(20, '23:40'), motivo: 'Liquidez bajo 1.0x', notificado: true },
  { id: 4, alertaId: 3, valor: 3150000, fecha: haceDias(45, '18:00'), motivo: 'Gasto excesivo del mes', notificado: false },
]

export const tipoDe = (alerta) => TIPOS_ALERTA[alerta.tipo]
export const umbralTexto = (alerta) => tipoDe(alerta).formato(alerta.umbral)
export const valorActual = (alerta) => tipoDe(alerta).valorActual()

export function listarAlertas() {
  return alertas
}

export function obtenerAlerta(id) {
  return alertas.find((alerta) => alerta.id === Number(id))
}

// RN15.1.1-3: la configuracion queda guardada. RN15.4.3: activa o inactiva.
export function crearAlerta(datos) {
  const nueva = { ...datos, id: Math.max(0, ...alertas.map((a) => a.id)) + 1 }
  alertas = [...alertas, nueva]
  return nueva
}

export function actualizarAlerta(id, cambios) {
  alertas = alertas.map((alerta) => (alerta.id === Number(id) ? { ...alerta, ...cambios } : alerta))
}

// RN15.5.2 y RN15.5.4: solo cambia el estado; se conserva la configuracion y su historial.
export function desactivarAlerta(id) {
  actualizarAlerta(id, { activo: false })
}

// RN15.7.1: de la mas reciente a la mas antigua.
export function listarHistorial(alertaId) {
  return historial
    .filter((item) => alertaId === undefined || item.alertaId === Number(alertaId))
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
}

// Alertas generadas en el mes calendario actual.
export const delMesActual = (lista) => lista.filter((item) => item.fecha.slice(0, 7) === haceDias(0, '00:00').slice(0, 7))

// RN15.3.1-2: numero valido para el tipo. La documentacion no da el rango
// (pendiente); se exige mayor que cero y, en porcentajes, hasta 100.
export function errorUmbral(tipo, umbral) {
  if (!(umbral > 0)) return 'El umbral debe ser un número mayor que cero'
  if (TIPOS_ALERTA[tipo].unidad === '%' && umbral > 100) return 'El umbral no puede superar 100%'
  return ''
}
