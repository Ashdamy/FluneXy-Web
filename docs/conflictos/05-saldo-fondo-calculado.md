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
Abierto hasta que el equipo decida.
