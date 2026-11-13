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
Decidido por Santiago el 2026-11-13: **un fondo inactivo no se puede editar**. Reemplaza la opción 2 que había anotado Claude ese mismo día. Falta aplicarlo.

## Solución decidida
Un fondo inactivo **no muestra Editar** ni se puede abrir su formulario de edición, igual que los registros inactivos de Activos, Pasivos, Movimientos, Plantillas y Metas. Como no se edita, tampoco se le puede cambiar el saldo ni generar un "Ajuste de saldo", y el choque entre RN04.3.4 y RN04.4.4 desaparece.

Por qué: los fondos no tienen opción de reactivarse (decisión anterior de Santiago: "no hay reactivar para activos ni fondos hasta que haya diseño"), así que editar el nombre o los datos de un fondo inactivo no tiene sentido.

**Esto revierte un cambio anterior:** en el commit `3c52f3f` (2026-11-12) se le devolvió el botón Editar a los fondos inactivos, por indicación de Santiago y porque HU04.3 no exige que el fondo esté activo. La excepción sigue siendo solo Alertas ([conflicto 26](26-activar-alerta.md)), porque una alerta sí se reactiva desde Editar (HU15.4).

## Cambios por aplicar
1. `paginas/fondos/MisFondos.jsx`: la tarjeta de un fondo inactivo muestra solo "Ver detalle" (sin Editar ni Desactivar).
2. `paginas/fondos/DetalleFondo.jsx`: un fondo inactivo no muestra los botones Editar Fondo ni Desactivar Fondo.
3. `paginas/fondos/EditarFondo.jsx`: `/fondos/:id/editar` de un fondo inactivo vuelve al detalle, como en los demás módulos.
4. Regresión: en `scripts/regresion/casos/02-fondos.mjs`, cambiar los casos "Fondo inactivo con Editar" y "Detalle fondo inactivo" por los de sin Editar, y agregar la redirección.
5. `docs/guia-migracion.md`: anotar en la sección "Fondos: Editar en fondos inactivos" que se revirtió.
6. **Documentación (equipo):** agregar a las precondiciones de HU04.3 que el fondo debe estar activo, como en HU05.3, HU07.3, HU08.3 o HU09.3.
