# Guía de la migración a React

Una sección por cada cambio grande de la migración: qué archivos se crearon o tocaron, por qué, qué conceptos de React aparecieron por primera vez y qué se comparó contra el HTML viejo de `frontend/`.

Los módulos anteriores (Autenticación a Pagos) se migraron antes de crear esta guía; sus decisiones están en [decisiones-implementacion.md](decisiones-implementacion.md) y en los mensajes de commit.

## Cómo se verifica cada módulo
- `npm run lint` (oxlint) y `npm run build` (Vite) sin errores.
- Una regresión automática que abre la aplicación en Chrome sin ventana y revisa, por cada ruta, el título de la pestaña, la clase del `<body>`, el `<h1>`, que no haya errores en la consola y lo que hace cada pantalla (crear, desactivar, buscar...). Se corre completa después de cada módulo, así un cambio en un módulo no rompe otro sin que se note.
- Una comparación de la estructura del DOM (etiquetas y clases en el mismo orden) entre cada HTML viejo y su pantalla en React.
- La misma regresión a 390 px de ancho (celular): sin desborde horizontal y con el menú hamburguesa.

## Fondos: Editar en fondos inactivos
**Archivos:** `paginas/fondos/MisFondos.jsx`, `DetalleFondo.jsx` y `EditarFondo.jsx`.

**Por qué:** HU04.3 permite editar cualquier fondo del usuario y RN04.4.2 solo prohíbe desactivar uno que ya está inactivo. Antes la aplicación escondía también el botón Editar y la ruta `/fondos/:id/editar` devolvía al detalle. Ahora el inactivo muestra Ver y Editar, pero no Desactivar. Los demás módulos siguen sin Editar ni Desactivar en los inactivos.

**Concepto de React:** *renderizado condicional*. `{fondo.activo && <button>…}` dibuja el botón solo si la condición es verdadera. Antes la condición envolvía los dos botones; ahora envuelve solo el de Desactivar.

**Comparado con el HTML viejo:** la tarjeta inactiva de `mis-fondos.html` trae los tres botones; React deja Ver y Editar, por RN04.4.2.
