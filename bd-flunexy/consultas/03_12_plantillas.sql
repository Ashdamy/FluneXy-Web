-- ============================================================
-- TABLA: PLANTILLAS
-- ============================================================

-- [HU06.1 - RN06.1.3] Valida que el fondo exista, pertenezca al usuario y esté activo
SELECT id_fondo
FROM fondos
WHERE id_fondo = 2 AND id_usuario = 1 AND estado = TRUE;

-- [HU06.1 - RN06.1.2] Valida que la categoría corresponda al tipo de movimiento elegido
SELECT id_categoria
FROM categorias
WHERE id_categoria = 9 AND aplica_a = 'MOVIMIENTO' AND estado = TRUE;

-- [HU06.1 - RN06.1.1, RN06.1.4 a RN06.1.8] Registra la plantilla (estado Activa por defecto)
INSERT INTO plantillas (id_usuario, id_fondo, id_categoria, es_ingreso, monto, recurrencia, dia_ejecucion, fecha_inicio, fecha_fin, ejecuciones_realizadas, proxima_fecha_ejecucion, descripcion, estado)
VALUES (1, 2, 9, FALSE, 60000.00, 'MENSUAL', 15, '2026-09-15', '2027-09-15', 0, '2026-09-15', 'Suscripción gimnasio', TRUE);

-- [HU06.2 - RN06.2] Valida que la plantilla pertenezca al usuario y esté activa
SELECT id_plantilla, estado
FROM plantillas
WHERE id_plantilla = 2 AND id_usuario = 1 AND estado = TRUE;

-- [HU06.2 - RN06.0.7] Guarda la edición (solo afecta ejecuciones futuras)
UPDATE plantillas
SET monto = 50000.00
WHERE id_plantilla = 2 AND id_usuario = 1 AND estado = TRUE;

-- [HU06.3 - RN06.3.1, RN06.3.2] Valida que la plantilla pertenezca al usuario y esté activa
SELECT id_plantilla, estado
FROM plantillas
WHERE id_plantilla = 7 AND id_usuario = 6 AND estado = TRUE;

-- [HU06.3 - RN06.3.4] Marca la plantilla como inactiva (deja de generar movimientos)
UPDATE plantillas
SET estado = FALSE
WHERE id_plantilla = 7 AND id_usuario = 6 AND estado = TRUE;

-- [HU06.4 - RN06.4.1, RN06.4.2] Plantillas del usuario (activas e inactivas)
SELECT id_plantilla, es_ingreso, monto, recurrencia, dia_ejecucion, estado
FROM plantillas
WHERE id_usuario = 1;

-- ============================================================
-- CONSULTAS DE APOYO - PLANTILLAS
-- ============================================================

-- Plantillas activas por tipo de recurrencia
SELECT recurrencia, COUNT(id_plantilla) AS total_plantillas
FROM plantillas
WHERE estado = TRUE
GROUP BY recurrencia;

-- [RN06.4.4] Monto mensual total comprometido en plantillas activas
SELECT SUM(monto) AS total_mensual_automatizado
FROM plantillas
WHERE estado = TRUE AND recurrencia = 'MENSUAL';

-- Plantilla con mayor cantidad de ejecuciones realizadas
SELECT id_usuario, monto, ejecuciones_realizadas
FROM plantillas
ORDER BY ejecuciones_realizadas DESC
LIMIT 1;

-- Plantillas junto con su fondo y categoría
SELECT plantillas.es_ingreso, fondos.nombre AS fondo, categorias.nombre AS categoria, plantillas.monto
FROM plantillas
INNER JOIN fondos ON plantillas.id_fondo = fondos.id_fondo
INNER JOIN categorias ON plantillas.id_categoria = categorias.id_categoria
WHERE plantillas.estado = TRUE;
