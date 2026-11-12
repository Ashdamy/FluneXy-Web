# 19. Ajuste de saldo en un fondo inactivo

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD04, HU04.3: precondiciones y RN04.3.4.
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD04: RN04.2.4 y RN04.4.4.
- `frontend/pages/fondos/editar-fondo.html`: campo "Saldo Actualizado".

## Qué dice cada una
- **HU04.3:** para editar basta con que el fondo exista y sea del usuario; no pide que esté activo. RN04.4.2 solo impide desactivar un fondo que ya está inactivo.
- **RN04.3.4:** si se cambia el saldo a mano, FluneXy crea un movimiento de ajuste por la diferencia.
- **RN04.2.4 y RN04.4.4:** un fondo inactivo no se puede usar para registrar movimientos nuevos.

Si se edita el saldo de un fondo inactivo, RN04.3.4 crea un movimiento en un fondo que, según RN04.4.4, no debería recibir ninguno.

## Qué hace hoy la aplicación
Editar Fondo se abre también para fondos inactivos, con el mismo formulario del prototipo, y al cambiar el saldo registra el "Ajuste de saldo" (RN04.3.4).

## Opciones
1. **Dejarlo como hoy:** el ajuste es un movimiento automático y no uno "registrado" por el usuario, así que RN04.4.4 no lo cubriría.
2. **En un fondo inactivo, editar solo nombre y tipo,** con el saldo bloqueado. Exige un estado nuevo del formulario que el prototipo no tiene.
3. **Permitir cambiar el saldo sin crear el ajuste.** Contradice RN04.3.4 y deja el saldo sin respaldo en movimientos (RN04.2.1).

**Recomendación (no es una decisión):** opción 2.

## Estado
Abierto hasta que el equipo decida.
