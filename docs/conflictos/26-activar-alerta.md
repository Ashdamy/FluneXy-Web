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

## Qué hace hoy la aplicación
Sigue la instrucción de Santiago: la alerta inactiva solo muestra "Ver detalle", y `/alertas/:id/editar` vuelve al detalle. El interruptor del formulario sirve al crear (nace activa o inactiva) y al editar una activa.

## Opciones
1. **Excepción para Alertas:** la inactiva muestra Editar (no Desactivar), como el prototipo, y se reactiva con el interruptor.
2. **Botón "Activar"** en la tarjeta y en el detalle. Exige diseño.
3. **Dejarlo como hoy** y quitar del modal "Puedes reactivarla en cualquier momento".

**Recomendación (no es una decisión):** opción 1, igual que se hizo con los fondos inactivos.

## Estado
Abierto hasta que Santiago decida.
