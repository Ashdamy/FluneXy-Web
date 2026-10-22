// Formato de pesos colombianos como en el prototipo: 2450000 -> "$2.450.000".
export function formatoPesos(valor) {
  const texto = `$${Math.abs(valor).toLocaleString('es-CO')}`
  return valor < 0 ? `-${texto}` : texto
}

// Convierte lo que escribe el usuario ("2.450.000" o "2450000") en numero.
export function leerPesos(texto) {
  return Number(texto.replace(/\./g, '')) || 0
}

// Patron para <input pattern>: digitos, con o sin puntos de miles.
export const PATRON_PESOS = '\\d+|\\d{1,3}(\\.\\d{3})+'
