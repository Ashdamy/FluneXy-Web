// Datos de prueba de Pasivos ("API falsa" en memoria, como fondos.js).
// La forma sigue la tabla pasivos de bd/01_create_tables.sql.
//
// Relacion con Cuotas: las cuotas no se guardan aparte. tablaAmortizacion()
// las genera a partir de los terminos del pasivo (valor inicial, tasa, plazo,
// amortizacion y fecha de inicio), igual que las filas de la tabla cuotas de
// la BD, y "cuotasPagadas" marca cuantas estan pagadas. El modulo Cuotas
// importara de aqui; Pagos sumara cuotasPagadas y bajara saldoActual.

import { valorTotalActivos } from './activos.js'
import { diaISO, sumarMeses } from '../utilidades/fecha.js'

// Categorias de aplica_a = 'PASIVO' en bd/02_insert_data.sql, en el orden del
// prototipo. "color" es la clase de la tarjeta; el prototipo solo trae
// ambar, roja y sky, asi que las demas reutilizan esas.
export const CATEGORIAS_PASIVO = [
  { nombre: 'Tarjeta de Crédito', icono: 'ph-credit-card', color: 'deuda-ambar' },
  { nombre: 'Crédito de vehículo', icono: 'ph-motorcycle', color: 'deuda-roja' },
  { nombre: 'Crédito hipotecario', icono: 'ph-house', color: 'deuda-sky' },
  { nombre: 'Préstamo personal', icono: 'ph-bank', color: 'deuda-ambar' },
  { nombre: 'Crédito educativo', icono: 'ph-books', color: 'deuda-sky' },
  { nombre: 'Otros pasivos', icono: 'ph-dots-three', color: 'deuda-roja' },
]

export function categoriaPasivo(nombre) {
  return CATEGORIAS_PASIVO.find((categoria) => categoria.nombre === nombre) ?? CATEGORIAS_PASIVO.at(-1)
}

// ck_amortizacion de la BD: FRANCESA, ALEMANA o AMERICANA.
export const AMORTIZACIONES = {
  FRANCESA: { etiqueta: 'Francesa', icono: 'ph-calculator', ayuda: 'Francesa: cuota fija, interés decrece con el tiempo' },
  ALEMANA: { etiqueta: 'Alemana', icono: 'ph-calculator', ayuda: 'Alemana: abono a capital fijo, la cuota decrece con el tiempo' },
  AMERICANA: { etiqueta: 'Americana', icono: 'ph-calculator', ayuda: 'Americana: cada mes solo intereses, el capital se paga en la última cuota' },
}

// Reglas de la BD para validar los terminos del credito:
// tasa_interes_mensual DECIMAL(5,2) -> hasta 999,99 con 2 decimales;
// plazo_meses INT con ck_plazo > 0.
export const PATRON_TASA = '\\d{1,3}([.,]\\d{1,2})?'
export const PATRON_PLAZO = '[1-9]\\d{0,2}'
export const leerTasa = (texto) => Number(String(texto).replace(',', '.'))

// Fechas relativas a hoy para que las cuotas pagadas coincidan con el tiempo transcurrido.
const haceMeses = (meses, dia) => sumarMeses(`${diaISO().slice(0, 8)}${String(dia).padStart(2, '0')}`, -meses)

let pasivos = [
  { id: 1, nombre: 'Tarjeta Bancolombia', categoria: 'Tarjeta de Crédito', valorInicial: 5000000, saldoActual: 3500000, tasaMensual: 2.5, plazoMeses: 12, amortizacion: 'FRANCESA', fechaInicio: haceMeses(4, 1), cuotasPagadas: 4, activo: true },
  { id: 2, nombre: 'Crédito Moto NKD', categoria: 'Crédito de vehículo', valorInicial: 10000000, saldoActual: 8200000, tasaMensual: 1.8, plazoMeses: 36, amortizacion: 'FRANCESA', fechaInicio: haceMeses(7, 15), cuotasPagadas: 7, activo: true },
  { id: 3, nombre: 'Crédito Educativo', categoria: 'Crédito educativo', valorInicial: 3800000, saldoActual: 2100000, tasaMensual: 1, plazoMeses: 24, amortizacion: 'FRANCESA', fechaInicio: haceMeses(11, 10), cuotasPagadas: 11, activo: true },
  { id: 4, nombre: 'Préstamo Personal', categoria: 'Préstamo personal', valorInicial: 6000000, saldoActual: 0, tasaMensual: 2, plazoMeses: 12, amortizacion: 'ALEMANA', fechaInicio: haceMeses(14, 5), cuotasPagadas: 12, activo: false },
]

const redondear = (valor) => Math.round(valor * 100) / 100

// Cuotas del pasivo, con la misma forma que la tabla cuotas de la BD:
// valorCuota = abonoCapital + interes (ck_composicion_cuota). Se redondea a
// 2 decimales como DECIMAL(12,2); la ultima cuota absorbe la diferencia
// para que el saldo termine exactamente en 0.
export function tablaAmortizacion({ valorInicial, tasaMensual, plazoMeses, amortizacion, fechaInicio, cuotasPagadas = 0 }) {
  const tasa = tasaMensual / 100
  const cuotaFija = tasa === 0 ? valorInicial / plazoMeses : (valorInicial * tasa) / (1 - (1 + tasa) ** -plazoMeses)
  const cuotas = []
  let saldo = valorInicial
  for (let numero = 1; numero <= plazoMeses; numero++) {
    const interes = redondear(saldo * tasa)
    let abonoCapital =
      amortizacion === 'FRANCESA' ? redondear(cuotaFija) - interes
        : amortizacion === 'ALEMANA' ? redondear(valorInicial / plazoMeses)
          : 0
    if (numero === plazoMeses) abonoCapital = saldo
    abonoCapital = redondear(abonoCapital)
    saldo = redondear(saldo - abonoCapital)
    cuotas.push({
      numero,
      fechaVencimiento: sumarMeses(fechaInicio, numero),
      valorCuota: redondear(abonoCapital + interes),
      abonoCapital,
      interes,
      saldoRestante: saldo,
      pagada: numero <= cuotasPagadas,
    })
  }
  return cuotas
}

// Al registrar un pasivo que ya tiene abonos, las cuotas pagadas se estiman
// como las que dejan el saldo por encima o igual al saldo actual.
function estimarCuotasPagadas(pasivo) {
  return tablaAmortizacion(pasivo).filter((cuota) => cuota.saldoRestante >= pasivo.saldoActual).length
}

export function progresoPago(pasivo) {
  return pasivo.valorInicial > 0 ? Math.round(((pasivo.valorInicial - pasivo.saldoActual) / pasivo.valorInicial) * 100) : 0
}

export function listarPasivos() {
  return pasivos
}

export function obtenerPasivo(id) {
  return pasivos.find((pasivo) => pasivo.id === Number(id))
}

// Saldo pendiente de los pasivos vigentes.
export function totalPasivos() {
  return pasivos.filter((pasivo) => pasivo.activo).reduce((total, pasivo) => total + pasivo.saldoActual, 0)
}

// Indice de endeudamiento = pasivos / activos (el prototipo de Indicadores
// muestra 5.9% con $13.8M de pasivos y $235M de activos).
export function indiceEndeudamiento() {
  const activos = valorTotalActivos()
  const porcentaje = activos > 0 ? (totalPasivos() / activos) * 100 : 0
  const nivel = porcentaje >= 40 ? 'alto' : porcentaje >= 20 ? 'moderado' : 'bajo'
  return { porcentaje, nivel, sinActivos: activos === 0 }
}

export function crearPasivo(datos) {
  const nuevo = { ...datos, id: Math.max(0, ...pasivos.map((p) => p.id)) + 1, activo: true }
  nuevo.cuotasPagadas = estimarCuotasPagadas(nuevo)
  pasivos = [...pasivos, nuevo]
  return nuevo
}

export function actualizarPasivo(id, cambios) {
  pasivos = pasivos.map((pasivo) => (pasivo.id === Number(id) ? { ...pasivo, ...cambios } : pasivo))
}

export function desactivarPasivo(id) {
  actualizarPasivo(id, { activo: false })
}
