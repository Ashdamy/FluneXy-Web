export default [
  {
    nombre: 'Asistente', ruta: '/asistente', titulo: 'Asistente', body: 'mod-asistente', h1: 'Asistente Inteligente',
    js: `const burbujas = () => $$('.mensajes-area .burbuja-mensaje p').map((p) => p.textContent)
ok('menú marca Asistente', txt('.navegacion-barra a.activo') === 'Asistente inteligente')
ok('3 sugerencias de la BD (RN17.4.1)', $$('.chip').length === 3 && txt('.chip') === '¿Cómo registro un nuevo movimiento?')
ok('empieza con el saludo', burbujas().length === 1)
clic($$('.chip')[1]); await pausa(50)
ok('la sugerencia pregunta y responde', burbujas().length === 3 && $$('.mensajes-area > div')[1].className === 'mensaje-usuario' && /módulo Metas/.test(burbujas()[2]), burbujas()[2])
escribir('.entrada-chat input', '¿cómo exporto un reporte a excel?'); clic('.boton-enviar'); await pausa(50)
ok('busca la pregunta frecuente parecida (RN17.3.4)', /Reportes/.test(burbujas()[4]), burbujas()[4])
ok('limpia el campo', $('.entrada-chat input').value === '')
escribir('.entrada-chat input', 'xyz abc'); $('.entrada-chat').requestSubmit(); await pausa(50)
ok('sin respuesta lo dice (RN17.2.2)', /^No tengo una respuesta/.test(burbujas()[6]), burbujas()[6])
escribir('.entrada-chat input', '   '); clic('.boton-enviar'); await pausa(50)
ok('consulta vacía no se envía (RN17.1.1)', burbujas().length === 7)`,
  },
]
