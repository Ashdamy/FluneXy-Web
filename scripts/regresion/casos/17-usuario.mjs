const clave = 'Nueva#Clave9'
export default [
  {
    nombre: 'Mi perfil', ruta: '/usuario', titulo: 'Mi Perfil', body: 'mod-usuario', h1: 'Mi Perfil',
    js: `ok('menú marca Mi perfil', txt('.navegacion-barra a.activo') === 'Mi perfil')
ok('datos del usuario 1 de la BD', txt('.mp-hero-info h2') === 'Ana Milena Sierra' && txt('.mp-hero-info p') === 'anamilena@ejemplo.com')
ok('miembro desde', txt('.mp-pill-miembro') === 'Miembro desde 12 Ene 2025')
ok('3 acciones', $$('.mp-accion').length === 3 && $$('.mp-accion')[2].getAttribute('href') === '/usuario/desactivar-cuenta')`,
  },
  {
    nombre: 'Editar perfil', ruta: '/usuario/editar', titulo: 'Editar Perfil', body: 'mod-usuario', h1: 'Editar Perfil',
    js: `ok('menú marca Mi perfil', txt('.navegacion-barra a.activo') === 'Mi perfil')
escribir('#ep-nombre', 'Ana'); await pausa(30)
ok('vista previa', txt('.ep-preview strong') === 'Ana Sierra')
escribir('#ep-correo', 'no-es-correo'); clic('.ep-boton-guardar'); await pausa(50)
ok('correo inválido no se guarda', location.pathname === '/usuario/editar')
escribir('#ep-correo', 'ana@ejemplo.com'); escribir('#ep-apellido', ''); clic('.ep-boton-guardar'); await pausa(50)
ok('campo vacío no se guarda (RN02.5.3)', location.pathname === '/usuario/editar')
escribir('#ep-apellido', 'Sierra'); clic('.ep-boton-guardar'); await espera(() => location.pathname === '/usuario')
await espera(() => $('.mp-hero-info h2'))
ok('guarda y muestra los datos', txt('.mp-hero-info h2') === 'Ana Sierra' && txt('.mp-hero-info p') === 'ana@ejemplo.com')
clic('.navegacion-barra a[href="/home"]'); await espera(() => $('.saludo h1'))
ok('el saludo de Inicio cambia', txt('.saludo h1') === 'Hola, Ana')`,
  },
  {
    nombre: 'Cambiar contraseña', ruta: '/usuario/cambiar-contrasena', titulo: 'Cambiar Contraseña', body: 'mod-usuario', h1: 'Cambiar Contraseña',
    js: `const ir = () => clic('.ep-boton-guardar')
escribir('#actual', 'Vieja#Clave1'); escribir('#nueva', 'corta'); escribir('#confirmar', 'corta'); ir(); await pausa(50)
ok('no cumple RN02.3', location.pathname === '/usuario/cambiar-contrasena')
escribir('#nueva', 'Vieja#Clave1'); escribir('#confirmar', 'Vieja#Clave1'); ir(); await pausa(50)
ok('igual a la actual no se acepta (RN02.6.4)', location.pathname === '/usuario/cambiar-contrasena')
escribir('#nueva', '${clave}'); escribir('#confirmar', 'Otra#Clave9'); ir(); await pausa(50)
ok('confirmación distinta no se acepta (RN02.6.3)', location.pathname === '/usuario/cambiar-contrasena')
escribir('#confirmar', '${clave}'); ir(); await espera(() => location.pathname === '/usuario')
ok('válida vuelve al perfil', location.pathname === '/usuario')`,
  },
  {
    nombre: 'Desactivar cuenta', ruta: '/usuario/desactivar-cuenta', titulo: 'Desactivar Cuenta', body: 'mod-usuario', h1: 'Desactivar Cuenta',
    js: `clic('.dc-boton-desactivar'); await pausa(50)
ok('sin contraseña no desactiva (RN02.7.2)', location.pathname === '/usuario/desactivar-cuenta')
escribir('#confirmar-contrasena', 'algo'); clic('.dc-boton-desactivar'); await espera(() => location.pathname === '/autenticacion/cierre-sesion')
ok('desactiva y cierra la sesión (RN02.7.5)', location.pathname === '/autenticacion/cierre-sesion')
const { obtenerUsuario } = await import('/src/datos/usuario.js')
ok('la cuenta queda inactiva (RN02.7.3)', obtenerUsuario().activo === false)`,
  },
]
