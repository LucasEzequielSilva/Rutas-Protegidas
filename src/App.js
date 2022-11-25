import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { Admin, Analytics, Dashboard, Home, Landing } from './pages';
import ProtectedRoute from './components/ProtectedRoute';
function App() {

  const [user, setUser] = useState(null)

  const login = () => {
    setUser({
      id: 1,
      name: "Lucas",
      permissions: ["analize", "admin"]
    })
  }

  const logout = () => setUser(null)

  return (
    <BrowserRouter>
      <Navigation />
      {user ? <button onClick={logout}>logout</button> : <button onClick={login}>login</button>}
      <Routes>
        <Route index element={<Landing />} />
        <Route path='/landing' element={<Landing />} />
        {/* Multiples Rutas con Outlet */}
        <Route element={<ProtectedRoute isAllowed={!!user} reDirect={"/"}/>}>
            <Route path='/home' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        {/* Rutas y Permisos */}
            <Route path='/analytics' element={
              <ProtectedRoute isAllowed={!!user && user.permissions.includes("analize")} reDirect={"/"} >
                <Analytics />
              </ProtectedRoute>
          } />
            <Route path='/admin' element={
              <ProtectedRoute isAllowed={!!user && user.permissions.includes("admin")} reDirect={"/"} >
              <Admin/>
            </ProtectedRoute>
            } />
      </Routes>
    </BrowserRouter>
  );
}
function Navigation() {
  return (
    <nav>
      <Link to="/landing">landing</Link>
      <Link to="/home">home</Link>
      <Link to="/dashboard">dashboard</Link>
      <Link to="/analytics">analytics</Link>
      <Link to="/admin">admin</Link>
    </nav>
  )
}
export default App;

