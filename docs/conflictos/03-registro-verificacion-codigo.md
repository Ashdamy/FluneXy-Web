# 03. Registro con verificación de código

## Qué choca
- `Documentacion_Casos_de_Uso_Financiero_SENA .docx`, MOD02, HU02.1: flujo principal y RN02.1.4.
- `frontend/pages/autenticacion/registro.html`: el botón lleva a `verificacion-contraseña.html`, y el texto de ayuda habla de verificar la cuenta.

## Qué dice cada una
- **HU02.1:** al crear la cuenta, el sistema confirma el registro con un mensaje y permite ir a iniciar sesión. No hay código de verificación.
- **Prototipo:** después de crear la cuenta se pasa a la pantalla donde se ingresa un código enviado al correo.

La verificación por código solo aparece documentada para recuperar la contraseña (HU01.3).

## Qué hace hoy la aplicación
Sigue el prototipo: Crear cuenta lleva a la pantalla de verificación, y de ahí a Nueva contraseña. No se cambió porque es un flujo que el equipo debe definir.

## Opciones
1. **Seguir HU02.1:** mensaje de confirmación e ir a iniciar sesión. Requiere definir cómo se ve ese mensaje.
2. **Conservar la verificación del prototipo** y agregarla a la documentación. Comprueba que el correo existe, pero exige envío de correos y definir el paso siguiente, porque hoy termina en Nueva contraseña.

**Recomendación (no es una decisión):** opción 1, porque es lo que está documentado y no depende de enviar correos.

## Estado
Abierto hasta que el equipo decida.
