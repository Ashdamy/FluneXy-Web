export default [
  {
    nombre: 'Historial de reportes', ruta: '/reportes', titulo: 'Historial de Reportes', body: 'mod-reportes', h1: 'Historial de Reportes',
    js: `ok('menú marca Reportes', txt('.navegacion-barra a.activo') === 'Reportes')
ok('4 reportes', $$('.hist-fila').length === 4)
ok('el más reciente primero', txt('.hist-fila strong') === 'Balance Financiero' && txt('.hist-destacado-titulo') === 'Balance Financiero')
ok('periodo y fecha', /^Periodo: \\S+ \\d{4} · Generado el \\d+ \\w{3} \\d{4}$/.test(txt('.hist-fila-texto span')), txt('.hist-fila-texto span'))
clic($$('.hist-fila-enlace')[1]); await espera(() => /^\\/reportes\\/\\d+$/.test(location.pathname))
ok('ver detalle', location.pathname === '/reportes/3', location.pathname)`,
  },
  {
    nombre: 'Generar reporte', ruta: '/reportes/generar', titulo: 'Generar Reporte', body: 'mod-reportes', h1: 'Generar Reporte',
    js: `ok('3 tipos', $$('.rep-fila').length === 3)
ok('PDF elegido por defecto', $$('.rep-chip')[0].classList.contains('rep-chip-pdf'))
clic($$('.rep-fila')[1]); clic($$('.rep-chip')[1]); await pausa(30)
ok('elegir tipo', $$('.rep-fila')[1].classList.contains('rep-fila-seleccionada') && txt('.rep-selector') === 'Flujo de Caja')
ok('elegir Excel', $$('.rep-chip')[1].classList.contains('rep-chip-pdf') && !$$('.rep-chip')[0].classList.contains('rep-chip-pdf'))
clic('.rep-boton-generar'); await espera(() => location.pathname === '/reportes/vista-previa')
await espera(() => $('.vp-doc-titulo'))
ok('vista previa del tipo elegido', txt('.vp-doc-titulo') === 'Flujo de Caja' && txt('.vp-doc-sublabel') === 'Saldo Proyectado')
ok('fecha de generación = hoy (RN16.6.2)', /^Generado el \\d+ \\w{3} \\d{4}$/.test(txt('.vp-doc-fecha')))
const { flujoDelMes } = await import('/src/datos/flujoCaja.js')
ok('mismos valores que Flujo de Caja (RN16.7.4)', txt('.vp-doc-valor-grande').replace(/[^0-9]/g, '') === String(Math.round(Math.abs(flujoDelMes().saldo))), txt('.vp-doc-valor-grande'))
clic('.navegacion-barra a[href="/reportes"]'); await espera(() => $('.hist-fila'))
ok('queda en el historial (RN16.1.3)', $$('.hist-fila').length === 5 && txt('.hist-destacado-titulo') === 'Flujo de Caja')`,
  },
  {
    nombre: 'Vista previa balance', ruta: '/reportes/vista-previa?id=4', titulo: 'Vista Previa del Reporte', body: 'mod-reportes', h1: 'Vista Previa del Reporte',
    js: `ok('subtítulo con volver y periodo', $('.titulo-pagina p .vp-volver') && $('.titulo-pagina p .vp-meta-periodo'))
ok('secciones del balance', $$('.vp-doc-fila .vp-doc-label').map((e) => e.textContent).join(',') === 'ACTIVOS,PASIVOS,INDICADORES')
ok('total activos', txt('.vp-doc-linea strong.verde') === '$235.000.000')`,
  },
  { nombre: 'Vista previa sin id', ruta: '/reportes/vista-previa', redirige: '/reportes/generar' },
  {
    nombre: 'Detalle reporte', ruta: '/reportes/2', titulo: 'Detalle de Reporte', body: 'mod-reportes', h1: 'Detalle de Reporte',
    js: `ok('tipo', txt('.det-hero h2') === 'Indicadores')
ok('formato', $$('.det-dato-valor')[2].textContent === 'Excel')
ok('archivo no disponible', txt('.det-dato-alerta') === 'No disponible')
clic('.det-boton-generar'); await espera(() => location.pathname === '/reportes/generar')
await espera(() => $('.rep-fila'))
ok('generar de nuevo llega con el tipo y el formato', $$('.rep-fila')[2].classList.contains('rep-fila-seleccionada') && $$('.rep-chip')[1].classList.contains('rep-chip-pdf'))`,
  },
  { nombre: 'Detalle reporte inexistente', ruta: '/reportes/99', redirige: '/reportes' },
]
