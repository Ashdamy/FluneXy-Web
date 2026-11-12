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
Abierto hasta que el equipo decida.
