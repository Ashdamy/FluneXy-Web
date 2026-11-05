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
import { redondear } from '../utilidades/moneda.js'

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

// Cuotas del pasivo, con la misma forma que la tabla cuotas de la BD:
// valorCuota = abonoCapital + interes (ck_composicion_cuota). Se redondea a
// 2 decimales como DECIMAL(12,2); la ultima cuota absorbe la diferencia
// para que el saldo termine exactamente en 0.
//
// RN08.3.4 y RN08.5.3: si se editan los datos financieros, "saldoBase" y
// "cuotaBase" recalculan las cuotas pendientes con el saldo y el plazo restante.
export function tablaAmortizacion({ valorInicial, tasaMensual, plazoMeses, amortizacion, fechaInicio, cuotasPagadas = 0, saldoBase, cuotaBase = 0 }) {
  const tasa = tasaMensual / 100
  const cuotaFijaDe = (capital, meses) => (tasa === 0 ? capital / meses : (capital * tasa) / (1 - (1 + tasa) ** -meses))
  const cuotas = []
  let saldo = valorInicial
  let cuotaFija = cuotaFijaDe(valorInicial, plazoMeses)
  let abonoFijo = valorInicial / plazoMeses
  for (let numero = 1; numero <= plazoMeses; numero++) {
    if (saldoBase !== undefined && numero === cuotaBase + 1) {
      const mesesRestantes = plazoMeses - cuotaBase
      saldo = saldoBase
      cuotaFija = cuotaFijaDe(saldoBase, mesesRestantes)
      abonoFijo = saldoBase / mesesRestantes
    }
    const interes = redondear(saldo * tasa)
    let abonoCapital =
      amortizacion === 'FRANCESA' ? redondear(cuotaFija) - interes
        : amortizacion === 'ALEMANA' ? redondear(abonoFijo)
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

// Fechas relativas a hoy: las cuotas pagadas ya vencieron y la siguiente vence este mes.
const haceMeses = (meses, dia) => sumarMeses(`${diaISO().slice(0, 8)}${String(dia).padStart(2, '0')}`, -meses)

// Los datos de prueba no tienen abonos extraordinarios: su saldo es el que
// deja la ultima cuota pagada. saldoActual sigue siendo un dato guardado (como
// saldo_actual en la BD), que en Editar Pasivo puede incluir esos abonos.
const conSaldoDeTabla = (pasivo) => ({
  ...pasivo,
  saldoActual: tablaAmortizacion(pasivo)[pasivo.cuotasPagadas - 1]?.saldoRestante ?? pasivo.valorInicial,
})

let pasivos = [
  { id: 1, nombre: 'Tarjeta Bancolombia', categoria: 'Tarjeta de Crédito', valorInicial: 5000000, tasaMensual: 2.5, plazoMeses: 30, amortizacion: 'FRANCESA', fechaInicio: haceMeses(10, 20), cuotasPagadas: 9, activo: true },
  { id: 2, nombre: 'Crédito Moto NKD', categoria: 'Crédito de vehículo', valorInicial: 10000000, tasaMensual: 1.8, plazoMeses: 36, amortizacion: 'FRANCESA', fechaInicio: haceMeses(7, 15), cuotasPagadas: 6, activo: true },
  { id: 3, nombre: 'Crédito Educativo', categoria: 'Crédito educativo', valorInicial: 3800000, tasaMensual: 1, plazoMeses: 20, amortizacion: 'FRANCESA', fechaInicio: haceMeses(10, 25), cuotasPagadas: 9, activo: true },
  { id: 4, nombre: 'Préstamo Personal', categoria: 'Préstamo personal', valorInicial: 6000000, tasaMensual: 2, plazoMeses: 12, amortizacion: 'ALEMANA', fechaInicio: haceMeses(14, 5), cuotasPagadas: 12, activo: false },
].map(conSaldoDeTabla)

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

// Guarda lo que se cambia en Editar Pasivo. Si cambia un dato financiero, las
// cuotas pendientes se recalculan (RN08.3.4). Si se acorta el plazo, no puede
// haber mas cuotas pagadas que cuotas, y con saldo en 0 no queda nada por pagar.
export function editarPasivo(id, cambios) {
  const pasivo = obtenerPasivo(id)
  const { saldoActual, tasaMensual, plazoMeses, amortizacion } = cambios
  const cuotasPagadas = saldoActual === 0 ? plazoMeses : Math.min(pasivo.cuotasPagadas, plazoMeses)
  const cambioFinanciero =
    saldoActual !== pasivo.saldoActual || tasaMensual !== pasivo.tasaMensual || plazoMeses !== pasivo.plazoMeses || amortizacion !== pasivo.amortizacion
  actualizarPasivo(id, { ...cambios, cuotasPagadas, ...(cambioFinanciero && { saldoBase: saldoActual, cuotaBase: cuotasPagadas }) })
}

export function desactivarPasivo(id) {
  actualizarPasivo(id, { activo: false })
}

// Las cuotas se pagan en orden: la proxima es la siguiente al contador.
// undefined si ya estan todas pagadas.
export function proximaCuota(pasivo) {
  return tablaAmortizacion(pasivo)[pasivo.cuotasPagadas]
}

// Una cuota puede tener varios pagos (abonos parciales): "abonado" es lo que ya
// se pago de la proxima cuota. Lo pagado cubre primero el interes de la cuota y
// lo demas abona a capital. Con el valor exacto de la cuota, el resultado es el
// saldo que muestra la tabla de amortizacion.
export function saldoTrasPago(pasivo, monto, abonado = 0) {
  const { interes } = proximaCuota(pasivo)
  const abono = Math.max(0, abonado + monto - interes) - Math.max(0, abonado - interes)
  return Math.max(0, redondear(pasivo.saldoActual - abono))
}

// Lo maximo que se puede pagar: el saldo mas el interes que falta de la cuota.
// Con un monto mayor, el saldo seguiria en 0 y el dinero saldria del fondo sin destino.
export function maximoAPagar(pasivo, abonado = 0) {
  return redondear(pasivo.saldoActual + Math.max(0, proximaCuota(pasivo).interes - abonado))
}

// La cuota queda pagada cuando lo abonado cubre su valor. Si el saldo llega a 0
// con abonos a capital, no queda ninguna cuota por pagar.
export function pagarProximaCuota(id, monto, abonado = 0) {
  const pasivo = obtenerPasivo(id)
  const saldoActual = saldoTrasPago(pasivo, monto, abonado)
  const cubierta = redondear(abonado + monto) >= proximaCuota(pasivo).valorCuota
  const cuotasPagadas = saldoActual === 0 ? pasivo.plazoMeses : pasivo.cuotasPagadas + (cubierta ? 1 : 0)
  actualizarPasivo(id, { cuotasPagadas, saldoActual })
}
