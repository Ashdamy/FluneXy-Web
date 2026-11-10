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
El módulo Metas aún no está migrado. Registrar Aporte empieza en el fondo de la meta y deja elegir otro (conflicto 13).

## Opciones
1. **Agregar el selector de fondo en Editar Meta,** reutilizando el bloque "Fondo de ahorro" de Nueva Meta. Cumple RN09.3.7 y agrega un campo que el diseño de Editar no tiene.
2. **No permitir cambiar el fondo,** como HU09.3 y el prototipo. RN09.3.7 queda sin efecto.

**Recomendación (no es una decisión):** opción 1, porque la regla es explícita y el diseño del selector ya existe en Nueva Meta.

## Estado
Abierto hasta que el equipo decida.
