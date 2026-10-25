// Datos de prueba de Activos ("API falsa" en memoria, como fondos.js).
// La forma sigue la tabla activos de bd/01_create_tables.sql. Las
// categorias son las de aplica_a = 'ACTIVO' en bd/02_insert_data.sql.

// "color" es la clase de la tarjeta del listado; el prototipo solo trae
// verde, indigo y ambar, asi que las categorias nuevas reutilizan esas.
export const CATEGORIAS_ACTIVO = [
  { nombre: 'Vivienda', icono: 'ph-house', color: 'bien-verde' },
  { nombre: 'Vehículo', icono: 'ph-car', color: 'bien-indigo' },
  { nombre: 'Inversión', icono: 'ph-chart-line-up', color: 'bien-indigo' },
  { nombre: 'Ahorro', icono: 'ph-money', color: 'bien-ambar' },
  { nombre: 'Propiedad', icono: 'ph-storefront', color: 'bien-verde' },
  { nombre: 'Otros activos', icono: 'ph-clipboard-text', color: 'bien-ambar' },
]

export function categoriaActivo(nombre) {
  return CATEGORIAS_ACTIVO.find((categoria) => categoria.nombre === nombre) ?? CATEGORIAS_ACTIVO.at(-1)
}

let activos = [
  { id: 1, nombre: 'Casa Principal', categoria: 'Vivienda', valor: 180000000, fechaRegistro: '2025-01-12', fechaActualizacion: '2025-06-03', activo: true },
  { id: 2, nombre: 'Moto NKD', categoria: 'Vehículo', valor: 12000000, fechaRegistro: '2025-02-20', fechaActualizacion: '2025-05-15', activo: true },
  { id: 3, nombre: 'Ahorros Bancarios', categoria: 'Ahorro', valor: 43000000, fechaRegistro: '2025-01-12', fechaActualizacion: '2025-06-01', activo: true },
  // La BD exige valor > 0; el prototipo mostraba $0 para este activo inactivo.
  { id: 4, nombre: 'Negocio Local', categoria: 'Propiedad', valor: 25000000, fechaRegistro: '2025-03-08', fechaActualizacion: '2025-03-08', activo: false },
]

export function listarActivos() {
  return activos
}

export function obtenerActivo(id) {
  return activos.find((activo) => activo.id === Number(id))
}

// Suma de los activos vigentes: es lo que cuenta en el Patrimonio Neto.
export function valorTotalActivos() {
  return activos.filter((activo) => activo.activo).reduce((total, activo) => total + activo.valor, 0)
}

// Porcentaje del patrimonio (valor total de activos vigentes) que representa
// un activo. Un activo inactivo no cuenta: 0%.
export function participacionActivo(activo) {
  const total = valorTotalActivos()
  const porcentaje = activo.activo && total > 0 ? Math.round((activo.valor / total) * 100) : 0
  return { porcentaje, total }
}

export function crearActivo(datos) {
  const nuevo = { ...datos, id: Math.max(0, ...activos.map((a) => a.id)) + 1, activo: true }
  activos = [...activos, nuevo]
  return nuevo
}

export function actualizarActivo(id, cambios) {
  activos = activos.map((activo) => (activo.id === Number(id) ? { ...activo, ...cambios } : activo))
}

export function desactivarActivo(id) {
  actualizarActivo(id, { activo: false })
}
