# Conflictos de documentación

Registro de los puntos en los que los documentos del proyecto, la base de datos o el prototipo dicen cosas distintas. Aquí no se corrigen los documentos originales ni se toma una decisión: cada archivo describe el choque, lo que hace hoy la aplicación y una recomendación, y queda abierto hasta que el equipo decida.

No se registra aquí el trabajo pendiente, es decir, lo que la documentación pide con claridad y la aplicación simplemente aún no hace.

| # | Conflicto | Reglas involucradas | Módulo | Estado |
|---|---|---|---|---|
| [01](01-fecha-inicio-pasivo.md) | Fecha de inicio de un pasivo ya amortizado | RN08.1.7, RN08.1.11 | Pasivos | Abierto |
| [02](02-fecha-al-editar-pasivo.md) | Editar un pasivo antiguo obliga a cambiar su fecha | RN08.3.7, RN08.3.3 | Pasivos | Abierto |
| [03](03-registro-verificacion-codigo.md) | Registro con verificación de código | HU02.1, RN02.1.4 | Autenticación | Abierto |
| [04](04-movimientos-automaticos-fondo.md) | Movimientos de saldo inicial y de ajuste frente a la BD | RN04.1.4, RN04.3.4, `ck_monto_movimiento` | Fondos, Movimientos | Abierto |
| [05](05-saldo-fondo-calculado.md) | Saldo del fondo calculado o almacenado | RN04.2.1, RN05.0.1, `fondos.saldo_actual` | Fondos, Pagos | Abierto |
| [06](06-texto-requisitos-contrasena.md) | Texto de requisitos de la contraseña | RN01.3.5, RN02.1.2 | Autenticación | Abierto |
| [07](07-plantilla-vencida.md) | Plantilla vencida o inactiva | RN06.0.6 | Plantillas | Abierto |
| [08](08-tipo-al-editar.md) | Cambiar el tipo al editar un movimiento o una plantilla | RN05.3.2, RN06.2.7 | Movimientos, Plantillas | Abierto |
| [09](09-descripcion-plantilla.md) | Descripción de plantillas sin campo en el prototipo | RN06.1.7, `plantillas.descripcion` | Plantillas | Abierto |
| [10](10-cuotas-para-metas.md) | Cuotas para metas | CU10.2, HU10.1, HU10.3, `cuotas.id_pasivo` | Cuotas, Metas | Abierto |
| [11](11-descripcion-meta.md) | Descripción de una meta | IEEE, HU09.1, tabla `metas` | Metas | Abierto |
| [12](12-decimales-en-pesos.md) | Pesos con o sin decimales | IEEE 3.13.2, RN04.1.3, `DECIMAL(12,2)` | Todos | Abierto |
| [13](13-fondo-del-aporte.md) | Fondo de un aporte | RN09.3.7, `aportes.id_fondo` | Pagos, Metas | Abierto |
| [14](14-numeracion-rn11-1-2.md) | Código RN11.1.2 repetido | RN11.1.2 | Pagos | Abierto |
| [15](15-ahorro-mensual-meta.md) | Cálculo del ahorro mensual de una meta | RN09.1.5, RN09.1.6, RN09.3.6 | Metas | Decidido (opción 1) |
| [16](16-editar-fondo-meta.md) | Cambiar el fondo al editar una meta | RN09.3.7, HU09.3 | Metas | Abierto |
| [17](17-categoria-meta.md) | Categoría de una meta | RN03.1.1, RN03.2.2, `categorias.aplica_a` | Metas | Abierto |
| [18](18-ahorrado-al-desactivar-meta.md) | Dónde queda lo ahorrado al desactivar una meta | RN05.0.1, RN09.4.6 | Metas, Pagos | Abierto |
| [19](19-ajuste-fondo-inactivo.md) | Ajuste de saldo en un fondo inactivo | RN04.3.4, RN04.4.4 | Fondos | Abierto |
| [20](20-fecha-al-editar-meta.md) | Editar una meta vencida obliga a cambiar su fecha | RN09.3.5, RN09.3.2 | Metas | Abierto |
