import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ModelProvider } from './Contexts/ModelContext/ModelContext.jsx'
import { InteractionContext, InteractionProvider } from './Contexts/InteractionContext/InteractionContext.jsx'
import { ReactionProvider } from './Contexts/ReactionContext/ReactionContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModelProvider>
      <InteractionProvider>
        <ReactionProvider>
          <App />
        </ReactionProvider>
      </InteractionProvider>      
    </ModelProvider>
  </StrictMode>,
)
