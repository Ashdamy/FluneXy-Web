# Regresión de FluneXy React

Pruebas automáticas que abren la aplicación en Chrome sin ventana (Chrome headless, controlado por CDP) y revisan cada pantalla:

- el título de la pestaña, la clase del `<body>`, el `<h1>` y los errores de consola;
- lo que hace la pantalla: crear, editar, desactivar, buscar, validar.

No usan librerías: solo Node y el Chrome instalado. Están fuera de `frontend-react/src/` y no forman parte de la aplicación.

## Requisitos
- Node 20 o más nuevo y las dependencias de `frontend-react` instaladas (`npm install` en esa carpeta).
- Google Chrome. Si no está en `C:/Program Files/Google/Chrome/Application/chrome.exe`, indica la ruta con la variable de entorno `CHROME`.

Cada script levanta su propio servidor de Vite en el puerto 5199, así que no choca con `npm run dev` (5173).

## Cómo correrla
Desde esta carpeta (`scripts/regresion/`):

```bash
bash verificar.sh                     # lint + build + regresión en escritorio y en celular, con una línea de resumen
node regresion.mjs                    # solo la regresión en escritorio (1440 px)
node regresion.mjs --movil            # en celular (390 px): sin desborde horizontal y con menú hamburguesa
node regresion.mjs --solo=metas       # solo un archivo de casos/ (por nombre)
node regresion.mjs --capturas         # además guarda una captura por caso en capturas/
node comparar.mjs metas               # compara el DOM con el prototipo (usa pares/metas.mjs)
node menu-movil.mjs                   # abre y cierra el menú hamburguesa en varias rutas
node captura.mjs nombre nuevo /metas  # captura de una ruta (o "viejo" y una página del prototipo)
```

Cada corrida termina con `RESULTADO n/m comprobaciones pasan`. Si algo falla, se imprime `FALLA [archivo] caso -> comprobación: detalle`.

## Cómo agregar casos
- `casos/NN-modulo.mjs` exporta una lista de casos:
  - `ruta`: la página que se abre;
  - `titulo`, `body`, `h1` y `redirige`: lo que se espera ver;
  - `js`: código que corre dentro de la página. Usa `ok(nombre, condición, detalle)` y las ayudas `$`, `$$`, `txt`, `clic`, `escribir`, `espera`, `pausa` y `boton`.
- Cada caso empieza con la página recién cargada, así que los datos en memoria vuelven a los de prueba.
- Para leer o cambiar los datos desde una prueba: `await import('/src/datos/metas.js')`. Devuelve el mismo módulo que usa la aplicación.
- `pares/modulo.mjs` lista las parejas `{ viejo: 'pages/...html', nuevo: '/ruta' }` que usa `comparar.mjs`.

La carpeta `capturas/` se crea al correr y no se sube a git.
