import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import AuthPage from './components/Pages/Auth/AuthPage'
import HomePage from './components/Pages/Home/HomePage'
import VideoDetail from './components/Pages/VideoDetail/VideoDetail'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import { useState } from 'react'
import NotFound from './components/Pages/404Page/NotFound'
import Unauthorized from './components/Pages/UnAuthorized/UnAuthorized'
import ProtectedRoutes from './components/Routes/ProtectedRoutes'

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path='/home' element={
          <ProtectedRoutes allowedRole={["admin" , "user"]}>
            <HomePage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </ProtectedRoutes>
        } />
        <Route path='/video-detail/:id' element={
          <ProtectedRoutes allowedRole={["admin", "user"]}>
            <VideoDetail />
          </ProtectedRoutes>
        } />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
