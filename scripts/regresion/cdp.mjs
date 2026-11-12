// Utilidades: servidor de Vite, servidor estatico del prototipo, Chrome headless y cliente CDP.
import { spawn } from 'node:child_process'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'

// Raiz del repo: dos carpetas arriba de scripts/regresion/.
export const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
// Se puede cambiar con la variable de entorno CHROME.
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const pausa = (ms) => new Promise((r) => setTimeout(r, ms))

async function esperarUrl(url, ms = 60000) {
  const t0 = Date.now()
  while (Date.now() - t0 < ms) {
    try {
      const r = await fetch(url)
      if (r.ok) return
    } catch {}
    await pausa(250)
  }
  throw new Error('No respondio ' + url)
}

export async function iniciarVite(puerto = 5199) {
  const proc = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--port', String(puerto), '--strictPort'], {
    cwd: path.join(REPO, 'frontend-react'),
    stdio: 'ignore',
  })
  await esperarUrl(`http://localhost:${puerto}/`)
  return { url: `http://localhost:${puerto}`, cerrar: () => proc.kill() }
}

const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }
export async function iniciarPrototipo(puerto = 5599) {
  const raiz = path.join(REPO, 'frontend')
  const srv = http.createServer((req, res) => {
    const ruta = path.join(raiz, decodeURIComponent(req.url.split('?')[0]))
    if (!ruta.startsWith(raiz) || !fs.existsSync(ruta) || fs.statSync(ruta).isDirectory()) {
      res.writeHead(404)
      return res.end()
    }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(ruta)] || 'application/octet-stream' })
    fs.createReadStream(ruta).pipe(res)
  })
  await new Promise((r) => srv.listen(puerto, r))
  return { url: `http://localhost:${puerto}`, cerrar: () => srv.close() }
}

export async function iniciarChrome(puerto = 9333) {
  const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'flx-chrome-'))
  const proc = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${puerto}`, `--user-data-dir=${perfil}`, '--no-first-run', '--no-default-browser-check', '--window-size=1440,900', 'about:blank'], { stdio: 'ignore' })
  await esperarUrl(`http://127.0.0.1:${puerto}/json/version`)
  const paginas = await (await fetch(`http://127.0.0.1:${puerto}/json/list`)).json()
  const pagina = paginas.find((p) => p.type === 'page')
  const cdp = await conectar(pagina.webSocketDebuggerUrl)
  return {
    cdp,
    cerrar: async () => {
      try { cdp.ws.close() } catch {}
      proc.kill()
      await pausa(300)
      try { fs.rmSync(perfil, { recursive: true, force: true }) } catch {}
    },
  }
}

async function conectar(wsUrl) {
  const ws = new WebSocket(wsUrl)
  await new Promise((r, e) => { ws.onopen = r; ws.onerror = e })
  let id = 0
  const pendientes = new Map()
  const oyentes = new Map()
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data)
    if (msg.id && pendientes.has(msg.id)) {
      const { r, e } = pendientes.get(msg.id)
      pendientes.delete(msg.id)
      msg.error ? e(new Error(msg.error.message)) : r(msg.result)
    } else if (msg.method) {
      for (const fn of oyentes.get(msg.method) ?? []) fn(msg.params)
    }
  }
  const cdp = {
    ws,
    send: (method, params = {}) => new Promise((r, e) => { const i = ++id; pendientes.set(i, { r, e }); ws.send(JSON.stringify({ id: i, method, params })) }),
    on: (evento, fn) => { if (!oyentes.has(evento)) oyentes.set(evento, []); oyentes.get(evento).push(fn) },
    async evaluar(expr) {
      const r = await cdp.send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
      return r.result.value
    },
    async ir(url) {
      const cargada = new Promise((r) => { const fn = () => r(); cdp.on('Page.loadEventFired', fn) })
      await cdp.send('Page.navigate', { url })
      await Promise.race([cargada, pausa(15000)])
      await pausa(150)
    },
    async captura(archivo) {
      const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
      fs.writeFileSync(archivo, Buffer.from(data, 'base64'))
    },
  }
  return cdp
}

// Funciones que cada prueba puede usar dentro de la pagina.
export const AYUDAS = `
window.__t = {
  $: (s) => document.querySelector(s),
  $$: (s) => [...document.querySelectorAll(s)],
  txt: (s) => { const el = typeof s === 'string' ? document.querySelector(s) : s; return el ? el.textContent.trim().replace(/\\s+/g, ' ') : null },
  pausa: (ms) => new Promise((r) => setTimeout(r, ms)),
  async espera(cond, ms = 4000) { const t0 = Date.now(); while (Date.now() - t0 < ms) { try { if (cond()) return true } catch {} await new Promise((r) => setTimeout(r, 30)) } return false },
  escribir(s, v) {
    const el = typeof s === 'string' ? document.querySelector(s) : s
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : el.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v)
    el.dispatchEvent(new Event('input', { bubbles: true }))
    el.dispatchEvent(new Event('change', { bubbles: true }))
  },
  boton(texto, sel = 'button, a') { return [...document.querySelectorAll(sel)].find((b) => b.textContent.trim().replace(/\\s+/g, ' ').includes(texto)) },
  clic(s) { const el = typeof s === 'string' ? document.querySelector(s) : s; if (!el) throw new Error('No existe: ' + s); el.click() },
}
`
