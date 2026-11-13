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
Decidido por Santiago el 2026-11-13: opción 1 (el tipo **sí** se puede cambiar). Falta aplicarlo en la aplicación. Se corrige una primera anotación del mismo día que decía lo contrario por una confusión con la numeración de las opciones.

## Solución decidida
Al editar un movimiento o una plantilla **se puede cambiar el tipo** (ingreso o gasto), como dicen RN05.3.2 y RN06.2.7.

Por qué: HU05.3 existe "para corregir errores en caso de haber ingresado información incorrecta". Si alguien registró un gasto como ingreso, lo corrige editando, sin desactivar el registro y crear otro.

## Cambios por aplicar
1. **Editar Movimiento** (`paginas/movimientos/EditarMovimiento.jsx`): agregar el selector Ingreso/Gasto que ya existe en Nuevo Movimiento, en lugar de la etiqueta fija (`badge-tipo`).
2. **Categoría al cambiar el tipo:** mostrar solo las categorías del tipo nuevo y pedir que se elija una (RN05.3.3; RN06.2.7 en plantillas).
3. **Saldo:** recalcular el saldo del fondo, deshaciendo el efecto anterior y aplicando el nuevo (RN05.3.4). Pasar de ingreso a gasto mueve el saldo el doble del monto. Si deja el fondo en negativo, no se guarda (RN05.3.5, RN05.0.1); `errorSaldo(nuevo, anterior)` de `datos/movimientos.js` ya calcula este caso.
4. **Editar Plantilla** (`paginas/plantillas/EditarPlantilla.jsx`): el mismo selector de Nueva Plantilla, con las categorías del tipo nuevo (RN06.2.7). Solo afecta las ejecuciones futuras (RN06.2.4) y no ejecuta nada al guardar (RN06.2.6).
5. **Regresión:** agregar casos de cambio de tipo en `scripts/regresion/casos/03-movimientos.mjs` y `04-plantillas.mjs`, incluido el de saldo insuficiente.
6. **Documentación:** no cambia; las reglas ya lo permiten.
