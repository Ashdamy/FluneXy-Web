// node captura.mjs nombre viejo|nuevo ruta [ancho]
import { iniciarChrome, iniciarPrototipo, iniciarVite, AYUDAS } from './cdp.mjs'
import fs from 'node:fs'
fs.mkdirSync('capturas', { recursive: true })
const [nombre, cual, ruta, ancho = '1440', js = ''] = process.argv.slice(2)
const srv = cual === 'viejo' ? await iniciarPrototipo() : await iniciarVite()
const c = await iniciarChrome(); const { cdp } = c
await cdp.send('Page.enable'); await cdp.send('Runtime.enable'); await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: AYUDAS })
await cdp.send('Emulation.setDeviceMetricsOverride', { width: Number(ancho), height: 900, deviceScaleFactor: 1, mobile: Number(ancho) < 600 })
await cdp.ir(srv.url + (cual === 'viejo' ? '/' : '') + ruta)
await cdp.evaluar('__t.pausa(900)')
if (js) await cdp.evaluar(`(async () => { const { $, $$, txt, espera, escribir, boton, clic, pausa } = __t; ${js}; await pausa(300) })()`)
await cdp.captura(`capturas/${nombre}.png`)
await c.cerrar(); srv.cerrar()
