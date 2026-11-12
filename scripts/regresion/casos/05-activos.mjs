export default [
  {
    nombre: 'Mis Activos', ruta: '/activos', titulo: 'Mis Activos', body: 'mod-lista-activos', h1: 'Mis Activos',
    js: `ok('4 tarjetas', $$('.tarjeta-bien').length === 4)
ok('total de activos vigentes', txt('.resumen-activos h2') === '$235.000.000', txt('.resumen-activos h2'))
ok('inactivo sin editar ni desactivar', $$('.tarjeta-bien')[3].querySelectorAll('.acciones-bien button').length === 1)
clic($$('.tarjeta-bien')[0].querySelector('[title="Desactivar"]')); await espera(() => $('.overlay-activo-modal'))
ok('modal abre con clase de body', document.body.className === 'mod-lista-activos mod-activo-desactivar', document.body.className)
clic('.btn-desactivar-activo'); await pausa(50)
ok('desactivar baja el total', txt('.resumen-activos h2') === '$55.000.000', txt('.resumen-activos h2'))`,
  },
  {
    nombre: 'Registrar activo', ruta: '/activos/nuevo', titulo: 'Registrar Activo', body: 'mod-activo-form mod-activo-crear', h1: 'Registrar Activo',
    js: `escribir('#nombre', 'Moto NKD'); escribir('#valor', '1.000'); clic('.btn-guardar'); await pausa(50)
ok('nombre repetido no se guarda', location.pathname === '/activos/nuevo')
escribir('#nombre', 'Bicicleta'); await pausa(30)
ok('vista previa con el nombre', txt('.activo-previa-contenido h3') === 'Bicicleta')
clic('.btn-guardar'); await espera(() => location.pathname === '/activos')
await espera(() => $$('.tarjeta-bien h3').some((h) => h.textContent === 'Bicicleta'))
ok('se guarda y aparece', $$('.tarjeta-bien h3').some((h) => h.textContent === 'Bicicleta'))`,
  },
  { nombre: 'Detalle activo', ruta: '/activos/1', titulo: 'Detalle del Activo', body: 'mod-activo-detalle', h1: 'Casa Principal' },
  { nombre: 'Editar activo', ruta: '/activos/1/editar', titulo: 'Editar Activo', body: 'mod-activo-form mod-activo-editar', h1: 'Editar Activo' },
  { nombre: 'Editar activo inactivo', ruta: '/activos/4/editar', redirige: '/activos/4' },
]
