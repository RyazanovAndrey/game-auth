import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))) || null
  const navigate = useNavigate()

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || []

    const findUser = users.find(item => item.email == email && item.password == password)

    if (findUser) {
      const currentUser = { name: findUser.name, email: findUser.email }
      setUser(currentUser)
      localStorage.setItem('user', JSON.stringify(currentUser))
      return { success: true }
    }

    return { success: false, message: 'User not find!' }
  }

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || []

    const findUser = users.find(item => item.email == email)

    if (findUser) {
      return { success: false, message: 'There is already such a user!' }
    }

    const newUser = { name, email, password }
    users.push(newUser)

    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('user', JSON.stringify({ name, email }))

    setUser({ name, email })

    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ login, register, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)