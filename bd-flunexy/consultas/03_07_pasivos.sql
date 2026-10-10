-- ============================================================
-- TABLA: PASIVOS
-- ============================================================

-- [HU08.1 - RN08.1.1] Valida que no exista otro pasivo con el mismo nombre del usuario
SELECT id_pasivo
FROM pasivos
WHERE nombre = 'Tarjeta Falabella' AND id_usuario = 3;

-- [HU08.1 - RN08.1.2 a RN08.1.10] Registra el pasivo (estado Activo por defecto)
INSERT INTO pasivos (id_usuario, id_categoria, nombre, valor_inicial, saldo_actual, tasa_interes_mensual, plazo_meses, tipo_amortizacion, fecha_inicio, estado)
VALUES (3, 17, 'Tarjeta Falabella', 2000000.00, 2000000.00, 2.2, 12, 'FRANCESA', '2026-08-22', TRUE);

-- [HU08.1 - RN08.1.8, HU10.1] Genera la primera cuota, usando el id_pasivo recién
INSERT INTO cuotas (id_pasivo, numero_cuota, fecha_vencimiento, valor_cuota, abono_capital, interes, saldo_restante, pagada)
VALUES (currval('pasivos_id_pasivo_seq'), 1, '2026-09-22', 191449.77, 147449.77, 44000.00, 1852550.23, FALSE);

-- [HU08.2 - RN08.2.1] Detalle de un pasivo (saldo actual, valor inicial, plazo, tipo)
SELECT nombre, valor_inicial, saldo_actual, tasa_interes_mensual, plazo_meses, tipo_amortizacion, fecha_inicio, estado
FROM pasivos
WHERE id_pasivo = 7 AND id_usuario = 8;

-- [HU08.3 - RN08.3.1, RN08.3.2] Valida que el pasivo pertenezca al usuario y esté activo
SELECT id_pasivo, estado
FROM pasivos
WHERE id_pasivo = 6 AND id_usuario = 7 AND estado = TRUE;

-- [HU08.3] Guarda la información editada del pasivo
UPDATE pasivos
SET tasa_interes_mensual = 2.5
WHERE id_pasivo = 6 AND id_usuario = 7 AND estado = TRUE;

-- [HU08.3 - RN08.3.4] Si cambia tasa/plazo/tipo/valores, la tabla de amortización anterior queda
-- obsoleta: se elimina y se vuelve a generar con el mismo patrón de INSERT usado en HU08.1
--
DELETE FROM cuotas
WHERE id_pasivo = 6
  AND NOT EXISTS (
        SELECT 1
        FROM pagos p
        JOIN cuotas c ON c.id_cuota = p.id_cuota
        WHERE c.id_pasivo = 6
  );

-- [HU08.4 - RN08.4.1, RN08.4.2] Valida que el pasivo pertenezca al usuario y esté activo
SELECT id_pasivo, estado
FROM pasivos
WHERE id_pasivo = 9 AND id_usuario = 10 AND estado = TRUE;

-- [HU08.4 - RN08.4.4] Marca el pasivo como inactivo
UPDATE pasivos
SET estado = FALSE
WHERE id_pasivo = 9 AND id_usuario = 10 AND estado = TRUE;

-- ============================================================
-- CONSULTAS DE APOYO - PASIVOS
-- ============================================================

-- Pasivos activos de un usuario
SELECT id_pasivo, nombre, saldo_actual, tipo_amortizacion
FROM pasivos
WHERE id_usuario = 1 AND estado = TRUE;

-- Saldo total adeudado por usuario
SELECT id_usuario, SUM(saldo_actual) AS total_pasivos
FROM pasivos
WHERE estado = TRUE
GROUP BY id_usuario
ORDER BY total_pasivos DESC;

-- Cantidad de pasivos por tipo de amortización
SELECT tipo_amortizacion, COUNT(id_pasivo) AS total_pasivos
FROM pasivos
WHERE estado = TRUE
GROUP BY tipo_amortizacion;

-- Tasa de interés promedio y saldo máximo entre los pasivos activos
SELECT AVG(tasa_interes_mensual) AS tasa_promedio, MAX(saldo_actual) AS saldo_maximo
FROM pasivos
WHERE estado = TRUE;
