import { Navigate } from "react-router-dom"
import { ROUTES } from "../route"
import { useAuth } from "../context/AuthProvider"

const ProtectedRoute = ({ children }) => {

  const user = JSON.parse(localStorage.getItem('user')) || null

  if (!user) {
    return <Navigate to={ROUTES.HOME} />
  }

  return children
}

export default ProtectedRoute