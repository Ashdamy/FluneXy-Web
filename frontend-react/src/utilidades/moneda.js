// Formato de pesos colombianos como en el prototipo: 2450000 -> "$2.450.000".
// Se muestran pesos enteros aunque el valor traiga centavos (DECIMAL(12,2)).
export function formatoPesos(valor) {
  const texto = `$${Math.abs(valor).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`
  return valor < 0 ? `-${texto}` : texto
}

// Version corta para textos como "$180M de $235M".
export function formatoCorto(valor) {
  const unidad = (divisor, letra) => `$${(valor / divisor).toLocaleString('es-CO', { maximumFractionDigits: 1 })}${letra}`
  if (Math.abs(valor) >= 1e6) return unidad(1e6, 'M')
  if (Math.abs(valor) >= 1e3) return unidad(1e3, 'K')
  return formatoPesos(valor)
}

// Convierte lo que escribe el usuario ("2.450.000", "2450000" o "2.450.000,75") en numero.
export function leerPesos(texto) {
  return Number(texto.replace(/\./g, '').replace(',', '.')) || 0
}

// Patron para <input pattern>: digitos, con o sin puntos de miles, y hasta 2 decimales con coma.
export const PATRON_PESOS = '(\\d+|\\d{1,3}(\\.\\d{3})+)(,\\d{1,2})?'
