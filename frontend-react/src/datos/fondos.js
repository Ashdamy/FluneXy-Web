// Datos de prueba de Fondos, sacados del prototipo HTML.
// Funcionan como una "API falsa" en memoria: los cambios duran hasta
// recargar la pagina. Cuando exista el backend, estas funciones se
// reemplazan por llamadas a api('/fondos/...') con la misma forma.

export const TIPOS_FONDO = {
  banco: { etiqueta: 'Banco', icono: 'ph-bank' },
  billetera: { etiqueta: 'Billetera Digital', icono: 'ph-device-mobile' },
  efectivo: { etiqueta: 'Efectivo', icono: 'ph-money' },
}

let fondos = [
  {
    id: 1,
    nombre: 'Bancolombia',
    tipo: 'banco',
    saldo: 2450000,
    activo: true,
    creado: '12 Ene 2025',
    actualizacion: 'Hace 2 días',
  },
  {
    id: 2,
    nombre: 'Nequi',
    tipo: 'billetera',
    saldo: 380000,
    activo: true,
    creado: '3 Feb 2025',
    actualizacion: 'Hoy',
  },
  {
    id: 3,
    nombre: 'Efectivo',
    tipo: 'efectivo',
    saldo: 150000,
    activo: true,
    creado: '12 Ene 2025',
    actualizacion: 'Ayer',
  },
  {
    id: 4,
    nombre: 'Daviplata',
    tipo: 'billetera',
    saldo: 0,
    activo: false,
    creado: '20 Mar 2025',
    actualizacion: 'Hace 1 mes',
  },
]

export function listarFondos() {
  return fondos
}

export function obtenerFondo(id) {
  return fondos.find((fondo) => fondo.id === Number(id))
}

export function crearFondo({ nombre, tipo, saldo }) {
  const nuevo = {
    id: Math.max(0, ...fondos.map((fondo) => fondo.id)) + 1,
    nombre,
    tipo,
    saldo,
    activo: true,
    creado: 'Hoy',
    actualizacion: 'Hoy',
  }
  fondos = [...fondos, nuevo]
  return nuevo
}

export function actualizarFondo(id, cambios) {
  fondos = fondos.map((fondo) =>
    fondo.id === Number(id) ? { ...fondo, ...cambios, actualizacion: 'Hoy' } : fondo,
  )
}

export function desactivarFondo(id) {
  actualizarFondo(id, { activo: false })
}
