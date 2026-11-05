# 13. Fondo de un aporte

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD09, HU09.3: RN09.3.7.
- `Diccionario_de_Datos_FluneXy.docx`, tablas `metas` y `aportes`, y `bd/01_create_tables.sql`: `metas.id_fondo` y `aportes.id_fondo`.
- `frontend/pages/pagos/registrar-aporte.html`: lista de fondos para elegir.

## Qué dice cada una
- **RN09.3.7 y Diccionario de `metas`:** los aportes salen del fondo asociado a la meta.
- **Tabla `aportes` y prototipo:** cada aporte guarda su propio fondo, y la pantalla deja elegirlo.

## Qué hace hoy la aplicación
Registrar Aporte empieza en el fondo de la meta y deja elegir otro, como el prototipo.

## Opciones
1. **Fondo de la meta como inicial, con opción de cambiarlo,** como hoy. Sirve cuando el fondo de la meta no tiene saldo.
2. **Usar siempre el fondo de la meta** y mostrarlo sin opción de cambio. Sigue RN09.3.7 al pie de la letra, pero cambia el prototipo.

**Recomendación (no es una decisión):** opción 1.

## Estado
Abierto hasta que el equipo decida.
