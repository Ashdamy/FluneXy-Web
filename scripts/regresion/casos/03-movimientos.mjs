export default [
  {
    nombre: 'Mis Movimientos', ruta: '/movimientos', titulo: 'Mis Movimientos', h1: 'Mis Movimientos',
    js: `ok('5 filas', $$('.fila-movimiento').length === 5, $$('.fila-movimiento').length)
ok('menú marca Movimientos', txt('.navegacion-barra a.activo') === 'Movimientos')
clic($$('.fila-movimiento')[0].querySelector('[title="Ver detalle"]')); await espera(() => /^\\/movimientos\\/\\d+$/.test(location.pathname))
ok('ver detalle navega', /^\\/movimientos\\/\\d+$/.test(location.pathname), location.pathname)`,
  },
  { nombre: 'Nuevo ingreso', ruta: '/movimientos/nuevo?tipo=ingreso', titulo: 'Nuevo Movimiento | Ingreso', body: 'mod-form-movimiento', h1: 'Nuevo Movimiento' },
  {
    nombre: 'Nuevo gasto saldo insuficiente', ruta: '/movimientos/nuevo?tipo=gasto', titulo: 'Nuevo Movimiento | Gasto', h1: 'Nuevo Movimiento',
    js: `escribir('#monto', '99.000.000'); await pausa(100); clic(boton('Guardar Movimiento')); await pausa(150)
ok('no guarda con saldo insuficiente', location.pathname === '/movimientos/nuevo')`,
  },
  { nombre: 'Detalle movimiento', ruta: '/movimientos/1', titulo: 'Detalle del Movimiento', body: 'mod-detalle-movimiento', h1: 'Detalle del Movimiento' },
  { nombre: 'Editar movimiento', ruta: '/movimientos/1/editar', titulo: 'Editar Movimiento', body: 'mod-editar-movimiento', h1: 'Editar Movimiento' },
]
