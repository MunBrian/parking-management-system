import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  )
}

export default App
