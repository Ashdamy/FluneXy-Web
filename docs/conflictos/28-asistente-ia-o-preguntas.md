# 28. Asistente con inteligencia artificial o con preguntas registradas

## Qué choca
- `FluneXy_ IEEE .docx`: objetivo OE08 y alcance ("Asistente Inteligente basado en inteligencia artificial").
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD17: RN17.3.4 y RN17.4.1.
- `bd/01_create_tables.sql`: tabla `preguntas_frecuentes`. No hay tabla para guardar las consultas (RN17.1.4).
- `frontend/pages/asistente/asistente.html`.

## Qué dice cada una
- **IEEE:** un asistente basado en IA que responde consultas, explica funcionalidades e incluso analiza la información financiera.
- **RN17.3.4 y RN17.4.1:** la ayuda y las sugerencias salen solo de lo registrado en la BD (preguntas frecuentes).
- **Prototipo:** tres sugerencias. Dos no están en la BD con ese texto ("¿Qué es el flujo de caja?" y "¿Cómo creo una meta?").

## Qué hace hoy la aplicación
- Sugiere las tres primeras preguntas frecuentes vigentes de la BD.
- Responde con la pregunta frecuente que más palabras comparte con la consulta.
- Si ninguna coincide, avisa que no tiene respuesta (RN17.2.2).
- No usa IA y no guarda las consultas.

## Opciones
1. **Solo preguntas frecuentes,** como hoy y como RN17.3.4.
2. **IA en el backend** (por ejemplo, un modelo de lenguaje) que use las preguntas frecuentes como base y responda lo que no está registrado.
3. **Las dos:** primero la respuesta registrada y, si no hay, la IA.

**Recomendación (no es una decisión):** opción 3 cuando exista el backend; mientras tanto, la 1.

## Estado
Abierto hasta que el equipo decida.
