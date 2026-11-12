export default [
  {
    nombre: 'Mis Alertas', ruta: '/alertas', titulo: 'Mis Alertas', body: 'mod-alertas mod-alertas-lista', h1: 'Mis Alertas',
    js: `const t = () => $$('.alerta-tarjeta')
ok('menú marca Alertas', txt('.navegacion-barra a.activo') === 'Alertas3', txt('.navegacion-barra a.activo'))
ok('3 tarjetas', t().length === 3)
ok('resumen 2 activas de 3', txt('.alerta-suma-pill') === '2 activas de 3' && txt('.alerta-suma-total') === '3', txt('.alerta-suma-pill'))
ok('umbral con formato del tipo', txt(t()[0].querySelector('.alerta-info span')) === 'UMBRAL: 35%' && txt(t()[1].querySelector('.alerta-info span')) === 'UMBRAL: 1.0x' && txt(t()[2].querySelector('.alerta-info span')) === 'UMBRAL: $3.000.000/mes')
ok('endeudamiento actual calculado', /^\\d+(\\.\\d)?%$/.test(txt(t()[0].querySelector('.alerta-medida strong'))), txt(t()[0].querySelector('.alerta-medida strong')))
ok('inactiva: "—", estado inactiva, Ver y Editar sin Desactivar (conflicto 26)', txt(t()[2].querySelector('.alerta-medida strong')) === '—' && t()[2].querySelector('.alerta-estado-inactiva') && t()[2].querySelectorAll('.alerta-accion').length === 2 && t()[2].querySelector('[title="Editar"]') && !t()[2].querySelector('[title="Desactivar"]'))
clic(t()[0].querySelector('[title="Desactivar"]')); await espera(() => $('.overlay-alerta-modal'))
ok('modal con clase de body', document.body.className === 'mod-alertas mod-alertas-desactivar', document.body.className)
ok('vista previa con las clases del prototipo', $('.preview-alerta .preview-icono-alerta') && $('.preview-info-alerta h3') && txt('.preview-estado-alerta') === 'Activa')
clic('.btn-cancelar-alerta'); await pausa(50)
ok('cancelar cierra', !$('.overlay-alerta-modal'))
clic(t()[0].querySelector('[title="Desactivar"]')); await espera(() => $('.btn-desactivar-alerta')); clic('.btn-desactivar-alerta'); await pausa(60)
ok('desactivar (RN15.5)', txt('.alerta-suma-pill') === '1 activa de 3' && t()[0].querySelector('.alerta-estado-inactiva'), txt('.alerta-suma-pill'))
clic(t()[1]); await espera(() => location.pathname === '/alertas/2')
ok('clic en la tarjeta abre el detalle', location.pathname === '/alertas/2')`,
  },
  {
    nombre: 'Nueva alerta', ruta: '/alertas/nueva', titulo: 'Configurar Alerta', body: 'mod-alertas mod-alertas-configurar', h1: 'Nueva Alerta',
    js: `ok('3 tipos', $$('.fund-card').length === 3)
ok('vista previa', txt('.calc-monto') === 'Endeudamiento ≥ 35%', txt('.calc-monto'))
clic($$('.fund-card')[2]); await pausa(30)
ok('elegir tipo cambia la selección y el desplegable', $$('.fund-card')[2].classList.contains('seleccionada') && txt('.alerta-input') === 'Gasto Mensual')
escribir('[name="umbral"]', '0'); clic('.btn-guardar-alerta'); await pausa(50)
ok('umbral cero no se guarda (RN15.3.1)', location.pathname === '/alertas/nueva')
escribir('[name="umbral"]', '2500000'); await pausa(30)
ok('vista previa en pesos', txt('.calc-monto') === 'Gasto Mensual ≥ $2.500.000', txt('.calc-monto'))
clic('.alerta-input-toggle'); await pausa(30)
ok('interruptor OFF', txt('.alerta-input-toggle') === 'OFF · Notificaciones Inactivas' && txt('.info-chip.indigo') === 'Inactiva')
clic('.alerta-input-toggle'); await pausa(30)
clic('.btn-guardar-alerta'); await espera(() => location.pathname === '/alertas')
await espera(() => $$('.alerta-tarjeta').length === 4)
ok('se guarda y aparece', $$('.alerta-tarjeta').length === 4 && txt('.alerta-suma-pill') === '3 activas de 4', txt('.alerta-suma-pill'))`,
  },
  {
    nombre: 'Porcentaje mayor a 100', ruta: '/alertas/nueva', h1: 'Nueva Alerta',
    js: `escribir('[name="umbral"]', '150'); clic('.btn-guardar-alerta'); await pausa(50)
ok('no se guarda', location.pathname === '/alertas/nueva')`,
  },
  {
    nombre: 'Detalle alerta', ruta: '/alertas/1', titulo: 'Detalle de Alerta', body: 'mod-alertas mod-alertas-detalle', h1: 'Detalle de Alerta',
    js: `ok('tipo', txt('.hero-titulo') === 'Endeudamiento')
ok('umbral', txt('.hero-umbral') === 'Umbral configurado: 35%')
ok('distancia al umbral', /^Faltan \\d+\\.\\d pts para el umbral$/.test(txt('.hero-faltan')), txt('.hero-faltan'))
ok('último valor detectado (RN15.8.2)', txt('.c-valor') === '35.2%', txt('.c-valor'))
ok('5 recuadros (sin fecha de creación)', $$('.tile').length === 5)
ok('origen', $$('.tile strong')[3].textContent === 'Balance')
ok('banner al historial', $('.aporte-banner').getAttribute('href') === '/alertas/historial')
clic('.btn-desactivar'); await espera(() => $('.overlay-alerta-modal'))
ok('modal desde el detalle', document.body.className === 'mod-alertas mod-alertas-detalle mod-alertas-desactivar', document.body.className)
clic('.btn-desactivar-alerta'); await espera(() => location.pathname === '/alertas')
ok('vuelve al listado', location.pathname === '/alertas')`,
  },
  { nombre: 'Detalle alerta inactiva', ruta: '/alertas/3', h1: 'Detalle de Alerta', js: `ok('con Editar y sin Desactivar (conflicto 26, RN15.5.3)', $('.btn-editar') && !$('.btn-desactivar'))
ok('estado INACTIVA', txt('.tile-indigo strong') === 'INACTIVA')` },
  { nombre: 'Detalle alerta inexistente', ruta: '/alertas/99', redirige: '/alertas' },
  {
    nombre: 'Editar alerta', ruta: '/alertas/2/editar', titulo: 'Editar Alerta', body: 'mod-alertas mod-alertas-configurar', h1: 'Editar Alerta',
    js: `ok('tipo precargado', $$('.fund-card')[1].classList.contains('seleccionada'))
ok('umbral precargado', $('[name="umbral"]').value === '1')
ok('símbolo ≤ para liquidez', txt('.simbolo') === '≤')
escribir('[name="umbral"]', '1,2'); clic('.btn-guardar-alerta'); await espera(() => location.pathname === '/alertas/2')
await espera(() => $('.hero-umbral'))
ok('guarda y vuelve al detalle', txt('.hero-umbral') === 'Umbral configurado: 1.2x', txt('.hero-umbral'))`,
  },
  {
    nombre: 'Reactivar alerta inactiva', ruta: '/alertas/3/editar', titulo: 'Editar Alerta', h1: 'Editar Alerta',
    js: `ok('el formulario se abre', location.pathname === '/alertas/3/editar' && $('.alerta-input-toggle'))
ok('el interruptor empieza en OFF', txt('.alerta-input-toggle') === 'OFF · Notificaciones Inactivas')
clic('.alerta-input-toggle'); await pausa(30); clic('.btn-guardar-alerta'); await espera(() => location.pathname === '/alertas/3')
await espera(() => $('.tile-indigo strong'))
ok('queda activa (HU15.4)', txt('.tile-indigo strong') === 'ACTIVA' && $('.btn-desactivar'))`,
  },
  {
    nombre: 'Historial de alertas', ruta: '/alertas/historial', titulo: 'Historial de Alertas', body: 'mod-alertas mod-alertas-historial', h1: 'Historial de Alertas',
    js: `const fechas = await import('/src/datos/alertas.js').then((m) => m.listarHistorial().map((h) => h.fecha))
ok('4 alertas generadas', $$('.alerta-tarjeta').length === 4)
ok('de la más reciente a la más antigua (RN15.7.1)', fechas.every((f, i) => i === 0 || fechas[i - 1] >= f))
ok('motivo y valor', txt('.alerta-info h4') === 'Endeudamiento superó 35%' && txt('.alerta-medida strong') === '35.2%')
ok('sin notificar', txt($$('.alerta-estado')[3]) === 'Sin notificar')
ok('total', txt('.alerta-suma-total') === '4')`,
  },
]
