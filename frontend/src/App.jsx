import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Error from './pages/Error'
import OpenRoute from './components/core/Auth/OpenRoute'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import MyProfile from './components/core/Dashboard/MyProfile'
import Setting from './components/core/Dashboard/Settings/Setting'

function App() {
  // TODO: Implement an upword arrow which bring user to top of the page.
  // TODO: Navbar for Mobile
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

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/settings" element={<Setting />} />
          </Route>

          <Route path="update-password/:id" element={<UpdatePassword />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />


          {/* Error Route */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </>
  )
}

export default App
