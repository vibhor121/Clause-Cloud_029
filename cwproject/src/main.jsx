import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { WebsiteProvider } from './contexts/WebsiteContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

    <DndProvider backend={HTML5Backend}>
      <WebsiteProvider>
        <App />
      </WebsiteProvider>
    </DndProvider>

)