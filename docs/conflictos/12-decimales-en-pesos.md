# 12. Pesos con o sin decimales

## Qué choca
- `FluneXy_ IEEE .docx`, 3.13.2 Fiabilidad, "Precisión de los cálculos".
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD04, HU04.1: RN04.1.3.
- `bd/01_create_tables.sql`: montos en `DECIMAL(12,2)`, y datos de ejemplo con centavos en `bd/02_insert_data.sql`.

## Qué dice cada una
- **IEEE:** los valores monetarios se representan en COP sin decimales.
- **RN04.1.3 y BD:** los montos pueden guardarse con hasta dos decimales. Las cuotas de amortización los necesitan para que su suma cuadre.

## Qué hace hoy la aplicación
Guarda centavos y muestra pesos enteros en todas las pantallas.
- Los campos de monto aceptan centavos si se escriben ("150.000,50").
- En Registrar Pago, el monto sugerido se muestra entero y, si no se cambia, se paga el valor exacto de la cuota.
- En los módulos migrados después:
  - Balance, Flujo de Caja, Inicio y Reportes calculan con centavos y muestran enteros;
  - el ahorro mensual de una meta se redondea hacia arriba al peso (decisión del [conflicto 15](15-ahorro-mensual-meta.md));
  - el umbral de una alerta acepta decimales ("1,2" veces).

*Revisado el 2026-11-13, con todos los módulos migrados.*

## Opciones
1. **Guardar con centavos y mostrar enteros,** como hoy. "Representar" se entiende como mostrar.
2. **Redondear todo a pesos enteros** también al guardar. Es más simple, pero cambia las columnas y deja un descuadre que debe absorber la última cuota.

**Recomendación (no es una decisión):** opción 1.

## Estado
Abierto hasta que el equipo decida.
