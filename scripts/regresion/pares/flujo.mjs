const vaciar = `const [mov, pla, pas, met] = await Promise.all(['movimientos', 'plantillas', 'pasivos', 'metas'].map((m) => import('/src/datos/' + m + '.js')))
mov.listarMovimientos().forEach((m) => mov.desactivarMovimiento(m.id)); pla.listarPlantillas().forEach((p) => pla.desactivarPlantilla(p.id))
pas.listarPasivos().forEach((p) => pas.desactivarPasivo(p.id)); met.listarMetas().forEach((m) => met.desactivarMeta(m.id))
clic('.navegacion-barra a[href="/home"]'); await pausa(100); clic('.navegacion-barra a[href="/flujo-caja"]'); await espera(() => $('.flujo-vacio'))`
export default [
  { nombre: 'Flujo de caja', viejo: 'pages/flujo-caja/flujo-caja.html', nuevo: '/flujo-caja' },
  { nombre: 'Flujo vacío', viejo: 'pages/flujo-caja/flujo-vacio.html', nuevo: '/flujo-caja', antes: vaciar },
]
