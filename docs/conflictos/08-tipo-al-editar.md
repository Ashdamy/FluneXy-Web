# 08. Cambiar el tipo al editar un movimiento o una plantilla

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD05, HU05.3: RN05.3.2 y RN05.3.4.
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD06, HU06.2: RN06.2.7.
- `frontend/pages/movimientos/editar-movimiento.html` y `frontend/pages/plantillas/editar-plantilla.html`.

## Qué dice cada una
- **RN05.3.2:** al editar un movimiento se puede cambiar el tipo.
- **RN06.2.7:** da a entender lo mismo para plantillas, porque indica qué pasa con las categorías si cambia el tipo.
- **Prototipos:** los dos muestran el tipo como una etiqueta fija (GASTO), sin un control para cambiarlo.

## Qué hace hoy la aplicación
Sigue los prototipos: el tipo no se puede cambiar al editar. Un cambio de tipo también debe recalcular el saldo del fondo (RN05.3.4) y validar RN05.0.1.

## Opciones
1. **Agregar el alternador de tipo** de Nuevo Movimiento y Nueva Plantilla a sus pantallas de edición. Cumple las reglas con un diseño que ya existe.
2. **Dejar el tipo fijo.** Para cambiarlo habría que desactivar y crear de nuevo, y las reglas no se cumplirían.

**Recomendación (no es una decisión):** opción 1.

## Estado
Abierto hasta que el equipo decida.
