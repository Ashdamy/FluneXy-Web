# 14. Código RN11.1.2 repetido

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD11, HU11.1: RN11.1.2.
- El mismo documento, MOD11, HU11.3: otra regla con el código RN11.1.2.

## Qué dice cada una
- **En HU11.1:** el pago debe asociarse a una cuota existente y vigente.
- **En HU11.3:** el pago anticipado solo paga la cuota del siguiente mes.

Dos reglas distintas comparten código, y por la secuencia de HU11.3 la segunda debería ser RN11.3.2. Además, "cuota del siguiente mes" no define si es la del mes calendario siguiente o la próxima pendiente.

## Qué hace hoy la aplicación
Cumple las dos. Interpreta la segunda como la próxima cuota pendiente, la única que se puede pagar. Esa interpretación está en `docs/decisiones-implementacion.md`.

## Opciones
1. **Tratar la segunda como RN11.3.2** y leerla como "la próxima cuota pendiente".
2. **Leerla como el mes calendario siguiente.** Impediría pagar por anticipado una cuota que vence este mes.

**Recomendación (no es una decisión):** opción 1.

## Estado
Abierto hasta que el equipo decida.
