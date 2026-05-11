import './i18n'; // Tambahkan baris ini di paling atas file index/main
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // Wajib ada

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wajib membungkus App */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)