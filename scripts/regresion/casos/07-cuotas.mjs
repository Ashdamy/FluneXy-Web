export default [
  { nombre: 'Pasivos con cuotas', ruta: '/cuotas', titulo: 'Pasivos con Cuotas', body: 'mod-lista-pasivos mod-pasivos-cuotas', h1: 'Pasivos con Cuotas Disponibles', js: `ok('solo pasivos activos', $$('.tarjeta-deuda').length === 3, $$('.tarjeta-deuda').length)` },
  { nombre: 'Tabla de cuotas', ruta: '/cuotas/1', titulo: 'Cuotas', body: 'mod-cuotas', h1: 'Tabla de Cuotas', js: `ok('30 cuotas', $$('.tabla-cuotas tbody tr').length === 30, $$('.tabla-cuotas tbody tr').length)` },
  { nombre: 'Detalle de cuota', ruta: '/cuotas/1/10', titulo: 'Detalle de Cuota', body: 'mod-cuotas', h1: 'Detalle de Cuota', js: `ok('desglose', $$('.fila-desglose').length === 4)` },
]
