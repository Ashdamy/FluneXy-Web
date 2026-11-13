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
Decidido por Claude el 2026-11-13, por encargo de Santiago ("en base a las decisiones ya tomadas"). Revisar. Opción 1, derivada de 10 (los datos de las metas siguen la BD).

## Solución decidida
La meta **no lleva descripción**; se identifica por su nombre, como HU09.1, la BD y el prototipo. La "descripción" que menciona el IEEE se entiende como el nombre de la meta.

Por qué: igual que en el [conflicto 10](10-cuotas-para-metas.md), los datos de una meta son los de la tabla `metas`, y para la estructura de datos manda la BD.

## Cambios por aplicar
1. **Aplicación y BD:** ninguno.
2. **Documentación (equipo):** en el IEEE, alcance "Gestión de Metas Financieras", cambiar "una descripción asociada" por "un nombre".
