// Wrapper minimo sobre fetch para hablar con la API de Django.
// Todavia no se usa: el backend aun no tiene endpoints.
//
// Uso futuro:  const fondos = await api('/fondos/')
//              await api('/fondos/', { method: 'POST', body: { nombre: 'Nequi' } })

const CLAVE_TOKEN = 'flunexy_token'

export async function api(ruta, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const token = localStorage.getItem(CLAVE_TOKEN)
  if (token) headers.Authorization = `Bearer ${token}`

  const respuesta = await fetch(`/api${ruta}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  const datos = respuesta.status === 204 ? null : await respuesta.json().catch(() => null)
  if (!respuesta.ok) {
    const error = new Error(datos?.detail || `Error ${respuesta.status}`)
    error.status = respuesta.status
    error.datos = datos
    throw error
  }
  return datos
}
