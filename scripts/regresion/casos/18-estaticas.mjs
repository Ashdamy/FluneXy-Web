// Paginas estaticas de public/: se revisa que carguen su CSS y su logo.
const estatica = `ok('CSS cargado', [...document.styleSheets].some((h) => { try { return h.href && h.cssRules.length > 0 } catch { return false } }))
await espera(() => $('img')?.complete)
ok('logo cargado', $('img') && $('img').naturalWidth > 0)
const enlaces = [...document.querySelectorAll('link[rel=stylesheet], script[src]')].map((e) => e.href || e.src).filter((u) => u.startsWith(location.origin))
const estados = await Promise.all(enlaces.map((u) => fetch(u).then((r) => r.ok && !/<div id="root">/.test('')).catch(() => false)))
ok('sin archivos locales rotos', estados.every(Boolean), enlaces.join(' '))
ok('sin css/style.css ni js/scritp.js', !enlaces.some((u) => /style\\.css|scritp\\.js/.test(u)))`
export default [
  {
    nombre: 'Landing', ruta: '/', titulo: 'Tu app financiera', body: 'landing', h1: 'Controla tus finanzascon total claridad', app: false,
    js: `ok('sin barra lateral', !$('.barra-lateral'))
ok('9 módulos y 5 beneficios', $$('.modulo-card').length === 9 && $$('.beneficio-card').length === 5)
ok('enlaces a soporte y legal', $('.footer-col a').getAttribute('href') === '/soporte/preguntas-frecuentes.html' && $('.legal a').getAttribute('href') === '/legal/politicas.html')
clic(boton('Iniciar sesión')); await espera(() => location.pathname === '/autenticacion/iniciar-sesion')
ok('Iniciar sesión', location.pathname === '/autenticacion/iniciar-sesion')`,
  },
  {
    nombre: 'Landing a registro', ruta: '/', app: false,
    js: `clic($('.hero-actions .btn')); await espera(() => location.pathname === '/autenticacion/registro')
ok('Comenzar gratis va a Registro', location.pathname === '/autenticacion/registro')`,
  },
  { nombre: 'Preguntas frecuentes (estática)', ruta: '/soporte/preguntas-frecuentes.html', app: false, js: estatica + `\nok('formulario de soporte', $('#soporteForm'))` },
  { nombre: 'Política de datos (estática)', ruta: '/legal/politicas.html', app: false, js: estatica },
]
