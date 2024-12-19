import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ClerkSniffer  from './components/ClerkSniffer'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkSniffer />
  </StrictMode>
)
