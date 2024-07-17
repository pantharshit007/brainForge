import './App.css'
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
import OpenRoute from './components/core/Auth/OpenRoute'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import MyProfile from './components/core/Dashboard/MyProfile/MyProfile'
import Setting from './components/core/Dashboard/Settings/Setting'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses/EnrolledCourses'
import Cart from './components/core/Dashboard/Cart/Cart'
import { ACCOUNT_TYPE } from './utils/constant'
import MyCourses from './components/core/Dashboard/InstructorCourses/MyCourses'
import AddCourse from './components/core/Dashboard/AddCourse/AddCourse'
import EditCourse from './components/core/Dashboard/EditCourse/EditCourse'
import Catalog from './pages/Catalog'
import CourseDetail from './pages/CourseDetail'
import ViewCourse from './pages/ViewCourse'
import VideoDetail from './components/core/ViewCourse/VideoDetail'

function App() {
  // TODO: Implement an upword arrow which bring user to top of the page.
  // TODO: Navbar for Mobile

  const { user } = useSelector(state => state.profile);
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
              </>
            )}

          </Route>

          <Route path="update-password/:id" element={<UpdatePassword />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />

          <Route path="/catalog/:catalogName" element={<Catalog />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />

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
