-- TABLA: USUARIOS
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_registro DATE NOT NULL
);

-- TABLA: CATEGORIAS
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    es_ingreso BOOLEAN,
    aplica_a VARCHAR(20) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE
);

-- TABLA: PREGUNTAS_FRECUENTES
CREATE TABLE preguntas_frecuentes (
    id_pregunta SERIAL PRIMARY KEY,
    pregunta VARCHAR(255) NOT NULL,
    respuesta VARCHAR(500) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE
);

-- TABLA: CODIGOS_RECUPERACION
CREATE TABLE codigos_recuperacion (
    id_codigo SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    codigo VARCHAR(20) NOT NULL,
    fecha_expiracion TIMESTAMP NOT NULL,
    utilizado BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- TABLA: FONDOS
CREATE TABLE fondos (
    id_fondo SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_categoria INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    saldo_inicial DECIMAL(12,2) NOT NULL,
    saldo_actual DECIMAL(12,2) NOT NULL,
    fecha_creacion DATE NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT ck_saldo_no_negativo CHECK (saldo_actual >= 0),--impide que un fondo quede negativo
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- TABLA: ACTIVOS
CREATE TABLE activos (
    id_activo SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_categoria INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    valor DECIMAL(12,2) NOT NULL,
    fecha_registro DATE NOT NULL,
    fecha_actualizacion DATE NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT ck_valor_activo CHECK (valor > 0), --exige que el valor de un activo sea positivo
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- TABLA: PASIVOS
CREATE TABLE pasivos (
    id_pasivo SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_categoria INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    valor_inicial DECIMAL(12,2) NOT NULL,
    saldo_actual DECIMAL(12,2) NOT NULL,
    tasa_interes_mensual DECIMAL(5,2) NOT NULL,
    plazo_meses INT NOT NULL,
    tipo_amortizacion VARCHAR(20) NOT NULL,
    fecha_inicio DATE NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT ck_amortizacion CHECK (tipo_amortizacion IN ('FRANCESA','ALEMANA','AMERICANA')),--solo permite utilizar los tipos de amortizacion disponibles
    CONSTRAINT ck_plazo CHECK (plazo_meses > 0),--exige que el plazo sea mayor que cero
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- TABLA: METAS
CREATE TABLE metas (
    id_meta SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_fondo INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    monto_objetivo DECIMAL(12,2) NOT NULL,
    monto_ahorrado DECIMAL(12,2) NOT NULL DEFAULT 0,
    fecha_objetivo DATE NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT ck_monto_objetivo CHECK (monto_objetivo > 0),--exige que el monto objetivo sea mayor a cero
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_fondo) REFERENCES fondos(id_fondo)
);

-- TABLA: PLANTILLAS
CREATE TABLE plantillas (
    id_plantilla SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_fondo INT NOT NULL,
    id_categoria INT NOT NULL,
    es_ingreso BOOLEAN NOT NULL,
    monto DECIMAL(12,2) NOT NULL,
    recurrencia VARCHAR(20) NOT NULL,
    dia_ejecucion INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    ejecuciones_realizadas INT NOT NULL DEFAULT 0,
    proxima_fecha_ejecucion DATE,
    descripcion VARCHAR(255),
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT ck_recurrencia CHECK (recurrencia IN ('SEMANAL','QUINCENAL','MENSUAL')),--solo permite usar los tipos de recurrencia disponibles
    CONSTRAINT ck_vigencia CHECK (fecha_fin >= fecha_inicio),--exige que la fecha de fin sea mayor a la fecha de inicio
    CONSTRAINT ck_dia_ejecucion CHECK (dia_ejecucion BETWEEN 1 AND 31),--el dia tiene que esatr entre 1 y 31
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_fondo) REFERENCES fondos(id_fondo),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- TABLA: ALERTAS_CONFIGURACION
CREATE TABLE alertas_configuracion (
    id_alerta_config SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo_alerta VARCHAR(50) NOT NULL,
    umbral DECIMAL(12,2) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- TABLA: REPORTES_GENERADOS
CREATE TABLE reportes_generados (
    id_reporte SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo_reporte VARCHAR(50) NOT NULL,
    periodo VARCHAR(50),
    formato VARCHAR(10) NOT NULL,
    fecha_generacion TIMESTAMP NOT NULL,
    CONSTRAINT ck_formato CHECK (formato IN ('PDF','EXCEL')),--solo permite elegir una de las dos opciones de generacion de reportes
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- TABLA: MOVIMIENTOS
CREATE TABLE movimientos (
    id_movimiento SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_fondo INT NOT NULL,
    id_categoria INT NOT NULL,
    id_plantilla INT NULL,
    es_ingreso BOOLEAN NOT NULL,
    monto DECIMAL(12,2) NOT NULL,
    fecha TIMESTAMP NOT NULL,
    descripcion VARCHAR(255),
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT ck_monto_movimiento CHECK (monto > 0), --exige que el monto sea mayor a cero
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_fondo) REFERENCES fondos(id_fondo),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
    FOREIGN KEY (id_plantilla) REFERENCES plantillas(id_plantilla)
);

-- TABLA: CUOTAS
CREATE TABLE cuotas (
    id_cuota SERIAL PRIMARY KEY,
    id_pasivo INT NOT NULL,
    numero_cuota INT NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    valor_cuota DECIMAL(12,2) NOT NULL,
    abono_capital DECIMAL(12,2) NOT NULL,
    interes DECIMAL(12,2) NOT NULL,
    saldo_restante DECIMAL(12,2) NOT NULL,
    pagada BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT uq_cuota_pasivo UNIQUE (id_pasivo, numero_cuota),--impide que un credito tenga dos veces la misma cuota
    CONSTRAINT ck_composicion_cuota CHECK (ABS(valor_cuota - (abono_capital + interes)) < 0.01),--obliga a que la cuota cuadre valor_cuota = abono_capital + interes
    FOREIGN KEY (id_pasivo) REFERENCES pasivos(id_pasivo)
);

-- TABLA: ALERTAS_HISTORIAL
CREATE TABLE alertas_historial (
    id_alerta_generada SERIAL PRIMARY KEY,
    id_alerta_config INT NOT NULL,
    valor_detectado DECIMAL(12,2) NOT NULL,
    fecha_generacion TIMESTAMP NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    notificado BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_alerta_config) REFERENCES alertas_configuracion(id_alerta_config)
);

-- TABLA: PAGOS
CREATE TABLE pagos (
    id_pago SERIAL PRIMARY KEY,
    id_cuota INT NOT NULL,
    id_fondo INT NOT NULL,
    monto_pago DECIMAL(12,2) NOT NULL,
    es_anticipado BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_pago DATE NOT NULL,
    CONSTRAINT ck_monto_pago CHECK (monto_pago > 0),--exige que el monto del pago sea mayor a cero
    FOREIGN KEY (id_cuota) REFERENCES cuotas(id_cuota),
    FOREIGN KEY (id_fondo) REFERENCES fondos(id_fondo)
);

-- TABLA: APORTES
CREATE TABLE aportes (
    id_aporte SERIAL PRIMARY KEY,
    id_meta INT NOT NULL,
    id_fondo INT NOT NULL,
    monto_aporte DECIMAL(12,2) NOT NULL,
    fecha_aporte DATE NOT NULL,
    CONSTRAINT ck_monto_aporte CHECK (monto_aporte > 0), --exige que el monto del aporte sea mayor a cero
    FOREIGN KEY (id_meta) REFERENCES metas(id_meta),
    FOREIGN KEY (id_fondo) REFERENCES fondos(id_fondo)
);


