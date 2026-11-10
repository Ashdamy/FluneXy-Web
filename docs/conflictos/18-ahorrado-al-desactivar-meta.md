# 18. Dónde queda lo ahorrado al desactivar una meta

## Qué choca
- `frontend/pages/metas/desactivar-metas.html`: nota del modal.
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD05: RN05.0.1. MOD09, HU09.4: RN09.4.6.
- `bd/consultas/03_10_aportes.sql`: "[HU11.2 - RN05.0.1] El aporte sale del fondo de origen".
- `frontend/pages/pagos/registrar-aporte.html`: "Al confirmar, se descontará de Nequi y se sumará al progreso de tu meta".

## Qué dice cada una
- **Modal de desactivar:** "Los $6.000.000 ya ahorrados permanecen en el fondo Bancolombia. Solo se desactiva el seguimiento de la meta".
- **RN05.0.1, la consulta de la BD y Registrar Aporte:** un aporte es una salida de dinero que **se descuenta** del fondo. Así, lo ahorrado ya no está en el saldo del fondo.
- **RN09.4.6:** al desactivar, la meta conserva su monto ahorrado. Ninguna regla dice que ese dinero vuelva al fondo.

El prototipo además no coincide consigo mismo: el modal nombra Bancolombia y el detalle de la misma meta (Moto Nueva) dice "Nequi Personal".

## Qué hace hoy la aplicación
Registrar Aporte descuenta el monto del fondo elegido y lo suma a `montoAhorrado` (`datos/pagos.js`, `registrarAporte`). Desactivar una meta aún no está migrado.

## Opciones
1. **Seguir descontando del fondo (RN05.0.1)** y que la nota del modal diga que lo ahorrado queda registrado en la meta, sin mencionar el fondo como lugar donde "permanece".
2. **Dejar de descontar los aportes del fondo,** para que el texto del modal sea cierto. Contradice RN05.0.1, la consulta de la BD y Registrar Aporte.
3. **Devolver lo ahorrado al fondo al desactivar.** Ninguna regla lo pide y cambiaría el saldo del fondo al desactivar.

**Recomendación (no es una decisión):** opción 1, nombrando el fondo asociado de la meta si se conserva la mención.

## Estado
Abierto hasta que el equipo decida.
