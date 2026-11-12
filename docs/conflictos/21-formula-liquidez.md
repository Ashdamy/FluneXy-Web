# 21. Fórmula de la liquidez

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD13, HU13.5: RN13.5.1 y paso 8 del flujo.
- `Requerimientos Funcionales .docx`, "Calcular liquidez".
- `bd/01_create_tables.sql` y `bd/02_insert_data.sql`: tablas `fondos`, `activos` y `categorias`.
- `frontend/pages/balance-financiero/balance-financiero.html` e `indicador-financiero/indicador-financiero.html`: "1.6x".

## Qué dice cada una
- **RN13.5.1 y HU13.5:** la liquidez se calcula "a partir de los fondos y activos líquidos registrados".
- **Requerimientos:** mide la "capacidad para afrontar obligaciones de corto plazo". Hablan de un cociente, pero no dicen contra qué se divide.
- **BD:** no marca qué activos son "líquidos" ni qué obligaciones son "de corto plazo".
- **Prototipo:** muestra "1.6x" en Balance y en Indicadores.

## Qué hace hoy la aplicación
Muestra "1.6x" fijo, como el prototipo, en las dos pantallas.

## Opciones
1. **Saldo de fondos activos ÷ cuotas pendientes del próximo mes.** Usa solo datos que ya existen.
2. **(Fondos + activos de categoría "Ahorro" e "Inversión") ÷ total de pasivos.** Exige definir qué categorías cuentan como líquidas.
3. **Que el equipo defina la fórmula** y se agregue a la documentación.

**Recomendación (no es una decisión):** opción 3; mientras tanto, la 1 es la que menos supone.

## Estado
Abierto hasta que el equipo decida.
