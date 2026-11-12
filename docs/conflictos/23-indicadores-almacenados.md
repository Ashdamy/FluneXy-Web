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
Abierto hasta que el equipo decida.
