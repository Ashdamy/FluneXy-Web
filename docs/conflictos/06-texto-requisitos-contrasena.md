# 06. Texto de requisitos de la contraseña

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD01, HU01.3: RN01.3.5.
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD02, HU02.1 y HU02.3: RN02.1.2, RN02.3.1 y RN02.3.2.
- `frontend/pages/autenticacion/nueva-contraseña.html`: texto de `requisito-contrasena`.

## Qué dice cada una
- **Documentación:** al menos 8 caracteres, con mayúscula, minúscula, número y carácter especial.
- **Prototipo:** muestra "Mínimo 8 caracteres, una mayúscula y un número", sin minúscula ni carácter especial.

## Qué hace hoy la aplicación
Las tres pantallas que piden una contraseña nueva validan la regla completa (8 caracteres, mayúscula, minúscula, número y carácter especial) con el aviso nativo del navegador:
- **Registro:** no muestra el texto de requisitos, solo la barra de fortaleza fija del prototipo.
- **Nueva Contraseña** (recuperación): muestra el texto del prototipo, "Mínimo 8 caracteres, una mayúscula y un número."
- **Cambiar Contraseña** (Usuario): muestra el mismo texto incompleto.

En las dos últimas la pantalla pide menos de lo que se valida.

**Relación con lo ya decidido:** el [conflicto 03](03-registro-verificacion-codigo.md) (decidido) cambia el texto de ayuda del correo en Registro; si se elige aquí la opción 1, se pueden corregir los textos de las tres pantallas en el mismo cambio.

*Revisado el 2026-11-13, con todos los módulos migrados.*

## Opciones
1. **Validar la regla completa y actualizar el texto visible.** La pantalla dice lo mismo que se valida.
2. **Validar la regla completa y dejar el texto del prototipo.** El usuario vería rechazada una contraseña que cumple lo que la pantalla le pide.

**Recomendación (no es una decisión):** opción 1.

## Estado
Abierto hasta que el equipo decida.
