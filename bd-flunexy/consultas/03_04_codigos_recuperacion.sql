-- ============================================================
-- TABLA: CODIGOS_RECUPERACION
-- ============================================================

-- [HU01.3 - RN01.3.1] Valida que el correo esté registrado (reutiliza usuarios)
SELECT id_usuario
FROM usuarios
WHERE correo = 'anamilena@ejemplo.com';

-- [HU01.3 - RN01.3.2] Genera el código de verificación para el usuario
INSERT INTO codigos_recuperacion (id_usuario, codigo, fecha_expiracion, utilizado)
VALUES (1, 'X7K2QW', '2026-08-22 21:00:00', FALSE);

-- [HU01.3 - RN01.3.4, RN01.3.8] Valida que el código sea correcto, esté vigente y no usado
SELECT id_codigo
FROM codigos_recuperacion
WHERE id_usuario = 3 AND codigo = 'ZX9Y8W' AND fecha_expiracion > '2025-05-01 00:00:00' AND utilizado = FALSE;

-- [HU01.3 - RN01.3.8] Marca el código como utilizado tras el cambio de contraseña
UPDATE codigos_recuperacion
SET utilizado = TRUE
WHERE id_codigo = 3;

-- [HU01.6 - RN01.6.2] Invalida los códigos vigentes antes de generar uno nuevo
UPDATE codigos_recuperacion
SET utilizado = TRUE
WHERE id_usuario = 7 AND utilizado = FALSE;

-- [HU01.6] Genera el nuevo código de verificación
INSERT INTO codigos_recuperacion (id_usuario, codigo, fecha_expiracion, utilizado)
VALUES (7, 'M9P4LK', '2026-08-22 22:00:00', FALSE);

-- ============================================================
-- CONSULTAS DE APOYO - CODIGOS_RECUPERACION
-- ============================================================

-- Códigos utilizados frente a pendientes
SELECT utilizado, COUNT(id_codigo) AS total_codigos
FROM codigos_recuperacion
GROUP BY utilizado;

-- Usuarios que han solicitado más de un código
SELECT id_usuario, COUNT(id_codigo) AS total_codigos
FROM codigos_recuperacion
GROUP BY id_usuario
HAVING COUNT(id_codigo) > 1;

-- Historial de códigos por usuario
SELECT usuarios.nombre_completo, codigos_recuperacion.codigo, codigos_recuperacion.utilizado
FROM codigos_recuperacion
INNER JOIN usuarios ON codigos_recuperacion.id_usuario = usuarios.id_usuario
ORDER BY usuarios.nombre_completo ASC;
