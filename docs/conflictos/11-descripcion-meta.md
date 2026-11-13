# 11. Descripción de una meta

## Qué choca
- `FluneXy_ IEEE .docx`, alcance, "Gestión de Metas Financieras".
- `FluneXy modulos-Historias de usuario (4).docx`, HU09.1, y `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD09.
- `bd/01_create_tables.sql` y `Diccionario_de_Datos_FluneXy.docx`, tabla `metas`.

## Qué dice cada una
- **IEEE:** una meta se crea con un monto objetivo y una descripción.
- **HU09.1:** se define con nombre, monto objetivo, fecha objetivo y fondo.
- **BD:** tiene nombre, pero no descripción.

## Qué hace hoy la aplicación
Metas ya está migrado y sigue la BD y el prototipo: Nueva Meta y Editar Meta tienen nombre, monto objetivo y fecha objetivo (y fondo, solo en Nueva Meta), sin descripción. En el listado y el detalle la meta se identifica por su nombre.

*Revisado el 2026-11-13, con todos los módulos migrados.*

## Opciones
1. **Seguir HU09.1 y la BD,** y entender la "descripción" del IEEE como el nombre.
2. **Agregar una columna y un campo de descripción.**

**Recomendación (no es una decisión):** opción 1.

## Estado
Abierto hasta que el equipo decida.
