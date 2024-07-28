import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
import Catalog from './pages/Catalog'
import CourseDetail from './pages/CourseDetail'
import ViewCourse from './pages/ViewCourse'

import OpenRoute from './components/core/Auth/OpenRoute'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import MyProfile from './components/core/Dashboard/MyProfile/MyProfile'
import Setting from './components/core/Dashboard/Settings/Setting'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses/EnrolledCourses'
import Cart from './components/core/Dashboard/Cart/Cart'
import MyCourses from './components/core/Dashboard/InstructorCourses/MyCourses'
import AddCourse from './components/core/Dashboard/AddCourse/AddCourse'
import EditCourse from './components/core/Dashboard/EditCourse/EditCourse'
import VideoDetail from './components/core/ViewCourse/VideoDetail'
import InstructorDash from './components/core/Dashboard/InstructorDashboard/InstructorDash'
import AdminDash from './components/core/Dashboard/Admin/AdminDash'
import CategoryManager from './components/core/Dashboard/Admin/CategoryManager'
import { ACCOUNT_TYPE } from './utils/constant'
import BackToTop from './utils/BackToTop'
import toast from 'react-hot-toast'
import Admin from './assets/Images/Admin.png'

function App() {

  const { user } = useSelector(state => state.profile);
  const [toastStatus, setToastStatus] = useState(true);

  if (toastStatus) {
    toast.custom((t) => (
      <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gradient-to-b from-indigo-600 to-fontPurple shadow-lg rounded-lg flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start ">

            <img
              className=" w-[40px] aspect-square rounded-full object-cover "
              src={Admin}
              alt=""
            />

            <div className="ml-3 flex-1">
              <p className="text-sm font-m font-mono text-richblack-5">
                @pantharshit007
              </p>
              <p className="mt-1 text-sm text-white">
                Backend server is using free hosting service which may require 8-10 sec to warm-up initially,
                sorry for the inconvenience.
              </p>
            </div>
          </div>
        </div>
      </div>
    ), {
      duration: 4000,
    });
    setToastStatus(false);
  }

  return (
    <>
      <div className='w-screen min-h-screen flex flex-col font-inter bg-bgBlue '>
        {!navigator.onLine && (
          <div className="z-[999] bg-red-500 flex text-white text-sm text-center py-[1px] bg-richblac-300 justify-center gap-2 items-center">
            Please check your internet connection.
            <button
              className="ml-2 bg-richblack-500 rounded-md py-[1px] px-2 text-white"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        <Navbar />

        <BackToTop />

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

          {/* DASHBOARD */}
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/settings" element={<Setting />} />

            {/* STUDENT ROUTES */}
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="dashboard/cart" element={<Cart />} />
              </>
            )}

            {/* INSTRUCTOR ROUTES */}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
                <Route path="dashboard/instructor" element={<InstructorDash />} />
              </>
            )}

            {/* ADMIN ROUTES */}
            {user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <>
                <Route path="dashboard/admin-panel" element={<AdminDash />} />
                <Route path="dashboard/category-manager" element={<CategoryManager />} />
              </>
            )}

          </Route>

          <Route path="update-password/:id" element={<UpdatePassword />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />

          <Route path="/catalog/:catalogName" element={<Catalog />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />

          {/* COURSE VIEW */}
          <Route
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
            {/* STUDENT ROUTES */}
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/enrolled-courses/view-course/:courseId/section/:sectionId/sub-section/:subsectionId" element={<VideoDetail />} />
              </>
            )}

          </Route>

          {/* Error Route */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </>
  )
}

export default App
