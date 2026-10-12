-- ============================================================
-- TABLA: REPORTES_GENERADOS
-- ============================================================

-- [HU16.1, HU16.2, HU16.3 - RN16.1.1, RN16.1.3, RN16.2.4, RN16.3.3] Registra la generación del
-- reporte (tipo y período se seleccionan en la misma pantalla, por eso es un único INSERT)
INSERT INTO reportes_generados (id_usuario, tipo_reporte, periodo, formato, fecha_generacion)
VALUES (1, 'BALANCE', '2026-Q3', 'PDF', '2026-08-22 10:00:00');

-- [HU16.4, HU16.5] Sin consulta propia: exportar a PDF o Excel es una operación del backend
-- sobre el reporte ya generado; no hay columna que almacene el archivo resultante.

-- [HU16.6 - RN16.6.1, RN16.6.2] Consulta la fecha de generación de un reporte
SELECT fecha_generacion
FROM reportes_generados
WHERE id_reporte = 1;

-- [HU16.7] Sin consulta propia: la vista previa reutiliza la misma información que ya se
-- consultó para generar el reporte (activos, pasivos, movimientos, etc.), no agrega datos nuevos.

-- ============================================================
-- CONSULTAS DE APOYO - REPORTES_GENERADOS
-- ============================================================

-- Reportes de un usuario, más reciente primero
SELECT id_reporte, tipo_reporte, periodo, fecha_generacion
FROM reportes_generados
WHERE id_usuario = 1
ORDER BY fecha_generacion DESC;

-- Cantidad de reportes generados por tipo
SELECT tipo_reporte, COUNT(id_reporte) AS total_reportes
FROM reportes_generados
GROUP BY tipo_reporte;

-- Último reporte generado por cada usuario
SELECT id_usuario, MAX(fecha_generacion) AS ultimo_reporte
FROM reportes_generados
GROUP BY id_usuario;

-- Usuarios y su cantidad de reportes generados, incluyendo quienes no han generado ninguno
SELECT usuarios.nombre, usuarios.apellido, COUNT(reportes_generados.id_reporte) AS total_reportes
FROM usuarios
LEFT JOIN reportes_generados ON usuarios.id_usuario = reportes_generados.id_usuario
GROUP BY usuarios.id_usuario, usuarios.nombre, usuarios.apellido
ORDER BY total_reportes DESC;
