import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SistemaProvider from './context/SistemaContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SistemaProvider>
      <App />
    </SistemaProvider>
  </StrictMode>,
)
