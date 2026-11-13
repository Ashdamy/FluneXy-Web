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
Decidido por Claude el 2026-11-13, por encargo de Santiago ("en base a las decisiones ya tomadas"). Revisar. Opción 2, derivada de 16 (ahora el fondo de la meta se puede cambiar).

## Solución decidida
El aporte **sale siempre del fondo asociado a la meta**, como dicen RN09.3.7 y el Diccionario de datos. Para aportar desde otro fondo, se cambia primero el fondo de la meta en Editar Meta ([conflicto 16](16-editar-fondo-meta.md)).

Por qué: antes, elegir otro fondo al aportar era la única salida porque el fondo de la meta no se podía cambiar. Con el 16 decidido, ya no hace falta, y así se cumple la regla al pie de la letra. La columna `aportes.id_fondo` sigue siendo necesaria: guarda el fondo que se usó en cada aporte, para que los aportes anteriores conserven el suyo cuando la meta cambie de fondo (RN09.3.7).

## Cambios por aplicar
1. `paginas/pagos/RegistrarAporte.jsx`: mostrar solo el fondo de la meta, sin poder elegir otro (en el prototipo es una lista de fondos).
2. Si el fondo de la meta está inactivo, no se registra el aporte y se avisa que hay que cambiar el fondo en Editar Meta. Si no tiene saldo suficiente, se rechaza como hoy (RN05.0.1).
3. Regresión: ajustar `scripts/regresion/casos/08-pagos.mjs` y `09-metas.mjs`.
4. **BD:** ninguno.
5. **Pendiente de diseño:** cómo se ve el fondo fijo y el aviso de fondo inactivo.
