import { useEffect, useRef, useState } from 'react'
import EncabezadoPagina from '../../componentes/EncabezadoPagina.jsx'
import { buscarRespuesta, preguntasVigentes } from '../../datos/preguntasFrecuentes.js'
import useClaseBody from '../../hooks/useClaseBody.js'
import useTituloPagina from '../../hooks/useTituloPagina.js'

const SALUDO = '¡Hola! Soy tu asistente financiero. Puedo ayudarte a resolver dudas sobre cómo usar FluneXy. ¿En qué te puedo ayudar hoy?'
// RN17.2.2: si no hay respuesta se dice, sin inventar informacion.
const SIN_RESPUESTA = 'No tengo una respuesta para esa pregunta. Prueba con una de las sugerencias o escribe tu duda con otras palabras.'

export default function Asistente() {
  useClaseBody('mod-asistente')
  useTituloPagina('Asistente')
  // La conversacion es una lista de mensajes; cada pregunta agrega dos.
  const [mensajes, setMensajes] = useState([{ id: 0, de: 'asistente', texto: SALUDO }])
  const [consulta, setConsulta] = useState('')
  const areaRef = useRef(null)
  // RN17.4.1 y RN17.4.3: sugerencias tomadas de las preguntas frecuentes vigentes (3, como el prototipo).
  const sugerencias = preguntasVigentes().slice(0, 3)

  // Despues de cada mensaje nuevo, la conversacion baja hasta el ultimo.
  useEffect(() => {
    const area = areaRef.current
    if (area) area.scrollTop = area.scrollHeight
  }, [mensajes])

  function preguntar(texto) {
    const limpio = texto.trim()
    // RN17.1.1: una consulta vacia no se envia.
    if (!limpio) return
    const respuesta = buscarRespuesta(limpio)
    setMensajes((anteriores) => [
      ...anteriores,
      { id: anteriores.length, de: 'usuario', texto: limpio },
      { id: anteriores.length + 1, de: 'asistente', texto: respuesta ? respuesta.respuesta : SIN_RESPUESTA },
    ])
    setConsulta('')
  }

  return (
    <>
      <EncabezadoPagina titulo="Asistente Inteligente" subtitulo="Pregunta lo que necesites sobre FluneXy" />
      <section className="chat-contenedor">
        <div className="chips-sugerencia">
          {sugerencias.map((p) => (
            <button key={p.id} type="button" className="chip" onClick={() => preguntar(p.pregunta)}>{p.pregunta}</button>
          ))}
        </div>
        <div className="mensajes-area" aria-live="polite" ref={areaRef}>
          {mensajes.map((m) => (
            <div key={m.id} className={m.de === 'usuario' ? 'mensaje-usuario' : 'mensaje-asistente'}>
              <div className="burbuja-mensaje">
                <p>{m.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* El prototipo no tenia <form>; con el, Enter tambien envia. */}
      <form
        className="entrada-chat"
        onSubmit={(evento) => {
          evento.preventDefault()
          preguntar(consulta)
        }}
      >
        <input type="text" placeholder="Escribe tu pregunta..." aria-label="Escribe tu pregunta" value={consulta} onChange={(evento) => setConsulta(evento.target.value)} />
        <button type="submit" className="boton-enviar" aria-label="Enviar">
          <i className="ph ph-paper-plane-tilt"></i>
        </button>
      </form>
    </>
  )
}
