// Datos de prueba de Metas, sacados del prototipo. La forma sigue la tabla metas
// de bd/01_create_tables.sql. Por ahora solo trae lo que necesita Registrar
// Aporte; el modulo Metas agregara el resto.

let metas = [
  { id: 1, fondoId: 2, nombre: 'Moto Nueva', montoObjetivo: 12000000, montoAhorrado: 6000000, activo: true },
  { id: 2, fondoId: 1, nombre: 'Vivienda', montoObjetivo: 80000000, montoAhorrado: 15000000, activo: true },
  { id: 3, fondoId: 1, nombre: 'Viaje a México', montoObjetivo: 5000000, montoAhorrado: 2500000, activo: true },
  { id: 4, fondoId: 1, nombre: 'Fondo Estudios', montoObjetivo: 8000000, montoAhorrado: 8000000, activo: true },
]

export function obtenerMeta(id) {
  return metas.find((meta) => meta.id === Number(id))
}

// Las que siguen vigentes y aun no llegan al objetivo.
export function metasEnProgreso() {
  return metas.filter((meta) => meta.activo && meta.montoAhorrado < meta.montoObjetivo)
}

export function progresoMeta(meta, aporte = 0) {
  return Math.round(((meta.montoAhorrado + aporte) / meta.montoObjetivo) * 100)
}

export function sumarAporteMeta(id, monto) {
  metas = metas.map((meta) => (meta.id === Number(id) ? { ...meta, montoAhorrado: meta.montoAhorrado + monto } : meta))
}
