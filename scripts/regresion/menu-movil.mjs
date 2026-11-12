// Revisa el menu movil en varias rutas: abre con la hamburguesa, el menu queda
// visible, y al navegar desde el menu se cierra. Tambien guarda capturas a 390px.
import { AYUDAS, iniciarChrome, iniciarVite } from './cdp.mjs'
import fs from 'node:fs'
fs.mkdirSync('capturas', { recursive: true })
const rutas = ['/home', '/fondos', '/movimientos', '/metas', '/metas/nueva', '/balance-financiero', '/indicadores', '/flujo-caja', '/alertas', '/alertas/nueva', '/reportes/generar', '/asistente', '/usuario/editar']
const vite = await iniciarVite()
const c = await iniciarChrome()
const { cdp } = c
await cdp.send('Page.enable'); await cdp.send('Runtime.enable')
await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: AYUDAS })
await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
let fallas = 0
for (const ruta of rutas) {
  await cdp.ir(vite.url + ruta)
  await cdp.evaluar(`__t.espera(() => document.querySelector('.barra-lateral'), 5000)`)
  const r = await cdp.evaluar(`(async () => {
    const { $, pausa, clic } = __t
    const visible = () => { const b = $('.barra-lateral').getBoundingClientRect(); return b.right > 10 && b.left < innerWidth - 10 }
    const antes = visible()
    clic('.menu-hamburguesa'); await pausa(400)
    const abierto = visible()
    const destino = [...document.querySelectorAll('.navegacion-barra a')].find((a) => a.getAttribute('href') !== location.pathname)
    clic(destino); await pausa(400)
    return { antes, abierto, despues: visible(), ruta: location.pathname, ancho: document.documentElement.scrollWidth }
  })()`)
  const ok = !r.antes && r.abierto && !r.despues && r.ancho <= 391
  if (!ok) fallas++
  console.log(`${ok ? 'ok   ' : 'FALLA'} ${ruta}: cerrado al cargar=${!r.antes}, abre=${r.abierto}, cierra al navegar=${!r.despues}, ancho=${r.ancho}`)
}
for (const [ruta, nombre] of [['/metas', 'metas'], ['/alertas/nueva', 'alerta-nueva'], ['/home', 'home'], ['/balance-financiero', 'balance']]) {
  await cdp.ir(vite.url + ruta)
  await cdp.evaluar('__t.pausa(700)')
  await cdp.captura(`capturas/movil-${nombre}.png`)
}
console.log(`MENU MOVIL: ${rutas.length - fallas}/${rutas.length}`)
await c.cerrar(); vite.cerrar()
