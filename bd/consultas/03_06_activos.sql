-- ============================================================
-- TABLA: ACTIVOS
-- ============================================================

-- [HU07.1 - RN07.1.2] Valida que no exista otro activo con el mismo nombre del usuario
SELECT id_activo
FROM activos
WHERE nombre = 'Moto Kawasaki' AND id_usuario = 6;
INSERT INTO activos (id_usuario, id_categoria, nombre, valor, fecha_registro, fecha_actualizacion, estado)
VALUES (6, 12, 'Moto Kawasaki', 7500000.00, '2026-08-22', '2026-08-22', TRUE);

-- [HU07.2 - RN07.2.1] Activos activos de un usuario
SELECT id_activo, nombre, valor, estado
FROM activos
WHERE id_usuario = 1 AND estado = TRUE;

-- [HU07.3 - RN07.3.1, RN07.3.2] Valida que el activo pertenezca al usuario y esté activo
SELECT id_activo, nombre, valor
FROM activos
WHERE id_activo = 1 AND id_usuario = 1 AND estado = TRUE;

-- [HU07.3 - RN07.3.3] Valida nombre único al editar, excluyendo el propio activo
SELECT id_activo
FROM activos
WHERE nombre = 'Portafolio Diversificado' AND id_usuario = 1 AND id_activo <> 1;

-- [HU07.3] Guarda la información editada del activo
UPDATE activos
SET nombre = 'Portafolio Diversificado', valor = 19500000.00, fecha_actualizacion = '2026-08-22'
WHERE id_activo = 1 AND id_usuario = 1 AND estado = TRUE;

-- [HU07.4 - RN07.4.1, RN07.4.2] Valida que el activo pertenezca al usuario y esté activo
SELECT id_activo, estado
FROM activos
WHERE id_activo = 7 AND id_usuario = 6 AND estado = TRUE;

-- [HU07.4 - RN07.4.4] Marca el activo como inactivo
UPDATE activos
SET estado = FALSE
WHERE id_activo = 7 AND id_usuario = 6 AND estado = TRUE;

-- [HU07.5 - RN07.5.1, RN07.5.4] Valor total de activos de un usuario
SELECT SUM(valor) AS valor_total_activos
FROM activos
WHERE id_usuario = 1 AND estado = TRUE;

-- ============================================================
-- CONSULTAS DE APOYO - ACTIVOS
-- ============================================================

-- Activos activos por usuario, con su categoría
SELECT usuarios.nombre, usuarios.apellido, categorias.nombre AS categoria, activos.nombre, activos.valor
FROM activos
INNER JOIN usuarios ON activos.id_usuario = usuarios.id_usuario
INNER JOIN categorias ON activos.id_categoria = categorias.id_categoria
WHERE activos.estado = TRUE;

-- Valor total de activos por categoría
SELECT categorias.nombre, SUM(activos.valor) AS valor_total
FROM activos
INNER JOIN categorias ON activos.id_categoria = categorias.id_categoria
WHERE activos.estado = TRUE
GROUP BY categorias.nombre
ORDER BY valor_total DESC;

-- Valor promedio y máximo entre los activos activos
SELECT AVG(valor) AS valor_promedio, MAX(valor) AS valor_maximo
FROM activos
WHERE estado = TRUE;

-- Categorías de activo y su cantidad de usos, incluyendo las que nunca se han usado
SELECT categorias.nombre, COUNT(activos.id_activo) AS total_activos
FROM categorias
LEFT JOIN activos ON categorias.id_categoria = activos.id_categoria
WHERE categorias.aplica_a = 'ACTIVO'
GROUP BY categorias.nombre
ORDER BY total_activos ASC;
