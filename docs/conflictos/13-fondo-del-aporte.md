# 13. Fondo de un aporte

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD09, HU09.3: RN09.3.7.
- `Diccionario_de_Datos_FluneXy.docx`, tablas `metas` y `aportes`, y `bd/01_create_tables.sql`: `metas.id_fondo` y `aportes.id_fondo`.
- `frontend/pages/pagos/registrar-aporte.html`: lista de fondos para elegir.

## Qué dice cada una
- **RN09.3.7 y Diccionario de `metas`:** los aportes salen del fondo asociado a la meta.
- **Tabla `aportes` y prototipo:** cada aporte guarda su propio fondo, y la pantalla deja elegirlo.

## Qué hace hoy la aplicación
Registrar Aporte empieza en el fondo de la meta y deja elegir otro fondo activo, como el prototipo. Si el fondo de la meta está inactivo, empieza en el primer fondo activo. El aporte se descuenta del fondo elegido y queda guardado con ese fondo.

**Relación con otros conflictos:**
- Se decide junto con el [16](16-editar-fondo-meta.md) (cambiar el fondo al editar la meta), porque los dos tratan de qué fondo usa la meta. Mientras el 16 no permita cambiar el fondo, elegir otro fondo aquí es la única salida cuando el de la meta no tiene saldo o está inactivo.
- El [18](18-ahorrado-al-desactivar-meta.md) nombra el fondo de la meta en el modal de desactivar.

*Revisado el 2026-11-13, con todos los módulos migrados.*

## Opciones
1. **Fondo de la meta como inicial, con opción de cambiarlo,** como hoy. Sirve cuando el fondo de la meta no tiene saldo.
2. **Usar siempre el fondo de la meta** y mostrarlo sin opción de cambio. Sigue RN09.3.7 al pie de la letra, pero cambia el prototipo.

**Recomendación (no es una decisión):** opción 1.

## Estado
Abierto hasta que el equipo decida.
