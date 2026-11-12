# 27. Tipos de alerta

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD15: RN15.1.2, RN15.2.1 y RN15.3.2.
- `bd/02_insert_data.sql`: tabla `alertas_configuracion`, columna `tipo_alerta`.
- `frontend/pages/alertas/*.html`.
- `FluneXy_ IEEE .docx`, alcance de Alertas ("pagos próximos, vencimientos, metas financieras, movimientos automáticos").

## Qué dice cada una
- **RN15.2.1 y RN15.1.2:** el tipo y los parámetros son "los definidos por el sistema", sin listarlos. RN15.3.2 habla de un "rango permitido" sin darlo.
- **BD (datos de ejemplo):** "Saldo bajo en fondo", "Endeudamiento alto", "Gasto mensual elevado", "Meta en riesgo" y "Vencimiento próximo de cuota". `tipo_alerta` es texto libre, sin CHECK.
- **IEEE:** menciona alertas de pagos próximos, vencimientos, metas y movimientos automáticos.
- **Prototipo:** tres tipos, Endeudamiento (umbral en %), Liquidez (en veces) y Gasto Mensual (en pesos).

## Qué hace hoy la aplicación
Usa los tres tipos del prototipo. El umbral debe ser mayor que cero y, si es un porcentaje, hasta 100. La liquidez actual es el "1.6x" fijo del conflicto 21.

## Opciones
1. **Los tres del prototipo,** como hoy, y se ajustan los datos de ejemplo de la BD.
2. **Los cinco de la BD.** Exige rediseñar el formulario, que hoy tiene tres tarjetas.
3. **Una lista nueva** que junte las dos, definida por el equipo con su rango de umbral.

**Recomendación (no es una decisión):** opción 3.

## Estado
Abierto hasta que el equipo decida.
