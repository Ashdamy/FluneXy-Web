const fechaEnMeses = `const enMeses = (n) => { const d = new Date(); d.setMonth(d.getMonth() + n); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') }`
export default [
  {
    nombre: 'Mis Metas', ruta: '/metas', titulo: 'Mis Metas', body: 'mod-lista-metas', h1: 'Mis Metas',
    js: `const tarjetas = () => $$('.tarjeta-meta')
ok('menú marca Metas', txt('.navegacion-barra a.activo') === 'Metas')
ok('4 tarjetas (la inactiva no se lista)', tarjetas().length === 4, tarjetas().length)
ok('total ahorrado sin la completada', txt('.resumen-metas h2') === '$23.500.000', txt('.resumen-metas h2'))
ok('3 metas activas', txt('.badge-fondos') === '3 metas activas', txt('.badge-fondos'))
ok('objetivo total', txt($$('.estadistica strong')[1]) === '$97.000.000', txt($$('.estadistica strong')[1]))
ok('estados del prototipo', $$('.estado-meta .estado').map((e) => e.textContent).join(',') === 'En progreso,Requiere esfuerzo,¡Casi lista!,Completada', $$('.estado-meta .estado').map((e) => e.textContent).join(','))
ok('clases de estado', $$('.estado-meta .estado').map((e) => e.className).join(',') === 'estado estado-progreso,estado estado-esfuerzo,estado estado-casi-lista,estado estado-completada')
ok('ahorro mensual = lo que falta / meses', txt(tarjetas()[0].querySelector('.aporte-mensual')) === '$1.000.000/mes', txt(tarjetas()[0].querySelector('.aporte-mensual')))
ok('Vivienda (80-15)/36', txt(tarjetas()[1].querySelector('.aporte-mensual')) === '$1.805.556/mes', txt(tarjetas()[1].querySelector('.aporte-mensual')))
ok('progreso hacia abajo (18%)', txt(tarjetas()[1].querySelector('.porcentaje')) === '18%')
ok('plazo "6 meses"', /• 6 meses$/.test(txt(tarjetas()[0].querySelector('.etiqueta-fecha'))), txt(tarjetas()[0].querySelector('.etiqueta-fecha')))
const comp = tarjetas()[3]
ok('completada: "final", sin ahorro mensual, "Sin seguimiento"', comp.querySelector('.label-final') && !comp.querySelector('.aporte-mensual') && txt(comp.querySelector('.badge-estado')) === 'Sin seguimiento')
ok('completada: "X de X"', txt(comp.querySelector('.detalle-meta strong')) === '$8.000.000 de $8.000.000')
escribir('.busqueda input', 'viaje'); await pausa(50)
ok('buscar filtra', tarjetas().length === 1)
escribir('.busqueda input', ''); await pausa(50)
clic(tarjetas()[0].querySelector('[title="Desactivar"]')); await espera(() => $('.overlay-meta-modal'))
ok('modal con clase de body', document.body.className === 'mod-lista-metas mod-meta-desactivar', document.body.className)
ok('nota del prototipo con el fondo de la meta', txt('.nota-aviso-meta span') === 'Los $6.000.000 ya ahorrados permanecen en el fondo Nequi. Solo se desactiva el seguimiento de la meta.', txt('.nota-aviso-meta span'))
ok('detalle del modal', txt('.preview-info p') === '50% completada · $6.000.000 ahorrados', txt('.preview-info p'))
clic('.btn-cancelar-meta'); await pausa(50)
ok('cancelar cierra', !$('.overlay-meta-modal') && tarjetas().length === 4)
clic(tarjetas()[0].querySelector('[title="Desactivar"]')); await espera(() => $('.overlay-meta-modal'))
clic('.btn-eliminar-meta'); await espera(() => tarjetas().length === 3)
ok('desactivar quita la meta del listado', tarjetas().length === 3)
ok('resumen se recalcula', txt('.badge-fondos') === '2 metas activas', txt('.badge-fondos'))
clic(tarjetas()[0]); await espera(() => location.pathname === '/metas/2')
ok('clic en la tarjeta abre el detalle', location.pathname === '/metas/2', location.pathname)`,
  },
  {
    nombre: 'Estado vacío', ruta: '/metas', h1: 'Mis Metas',
    js: `for (let i = 0; i < 4; i++) { clic($('.tarjeta-meta [title="Desactivar"]')); await espera(() => $('.btn-eliminar-meta')); clic('.btn-eliminar-meta'); await pausa(60) }
await espera(() => $('.estado-vacio-metas'))
ok('estado vacío', $('.estado-vacio-metas') && document.body.className === 'mod-meta-vacio', document.body.className)
ok('texto del vacío', txt('.estado-vacio-metas h2') === 'No tienes metas activas')
clic('.btn-primer-meta'); await espera(() => location.pathname === '/metas/nueva')
ok('botón lleva a Nueva Meta', location.pathname === '/metas/nueva')`,
  },
  {
    nombre: 'Nueva meta', ruta: '/metas/nueva', titulo: 'Nueva Meta', body: 'mod-meta-form mod-meta-crear', h1: 'Nueva Meta',
    js: `${fechaEnMeses}
ok('fondos activos', $$('.fila-fondo').length === 3, $$('.fila-fondo').length)
ok('primer fondo elegido', $$('.fila-fondo')[0].classList.contains('activa'))
ok('fecha con mínimo hoy (RN09.1.4)', $('#fecha-meta').min === enMeses(0), $('#fecha-meta').min)
clic('.btn-guardar'); await pausa(50)
ok('vacío no se guarda', location.pathname === '/metas/nueva')
escribir('#nombre-meta', 'Moto Nueva'); escribir('#monto-meta', '1.200.000'); escribir('#fecha-meta', enMeses(12)); await pausa(50)
ok('vista previa: nombre', txt('.meta-previa-contenido h3') === 'Moto Nueva')
ok('vista previa: ahorro mensual', txt('.meta-previa-aporte') === '$100.000', txt('.meta-previa-aporte'))
ok('vista previa: 12 meses', txt('.chip-meses') === '12 meses', txt('.chip-meses'))
clic('.btn-guardar'); await pausa(50)
ok('nombre repetido entre activas no se guarda (RN09.1.2)', location.pathname === '/metas/nueva')
escribir('#nombre-meta', 'Vacaciones Familiares'); escribir('#monto-meta', '0'); clic('.btn-guardar'); await pausa(50)
ok('monto cero no se guarda (RN09.1.3)', location.pathname === '/metas/nueva')
escribir('#monto-meta', '1.200.000'); escribir('#fecha-meta', '2020-01-01'); clic('.btn-guardar'); await pausa(50)
ok('fecha pasada no se guarda (RN09.1.4)', location.pathname === '/metas/nueva')
escribir('#fecha-meta', enMeses(12)); clic($$('.fila-fondo')[2]); await pausa(30)
ok('elegir otro fondo', $$('.fila-fondo')[2].classList.contains('activa') && !$$('.fila-fondo')[0].classList.contains('activa'))
clic('.btn-guardar'); await espera(() => location.pathname === '/metas')
ok('nombre de una meta inactiva sí se puede usar', location.pathname === '/metas')
await espera(() => $$('.tarjeta-meta').length === 5)
const nueva = $$('.tarjeta-meta').find((t) => t.querySelector('h3').textContent === 'Vacaciones Familiares')
ok('aparece con 0% y En progreso (RN09.1.7)', nueva && txt(nueva.querySelector('.porcentaje')) === '0%' && txt(nueva.querySelector('.estado')) === 'En progreso')
ok('cuenta en el resumen', txt('.badge-fondos') === '4 metas activas', txt('.badge-fondos'))`,
  },
  {
    nombre: 'Detalle meta', ruta: '/metas/1', titulo: 'Detalle de Meta', body: 'mod-meta-detalle', h1: 'Detalle de Meta',
    js: `ok('nombre', txt('.hero-titulo') === 'Moto Nueva')
ok('progreso', txt('.hero-valor') === '50%')
ok('faltan', txt('.hero-faltan') === 'Faltan $6.000.000')
ok('ahorro mensual requerido', txt('.c-valor') === '$1.000.000')
ok('días restantes', Number(txt('.c-der strong')) > 170 && Number(txt('.c-der strong')) < 190, txt('.c-der strong'))
ok('fondo asociado', $$('.tile strong')[2].textContent === 'Nequi')
ok('estado', txt('.tile-indigo strong') === 'EN_PROCESO')
ok('5 recuadros (sin fecha de creación, no está en la BD)', $$('.tile').length === 5)
ok('último aporte', /^Último aporte: \\$300\\.000 hace 8 días$/.test(txt('.a-info span')), txt('.a-info span'))
ok('banner va a Registrar Aporte', $('.aporte-banner').getAttribute('href') === '/pagos/registrar-aporte?meta=1')
clic('.btn-desactivar'); await espera(() => $('.overlay-meta-modal'))
ok('modal desde el detalle', document.body.className === 'mod-meta-detalle mod-meta-desactivar', document.body.className)
clic('.btn-eliminar-meta'); await espera(() => location.pathname === '/metas')
ok('desactivar vuelve al listado', location.pathname === '/metas')
await espera(() => $$('.tarjeta-meta').length === 3)
ok('ya no aparece', !$$('.tarjeta-meta h3').some((h) => h.textContent === 'Moto Nueva'))`,
  },
  { nombre: 'Detalle meta inactiva', ruta: '/metas/5', h1: 'Detalle de Meta', js: `ok('chip Inactiva', txt('.chip-estado') === 'Inactiva')
ok('sin registrar aporte (RN09.4.4)', !$('.aporte-banner'))
ok('sin editar ni desactivar', !$('.btn-editar') && !$('.btn-desactivar'))` },
  { nombre: 'Detalle meta inexistente', ruta: '/metas/99', redirige: '/metas' },
  {
    nombre: 'Editar meta', ruta: '/metas/1/editar', titulo: 'Editar Meta', body: 'mod-meta-form mod-meta-editar', h1: 'Editar Meta',
    js: `ok('franja', txt('.monto-saldo-franja') === '50% · $6M/$12M', txt('.monto-saldo-franja'))
ok('valores precargados', $('#nombre-meta').value === 'Moto Nueva' && $('#monto-meta').value === '12.000.000')
ok('meses restantes', txt('.chip-meses') === '6 meses restantes', txt('.chip-meses'))
ok('sin campo de fondo (conflicto 16)', !$('.fila-fondo'))
escribir('#monto-meta', '18.000.000'); await pausa(50)
ok('recalcula el ahorro mensual (RN09.3.6)', txt('.c-monto') === '$2.000.000', txt('.c-monto'))
ok('ahorro actual no cambia', txt('.meta-previa-monto') === '$1.000.000/mes')
escribir('#nombre-meta', 'Vivienda'); clic('.btn-guardar'); await pausa(50)
ok('nombre de otra meta activa no se guarda (RN09.3.3)', location.pathname === '/metas/1/editar')
escribir('#nombre-meta', 'Moto Nueva'); clic('.btn-guardar'); await espera(() => location.pathname === '/metas')
await espera(() => $('.tarjeta-meta'))
const moto = $$('.tarjeta-meta').find((t) => t.querySelector('h3').textContent === 'Moto Nueva')
ok('guarda el objetivo y conserva lo ahorrado (RN09.3.8)', moto && txt(moto.querySelector('.detalle-meta')) === '$6.000.000/ $18.000.000', moto && txt(moto.querySelector('.detalle-meta')))`,
  },
  { nombre: 'Editar meta inactiva', ruta: '/metas/5/editar', redirige: '/metas/5' },
  {
    nombre: 'Aporte desde el detalle', ruta: '/metas/1', h1: 'Detalle de Meta',
    js: `clic('.aporte-banner'); await espera(() => location.pathname === '/pagos/registrar-aporte')
await espera(() => $('[name="monto"]'))
ok('abre Registrar Aporte', location.search === '?meta=1')
escribir('[name="monto"]', '200.000'); await pausa(30); clic('.btn-guardar'); await espera(() => location.pathname === '/pagos/historial')
clic('.navegacion-barra a[href="/metas"]'); await espera(() => $('.tarjeta-meta')); clic($$('.tarjeta-meta').find((t) => t.querySelector('h3').textContent === 'Moto Nueva')); await espera(() => location.pathname === '/metas/1')
await espera(() => $('.hero-valor'))
ok('el aporte sube el progreso', txt('.hero-valor') === '51%', txt('.hero-valor'))
ok('último aporte actualizado', /^Último aporte: \\$200\\.000 hoy$/.test(txt('.a-info span')), txt('.a-info span'))`,
  },
  { nombre: 'Aporte a meta inactiva', ruta: '/pagos/registrar-aporte?meta=5', redirige: '/metas' },
]
