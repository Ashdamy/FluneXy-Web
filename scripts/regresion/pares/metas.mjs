export default [
  { nombre: 'Mis Metas', viejo: 'pages/metas/mis-metas.html', nuevo: '/metas' },
  { nombre: 'Metas vacío', viejo: 'pages/metas/metas-vacio.html', nuevo: '/metas', antes: `for (let i = 0; i < 4; i++) { clic($('.tarjeta-meta [title="Desactivar"]')); await espera(() => $('.btn-eliminar-meta')); clic('.btn-eliminar-meta'); await pausa(60) }` },
  { nombre: 'Desactivar (modal)', viejo: 'pages/metas/desactivar-metas.html', nuevo: '/metas', antes: `clic($('.tarjeta-meta [title="Desactivar"]')); await espera(() => $('.overlay-meta-modal'))` },
  { nombre: 'Nueva Meta', viejo: 'pages/metas/nueva-meta.html', nuevo: '/metas/nueva' },
  { nombre: 'Detalle de Meta', viejo: 'pages/metas/detalle-meta.html', nuevo: '/metas/1' },
  { nombre: 'Editar Meta', viejo: 'pages/metas/editar-meta.html', nuevo: '/metas/1/editar' },
]
