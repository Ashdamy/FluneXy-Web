# 01. Fecha de inicio de un pasivo ya amortizado

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD08, HU08.1: RN08.1.7 y RN08.1.11.
- `bd/02_insert_data.sql`, datos de `pasivos`: fechas de inicio de 2025.

## Qué dice cada una
- **RN08.1.7:** la fecha de inicio solo puede ser la de hoy o una futura.
- **RN08.1.11:** se puede registrar una deuda con saldo menor al valor inicial, porque ya estaba parcialmente pagada.
- **Datos de la BD:** los pasivos de ejemplo tienen fechas pasadas.

Una deuda que ya se viene pagando empezó antes de hoy, así que no se puede registrar con su fecha real si se cumple RN08.1.7.

## Qué hace hoy la aplicación
Registrar Pasivo acepta cualquier fecha, también pasadas. Se mantiene así porque rechazarlas impediría registrar deudas antiguas con su fecha real, y la tabla de amortización saldría con vencimientos equivocados.

## Opciones
1. **Permitir fechas pasadas** al registrar. Cumple RN08.1.11 y conserva la fecha real, pero se aparta de RN08.1.7.
2. **Solo hoy o futuro**, como dice RN08.1.7. Una deuda antigua tendría que registrarse con una fecha falsa o quedaría fuera.
3. **Permitir fechas pasadas solo si el saldo es menor al valor inicial.** Respeta las dos reglas en su caso principal, pero no cubre una deuda antigua sin abonos.

**Recomendación (no es una decisión):** opción 1.

## Estado
Abierto hasta que el equipo decida.
