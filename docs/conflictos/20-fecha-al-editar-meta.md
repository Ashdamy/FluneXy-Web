# 20. Editar una meta vencida obliga a cambiar su fecha

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD09, HU09.3: RN09.3.5.
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD09, HU09.3: precondiciones y RN09.3.2 (se puede editar cualquier meta activa).
- Es el mismo caso del [conflicto 02](02-fecha-al-editar-pasivo.md) en Pasivos.

## Qué dice cada una
- **RN09.3.5:** al editar, la fecha objetivo debe ser la de hoy o una futura.
- **HU09.3 y RN09.3.2:** cualquier meta activa se puede editar, por ejemplo para corregir el nombre o el monto.

Una meta activa cuya fecha objetivo ya pasó sin cumplirse no se puede editar sin moverle también la fecha.

## Qué hace hoy la aplicación
Aplica RN09.3.5 tal cual: el campo de fecha no acepta días anteriores a hoy, también al editar.

## Opciones
1. **Validar la fecha solo si el usuario la cambia,** y permitir conservar la que tenía.
2. **Aplicar RN09.3.5 tal cual,** como hoy. Para una meta vencida puede tener sentido, porque obliga a fijar un plazo nuevo.

**Recomendación (no es una decisión):** decidirlo junto con el conflicto 02 para que Pasivos y Metas se comporten igual.

## Estado
Abierto hasta que el equipo decida.
