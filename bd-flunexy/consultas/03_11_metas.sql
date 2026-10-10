-- ============================================================
-- TABLA: METAS
-- ============================================================

-- [HU09.1 - RN09.1.2] Valida que el nombre no se repita entre las metas activas del usuario
SELECT id_meta
FROM metas
WHERE nombre = 'Fondo de Emergencia' AND id_usuario = 1 AND estado = TRUE;

-- [HU09.1 - RN09.1.1] Valida que el fondo asociado exista, pertenezca al usuario y esté activo
SELECT id_fondo
FROM fondos
WHERE id_fondo = 2 AND id_usuario = 1 AND estado = TRUE;

-- [HU09.1 - RN09.1.3, RN09.1.4, RN09.1.7] Registra la meta (monto_ahorrado en 0, estado Activa)
INSERT INTO metas (id_usuario, id_fondo, nombre, monto_objetivo, monto_ahorrado, fecha_objetivo, estado)
VALUES (1, 2, 'Fondo Salud', 3000000.00, 0.00, '2027-01-31', TRUE);

-- [HU09.1 - RN09.1.5] Sin consulta propia: el "ahorro mensual requerido" se calcula en la
-- aplicación (monto_objetivo dividido entre meses restantes) y no se persiste en la tabla.

-- [HU09.2 - RN09.2.1, RN09.2.2] Detalle de la meta (el progreso % se calcula en la aplicación)
SELECT nombre, monto_objetivo, monto_ahorrado, fecha_objetivo, estado
FROM metas
WHERE id_meta = 4 AND id_usuario = 4;

-- [HU09.3 - RN09.3.1] Valida que la meta pertenezca al usuario y esté activa (ver HU09.4 abajo)
SELECT id_meta, estado
FROM metas
WHERE id_meta = 3 AND id_usuario = 3 AND estado = TRUE;

-- [HU09.3] Guarda la información editada de la meta
UPDATE metas
SET monto_objetivo = 4000000.00, fecha_objetivo = '2025-12-31'
WHERE id_meta = 3 AND id_usuario = 3 AND estado = TRUE;

-- [HU09.4 - RN09.4.1, RN09.4.2] Valida que la meta pertenezca al usuario y esté activa
SELECT id_meta, estado
FROM metas
WHERE id_meta = 9 AND id_usuario = 1 AND estado = TRUE;

-- [HU09.4 - RN09.4.3, RN09.4.6] Marca la meta como inactiva (conserva monto_ahorrado)
UPDATE metas
SET estado = FALSE
WHERE id_meta = 9 AND id_usuario = 1 AND estado = TRUE;

-- ============================================================
-- CONSULTAS DE APOYO - METAS
-- ============================================================

-- Metas activas de un usuario
SELECT id_meta, nombre, monto_objetivo, monto_ahorrado, fecha_objetivo
FROM metas
WHERE id_usuario = 1 AND estado = TRUE;

-- Metas más próximas a vencer
SELECT id_usuario, nombre, fecha_objetivo
FROM metas
WHERE estado = TRUE
ORDER BY fecha_objetivo ASC
LIMIT 5;

-- Total ahorrado por usuario entre sus metas activas
SELECT id_usuario, SUM(monto_ahorrado) AS total_ahorrado
FROM metas
WHERE estado = TRUE
GROUP BY id_usuario
ORDER BY total_ahorrado DESC;

-- Metas junto con su fondo asociado
SELECT metas.nombre, fondos.nombre AS fondo, metas.monto_objetivo
FROM metas
INNER JOIN fondos ON metas.id_fondo = fondos.id_fondo
WHERE metas.estado = TRUE;
