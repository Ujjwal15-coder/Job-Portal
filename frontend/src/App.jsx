import About from "./pages/About"
import Company from "./pages/components/Company"
import Register from "./pages/components/Register"
import Footer from "./pages/Footer"
import Home from "./pages/Home"
import Navbar from "./pages/Navbar"
import Login from "./pages/components/Login"
import { Routes, Route } from 'react-router-dom'
import Contact from "./pages/Contact"
import CompaniesDetails from "./pages/CompaniesDetails"
import Profile from "./pages/Profile"
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Public - company listing & details */}
        <Route path="/companies" element={<Company />} />
        <Route path="/companies/:id" element={<CompaniesDetails />} />

        {/* Protected routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </>
  )
}

export default App
