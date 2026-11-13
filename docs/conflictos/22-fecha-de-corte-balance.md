# 22. Balance a una fecha de corte

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD13: RN13.1.1, RN13.1.2 y RN13.2.1.
- `Diagrama de clases.drawio`, clase `BalanceFinanciero` (`fechaCorte`).
- `bd/01_create_tables.sql`: tablas `activos` y `pasivos`.
- `frontend/pages/balance-financiero/balance-financiero.html`: selector "30 Jun 2026".

## Qué dice cada una
- **RN13.1.1, RN13.1.2 y RN13.2.1:** el balance usa los activos y pasivos vigentes hasta la fecha de corte que se elija.
- **BD:** guarda solo el valor actual del activo (`valor`, `fecha_actualizacion`) y el saldo actual del pasivo (`saldo_actual`). No hay historial de valores ni la fecha en que un registro pasó a inactivo, así que no se puede reconstruir el balance de una fecha pasada.
- **Prototipo:** el selector de fecha no despliega nada.

## Qué hace hoy la aplicación
Calcula el balance de hoy con los valores actuales. El selector muestra la fecha de hoy y es decorativo, como en el prototipo.

## Opciones
1. **Solo fecha de corte de hoy,** como ahora. RN13.1.2 queda sin efecto.
2. **Filtrar por fecha de registro** (activos con `fecha_registro` y pasivos con `fecha_inicio` anteriores al corte) usando los valores actuales. Da un balance aproximado.
3. **Guardar historial de valores en la BD.** Exige tablas nuevas.

**Recomendación (no es una decisión):** opción 2 hasta que exista el backend.

## Estado
Decidido por Claude el 2026-11-13, por encargo de Santiago ("en base a las decisiones ya tomadas"). Revisar. Opción 1, derivada de 05 (la BD solo guarda el valor actual).

## Solución decidida
El balance se calcula **solo a la fecha de hoy**, con los valores actuales. El selector de fecha muestra la de hoy y no despliega opciones.

Por qué: con el [conflicto 05](05-saldo-fondo-calculado.md) la BD guarda solo el saldo y el valor actuales, sin historial. Un balance a una fecha pasada (opción 2) mezclaría registros filtrados por fecha con valores de hoy, y daría cifras que nunca existieron. Por eso se cambia la recomendación anterior (opción 2) por la opción 1.

## Cambios por aplicar
1. **Aplicación y BD:** ninguno; ya funciona así.
2. **Documentación (equipo):** RN13.1.1, RN13.1.2 y RN13.2.1 hablan de una fecha de corte elegida; dejarlas como "a la fecha actual".
3. **Pendiente de diseño:** el selector de fecha del prototipo podría quitarse o cambiarse por un texto ("Al 13 Nov 2026").
