export default [
  {
    nombre: 'Inicio', ruta: '/home', titulo: 'Inicio', body: 'mod-home', h1: 'Hola, Ana Milena',
    js: `const [act, pas] = await Promise.all(['activos', 'pasivos'].map((m) => import('/src/datos/' + m + '.js')))
const patrimonio = act.valorTotalActivos() - pas.totalPasivos()
ok('menú marca Inicio', txt('.navegacion-barra a.activo') === 'Inicio')
ok('main con pagina-home', $('main').className === 'contenido-principal pagina-home')
ok('patrimonio = activos - pasivos', txt('.valor-patrimonio h2').replace(/[^0-9]/g, '') === String(Math.round(patrimonio)), txt('.valor-patrimonio h2'))
ok('4 accesos rápidos', $$('.tarjeta-acceso').length === 4 && $$('.tarjeta-acceso')[0].getAttribute('href') === '/flujo-caja')
ok('3 movimientos recientes', $$('.item-movimiento-home').length === 3 && txt('.item-movimiento-home h4') === 'Salario Junio', txt('.item-movimiento-home h4'))
ok('fecha de hoy como "Hoy, hh:mm"', /^Hoy, \\d{2}:\\d{2} (am|pm)$/.test(txt('.detalle-movimiento p')), txt('.detalle-movimiento p'))
ok('aviso con la alerta de endeudamiento (umbral 35%)', /umbral de riesgo \\(35%\\)/.test(txt('.contenido-alerta p')))
clic('.fab-asistente'); await espera(() => location.pathname === '/asistente')
ok('botón del asistente', location.pathname === '/asistente')`,
  },
  {
    nombre: 'Inicio sin alerta de deuda', ruta: '/alertas', h1: 'Mis Alertas',
    js: `clic($('.alerta-tarjeta [title="Desactivar"]')); await espera(() => $('.btn-desactivar-alerta')); clic('.btn-desactivar-alerta'); await pausa(50)
clic('.navegacion-barra a[href="/home"]'); await espera(() => $('.tarjeta-patrimonio'))
ok('sin alerta activa no se muestra el aviso', !$('.alerta-endeudamiento'))`,
  },
  { nombre: 'Logo lleva a la landing', ruta: '/home', h1: 'Hola, Ana Milena', js: `ok('logo', $('.logo-enlace').getAttribute('href') === '/')` },
]
