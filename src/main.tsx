import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ClerkSniffer  from './components/ClerkSniffer'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='w-20 h-20'>
      <ClerkSniffer />
      
    </div>
  </StrictMode>
)
