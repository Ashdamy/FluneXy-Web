// Fechas en el formato del prototipo: "3 Jun 2025" y "08:30 am".
// Las fechas se guardan como texto local "2025-06-03T08:30" (sin zona
// horaria), que es lo que entiende new Date() y lo que da <input type="date">.

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

const dosDigitos = (numero) => String(numero).padStart(2, '0')

export function formatoFecha(iso) {
  // Un dia solo ("2025-06-03") se lee como hora local; sin la "T" JavaScript lo toma como UTC.
  const fecha = new Date(iso.length === 10 ? `${iso}T00:00` : iso)
  return `${fecha.getDate()} ${MESES[fecha.getMonth()]} ${fecha.getFullYear()}`
}

export function formatoHora(iso) {
  const fecha = new Date(iso)
  const horas = fecha.getHours() % 12 || 12
  return `${dosDigitos(horas)}:${dosDigitos(fecha.getMinutes())} ${fecha.getHours() < 12 ? 'am' : 'pm'}`
}

const MESES_LARGOS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

// "Lunes, 5 de junio 2025", como el banner de proxima ejecucion del prototipo.
export function formatoFechaLarga(iso) {
  const fecha = new Date(iso.length === 10 ? `${iso}T00:00` : iso)
  return `${DIAS_SEMANA[fecha.getDay()]}, ${fecha.getDate()} de ${MESES_LARGOS[fecha.getMonth()]} ${fecha.getFullYear()}`
}

// Dia "YYYY-MM-DD" de una fecha (por defecto hoy), en hora local.
export function diaISO(fecha = new Date()) {
  return `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}`
}

// Suma (o resta) meses a un dia "YYYY-MM-DD". Si el mes destino es mas corto
// se usa su ultimo dia: 31 Ene + 1 mes = 28 Feb.
export function sumarMeses(dia, meses) {
  const [anio, mes, numero] = dia.split('-').map(Number)
  const ultimoDia = new Date(anio, mes - 1 + meses + 1, 0).getDate()
  return diaISO(new Date(anio, mes - 1 + meses, Math.min(numero, ultimoDia)))
}

// "Ene 2028"
export function formatoMesAnio(dia) {
  const [anio, mes] = dia.split('-').map(Number)
  return `${MESES[mes - 1]} ${anio}`
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
