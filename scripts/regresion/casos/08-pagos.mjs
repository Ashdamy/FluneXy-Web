export default [
  { nombre: 'Selector', ruta: '/pagos', titulo: 'Registrar Pago o Aporte', body: 'mod-pago-selector', h1: 'Registrar Pago o Aporte' },
  {
    nombre: 'Registrar pago', ruta: '/pagos/registrar-pago?pasivo=1&cuota=10', titulo: 'Registrar Pago', body: 'mod-pagos', h1: 'Registrar Pago',
    js: `clic('.btn-guardar'); await espera(() => location.pathname === '/pagos/historial')
ok('pago registrado va al historial', location.pathname === '/pagos/historial', location.pathname)
await espera(() => $('.aviso-pasivos-cuotas'))
ok('muestra aviso', $('.aviso-pasivos-cuotas'))`,
  },
  {
    nombre: 'Registrar aporte', ruta: '/pagos/registrar-aporte?meta=1', titulo: 'Registrar Aporte', body: 'mod-pagos', h1: 'Registrar Aporte',
    js: `escribir('[name="monto"]', '100.000'); await pausa(30); clic('.btn-guardar'); await espera(() => location.pathname === '/pagos/historial')
ok('aporte registrado va al historial', location.pathname === '/pagos/historial')
await espera(() => $('.aviso-pasivos-cuotas'))
ok('aviso con el progreso', /Aporte registrado/.test(txt('.aviso-pasivos-cuotas')), txt('.aviso-pasivos-cuotas'))`,
  },
  { nombre: 'Aporte meta inexistente', ruta: '/pagos/registrar-aporte?meta=99', redirige: '/metas' },
  { nombre: 'Historial', ruta: '/pagos/historial', titulo: 'Historial de Pagos', body: 'mod-pagos', h1: 'Historial de Pagos', js: `ok('filas de pagos y aportes', $$('.item-pago').length === 4, $$('.item-pago').length)` },
]
