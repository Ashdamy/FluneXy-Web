# 09. Descripción de plantillas sin campo en el prototipo

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD06, HU06.1: RN06.1.7.
- `Diccionario_de_Datos_FluneXy.docx`, tabla `plantillas`, y `bd/01_create_tables.sql`: columna `descripcion`.
- `frontend/pages/plantillas/nueva-plantilla-gasto.html`, `nueva-plantilla-ingreso.html` y `editar-plantilla.html`.

## Qué dice cada una
- **RN06.1.7 y BD:** la plantilla puede tener una descripción opcional.
- **Prototipo:** los formularios no tienen ese campo.

## Qué hace hoy la aplicación
Nueva Plantilla y Editar Plantilla no tienen el campo, como el prototipo; la plantilla se muestra con su categoría. Se pospuso por decisión del equipo hasta que exista el diseño.

**Relación con lo ya decidido:** el [conflicto 08](08-tipo-al-editar.md) (decidido) agrega el selector de tipo a Editar Plantilla. Si se elige la opción 1, conviene agregar la descripción en el mismo cambio.

*Revisado el 2026-11-13, con todos los módulos migrados.*

## Opciones
1. **Agregar el campo** con un diseño nuevo, tomando como referencia el de Nuevo Movimiento.
2. **Dejarlo sin campo** y guardar la descripción vacía, ya que es opcional. Mientras tanto no se puede usar esa parte de la regla.

**Recomendación (no es una decisión):** opción 1, cuando exista el diseño.

## Estado
Abierto hasta que el equipo decida.
