import { useEffect } from 'react'

// Pone el titulo de la pestana del navegador, como el <title> de los HTML
// originales: "Mis Movimientos | FluneXy".
export default function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = `${titulo} | FluneXy`
  }, [titulo])
}
