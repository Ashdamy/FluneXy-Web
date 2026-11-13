# 23. Indicadores calculados o almacenados

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD14: RN14.2.2 y RN14.3.2.
- `Diagrama de clases.drawio`, clase `IndicadoresFinancieros` (periodo, tipoIndicador, valorIndicador).
- `bd/01_create_tables.sql`: no hay tabla de indicadores ni de balances.

## Qué dice cada una
- **RN14.2.2 y RN14.3.2:** solo se consultan indicadores "previamente generados y almacenados en el sistema".
- **Diagrama de clases:** tiene una clase con tipo, periodo y valor del indicador.
- **BD:** las 16 tablas no incluyen indicadores; el balance y los indicadores se calculan cada vez.

## Qué hace hoy la aplicación
Calcula los indicadores cada vez que se abre la pantalla; no guarda nada.

## Opciones
1. **Calcular siempre,** como la BD. RN14.2.2 y RN14.3.2 se leen como "calculados".
2. **Agregar una tabla de indicadores** con tipo, periodo y valor, como el diagrama de clases.

**Recomendación (no es una decisión):** opción 1.

## Estado
Decidido por Claude el 2026-11-13, por encargo de Santiago ("en base a las decisiones ya tomadas"). Revisar. Opción 1, derivada de 05 y 22 (lo que no se guarda en la BD se calcula).

## Solución decidida
Los indicadores (y el balance) **se calculan cada vez** con los datos registrados; no se guardan en una tabla.

Por qué: como el balance del [conflicto 22](22-fecha-de-corte-balance.md), son resultados del momento y la BD no tiene tabla para ellos. Guardarlos crearía una segunda copia que podría descuadrarse con los datos, que es justo el riesgo que el [conflicto 05](05-saldo-fondo-calculado.md) pide controlar.

## Cambios por aplicar
1. **Aplicación y BD:** ninguno.
2. **Documentación (equipo):** en RN14.2.2 y RN14.3.2 cambiar "generados y almacenados" por "calculados". En el diagrama de clases, `IndicadoresFinancieros` y `BalanceFinanciero` son cálculos, no tablas.
