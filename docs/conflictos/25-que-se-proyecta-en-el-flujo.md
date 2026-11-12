# 25. Qué se proyecta en el flujo de caja

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD12: RN12.2.1, RN12.3.1 y RN12.5.1.
- `bd/01_create_tables.sql`: tablas `movimientos`, `plantillas`, `metas` y `aportes`.
- Relacionado con el [conflicto 10](10-cuotas-para-metas.md) (cuotas para metas).

## Qué dice cada una
- **RN12.2.1 y RN12.3.1:** ingresos y gastos "estimados" con base en la "información proyectada registrada". No dicen si son los movimientos del mes, las plantillas recurrentes o las dos cosas.
- **RN12.5.1:** el ahorro de metas sale de metas "con cuotas o aportes programados".
- **BD:** las metas no tienen cuotas ni aportes programados; los aportes se registran cuando se hacen (`aportes.fecha_aporte`). Lo único "programado" de una meta es su ahorro mensual requerido (RN09.1.5).

## Qué hace hoy la aplicación
- **Ingresos y gastos:** movimientos activos del mes más las ejecuciones de plantillas activas que aún no llegan, dentro del mes.
- **Ahorro de metas:** la suma del ahorro mensual requerido de las metas activas sin cumplir.
- **Cuotas:** las que vencen en el mes, de pasivos activos.
- **Periodo:** solo el mes actual; el selector es decorativo, como en el prototipo.

## Opciones
1. **Dejarlo así:** lo real del mes más lo que falta por ejecutarse, y las metas con su ahorro mensual.
2. **Solo plantillas** como "estimado" (proyección pura) y solo aportes ya registrados en el mes para las metas.
3. **Agregar aportes programados** a la BD, junto con el conflicto 10.

**Recomendación (no es una decisión):** opción 1.

## Estado
Abierto hasta que el equipo decida.
