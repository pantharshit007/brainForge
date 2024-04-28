import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  // TODO: Implement an upword arrow which bring user to top of the page.
  // TODO: in Navbar
  return (
    <>
      <div className='w-screen min-h-screen flex flex-col font-inter bg-bgBlue '>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
