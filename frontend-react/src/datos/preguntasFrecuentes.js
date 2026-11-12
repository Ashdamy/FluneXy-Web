// Preguntas frecuentes de bd/02_insert_data.sql (tabla preguntas_frecuentes).
// El Asistente sugiere y responde solo con estas (RN17.3.4, RN17.4.1).

const preguntas = [
  { id: 1, pregunta: '¿Cómo registro un nuevo movimiento?', respuesta: 'Ingresa al módulo Movimientos, selecciona Nuevo Movimiento, elige el tipo, monto, fondo y categoría, y guarda.', activo: true },
  { id: 2, pregunta: '¿Cómo creo una meta financiera?', respuesta: 'En el módulo Metas selecciona Nueva Meta e ingresa nombre, monto objetivo, fecha objetivo y fondo asociado.', activo: true },
  { id: 3, pregunta: '¿Cómo edito la información de un fondo?', respuesta: 'Entra al detalle del fondo y selecciona Editar Fondo para actualizar su información.', activo: true },
  { id: 4, pregunta: '¿Qué pasa si desactivo un activo?', respuesta: 'El activo deja de contar en el Valor Total de Activos, pero su historial se conserva.', activo: true },
  { id: 5, pregunta: '¿Cómo se calcula el balance financiero?', respuesta: 'Se calcula como la diferencia entre el total de activos y el total de pasivos vigentes.', activo: true },
  { id: 6, pregunta: '¿Puedo recuperar mi contraseña si la olvido?', respuesta: 'Sí, desde la pantalla de inicio de sesión puedes solicitar un código de recuperación a tu correo.', activo: true },
  { id: 7, pregunta: '¿Cómo registro un pago sobre una cuota?', respuesta: 'Desde el detalle de la cuota selecciona Registrar Pago e indica el fondo desde el cual pagas.', activo: true },
  { id: 8, pregunta: '¿Qué diferencia hay entre un pago y un aporte?', respuesta: 'Un pago se aplica a una cuota de un pasivo; un aporte se aplica al progreso de una meta financiera.', activo: true },
  { id: 9, pregunta: '¿Cómo configuro una alerta financiera?', respuesta: 'En el módulo Alertas define el tipo de alerta y el umbral que quieres monitorear.', activo: true },
  { id: 10, pregunta: '¿Puedo exportar un reporte en Excel?', respuesta: 'Sí, desde el módulo Reportes puedes generar el reporte y exportarlo en PDF o Excel.', activo: true },
]

// RN17.4.3: solo las vigentes.
export function preguntasVigentes() {
  return preguntas.filter((p) => p.activo)
}

// Palabras de 4 letras o mas, sin tildes ni mayusculas ("¿Cómo creo una meta?" -> como, creo, meta).
const palabras = (texto) =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9ñ]+/)
    .filter((p) => p.length >= 4)

const COMUNES = new Set(['como', 'puedo', 'sobre', 'para', 'desde', 'cual', 'donde', 'cuando'])

// La pregunta frecuente que mas palabras comparte con la consulta (sin contar
// las muy comunes). null si ninguna comparte al menos una palabra importante.
export function buscarRespuesta(consulta) {
  const buscadas = new Set(palabras(consulta).filter((p) => !COMUNES.has(p)))
  let mejor = null
  let puntos = 0
  for (const p of preguntasVigentes()) {
    const comunes = palabras(p.pregunta).filter((x) => buscadas.has(x) || buscadas.has(x.replace(/s$/, '')) || buscadas.has(`${x}s`)).length
    if (comunes > puntos) {
      mejor = p
      puntos = comunes
    }
  }
  return mejor
}
