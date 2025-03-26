import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ChildA from './ChildA.jsx'
import ChildB from './ChildA.jsx'
import ChildC from './ChildA.jsx'
import ChildD from './ChildA.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/childa" element={<ChildA/>} />
        <Route path="/childb" element={<ChildB/>} />
        <Route path="/childc" element={<ChildC/>} />
        <Route path="/childd" element={<ChildD/>} />
      </Routes>
      </BrowserRouter>
    
  </StrictMode>,
)
