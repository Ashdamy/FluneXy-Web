// Compara la estructura del DOM (etiqueta + clases, en orden) del prototipo contra React.
//   node comparar.mjs metas      -> usa pares/metas.mjs
// Cada par: { nombre, viejo: 'pages/...html', nuevo: '/ruta', antes?: 'js en la pagina nueva', antesViejo?: 'js' }
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { AYUDAS, iniciarChrome, iniciarPrototipo, iniciarVite } from './cdp.mjs'

const aqui = path.dirname(fileURLToPath(import.meta.url))
const grupo = process.argv[2]
const pares = (await import(pathToFileURL(path.join(aqui, 'pares', `${grupo}.mjs`)).href)).default
const detalle = process.argv.includes('--detalle')

const FIRMA = `(() => {
  const salida = []
  const saltar = new Set(['SCRIPT', 'LINK', 'STYLE', 'META', 'NOSCRIPT'])
  const recorrer = (el, nivel) => {
    for (const hijo of el.children) {
      if (saltar.has(hijo.tagName)) continue
      if (hijo.id === 'root') { recorrer(hijo, nivel); continue }
      const clases = [...hijo.classList].filter((c) => !/^(ph-[a-z-]+)$/.test(c) || true).sort().join('.')
      salida.push('  '.repeat(nivel) + hijo.tagName.toLowerCase() + (clases ? '.' + clases : ''))
      if (hijo.tagName !== 'svg') recorrer(hijo, nivel + 1)
    }
  }
  recorrer(document.body, 0)
  return salida
})()`

function lcs(a, b) {
  const n = a.length, m = b.length
  const t = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1))
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) t[i][j] = a[i] === b[j] ? t[i + 1][j + 1] + 1 : Math.max(t[i + 1][j], t[i][j + 1])
  const ops = []
  let i = 0, j = 0
  while (i < n && j < m) {
    if (a[i] === b[j]) { ops.push(['=', a[i]]); i++; j++ }
    else if (t[i + 1][j] >= t[i][j + 1]) ops.push(['-', a[i++]])
    else ops.push(['+', b[j++]])
  }
  while (i < n) ops.push(['-', a[i++]])
  while (j < m) ops.push(['+', b[j++]])
  return { comunes: t[0][0], ops }
}

const vite = await iniciarVite()
const proto = await iniciarPrototipo()
const chrome = await iniciarChrome()
const { cdp } = chrome
await cdp.send('Page.enable')
await cdp.send('Runtime.enable')
await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: AYUDAS })

for (const par of pares) {
  await cdp.ir(`${proto.url}/${par.viejo}`)
  if (par.antesViejo) await cdp.evaluar(`(async () => { ${par.antesViejo} })()`)
  const viejo = (await cdp.evaluar(FIRMA)).map((l) => l.trim())
  await cdp.ir(vite.url + par.nuevo)
  await cdp.evaluar(`__t.espera(() => document.getElementById('root')?.children.length > 0, 5000)`)
  if (par.antes) await cdp.evaluar(`(async () => { const { $, $$, txt, espera, escribir, boton, clic, pausa } = __t; ${par.antes} })()`)
  await cdp.evaluar(`__t.pausa(150)`)
  const nuevo = (await cdp.evaluar(FIRMA)).map((l) => l.trim())
  const { comunes, ops } = lcs(viejo, nuevo)
  const faltan = ops.filter((o) => o[0] === '-').map((o) => o[1])
  const sobran = ops.filter((o) => o[0] === '+').map((o) => o[1])
  console.log(`\n## ${par.nombre}: ${comunes}/${viejo.length} elementos del prototipo en el mismo orden (React tiene ${nuevo.length})`)
  const resumir = (lista) => Object.entries(lista.reduce((acc, x) => ((acc[x] = (acc[x] || 0) + 1), acc), {})).map(([k, v]) => (v > 1 ? `${k} x${v}` : k))
  if (faltan.length) console.log('  faltan en React: ' + resumir(faltan).slice(0, detalle ? 200 : 25).join(' | '))
  if (sobran.length) console.log('  sobran en React: ' + resumir(sobran).slice(0, detalle ? 200 : 25).join(' | '))
}

await chrome.cerrar()
proto.cerrar()
vite.cerrar()
