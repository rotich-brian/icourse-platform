import {React, useEffect} from "react"
import { Route, Routes } from "react-router-dom"
import CourseLandingPage from "./components/CourseLandingPage"
import SignInPage from "./components/SignInPage"
import CreateAccountPage from "./components/CreateAccountPage"
import Layout from "./components/Shared/Layout"
import Dashboard from "./components/Dashboard"
import MyCoursesPage from "./components/MyCourses"
import EventsPage from "./components/EventsPage"
import ResourcesPage from "./components/ResourcesPage"
import ProtectedRoute from "./lib/authUtils/ProtectedRoute"
import SettingsPage from "./components/SettingsPage"
import ProfilePage from "./components/ProfilePage"
import MyProgress from "./components/MyProgress"
import CourseDetails from "./components/CourseDetailsPage"
import EventDetailsPage from "./components/EventDetailPage"
import ViewCoursesPage from "./components/ViewCoursesPage"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<CourseLandingPage/>}/>
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
          }>
          <Route index={true} element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="courses" element={<MyCoursesPage/>} />
          <Route path="courses/browse" element={<ViewCoursesPage/>} />
          <Route path="courses/details/:courseId" element={<CourseDetails />} />
          <Route path="progress" element={<MyProgress/>} />
          <Route path="events" element={<EventsPage/>} />
          <Route path="events/details/:eventId" element={<EventDetailsPage/>} />
          <Route path="resources" element={<ResourcesPage/>} />
          <Route path="settings" element={<SettingsPage/>} />
          <Route path="profile" element={<ProfilePage/>} />
        </Route>
        <Route path="login" element={<SignInPage/>}/>
        <Route path="new" element={<CreateAccountPage/>}/>
      </Routes>
    </div>
  )
}

export default App
