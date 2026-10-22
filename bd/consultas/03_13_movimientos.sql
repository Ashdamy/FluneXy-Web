-- ============================================================
-- TABLA: MOVIMIENTOS
-- ============================================================

-- [HU05.1, HU05.2 - RN05.1.2, RN05.2.2, RN05.2.3] Valida que el fondo exista, sea del usuario y esté activo
SELECT id_fondo, saldo_actual
FROM fondos
WHERE id_fondo = 6 AND id_usuario = 4 AND estado = TRUE;

-- [HU05.1 - RN05.0.1] Para un Gasto, valida que el fondo tenga saldo suficiente (620000 >= 50000)
-- (la comparación numérica la hace la aplicación con el saldo_actual devuelto arriba)

-- [HU05.1 - RN05.1.1, RN05.1.3, RN05.1.4] Registra el movimiento
INSERT INTO movimientos (id_usuario, id_fondo, id_categoria, es_ingreso, monto, fecha, descripcion, estado)
VALUES (4, 6, 7, FALSE, 50000.00, '2026-08-22 07:15:00', 'Gasolina', TRUE);

-- [HU05.1 - RN05.1.6] Actualiza el saldo del fondo (Gasto: resta)
UPDATE fondos
SET saldo_actual = saldo_actual - 50000.00
WHERE id_fondo = 6;

-- [HU05.3 - RN05.3.4] Edición que cambia el monto: primero revierte el efecto anterior sobre el fondo
UPDATE fondos
SET saldo_actual = saldo_actual + 90000.00
WHERE id_fondo = 4;

-- [HU05.3 - RN05.3.1, RN05.3.2] Guarda la información editada del movimiento
UPDATE movimientos
SET monto = 120000.00
WHERE id_movimiento = 5 AND id_usuario = 2 AND estado = TRUE;

-- [HU05.3 - RN05.3.4] Aplica el nuevo efecto sobre el fondo
UPDATE fondos
SET saldo_actual = saldo_actual - 120000.00
WHERE id_fondo = 4;

-- [HU05.4 - RN05.4.1] Valida que el movimiento exista, sea del usuario y esté activo
SELECT id_movimiento, es_ingreso, monto, id_fondo
FROM movimientos
WHERE id_movimiento = 8 AND id_usuario = 6 AND estado = TRUE;

-- [HU05.4 - RN05.4.3] Marca el movimiento como inactivo
UPDATE movimientos
SET estado = FALSE
WHERE id_movimiento = 8 AND id_usuario = 6 AND estado = TRUE;

-- [HU05.4 - RN05.4.4] Elimina el efecto del movimiento desactivado (era un Gasto: se devuelve el monto)
UPDATE fondos
SET saldo_actual = saldo_actual + 95000.00
WHERE id_fondo = 9;

-- [HU05.5 - RN05.5.2, RN05.5.4] Historial de movimientos activos, más reciente primero
SELECT id_movimiento, es_ingreso, monto, fecha, descripcion
FROM movimientos
WHERE id_usuario = 1 AND estado = TRUE
ORDER BY fecha DESC;

-- [HU05.5 - RN05.5.3] Historial filtrado por tipo (Gastos)
SELECT id_movimiento, monto, fecha, descripcion
FROM movimientos
WHERE id_usuario = 1 AND es_ingreso = FALSE AND estado = TRUE
ORDER BY fecha DESC;

-- [HU05.6 - RN05.6.1, RN05.6.2] Detalle completo de un movimiento
SELECT id_fondo, id_categoria, es_ingreso, monto, fecha, descripcion, estado
FROM movimientos
WHERE id_movimiento = 2 AND id_usuario = 1;

-- ============================================================
-- CONSULTAS DE APOYO - MOVIMIENTOS
-- ============================================================

-- Total de ingresos y gastos por usuario
SELECT id_usuario, es_ingreso, SUM(monto) AS total
FROM movimientos
WHERE estado = TRUE
GROUP BY id_usuario, es_ingreso;

-- Gasto promedio por categoría
SELECT id_categoria, AVG(monto) AS gasto_promedio
FROM movimientos
WHERE es_ingreso = FALSE AND estado = TRUE
GROUP BY id_categoria;

-- Movimientos junto con fondo y categoría
SELECT movimientos.es_ingreso, fondos.nombre AS fondo, categorias.nombre AS categoria, movimientos.monto
FROM movimientos
INNER JOIN fondos ON movimientos.id_fondo = fondos.id_fondo
INNER JOIN categorias ON movimientos.id_categoria = categorias.id_categoria
WHERE movimientos.id_usuario = 1;

-- Categorías de movimiento y su cantidad de usos, incluyendo las que nunca se han usado
SELECT categorias.nombre, COUNT(movimientos.id_movimiento) AS total_usos
FROM categorias
LEFT JOIN movimientos ON categorias.id_categoria = movimientos.id_categoria
WHERE categorias.aplica_a = 'MOVIMIENTO'
GROUP BY categorias.nombre
ORDER BY total_usos ASC;
