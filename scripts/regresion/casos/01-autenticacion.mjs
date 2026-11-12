const formulario = `ok('tiene contenido', $('main.contenedor-autenticacion') && $('main.contenedor-autenticacion').children.length > 0)
ok('sin barra lateral', !$('.barra-lateral'))`
export default [
  { nombre: 'Iniciar sesión', ruta: '/autenticacion/iniciar-sesion', titulo: 'Iniciar sesión', body: 'mod-auth', app: false, js: formulario },
  { nombre: 'Registro', ruta: '/autenticacion/registro', titulo: 'Registro', body: 'mod-auth', app: false, js: formulario },
  { nombre: 'Recuperar', ruta: '/autenticacion/recuperar-contrasena', titulo: 'Recuperar Contraseña', body: 'mod-auth', app: false, js: formulario },
  { nombre: 'Verificación', ruta: '/autenticacion/verificacion-contrasena', titulo: 'Verificar contraseña', body: 'mod-auth', app: false, js: formulario },
  { nombre: 'Nueva contraseña', ruta: '/autenticacion/nueva-contrasena', titulo: 'Nueva contraseña', body: 'mod-auth', app: false, js: formulario },
  { nombre: 'Cierre de sesión', ruta: '/autenticacion/cierre-sesion', titulo: 'Sesión Cerrada', body: 'mod-auth', app: false, js: formulario },
]
