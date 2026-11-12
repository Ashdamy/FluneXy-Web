// Los datos se leen con import() del mismo modulo que usa la app (servidor de Vite).
export default [
  {
    nombre: 'Flujo de caja', ruta: '/flujo-caja', titulo: 'Flujo de Caja', body: 'mod-flujo-caja', h1: 'Flujo de Caja',
    js: `const { flujoDelMes } = await import('/src/datos/flujoCaja.js')
const f = flujoDelMes()
const n = (s) => Number(s.replace(/[^0-9]/g, '')) * (s.trim().startsWith('-') ? -1 : 1)
const montos = $$('.monto-componente').map((e) => txt(e))
ok('menú marca Flujo de caja', txt('.navegacion-barra a.activo') === 'Flujo de caja')
ok('4 componentes', montos.length === 4)
ok('saldo = ingresos - gastos - cuotas - metas (RN12.6.1)', n(txt('.tarjeta-saldo-proyectado h2')) === n(montos[0]) + n(montos[1]) + n(montos[2]) + n(montos[3]), montos.join(' ') + ' = ' + txt('.tarjeta-saldo-proyectado h2'))
ok('cuotas del mes de pasivos activos', f.cuotasDeuda > 0, f.cuotasDeuda)
ok('ahorro de metas = ahorro mensual de metas en progreso', f.ahorroMetas === 1000000 + 1805556 + 833334, f.ahorroMetas)
ok('pill según el signo', $('.pill-saldo').classList.contains(f.saldo >= 0 ? 'positivo' : 'negativo'))
ok('periodo = mes actual', /^(Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre) \\d{4}$/.test(txt('.texto-periodo')), txt('.texto-periodo'))`,
  },
  {
    nombre: 'Flujo sigue a Movimientos', ruta: '/movimientos/nuevo?tipo=ingreso', h1: 'Nuevo Movimiento',
    js: `const { flujoDelMes } = await import('/src/datos/flujoCaja.js')
const antes = flujoDelMes().ingresos
escribir('#monto', '100.000'); await pausa(50); clic(boton('Guardar Movimiento')); await espera(() => location.pathname === '/movimientos')
clic('.navegacion-barra a[href="/flujo-caja"]'); await espera(() => $('.monto-componente'))
ok('un ingreso nuevo suma a Ingresos Estimados', flujoDelMes().ingresos === antes + 100000, antes + ' -> ' + flujoDelMes().ingresos)
ok('y se ve en la pantalla', txt($('.monto-componente')) === '+$' + (antes + 100000).toLocaleString('es-CO'), txt($('.monto-componente')))`,
  },
  {
    nombre: 'Flujo vacío', ruta: '/home',
    js: `const [mov, pla, pas, met] = await Promise.all(['movimientos', 'plantillas', 'pasivos', 'metas'].map((m) => import('/src/datos/' + m + '.js')))
mov.listarMovimientos().forEach((m) => mov.desactivarMovimiento(m.id))
pla.listarPlantillas().forEach((p) => pla.desactivarPlantilla(p.id))
pas.listarPasivos().forEach((p) => pas.desactivarPasivo(p.id))
met.listarMetas().forEach((m) => met.desactivarMeta(m.id))
clic('.navegacion-barra a[href="/flujo-caja"]'); await espera(() => $('.flujo-vacio'))
ok('sin información: estado vacío (RN12.6.5)', $('.flujo-vacio') && $('.selector-periodo.selector-vacio'))
ok('texto del vacío', txt('.flujo-vacio h2') === 'Sin información financiera')`,
  },
]
