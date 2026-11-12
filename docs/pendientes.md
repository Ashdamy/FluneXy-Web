# Pendientes de la migración

Todo lo que quedó abierto durante la migración a React, para resolverlo al final con el equipo. Mientras tanto la aplicación se comporta como el prototipo.

- **Tipo:** *error* (dato o lógica incorrectos), *diseño* (falta una pantalla, un estado o un criterio visual) o *conflicto* (las fuentes se contradicen; el detalle está en [conflictos/](conflictos/README.md)).
- **Bloquea:** *sí* si impide construir o usar una pantalla; *no* si la aplicación funciona con el comportamiento por defecto.

| Módulo | Qué pasó | Tipo | Bloquea |
|---|---|---|---|
| Pasivos | [01](conflictos/01-fecha-inicio-pasivo.md): fecha de inicio de un pasivo ya amortizado (RN08.1.7, RN08.1.11) | conflicto | no |
| Pasivos | [02](conflictos/02-fecha-al-editar-pasivo.md): editar un pasivo antiguo obliga a cambiar su fecha (RN08.3.7) | conflicto | no |
| Autenticación | [03](conflictos/03-registro-verificacion-codigo.md): registro con verificación de código (HU02.1, RN02.1.4) | conflicto | no |
| Fondos, Movimientos | [04](conflictos/04-movimientos-automaticos-fondo.md): movimientos de saldo inicial y ajuste frente a `ck_monto_movimiento` | conflicto | no |
| Fondos, Pagos | [05](conflictos/05-saldo-fondo-calculado.md): saldo del fondo calculado o almacenado (RN04.2.1) | conflicto | no |
| Autenticación | [06](conflictos/06-texto-requisitos-contrasena.md): texto de requisitos de la contraseña (RN01.3.5, RN02.1.2) | conflicto | no |
| Plantillas | [07](conflictos/07-plantilla-vencida.md): plantilla vencida o inactiva (RN06.0.6) | conflicto | no |
| Movimientos, Plantillas | [08](conflictos/08-tipo-al-editar.md): cambiar el tipo al editar (RN05.3.2, RN06.2.7) | conflicto | no |
| Plantillas | [09](conflictos/09-descripcion-plantilla.md): descripción de plantillas sin campo en el prototipo (RN06.1.7) | conflicto | no |
| Cuotas, Metas | [10](conflictos/10-cuotas-para-metas.md): cuotas para metas (CU10.2) | conflicto | no |
| Metas | [11](conflictos/11-descripcion-meta.md): descripción de una meta (IEEE frente a HU09.1 y la BD) | conflicto | no |
| Todos | [12](conflictos/12-decimales-en-pesos.md): pesos con o sin decimales (IEEE 3.13.2, RN04.1.3) | conflicto | no |
| Pagos, Metas | [13](conflictos/13-fondo-del-aporte.md): fondo de un aporte (RN09.3.7, `aportes.id_fondo`) | conflicto | no |
| Pagos | [14](conflictos/14-numeracion-rn11-1-2.md): código RN11.1.2 repetido | conflicto | no |
| Metas | [15](conflictos/15-ahorro-mensual-meta.md): cálculo del ahorro mensual (RN09.1.5 frente a RN09.1.6). Decidido por Santiago: lo que falta ÷ meses restantes | conflicto | no |
| Metas | [16](conflictos/16-editar-fondo-meta.md): cambiar el fondo al editar una meta (RN09.3.7 frente a HU09.3) | conflicto | no |
| Metas | [17](conflictos/17-categoria-meta.md): categoría de una meta (RN03.1.1 frente a la BD) | conflicto | no |
| Metas, Pagos | [18](conflictos/18-ahorrado-al-desactivar-meta.md): dónde queda lo ahorrado al desactivar (modal frente a RN05.0.1) | conflicto | no |
| Fondos | [19](conflictos/19-ajuste-fondo-inactivo.md): ajuste de saldo en un fondo inactivo (RN04.3.4 frente a RN04.4.4) | conflicto | no |
| Metas | [20](conflictos/20-fecha-al-editar-meta.md): editar una meta vencida obliga a cambiar su fecha (RN09.3.5) | conflicto | no |
| Movimientos | El filtro de Mis Movimientos (RN05.5.3) es decorativo, como en el prototipo: falta el diseño del menú de filtros | diseño | no |
| Fondos, Activos, Pasivos, Metas | El botón "Todos" o "Todas" de los listados es decorativo, como en el prototipo: falta el diseño del menú | diseño | no |
| Fondos | El chip "Inactivo" del detalle del fondo se ve en verde, igual que "Activo": el prototipo no trae un estilo para el detalle inactivo | diseño | no |
| Fondos | Los fondos de prueba no traen su movimiento de "Saldo inicial", así que su saldo no se puede reconstruir desde Movimientos (ver conflicto 05). Los fondos nuevos sí lo generan | error | no |
| Plantillas | Las ejecuciones automáticas (RN06.0.9) necesitan un proceso del backend; hoy los contadores son datos fijos | diseño | no |
| Metas | Estado de la meta (RN09.2.4): la documentación no da los límites. Provisional, reproduce los 4 ejemplos del prototipo: Completada si lo ahorrado alcanza el objetivo; Requiere esfuerzo si hay aportes y el progreso es menor al 25 %; ¡Casi lista! si el progreso es 50 % o más y faltan 3 meses o menos; si no, En progreso (también sin aportes, RN09.1.7) | diseño | no |
| Metas | El chip "Alcanzable" de Nueva y Editar Meta es fijo, como en el prototipo: la documentación no define cuándo una meta es alcanzable | diseño | no |
| Metas | Las metas inactivas no aparecen en el listado (el prototipo solo muestra activas: "Objetivos en progreso", "No tienes metas activas"). Su detalle solo se abre por la URL; falta el diseño para consultarlas (HU09.4, paso 13) y un estilo para el chip "Inactiva" | diseño | no |
| Metas | Meta vencida sin cumplir (fecha objetivo pasada): no tiene estado ni diseño propios. Hoy usa la regla general de estados y pide todo lo que falta como ahorro mensual | diseño | no |
| Metas | El detalle muestra 5 recuadros en vez de 6: "Fecha creación" no existe en la tabla metas de la BD | diseño | no |
| Metas | Textos sin diseño: "Aún no hay aportes registrados" cuando la meta no tiene aportes, y la tarjeta "Nuevo cálculo automático" de Editar Meta siempre dice "sigues necesitando", como el prototipo | diseño | no |
| Metas | El prototipo redondea el ahorro mensual a miles (.805.000, 33.000); la aplicación muestra el valor exacto redondeado hacia arriba al peso (.805.556, 33.334) | diseño | no |
| Metas | En Nueva y Editar Meta el subtítulo del encabezado queda pegado a la primera etiqueta y los campos de monto y fecha muestran una caja dentro de otra. Así está el prototipo | diseño | no |
| Todos | Mensajes de confirmación de crear, editar y desactivar (por ejemplo HU09.1 paso 14, HU09.3 paso 13, HU09.4 paso 12): el prototipo no los tiene, así que se vuelve al listado sin mensaje | diseño | no |
| Balance, Indicadores | [21](conflictos/21-formula-liquidez.md): la documentación no da la fórmula de la liquidez; se muestra "1.6x" fijo del prototipo | conflicto | no |
| Balance | [22](conflictos/22-fecha-de-corte-balance.md): la BD no guarda historial para calcular el balance de una fecha pasada; el selector de fecha es decorativo y muestra hoy | conflicto | no |
| Indicadores | [23](conflictos/23-indicadores-almacenados.md): la documentación dice que los indicadores se almacenan, pero la BD no tiene tabla; se calculan cada vez | conflicto | no |
| Indicadores | [24](conflictos/24-indicadores-sin-definir.md): solo el endeudamiento tiene fórmula; liquidez, ahorro mensual, cobertura de deuda y el índice de salud muestran los valores fijos del prototipo | conflicto | no |
| Flujo de caja | [25](conflictos/25-que-se-proyecta-en-el-flujo.md): "información proyectada" y "aportes programados" no están definidos y la BD no tiene aportes programados | conflicto | no |
| Flujo de caja | El selector de periodo es decorativo, como en el prototipo: siempre muestra el mes actual (RN12.1.1 pide elegir el periodo). Falta el diseño del menú | diseño | no |
| Flujo de caja | Saldo proyectado negativo: la etiqueta dice "Negativo" pero el CSS solo tiene el estilo de "Positivo" (`pill-saldo.positivo`) | diseño | no |
| Balance | El banner "Ver Indicadores Financieros" del Balance no lleva a ningún lado, como en el prototipo | diseño | no |
| Alertas | [26](conflictos/26-activar-alerta.md): con la regla de no mostrar Editar en inactivos, una alerta desactivada no se puede reactivar (HU15.4), aunque el modal dice que sí. Hay que decidirlo | conflicto | no |
| Alertas | [27](conflictos/27-tipos-de-alerta.md): los 3 tipos del prototipo no son los 5 de los datos de ejemplo de la BD, y la documentación no da la lista ni el rango del umbral | conflicto | no |
| Alertas | La generación automática de alertas (RN15.6) y su notificación son del backend; el historial de prueba es fijo. El contador "3" de Alertas en la barra lateral también es fijo | diseño | no |
| Alertas | El historial no tiene filtro por rango de fechas (RN15.7.3): el prototipo no lo diseña | diseño | no |
| Alertas | En el formulario, "TIPO DE ALERTA" (desplegable sin menú) y "TIPO DE INDICADOR A MONITOREAR" (tarjetas) eligen lo mismo; se elige con las tarjetas y el desplegable solo muestra la elección. El estado OFF del interruptor no tiene estilo propio, y los chips "Riesgo alto" y "Tiempo real" son fijos | diseño | no |
| Alertas | El detalle muestra "Meta Financiera" y "En Progreso", textos que el prototipo copió de Metas. Tampoco tiene el recuadro "Fecha creación", que no existe en la BD (5 recuadros en vez de 6) | diseño | no |
| Alertas | Historial: una alerta sin notificar (`notificado = false`) dice "Sin notificar"; el prototipo solo tiene "Notificado". "Últimos 30 días" es fijo, mientras el número cuenta el mes calendario | diseño | no |
| Alertas | Antes se había acordado que Alertas lo haría un compañero en otra rama. Se migró aquí por la nueva instrucción; hay que revisarlo antes de unir esa rama para no duplicar el trabajo | conflicto | no |
| Reportes | La exportación real a PDF y Excel (RN16.4, RN16.5) no se hace: los botones "Exportar Excel" y "Descargar PDF" de la vista previa son decorativos, como en el prototipo. Generar los archivos necesita una librería (no permitida) o el backend | diseño | no |
| Reportes | El periodo del reporte es decorativo, como en el prototipo: siempre el mes actual (RN16.3.1). Los valores son los de hoy aunque el periodo sea otro (ver conflictos 22 y 25) | diseño | no |
| Reportes | Solo la vista previa del Balance está diseñada; la de Flujo de Caja e Indicadores usa las mismas piezas (resumen y filas) | diseño | no |
| Reportes | El selector "Tipo de Reporte" no despliega nada; se elige con "Otros Tipos Disponibles". El estilo de formato elegido se llama `rep-chip-pdf` y se usa también para Excel. El historial no tiene estado vacío diseñado | diseño | no |
