# 24. Indicadores sin definición

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD14: RN14.1.1 a RN14.3.4, y MOD13: HU13.5 y HU13.6.
- `FluneXy_ IEEE .docx`, MOD14 ("indicadores financieros definidos por las reglas de negocio").
- `frontend/pages/indicador-financiero/indicador-financiero.html`.

## Qué dice cada una
- **Documentación:** MOD14 habla de "los indicadores" sin decir cuáles son ni cómo se calculan. Solo MOD13 define el endeudamiento (pasivos ÷ activos, RN13.6.1) y nombra la liquidez sin fórmula (conflicto 21).
- **Prototipo:** muestra cuatro indicadores y un índice global, con sus estados:
  - Liquidez "1.6x" Saludable;
  - Endeudamiento "5.9%" Bajo;
  - Ahorro Mensual "33%" Saludable;
  - Cobertura de Deuda "N/A" Sin datos (subtítulo "Meta vs. deuda");
  - Índice de Salud Financiera 82/100.

Tampoco se definen los límites de cada estado (Saludable, Bajo, Sin datos...).

## Qué hace hoy la aplicación
Calcula solo el endeudamiento, con los niveles de Mis Pasivos (bajo < 20 %, moderado < 40 %, alto). Lo demás muestra los valores fijos del prototipo.

## Opciones
1. **Que el equipo defina cada indicador** (fórmula, datos y límites) y se agregue a la documentación.
2. **Dejar solo los indicadores definidos** (endeudamiento) y quitar los demás de la pantalla.

**Recomendación (no es una decisión):** opción 1. Por ejemplo, Ahorro Mensual = (ingresos − gastos) ÷ ingresos del mes, que ya se puede calcular con Movimientos.

## Estado
Abierto hasta que el equipo decida.
