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
Sigue los prototipos: el tipo no se puede cambiar al editar. El equipo indicó esperar el diseño. Cuando se agregue, un cambio de tipo también debe recalcular el saldo del fondo (RN05.3.4) y validar RN05.0.1.

## Opciones
1. **Agregar el alternador de tipo** de Nuevo Movimiento y Nueva Plantilla a sus pantallas de edición. Cumple las reglas con un diseño que ya existe.
2. **Dejar el tipo fijo.** Para cambiarlo habría que desactivar y crear de nuevo, y las reglas no se cumplirían.

**Recomendación (no es una decisión):** opción 1.

## Estado
Decidido por Santiago el 2026-11-13: opción 2. La aplicación no cambia; falta actualizar la documentación.

## Solución decidida
El tipo (ingreso o gasto) **no se puede cambiar** al editar un movimiento ni una plantilla. Se fija al crear el registro.

Por qué: un registro creado como ingreso no se convierte en gasto; si el tipo quedó mal, se corrige desactivando el registro (RN05.4, que lo conserva en el historial) y creando uno nuevo con el tipo correcto. Además evita cambios grandes de saldo por accidente: pasar de ingreso a gasto mueve el saldo el doble del monto.

## Cambios por aplicar
1. **Aplicación:** ninguno. Editar Movimiento y Editar Plantilla ya muestran el tipo como etiqueta fija, como el prototipo.
2. **Documentación (la actualiza el equipo; los originales no se modifican desde la migración):**
   - RN05.3.2: quitar "el tipo" de los datos que se pueden modificar.
   - RN05.3.4: quitar "el tipo" de los cambios que recalculan el saldo.
   - RN06.2.7: quitarla o reescribirla, porque supone que el tipo de una plantilla se puede cambiar.
   - Opcional: agregar a HU05.3 y HU06.2 que, para cambiar el tipo, se desactiva el registro y se crea uno nuevo.
