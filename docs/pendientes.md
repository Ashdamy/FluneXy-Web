# Pendientes de la migración

Todo lo que quedó abierto durante la migración a React, para resolverlo al final con el equipo. Mientras tanto la aplicación se comporta como el prototipo.

- **Tipo:** *error* (dato o lógica incorrectos), *diseño* (falta una pantalla, un estado o un criterio visual) o *conflicto* (las fuentes se contradicen; el detalle está en [conflictos/](conflictos/README.md)).
- **Bloquea:** *sí* si impide construir o usar una pantalla; *no* si la aplicación funciona con el comportamiento por defecto.

Total: 65 pendientes (30 conflictos, 1 error, 34 de diseño). Bloquean: 0.

| Módulo | Qué pasó | Tipo | Bloquea |
|---|---|---|---|
| Autenticación | [03](conflictos/03-registro-verificacion-codigo.md): registro con verificación de código (HU02.1, RN02.1.4). Decidido por Santiago: sin código al registrarse, solo se valida que el correo no exista; falta aplicarlo | conflicto | no |
| Autenticación | [06](conflictos/06-texto-requisitos-contrasena.md): texto de requisitos de la contraseña (RN01.3.5, RN02.1.2) | conflicto | no |
| Fondos, Movimientos | [04](conflictos/04-movimientos-automaticos-fondo.md): movimientos de saldo inicial y ajuste frente a `ck_monto_movimiento`. Además, hoy esos movimientos se suman como ingresos y gastos en Flujo de Caja, Inicio y el reporte de Flujo | conflicto | no |
| Fondos, Pagos | [05](conflictos/05-saldo-fondo-calculado.md): saldo del fondo calculado o almacenado (RN04.2.1). Decidido por Santiago: saldo guardado (opción 1), con transacción en el backend, consulta de control y datos de ejemplo corregidos; falta aplicarlo | conflicto | no |
| Fondos | [19](conflictos/19-ajuste-fondo-inactivo.md): ajuste de saldo en un fondo inactivo (RN04.3.4 frente a RN04.4.4). Decidido por Claude (derivado de 05), por revisar: en un fondo inactivo se editan nombre y tipo, no el saldo | conflicto | no |
| Fondos | Los fondos de prueba no traen su movimiento de "Saldo inicial", así que su saldo no se puede reconstruir desde Movimientos (ver conflicto 05). Los fondos nuevos sí lo generan | error | no |
| Fondos, Activos, Pasivos, Metas | El botón "Todos" o "Todas" de los listados es decorativo, como en el prototipo: falta el diseño del menú | diseño | no |
| Fondos | El chip "Inactivo" del detalle del fondo se ve en verde, igual que "Activo": el prototipo no trae un estilo para el detalle inactivo | diseño | no |
| Movimientos, Plantillas | [08](conflictos/08-tipo-al-editar.md): cambiar el tipo al editar (RN05.3.2, RN06.2.7). Decidido por Santiago: el tipo sí se puede cambiar (opción 1), con el selector de Nuevo Movimiento y Nueva Plantilla, recalculando el saldo; falta aplicarlo | conflicto | no |
| Movimientos | El filtro de Mis Movimientos (RN05.5.3) es decorativo, como en el prototipo: falta el diseño del menú de filtros | diseño | no |
| Plantillas | [07](conflictos/07-plantilla-vencida.md): plantilla vencida o inactiva (RN06.0.6) | conflicto | no |
| Plantillas | [09](conflictos/09-descripcion-plantilla.md): descripción de plantillas sin campo en el prototipo (RN06.1.7) | conflicto | no |
| Plantillas | Las ejecuciones automáticas (RN06.0.9) necesitan un proceso del backend; hoy los contadores son datos fijos | diseño | no |
| Pasivos | [01](conflictos/01-fecha-inicio-pasivo.md): fecha de inicio de un pasivo ya amortizado (RN08.1.7, RN08.1.11) | conflicto | no |
| Pasivos | [02](conflictos/02-fecha-al-editar-pasivo.md): editar un pasivo antiguo obliga a cambiar su fecha (RN08.3.7) | conflicto | no |
| Cuotas, Metas | [10](conflictos/10-cuotas-para-metas.md): cuotas para metas (CU10.2). Decidido por Santiago: error de la documentación; las metas tienen aportes, no cuotas. La aplicación no cambia; falta corregir CU10.2, HU10.1-10.3, HU11.6 y RN12.5.1/12.5.3 | conflicto | no |
| Pagos, Metas | [13](conflictos/13-fondo-del-aporte.md): fondo de un aporte (RN09.3.7, `aportes.id_fondo`). Decidido por Claude (derivado de 16), por revisar: el aporte sale siempre del fondo de la meta | conflicto | no |
| Pagos | [14](conflictos/14-numeracion-rn11-1-2.md): código RN11.1.2 repetido | conflicto | no |
| Metas | [11](conflictos/11-descripcion-meta.md): descripción de una meta (IEEE frente a HU09.1 y la BD). Decidido por Claude (derivado de 10), por revisar: sin descripción; la "descripción" del IEEE es el nombre | conflicto | no |
| Metas | [15](conflictos/15-ahorro-mensual-meta.md): cálculo del ahorro mensual (RN09.1.5 frente a RN09.1.6). Decidido por Santiago: lo que falta ÷ meses restantes | conflicto | no |
| Metas | [16](conflictos/16-editar-fondo-meta.md): cambiar el fondo al editar una meta (RN09.3.7 frente a HU09.3). Decidido por Claude (derivado de la decisión de Fondos), por revisar: el fondo de la meta se puede cambiar al editarla | conflicto | no |
| Metas | [17](conflictos/17-categoria-meta.md): categoría de una meta (RN03.1.1 frente a la BD). Decidido por Claude (derivado de 10), por revisar: las metas no tienen categoría | conflicto | no |
| Metas, Pagos | [18](conflictos/18-ahorrado-al-desactivar-meta.md): dónde queda lo ahorrado al desactivar (modal frente a RN05.0.1) | conflicto | no |
| Metas | [20](conflictos/20-fecha-al-editar-meta.md): editar una meta vencida obliga a cambiar su fecha (RN09.3.5) | conflicto | no |
| Metas | Estado de la meta (RN09.2.4): la documentación no da los límites. Provisional, reproduce los 4 ejemplos del prototipo: Completada si lo ahorrado alcanza el objetivo; Requiere esfuerzo si hay aportes y el progreso es menor al 25 %; ¡Casi lista! si el progreso es 50 % o más y faltan 3 meses o menos; si no, En progreso (también sin aportes, RN09.1.7) | diseño | no |
| Metas | El chip "Alcanzable" de Nueva y Editar Meta es fijo, como en el prototipo: la documentación no define cuándo una meta es alcanzable | diseño | no |
| Metas | Las metas inactivas no aparecen en el listado (el prototipo solo muestra activas: "Objetivos en progreso", "No tienes metas activas"). Su detalle solo se abre por la URL; falta el diseño para consultarlas (HU09.4, paso 13) y un estilo para el chip "Inactiva" | diseño | no |
| Metas | Meta vencida sin cumplir (fecha objetivo pasada): no tiene estado ni diseño propios. Hoy usa la regla general de estados y pide todo lo que falta como ahorro mensual | diseño | no |
| Metas | El detalle muestra 5 recuadros en vez de 6: "Fecha creación" no existe en la tabla metas de la BD | diseño | no |
| Metas | Textos sin diseño: "Aún no hay aportes registrados" cuando la meta no tiene aportes, y la tarjeta "Nuevo cálculo automático" de Editar Meta siempre dice "sigues necesitando", como el prototipo | diseño | no |
| Metas | El prototipo redondea el ahorro mensual a miles (.805.000, 33.000); la aplicación muestra el valor exacto redondeado hacia arriba al peso (.805.556, 33.334) | diseño | no |
| Metas | En Nueva y Editar Meta el subtítulo del encabezado queda pegado a la primera etiqueta y los campos de monto y fecha muestran una caja dentro de otra. Así está el prototipo | diseño | no |
| Balance, Indicadores | [21](conflictos/21-formula-liquidez.md): la documentación no da la fórmula de la liquidez; se muestra "1.6x" fijo del prototipo | conflicto | no |
| Balance | [22](conflictos/22-fecha-de-corte-balance.md): la BD no guarda historial para calcular el balance de una fecha pasada; el selector de fecha es decorativo y muestra hoy. Decidido por Claude (derivado de 05), por revisar: el balance es siempre a la fecha de hoy | conflicto | no |
| Balance | El banner "Ver Indicadores Financieros" del Balance no lleva a ningún lado, como en el prototipo | diseño | no |
| Indicadores | [23](conflictos/23-indicadores-almacenados.md): la documentación dice que los indicadores se almacenan, pero la BD no tiene tabla; se calculan cada vez. Decidido por Claude (derivado de 05 y 22), por revisar: los indicadores se calculan siempre, no se guardan | conflicto | no |
| Indicadores | [24](conflictos/24-indicadores-sin-definir.md): solo el endeudamiento tiene fórmula; liquidez, ahorro mensual, cobertura de deuda y el índice de salud muestran los valores fijos del prototipo | conflicto | no |
| Flujo de caja | [25](conflictos/25-que-se-proyecta-en-el-flujo.md): "información proyectada" y "aportes programados" no están definidos y la BD no tiene aportes programados. Decidido por Claude (derivado de 10), por revisar: ahorro de metas = ahorro mensual; ingresos y gastos = lo real del mes + plantillas pendientes | conflicto | no |
| Flujo de caja | El selector de periodo es decorativo, como en el prototipo: siempre muestra el mes actual (RN12.1.1 pide elegir el periodo). Falta el diseño del menú | diseño | no |
| Flujo de caja | Saldo proyectado negativo: la etiqueta dice "Negativo" pero el CSS solo tiene el estilo de "Positivo" (`pill-saldo.positivo`) | diseño | no |
| Alertas | [26](conflictos/26-activar-alerta.md): reactivar una alerta inactiva. Decidido por Santiago: ninguna RN15.x prohíbe editarla, así que la inactiva muestra Editar (sin Desactivar) y se reactiva con el interruptor | conflicto | no |
| Alertas | [27](conflictos/27-tipos-de-alerta.md): los 3 tipos del prototipo no son los 5 de los datos de ejemplo de la BD, y la documentación no da la lista ni el rango del umbral | conflicto | no |
| Alertas | Antes se había acordado que Alertas lo haría un compañero en otra rama. Se migró aquí por la nueva instrucción; hay que revisarlo antes de unir esa rama para no duplicar el trabajo | conflicto | no |
| Alertas | La generación automática de alertas (RN15.6) y su notificación son del backend; el historial de prueba es fijo. El contador "3" de Alertas en la barra lateral también es fijo | diseño | no |
| Alertas | El historial no tiene filtro por rango de fechas (RN15.7.3): el prototipo no lo diseña | diseño | no |
| Alertas | En el formulario, "TIPO DE ALERTA" (desplegable sin menú) y "TIPO DE INDICADOR A MONITOREAR" (tarjetas) eligen lo mismo; se elige con las tarjetas y el desplegable solo muestra la elección. El estado OFF del interruptor no tiene estilo propio, y los chips "Riesgo alto" y "Tiempo real" son fijos | diseño | no |
| Alertas | El detalle muestra "Meta Financiera" y "En Progreso", textos que el prototipo copió de Metas. Tampoco tiene el recuadro "Fecha creación", que no existe en la BD (5 recuadros en vez de 6) | diseño | no |
| Alertas | Historial: una alerta sin notificar (`notificado = false`) dice "Sin notificar"; el prototipo solo tiene "Notificado". "Últimos 30 días" es fijo, mientras el número cuenta el mes calendario | diseño | no |
| Reportes | La exportación real a PDF y Excel (RN16.4, RN16.5) no se hace: los botones "Exportar Excel" y "Descargar PDF" de la vista previa son decorativos, como en el prototipo. Generar los archivos necesita una librería (no permitida) o el backend | diseño | no |
| Reportes | El periodo del reporte es decorativo, como en el prototipo: siempre el mes actual (RN16.3.1). Los valores son los de hoy aunque el periodo sea otro (ver conflictos 22 y 25) | diseño | no |
| Reportes | Solo la vista previa del Balance está diseñada; la de Flujo de Caja e Indicadores usa las mismas piezas (resumen y filas) | diseño | no |
| Reportes | El selector "Tipo de Reporte" no despliega nada; se elige con "Otros Tipos Disponibles". El estilo de formato elegido se llama `rep-chip-pdf` y se usa también para Excel. El historial no tiene estado vacío diseñado | diseño | no |
| Asistente | [28](conflictos/28-asistente-ia-o-preguntas.md): el IEEE pide IA y las reglas piden responder solo con lo registrado; hoy responde con las preguntas frecuentes de la BD | conflicto | no |
| Asistente | La conversación empieza solo con el saludo; el ejemplo de pregunta y respuesta del prototipo no se muestra. El texto de "no tengo respuesta" (RN17.2.2) no tiene diseño. Las consultas no se guardan (RN17.1.4 dice "podrá"; la BD no tiene tabla para ellas) | diseño | no |
| Inicio | Fijos del prototipo porque la BD no guarda historial: "▲ +2.4% hoy", el gráfico de barras, las variaciones (+12 %, +5 %, +8 %) y el largo de las barras del resumen. "Deuda activa" muestra el endeudamiento como porcentaje | diseño | no |
| Inicio | Ingresos, gastos y ahorro del mes son los movimientos activos registrados en el mes (sin las proyecciones de plantillas que sí usa Flujo de Caja). El nombre del saludo es el usuario 1 de la BD hasta que exista el login | diseño | no |
| Inicio | "Ver análisis completo" del aviso de endeudamiento no lleva a ningún lado, como en el prototipo. El estilo ámbar (`icono-alerta`, `advertencia`) que el prototipo usa en un movimiento no tiene regla que diga cuándo aplicarlo; hoy los movimientos usan solo ingreso o gasto | diseño | no |
| Usuario | Cambiar Contraseña muestra el texto del prototipo ("Mínimo 8 caracteres, una mayúscula y un número") y la barra de fortaleza fija, pero valida la regla completa de RN02.3, igual que Registro y Nueva Contraseña (conflicto 06) | conflicto | no |
| Usuario | Necesitan el backend: que la contraseña actual coincida (RN02.6.1, RN02.7.2), que el correo no esté registrado por otro usuario (RN02.2.1, RN02.5.2) y cerrar las otras sesiones al cambiar la contraseña. Hoy se acepta cualquier contraseña actual no vacía | diseño | no |
| Usuario | Al desactivar la cuenta se va a Cierre de Sesión, pero sin login real nada impide seguir usando la aplicación. El avatar muestra la inicial del nombre, como el prototipo ("A"); el botón de perfil del encabezado sigue con la "A" fija | diseño | no |
| Soporte | El formulario de Preguntas / Soporte envía a `formsubmit.co` con un correo de ejemplo (`TU_CORREO@dominio.com`): falta el correo real o un endpoint del backend. Se dejó sin tocar porque la página queda como HTML estático | diseño | no |
| Soporte, Legal | Las páginas estáticas no tienen enlace de vuelta a la aplicación (el logo de Política apunta a "#"), como en el prototipo. La página de soporte no lista las preguntas frecuentes de la BD; es solo un formulario de contacto | diseño | no |
| Todos | [12](conflictos/12-decimales-en-pesos.md): pesos con o sin decimales (IEEE 3.13.2, RN04.1.3). Decidido por Claude (derivado de 15), por revisar: se guardan centavos y se muestran pesos enteros | conflicto | no |
| Todos | Mensajes de confirmación de crear, editar y desactivar (por ejemplo HU09.1 paso 14, HU09.3 paso 13, HU09.4 paso 12): el prototipo no los tiene, así que se vuelve al listado sin mensaje | diseño | no |
| Todos | La ruta de página no encontrada ("*") sigue con el texto temporal "Página en construcción": el prototipo no tiene diseño de error 404 | diseño | no |

## Números en pantalla que no son calculados

Para que el equipo sepa qué cifras no salen de los datos. **Fijo:** el valor está escrito en el código, copiado del prototipo. **Provisional:** se calcula, pero con una regla que la documentación no define.

### Fijos

| Pantalla | Número | Por qué |
|---|---|---|
| Balance | Liquidez "1.6x" | No hay fórmula ([conflicto 21](conflictos/21-formula-liquidez.md)) |
| Balance | Fecha de corte (siempre hoy) | La BD no guarda historial ([conflicto 22](conflictos/22-fecha-de-corte-balance.md)) |
| Indicadores | Liquidez "1.6x" y su estado "Saludable" | Conflictos 21 y 24 |
| Indicadores | Ahorro Mensual "33 %" y "Saludable" | Indicador sin definir ([conflicto 24](conflictos/24-indicadores-sin-definir.md)) |
| Indicadores | Cobertura de Deuda "N/A" y "Sin datos" | Conflicto 24 |
| Indicadores | Índice de Salud Financiera "82 / 100" y su barra | Conflicto 24 |
| Indicadores | "Indicadores · 4 activos" | Texto del prototipo |
| Alertas | Valor actual de la alerta de Liquidez ("1.6x") | Usa la liquidez fija del conflicto 21 |
| Alertas | Historial de alertas generadas (valores, fechas y cantidades) | Datos de prueba; generarlas es del backend (RN15.6) |
| Alertas | "Últimos 30 días" del historial | Texto del prototipo; el número cuenta el mes calendario |
| Barra lateral | Contador "3" de Alertas | Vendrá de la API de alertas |
| Inicio | "▲ +2.4 % hoy" del patrimonio | La BD no guarda historial del patrimonio |
| Inicio | Gráfico de barras del patrimonio | Decorativo, sin datos |
| Inicio | Variaciones "+12 %", "+5 %" y "+8 %" del resumen | No hay mes anterior con qué comparar |
| Inicio | Largo de las barras del resumen | Copiado del prototipo |
| Reportes | En la vista previa de Indicadores: liquidez, ahorro mensual, cobertura e índice de salud | Mismos valores fijos de Indicadores |
| Reportes | Periodo del reporte (siempre el mes actual) | El selector es decorativo |
| Flujo de caja | Periodo (siempre el mes actual) | El selector es decorativo |
| Plantillas | Motivo de "última falla" | Lo registrará el backend al ejecutar |
| Autenticación | Contador de reenvío del código de verificación | Hasta que exista la API |
| Landing | Cifras de la maqueta ("$ 2,540,000", "+12.4 %", tabla de movimientos) | Ilustración del prototipo |

### Provisionales

| Pantalla | Número | Regla usada hoy |
|---|---|---|
| Metas | Estado (En progreso, Requiere esfuerzo, ¡Casi lista!, Completada) | Límites que reproducen los ejemplos del prototipo; "Completada" la decidió Santiago (ahorrado ≥ objetivo) |
| Metas | Chip "Alcanzable" | Siempre visible, como el prototipo |
| Metas | Ahorro mensual requerido | Lo que falta ÷ meses completos restantes (decidido por Santiago, conflicto 15), redondeado hacia arriba |
| Pasivos, Balance, Indicadores, Inicio | Nivel de endeudamiento (bajo, moderado, alto) | Menos de 20 %, menos de 40 % y 40 % o más; el "Alerta si supera 40 %" de Mis Pasivos es fijo |
| Flujo de caja (y Reportes de Flujo) | Ingresos y gastos estimados, ahorro de metas y saldo proyectado | Movimientos del mes + ejecuciones pendientes de plantillas; ahorro mensual de las metas ([conflicto 25](conflictos/25-que-se-proyecta-en-el-flujo.md)) |
| Inicio | Ingresos, gastos y ahorro del mes | Solo movimientos registrados en el mes (sin las proyecciones del Flujo) |
| Plantillas | Ejecuciones completadas | Se cuentan las fechas de ejecución que ya pasaron, no ejecuciones reales (RN06.0.9 depende del backend) |
| Alertas | Umbral permitido | Mayor que cero y, en porcentajes, hasta 100 (RN15.3.2 no da el rango) |
