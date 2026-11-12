export default [
  {
    nombre: 'Indicadores', ruta: '/indicadores', titulo: 'Indicadores Financieros', body: 'mod-indicadores', h1: 'Indicadores Financieros',
    js: `ok('menú marca Indicadores', txt('.navegacion-barra a.activo') === 'Indicadores')
ok('4 tarjetas', $$('.ind-tarjeta').length === 4)
ok('endeudamiento calculado', /^\\d+\\.\\d%$/.test(txt($$('.ind-tarjeta')[1].querySelector('.ind-valor'))), txt($$('.ind-tarjeta')[1].querySelector('.ind-valor')))
ok('nivel de endeudamiento', ['Bajo', 'Moderado', 'Alto'].includes(txt($$('.ind-tarjeta')[1].querySelector('.ind-estado'))))
ok('cobertura sin datos', $$('.ind-tarjeta')[3].querySelector('.ind-estado-sin'))
ok('índice global', txt('.ind-hero-numero strong') === '82')`,
  },
  {
    nombre: 'Endeudamiento sigue a Pasivos', ruta: '/pasivos', h1: 'Mis Pasivos',
    js: `clic('.navegacion-barra a[href="/indicadores"]'); await espera(() => $('.ind-tarjeta'))
const antes = parseFloat(txt($$('.ind-tarjeta')[1].querySelector('.ind-valor')))
clic('.navegacion-barra a[href="/pasivos"]'); await espera(() => $('.tarjeta-deuda'))
clic($$('.tarjeta-deuda')[0].querySelector('[title="Desactivar"]')); await espera(() => $('.btn-eliminar-pasivo')); clic('.btn-eliminar-pasivo'); await pausa(60)
clic('.navegacion-barra a[href="/indicadores"]'); await espera(() => $('.ind-tarjeta'))
ok('desactivar un pasivo baja el endeudamiento', parseFloat(txt($$('.ind-tarjeta')[1].querySelector('.ind-valor'))) < antes, antes + ' -> ' + txt($$('.ind-tarjeta')[1].querySelector('.ind-valor')))`,
  },
]
