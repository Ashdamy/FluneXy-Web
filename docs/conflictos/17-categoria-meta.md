# 17. Categoría de una meta

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD03: RN03.1.1, RN03.1.4, RN03.2.2 y RN03.2.5.
- `FluneXy modulos-Historias de usuario (4).docx`, HU03.1, y `Requerimientos Funcionales .docx`, MOD03.
- `bd/01_create_tables.sql` y `bd/02_insert_data.sql`: tablas `metas` y `categorias`.
- `Diccionario_de_Datos_FluneXy.docx`, campo `categorias.aplica_a`, y `Diagrama de clases.drawio`, clase `Meta`.
- `frontend/pages/metas/mis-metas.html` y `nueva-meta.html`.

## Qué dice cada una
- **MOD03 (RN03.x, HU03.1 y RF):** hay categorías para cuatro tipos de registro: Activo, Pasivo, **Meta** y Movimiento. La categoría se elige antes de terminar el registro.
- **BD, Diccionario y diagrama de clases:** `metas` no tiene `id_categoria`. `aplica_a` solo admite MOVIMIENTO, ACTIVO, PASIVO o FONDO, y los datos de prueba no traen ninguna categoría de meta.
- **Prototipo:** Nueva Meta no tiene selector de categoría, pero cada meta del listado muestra un ícono distinto (moto, casa, avión, libros). Ningún dato respalda ese ícono.

## Qué hace hoy la aplicación
El módulo Metas aún no está migrado. Registrar Aporte usa el ícono `ph-target` para cualquier meta.

## Opciones
1. **Metas sin categoría,** como la BD y el formulario del prototipo, con un ícono fijo (`ph-target`, el mismo del menú y del estado vacío).
2. **Agregar categorías de meta:** filas con `aplica_a = 'META'`, una columna `metas.id_categoria` y un selector en el formulario. Exige cambiar la BD y diseñar el selector.

**Recomendación (no es una decisión):** opción 1.

## Estado
Decidido por Claude el 2026-11-13, por encargo de Santiago ("en base a las decisiones ya tomadas"). Revisar. Opción 1, derivada de 10 (error de la documentación en Metas; manda la BD para los datos).

## Solución decidida
Las metas **no tienen categoría**, como la BD (`metas` sin `id_categoria`; `aplica_a` sin META), el Diccionario y el formulario del prototipo. Todas usan el ícono `ph-target`.

Por qué: es el mismo tipo de caso que el [conflicto 10](10-cuotas-para-metas.md): la documentación de MOD03 nombra "Meta" como si tuviera algo que la BD no tiene, y para la estructura de datos manda la BD.

## Cambios por aplicar
1. **Aplicación y BD:** ninguno.
2. **Documentación (equipo):** quitar "Meta" de los tipos de registro con categoría en RN03.1.1, RN03.1.4, RN03.2.2, RN03.2.5, HU03.1 y en los requerimientos de MOD03.
