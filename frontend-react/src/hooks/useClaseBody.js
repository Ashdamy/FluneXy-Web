import { useEffect } from 'react'

// Pone las clases mod-* en el <body> mientras la pagina esta en pantalla,
// igual que hacia el <body class="..."> de cada HTML original. El CSS de
// src/estilos/ depende de esas clases. Al salir de la pagina se quitan.
export default function useClaseBody(clase) {
  useEffect(() => {
    document.body.className = clase
    return () => {
      document.body.className = ''
    }
  }, [clase])
}
