import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ClerkClients from './components/ClerkClients'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import { ClerkClientProvider } from './components/context/useClerkClients'

createRoot(document.getElementById('root')!).render(
    <>
      <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Dashboard />
        <ClerkClientProvider>
          <Header />
          <ClerkClients />
        </ClerkClientProvider>
        </div>
      </Suspense>
    </>
)
