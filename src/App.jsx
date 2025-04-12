import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./Sidebar"
import PatientForm from "./PatientForm"
import SummaryPage from "./SummaryPage"
import BulletinBoard from "./BulletinBoard"
import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage"
import UserManagement from "./UserManagement"

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<PatientForm />} />  {/* 첫 화면 환자 입력 */}
            <Route path="/form" element={<PatientForm />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/bulletin/:category" element={<BulletinBoard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/users" element={<UserManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
