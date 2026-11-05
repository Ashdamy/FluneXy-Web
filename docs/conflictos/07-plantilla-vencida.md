# 07. Plantilla vencida o inactiva

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD06: RN06.0.6.
- `frontend/pages/plantillas/mis-plantillas.html`: tarjeta con estado "Vencida" y etiqueta "Vigencia vencida".

## Qué dice cada una
- **RN06.0.6:** cuando pasa la fecha fin, la plantilla cambia a Inactiva y deja de generar movimientos.
- **Prototipo:** tiene un estado propio, "Vencida", distinto de una plantilla desactivada.
- **BD:** `plantillas.estado` es un booleano, así que solo distingue activa e inactiva.

## Qué hace hoy la aplicación
Sigue la opción 2 por indicación del equipo: al pasar la fecha fin, la plantilla cuenta como inactiva (sin Editar ni Desactivar) y se muestra con el aspecto "Vencida" del prototipo.

## Opciones
1. **Mostrar "Inactiva"** al vencer, como dice RN06.0.6. Se pierde la distinción entre vencida y desactivada por el usuario.
2. **Guardar Inactiva y mostrar "Vencida"** cuando la fecha fin ya pasó. Cumple la regla en los datos y conserva el diseño, y se distingue sin una columna nueva.

**Recomendación (no es una decisión):** opción 2.

## Estado
Abierto hasta que el equipo decida.
