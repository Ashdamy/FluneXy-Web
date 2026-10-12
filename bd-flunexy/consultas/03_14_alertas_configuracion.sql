-- ============================================================
-- TABLA: ALERTAS_CONFIGURACION
-- ============================================================

-- [HU15.1, HU15.2, HU15.3 - RN15.1.1, RN15.2.1, RN15.3.1] Registra la configuración de alerta
-- (tipo y umbral se capturan en la misma pantalla, por eso es un único INSERT)
INSERT INTO alertas_configuracion (id_usuario, tipo_alerta, umbral, estado)
VALUES (3, 'Saldo bajo en fondo', 80000.00, TRUE);

-- [HU15.4 - RN15.4.1, RN15.4.3] Valida que la configuración exista y esté inactiva
SELECT id_alerta_config, estado
FROM alertas_configuracion
WHERE id_alerta_config = 6 AND id_usuario = 6 AND estado = FALSE;

-- [HU15.4 - RN15.4.2] Activa la alerta
UPDATE alertas_configuracion
SET estado = TRUE
WHERE id_alerta_config = 6 AND id_usuario = 6 AND estado = FALSE;

-- [HU15.5 - RN15.5.3] Valida que la configuración exista y esté activa
SELECT id_alerta_config, estado
FROM alertas_configuracion
WHERE id_alerta_config = 3 AND id_usuario = 2 AND estado = TRUE;

-- [HU15.5 - RN15.5.1] Desactiva la alerta
UPDATE alertas_configuracion
SET estado = FALSE
WHERE id_alerta_config = 3 AND id_usuario = 2 AND estado = TRUE;

-- ============================================================
-- CONSULTAS DE APOYO - ALERTAS_CONFIGURACION
-- ============================================================

-- Alertas activas de un usuario
SELECT id_alerta_config, tipo_alerta, umbral
FROM alertas_configuracion
WHERE id_usuario = 1 AND estado = TRUE;

-- Cantidad de configuraciones por tipo de alerta
SELECT tipo_alerta, COUNT(id_alerta_config) AS total_configuraciones
FROM alertas_configuracion
GROUP BY tipo_alerta;

-- Umbral promedio por tipo de alerta
SELECT tipo_alerta, AVG(umbral) AS umbral_promedio
FROM alertas_configuracion
GROUP BY tipo_alerta;

-- Usuarios y su cantidad de alertas configuradas, incluyendo quienes no tienen ninguna
SELECT usuarios.nombre, usuarios.apellido, COUNT(alertas_configuracion.id_alerta_config) AS total_alertas
FROM usuarios
LEFT JOIN alertas_configuracion ON usuarios.id_usuario = alertas_configuracion.id_usuario
GROUP BY usuarios.id_usuario, usuarios.nombre, usuarios.apellido
ORDER BY total_alertas DESC;
