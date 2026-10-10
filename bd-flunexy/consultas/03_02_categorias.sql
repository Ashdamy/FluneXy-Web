-- ============================================================
-- TABLA: CATEGORIAS
-- ============================================================

-- [HU03.1 - Visualizar categorías por tipo] Categorías para registrar un Movimiento
SELECT id_categoria, nombre, es_ingreso
FROM categorias
WHERE aplica_a = 'MOVIMIENTO' AND estado = TRUE;

-- [HU03.1] Categorías disponibles para registrar un Activo
SELECT id_categoria, nombre
FROM categorias
WHERE aplica_a = 'ACTIVO' AND estado = TRUE;

-- [HU03.1] Categorías disponibles para registrar un Pasivo
SELECT id_categoria, nombre
FROM categorias
WHERE aplica_a = 'PASIVO' AND estado = TRUE;

-- [HU03.1] Categorías disponibles para registrar un Fondo
SELECT id_categoria, nombre
FROM categorias
WHERE aplica_a = 'FONDO' AND estado = TRUE;

-- [HU03.2 - RN03.2.2, RN03.2.4] Valida que la categoría exista, corresponda al tipo y esté activa
SELECT id_categoria
FROM categorias
WHERE id_categoria = 6 AND aplica_a = 'MOVIMIENTO' AND estado = TRUE;

-- ============================================================
-- CONSULTAS DE APOYO - CATEGORIAS
-- ============================================================

-- Categorías por tipo de aplicación
SELECT aplica_a, COUNT(id_categoria) AS total_categorias
FROM categorias
GROUP BY aplica_a;

-- Categorías de ingreso disponibles para movimientos
SELECT id_categoria, nombre
FROM categorias
WHERE aplica_a = 'MOVIMIENTO' AND es_ingreso = TRUE;

-- Total gastado por categoría de gasto
SELECT categorias.nombre, SUM(movimientos.monto) AS total_gastado
FROM categorias
INNER JOIN movimientos ON categorias.id_categoria = movimientos.id_categoria
WHERE categorias.es_ingreso = FALSE AND movimientos.estado = TRUE
GROUP BY categorias.nombre
ORDER BY total_gastado DESC;

-- Categorías de movimiento y su cantidad de usos, incluyendo las que nunca se han usado
SELECT categorias.nombre, COUNT(movimientos.id_movimiento) AS total_usos
FROM categorias
LEFT JOIN movimientos ON categorias.id_categoria = movimientos.id_categoria
WHERE categorias.aplica_a = 'MOVIMIENTO'
GROUP BY categorias.nombre
ORDER BY total_usos ASC;
