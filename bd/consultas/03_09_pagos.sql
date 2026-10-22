-- ============================================================
-- TABLA: PAGOS
-- ============================================================

-- [HU11.1 - RN11.1.2] Valida que la cuota exista y esté vigente (no pagada)
SELECT id_cuota, id_pasivo, abono_capital
FROM cuotas
WHERE id_cuota = 5 AND pagada = FALSE;

-- [HU11.1 - RN11.1.1, HU11.3] Registra el pago sobre la cuota (es_anticipado indica el tipo)
INSERT INTO pagos (id_cuota, id_fondo, monto_pago, es_anticipado, fecha_pago)
VALUES (5, 3, 292461.38, FALSE, '2026-08-22');

-- [HU11.1, HU11.6 - RN11.6.1] Descuenta el capital abonado del saldo del pasivo
UPDATE pasivos
SET saldo_actual = saldo_actual - 240036.67
WHERE id_pasivo = 2;

-- [HU11.1] Marca la cuota como pagada
UPDATE cuotas
SET pagada = TRUE
WHERE id_cuota = 5;

-- [HU11.1 - RN05.0.1] El pago sale del fondo de origen
UPDATE fondos
SET saldo_actual = saldo_actual - 292461.38
WHERE id_fondo = 3;

-- [HU11.4 - RN11.4.1, RN11.4.2] Consulta la fecha registrada de un pago
SELECT fecha_pago
FROM pagos
WHERE id_pago = 1;

-- [HU11.5 - RN11.5.2, RN11.5.3] Historial de pagos en un período
SELECT id_cuota, monto_pago, fecha_pago
FROM pagos
WHERE fecha_pago >= '2025-01-01' AND fecha_pago <= '2025-06-30'
ORDER BY fecha_pago ASC;

-- ============================================================
-- CONSULTAS DE APOYO - PAGOS
-- ============================================================

-- Total pagado por pasivo
SELECT cuotas.id_pasivo, SUM(pagos.monto_pago) AS total_pagado
FROM pagos
INNER JOIN cuotas ON pagos.id_cuota = cuotas.id_cuota
GROUP BY cuotas.id_pasivo;

-- Pagos anticipados registrados
SELECT id_pago, id_cuota, monto_pago
FROM pagos
WHERE es_anticipado = TRUE;

-- Monto de pago promedio y máximo
SELECT AVG(monto_pago) AS monto_promedio, MAX(monto_pago) AS monto_maximo
FROM pagos;

-- Cuotas de un pasivo y su cantidad de pagos, incluyendo las que aún no tienen ninguno
SELECT cuotas.numero_cuota, COUNT(pagos.id_pago) AS total_pagos
FROM cuotas
LEFT JOIN pagos ON cuotas.id_cuota = pagos.id_cuota
WHERE cuotas.id_pasivo = 2
GROUP BY cuotas.numero_cuota
ORDER BY cuotas.numero_cuota ASC;
