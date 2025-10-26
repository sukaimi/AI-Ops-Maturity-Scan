import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import EmailGate from './pages/EmailGate'
import Report from './pages/Report'
import AdminDashboard from './pages/AdminDashboard'
import BookingsView from './pages/BookingsView'

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <div className="grid-background"></div>
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/email-gate" element={<EmailGate />} />
            <Route path="/report" element={<Report />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/bookings" element={<BookingsView />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App

