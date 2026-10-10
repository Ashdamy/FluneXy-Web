-- ============================================================
-- TABLA: USUARIOS
-- ============================================================

-- [HU02.1 - Registrarse]
-- Crea la cuenta del nuevo usuario
INSERT INTO usuarios (nombre_completo, correo, contrasena, fecha_registro)
VALUES ('Nombre Ejemplo', 'correo.nuevo@ejemplo.com', '$2b$12$hashdeejemplo', '2026-08-22');

-- [HU02.2 - Validar que el correo sea único]
-- Reutilizada por HU02.1 y HU02.5. Si devuelve una fila, el correo ya está en uso
SELECT id_usuario
FROM usuarios
WHERE correo = 'anamilena@ejemplo.com';

-- [HU02.3 - Validar requisitos de seguridad de la contraseña]
-- No aplica: longitud/mayúscula/número/carácter especial se valida en la
-- aplicación; no existe tabla que almacene estas reglas. No se gener

-- [HU02.4 - Consultar los datos]
-- Trae el perfil del usuario autenticado
SELECT id_usuario, nombre_completo, correo, estado, fecha_registro
FROM usuarios
WHERE id_usuario = 1;

-- [HU02.5 - Actualizar los datos]
-- Validación de HU02.2 adaptada (RN02.5.2): excluye al propio usuario para no
-- rechazar el correo si el usuario no lo cambió
SELECT id_usuario
FROM usuarios
WHERE correo = 'nuevo.correo@ejemplo.com'
  AND id_usuario <> 3;

-- [HU02.5 - Actualizar los datos]
-- Guarda los cambios del perfil
UPDATE usuarios
SET nombre_completo = 'Laura Valentina Gómez R.', correo = 'laura.gomezr@ejemplo.com'
WHERE id_usuario = 3;

-- [HU02.6 - Cambiar la contraseña]
-- Trae la contraseña actual para que la aplicación la compare (RN02.6.1)
SELECT contrasena
FROM usuarios
WHERE id_usuario = 1;

-- [HU02.6 - Cambiar la contraseña]
-- Guarda la nueva contraseña
UPDATE usuarios
SET contrasena = '$2b$12$hashnuevodeejemplo'
WHERE id_usuario = 1;

-- [HU02.7 - Desactivar la cuenta]
-- Verifica que la cuenta esté activa y trae la contraseña para validarla
SELECT estado, contrasena
FROM usuarios
WHERE id_usuario = 7;

-- [HU02.7 - Desactivar la cuenta]
-- Marca la cuenta como inactiva (RN02.7.3: solo cambia el estado)
UPDATE usuarios
SET estado = FALSE
WHERE id_usuario = 7;

-- ============================================================
-- CONSULTAS DE APOYO - USUARIOS
-- ============================================================

-- Usuarios activos
SELECT id_usuario, nombre_completo, correo, fecha_registro
FROM usuarios
WHERE estado = TRUE
ORDER BY nombre_completo ASC;

-- Últimos usuarios registrados
SELECT id_usuario, nombre_completo, fecha_registro
FROM usuarios
ORDER BY fecha_registro DESC
LIMIT 5;

-- Cantidad de usuarios por estado
SELECT estado, COUNT(id_usuario) AS total_usuarios
FROM usuarios
GROUP BY estado;

-- Usuarios y cantidad de fondos que tienen, incluyendo quienes no tienen ninguno
SELECT usuarios.nombre_completo, COUNT(fondos.id_fondo) AS total_fondos
FROM usuarios
LEFT JOIN fondos ON usuarios.id_usuario = fondos.id_usuario
GROUP BY usuarios.nombre_completo
ORDER BY total_fondos DESC;
