-- USUARIOS
INSERT INTO usuarios (id_usuario, nombre, apellido, correo, contrasena, estado, fecha_registro) VALUES
(1, 'Ana Milena', 'Sierra', 'anamilena@ejemplo.com', '$2b$12$hashusuario01xxxxxxxxx', TRUE, '2025-01-12'),
(2, 'Carlos Andrés', 'Pérez', 'carlos.perez@ejemplo.com', '$2b$12$hashusuario02xxxxxxxxx', TRUE, '2025-01-20'),
(3, 'Laura Valentina', 'Gómez', 'laura.gomez@ejemplo.com', '$2b$12$hashusuario03xxxxxxxxx', TRUE, '2025-02-03'),
(4, 'Juan Pablo', 'Rodríguez', 'juan.rodriguez@ejemplo.com', '$2b$12$hashusuario04xxxxxxxxx', TRUE, '2025-02-15'),
(5, 'Mariana', 'Torres', 'mariana.torres@ejemplo.com', '$2b$12$hashusuario05xxxxxxxxx', FALSE, '2025-03-01'),
(6, 'Santiago', 'Ramírez', 'santiago.ramirez@ejemplo.com', '$2b$12$hashusuario06xxxxxxxxx', TRUE, '2025-03-10'),
(7, 'Camila', 'Herrera', 'camila.herrera@ejemplo.com', '$2b$12$hashusuario07xxxxxxxxx', TRUE, '2025-03-22'),
(8, 'Andrés Felipe', 'Castro', 'andres.castro@ejemplo.com', '$2b$12$hashusuario08xxxxxxxxx', TRUE, '2025-04-05'),
(9, 'Daniela', 'Ospina', 'daniela.ospina@ejemplo.com', '$2b$12$hashusuario09xxxxxxxxx', FALSE, '2025-04-18'),
(10, 'Felipe', 'Morales', 'felipe.morales@ejemplo.com', '$2b$12$hashusuario10xxxxxxxxx', TRUE, '2025-05-02');

-- CATEGORIAS
INSERT INTO categorias (id_categoria, nombre, es_ingreso, aplica_a, estado) VALUES
-- MOVIMIENTOS - INGRESOS
(1, 'Salario', TRUE, 'MOVIMIENTO', TRUE),
(2, 'Inversión', TRUE, 'MOVIMIENTO', TRUE),
(3, 'Ventas', TRUE, 'MOVIMIENTO', TRUE),
(4, 'Bonificaciones', TRUE, 'MOVIMIENTO', TRUE),
(5, 'Otros ingresos', TRUE, 'MOVIMIENTO', TRUE),
-- MOVIMIENTOS - GASTOS
(6, 'Alimentación', FALSE, 'MOVIMIENTO', TRUE),
(7, 'Transporte', FALSE, 'MOVIMIENTO', TRUE),
(8, 'Entretenimiento', FALSE, 'MOVIMIENTO', TRUE),
(9, 'Servicios', FALSE, 'MOVIMIENTO', TRUE),
(10, 'Otros gastos', FALSE, 'MOVIMIENTO', TRUE),
-- ACTIVOS
(11, 'Vivienda', NULL, 'ACTIVO', TRUE),
(12, 'Vehículo', NULL, 'ACTIVO', TRUE),
(13, 'Inversión', NULL, 'ACTIVO', TRUE),
(14, 'Ahorro', NULL, 'ACTIVO', TRUE),
(15, 'Propiedad', NULL, 'ACTIVO', TRUE),
(16, 'Otros activos', NULL, 'ACTIVO', TRUE),
-- PASIVOS
(17, 'Tarjeta de Crédito', NULL, 'PASIVO', TRUE),
(18, 'Crédito de vehículo', NULL, 'PASIVO', TRUE),
(19, 'Préstamo personal', NULL, 'PASIVO', TRUE),
(20, 'Crédito educativo', NULL, 'PASIVO', TRUE),
(21, 'Crédito hipotecario', NULL, 'PASIVO', TRUE),
(22, 'Otros pasivos', NULL, 'PASIVO', TRUE),
-- FONDOS
(23, 'Banco', NULL, 'FONDO', TRUE),
(24, 'Billetera Digital', NULL, 'FONDO', TRUE),
(25, 'Efectivo', NULL, 'FONDO', TRUE),
(26, 'Otros fondos', NULL, 'FONDO', TRUE);

-- PREGUNTAS_FRECUENTES
INSERT INTO preguntas_frecuentes (id_pregunta, pregunta, respuesta, estado) VALUES
(1, '¿Cómo registro un nuevo movimiento?', 'Ingresa al módulo Movimientos, selecciona Nuevo Movimiento, elige el tipo, monto, fondo y categoría, y guarda.', TRUE),
(2, '¿Cómo creo una meta financiera?', 'En el módulo Metas selecciona Nueva Meta e ingresa nombre, monto objetivo, fecha objetivo y fondo asociado.', TRUE),
(3, '¿Cómo edito la información de un fondo?', 'Entra al detalle del fondo y selecciona Editar Fondo para actualizar su información.', TRUE),
(4, '¿Qué pasa si desactivo un activo?', 'El activo deja de contar en el Valor Total de Activos, pero su historial se conserva.', TRUE),
(5, '¿Cómo se calcula el balance financiero?', 'Se calcula como la diferencia entre el total de activos y el total de pasivos vigentes.', TRUE),
(6, '¿Puedo recuperar mi contraseña si la olvido?', 'Sí, desde la pantalla de inicio de sesión puedes solicitar un código de recuperación a tu correo.', TRUE),
(7, '¿Cómo registro un pago sobre una cuota?', 'Desde el detalle de la cuota selecciona Registrar Pago e indica el fondo desde el cual pagas.', TRUE),
(8, '¿Qué diferencia hay entre un pago y un aporte?', 'Un pago se aplica a una cuota de un pasivo; un aporte se aplica al progreso de una meta financiera.', TRUE),
(9, '¿Cómo configuro una alerta financiera?', 'En el módulo Alertas define el tipo de alerta y el umbral que quieres monitorear.', TRUE),
(10, '¿Puedo exportar un reporte en Excel?', 'Sí, desde el módulo Reportes puedes generar el reporte y exportarlo en PDF o Excel.', TRUE);

-- CODIGOS_RECUPERACION
INSERT INTO codigos_recuperacion (id_codigo, id_usuario, codigo, fecha_expiracion, utilizado) VALUES
(1, 1, 'QW12ER', '2025-05-10 21:00:00', TRUE),
(2, 2, 'A1B2C3', '2025-05-15 18:30:00', TRUE),
(3, 3, 'ZX9Y8W', '2025-06-01 12:00:00', FALSE),
(4, 4, 'PL7QK2', '2025-06-05 09:00:00', TRUE),
(5, 5, 'M4N5B6', '2025-03-05 22:00:00', FALSE),
(6, 6, 'T8R9Y0', '2025-06-10 16:00:00', TRUE),
(7, 7, 'K1L2J3', '2025-06-12 11:00:00', FALSE),
(8, 8, 'H4G5F6', '2025-06-15 13:00:00', TRUE),
(9, 9, 'D7S8A9', '2025-04-20 20:00:00', FALSE),
(10, 10, 'Q2W3E4', '2025-06-18 17:00:00', FALSE);

-- FONDOS
INSERT INTO fondos (id_fondo, id_usuario, id_categoria, nombre, saldo_inicial, saldo_actual, fecha_creacion, estado) VALUES
(1, 1, 23, 'Bancolombia', 800000.00, 1016000.00, '2025-01-12', TRUE),
(2, 1, 24, 'Nequi', 500000.00, 380000.00, '2025-01-12', TRUE),
(3, 2, 23, 'Davivienda', 3000000.00, 3130154.48, '2025-01-05', TRUE),
(4, 2, 25, 'Efectivo', 200000.00, 150000.00, '2025-01-05', TRUE),
(5, 3, 23, 'Bancolombia', 2850000.00, 3100000.00, '2025-01-20', TRUE),
(6, 4, 24, 'Nequi', 750000.00, 620000.00, '2025-02-08', TRUE),
(7, 4, 25, 'Efectivo', 90000.00, 90000.00, '2025-02-08', TRUE),
(8, 5, 23, 'BBVA', 1750000.00, 1750000.00, '2025-01-18', FALSE),
(9, 6, 24, 'Daviplata', 400000.00, 275000.00, '2025-03-02', TRUE),
(10, 7, 23, 'Bancolombia', 3700000.00, 4300000.00, '2025-02-14', TRUE),
(11, 8, 25, 'Efectivo', 90000.00, 60000.00, '2025-03-25', TRUE),
(12, 10, 23, 'Nu', 480000.00, 980000.00, '2025-04-30', TRUE);

-- ACTIVOS
INSERT INTO activos (id_activo, id_usuario, id_categoria, nombre, valor, fecha_registro, fecha_actualizacion, estado) VALUES
(1, 1, 13, 'Portafolio de Inversiones', 18000000.00, '2025-01-12', '2025-06-03', TRUE),
(2, 1, 11, 'Apartamento Chapinero', 280000000.00, '2025-01-12', '2025-05-10', TRUE),
(3, 2, 12, 'Toyota Corolla 2022', 65000000.00, '2025-01-05', '2025-04-15', TRUE),
(4, 3, 14, 'CDT Bancolombia', 12000000.00, '2025-01-20', '2025-03-20', TRUE),
(5, 4, 15, 'Finca Rionegro', 150000000.00, '2025-02-08', '2025-02-28', TRUE),
(6, 5, 13, 'Portafolio Acciones', 8000000.00, '2025-01-15', '2025-01-15', FALSE),
(7, 6, 12, 'Moto Yamaha FZ', 9500000.00, '2025-03-02', '2025-05-22', TRUE),
(8, 7, 14, 'Ahorro Programado', 4500000.00, '2025-02-14', '2025-06-01', TRUE),
(9, 8, 15, 'Local Comercial', 95000000.00, '2025-03-25', '2025-04-10', TRUE),
(10, 10, 16, 'Colección de Relojes', 6000000.00, '2025-02-20', '2025-03-05', TRUE);

-- PASIVOS
INSERT INTO pasivos (id_pasivo, id_usuario, id_categoria, nombre, valor_inicial, saldo_actual, tasa_interes_mensual, plazo_meses, tipo_amortizacion, fecha_inicio, estado) VALUES
(1, 1, 21, 'Crédito Hipotecario Apto 402', 10000000.00, 10000000.00, 1.2, 36, 'FRANCESA', '2025-01-15', TRUE),
(2, 2, 17, 'Tarjeta Visa Gold', 3000000.00, 2096988.23, 2.5, 12, 'FRANCESA', '2025-01-01', TRUE),
(3, 3, 18, 'Crédito Vehículo Mazda', 45000000.00, 45000000.00, 1.5, 60, 'FRANCESA', '2025-01-01', TRUE),
(4, 4, 19, 'Préstamo Personal Banco Popular', 6000000.00, 6000000.00, 2.0, 12, 'ALEMANA', '2025-03-01', TRUE),
(5, 6, 20, 'Crédito Educativo Icetex', 8000000.00, 8000000.00, 1.0, 48, 'FRANCESA', '2025-06-01', TRUE),
(6, 7, 17, 'Tarjeta Mastercard', 2000000.00, 2000000.00, 2.8, 12, 'FRANCESA', '2025-02-10', TRUE),
(7, 8, 18, 'Crédito Vehículo Moto NKD', 10000000.00, 7632166.36, 1.8, 8, 'FRANCESA', '2025-01-05', TRUE),
(8, 1, 19, 'Préstamo Personal Viaje', 4000000.00, 0.00, 1.6, 6, 'AMERICANA', '2024-12-01', FALSE),
(9, 10, 17, 'Tarjeta de Crédito Nu', 1500000.00, 1500000.00, 3.0, 12, 'FRANCESA', '2025-04-01', TRUE),
(10, 9, 21, 'Crédito Hipotecario Segunda Vivienda', 20000000.00, 20000000.00, 1.4, 60, 'FRANCESA', '2025-04-20', FALSE);

-- CUOTAS
INSERT INTO cuotas (id_cuota, id_pasivo, numero_cuota, fecha_vencimiento, valor_cuota, abono_capital, interes, saldo_restante, pagada) VALUES
(1, 2, 1, '2025-02-01', 292461.38, 217461.38, 75000.00, 2782538.62, TRUE),
(2, 2, 2, '2025-03-01', 292461.38, 222897.91, 69563.47, 2559640.71, TRUE),
(3, 2, 3, '2025-04-01', 292461.38, 228470.36, 63991.02, 2331170.35, TRUE),
(4, 2, 4, '2025-05-01', 292461.38, 234182.12, 58279.26, 2096988.23, TRUE),
(5, 2, 5, '2025-06-01', 292461.38, 240036.67, 52424.71, 1856951.56, FALSE),
(6, 2, 6, '2025-07-01', 292461.38, 246037.59, 46423.79, 1610913.97, FALSE),
(7, 2, 7, '2025-08-01', 292461.38, 252188.53, 40272.85, 1358725.44, FALSE),
(8, 2, 8, '2025-09-01', 292461.38, 258493.24, 33968.14, 1100232.20, FALSE),
(9, 2, 9, '2025-10-01', 292461.38, 264955.57, 27505.81, 835276.63, FALSE),
(10, 2, 10, '2025-11-01', 292461.38, 271579.46, 20881.92, 563697.17, FALSE),
(11, 2, 11, '2025-12-01', 292461.38, 278368.95, 14092.43, 285328.22, FALSE),
(12, 2, 12, '2026-01-01', 292461.38, 285328.22, 7133.16, 0.00, FALSE),
(13, 7, 1, '2025-02-05', 1353356.61, 1173356.61, 180000.00, 8826643.39, TRUE),
(14, 7, 2, '2025-03-05', 1353356.61, 1194477.03, 158879.58, 7632166.36, TRUE),
(15, 7, 3, '2025-04-05', 1353356.61, 1215977.62, 137378.99, 6416188.74, FALSE),
(16, 7, 4, '2025-05-05', 1353356.61, 1237865.21, 115491.40, 5178323.53, FALSE),
(17, 7, 5, '2025-06-05', 1353356.61, 1260146.79, 93209.82, 3918176.74, FALSE),
(18, 7, 6, '2025-07-05', 1353356.61, 1282829.43, 70527.18, 2635347.31, FALSE),
(19, 7, 7, '2025-08-05', 1353356.61, 1305920.36, 47436.25, 1329426.95, FALSE),
(20, 7, 8, '2025-09-05', 1353356.61, 1329426.95, 23929.66, 0.00, FALSE),
(21, 8, 1, '2025-01-01', 64000.00, 0.00, 64000.00, 4000000.00, TRUE),
(22, 8, 2, '2025-02-01', 64000.00, 0.00, 64000.00, 4000000.00, TRUE),
(23, 8, 3, '2025-03-01', 64000.00, 0.00, 64000.00, 4000000.00, TRUE),
(24, 8, 4, '2025-04-01', 64000.00, 0.00, 64000.00, 4000000.00, TRUE),
(25, 8, 5, '2025-05-01', 64000.00, 0.00, 64000.00, 4000000.00, TRUE),
(26, 8, 6, '2025-06-01', 4064000.00, 4000000.00, 64000.00, 0.00, TRUE);

-- METAS
INSERT INTO metas (id_meta, id_usuario, id_fondo, nombre, monto_objetivo, monto_ahorrado, fecha_objetivo, estado) VALUES
(1, 1, 1, 'Fondo de Emergencia', 12000000.00, 800000.00, '2025-12-31', TRUE),
(2, 2, 3, 'Viaje a Cartagena', 4000000.00, 800000.00, '2025-11-30', TRUE),
(3, 3, 5, 'Compra Portátil', 3500000.00, 1000000.00, '2025-09-30', TRUE),
(4, 4, 6, 'Moto Nueva', 12000000.00, 1000000.00, '2025-12-31', TRUE),
(5, 6, 9, 'Curso de Inglés', 2000000.00, 600000.00, '2025-10-15', TRUE),
(6, 7, 10, 'Fondo Universidad Hijo', 20000000.00, 0.00, '2027-01-31', TRUE),
(7, 8, 11, 'Reserva Emergencia', 5000000.00, 0.00, '2025-12-31', TRUE),
(8, 10, 12, 'Nuevo Computador', 4500000.00, 0.00, '2025-11-01', TRUE),
(9, 1, 2, 'Fondo Navidad', 1500000.00, 0.00, '2025-12-15', TRUE),
(10, 2, 4, 'Vacaciones Familiares', 6000000.00, 0.00, '2026-06-30', FALSE);

-- PLANTILLAS
INSERT INTO plantillas (id_plantilla, id_usuario, id_fondo, id_categoria, es_ingreso, monto, recurrencia, dia_ejecucion, fecha_inicio, fecha_fin, ejecuciones_realizadas, proxima_fecha_ejecucion, descripcion, estado) VALUES
(1, 1, 1, 1, TRUE, 3200000.00, 'MENSUAL', 30, '2025-01-30', '2025-12-30', 5, '2025-07-30', 'Nómina mensual', TRUE),
(2, 1, 2, 9, FALSE, 45000.00, 'MENSUAL', 5, '2025-02-05', '2025-12-05', 4, '2025-07-05', 'Suscripción streaming', TRUE),
(3, 2, 3, 1, TRUE, 4100000.00, 'MENSUAL', 1, '2025-01-01', '2025-12-01', 6, '2025-07-01', 'Salario mensual', TRUE),
(4, 2, 4, 7, FALSE, 100000.00, 'QUINCENAL', 15, '2025-01-15', '2025-12-15', 10, '2025-06-30', 'Gasolina quincenal', TRUE),
(5, 3, 5, 9, FALSE, 60000.00, 'MENSUAL', 10, '2025-02-10', '2025-11-10', 4, '2025-07-10', NULL, TRUE),
(6, 4, 6, 9, FALSE, 220000.00, 'MENSUAL', 6, '2025-03-06', '2025-12-06', 3, '2025-07-06', 'Internet hogar', TRUE),
(7, 6, 9, 6, FALSE, 150000.00, 'SEMANAL', 1, '2025-03-03', '2025-09-03', 14, '2025-06-30', 'Mercado semanal', TRUE),
(8, 7, 10, 4, TRUE, 300000.00, 'MENSUAL', 28, '2025-02-28', '2025-08-28', 4, '2025-07-28', 'Bono mensual', TRUE),
(9, 8, 11, 10, FALSE, 30000.00, 'MENSUAL', 11, '2025-04-11', '2025-10-11', 2, '2025-07-11', NULL, FALSE),
(10, 10, 12, 1, TRUE, 2800000.00, 'MENSUAL', 1, '2025-05-01', '2025-12-01', 2, '2025-07-01', 'Salario freelance', TRUE);

-- MOVIMIENTOS
INSERT INTO movimientos (id_movimiento, id_usuario, id_fondo, id_categoria, id_plantilla, es_ingreso, monto, fecha, descripcion, estado) VALUES
(1, 1, 1, 1, 1, TRUE, 3200000.00, '2025-06-01 06:00:00', 'Pago de nómina junio', TRUE),
(2, 1, 2, 6, NULL, FALSE, 180000.00, '2025-06-03 08:30:00', 'Mercado quincenal', TRUE),
(3, 1, 2, 8, NULL, FALSE, 45000.00, '2025-06-05 19:15:00', 'Suscripción streaming', TRUE),
(4, 2, 3, 1, 3, TRUE, 4100000.00, '2025-06-01 06:00:00', 'Salario mensual', TRUE),
(5, 2, 4, 7, NULL, FALSE, 90000.00, '2025-06-04 07:45:00', 'Gasolina', TRUE),
(6, 3, 5, 2, NULL, TRUE, 250000.00, '2025-06-10 10:00:00', 'Rendimiento CDT', TRUE),
(7, 4, 6, 9, 6, FALSE, 220000.00, '2025-06-06 06:00:00', 'Factura de internet', TRUE),
(8, 6, 9, 6, NULL, FALSE, 95000.00, '2025-06-08 13:20:00', 'Restaurante', TRUE),
(9, 7, 10, 3, NULL, TRUE, 600000.00, '2025-06-09 16:40:00', 'Venta artículo usado', TRUE),
(10, 8, 11, 10, NULL, FALSE, 30000.00, '2025-06-11 09:05:00', NULL, TRUE),
(11, 10, 12, 4, NULL, TRUE, 500000.00, '2025-06-12 11:30:00', 'Bono desempeño', TRUE),
(12, 1, 1, 7, NULL, FALSE, 60000.00, '2025-05-20 05:10:00', 'Taxi aeropuerto', FALSE);

-- ALERTAS_CONFIGURACION
INSERT INTO alertas_configuracion (id_alerta_config, id_usuario, tipo_alerta, umbral, estado) VALUES
(1, 1, 'Saldo bajo en fondo', 100000.00, TRUE),
(2, 1, 'Endeudamiento alto', 50.00, TRUE),
(3, 2, 'Gasto mensual elevado', 2000000.00, TRUE),
(4, 3, 'Meta en riesgo', 20.00, TRUE),
(5, 4, 'Saldo bajo en fondo', 50000.00, TRUE),
(6, 6, 'Endeudamiento alto', 40.00, FALSE),
(7, 7, 'Gasto mensual elevado', 3000000.00, TRUE),
(8, 8, 'Saldo bajo en fondo', 30000.00, TRUE),
(9, 10, 'Meta en riesgo', 25.00, TRUE),
(10, 2, 'Vencimiento próximo de cuota', 5.00, TRUE);

-- ALERTAS_HISTORIAL
INSERT INTO alertas_historial (id_alerta_generada, id_alerta_config, valor_detectado, fecha_generacion, motivo, notificado) VALUES
(1, 1, 85000.00, '2025-06-05 10:00:00', 'Saldo de Nequi por debajo del umbral configurado', TRUE),
(2, 1, 70000.00, '2025-06-15 09:30:00', 'Saldo de Nequi nuevamente bajo el umbral', TRUE),
(3, 2, 55.00, '2025-06-10 08:00:00', 'Índice de endeudamiento superó el umbral configurado', TRUE),
(4, 3, 2150000.00, '2025-06-20 18:00:00', 'Gasto mensual superó el límite configurado', TRUE),
(5, 4, 18.00, '2025-06-18 12:00:00', 'Meta Compra Portátil por debajo del progreso esperado', TRUE),
(6, 5, 42000.00, '2025-06-07 07:45:00', 'Saldo de Nequi (usuario 4) bajo el umbral', TRUE),
(7, 7, 3200000.00, '2025-06-22 20:00:00', 'Gasto mensual de usuario 7 superó el umbral', TRUE),
(8, 8, 25000.00, '2025-06-11 11:00:00', 'Saldo bajo en Efectivo', TRUE),
(9, 9, 22.00, '2025-06-19 15:00:00', 'Meta Nuevo Computador en riesgo', TRUE),
(10, 10, 3.00, '2025-06-25 09:00:00', 'Cuota próxima a vencer en 3 días', TRUE);

-- PAGOS
INSERT INTO pagos (id_pago, id_cuota, id_fondo, monto_pago, es_anticipado, fecha_pago) VALUES
(1, 1, 3, 292461.38, FALSE, '2025-01-30'),
(2, 2, 3, 292461.38, FALSE, '2025-02-27'),
(3, 3, 3, 292461.38, FALSE, '2025-03-30'),
(4, 4, 3, 292461.38, FALSE, '2025-04-29'),
(5, 13, 11, 1353356.61, TRUE, '2025-02-04'),
(6, 14, 11, 1353356.61, FALSE, '2025-03-04'),
(7, 21, 1, 64000.00, FALSE, '2024-12-29'),
(8, 22, 1, 64000.00, FALSE, '2025-01-29'),
(9, 23, 1, 64000.00, FALSE, '2025-02-26'),
(10, 24, 1, 64000.00, FALSE, '2025-03-29'),
(11, 25, 1, 64000.00, FALSE, '2025-04-28'),
(12, 26, 1, 4064000.00, FALSE, '2025-05-29');

-- APORTES
INSERT INTO aportes (id_aporte, id_meta, id_fondo, monto_aporte, fecha_aporte) VALUES
(1, 1, 1, 500000.00, '2025-04-05'),
(2, 1, 1, 300000.00, '2025-05-05'),
(3, 2, 3, 400000.00, '2025-04-10'),
(4, 2, 3, 400000.00, '2025-05-10'),
(5, 3, 5, 500000.00, '2025-04-15'),
(6, 3, 5, 500000.00, '2025-05-15'),
(7, 4, 6, 500000.00, '2025-04-20'),
(8, 4, 6, 500000.00, '2025-05-20'),
(9, 5, 9, 300000.00, '2025-04-25'),
(10, 5, 9, 300000.00, '2025-05-25');

-- REPORTES_GENERADOS
INSERT INTO reportes_generados (id_reporte, id_usuario, tipo_reporte, periodo, formato, fecha_generacion) VALUES
(1, 1, 'BALANCE', '2025-Q2', 'PDF', '2025-06-30 14:00:00'),
(2, 1, 'FLUJOCAJA', '2025-06', 'EXCEL', '2025-06-30 14:05:00'),
(3, 2, 'INDICADORES', '2025-Q2', 'PDF', '2025-06-28 10:00:00'),
(4, 3, 'BALANCE', '2025-Q1', 'PDF', '2025-04-01 09:00:00'),
(5, 4, 'FLUJOCAJA', '2025-05', 'EXCEL', '2025-06-01 08:30:00'),
(6, 6, 'BALANCE', '2025-Q2', 'PDF', '2025-06-30 16:00:00'),
(7, 7, 'INDICADORES', '2025-06', 'EXCEL', '2025-06-29 12:00:00'),
(8, 8, 'FLUJOCAJA', '2025-04', 'PDF', '2025-05-02 07:00:00'),
(9, 10, 'BALANCE', '2025-Q2', 'EXCEL', '2025-06-30 20:00:00'),
(10, 2, 'INDICADORES', '2025-Q1', 'PDF', '2025-04-05 09:15:00');

-- Los IDs de arriba se insertaron a mano, así que el contador SERIAL de cada
-- tabla no se enteró. Esto lo sincroniza para que el próximo INSERT sin ID
-- explícito continúe después del último usado, en vez de repetir uno ya existente.
SELECT setval('usuarios_id_usuario_seq', 10);
SELECT setval('categorias_id_categoria_seq', 26);
SELECT setval('preguntas_frecuentes_id_pregunta_seq', 10);
SELECT setval('codigos_recuperacion_id_codigo_seq', 10);
SELECT setval('fondos_id_fondo_seq', 12);
SELECT setval('activos_id_activo_seq', 10);
SELECT setval('pasivos_id_pasivo_seq', 10);
SELECT setval('cuotas_id_cuota_seq', 26);
SELECT setval('metas_id_meta_seq', 10);
SELECT setval('plantillas_id_plantilla_seq', 10);
SELECT setval('movimientos_id_movimiento_seq', 12);
SELECT setval('alertas_configuracion_id_alerta_config_seq', 10);
SELECT setval('alertas_historial_id_alerta_generada_seq', 10);
SELECT setval('pagos_id_pago_seq', 12);
SELECT setval('aportes_id_aporte_seq', 10);
SELECT setval('reportes_generados_id_reporte_seq', 10);
