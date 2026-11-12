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

## Fondos: actividad del fondo desde Movimientos
**Archivos:** `datos/movimientos.js` (nueva función `movimientosDeFondo`), `paginas/fondos/DetalleFondo.jsx` y `datos/fondos.js` (se quitan los campos fijos `actividad` y `transacciones`).

**Por qué:** "Actividad reciente" y "Transacciones" eran datos fijos copiados del prototipo, así que un movimiento nuevo no se veía en el fondo. Ahora salen de Movimientos, incluidos los automáticos "Saldo inicial" (RN04.1.4) y "Ajuste de saldo" (RN04.3.4). Solo cuentan los activos (RN05.4.5).

**Concepto de React:** *datos derivados*. La lista no se guarda en el estado de la página: se calcula en cada render a partir de la fuente (`movimientosDeFondo(fondo.id)`). Así no hay dos copias del mismo dato que puedan quedar distintas.

**Comparado con el HTML viejo:** mismas clases (`item-transaccion ingreso|gasto`, `punto`, `p`, `strong`) y el mismo máximo de 3 filas; solo cambian los textos y montos, que ahora son los reales.

## Metas
**Archivos creados**
- `paginas/metas/MisMetas.jsx`: listado con resumen, buscador, tarjetas, modal de desactivar y estado vacío.
- `paginas/metas/NuevaMeta.jsx`: formulario con vista previa que se recalcula mientras se escribe.
- `paginas/metas/DetalleMeta.jsx`: progreso, ahorro mensual, días restantes, información y "Registrar Aporte".
- `paginas/metas/EditarMeta.jsx`: edición de nombre, monto y fecha con el "nuevo cálculo automático".
- `paginas/metas/ModalDesactivarMeta.jsx`: los textos del modal; el HTML lo pone `ModalConfirmar`, porque el de Metas es igual al de Fondos, Activos y Pasivos.
- `paginas/metas/CamposMeta.jsx`: la lista de fondos para elegir.

**Archivos cambiados**
- `datos/metas.js`: ahora tiene todos los campos de la tabla `metas` y los cálculos (progreso, meses restantes, ahorro mensual, estado).
- `datos/pagos.js`: nueva función `aportesDeMeta`.
- `componentes/CampoFecha.jsx`: nueva propiedad `min`.
- `ajustes-react.css`: el campo de fecha de Metas usa el mismo ajuste que el de Activos y Pasivos.
- `App.jsx`: las 4 rutas de Metas dejan de ser placeholder.

Para el estado vacío se reutiliza `EstadoVacio`, porque `metas-vacio.html` tiene el mismo HTML que los demás.

**Reglas aplicadas:** RN09.1.1 (solo fondos activos), RN09.1.2 y RN09.3.3 (nombre único entre metas activas), RN09.1.3 y RN09.3.4 (monto mayor que cero), RN09.1.4 y RN09.3.5 (fecha hoy o posterior), RN09.1.5 y RN09.1.6 (ahorro mensual, con la decisión del conflicto 15), RN09.1.7 (empieza en 0 % y En progreso), RN09.1.8 (crear no toca el fondo), RN09.2.2 (datos del detalle), RN09.2.3 (progreso calculado), RN09.2.4 (estado calculado, con límites provisionales), RN09.2.5 (Registrar Aporte va a Pagos), RN09.3.2 y RN09.4.2 (solo activas), RN09.3.6 (recalcula), RN09.3.8 (editar no cambia lo ahorrado), RN09.4.3 a RN09.4.6 (desactivar conserva todo y bloquea aportes).

**Conceptos de React que aparecen por primera vez en esta guía**
- *Una página en dos componentes.* React exige que los hooks (`useState`, `useNavigate`...) se llamen siempre, en el mismo orden y antes de cualquier `return`. `NuevaMeta` primero revisa si hay fondos activos y, si no hay, redirige con `<Navigate>`. Solo si los hay dibuja `<FormularioMeta>`, que es donde viven los `useState` del formulario. Así nunca queda un hook después de un `return`.
- *`<Link>` en vez de `<a href>`.* El banner "Registrar Aporte" es un `<Link to="...">`. En el HTML final sigue siendo un `<a>` con la misma clase, pero al hacer clic React Router cambia de página sin recargar, y los datos en memoria se conservan.
- *Propiedades opcionales.* `CampoFecha` recibió `min`. Si una página no lo pasa, vale `undefined` y React no pone el atributo, así que Activos y Pasivos siguen igual.
- *Clic que no "sube".* La tarjeta completa abre el detalle; los botones de adentro llaman `evento.stopPropagation()` para que su clic no llegue también a la tarjeta.

**Comparado con el HTML viejo** (estructura de etiquetas y clases en el mismo orden)
- Mis Metas: 216 de 220 elementos. Solo cambian los 4 íconos de cada meta (moto, casa, avión, libros), que no tienen dato en la BD (conflicto 17).
- Estado vacío: 87 de 87.
- Nueva Meta: 141 de 143. Se agrega el `<form>`, como en los demás módulos, y el ícono de Nequi es el de "Billetera Digital" que usa toda la aplicación.
- Detalle: 139 de 145. Falta el recuadro "Fecha creación", que no existe en la BD.
- Editar: 135 de 137. Cambian los íconos y se agrega el `<form>`.
- Modal: el HTML del modal coincide completo; la diferencia está en el listado de fondo, porque el prototipo dibuja ahí una sola tarjeta y otro encabezado.
- También se compararon capturas de Nueva Meta a 1440 px contra el prototipo, y la disposición es la misma.

## Balance financiero
**Archivos:** `paginas/balance/BalanceFinanciero.jsx` (nuevo), `componentes/EncabezadoPagina.jsx` (nueva propiedad `extra`) y `App.jsx`.

**Por qué:** el balance no es una tabla de la BD; se calcula cada vez con los activos y pasivos vigentes. Total de activos (RN13.2.1), total de pasivos activos (RN13.3.1 y RN13.3.2), patrimonio = activos − pasivos (RN13.1.3 y RN13.4.1) y endeudamiento = pasivos ÷ activos (RN13.6.1, con la misma función que Mis Pasivos). La liquidez queda fija en "1.6x" porque la documentación no da su fórmula (conflicto 21). El selector de fecha de corte es decorativo porque la BD no guarda historial (conflicto 22).

**Concepto de React:** *pasar JSX como propiedad*. `EncabezadoPagina` recibe `extra={selector}`, un pedazo de JSX armado en la página. Si llega, el encabezado lo dibuja junto a los botones dentro de `acciones-derecha-pagina`, como en el prototipo; si no llega, el encabezado queda igual que en las demás páginas.

**Comparado con el HTML viejo:** 144 de 145 elementos. Solo falta un `<span>` dentro del botón de perfil, que el prototipo pone en algunas páginas y en otras no, y que ningún CSS usa.

## Indicadores financieros
**Archivos:** `paginas/indicadores/IndicadoresFinancieros.jsx` (nuevo) y `App.jsx`.

**Por qué:** la documentación (MOD14) no dice qué indicadores hay ni cómo se calculan (conflicto 24), y habla de indicadores "almacenados" que la BD no tiene (conflicto 23). Se calcula solo el endeudamiento, el único con fórmula (RN13.6.1); su estado usa los niveles de Mis Pasivos. Liquidez, Ahorro Mensual, Cobertura de Deuda y el Índice de Salud Financiera muestran los valores del prototipo.

**Concepto de React:** *un componente que se repite*. Las 4 tarjetas tienen el mismo HTML, así que se escribió `TarjetaIndicador` una vez y se usa 4 veces con distintas propiedades. `claseEstado` tiene un valor por defecto (`'ind-estado'`), y solo la tarjeta "Sin datos" pasa otro.

**Comparado con el HTML viejo:** 138 de 140 elementos. En la tarjeta de Liquidez el prototipo usa `<i class="ind-punto">` y en las otras `<span class="ind-punto">`; React usa `<span>` en las 4. Además falta el `<span>` del botón de perfil, igual que en Balance.

## Flujo de caja
**Archivos:** `datos/flujoCaja.js` (nuevo: el cálculo), `paginas/flujoCaja/FlujoCaja.jsx` (nuevo: la pantalla y su estado vacío) y `App.jsx`.

**Por qué:** el flujo no es una tabla de la BD; se calcula con los datos de otros módulos (RN12.1.2, RN12.1.4). Para el mes actual suma:
- ingresos y gastos: movimientos activos del mes, más las ejecuciones de plantillas activas que todavía no llegan (RN12.2 y RN12.3);
- cuotas de deuda: las de pasivos activos que vencen en el mes, cada una una sola vez (RN12.4.1 y RN12.4.3);
- ahorro de metas: el ahorro mensual de las metas en progreso (RN12.5.1).

El saldo es ingresos − gastos − cuotas − metas (RN12.6.1 y RN12.6.2). Sin ningún registro del periodo se muestra el estado vacío (RN12.6.5). Qué cuenta como "estimado" y "programado" quedó en el conflicto 25.

**Concepto de React:** *separar el cálculo de la pantalla*. `flujoDelMes()` vive en `datos/`, no en el componente. La pantalla solo dibuja lo que esa función devuelve, y la misma función la podrán usar Home y Reportes sin copiar la lógica.

**Comparado con el HTML viejo:** flujo, 123 de 123 elementos; vacío, 92 de 92. El estado vacío no usa `EstadoVacio`, porque `flujo-vacio.html` tiene otro HTML (`estado-vacio flujo-vacio`, `ilustracion-estado-vacio`...).

## Alertas
**Archivos creados**
- `datos/alertas.js`: configuraciones e historial, con la forma de `alertas_configuracion` y `alertas_historial`, más los tres tipos del prototipo (conflicto 27).
- `paginas/alertas/MisAlertas.jsx`: listado, modal y estado vacío.
- `paginas/alertas/FormularioAlerta.jsx`: exporta `NuevaAlerta` y `EditarAlerta`, que comparten un solo formulario.
- `paginas/alertas/DetalleAlerta.jsx`.
- `paginas/alertas/HistorialAlertas.jsx`.
- `paginas/alertas/ModalDesactivarAlerta.jsx`.

**Archivos cambiados**
- `componentes/ModalConfirmar.jsx`: tres clases opcionales de la vista previa.
- `ajustes-react.css`: el campo del umbral y el cursor de los controles.

**Reglas aplicadas:** RN15.2.1 y RN15.2.2 (un tipo de los definidos), RN15.3.1 (umbral numérico mayor que cero), RN15.4.3 (activa o inactiva, con el interruptor), RN15.5.1 a RN15.5.4 (desactivar conserva la configuración y el historial), RN15.7.1 (historial de la más reciente a la más antigua) y RN15.8.2 (valor, fecha y motivo).

La generación automática (RN15.6) es del backend. Reactivar una alerta quedó en el conflicto 26, porque choca con tu regla de no mostrar Editar en los inactivos.

**Conceptos de React**
- *Un archivo que exporta dos componentes.* `NuevaAlerta` y `EditarAlerta` son casi iguales, así que las dos dibujan el mismo `<Formulario>`. La edición le pasa `alerta={...}` y la creación no; adentro, `alerta ? ... : ...` decide el título y los botones.
- *Controles que no son `<input>`.* El interruptor ON/OFF y las tarjetas de tipo eran `<div>` en el prototipo. Siguen siendo `<div>`, para que el CSS aplique igual, pero con `role="switch"` o `role="button"`, `tabIndex={0}` (se pueden alcanzar con Tab) y `onKeyDown` (funcionan con Enter o Espacio).
- *Valores por defecto en las propiedades.* `ModalConfirmar` recibió `clasePreviewIcono = 'preview-icono'`; los demás módulos no lo pasan y siguen igual.

**Modal y estado vacío:** el modal de Alertas usa `ModalConfirmar` con tres clases distintas; las demás coinciden, así que no se duplicó. El estado vacío no usa `EstadoVacio`, porque `alertas-vacio.html` tiene otro HTML (`estado-vacio` con `vacio-orb`, sin halo ni círculo).

**Comparado con el HTML viejo**
- Listado: 151 de 156. Faltan los botones Editar y Desactivar de la tarjeta inactiva (conflicto 26).
- Modal: 170 de 175, por la misma razón.
- Nueva y Editar: 128 de 129 y 130 de 131, más el `<form>` y el `<input>` del umbral.
- Detalle: 129 de 133. Falta el recuadro "Fecha creación".
- Historial: 142 de 147. Los colores salen del tipo de alerta (en el prototipo la Liquidez era violeta en el listado y verde en el historial).
- En todas las pantallas falta además el `<span>` del botón de perfil.

## Reportes
**Archivos creados**
- `datos/reportes.js`: historial con la forma de `reportes_generados` (tipo, periodo, formato, fecha de generación), con los tipos `BALANCE`, `FLUJOCAJA` e `INDICADORES` de la BD.
- `paginas/reportes/HistorialReportes.jsx`.
- `paginas/reportes/GenerarReporte.jsx`.
- `paginas/reportes/VistaPreviaReporte.jsx`.
- `paginas/reportes/DetalleReporte.jsx`.

**Por qué:** como dice el propio prototipo, solo se guarda el tipo, el periodo y la fecha, no el archivo. Generar un reporte agrega el registro con la fecha y hora del momento (RN16.1.3, RN16.6.1 y RN16.6.2) y abre la vista previa. La vista previa calcula el contenido con las mismas funciones de Balance, Flujo de Caja e Indicadores, así que muestra lo mismo que esas pantallas (RN16.7.1 y RN16.7.4). Exportar el archivo (RN16.4 y RN16.5) queda pendiente: los botones son decorativos, como en el prototipo.

**Conceptos de React**
- *JSX dentro de otro JSX.* La vista previa arma `contenido(tipo)`, que devuelve listas de filas, y un pequeño componente `Fila` las dibuja. Cambiar de tipo de reporte solo cambia esos datos, no el HTML.
- *Leer la URL para precargar el formulario.* "Generar este reporte de nuevo" lleva a `/reportes/generar?tipo=INDICADORES&formato=EXCEL`. `useSearchParams` lee esos valores y los usa como valor inicial del `useState`.
- *Una página que no usa el componente común.* La vista previa escribe su propio `<header>`, porque el del prototipo cambia los botones de notificaciones y perfil por "Exportar Excel" y "Descargar PDF".

**Comparado con el HTML viejo**
- Vista previa: 117 de 117.
- Historial, Generar y Detalle: un elemento menos cada uno (el `<span>` del botón de perfil).

## Asistente inteligente
**Archivos:** `datos/preguntasFrecuentes.js` (nuevo: las 10 preguntas de la tabla `preguntas_frecuentes` y la búsqueda), `paginas/asistente/Asistente.jsx` (nuevo) y `App.jsx`.

**Por qué:**
- Las sugerencias son las preguntas frecuentes vigentes (RN17.4.1 y RN17.4.3).
- Cada consulta se responde con la pregunta frecuente que más palabras comparte con ella (RN17.3.4); si ninguna coincide, se avisa sin inventar (RN17.2.2).
- Una consulta vacía no se envía (RN17.1.1).
- El IEEE pide inteligencia artificial, y eso queda en el conflicto 28.

**Conceptos de React**
- *Estado que es una lista.* `mensajes` empieza con el saludo. Cada pregunta crea una lista nueva con dos mensajes más (`[...anteriores, pregunta, respuesta]`) en vez de modificar la anterior; así React se entera del cambio y vuelve a dibujar.
- *`useRef` y `useEffect`.* `useRef` guarda una referencia al `<div>` de los mensajes. `useEffect(..., [mensajes])` se ejecuta después de cada cambio de `mensajes` y baja el scroll hasta el último mensaje.
- *`<form onSubmit>`.* La barra de abajo pasó de `<section>` a `<form>` con la misma clase, así Enter también envía la pregunta.

**Comparado con el HTML viejo:** 98 de 99 elementos, comparado después de hacer una pregunta, para que la conversación tenga la misma forma que el ejemplo del prototipo. La diferencia es `section.entrada-chat`, que ahora es `form.entrada-chat`; el CSS usa la clase, así que se ve igual.
