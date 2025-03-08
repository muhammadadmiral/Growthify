import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Import CSS dalam urutan yang benar
import './growthify-reset.css' // Basic reset harus dimuat pertama
import './index.css'           // File dengan direktif Tailwind
import './App.css'             // Styling spesifik aplikasi

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)