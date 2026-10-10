-- ============================================================
-- TABLA: APORTES
-- ============================================================

-- [HU11.2 - RN11.2.1] Valida que la meta exista y esté activa
SELECT id_meta, monto_objetivo, monto_ahorrado
FROM metas
WHERE id_meta = 6 AND estado = TRUE;

-- [HU11.2 - RN11.2.2] Sin consulta propia: el "ahorro mensual requerido" con el que se
-- compara el aporte es un valor calculado en la aplicación, no una columna almacenada;
-- la comparación ocurre en el backend, no contra la base de datos.

-- [HU11.2 - RN11.2.3, RN11.2.4] Registra el aporte sobre la meta
INSERT INTO aportes (id_meta, id_fondo, monto_aporte, fecha_aporte)
VALUES (6, 10, 500000.00, '2026-08-22');

-- [HU11.2, HU11.6] Suma el aporte al progreso de la meta
UPDATE metas
SET monto_ahorrado = monto_ahorrado + 500000.00
WHERE id_meta = 6;

-- [HU11.2 - RN05.0.1] El aporte sale del fondo de origen
UPDATE fondos
SET saldo_actual = saldo_actual - 500000.00
WHERE id_fondo = 10;

-- [HU11.4 - RN11.4.1, RN11.4.2] Consulta la fecha registrada de un aporte
SELECT fecha_aporte
FROM aportes
WHERE id_aporte = 1;

-- [HU11.5 - RN11.5.2, RN11.5.3] Historial de aportes en un período
SELECT id_meta, monto_aporte, fecha_aporte
FROM aportes
WHERE fecha_aporte >= '2025-01-01' AND fecha_aporte <= '2025-06-30'
ORDER BY fecha_aporte ASC;

-- ============================================================
-- CONSULTAS DE APOYO - APORTES
-- ============================================================

-- Total aportado por meta
SELECT id_meta, SUM(monto_aporte) AS total_aportado
FROM aportes
GROUP BY id_meta;

-- Aporte promedio por meta
SELECT id_meta, AVG(monto_aporte) AS aporte_promedio
FROM aportes
GROUP BY id_meta;

-- Metas y su cantidad de aportes, incluyendo las que aún no tienen ninguno
SELECT metas.nombre, COUNT(aportes.id_aporte) AS total_aportes
FROM metas
LEFT JOIN aportes ON metas.id_meta = aportes.id_meta
GROUP BY metas.nombre
ORDER BY total_aportes ASC;
