import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import ClerkSniffer  from './components/ClerkSniffer'
import './index.css'
import ClerkClients from './components/ClerkClients'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
    <div>
      <ClerkSniffer />
      <ClerkClients />
    </div>
    </Suspense>
  </StrictMode>
)
