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
Decidido por Santiago el 2026-11-13: opción 1. Falta aplicarlo en la aplicación.

## Solución decidida
- **El código de verificación es solo para recuperar la contraseña** (HU01.3: Recuperar contraseña → código → Nueva contraseña).
- **Al crear la cuenta no se envía ningún código.** La BD revisa si el correo ya está registrado (RN02.1.1):
  - si **no** está registrado, se crea la cuenta y la persona va a Iniciar sesión (HU02.1, RN02.1.4);
  - si **ya** está registrado, no se crea la cuenta y se informa el motivo, por ejemplo "Ya existe una cuenta con este correo" (RN02.1.5).

## Cambios por aplicar
1. `paginas/autenticacion/Registro.jsx`: "Crear cuenta gratis" deja de ir a `/autenticacion/verificacion-contrasena` y lleva a `/autenticacion/iniciar-sesion`.
2. Mismo archivo: con el correo ya registrado, el formulario no sigue y muestra el aviso. Mientras no exista el backend se compara con el usuario de prueba de `datos/usuario.js`; la revisión real contra la BD la hará la API.
3. Mismo archivo: cambiar el texto de ayuda del correo, "Usaremos este correo para verificar tu cuenta.", porque ya no habrá verificación al registrarse. El texto nuevo está por definir.
4. El mensaje de confirmación del registro (HU02.1) no tiene diseño en el prototipo. Mientras tanto se va a Iniciar sesión sin mensaje (pendiente de diseño).
5. Agregar a la regresión (`scripts/regresion/casos/01-autenticacion.mjs`) los casos de correo nuevo y de correo repetido.
