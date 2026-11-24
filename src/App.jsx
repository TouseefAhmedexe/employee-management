import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import EmployeeListPage from './pages/EmployeeListPage'
import AddEmployeePage from './pages/AddEmployeePage'
import EditEmployeePage from './pages/EditEmployeePage'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<EmployeeListPage />} />
        <Route path="/add" element={<AddEmployeePage />} />
        <Route path="/edit/:id" element={<EditEmployeePage />} />
      </Routes>
    </div>
  )
}

export default App
