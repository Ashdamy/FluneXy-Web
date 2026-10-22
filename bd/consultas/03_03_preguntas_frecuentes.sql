-- ============================================================
-- TABLA: PREGUNTAS_FRECUENTES
-- ============================================================

-- [HU17.4 - RN17.4.3] Preguntas frecuentes disponibles y vigentes para sugerir
SELECT id_pregunta, pregunta
FROM preguntas_frecuentes
WHERE estado = TRUE;

-- [HU17.3 - RN17.3.4] Consulta el contenido de ayuda de una funcionalidad específica
SELECT pregunta, respuesta
FROM preguntas_frecuentes
WHERE id_pregunta = 7 AND estado = TRUE;

-- [HU17.1, HU17.2] Sin operación propia: la consulta que el usuario le hace al
-- asistente y la respuesta generada no tienen tabla que las almacene (RN17.1.4
-- la deja como opcional); no se genera SQL para registrar la conversación.

-- ============================================================
-- CONSULTAS DE APOYO - PREGUNTAS_FRECUENTES
-- ============================================================

-- Cantidad de preguntas por estado
SELECT estado, COUNT(id_pregunta) AS total_preguntas
FROM preguntas_frecuentes
GROUP BY estado;

-- Primeras preguntas sugeridas al abrir el asistente
SELECT id_pregunta, pregunta
FROM preguntas_frecuentes
WHERE estado = TRUE
ORDER BY id_pregunta ASC
LIMIT 4;
