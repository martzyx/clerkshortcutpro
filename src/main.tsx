import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ClerkClients from './components/ClerkClients'
import Header from './components/Header'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
    <div>
      <Header />
      <ClerkClients />
    </div>
    </Suspense>
  </StrictMode>
)
