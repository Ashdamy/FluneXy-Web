import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Mismo orden de carga que en los HTML originales.
// global.css ya importa tokens.css por dentro.
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
import '@phosphor-icons/web/regular'
import './estilos/global.css'
import './estilos/barra-lateral.css'
import './estilos/acciones-usuario.css'
import './estilos/responsive.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
