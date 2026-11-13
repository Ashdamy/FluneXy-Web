# 05. Saldo del fondo calculado o almacenado

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD04, HU04.2: RN04.2.1.
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD05: RN05.0.1.
- `bd/01_create_tables.sql`: columna `fondos.saldo_actual`, y tablas `pagos` y `aportes`, separadas de `movimientos`.

## Qué dice cada una
- **RN04.2.1:** el saldo actual se calcula con el saldo inicial y los movimientos.
- **RN05.0.1:** los pagos de pasivos y los aportes a metas también disminuyen el saldo del fondo.
- **BD:** el saldo se guarda en una columna, y pagos y aportes no generan filas en `movimientos`.

Si el saldo solo se calculara con movimientos, pagos y aportes no lo afectarían.

## Qué hace hoy la aplicación
Guarda el saldo en el fondo, como la BD, y lo actualiza con movimientos, pagos y aportes. Se hizo así para cumplir RN05.0.1 sin crear movimientos que la documentación no pide.

## Opciones
1. **Saldo almacenado y actualizado por cada operación,** como hoy.
2. **Saldo calculado** con saldo inicial, movimientos, pagos y aportes. Evita descuadres, pero cambia la BD y RN04.2.1 tendría que nombrar pagos y aportes.
3. **Generar un movimiento por cada pago y aporte.** Cumple RN04.2.1 al pie de la letra, pero duplica la operación y sumaría esos montos dos veces en reportes y flujo de caja si no se excluyen.

**Recomendación (no es una decisión):** opción 1, porque coincide con la BD.

## Estado
Decidido por Santiago el 2026-11-13: opción 1. Falta aplicar los cambios de abajo.

## Solución decidida
El saldo se queda **guardado** en `fondos.saldo_actual`, como en la BD actual, y se actualiza con cada operación que mueve dinero: movimientos, pagos y aportes (RN05.0.1). RN04.2.1 ("se calcula automáticamente") se cumple recalculándolo y guardándolo en cada operación. Se conserva el CHECK `ck_saldo_no_negativo`, así la BD sigue impidiendo saldos negativos.

Por qué: no cambia la BD ya revisada, mantiene la protección contra saldos negativos y la consulta del saldo es directa. El riesgo de que el saldo se descuadre se controla con los puntos 1 y 2.

## Cambios por aplicar
1. **Backend:** guardar la operación (movimiento, pago o aporte) y actualizar `saldo_actual` en una misma transacción. Si falla una parte, no se guarda ninguna.
2. **Consulta de control:** comparar el `saldo_actual` guardado con el calculado (saldo inicial + ingresos activos − gastos activos − pagos − aportes) y listar los fondos que no cuadren.
3. **Corregir los datos de ejemplo de `bd/02_insert_data.sql`:** hoy solo 4 de los 12 fondos cuadran (7, 8, 10 y 12). Al recalcularlos, 4 quedarían en negativo (1, 6, 9 y 11), porque sus pagos y aportes suman más que lo que entra. Hay que ajustar `saldo_inicial`, los movimientos o los pagos y aportes de ejemplo para que cada `saldo_actual` coincida con el cálculo. Es el pendiente de tipo "error" de Fondos.
4. **Aplicación:** no cambia. Ya guarda el saldo y lo actualiza con movimientos, pagos y aportes.
