import { BrowserRouter, Routes, Route } from 'react-router'

import './App.css'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'

import RouteProtection from './auth/routeProtection'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route path='/' element={<HomePage/>}/>

        {/* Login Page */}
        <Route path='/login' element={<LoginPage/>}/>

        {/* Dashboard Page */}
        <Route path="/dashboard" element={<RouteProtection> <DashboardPage/> </RouteProtection>}/>

        {/* 404 Page */}
        <Route path='*' element={<div>404 Page Not Found</div>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
