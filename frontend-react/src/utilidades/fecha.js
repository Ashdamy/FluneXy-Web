// Fechas en el formato del prototipo: "3 Jun 2025" y "08:30 am".
// Las fechas se guardan como texto local "2025-06-03T08:30" (sin zona
// horaria), que es lo que entiende new Date() y lo que da <input type="date">.

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

const dosDigitos = (numero) => String(numero).padStart(2, '0')

export function formatoFecha(iso) {
  const fecha = new Date(iso)
  return `${fecha.getDate()} ${MESES[fecha.getMonth()]} ${fecha.getFullYear()}`
}

export function formatoHora(iso) {
  const fecha = new Date(iso)
  const horas = fecha.getHours() % 12 || 12
  return `${dosDigitos(horas)}:${dosDigitos(fecha.getMinutes())} ${fecha.getHours() < 12 ? 'am' : 'pm'}`
}

// Dia "YYYY-MM-DD" de una fecha (por defecto hoy), en hora local.
export function diaISO(fecha = new Date()) {
  return `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}`
}

// "YYYY-MM-DDTHH:MM" de hace "dias" dias a la hora indicada. Para datos de prueba.
export function haceDias(dias, hora) {
  const fecha = new Date()
  fecha.setDate(fecha.getDate() - dias)
  return `${diaISO(fecha)}T${hora}`
}

// "HOY · 3 Jun 2025", "AYER · 2 Jun 2025" o solo "1 Jun 2025".
export function etiquetaDia(iso) {
  const ayer = new Date()
  ayer.setDate(ayer.getDate() - 1)
  const dia = iso.slice(0, 10)
  const prefijo = dia === diaISO() ? 'HOY · ' : dia === diaISO(ayer) ? 'AYER · ' : ''
  return prefijo + formatoFecha(iso)
}
