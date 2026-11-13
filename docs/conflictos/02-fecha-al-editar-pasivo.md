# 02. Editar un pasivo antiguo obliga a cambiar su fecha

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD08, HU08.3: RN08.3.7 y RN08.3.3.
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD08, HU08.3: RN08.3.4 y HU08.2 (RN08.2.5), que permiten actualizar un pasivo activo.

## Qué dice cada una
- **RN08.3.7 y RN08.3.3:** al editar, la fecha de inicio debe ser la de hoy o una futura.
- **HU08.3:** un pasivo activo se puede actualizar en cualquier momento, por ejemplo para corregir su nombre.

Un pasivo que empezó hace meses tiene una fecha pasada. Si la regla se aplica tal cual, no se puede corregir ni el nombre sin mover también la fecha, y al moverla cambian todos los vencimientos de la tabla.

## Qué hace hoy la aplicación
Editar Pasivo acepta la fecha que ya tiene el pasivo y cualquier otra, también pasadas. Se mantiene así para no alterar los vencimientos al editar otro dato.

**Hoy Pasivos y Metas no se comportan igual:** Editar Meta sí aplica su regla equivalente (RN09.3.5) y no acepta fechas anteriores a hoy ([conflicto 20](20-fecha-al-editar-meta.md)). Conviene decidir el 01, el 02 y el 20 juntos.

*Revisado el 2026-11-13, con todos los módulos migrados.*

## Opciones
1. **Validar la fecha solo si el usuario la cambia,** y permitir conservar la que ya tenía. Es lo mínimo para que RN08.3.7 no bloquee la edición.
2. **No validar la fecha al editar,** como hoy. Depende de lo que se decida en el conflicto 01.
3. **Aplicar RN08.3.7 tal cual.** Obliga a falsear la fecha para editar cualquier dato.

**Recomendación (no es una decisión):** opción 2 si en el conflicto 01 se permiten fechas pasadas; si no, opción 1.

## Estado
Abierto hasta que el equipo decida.
