import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ScriptExecutor  from './ScriptExecutor'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScriptExecutor />
  </StrictMode>
)
