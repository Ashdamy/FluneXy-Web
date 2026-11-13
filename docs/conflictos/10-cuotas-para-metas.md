# 10. Cuotas para metas

## Qué choca
- `docs/requisitos UML/Diagramas de casos de uso/MOD09_Meta.drawio`: caso "CU10.2 generar cuotas para metas".
- `FluneXy modulos-Historias de usuario (4).docx`, MOD10: HU10.1, HU10.2 y HU10.3, que hablan de aportes, ahorro y "todos los tipos de cuotas".
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD11, HU11.6: habla de cuotas de tipo pasivo o meta.
- `bd/01_create_tables.sql`, tabla `cuotas`: solo tiene `id_pasivo`.
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD09: RN09.1.5, ahorro mensual requerido.

## Qué dice cada una
- **Diagrama e historias:** sugieren que las metas también tienen cuotas.
- **BD:** una cuota solo pertenece a un pasivo, y los aportes van en su propia tabla sin relación con cuotas.
- **RN09.1.5:** para las metas calcula un ahorro mensual, sin mencionar cuotas.

## Qué hace hoy la aplicación
Solo los pasivos tienen cuotas. Los aportes se registran directo sobre la meta, como la BD.

## Opciones
1. **Sin cuotas para metas,** con el ahorro mensual de RN09.1.5. Coincide con la BD y con el prototipo de Metas.
2. **Agregar cuotas de metas.** Exige cambiar la BD y diseñar pantallas nuevas.

**Recomendación (no es una decisión):** opción 1.

## Estado
Decidido por Santiago el 2026-11-13: opción 1. Es un error de la documentación: las metas no tienen cuotas, tienen **aportes**. La aplicación no cambia; falta corregir la documentación.

## Solución decidida
- Las **cuotas** son solo de los **pasivos** (tabla `cuotas`, con `id_pasivo`).
- Las **metas** avanzan con **aportes** (tabla `aportes`, con `id_meta`), que se registran desde Pagos (HU11.2). Su ahorro sugerido es el ahorro mensual requerido (RN09.1.5).

Esto coincide con la BD y con el prototipo.

## Cambios por aplicar
1. **Aplicación y BD:** ninguno. Ya funcionan así: las cuotas salen de la tabla de amortización del pasivo y los aportes van directo a la meta.
2. **Documentación** (la corrige el equipo; los originales no se modifican desde la migración):
   - `requisitos UML/Diagramas de casos de uso/MOD09_Meta.drawio`: quitar el caso "CU10.2 generar cuotas para metas", o cambiarlo por "registrar aportes".
   - `FluneXy modulos-Historias de usuario (4).docx`, MOD10 (HU10.1 a HU10.3): dejar las cuotas solo para pasivos.
   - `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, HU11.6: quitar las cuotas "de tipo meta"; el impacto en una meta es el de un aporte.
   - Mismo documento, RN12.5.1 y RN12.5.3 (flujo de caja): cambiar "cuotas o aportes programados" por "aportes" o "ahorro mensual" (ver el [conflicto 25](25-que-se-proyecta-en-el-flujo.md)).
