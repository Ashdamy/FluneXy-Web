-- ============================================================
-- TABLA: CUOTAS
-- ============================================================

-- [HU10.1 - RN10.1.3] Valida que el pasivo exista y esté activo antes de generar cuotas
SELECT id_pasivo, estado
FROM pasivos
WHERE id_pasivo = 5 AND estado = TRUE;

-- [HU10.1 - RN10.1.1, RN10.1.2] Genera una cuota asociada al pasivo (una fila por cuota)
INSERT INTO cuotas (id_pasivo, numero_cuota, fecha_vencimiento, valor_cuota, abono_capital, interes, saldo_restante, pagada)
VALUES (5, 1, '2025-07-01', 210670.68, 130670.68, 80000.00, 7869329.32, FALSE);

-- [HU10.2] Detalle de una cuota: saldo inicial (derivado), interés, abono a capital y saldo final
SELECT numero_cuota, (saldo_restante + abono_capital) AS saldo_inicial, interes, abono_capital, saldo_restante AS saldo_final
FROM cuotas
WHERE id_cuota = 14;

-- [HU10.3 - RN10.3.2, RN10.3.3] Número y fecha de todas las cuotas de un pasivo, en orden de vencimiento
SELECT numero_cuota, fecha_vencimiento
FROM cuotas
WHERE id_pasivo = 2
ORDER BY numero_cuota ASC;

-- ============================================================
-- CONSULTAS DE APOYO - CUOTAS
-- ============================================================

-- Cuotas pendientes de un pasivo
SELECT numero_cuota, fecha_vencimiento, valor_cuota
FROM cuotas
WHERE id_pasivo = 7 AND pagada = FALSE
ORDER BY fecha_vencimiento ASC;

-- Cantidad de cuotas pagadas y pendientes por pasivo
SELECT id_pasivo, pagada, COUNT(id_cuota) AS total_cuotas
FROM cuotas
GROUP BY id_pasivo, pagada
ORDER BY id_pasivo ASC;

-- Total de intereses de la tabla de amortización de un pasivo
SELECT SUM(interes) AS total_intereses
FROM cuotas
WHERE id_pasivo = 7;

-- Capital pendiente por abonar, por pasivo
SELECT id_pasivo, SUM(abono_capital) AS capital_pendiente
FROM cuotas
WHERE pagada = FALSE
GROUP BY id_pasivo
ORDER BY capital_pendiente DESC;
