# 15. Cálculo del ahorro mensual de una meta

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD09, HU09.1: RN09.1.5 y RN09.1.6.
- `bd/consultas/03_11_metas.sql`, comentario de HU09.1 - RN09.1.5.
- `frontend/pages/metas/mis-metas.html`, `detalle-meta.html` y `editar-meta.html`.

## Qué dice cada una
- **RN09.1.5 y la consulta de la BD:** el ahorro mensual requerido es el **monto objetivo** dividido entre los meses completos restantes.
- **RN09.1.6:** si la fecha objetivo cae en el mismo mes, el ahorro mensual es el **monto objetivo pendiente**.
- **Prototipo:** divide lo que **falta por ahorrar** entre los meses restantes:
  - Vivienda: ($80.000.000 − $15.000.000) ÷ 36 = $1.805.000/mes. Con el monto objetivo daría $2.222.222.
  - Moto Nueva: ($12.000.000 − $6.000.000) ÷ 6 = $1.000.000/mes. Con el monto objetivo daría $2.000.000.
  - Viaje a México: ($5.000.000 − $2.500.000) ÷ 3 = $833.000/mes.

Al crear una meta las dos fórmulas dan lo mismo, porque empieza en $0 (RN09.1.7). La diferencia aparece después del primer aporte. RN09.3.6 pide recalcular el ahorro mensual, pero no dice con qué fórmula.

## Qué hace hoy la aplicación
Calcula lo que falta por ahorrar dividido entre los meses completos restantes (opción 1). Con 0 meses pide todo lo que falta (RN09.1.6).

## Opciones
1. **Lo que falta ÷ meses restantes,** como el prototipo y RN09.1.6. Al aportar baja la cuota mensual, y una meta completa pide $0.
2. **Monto objetivo ÷ meses restantes,** como RN09.1.5 al pie de la letra. Los aportes no cambian el ahorro mensual, y una meta completa seguiría pidiendo dinero.

**Recomendación (no es una decisión):** opción 1.

## Estado
Decidido por Santiago el 2026-11-12: opción 1.
