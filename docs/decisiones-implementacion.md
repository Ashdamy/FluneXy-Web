# Decisiones de implementación

Decisiones tomadas en la migración a React donde la documentación no da una respuesta. Cada una indica la regla relacionada. Los conflictos entre documentos están en [conflictos/](conflictos/README.md).

## Pagos

| Decisión | Regla relacionada | Qué hace la aplicación | Por qué |
|---|---|---|---|
| Tope del pago | RN11.1.1, RN08.1.3, RN05.0.1 | No acepta un monto mayor al saldo del pasivo más el interés pendiente de la cuota | El saldo no baja de cero, así que el resto saldría del fondo sin aplicarse a nada |
| Excedente del pago | HU11.1 (tipo "Abono capital"), RN11.6.1 | Lo que supere el valor de la cuota va a capital, y las cuotas siguientes no se recalculan | La documentación no dice qué hacer con el excedente; "Abono capital" es el tipo de pago más cercano |
| Saldo en cero por abonos | RN08.1.3, RN11.1.2 | Si los abonos dejan el saldo en cero, las cuotas restantes quedan como pagadas | Sin deuda no hay cuotas que cobrar |
| Próxima cuota | Regla "RN11.1.2" de HU11.3, RN11.3.3 | "Cuota del siguiente mes" se interpreta como la próxima cuota pendiente; un pago anticipado no puede superar lo que falta de ella | Ver [conflicto 14](conflictos/14-numeracion-rn11-1-2.md) |
| Aporte consistente con el ahorro mensual | RN11.2.2, RN09.1.5 | No se bloquea ningún aporte por este motivo | La regla no define cómo medir "consistente", y el prototipo muestra un aporte de $500.000 en una meta de $1.000.000 al mes |

## Otros módulos

| Decisión | Regla relacionada | Qué hace la aplicación | Por qué |
|---|---|---|---|
| Comparación de nombres | RN04.1.1, RN07.1.2, RN08.1.1 | Ignora mayúsculas, minúsculas y espacios en los extremos, y también compara con registros inactivos | Las reglas hablan de los registros del usuario sin excluir los inactivos |
| Qué dispara el recálculo de la tabla | RN08.3.4, RN08.5.3 | Cambiar saldo, tasa, plazo o amortización recalcula las cuotas pendientes con el saldo y el plazo restantes; las pagadas no cambian por el saldo | Las cuotas ya pagadas son historial |
| Saldo en cero al editar un pasivo | RN08.1.3, RN08.3.4 | Las cuotas restantes quedan como pagadas | Igual que al llegar a cero con pagos |
