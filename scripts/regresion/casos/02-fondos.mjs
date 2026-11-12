export default [
  {
    nombre: 'Mis Fondos', ruta: '/fondos', titulo: 'Mis Fondos', body: 'mod-fondos', h1: 'Mis Fondos',
    js: `
ok('4 tarjetas', $$('.tarjeta-activo').length === 4, $$('.tarjeta-activo').length)
ok('balance total de fondos activos', txt('.resumen-fondos h2') === '$2.980.000', txt('.resumen-fondos h2'))
ok('menú marca Fondos', txt('.navegacion-barra a.activo') === 'Fondos', txt('.navegacion-barra a.activo'))
escribir('.busqueda input', 'nequi'); await pausa(50)
ok('buscar filtra', $$('.tarjeta-activo').length === 1)
escribir('.busqueda input', ''); await pausa(50)
clic($$('.tarjeta-activo')[1].querySelector('[title="Desactivar"]')); await espera(() => $('.overlay-fondo-modal'))
ok('modal de desactivar abre', $('.overlay-fondo-modal'))
clic('.btn-cancelar-fondo'); await pausa(50)
ok('cancelar cierra el modal', !$('.overlay-fondo-modal'))
clic($$('.tarjeta-activo')[1].querySelector('[title="Desactivar"]')); await espera(() => $('.overlay-fondo-modal'))
clic('.btn-desactivar-fondo'); await pausa(50)
ok('desactivar deja 2 inactivos', txt($$('.estadisticas-resumen strong')[1]) === '2', txt($$('.estadisticas-resumen strong')[1]))
ok('balance baja al desactivar', txt('.resumen-fondos h2') === '$2.600.000', txt('.resumen-fondos h2'))`,
  },
  {
    nombre: 'Crear fondo', ruta: '/fondos/nuevo', titulo: 'Crear Fondo', body: 'mod-fondo-form mod-fondo-crear', h1: 'Nuevo Fondo',
    js: `
escribir('#nombre-fondo', 'Nequi'); clic('.btn-guardar'); await pausa(50)
ok('nombre repetido no se guarda', location.pathname === '/fondos/nuevo')
escribir('#nombre-fondo', 'Mi Ahorro'); escribir('#saldo-inicial', '100.000'); clic('.btn-guardar')
await espera(() => location.pathname === '/fondos')
ok('al guardar vuelve al listado', location.pathname === '/fondos')
await espera(() => $$('.tarjeta-activo h3').some((h) => h.textContent === 'Mi Ahorro'))
ok('aparece el fondo nuevo', $$('.tarjeta-activo h3').some((h) => h.textContent === 'Mi Ahorro'))`,
  },
  { nombre: 'Detalle fondo', ruta: '/fondos/1', titulo: 'Detalle del Fondo', body: 'mod-fondos', h1: 'Bancolombia', js: `ok('saldo', txt('.monto-hero') === '$2.450.000', txt('.monto-hero'))
ok('botones editar y desactivar', $('.btn-secundario') && $('.btn-peligro'))` },
  { nombre: 'Detalle fondo inexistente', ruta: '/fondos/99', redirige: '/fondos' },
  {
    nombre: 'Fondo inactivo con Editar', ruta: '/fondos', h1: 'Mis Fondos',
    js: `const inactiva = $$('.tarjeta-activo')[3]
ok('tarjeta inactiva: ver y editar', inactiva.querySelectorAll('.acciones-tarjeta button').length === 2)
ok('tarjeta inactiva: sin desactivar', !inactiva.querySelector('[title="Desactivar"]'))
clic(inactiva.querySelector('[title="Editar"]')); await espera(() => $('#nombre-fondo'))
ok('editar inactivo abre el formulario', location.pathname === '/fondos/4/editar' && $('#nombre-fondo')?.value === 'Daviplata', location.pathname)`,
  },
  {
    nombre: 'Actividad del fondo', ruta: '/fondos/1', h1: 'Bancolombia',
    js: `ok('transacciones = movimientos activos del fondo', txt($$('.tile-info strong')[2]) === '2', txt($$('.tile-info strong')[2]))
ok('actividad reciente sale de Movimientos', $$('.item-transaccion p').map((p) => p.textContent).join(',') === 'Salario Junio,Freelance App', $$('.item-transaccion p').map((p) => p.textContent).join(','))
ok('ingreso con signo +', txt('.item-transaccion.ingreso strong') === '+$2.500.000', txt('.item-transaccion.ingreso strong'))`,
  },
  {
    nombre: 'Saldo inicial y ajuste en la actividad', ruta: '/fondos/nuevo', h1: 'Nuevo Fondo',
    js: `escribir('#nombre-fondo', 'Caja Menor'); escribir('#saldo-inicial', '50.000'); clic('.btn-guardar')
await espera(() => $$('.tarjeta-activo h3').some((h) => h.textContent === 'Caja Menor'))
clic($$('.tarjeta-activo').find((t) => t.querySelector('h3').textContent === 'Caja Menor').querySelector('[title="Ver detalle"]'))
await espera(() => $('.item-transaccion'))
ok('aparece "Saldo inicial"', txt('.item-transaccion p') === 'Saldo inicial' && txt('.item-transaccion strong') === '+$50.000', txt('.item-transaccion'))
clic(boton('Editar Fondo')); await espera(() => $('#saldo'))
escribir('#saldo', '20.000'); clic('.btn-guardar'); await espera(() => location.pathname === '/fondos')
await espera(() => $$('.tarjeta-activo h3').some((h) => h.textContent === 'Caja Menor'))
clic($$('.tarjeta-activo').find((t) => t.querySelector('h3').textContent === 'Caja Menor').querySelector('[title="Ver detalle"]'))
await espera(() => $$('.item-transaccion').length === 2)
ok('aparece "Ajuste de saldo" como gasto', $$('.item-transaccion').some((i) => i.classList.contains('gasto') && i.querySelector('p').textContent === 'Ajuste de saldo' && txt(i.querySelector('strong')) === '-$30.000'))
ok('transacciones = 2', txt($$('.tile-info strong')[2]) === '2')`,
  },
  { nombre: 'Detalle fondo inactivo', ruta: '/fondos/4', h1: 'Daviplata', js: `ok('botón editar', boton('Editar Fondo'))
ok('sin botón desactivar', !boton('Desactivar Fondo'))` },
  { nombre: 'Editar fondo', ruta: '/fondos/1/editar', titulo: 'Editar Fondo', body: 'mod-fondo-form mod-fondo-editar', h1: 'Editar Fondo', js: `ok('nombre precargado', $('#nombre-fondo').value === 'Bancolombia')` },
]
