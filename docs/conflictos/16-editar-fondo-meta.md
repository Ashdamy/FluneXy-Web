# 16. Cambiar el fondo al editar una meta

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD09, HU09.3: RN09.3.7 y el paso 3 del flujo principal.
- `frontend/pages/metas/editar-meta.html` frente a `frontend/pages/metas/nueva-meta.html`.
- Relacionado con el [conflicto 13](13-fondo-del-aporte.md) (fondo de un aporte).

## Qué dice cada una
- **RN09.3.7:** si se modifica el fondo asociado, los aportes futuros usarán el fondo nuevo y los anteriores quedan en el historial. Es decir, da por hecho que el fondo se puede cambiar.
- **HU09.3, paso 3:** "Modifica la información nombre de la meta, monto objetivo y fecha objetivo". No menciona el fondo.
- **Prototipo:** Editar Meta solo tiene nombre, monto objetivo y fecha objetivo. La lista de fondos solo aparece en Nueva Meta.

## Qué hace hoy la aplicación
Metas ya está migrado y sigue el prototipo, como pidió Santiago para este conflicto.
- **Nueva Meta:** el fondo se elige en la lista "Fondo de ahorro", con los fondos activos (RN09.1.1).
- **Editar Meta:** solo cambia nombre, monto objetivo y fecha objetivo. No hay campo de fondo, así que el fondo de una meta no se puede cambiar después de crearla.
- **Detalle de la meta:** muestra el fondo en el recuadro "FONDO ASOCIADO".
- **Registrar Aporte:** empieza en el fondo de la meta y deja elegir otro fondo activo ([conflicto 13](13-fondo-del-aporte.md)). Si el fondo de la meta está inactivo, empieza en el primer fondo activo.
- **Modal de desactivar:** nombra el fondo de la meta en su nota ([conflicto 18](18-ahorrado-al-desactivar-meta.md)).

**Consecuencia hoy:** si el fondo de una meta se desactiva, la meta queda asociada a un fondo inactivo para siempre. El usuario no puede cambiarlo, aunque RN04.4.4 dice que un fondo inactivo no se usa para metas. Los aportes igual se pueden hacer desde otro fondo, porque Registrar Aporte deja elegirlo.

## Opciones
1. **Agregar el selector de fondo en Editar Meta,** reutilizando la lista "Fondo de ahorro" de Nueva Meta, solo con fondos activos.
   - Cumple RN09.3.7: los aportes futuros usan el fondo nuevo y los anteriores conservan el suyo, porque cada aporte guarda su `id_fondo`.
   - Resuelve el caso del fondo desactivado.
   - Cambia la pantalla de Editar Meta, que en el prototipo no tiene ese campo.
   - No cambia la BD (`metas.id_fondo` ya existe).
2. **No permitir cambiar el fondo,** como hoy, como HU09.3 y como el prototipo.
   - No cambia nada en la aplicación.
   - RN09.3.7 queda sin efecto y el equipo tendría que quitarla de la documentación.
   - El fondo de la meta solo sirve como punto de partida en Registrar Aporte. Si se desactiva, la meta queda con un fondo inactivo.

Si se elige la opción 1, conviene decidir al mismo tiempo el conflicto 13, porque los dos tratan de qué fondo usa la meta.

**Recomendación (no es una decisión):** opción 1, porque la regla es explícita y el diseño del selector ya existe en Nueva Meta.

## Estado
Decidido por Claude el 2026-11-13, por encargo de Santiago ("en base a las decisiones ya tomadas"). Revisar. Opción 1, derivada de RN09.3.7, RN04.4.4 y el criterio de seguir la documentación.

## Solución decidida
Al editar una meta **se puede cambiar su fondo asociado**, eligiendo entre los fondos activos (RN09.3.7, RN09.1.1). Los aportes futuros usan el fondo nuevo y los anteriores conservan el suyo (cada aporte guarda su `id_fondo`).

Por qué: RN09.3.7 lo pide de forma explícita y el criterio acordado es seguir la documentación. Además resuelve el caso del fondo desactivado: hoy una meta queda asociada a un fondo inactivo sin poder cambiarlo, y RN04.4.4 dice que un fondo inactivo no se usa para metas.

## Cambios por aplicar
1. `paginas/metas/EditarMeta.jsx`: agregar la lista "Fondo de ahorro" de Nueva Meta (`ListaFondosMeta` de `CamposMeta.jsx`) con los fondos activos. Si el fondo actual está inactivo, no aparece y hay que elegir otro.
2. `datos/metas.js`: `actualizarMeta` también guarda `fondoId`.
3. RN09.3.8: cambiar el fondo no mueve el monto ahorrado ni los saldos.
4. Regresión: casos de cambiar el fondo en `scripts/regresion/casos/09-metas.mjs`.
5. **BD:** ninguno (`metas.id_fondo` ya existe).
