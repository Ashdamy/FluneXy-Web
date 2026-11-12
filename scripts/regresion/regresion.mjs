// Regresion de FluneXy React.
//   node regresion.mjs                -> escritorio (1440x900)
//   node regresion.mjs --movil        -> 390x844, revisa desborde horizontal y menu
//   node regresion.mjs --solo=metas   -> solo un archivo de casos
//   node regresion.mjs --capturas     -> guarda PNG de cada ruta en ./capturas
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { AYUDAS, iniciarChrome, iniciarVite } from './cdp.mjs'

const aqui = path.dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const movil = args.includes('--movil')
const capturas = args.includes('--capturas')
const solo = args.find((a) => a.startsWith('--solo='))?.slice(7)

const archivos = fs.readdirSync(path.join(aqui, 'casos')).filter((f) => f.endsWith('.mjs')).sort()
const casos = []
for (const f of archivos) {
  if (solo && !f.includes(solo)) continue
  const mod = await import(pathToFileURL(path.join(aqui, 'casos', f)).href)
  for (const c of mod.default) casos.push({ ...c, archivo: f })
}

const vite = await iniciarVite()
const chrome = await iniciarChrome()
const { cdp } = chrome
let errores = []
cdp.on('Runtime.exceptionThrown', (p) => errores.push(p.exceptionDetails.exception?.description || p.exceptionDetails.text))
cdp.on('Runtime.consoleAPICalled', (p) => {
  if (p.type === 'error' || p.type === 'warning') errores.push(p.args.map((a) => a.value ?? a.description).join(' '))
})
await cdp.send('Page.enable')
await cdp.send('Runtime.enable')
await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: AYUDAS })
await cdp.send('Emulation.setDeviceMetricsOverride', movil ? { width: 390, height: 844, deviceScaleFactor: 2, mobile: true } : { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
if (capturas) fs.mkdirSync(path.join(aqui, 'capturas'), { recursive: true })

const resultados = []
for (const caso of casos) {
  errores = []
  const filas = []
  try {
    await cdp.ir(vite.url + caso.ruta)
    await cdp.evaluar(`__t.espera(() => document.getElementById('root')?.children.length > 0 && document.title !== 'FluneXy', 5000)`)
    const info = await cdp.evaluar(`({ titulo: document.title, body: document.body.className, h1: __t.txt('h1'), ruta: location.pathname + location.search })`)
    if (caso.titulo !== undefined) filas.push(['título', info.titulo === `${caso.titulo} | FluneXy`, info.titulo])
    if (caso.body !== undefined) filas.push(['clase body', info.body === caso.body, info.body])
    if (caso.h1 !== undefined) filas.push(['h1', info.h1 === caso.h1, info.h1])
    if (caso.redirige !== undefined) filas.push(['redirige', info.ruta === caso.redirige, info.ruta])
    if (movil) {
      const m = await cdp.evaluar(`(async () => { await __t.pausa(200); const d = document.documentElement; return { ancho: d.scrollWidth, vista: innerWidth, hamb: !!document.querySelector('.menu-hamburguesa') && getComputedStyle(document.querySelector('.menu-hamburguesa')).display !== 'none' } })()`)
      filas.push(['móvil: sin desborde horizontal', m.ancho <= m.vista + 1, `${m.ancho}px de ${m.vista}px`])
      if (caso.app !== false) filas.push(['móvil: menú hamburguesa visible', m.hamb, ''])
    } else if (caso.js) {
      const r = await cdp.evaluar(`(async () => { const { $, $$, txt, espera, escribir, boton, clic, pausa } = __t; const R = []; const ok = (n, c, d = '') => R.push([n, !!c, String(d)]); try { ${caso.js} } catch (e) { R.push(['excepción en la prueba', false, e.message]) } return R })()`)
      filas.push(...r)
    }
    if (capturas) await cdp.captura(path.join(aqui, 'capturas', `${movil ? 'movil-' : ''}${caso.archivo.replace('.mjs', '')}-${caso.nombre.replace(/[^\w]+/g, '_')}.png`))
  } catch (e) {
    filas.push(['carga de la página', false, e.message])
  }
  const reales = errores.filter((e) => !/Download the React DevTools|React Router Future Flag/i.test(e))
  filas.push(['sin errores de consola', reales.length === 0, reales.slice(0, 2).join(' | ').slice(0, 300)])
  resultados.push({ caso, filas })
}

await chrome.cerrar()
vite.cerrar()

let total = 0
let fallas = 0
const porArchivo = {}
for (const { caso, filas } of resultados) {
  porArchivo[caso.archivo] ??= { ok: 0, mal: 0 }
  for (const [nombre, ok, detalle] of filas) {
    total++
    if (ok) porArchivo[caso.archivo].ok++
    else {
      fallas++
      porArchivo[caso.archivo].mal++
      console.log(`FALLA  [${caso.archivo}] ${caso.nombre} -> ${nombre}: ${detalle}`)
    }
  }
}
for (const [f, c] of Object.entries(porArchivo)) console.log(`${f.padEnd(22)} ${c.ok} ok, ${c.mal} fallas`)
console.log(`RESULTADO ${movil ? '(móvil) ' : ''}${total - fallas}/${total} comprobaciones pasan`)
process.exit(fallas ? 1 : 0)
