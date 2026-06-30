import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ModelProvider } from './Contexts/ModelContext/ModelContext.jsx'
import { InteractionContext, InteractionProvider } from './Contexts/InteractionContext/InteractionContext.jsx'
import { ReactionProvider } from './Contexts/ReactionContext/ReactionContext.jsx'
import { MainGuidelineContext, MainGuidelineProvider } from './Contexts/MainGuidelineContext/MainGuidelineContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModelProvider>
      <InteractionProvider>
        <ReactionProvider>
          <MainGuidelineProvider>
            <App />
          </MainGuidelineProvider>
        </ReactionProvider>
      </InteractionProvider>      
    </ModelProvider>
  </StrictMode>,
)
