import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChatContext } from './ChatContext.jsx'

createRoot(document.getElementById('root')).render(
  <ChatContext>
    <App />
  </ChatContext>,
)
