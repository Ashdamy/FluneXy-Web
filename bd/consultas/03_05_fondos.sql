-- ============================================================
-- TABLA: FONDOS
-- ============================================================

-- [HU04.1 - RN04.1.1] Valida que el nombre del fondo no exista para el usuario
SELECT id_fondo
FROM fondos
WHERE nombre = 'Bancolombia Ahorros' AND id_usuario = 1;

-- [HU04.1 - RN04.1.2, RN04.1.3] Registra el fondo (tipo validado por id_categoria, saldo >= 0)
-- CORRECCIÓN: se agregan saldo_inicial y fecha_creacion, ahora obligatorias. El saldo
-- inicial es el que captura el formulario (HU04.1) y al crear el fondo coincide con el
-- actual; la fecha de creación es la que muestra el detalle del fondo.
INSERT INTO fondos (id_usuario, id_categoria, nombre, saldo_inicial, saldo_actual, fecha_creacion, estado)
VALUES (1, 23, 'Bancolombia Ahorros', 500000.00, 500000.00, '2026-08-22', TRUE);

-- [HU04.1 - RN04.1.4] Registra el movimiento automático del saldo inicial, usando el
-- id_fondo que Postgres acaba de generar (currval, no un ID adivinado a mano)
-- CORRECCIÓN: fecha ahora es TIMESTAMP, así que lleva hora. id_plantilla se omite porque
-- es nullable y este movimiento es manual, no lo generó una plantilla.
INSERT INTO movimientos (id_usuario, id_fondo, id_categoria, es_ingreso, monto, fecha, descripcion, estado)
VALUES (1, currval('fondos_id_fondo_seq'), 5, TRUE, 500000.00, '2026-08-22 09:00:00', 'Saldo inicial', TRUE);

-- [HU04.2 - RN04.2.2] Valida que el fondo exista y pertenezca al usuario
SELECT id_fondo, nombre, saldo_actual, estado
FROM fondos
WHERE id_fondo = 1 AND id_usuario = 1;

-- [HU04.3 - RN04.3.1, RN04.3.2] Valida nombre único al editar, excluyendo el propio fondo
SELECT id_fondo
FROM fondos
WHERE nombre = 'Bancolombia Principal' AND id_usuario = 1 AND id_fondo <> 1;

-- [HU04.3] Guarda la información editada del fondo
UPDATE fondos
SET nombre = 'Bancolombia Principal'
WHERE id_fondo = 1 AND id_usuario = 1;

-- [HU04.3 - RN04.3.4] Si el saldo se modifica manualmente, se actualiza y se registra el ajuste
UPDATE fondos
SET saldo_actual = 1200000.00
WHERE id_fondo = 1 AND id_usuario = 1;

-- [HU04.3 - RN04.3.4] Movimiento de ajuste por la diferencia de saldo (1200000.00 - 1016000.00)
-- CORRECCIÓN: fecha con hora, por el cambio de DATE a TIMESTAMP.
INSERT INTO movimientos (id_usuario, id_fondo, id_categoria, es_ingreso, monto, fecha, descripcion, estado)
VALUES (1, 1, 5, TRUE, 184000.00, '2026-08-22 11:30:00', 'Ajuste de saldo', TRUE);

-- [HU04.4 - RN04.4.1, RN04.4.2] Valida que el fondo pertenezca al usuario y esté activo
SELECT id_fondo, estado
FROM fondos
WHERE id_fondo = 8 AND id_usuario = 5 AND estado = TRUE;

-- [HU04.4 - RN04.4.5] Marca el fondo como inactivo
UPDATE fondos
SET estado = FALSE
WHERE id_fondo = 8 AND id_usuario = 5 AND estado = TRUE;

-- ============================================================
-- CONSULTAS DE APOYO - FONDOS
-- ============================================================

-- Fondos activos de un usuario, ordenados por saldo
SELECT id_fondo, nombre, saldo_actual
FROM fondos
WHERE id_usuario = 1 AND estado = TRUE
ORDER BY saldo_actual DESC;

-- Saldo total disponible por usuario
SELECT id_usuario, SUM(saldo_actual) AS saldo_total
FROM fondos
WHERE estado = TRUE
GROUP BY id_usuario
ORDER BY saldo_total DESC;

-- Saldo promedio y máximo entre los fondos activos
SELECT AVG(saldo_actual) AS saldo_promedio, MAX(saldo_actual) AS saldo_maximo
FROM fondos
WHERE estado = TRUE;

-- Fondos junto con su categoría
SELECT fondos.nombre, categorias.nombre AS categoria, fondos.saldo_actual
FROM fondos
INNER JOIN categorias ON fondos.id_categoria = categorias.id_categoria
WHERE fondos.id_usuario = 1;
