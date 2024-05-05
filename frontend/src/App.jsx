import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import OpenRoute from './components/core/Auth/OpenRoute'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'

function App() {
  // TODO: Implement an upword arrow which bring user to top of the page.
  // TODO: in Navbar
  return (
    <>
      <div className='w-screen min-h-screen flex flex-col font-inter bg-bgBlue '>
        <Navbar />

        {/* OPEN ROUTE - Logged Out user */}
        {/* PRIVATE ROUTE - Login User */}
        <Routes>

          <Route path='/' element={<Home />} />

          <Route path='signup'
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            } />

          <Route path="login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            } />

          <Route path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            } />

          <Route path="verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            } />

          <Route path="update-password/:id" element={<UpdatePassword />} />


        </Routes>
      </div>
    </>
  )
}

export default App
