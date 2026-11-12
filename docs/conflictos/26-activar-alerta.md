# 26. Activar una alerta inactiva

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD15, HU15.4: RN15.4.1 a RN15.4.4 ("Activar alertas financieras").
- `frontend/pages/alertas/lista-alertas.html`, `editar-alerta.html` y el modal de `desactivar-alerta.html` ("Puedes reactivarla en cualquier momento").
- Instrucción de Santiago: los registros inactivos no muestran Editar ni Desactivar, y `/editar` de un inactivo vuelve al detalle.

## Qué dice cada una
- **HU15.4 y RN15.4.3:** una alerta puede pasar de inactiva a activa.
- **Prototipo:** no hay botón "Activar". La tarjeta inactiva muestra Editar, y el formulario de edición tiene el interruptor "ESTADO DE LA ALERTA" (ON/OFF), que es la única forma de reactivarla.
- **Instrucción de Santiago:** una alerta inactiva no muestra Editar.

Con la instrucción aplicada tal cual, una alerta desactivada no se puede volver a activar, aunque el modal dice que sí.

## Qué dicen las reglas de MOD15 sobre editar una inactiva
Ninguna lo prohíbe. HU15.4 (precondición "la configuración de alertas debe existir"; paso 7, "valida que la configuración de la alerta exista y se encuentre inactiva") justamente se aplica a una alerta inactiva. La única restricción por estado es RN15.5.3 (y la precondición de HU15.5): solo se desactiva una alerta activa. HU15.2 y HU15.3 no piden un estado.

## Qué hace hoy la aplicación
La alerta inactiva muestra "Ver detalle" y "Editar", sin "Desactivar", igual que los fondos inactivos. `/alertas/:id/editar` abre el formulario, y el interruptor ON/OFF la reactiva.

## Opciones
1. **Excepción para Alertas:** la inactiva muestra Editar (no Desactivar), como el prototipo, y se reactiva con el interruptor.
2. **Botón "Activar"** en la tarjeta y en el detalle. Exige diseño.
3. **Dejarlo como hoy** y quitar del modal "Puedes reactivarla en cualquier momento".

**Recomendación (no es una decisión):** opción 1, igual que se hizo con los fondos inactivos.

## Estado
Decidido por Santiago el 2026-11-12: opción 1, porque ninguna regla RN15.x prohíbe editar una alerta inactiva.
