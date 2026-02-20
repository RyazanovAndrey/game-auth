import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import { ROUTES } from "./route"

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>} />
    </Routes>
  )
}

export default App