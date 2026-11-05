# 06. Texto de requisitos de la contraseña

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD01, HU01.3: RN01.3.5.
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD02, HU02.1 y HU02.3: RN02.1.2, RN02.3.1 y RN02.3.2.
- `frontend/pages/autenticacion/nueva-contraseña.html`: texto de `requisito-contrasena`.

## Qué dice cada una
- **Documentación:** al menos 8 caracteres, con mayúscula, minúscula, número y carácter especial.
- **Prototipo:** muestra "Mínimo 8 caracteres, una mayúscula y un número", sin minúscula ni carácter especial.

## Qué hace hoy la aplicación
Nueva Contraseña muestra el texto del prototipo y valida solo lo que ese texto dice. Registro no valida los requisitos. La validación es pendiente de corregir.

## Opciones
1. **Validar la regla completa y actualizar el texto visible.** La pantalla dice lo mismo que se valida.
2. **Validar la regla completa y dejar el texto del prototipo.** El usuario vería rechazada una contraseña que cumple lo que la pantalla le pide.

**Recomendación (no es una decisión):** opción 1.

## Estado
Abierto hasta que el equipo decida.
