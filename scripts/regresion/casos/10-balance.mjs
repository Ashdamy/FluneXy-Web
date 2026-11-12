export default [
  {
    nombre: 'Balance financiero', ruta: '/balance-financiero', titulo: 'Balance Financiero', body: 'mod-balance', h1: 'Balance Financiero',
    js: `const dato = (i) => txt($$('.bal-dato strong')[i])
ok('menú marca Balance', txt('.navegacion-barra a.activo') === 'Balance financiero')
ok('total activos = activos vigentes', dato(0) === '$235.000.000', dato(0))
ok('patrimonio = activos - pasivos (RN13.4.1)', (() => { const n = (s) => Number(s.replace(/[$.]/g, '')); return n(dato(2)) === n(dato(0)) - n(dato(1)) })(), dato(2))
ok('hero = patrimonio', txt('.bal-hero-valor') === dato(2))
ok('selector de fecha en el encabezado', $('.encabezado-pagina .acciones-derecha-pagina .selector-periodo') && $('.acciones-derecha-pagina .acciones-usuario'))
ok('endeudamiento con nivel', /^Riesgo (bajo|moderado|alto)$/.test(txt('.bal-tile-estado')), txt('.bal-tile-estado'))
clic(boton('Ver Flujo de Caja')); await espera(() => location.pathname === '/flujo-caja')
ok('botón a Flujo de Caja', location.pathname === '/flujo-caja')`,
  },
  {
    nombre: 'Balance sigue a Activos', ruta: '/activos', h1: 'Mis Activos',
    js: `clic($$('.tarjeta-bien')[0].querySelector('[title="Desactivar"]')); await espera(() => $('.btn-desactivar-activo')); clic('.btn-desactivar-activo'); await pausa(50)
clic('.navegacion-barra a[href="/balance-financiero"]'); await espera(() => $('.bal-dato'))
ok('desactivar un activo baja el total del balance', txt($$('.bal-dato strong')[0]) === '$55.000.000', txt($$('.bal-dato strong')[0]))`,
  },
  {
    nombre: 'Botón Generar Reporte', ruta: '/balance-financiero', h1: 'Balance Financiero',
    js: `clic(boton('Generar Reporte de Balance')); await espera(() => location.pathname === '/reportes/generar')
ok('lleva a Generar Reporte', location.pathname === '/reportes/generar')`,
  },
]
