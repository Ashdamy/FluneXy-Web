-- ============================================================
-- TABLA: ALERTAS_HISTORIAL
-- ============================================================

-- [HU15.6 - RN15.6.1, RN15.6.2] Valida que exista una configuración activa antes de generar la alerta
SELECT id_alerta_config, tipo_alerta, umbral
FROM alertas_configuracion
WHERE id_alerta_config = 1 AND estado = TRUE;

-- [HU15.6 - RN15.6.3] Genera y registra la alerta automática
INSERT INTO alertas_historial (id_alerta_config, valor_detectado, fecha_generacion, motivo, notificado)
VALUES (1, 65000.00, '2026-08-22 09:00:00', 'Saldo de Nequi por debajo del umbral configurado', TRUE);

-- [HU15.7 - RN15.7.1, RN15.7.3] Historial de una configuración, filtrado por rango de fechas
SELECT id_alerta_generada, valor_detectado, fecha_generacion, motivo
FROM alertas_historial
WHERE id_alerta_config = 1 AND fecha_generacion >= '2025-06-01 00:00:00' AND fecha_generacion <= '2025-06-30 23:59:59'
ORDER BY fecha_generacion DESC;

-- [HU15.8 - RN15.8.1, RN15.8.2] Detalle de una alerta puntual
SELECT valor_detectado, fecha_generacion, motivo
FROM alertas_historial
WHERE id_alerta_generada = 5;

-- ============================================================
-- CONSULTAS DE APOYO - ALERTAS_HISTORIAL
-- ============================================================

-- Últimas alertas generadas en el sistema
SELECT id_alerta_config, valor_detectado, fecha_generacion
FROM alertas_historial
ORDER BY fecha_generacion DESC
LIMIT 5;

-- Configuraciones que han generado más de una alerta
SELECT id_alerta_config, COUNT(id_alerta_generada) AS total_alertas
FROM alertas_historial
GROUP BY id_alerta_config
HAVING COUNT(id_alerta_generada) > 1;

-- Valor máximo detectado por configuración de alerta
SELECT id_alerta_config, MAX(valor_detectado) AS valor_maximo
FROM alertas_historial
GROUP BY id_alerta_config;

-- Configuraciones de alerta y su cantidad de alertas generadas, incluyendo las que nunca dispararon
SELECT alertas_configuracion.tipo_alerta, COUNT(alertas_historial.id_alerta_generada) AS total_alertas
FROM alertas_configuracion
LEFT JOIN alertas_historial ON alertas_configuracion.id_alerta_config = alertas_historial.id_alerta_config
GROUP BY alertas_configuracion.tipo_alerta
ORDER BY total_alertas ASC;
