# 04. Movimientos de saldo inicial y de ajuste frente a la BD

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD04: RN04.1.4 (HU04.1), RN04.1.3 y RN04.3.4 (HU04.3).
- `bd/01_create_tables.sql`, tabla `movimientos`: `ck_monto_movimiento` e `id_categoria NOT NULL`.
- `bd/02_insert_data.sql`: categorías de movimientos y movimientos de ejemplo.

## Qué dice cada una
- **RN04.1.4:** todo fondo nuevo genera un movimiento "Saldo inicial".
- **RN04.1.3:** el saldo inicial puede ser cero.
- **RN04.3.4:** cambiar el saldo a mano genera un movimiento de ajuste.
- **BD:** un movimiento debe tener monto mayor a cero y una categoría. No existen categorías de saldo inicial ni de ajuste, y los datos de ejemplo no traen estos movimientos.

Por eso un fondo con saldo cero no puede tener su movimiento inicial, y los demás no tienen una categoría propia.

## Qué hace hoy la aplicación
Aplica la opción 1 mientras el equipo decide: crear un fondo con saldo genera "Saldo inicial", y cambiar el saldo a mano genera "Ajuste de saldo" como ingreso o gasto según la diferencia. Usan las categorías "Otros ingresos" y "Otros gastos". Un fondo con saldo cero no genera movimiento.

## Opciones
1. **Generar el movimiento solo si el monto es mayor a cero,** con las categorías "Otros ingresos" y "Otros gastos". No cambia la BD, pero el saldo cero queda sin movimiento y estos movimientos se mezclan con los otros.
2. **Agregar categorías propias a la BD** ("Saldo inicial", "Ajuste de saldo"). Los distingue mejor, pero cambia los datos base y siguen sin cubrir el saldo cero.
3. **Permitir monto cero en esos movimientos.** Cumple RN04.1.4 siempre, pero debilita una restricción de la BD.

**Recomendación (no es una decisión):** opción 1 por ahora, y evaluar la 2 cuando exista el backend.

## Estado
Abierto hasta que el equipo decida.
