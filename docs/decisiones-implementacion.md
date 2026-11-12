# Decisiones de implementación

Decisiones tomadas en la migración a React donde la documentación no da una respuesta. Cada una indica la regla relacionada. Los conflictos entre documentos están en [conflictos/](conflictos/README.md).

## Pagos

| Decisión | Regla relacionada | Qué hace la aplicación | Por qué |
|---|---|---|---|
| Tope del pago | RN11.1.1, RN08.1.3, RN05.0.1 | No acepta un monto mayor al saldo del pasivo más el interés pendiente de la cuota | El saldo no baja de cero, así que el resto saldría del fondo sin aplicarse a nada |
| Excedente del pago | HU11.1 (tipo "Abono capital"), RN11.6.1 | Lo que supere el valor de la cuota va a capital, y las cuotas siguientes no se recalculan | La documentación no dice qué hacer con el excedente; "Abono capital" es el tipo de pago más cercano |
| Saldo en cero por abonos | RN08.1.3, RN11.1.2 | Si los abonos dejan el saldo en cero, las cuotas restantes quedan como pagadas | Sin deuda no hay cuotas que cobrar |
| Próxima cuota | Regla "RN11.1.2" de HU11.3, RN11.3.3 | "Cuota del siguiente mes" se interpreta como la próxima cuota pendiente; un pago anticipado no puede superar lo que falta de ella | Ver [conflicto 14](conflictos/14-numeracion-rn11-1-2.md) |
| Aporte consistente con el ahorro mensual | RN11.2.2, RN09.1.5 | No se bloquea ningún aporte por este motivo | La regla no define cómo medir "consistente", y el prototipo muestra un aporte de $500.000 en una meta de $1.000.000 al mes |

## Metas

| Decisión | Regla relacionada | Qué hace la aplicación | Por qué |
|---|---|---|---|
| Ahorro mensual requerido | RN09.1.5, RN09.1.6, RN09.3.6 | Lo que falta por ahorrar ÷ meses completos restantes; con 0 meses, todo lo que falta. Se redondea hacia arriba al peso | Decidió Santiago ([conflicto 15](conflictos/15-ahorro-mensual-meta.md)). El redondeo hacia arriba lo eligió Claude, para que la suma alcance el objetivo |
| Meta completada | RN09.2.4 | `montoAhorrado >= montoObjetivo` la marca Completada. No cuenta en "Metas activas" ni en "Total ahorrado" ni en "Objetivo total" del resumen, como el prototipo | Decidió Santiago |
| Fechas de prueba | — | Las fechas objetivo de `datos/metas.js` se calculan desde hoy (6, 36 y 3 meses), porque las del prototipo (Dic 2025) ya pasaron | Decidió Santiago |
| Conflictos 10, 11, 13 y 16 a 18 | — | Se quedan como el prototipo: sin cuotas de metas, sin descripción, aporte desde el fondo de la meta con opción de cambiarlo, sin editar el fondo, sin categoría (ícono `ph-target` para todas) y la nota del modal sin cambios | Decidió Santiago |
| Meses restantes | RN09.1.5 | Meses completos desde hoy hasta la fecha objetivo: si el día del mes aún no llega, ese mes no cuenta. Nunca es negativo | Claude. La regla habla de "meses completos" sin definir cómo se cuentan |
| Porcentaje de progreso | RN09.2.3 | Se redondea hacia abajo (15 de 80 = 18 %) y nunca pasa de 100 % | Claude, siguiendo el 18 % del prototipo; así una meta no muestra 100 % antes de cumplirse |
| Estados de la meta | RN09.2.4, RN09.1.7 | Límites provisionales que reproducen los 4 ejemplos del prototipo (ver [pendientes](pendientes.md)) | Claude. La documentación no da los límites |
| Nombre repetido | RN09.1.2, RN09.3.3 | Solo se compara con las metas activas; a diferencia de Fondos, Activos y Pasivos, el nombre de una meta inactiva sí se puede reutilizar | Lo dice la regla |
| Listado de metas | RN09.4.4, HU09.4 | Muestra solo las metas activas, incluidas las completadas | El prototipo solo muestra activas ("Objetivos en progreso", "No tienes metas activas") |

## Fondos

| Decisión | Regla relacionada | Qué hace la aplicación | Por qué |
|---|---|---|---|
| Actividad y transacciones del fondo | RN04.2.1, RN04.2.3, RN04.1.4, RN04.3.4, RN05.4.5 | "Transacciones" cuenta los movimientos activos del fondo, incluidos "Saldo inicial" y "Ajuste de saldo"; "Actividad reciente" muestra los 3 más recientes, como el prototipo | RN05.4.5: los movimientos inactivos no participan en los cálculos financieros |

## Otros módulos

| Decisión | Regla relacionada | Qué hace la aplicación | Por qué |
|---|---|---|---|
| Comparación de nombres | RN04.1.1, RN07.1.2, RN08.1.1 | Ignora mayúsculas, minúsculas y espacios en los extremos, y también compara con registros inactivos | Las reglas hablan de los registros del usuario sin excluir los inactivos |
| Qué dispara el recálculo de la tabla | RN08.3.4, RN08.5.3 | Cambiar saldo, tasa, plazo o amortización recalcula las cuotas pendientes con el saldo y el plazo restantes; las pagadas no cambian por el saldo | Las cuotas ya pagadas son historial |
| Saldo en cero al editar un pasivo | RN08.1.3, RN08.3.4 | Las cuotas restantes quedan como pagadas | Igual que al llegar a cero con pagos |
